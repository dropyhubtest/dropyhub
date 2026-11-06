'use client';

import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous clean submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
                <h3 className={styles.successTitle}>Application Submitted!</h3>
                <p className={styles.successMessage}>
                  Thank you, <strong>{formData.fullName}</strong>. Our team will contact you on{' '}
                  <strong>{formData.mobileNumber}</strong> within 24–48 hours for immediate onboarding.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      mobileNumber: '',
                      city: '',
                      location: '',
                      age: '',
                      experience: '',
                      preferredStores: [],
                    });
                  }}
                  className={styles.resetBtn}
                >
                  Submit Another Application
                </button>
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
