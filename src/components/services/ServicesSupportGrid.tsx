'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ServicesSupportGrid.module.css';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ev-bike',
    title: 'EV Bike Support',
    description:
      'Explore EV bike access options that can help you get on the road without arranging a vehicle independently. Terms and availability apply.',
    iconSrc: '/assets/services/ic_round-toll.svg',
  },
  {
    id: 'hostel',
    title: 'Hostel Accommodation',
    description:
      'Find out about available accommodation options near supported delivery locations and what is included.',
    iconSrc: '/assets/services/energy-icons_cargo-bike-20.svg',
  },
  {
    id: 'bonuses',
    title: 'Weekly Bonuses',
    description:
      'Understand the active weekly incentive programme, including eligibility, order targets and payout timing.',
    iconSrc: '/assets/services/fluent_reward-20-regular.svg',
  },
  {
    id: 'vouchers',
    title: 'BookMyShow Vouchers',
    description:
      'Special purchasing vouchers and discount coupons redeemable at partner brands add real value beyond salary.',
    iconSrc: '/assets/services/f7_tickets.svg',
  },
];

export const ServicesSupportGrid: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Our Services - Delivery Support for Every Shift">
      {/* Continuous Side Rails at 48px: stops at 40px from bottom (start of white slashed bar) */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bulletDot} aria-hidden="true" />
              OUR SERVICES
            </span>
            <h2 className={styles.title}>Delivery Support for Every Shift</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              DropyHub provides end-to-end professional support — from your first day on the road to the peak of your career. Every service is available at zero registration cost.
            </p>
          </div>
        </div>

        {/* 2x2 Services Grid Table */}
        <div className={styles.servicesGrid}>
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className={styles.serviceCell}>
              <div className={styles.iconBox} aria-hidden="true">
                <Image
                  src={service.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.iconImage}
                />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>
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

export default ServicesSupportGrid;
