'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './WarehouseCtaFooter.module.css';

export const WarehouseCtaFooter: React.FC = () => {
  return (
    <>
      <section className={styles.ctaSection} aria-label="Call to Action">
        {/* 1. White horizontal bar with slashes and dotted rail lines before CTA */}
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

        {/* 2. Continuous Side Rails for CTA Section Only */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        {/* 3. CTA Banner */}
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeftCol}>
              <h2 className={styles.ctaTitle}>
                Join Our Hub Network
              </h2>
            </div>

            <div className={styles.ctaRightCol}>
              <p className={styles.ctaDescription}>
                Ready to work with the biggest names in logistics? Start your journey with
                DropyHub today.
              </p>

              <div className={styles.ctaBtnRow}>
                <Link href="/apply" className={styles.primaryBtn}>
                  <span>Apply as executive</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Footer */}
      <Footer showRails={true} />
    </>
  );
};

export default WarehouseCtaFooter;
