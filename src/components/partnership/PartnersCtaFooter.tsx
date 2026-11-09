'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './PartnersCtaFooter.module.css';

export const PartnersCtaFooter: React.FC = () => {
  return (
    <>
      <section className={styles.ctaSection} aria-label="Join the Winning Team Partnership CTA">
        {/* White horizontal bar with slashes and dotted side rails */}
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

        {/* Continuous Side Rails at 48px */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        {/* CTA Banner Container */}
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeftCol}>
              <h2 className={styles.ctaTitle}>Join the Winning Team</h2>
            </div>

            <div className={styles.ctaRightCol}>
              <p className={styles.ctaDescription}>
                Be part of a platform associated with India&apos;s most exciting cricket franchise.
                Register as a delivery partner today — completely free.
              </p>
              <div className={styles.ctaBtnRow}>
                <Link href="/apply" className={styles.primaryBtn}>
                  Apply now for free
                  <span className={styles.btnArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link href="/benefits" className={styles.secondaryBtn}>
                  View Benefits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Unified Footer */}
      <Footer showRails={true} />
    </>
  );
};

export default PartnersCtaFooter;
