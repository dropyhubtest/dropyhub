'use client';

import React from 'react';
import Image from 'next/image';
import styles from './PartnersSponsorsSection.module.css';

export const PartnersSponsorsSection: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Official Sponsors & Partners Gallery">
      {/* Side Rails at 48px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              PARTNER ECOSYSTEM
            </span>
            <h2 className={styles.title}>Delivery Platforms &amp; Business Partners</h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Our partner network includes food delivery, grocery, e-commerce and other last-mile
              businesses working together through one connected ecosystem.
            </p>
          </div>
        </div>

        {/* Sponsors Card (Full Width Grid) */}
        <div className={styles.sponsorsCard}>
          <Image
            src="/assets/partners/sponsors.jpg"
            alt="Official Sponsors of Sunrisers Hyderabad including Title Sponsor Dream11, Principal Sponsors, and Club Partners featuring DropyHub"
            width={1245}
            height={414}
            className={styles.sponsorsImg}
            priority
          />
        </div>

        {/* Partners Poster (Framed Poster) */}
        <div className={styles.partnersPosterWrapper}>
          <Image
            src="/assets/partners/partners.jpg"
            alt="Our Partners Official Poster featuring City Union Bank, Campa, Dropyhub Staffing Solution Partner, AirAsia, Kingfisher, loop earplugs, Uber Moto, Star Insurance, Wrogn, and more"
            width={546}
            height={683}
            className={styles.partnersPosterImg}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSponsorsSection;
