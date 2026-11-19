'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './ServicesHero.module.css';

export const ServicesHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Services Hero">
            <Navbar />

            <div className={styles.contentContainer}>
        <div className={styles.imageBannerWrapper}>
          <Image
            src="/assets/services/image 91.png"
            alt="DropyHub Services Delivery Operations Ecosystem"
            width={1439}
            height={516}
            priority
            sizes="100vw"
            className={styles.desktopBannerImage}
          />
          <Image
            src="/assets/services/mobile_hero.png"
            alt="DropyHub Services Delivery Operations Ecosystem Mobile"
            width={402}
            height={268}
            priority
            className={styles.mobileBannerImage}
          />
        </div>
      </div>

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

export default ServicesHero;
