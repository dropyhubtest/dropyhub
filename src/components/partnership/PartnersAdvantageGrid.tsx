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
      'Dedicated workforce deployment and real-time operations management for large-scale stadium logistics, partner events, and supply networks.',
    iconSrc: '/assets/partners/fluent_arrow-trending-lines-24-regular.svg',
  },
  {
    id: 'tickets',
    title: 'Match Ticket Rewards',
    description:
      'Top-performing delivery partners receive exclusive VIP match passes and stadium tickets to watch Sunrisers Hyderabad live in action.',
    iconSrc: '/assets/partners/f7_tickets_2.svg',
  },
  {
    id: 'merchandise',
    title: 'Exclusive Merchandise',
    description:
      'Official co-branded SRH caps, jerseys, and special edition kits awarded to outstanding delivery executives throughout the cricket season.',
    iconSrc: '/assets/partners/energy-icons_shirt-48.svg',
  },
  {
    id: 'media',
    title: 'National Media Exposure',
    description:
      'Unprecedented brand and partner visibility across live broadcasts, digital channels, and national stadium displays reaching millions.',
    iconSrc: '/assets/partners/bi_tv.svg',
  },
  {
    id: 'community',
    title: 'Community Activation',
    description:
      'Ground-level activations and community tournaments uniting delivery fleets and sports enthusiasts across metropolitan hubs.',
    iconSrc: '/assets/partners/fluent_people-community-20-regular.svg',
  },
  {
    id: 'recognition',
    title: 'Partner Recognition',
    description:
      'Celebrating the Spirit of the Game by honoring high-performing delivery partners alongside Sunrisers Hyderabad leadership.',
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
            <h2 className={styles.title}>Principles that Guide Our Delivery Platform</h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              DropyHub coordinates ground-level logistics, partner brand promotions, and delivery
              executive engagement in proud synergy with Sunrisers Hyderabad.
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
