'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './BenefitsHero.module.css';

export const BenefitsHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Benefits Hero">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Title & Description Row */}
      <div className={styles.contentContainer}>
        <div className={styles.titleRow}>
          <div className={styles.headingCol}>
            <h1 className={styles.mainTitle}>
              More Benefits. More
              <br />
              Possibilities.
            </h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>
              EV bike access, hostel accommodation and weekly bonuses help delivery executives get
              started and stay supported. Benefits and eligibility depend on the applicable
              programme.
            </p>
          </div>
        </div>

        {/* 3. Hero 3D Isometric Benefits Ecosystem Model */}
        <div className={styles.imageBannerWrapper}>
          <Image
            src="/assets/benefits/Hero.png"
            alt="DropyHub Ecosystem of Delivery Benefits and Partner Support"
            width={1462}
            height={670}
            priority
            className={styles.bannerImage}
            style={{ width: '1462px', height: '670px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 4. Hatched Divider Bar Transition after Hero with Dotted Rails */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke="#555555"
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
            stroke="#555555"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>
    </section>
  );
};

export default BenefitsHero;
