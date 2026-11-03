'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './AboutCtaFooter.module.css';

export const AboutCtaFooter: React.FC = () => {
  return (
    <section className={styles.ctaFooterSection} aria-label="Call to Action and Footer">
      {/* Continuous Side Rails for CTA Section */}
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
              Join 5,000+ active delivery partners across 12+ Indian cities today.
              Zero registration fees, complete vehicle support, and daily stability.
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

              <a href="#contact" className={styles.tertiaryLink}>
                Talk to an Advisor
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Global Footer */}
      <Footer showRails={true} />
    </section>
  );
};

export default AboutCtaFooter;
