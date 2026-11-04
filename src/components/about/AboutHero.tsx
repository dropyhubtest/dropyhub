'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './AboutHero.module.css';

export const AboutHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="About DropyHub Hero">
      {/* 1. Shared Global Navbar */}
      <Navbar />

      {/* 2. Main Title & Mission Statement (Title on left, description on right) */}
      <div className={styles.contentContainer}>
        <div className={styles.titleRow}>
          <div className={styles.headingCol}>
            <h1 className={styles.mainTitle}>Beyond Delivery</h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>
              DropyHub partners with delivery platforms and manages a dependable network
              of delivery executives helping orders reach customers while giving riders access
              to vehicles, accommodation and ongoing support.
            </p>
          </div>
        </div>

        {/* 3. Hero Team Photo Banner (covers 90% of the section width) */}
        <div className={styles.imageBannerWrapper}>
          <Image
            src="/assets/About/image-93.png"
            alt="DropyHub Delivery Partner Team in Hyderabad"
            width={1455}
            height={728}
            priority
            className={styles.bannerImage}
          />
        </div>
      </div>

      {/* 4. Horizontal Hatched Divider Bar after Hero Section
          (Side rails start AFTER this bar) */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
      </div>
    </section>
  );
};

export default AboutHero;
