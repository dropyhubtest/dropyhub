'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import styles from './PartnersHero.module.css';

interface PerkItem {
  id: string;
  title: string;
  iconSrc: string;
}

const HERO_PERKS: PerkItem[] = [
  {
    id: 'merch',
    title: 'Branded merchandise for top partners',
    iconSrc: '/assets/partners/lsicon_hand-shake-outline.svg',
  },
  {
    id: 'tickets',
    title: 'Exclusive SRH match ticket rewards',
    iconSrc: '/assets/partners/f7_tickets.svg',
  },
  {
    id: 'visibility',
    title: 'National-level brand visibility',
    iconSrc: '/assets/partners/bitcoin-icons_globe-outline.svg',
  },
  {
    id: 'spirit',
    title: 'Partner of the Spirit of the Game',
    iconSrc: '/assets/partners/energy-icons_cricket-20.svg',
  },
];

export const PartnersHero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Partnership & Sunrisers Hyderabad Official Partner">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Team Lineup Banner */}
      <div className={styles.heroContentWrapper}>
        <div className={styles.bannerContainer}>
          <Image
            src="/assets/partners/hero_bg.png"
            alt=""
            fill
            priority
            sizes="1392px"
            className={styles.bannerBg}
            aria-hidden="true"
          />
          <Image
            src="/assets/partners/hero_img.png"
            alt="Sunrisers Hyderabad Cricket Team with DropyHub"
            width={1392}
            height={473}
            priority
            className={styles.bannerTeamImg}
          />
        </div>
      </div>

      {/* 4. Hatched Divider Bar Transition (56px Height) */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 56" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="56"
            stroke="#555555"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <svg className={styles.brokenRailRight} viewBox="0 0 2 56" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="56"
            stroke="#555555"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* 5. Narrative Header & 4 Perks Grid */}
      <div className={styles.networkSectionWrapper}>
        {/* Continuous Side Rails at 64px for Platform Network Section */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <span className={styles.eyebrow}>
                <span className={styles.bulletDot} aria-hidden="true" />
                DELIVERY PLATFORM NETWORK
              </span>
              <h1 className={styles.title}>Partner Companies. One Delivery Network.</h1>
            </div>

            <div className={styles.headerRight}>
              <p className={styles.headerDesc}>
                DropyHub works with delivery and commerce companies that need reliable last-mile
                fulfilment. Partner teams coordinate order flow while DropyHub helps organize
                delivery executives and operational support in supported locations.
              </p>
            </div>
          </div>

          <div className={styles.perksGrid}>
            {HERO_PERKS.map((perk) => (
              <div key={perk.id} className={styles.perkCard}>
                <div className={styles.iconBox}>
                  <Image
                    src={perk.iconSrc}
                    alt=""
                    width={38}
                    height={38}
                    className={styles.iconImage}
                    aria-hidden="true"
                  />
                </div>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Bar 1: Normal black spacer bar with dotted side rails */}
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

      {/* 7. Bar 2: White Slashed Divider Bar at bottom of dark section */}
      <div className={styles.whiteSlashedDivider} aria-hidden="true">
        <div className={styles.whiteSlashedPattern} />
        <svg className={styles.whiteBrokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
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
        <svg className={styles.whiteBrokenRailRight} viewBox="0 0 2 40" preserveAspectRatio="none">
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

export default PartnersHero;
