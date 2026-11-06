'use client';

import React from 'react';
import Image from 'next/image';
import styles from './WarehouseShuttle.module.css';

interface ShuttleItem {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const SHUTTLE_DATA: ShuttleItem[] = [
  {
    id: 'safe-commute',
    title: 'Safe Commute',
    description: 'Secure, clean and reliable shuttle services for every shift.',
    iconSrc: '/assets/warehouse/commute.svg',
  },
  {
    id: 'punctual-dispatch',
    title: 'Punctual Dispatch',
    description: 'Planned pickup routes help teams arrive on time and ready to work.',
    iconSrc: '/assets/warehouse/punctual.svg',
  },
  {
    id: 'gps-tracking',
    title: 'GPS Tracking',
    description: 'Live vehicle tracking keeps every commute visible and accountable.',
    iconSrc: '/assets/warehouse/gps.svg',
  },
];

export const WarehouseShuttle: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Dedicated Bus Transportation Service">
      {/* Continuous Side Rails at 40px: stops before the transition bars */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header: Zero Hassle Commute */}
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletDot} aria-hidden="true" />
            ZERO HASSLE COMMUTE
          </span>
          <h2 className={styles.heading}>Dedicated Bus Transportation</h2>
        </div>

        {/* 3 Shuttle Columns with left icon and stacked text */}
        <div className={styles.shuttleContentRow}>
          <div className={styles.cardsRow}>
            {SHUTTLE_DATA.map((item) => (
              <div key={item.id} className={styles.cardItem}>
                <div className={styles.iconCol}>
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.busIcon}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.textCol}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sideAccentBar} aria-hidden="true" />
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

      {/* Bar 2: White horizontal bar with slashes and dotted rail lines before Application Form */}
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

export default WarehouseShuttle;
