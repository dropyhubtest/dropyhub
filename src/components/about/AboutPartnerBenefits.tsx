'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutPartnerBenefits.module.css';

const PARTNER_LOGOS = [
  { name: 'YogaBar', src: '/assets/Home/yogabar.png', width: 44, height: 32 },
  { name: 'Delhivery', src: '/assets/Home/delhivery.png', width: 140, height: 32 },
  { name: 'BigBasket', src: '/assets/Home/big_basket.png', width: 120, height: 32 },
  { name: 'BookMyShow', src: '/assets/Home/bms.png', width: 120, height: 32 },
  { name: 'Zepto', src: '/assets/Home/zepto.png', width: 85, height: 32 },
  { name: 'Rapido', src: '/assets/Home/rapido.png', width: 95, height: 32 },
  { name: 'Shadowfax', src: '/assets/Home/shadowfax.png', width: 130, height: 32 },
  { name: 'Amazon', src: '/assets/Home/amazon.png', width: 110, height: 32 },
  { name: 'Blinkit', src: '/assets/Home/blinkit.png', width: 90, height: 32 },
  { name: 'Swiggy', src: '/assets/Home/swiggy.png', width: 100, height: 32 },
  { name: 'Zomato', src: '/assets/Home/zomato.png', width: 100, height: 32 },
  { name: 'Uber', src: '/assets/Home/uber.png', width: 80, height: 32 },
];

// Repeat 3 times for a seamless infinite marquee
const DISPLAY_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

interface BenefitBox {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const BENEFITS_DATA: BenefitBox[] = [
  {
    id: 'multi-platform',
    title: 'Multi-Platform Access',
    description:
      'Work with Swiggy, Zomato, Amazon, Blinkit, Zepto, Flipkart, BookMyShow and more through one partnership.',
    iconSrc: '/assets/About/energy-icons_monitor-20-bold.svg',
  },
  {
    id: 'weekly-pay',
    title: 'Guaranteed Weekly Pay',
    description:
      'Performance bonuses are credited every Monday and base salary is paid monthly with complete transparency.',
    iconSrc: '/assets/About/fluent_money-20-regular.svg',
  },
  {
    id: 'safety-net',
    title: 'Financial Safety Net',
    description:
      'Loans up to ₹10 lakhs through professional, licensed lending from our NBFC partnerships.',
    iconSrc: '/assets/About/carbon_currency-rupee.svg',
  },
  {
    id: 'ev-vehicle',
    title: 'Vehicle Without Ownership',
    description:
      'Start earning without owning a vehicle. Rentals include maintenance, insurance and repairs.',
    iconSrc: '/assets/About/energy-icons_cargo-bike-48.svg',
  },
  {
    id: 'safe-housing',
    title: 'Safe Accommodation',
    description:
      'Quality food and comfortable sleeping facilities help our partners feel safe and supported.',
    iconSrc: '/assets/About/energy-icons_hotel-20.svg',
  },
  {
    id: 'respect',
    title: 'Recognition & Respect',
    description:
      'Monthly Star Awards, special prizes, annual ceremonies and a leadership career track celebrate hard work.',
    iconSrc: '/assets/About/hugeicons_identity-card.svg',
  },
];

export const AboutPartnerBenefits: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Partner Platforms and Executive Benefits">
      {/* Continuous Side Rails at 40px: stops exactly at the top of the white slashed bar */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      {/* 1. Partner Logos Section */}
      <div className={styles.partnersSectionWrapper}>
        <span className={styles.eyebrow}>
          <span className={styles.bulletDot} aria-hidden="true" />
          OUR PARTNERS
        </span>
        <h2 className={styles.marqueeHeading}>Connecting you with India&apos;s top platforms</h2>

        <div className={styles.marqueeContainer}>
          <div className={styles.logoRow}>
            {DISPLAY_LOGOS.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className={styles.logoItem}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={styles.brandLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Hairline Divider: Attaches directly to Left & Right Rails at 40px */}
      <div className={styles.dividerLine} aria-hidden="true" />

      {/* 2. Why We Are Different Header */}
      <div className={styles.benefitsHeaderWrapper}>
        <span className={styles.eyebrow}>
          <span className={styles.bulletDot} aria-hidden="true" />
          WHY WE ARE DIFFERENT
        </span>
        <h2 className={styles.benefitsHeading}>What We Stand For, For Partners</h2>
      </div>

      {/* 3. 2x3 Grid Table: Top, middle, and bottom lines connect to Left & Right Rails */}
      <div className={styles.benefitsGridWrapper}>
        <div className={styles.benefitsGrid}>
          {BENEFITS_DATA.map((benefit) => (
            <div key={benefit.id} className={styles.benefitCell}>
              <div className={styles.iconWrapper}>
                <Image
                  src={benefit.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.benefitIcon}
                  aria-hidden="true"
                />
              </div>
              <h3 className={styles.cellTitle}>{benefit.title}</h3>
              <p className={styles.cellDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bar 3: White horizontal bar with slashes and dotted rail lines before CTA */}
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

export default AboutPartnerBenefits;
