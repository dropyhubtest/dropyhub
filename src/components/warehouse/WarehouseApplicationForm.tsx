'use client';

import React, { useState, useEffect } from 'react';
import styles from './WarehouseApplicationForm.module.css';

const PREFERRED_STORES = [
  { id: 'amazon', label: 'Amazon Warehouse' },
  { id: 'zepto', label: 'Zepto Stores' },
  { id: 'swiggy', label: 'Swiggy Instamart' },
  { id: 'blinkit', label: 'Blinkit Stores' },
];

export const WarehouseApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    city: '',
    location: '',
    age: '',
    experience: '',
    preferredStores: [] as string[],
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionInfo, setSubmissionInfo] = useState<{
    referenceId?: string;
    fullName?: string;
    mobileNumber?: string;
    alreadyRegistered?: boolean;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dropyhub_warehouse_submission');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubmissionInfo(parsed);
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (storeId: string) => {
    setFormData((prev) => {
      const exists = prev.preferredStores.includes(storeId);
      if (exists) {
        return {
          ...prev,
          preferredStores: prev.preferredStores.filter((id) => id !== storeId),
        };
      } else {
        return {
          ...prev,
          preferredStores: [...prev.preferredStores, storeId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_PARTNER_API_URL || 'http://localhost:5000/api/v1/public/apply';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          city: formData.city,
          location: formData.location,
          age: formData.age,
          experience: formData.experience,
          preferredStores: formData.preferredStores,
          source: 'WAREHOUSE_PAGE',
          applicationType: 'WAREHOUSE_ASSOCIATE',
        }),
      });
      const result = await response.json();

      if (response.status === 409 || result.alreadySubmitted) {
        const info = {
          referenceId: result.referenceId || 'DH-WH-REGISTERED',
          fullName: result.data?.fullName || formData.fullName,
          mobileNumber: formData.mobileNumber,
          alreadyRegistered: true,
        };
        try {
          localStorage.setItem('dropyhub_warehouse_submission', JSON.stringify(info));
        } catch {}
        setSubmissionInfo(info);
        setSubmitted(true);
        return;
      }

      if (!response.ok) throw new Error(result.message || 'Submission failed');

      const info = {
        referenceId: result.referenceId,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        alreadyRegistered: false,
      };
      try {
        localStorage.setItem('dropyhub_warehouse_submission', JSON.stringify(info));
      } catch {}
      setSubmissionInfo(info);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMessage(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} aria-label="Warehouse and Stores Application Form">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Heading & Narrative (Sticky) */}
        <div className={styles.leftCol}>
          <div className={styles.stickyWrapper}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              JOIN OUR WORKFORCE
            </span>
            <h2 className={styles.heading}>
              Warehouse &amp; Stores Application Form
            </h2>
            <p className={styles.description}>
              Register now to get placed in top warehouses and dark stores. Start your logistics career
              with zero hassle.
            </p>
          </div>
        </div>

        {/* Right Column: Modern Application Form Card */}
        <div className={styles.rightCol}>
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.checkCircle} aria-hidden="true">
                  ✓
                </div>
                <h3 className={styles.successTitle}>
                  {submissionInfo?.alreadyRegistered
                    ? 'Application Already Registered'
                    : 'Application Submitted!'}
                </h3>
                {submissionInfo?.referenceId && (
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#f3f4f6',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: '#1f2937',
                      fontFamily: 'monospace',
                    }}
                  >
                    REFERENCE: {submissionInfo.referenceId}
                  </div>
                )}
                <p className={styles.successMessage}>
                  {submissionInfo?.alreadyRegistered
                    ? `An application with mobile number ${submissionInfo.mobileNumber || formData.mobileNumber} is already registered with DropyHub.`
                    : `Thank you, ${submissionInfo?.fullName || formData.fullName}! Our team will contact you on ${submissionInfo?.mobileNumber || formData.mobileNumber} within 24–48 hours for immediate onboarding.`}
                </p>
                <div
                  style={{
                    marginTop: '8px',
                    padding: '12px 16px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    maxWidth: '440px',
                  }}
                >
                  🔒 <strong>Duplicate Protection Active:</strong> To avoid duplicate registrations, candidates may only submit an application once. Your profile is active and recorded in our onboarding system.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Row 1: Full Name & Mobile Number */}
                <div className={styles.inputGrid}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="mobileNumber" className={styles.label}>
                      Mobile Number <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  {/* Row 2: City & Area / Location */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="city" className={styles.label}>
                      City <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="e.g. Hyderabad"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="location" className={styles.label}>
                      Area / Location <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      placeholder="e.g. Miyapur"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  {/* Row 3: Age & Previous Experience */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="age" className={styles.label}>
                      Age <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="60"
                      required
                      placeholder="e.g. 27"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="experience" className={styles.label}>
                      Previous Experience <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.selectWrapper}>
                      <select
                        id="experience"
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={styles.select}
                      >
                        <option value="" disabled>
                          Select experience
                        </option>
                        <option value="fresher">Fresher (0 years)</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3+">3+ years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Preferred Warehouse / Store Checkboxes */}
                <div className={styles.checkboxSection}>
                  <label className={styles.checkboxHeaderLabel}>
                    Preferred Warehouse/Store <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.checkboxGrid}>
                    {PREFERRED_STORES.map((store) => {
                      const isChecked = formData.preferredStores.includes(store.id);
                      return (
                        <label key={store.id} className={styles.checkboxItem}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(store.id)}
                            className={styles.hiddenCheckbox}
                          />
                          <span
                            className={`${styles.customCheckbox} ${
                              isChecked ? styles.checkedBox : ''
                            }`}
                            aria-hidden="true"
                          >
                            {isChecked && (
                              <svg
                                viewBox="0 0 12 10"
                                width="10"
                                height="8"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="1.5 5 4.5 8 10.5 1.5" />
                              </svg>
                            )}
                          </span>
                          <span className={styles.checkboxText}>{store.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {errorMessage && (
                  <div style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0' }}>
                    {errorMessage}
                  </div>
                )}

                {/* Row 5: Full-Width Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? 'Submitting...' : 'Apply Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseApplicationForm;
