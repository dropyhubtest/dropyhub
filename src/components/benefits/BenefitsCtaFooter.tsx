'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './BenefitsCtaFooter.module.css';

export const BenefitsCtaFooter: React.FC = () => {
  return (
    <>
      <section className={styles.ctaSection} aria-label="Benefits Registration Call to Action">
        {/* White horizontal bar with slashes and dotted rail lines before CTA */}
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

        {/* Continuous Side Rails at 48px for CTA Banner Only */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        {/* CTA Banner */}
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeftCol}>
              <h2 className={styles.ctaTitle}>
                Unlock All Benefits — Join Free Today
              </h2>
            </div>

            <div className={styles.ctaRightCol}>
              <p className={styles.ctaDescription}>
                Every benefit listed is available from day one. Zero registration fee, zero waiting period.
              </p>
              <div className={styles.ctaBtnRow}>
                <Link href="/apply" className={styles.primaryBtn}>
                  Join Now Free
                  <span className={styles.btnArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link href="/services" className={styles.secondaryBtn}>
                  View services
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

export default BenefitsCtaFooter;
