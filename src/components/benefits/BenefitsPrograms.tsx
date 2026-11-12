'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BenefitsPrograms.module.css';

interface ProgramCard {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const PROGRAM_CARDS: ProgramCard[] = [
  {
    id: 'loans',
    title: 'Financial Loans up to ₹10L',
    description:
      'Quick-disbursement loans for personal, medical, vehicle, or business needs. Partnered with licensed NBFCs for fast approval without complex paperwork. Exclusively for DropyHub partners.',
    iconSrc: '/assets/benefits/carbon_currency-rupee.svg',
  },
  {
    id: 'vouchers',
    title: 'BookMyShow Vouchers',
    description:
      'Exclusive discount vouchers and coupons redeemable at partner brands including BookMyShow, Amazon, and more. Special perks that go beyond your monthly salary.',
    iconSrc: '/assets/benefits/f7_tickets.svg',
  },
  {
    id: 'referral',
    title: 'Refer & Earn Programme',
    description:
      'Invite friends to join DropyHub and earn a cash bonus for every successful referral who completes their first month. Unlimited referrals, unlimited earning potential.',
    iconSrc: '/assets/benefits/iconmind_refer-friend-outline-thin.svg',
  },
  {
    id: 'hostel',
    title: 'Hostel Accommodation',
    description:
      'Accommodation options help delivery executives who need a place to stay near their work area. Availability and charges depend on the location and programme.',
    iconSrc: '/assets/benefits/energy-icons_hotel-20.svg',
  },
  {
    id: 'growth',
    title: 'Career Growth Pathway',
    description:
      'Merit-based promotion tracks from delivery executive to team lead, city coordinator, and operations manager. DropyHub grows with you — not just around you.',
    iconSrc: '/assets/benefits/fluent_arrow-trending-lines-24-regular.svg',
  },
];

export const BenefitsPrograms: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Partner Programmes and Growth Benefits">
      {/* Continuous Side Rails at 48px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {PROGRAM_CARDS.map((item) => (
            <div key={item.id} className={styles.cardItem}>
              <div className={styles.iconWrapper} aria-hidden="true">
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={26}
                  height={26}
                  className={styles.iconImage}
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}

          {/* 6th Empty Slot matching Figma grid */}
          <div className={`${styles.cardItem} ${styles.emptyCell}`} aria-hidden="true" />
        </div>
      </div>

      {/* White horizontal bar with crossed slashes and dotted side rails */}
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

export default BenefitsPrograms;
