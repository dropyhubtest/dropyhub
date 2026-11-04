'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './AboutCtaFooter.module.css';

export const AboutCtaFooter: React.FC = () => {
  return (
    <>
      <section className={styles.ctaSection} aria-label="Call to Action">
        {/* Continuous Side Rails for CTA Section Only */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        <div className={styles.container}>
          {/* CTA Banner */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeftCol}>
              <h2 className={styles.ctaTitle}>
                Ready to Be Part of the DropyHub Family?
              </h2>
            </div>

            <div className={styles.ctaRightCol}>
              <p className={styles.ctaDescription}>
                Zero registration fee. Real earnings. Comprehensive benefits. A career
                worth building. Join 5,000+ partners who have already made the smart choice.
              </p>

              <div className={styles.ctaBtnRow}>
                <Link href="/apply" className={styles.primaryBtn}>
                  <span>Apply Now for Free</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>

                <Link href="/services" className={styles.secondaryBtn}>
                  <span>Explore Services</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>

                <Link href="#benefits" className={styles.tertiaryLink}>
                  View Benefits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Global Footer */}
      <Footer showRails={true} />
    </>
  );
};

export default AboutCtaFooter;
