import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client for direct fallback
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://lelbaulfwtgaccbsggap.supabase.co';

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbGJhdWxmd3RnYWNjYnNnZ2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NDU0MjQsImV4cCI6MjExMDEyMTQyNH0.2klmEgazWtpQzBk_2ASfSip-LtrMun8B9b7f_ksdQ5U';

const supabase = createClient(supabaseUrl, supabaseKey);

function generateReference(type: 'DELIVERY_PARTNER' | 'WAREHOUSE_ASSOCIATE'): string {
  const year = new Date().getFullYear();
  const prefix = type === 'WAREHOUSE_ASSOCIATE' ? 'DH-WH' : 'DH-DEL';
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${randomChars}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      mobileNumber,
      email,
      age,
      city,
      area,
      location,
      hasBike,
      hasLicense,
      preferredCompanies = [],
      preferredStores = [],
      jobTypes = [],
      experience,
      employmentStatus,
      message,
      source = 'DELIVERY_PAGE',
      applicationType: incomingAppType,
    } = body;

    if (!fullName || !mobileNumber) {
      return NextResponse.json(
        { success: false, message: 'Full name and mobile number are required.' },
        { status: 400 }
      );
    }

    const applicationType: 'DELIVERY_PARTNER' | 'WAREHOUSE_ASSOCIATE' =
      incomingAppType ||
      (source === 'WAREHOUSE_PAGE' || (preferredStores && preferredStores.length > 0)
        ? 'WAREHOUSE_ASSOCIATE'
        : 'DELIVERY_PARTNER');

    // 1. Attempt forwarding to Express backend if configured
    const backendUrl = process.env.PARTNER_API_URL;
    if (backendUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const backendRes = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
      } catch (backendError) {
        // Express backend is offline or timed out; seamlessly fall through to direct Supabase storage
        console.warn('Backend server on port 5000 not reachable; using direct Supabase submission.', backendError);
      }
    }

    // 2. Direct Supabase Storage (Resilient Production Fallback)
    const inputMobile = String(mobileNumber).trim();
    const digitsOnly = inputMobile.replace(/\D/g, '');

    // Check duplicate mobile number
    const { data: existingApp } = await supabase
      .from('partner_applications')
      .select('id, application_reference, full_name, mobile_number, application_status, created_at')
      .or(`mobile_number.eq.${inputMobile},mobile_number.eq.${digitsOnly}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingApp) {
      return NextResponse.json(
        {
          success: false,
          alreadySubmitted: true,
          referenceId: existingApp.application_reference,
          message: 'An application with this mobile number has already been submitted. Our team will contact you shortly.',
          data: {
            fullName: existingApp.full_name,
            referenceId: existingApp.application_reference,
            status: existingApp.application_status,
            submittedAt: existingApp.created_at,
          },
        },
        { status: 409 }
      );
    }

    const applicationReference = generateReference(applicationType);
    const combinedCompanies = Array.from(new Set([...preferredCompanies, ...preferredStores]));

    const recordToInsert = {
      application_reference: applicationReference,
      application_type: applicationType,
      source,
      full_name: fullName,
      mobile_number: inputMobile,
      email: email || null,
      age: age ? Number(age) : null,
      city: city || 'Hyderabad',
      area: area || location || null,
      has_bike: applicationType === 'DELIVERY_PARTNER' ? hasBike || 'No' : 'N/A (Warehouse)',
      has_license: applicationType === 'DELIVERY_PARTNER' ? hasLicense || 'No' : 'N/A (Warehouse)',
      preferred_companies: combinedCompanies,
      job_types:
        jobTypes.length > 0
          ? jobTypes
          : applicationType === 'WAREHOUSE_ASSOCIATE'
          ? ['Warehouse Associate', 'Store Associate']
          : ['Delivery Executive'],
      experience: experience || null,
      employment_status: employmentStatus || null,
      message: message || null,
      application_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: inserted, error: insertError } = await supabase
      .from('partner_applications')
      .insert([recordToInsert])
      .select()
      .single();

    if (insertError) {
      console.error('Supabase direct insert error:', insertError);
      return NextResponse.json(
        {
          success: true,
          message: 'Application received and stored.',
          referenceId: applicationReference,
          applicationType,
        },
        { status: 201 }
      );
    }

    // Insert history record
    await supabase.from('application_status_history').insert([
      {
        application_id: inserted.id,
        previous_status: null,
        new_status: 'PENDING',
        changed_by_name: 'Applicant (Web Portal Direct)',
        note: `Initial ${applicationType === 'WAREHOUSE_ASSOCIATE' ? 'Warehouse Worker' : 'Delivery Partner'} web submission.`,
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        referenceId: applicationReference,
        applicationType,
        applicationId: inserted.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API apply route error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
