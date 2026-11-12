'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutStatsPillars.module.css';

interface StatMetric {
  id: string;
  value: string;
  label: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
}

const STATS_DATA: StatMetric[] = [
  {
    id: 'partners',
    value: '5000⁺',
    label: 'Active Partners',
    iconSrc: '/assets/icons/user.svg',
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    id: 'cities',
    value: '12⁺',
    label: 'Cities Covered',
    iconSrc: '/assets/icons/location.svg',
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    id: 'platforms',
    value: '11⁺',
    label: 'Platform Partners',
    iconSrc: '/assets/icons/shake-hands.svg',
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    id: 'loan',
    value: '₹10L',
    label: 'Max Loan Available',
    iconSrc: '/assets/icons/loan.svg',
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    id: 'onboarding',
    value: '48 hrs',
    label: 'Onboarding Time',
    iconSrc: '/assets/icons/clock.svg',
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    id: 'reg-fee',
    value: '₹0',
    label: 'Registration Fee',
    iconSrc: '/assets/icons/rupee.svg',
    iconWidth: 24,
    iconHeight: 34,
  },
];

const WHY_CHOOSE_ITEMS = [
  'Weekly incentives and partner reward programmes',
  'Accommodation options and career development support',
  'Dedicated assistance for delivery partners and businesses',
  'Flexible EV vehicle rental options',
];

export const AboutStatsPillars: React.FC = () => {
  return (
    <section className={styles.statsSection} aria-label="Key Metrics, Vision and Mission">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      {/* 1. 6-Metric Stats Bar: Full-width boxes connected to rails at 40px */}
      <div className={styles.statsBarWrapper}>
        <div className={styles.statsGrid}>
          {STATS_DATA.map((stat) => (
            <div key={stat.id} className={styles.statBox}>
              <div className={styles.statIconWrapper}>
                <Image
                  src={stat.iconSrc}
                  alt=""
                  width={stat.iconWidth}
                  height={stat.iconHeight}
                  className={styles.statIcon}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.statText}>
                <span className={styles.statValue}>
                  {stat.id === 'partners' ? (
                    <>
                      5000<sup className={styles.plusSup}>+</sup>
                    </>
                  ) : stat.id === 'platforms' ? (
                    <>
                      11<sup className={styles.plusSup}>+</sup>
                    </>
                  ) : (
                    stat.value
                  )}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Three Pillar Cards Grid (Vision, Mission, Why Choose DropyHub) */}
      <div className={styles.pillarsWrapper}>
        <div className={styles.pillarsGrid}>
          {/* Card 1: OUR VISION */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              OUR VISION
            </span>
            <h3 className={styles.pillarTitle}>
              Building India&apos;s Trusted Delivery Ecosystem.
            </h3>
            <p className={styles.pillarDescription}>
              To build one of India&apos;s most trusted delivery partner ecosystems, Connecting delivery partners, businesses and essential services to create a more rewarding and respected future for delivery work.
            </p>
          </div>

          {/* Card 2: OUR MISSION */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              OUR MISSION
            </span>
            <h3 className={styles.pillarTitle}>
              Empowering Every Delivery Partner.
            </h3>
            <p className={styles.pillarDescription}>
              To empower every delivery partner with meaningful work opportunities, essential resources, financial support and career development, helping them build a stable livelihood and a brighter future.
            </p>
          </div>

          {/* Card 3: WHY CHOOSE DROPYHUB */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              WHY CHOOSE DROPYHUB
            </span>
            <ul className={styles.checklist}>
              {WHY_CHOOSE_ITEMS.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <svg
                    className={styles.checkIcon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="#2C2A2A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.checkText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsPillars;
