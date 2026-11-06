'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BenefitsPartnerGrid.module.css';

interface PartnerBenefit {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    id: 'bonuses',
    title: 'Weekly Performance Bonuses',
    description:
      'Eligible delivery executives earn weekly bonuses based on active incentive programmes, completed orders and performance criteria.',
    iconSrc: '/assets/icons/fluent_reward-20-regular.svg',
  },
  {
    id: 'awards',
    title: 'Monthly & Annual Awards',
    description:
      'Top-performing partners receive cash prizes, vouchers, trophies and exclusive SRH match tickets.',
    iconSrc: '/assets/icons/material-symbols-light_featured-seasonal-and-gifts-rounded.svg',
  },
  {
    id: 'insurance',
    title: 'Full Insurance Coverage',
    description:
      'Comprehensive accidental insurance from day one, plus a 24/7 SOS emergency helpline through our app.',
    iconSrc: '/assets/icons/akar-icons_file.svg',
  },
  {
    id: 'ev-bike',
    title: 'EV Bike Access',
    description:
      "Access EV bikes through DropyHub's support programme, subject to availability, eligibility and rental terms.",
    iconSrc: '/assets/icons/energy-icons_cargo-bike-20.svg',
  },
  {
    id: 'safety',
    title: 'Safety Gear & Uniform',
    description:
      'Professional uniform, branded helmet, reflective jacket and complete safety equipment are provided and maintained.',
    iconSrc: '/assets/icons/healthicons_construction-worker-outline.svg',
  },
  {
    id: 'support',
    title: '24/7 Partner Support',
    description:
      'A multilingual helpdesk is available around the clock for questions, grievances and emergencies.',
    iconSrc: '/assets/icons/hugeicons_customer-support.svg',
  },
];

export const BenefitsPartnerGrid: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Partner Benefits Built for Your Well-being & Growth">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              PARTNER BENEFITS
            </span>
            <h2 className={styles.title}>
              Built for Your Well-being &amp; Growth
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              DropyHub is more than a delivery platform. It is a complete life and career support system for every delivery executive who joins our family.
            </p>
          </div>
        </div>

        {/* 2-Column Dark Grid with New Icons */}
        <div className={styles.cardsGrid}>
          {PARTNER_BENEFITS.map((item) => (
            <div key={item.id} className={styles.cardItem}>
              <div className={styles.iconBox} aria-hidden="true">
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.iconImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar 1: Normal black bar with dotted side rails */}
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

export default BenefitsPartnerGrid;
