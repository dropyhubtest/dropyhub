'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './WarehouseHero.module.css';

export const WarehouseHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Warehouse Workforce Hero">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Title & Description Row */}
      <div className={styles.contentContainer}>
        <div className={styles.titleRow}>
          <div className={styles.headingCol}>
            <h1 className={styles.mainTitle}>
              Warehouse Workforce,
              <br />
              Simplified
            </h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>
              Connecting leading logistics businesses with skilled warehouse talent and reliable
              workforce solutions that keep operations running smoothly.
            </p>
          </div>
        </div>

        {/* 3. Hero 3D Warehouse Isometric Model */}
        <div className={styles.imageBannerWrapper}>
          <Image
            src="/assets/warehouse/hero.png"
            alt="DropyHub 3D Warehouse Operations and Fleet Hub"
            width={1455}
            height={683}
            priority
            className={styles.bannerImage}
            style={{ width: '1455px', height: '683px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 4. Hatched Divider Bar Transition after Hero */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
      </div>
    </section>
  );
};

export default WarehouseHero;
