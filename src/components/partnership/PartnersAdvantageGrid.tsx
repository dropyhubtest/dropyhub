'use client';

import React from 'react';
import Image from 'next/image';
import styles from './PartnersAdvantageGrid.module.css';

interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const ADVANTAGE_ITEMS: AdvantageItem[] = [
  {
    id: 'workforce',
    title: 'Workforce Deployment',
    description:
      'DropyHub branding appears across all SRH match venues, jerseys, and official digital channels during TATA IPL 2025.',
    iconSrc: '/assets/partners/fluent_arrow-trending-lines-24-regular.svg',
  },
  {
    id: 'tickets',
    title: 'Match Ticket Rewards',
    description:
      'Top-performing delivery partners are rewarded with exclusive SRH match tickets as part of our incentive programme.',
    iconSrc: '/assets/partners/f7_tickets_2.svg',
  },
  {
    id: 'merchandise',
    title: 'Branded Merchandise',
    description:
      'Official SRH × DropyHub co-branded merchandise gifted to our star partners and during special campaigns.',
    iconSrc: '/assets/partners/energy-icons_shirt-48.svg',
  },
  {
    id: 'media',
    title: 'National Media Exposure',
    description:
      'The partnership receives national TV and digital media coverage during the TATA IPL season, elevating the DropyHub brand.',
    iconSrc: '/assets/partners/bi_tv.svg',
  },
  {
    id: 'community',
    title: 'Community & Spirit',
    description:
      'We share the SRH spirit of teamwork, performance, and rising above challenges - just like our delivery partners.',
    iconSrc: '/assets/partners/fluent_people-community-20-regular.svg',
  },
  {
    id: 'recognition',
    title: 'Partner Recognition',
    description:
      'Monthly “Star Partner” awards have a special SRH edition during TATA IPL season with exclusive prizes.',
    iconSrc: '/assets/partners/lsicon_hand-shake-outline_2.svg',
  },
];

export const PartnersAdvantageGrid: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Working Together Principles">
      {/* Side Rails at 48px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              WORKING TOGETHER
            </span>
            <h2 className={styles.title}>A Reliable Last-Mile Delivery Partner</h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              We aim to make delivery operations easier to coordinate by building a supported
              delivery-executive network and aligning people, vehicles and local operations with
              partner needs.
            </p>
          </div>
        </div>

        {/* 2-Column x 3-Row Grid */}
        <div className={styles.cardsGrid}>
          {ADVANTAGE_ITEMS.map((item) => (
            <div key={item.id} className={styles.cardItem}>
              <div className={styles.iconBox}>
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={36}
                  height={36}
                  className={styles.iconImage}
                  aria-hidden="true"
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

      {/* White horizontal bar with slashes and dotted side rails */}
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

export default PartnersAdvantageGrid;
