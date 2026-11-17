'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BenefitsPartnerGrid.module.css';

interface PartnerBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    id: 'bonuses',
    title: 'Weekly Performance Bonuses',
    description:
      'Eligible delivery executives earn weekly bonuses based on active incentive programmes, completed orders and performance criteria.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    id: 'awards',
    title: 'Monthly & Annual Awards',
    description:
      'Top-performing partners receive cash prizes, vouchers, trophies and exclusive SRH match tickets.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 4.5-4.5 2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
  },
  {
    id: 'insurance',
    title: 'Full Insurance Coverage',
    description:
      'Comprehensive accidental insurance from day one, plus a 24/7 SOS emergency helpline through our app.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    id: 'ev-bike',
    title: 'EV Bike Access',
    description:
      "Access EV bikes through DropyHub's support programme, subject to availability, eligibility and rental terms.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M6 15h7l2-7h3" />
        <path d="M17 5h2" />
        <path d="M9 18l3-6h4" />
      </svg>
    ),
  },
  {
    id: 'safety',
    title: 'Safety Gear & Uniform',
    description:
      'Professional uniform, branded helmet, reflective jacket and complete safety equipment are provided and maintained.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        <circle cx="12" cy="11" r="3" />
        <path d="M6 8a6 6 0 0 1 12 0H6z" />
        <line x1="4" y1="8" x2="20" y2="8" />
      </svg>
    ),
  },
  {
    id: 'support',
    title: '24/7 Partner Support',
    description:
      'A multilingual helpdesk is available around the clock for questions, grievances and emergencies.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
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

        {/* Hairline Divider connecting under header matching Image 1 */}
        <div className={styles.headerDivider} aria-hidden="true" />

        {/* 2-Column Dark Grid with New Icons */}
        <div className={styles.cardsGrid}>
          {PARTNER_BENEFITS.map((item) => (
            <div key={item.id} className={styles.cardItem}>
              <div className={styles.iconBox} aria-hidden="true">
                {item.icon}
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
