'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ServicesProcess.module.css';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconSrc: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'join',
    stepNumber: '01',
    title: 'Join DropyHub',
    description:
      'Register your interest and share the basic details needed for onboarding. Registration is free where stated in the current programme.',
    iconSrc: '/assets/services/ic_round-toll.svg',
  },
  {
    id: 'match',
    stepNumber: '02',
    title: 'Get Matched',
    description:
      'We coordinate with partner platforms and delivery operations to match eligible executives with available work in supported locations.',
    iconSrc: '/assets/services/basil_location-outline.svg',
  },
  {
    id: 'ready',
    stepNumber: '03',
    title: 'Get Ready to Deliver',
    description:
      'Learn the process and check availability for EV bike access, hostel accommodation and any required safety equipment.',
    iconSrc: '/assets/services/energy-icons_user-check-20.svg',
  },
  {
    id: 'earn',
    stepNumber: '04',
    title: 'Deliver, Track & Earn',
    description:
      'Complete assigned deliveries and check the applicable payout and weekly bonus rules for your programme.',
    iconSrc: '/assets/services/iconoven_delivery-scooter.svg',
  },
];

export const ServicesProcess: React.FC = () => {
  return (
    <section className={styles.section} aria-label="How Delivery Works Process">
      {/* Continuous Side Rails at 48px: stops before the transition bars (36px + 40px = 76px) */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              PROCESS
            </span>
            <h2 className={styles.title}>How Delivery Works</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Four simple steps to change your career trajectory — starting today.
            </p>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className={styles.processGrid}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.stepTopRow}>
                <div className={styles.iconBox} aria-hidden="true">
                  <Image
                    src={step.iconSrc}
                    alt=""
                    width={28}
                    height={28}
                    className={styles.iconImage}
                  />
                </div>
                <span className={styles.stepNumber}>{step.stepNumber}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar 1: Normal black spacer bar with dotted side rails */}
      <div className={styles.blackSpacerBar} aria-hidden="true">
        <svg className={styles.blackBarRailLeft} viewBox="0 0 2 36" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="36"
            stroke="#555555"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <svg className={styles.blackBarRailRight} viewBox="0 0 2 36" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="36"
            stroke="#555555"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Bar 2: White horizontal bar with crossed slashes and dotted side rails */}
      <div className={styles.whiteSlashedDivider} aria-hidden="true">
        <div className={styles.whiteSlashedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke="#c3c4c8"
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
            stroke="#c3c4c8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>
    </section>
  );
};

export default ServicesProcess;
