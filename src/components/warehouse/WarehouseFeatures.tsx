'use client';

import React from 'react';
import Image from 'next/image';
import styles from './WarehouseFeatures.module.css';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconType: 'users' | 'clock' | 'shield';
}

const FEATURES_DATA: FeatureCard[] = [
  {
    id: 'workforce-deployment',
    title: 'Workforce Deployment',
    description:
      'Strategic manpower supply for major logistics giants. We bridge skilled labor with global fulfillment centers like Flipkart and Amazon.',
    iconType: 'users',
  },
  {
    id: 'real-time-operations',
    title: 'Real-time Operations',
    description:
      'Our employees handle complex warehouse management systems, ensuring seamless inventory flow and accurate dispatching.',
    iconType: 'clock',
  },
  {
    id: 'safe-standards',
    title: 'Safe Standards',
    description:
      'Every employee is vetted and follows the highest safety standards required by tier-1 logistics hubs.',
    iconType: 'shield',
  },
];

export const WarehouseFeatures: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Warehouse Talent and Operations Features">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      {/* Header Row: Title on Left, Narrative on Right */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerLeftCol}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletDot} aria-hidden="true" />
            TIER-1 PARTNERSHIPS
          </span>
          <h2 className={styles.heading}>Fueling the Engines of E-Commerce</h2>
        </div>

        <div className={styles.headerRightCol}>
          <p className={styles.headerDescription}>
            DropyHub is a trusted partner for leaders like Flipkart and Amazon. We don&apos;t just
            supply labor; we build the specialized workforce that keeps the world&apos;s largest supply
            chains moving efficiently.
          </p>
        </div>
      </div>

      {/* 3-Column Grid Table: Connected directly to Left & Right Rails */}
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {FEATURES_DATA.map((item) => (
            <div key={item.id} className={styles.featureCell}>
              <div className={styles.iconWrapper}>
                {item.iconType === 'users' && (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#807f7f"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {item.iconType === 'clock' && (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#807f7f"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )}
                {item.iconType === 'shield' && (
                  <Image
                    src="/assets/warehouse/reicon_security-safe.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.shieldIcon}
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className={styles.cellTitle}>{item.title}</h3>
              <p className={styles.cellDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WarehouseFeatures;
