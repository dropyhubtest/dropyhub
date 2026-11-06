'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './ContactHeroForm.module.css';

const CHECKLIST_ITEMS = [
  'Zero Registration Fee - Always',
  'Start Earning Within 48 Hours',
  'Multi-Platform Partner Access',
  'Insurance & Safety Gear Included',
  'Financial Loans Available from Day 1',
];

const PREFERRED_COMPANIES = [
  'Swiggy',
  'Zepto',
  'Amazon',
  'Flipkart',
  'Rapido',
  'Blinkit',
  'Swiggy instant',
  'Other',
];

const JOB_TYPES = [
  'Delivery Executive',
  'Warehouse Associate',
  'Store Associate (Blinkit / Zepto / Instamart)',
];

export const ContactHeroForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    age: '',
    city: '',
    area: '',
    hasBike: '',
    hasLicense: '',
    preferredCompanies: [] as string[],
    jobTypes: [] as string[],
    experience: '',
    employmentStatus: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyToggle = (company: string) => {
    setFormData((prev) => {
      const exists = prev.preferredCompanies.includes(company);
      return {
        ...prev,
        preferredCompanies: exists
          ? prev.preferredCompanies.filter((c) => c !== company)
          : [...prev.preferredCompanies, company],
      };
    });
  };

  const handleJobTypeToggle = (jobType: string) => {
    setFormData((prev) => {
      const exists = prev.jobTypes.includes(jobType);
      return {
        ...prev,
        jobTypes: exists
          ? prev.jobTypes.filter((j) => j !== jobType)
          : [...prev.jobTypes, jobType],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} aria-label="Contact Us & Application Form">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Content Container (Black section has no left/right side rails per Figma) */}
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* =============================================================
              Left Column: Value Narrative, Checklist, Contact Info
              ============================================================= */}
          <div className={styles.leftCol}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              Apply Now
            </span>

            <h1 className={styles.title}>
              START YOUR JOURNEY
              <span className={styles.titleHighlight}>TODAY. FOR FREE.</span>
            </h1>

            <p className={styles.narrative}>
              Register as a DropyHub delivery partner and unlock a world of earning
              potential, career support, and financial empowerment — at absolutely zero
              cost.
            </p>

            {/* Checklist */}
            <ul className={styles.checklist}>
              {CHECKLIST_ITEMS.map((item, idx) => (
                <li key={idx} className={styles.checkItem}>
                  <div className={styles.tickIconWrapper}>
                    <Image
                      src="/assets/icons/hugeicons_tick-01.svg"
                      alt=""
                      width={16}
                      height={16}
                      className={styles.tickIcon}
                      aria-hidden="true"
                    />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Direct Contact Info */}
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:contact@dropyhub.com" className={styles.contactItemLink}>
                  contact@dropyhub.com
                </a>
              </div>

              <div className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  3rd Floor, plot no. 11, Sector 3, HUDA Techno Enclave,
                  <br />
                  Madhapur, Hyderabad, Telangana 500081
                </span>
              </div>
            </div>
          </div>

          {/* =============================================================
              Right Column: Application Form Card
              ============================================================= */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                DropyHub - Delivery Executive Application Form
              </h2>
              <p className={styles.formSubtitle}>
                Fill in your details and we&apos;ll get you started.
              </p>
            </div>

            {submitted ? (
              <div className={styles.successMessage}>
                <strong>Application Submitted Successfully!</strong>
                <p style={{ margin: '8px 0 0 0', color: '#b6e8bf' }}>
                  Thank you! Our onboarding team will contact you within 24–48 hours to
                  verify your documents and get you started on the road.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                {/* Row 1: Full Name & Mobile */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="fullName">
                      Full Name<span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      className={styles.input}
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="mobileNumber">
                      Mobile Number<span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      placeholder="e.g. *********65"
                      className={styles.input}
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Age */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      Email ID (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. Hyderabad"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="age">
                      Age<span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      min={18}
                      max={65}
                      placeholder="e.g. 27"
                      className={styles.input}
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 3: City & Area */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="city">
                      City<span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="e.g. Miyapur"
                      className={styles.input}
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="area">
                      Area / Location<span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="area"
                      name="area"
                      type="text"
                      required
                      placeholder="e.g. Miyapur"
                      className={styles.input}
                      value={formData.area}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Field 4: Do you have a bike? */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Do You Have a Bike?<span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.radioRow}>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="hasBike"
                        value="Yes"
                        required
                        className={styles.radioInput}
                        checked={formData.hasBike === 'Yes'}
                        onChange={handleInputChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="hasBike"
                        value="No (Need Bike Rental)"
                        required
                        className={styles.radioInput}
                        checked={formData.hasBike === 'No (Need Bike Rental)'}
                        onChange={handleInputChange}
                      />
                      <span>No (Need Bike Rental)</span>
                    </label>
                  </div>
                </div>

                {/* Field 5: Driving License Available? */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Driving License Available?<span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.radioRow}>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="hasLicense"
                        value="Yes"
                        required
                        className={styles.radioInput}
                        checked={formData.hasLicense === 'Yes'}
                        onChange={handleInputChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className={styles.radioOption}>
                      <input
                        type="radio"
                        name="hasLicense"
                        value="No"
                        required
                        className={styles.radioInput}
                        checked={formData.hasLicense === 'No'}
                        onChange={handleInputChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Field 6: Preferred Company */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Preferred Company<span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.preferredGrid}>
                    {PREFERRED_COMPANIES.map((company) => (
                      <label key={company} className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={formData.preferredCompanies.includes(company)}
                          onChange={() => handleCompanyToggle(company)}
                        />
                        <span>{company}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Field 7: Job Type Interested */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Job Type Interested<span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.jobTypeContainer}>
                    <div className={styles.jobTypeRow}>
                      <label className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={formData.jobTypes.includes('Delivery Executive')}
                          onChange={() => handleJobTypeToggle('Delivery Executive')}
                        />
                        <span>Delivery Executive</span>
                      </label>
                      <label className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={formData.jobTypes.includes('Warehouse Associate')}
                          onChange={() => handleJobTypeToggle('Warehouse Associate')}
                        />
                        <span>Warehouse Associate</span>
                      </label>
                    </div>
                    <div className={styles.jobTypeRow}>
                      <label className={styles.checkboxOption}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={formData.jobTypes.includes('Store Associate (Blinkit / Zepto / Instamart)')}
                          onChange={() => handleJobTypeToggle('Store Associate (Blinkit / Zepto / Instamart)')}
                        />
                        <span>Store Associate (Blinkit / Zepto / Instamart)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Row 8: Previous Experience & Employment Status */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="experience">
                      Previous Experience<span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      className={styles.select}
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="">e.g. 1</option>
                      <option value="Fresher">Fresher (No experience)</option>
                      <option value="0-6 Months">0 - 6 Months</option>
                      <option value="6-12 Months">6 - 12 Months</option>
                      <option value="1-2 Years">1 - 2 Years</option>
                      <option value="2+ Years">2+ Years</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="employmentStatus">
                      Current Employment Status
                    </label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      className={styles.select}
                      value={formData.employmentStatus}
                      onChange={handleInputChange}
                    >
                      <option value="">e.g. 1</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Employed Full-time">Employed Full-time</option>
                      <option value="Employed Part-time">Employed Part-time</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                </div>

                {/* Field 9: Message / Additional Details */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    Message / Additional Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Share other details you want to share."
                    className={styles.textarea}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitBtn}>
                  Submit
                  <span aria-hidden="true">↗</span>
                </button>

                {/* Disclaimer */}
                <p className={styles.disclaimer}>
                  By applying, you agree to our Privacy Policy. We will never share your
                  details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 4. White Slashed Divider Bar at bottom of dark section */}
      <div className={styles.whiteSlashedDivider} aria-hidden="true">
        <div className={styles.whiteSlashedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke="#c3c4c8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <svg className={styles.brokenRailRight} viewBox="0 0 2 40" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke="#c3c4c8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactHeroForm;
