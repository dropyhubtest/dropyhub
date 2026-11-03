'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutPartnerBenefits.module.css';

const PARTNER_LOGOS = [
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
      'Never get stuck on one single delivery platform. DropyHub partners switch smoothly across Swiggy, Zomato, Blinkit, Zepto, and Amazon to maximize daily income and order volume.',
    iconSrc: '/assets/About/energy-icons_monitor-20-bold.svg',
  },
  {
    id: 'weekly-pay',
    title: 'Guaranteed Weekly Pay',
    description:
      'Weekly payouts credited without delays. Comprehensive incentive schemes, peak delivery bonuses, and transparent performance calculations every Tuesday.',
    iconSrc: '/assets/About/fluent_money-20-regular.svg',
  },
  {
    id: 'safe-housing',
    title: 'Safe Accommodation',
    description:
      'Clean, hygienic, furnished partner hostels in tier-1 city hubs so riders arriving from regional districts have a safe, respectable place to rest and recharge.',
    iconSrc: '/assets/About/energy-icons_hotel-20.svg',
  },
  {
    id: 'safety-net',
    title: 'Financial Safety Net',
    description:
      'Comprehensive accidental cover, emergency medical support, and loan facilities up to ₹10 Lakhs designed specifically to protect partners and their families.',
    iconSrc: '/assets/About/hugeicons_identity-card.svg',
  },
  {
    id: 'ev-vehicle',
    title: 'Vehicle Without Ownership',
    description:
      'Zero down payment EV scooter rentals with scheduled maintenance, battery swapping support, and minimal operating costs per kilometer.',
    iconSrc: '/assets/About/delivery-bike.svg',
  },
  {
    id: 'respect',
    title: 'Recognition & Respect',
    description:
      'Monthly partner award galas, tenure bonuses, skill certifications, and clear advancement pipelines into supervisory and fleet coordination roles.',
    iconSrc: '/assets/About/certificate.svg',
  },
];

export const AboutPartnerBenefits: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Partner Platforms and Executive Benefits">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Part: Connecting you with India's top marquee */}
        <div className={styles.partnersMarqueeBlock}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletPink} aria-hidden="true" />
            OUR PARTNERS
          </span>
          <h2 className={styles.marqueeHeading}>Connecting you with India&apos;s top</h2>

          <div className={styles.marqueeContainer}>
            <div className={styles.logoRow}>
              {PARTNER_LOGOS.map((logo) => (
                <div key={logo.name} className={styles.logoItem}>
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

        {/* Middle Hairline Divider */}
        <div className={styles.dividerLine} aria-hidden="true" />

        {/* Bottom Part: And What It Does For Our Partners (2x3 Grid) */}
        <div className={styles.benefitsBlock}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletPink} aria-hidden="true" />
            WHY WE DO WHAT WE DO
          </span>
          <h2 className={styles.benefitsHeading}>And What It Does For Our Partners</h2>

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
      </div>
    </section>
  );
};

export default AboutPartnerBenefits;
