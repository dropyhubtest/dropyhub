'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './ServicesCtaFooter.module.css';

export const ServicesCtaFooter: React.FC = () => {
  return (
    <>
      <section className={styles.ctaSection} aria-label="Services Call to Action">
        {/* Continuous Side Rails at 48px for CTA Banner Only */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        {/* CTA Banner Container */}
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeftCol}>
              <h2 className={styles.ctaTitle}>
                Access All These Services At
                <br />
                Zero Cost
              </h2>
            </div>

            <div className={styles.ctaRightCol}>
              <p className={styles.ctaDescription}>
                Every service listed above is accessible to registered DropyHub partners.
                Registration is free, always.
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

export default ServicesCtaFooter;
