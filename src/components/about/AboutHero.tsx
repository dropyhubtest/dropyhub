'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutHero.module.css';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about', active: true },
  { label: 'WAREHOUSE', href: '/warehouse' },
  { label: 'SERVICES', href: '/services' },
  { label: 'BENEFITS', href: '/benefits' },
  { label: 'PARTNERSHIP', href: '/partnership' },
];

export const AboutHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="About DropyHub Hero">
      {/* 1. Header Navigation */}
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Link href="/" aria-label="DropyHub Home">
            <Image
              src="/assets/Home/Dropyhub_logo.png"
              alt="DropyHub Logo"
              width={88}
              height={54}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>

        <nav className={styles.navigation} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${item.active ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="#join" className={styles.joinNowButton}>
            JOIN NOW
          </Link>
        </nav>
      </header>

      {/* Decorative vertical rails (visual continuity with desktop system) */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      {/* 2. Main Title & Mission Statement */}
      <div className={styles.contentContainer}>
        <div className={styles.titleRow}>
          <div className={styles.headingCol}>
            <h1 className={styles.mainTitle}>Beyond Delivery</h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>
              DropyHub is the partner-first platform that manages a captive fleet network
              of delivery executives helping riders reach potential while giving riders access
              to vehicles, financial assistance and growth support.
            </p>
          </div>
        </div>

        {/* 3. Hero Team Photo Banner */}
        <div className={styles.imageBannerWrapper}>
          <Image
            src="/assets/About/image-93.png"
            alt="DropyHub Delivery Partner Team in Hyderabad"
            width={1392}
            height={696}
            priority
            className={styles.bannerImage}
          />
        </div>
      </div>

      {/* 4. Horizontal Hatched Divider Bar at Section Bottom */}
      <div className={styles.hatchedDivider} aria-hidden="true" />
    </section>
  );
};

export default AboutHero;
