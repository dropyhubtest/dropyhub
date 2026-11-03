'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutStatsPillars.module.css';

interface StatMetric {
  id: string;
  value: string;
  label: string;
  iconSrc: string;
}

const STATS_DATA: StatMetric[] = [
  {
    id: 'partners',
    value: '5000⁺',
    label: 'Active Delivery Partners',
    iconSrc: '/assets/About/users-plus.svg',
  },
  {
    id: 'earnings',
    value: '₹18–32K',
    label: 'Avg Monthly Earnings',
    iconSrc: '/assets/About/carbon_currency-rupee.svg',
  },
  {
    id: 'platforms',
    value: '11⁺',
    label: 'Platform Partners',
    iconSrc: '/assets/About/fluent_handshake-20-regular.svg',
  },
  {
    id: 'loan',
    value: '₹10L',
    label: 'Max Loan Available',
    iconSrc: '/assets/About/fluent_money-20-regular.svg',
  },
  {
    id: 'onboarding',
    value: '48 hrs',
    label: 'Onboarding Time',
    iconSrc: '/assets/About/akar-icons_clock.svg',
  },
  {
    id: 'reg-fee',
    value: '₹ 0 Rs',
    label: 'Registration Fee',
    iconSrc: '/assets/About/currency-rupee.svg',
  },
];

const COMMITMENTS = [
  'Zero upfront fees or registration charges for delivery executives',
  'Fair, prompt weekly payouts with transparent earnings calculations',
  'Verified, reliable riders equipped with safety gear and platform support',
  'Real EV fleet with affordable rental and maintenance options',
];

export const AboutStatsPillars: React.FC = () => {
  return (
    <section className={styles.statsSection} aria-label="Key Metrics, Mission and Vision">
      <div className={styles.container}>
        {/* 1. 6-Metric Stats Bar */}
        <div className={styles.statsBar}>
          {STATS_DATA.map((stat, idx) => (
            <div key={stat.id} className={styles.statCol}>
              <div className={styles.statIconWrapper}>
                <Image
                  src={stat.iconSrc}
                  alt=""
                  width={22}
                  height={22}
                  className={styles.statIcon}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.statText}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
              {idx < STATS_DATA.length - 1 && (
                <div className={styles.colSeparator} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* 2. Three Pillar Cards Grid (Mission, Vision, Commitments) */}
        <div className={styles.pillarsGrid}>
          {/* Card 1: Mission */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              OUR MISSION
            </span>
            <h3 className={styles.pillarTitle}>
              Building India&apos;s Trusted Delivery Ecosystem.
            </h3>
            <p className={styles.pillarDescription}>
              To build a credible, reliable delivery network that provides leading platforms
              with disciplined, trained delivery executives while giving partners structured
              career pathways, guaranteed daily earnings, and supportive ecosystem benefits.
            </p>
          </div>

          {/* Card 2: Vision */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              OUR VISION
            </span>
            <h3 className={styles.pillarTitle}>
              Empowering Every Delivery Partner.
            </h3>
            <p className={styles.pillarDescription}>
              To empower every delivery partner with dignified, reliable earning opportunities,
              access to EV vehicles, hostel accommodation, career development, and financial safety
              nets so they build lasting careers in the logistics sector.
            </p>
          </div>

          {/* Card 3: Commitment Checklist */}
          <div className={styles.pillarCard}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              THE DROPYHUB COMMITMENT
            </span>
            <ul className={styles.checklist}>
              {COMMITMENTS.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    ✓
                  </span>
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
