'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AboutValuesTimeline.module.css';

interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const VALUES_DATA: ValueCard[] = [
  {
    id: 'people-first',
    title: 'People-Matter First',
    description:
      'Every delivery partner is a human being with aspirations, not just a number on a platform dashboard.',
    iconSrc: '/assets/About/griddy-icons_users-group.svg',
  },
  {
    id: 'opportunity',
    title: 'Access Creates Opportunity',
    description:
      'Removing upfront barriers opens the logistics economy to ambitious riders across India.',
    iconSrc: '/assets/About/bytesize_flag.svg',
  },
  {
    id: 'mutual-growth',
    title: 'Growth Cares For Both Sides',
    description:
      'Platforms get consistent SLA fulfillment; partners get steady income, reliable housing, and long-term career growth.',
    iconSrc: '/assets/About/iconoven_compound-growth.svg',
  },
  {
    id: 'sustainability',
    title: 'Sustainability Drives Progress',
    description:
      'Electric mobility lowers rider operating expenses while helping our platform partners reach aggressive net-zero emissions targets.',
    iconSrc: '/assets/About/energy-icons_cargo-bike-48.svg',
  },
];

interface RoadmapPhase {
  id: string;
  year: string;
  phaseLabel: string;
  subtitle: string;
  description: string;
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: '2024',
    year: '2024',
    phaseLabel: 'Foundation',
    subtitle: 'City Setup & Operations Launch',
    description:
      'Established Hyderabad headquarters and launched initial pilot operations with Swiggy and Zomato, onboarding our first 500 delivery executives with zero deposit.',
  },
  {
    id: '2025',
    year: '2025',
    phaseLabel: 'Scale & EV Fleet',
    subtitle: 'Ecosystem Expansion & Green Fleet',
    description:
      'Scaled to 5 major South Indian cities, launched EV rental partnership programs, opened safe partner hostel facilities, and signed the official Sunrisers Hyderabad IPL 2025 partnership.',
  },
  {
    id: '2026-p1',
    year: '2026',
    phaseLabel: 'Phase 1',
    subtitle: 'The Foundation & National Expansion',
    description:
      'Launched Refer & Earn Programme and Partner Leadership Track creating pathways for top partners to become team leaders and city coordinators.',
  },
  {
    id: '2026-p2',
    year: '2026',
    phaseLabel: 'Phase 2',
    subtitle: 'Pan-India EV Logistics Powerhouse',
    description:
      'Expanding to 25+ cities nationwide, deploying 15,000+ EV delivery vehicles, and integrating full financial credit lines and micro-insurance for partners.',
  },
];

export const AboutValuesTimeline: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<string>('2026-p1');

  const activePhase =
    ROADMAP_PHASES.find((p) => p.id === activePhaseId) || ROADMAP_PHASES[2];

  return (
    <section className={styles.sectionWrapper} aria-label="Core Values and Company Roadmap">
      {/* 1. Core Values (Light Background) */}
      <div className={styles.valuesContainer}>
        {/* Continuous Side Rails for Values */}
        <div className={styles.railLeftLight} aria-hidden="true" />
        <div className={styles.railRightLight} aria-hidden="true" />

        <div className={styles.valuesHeader}>
          <span className={styles.eyebrowLight}>
            <span className={styles.bulletPink} aria-hidden="true" />
            CORE VALUES
          </span>
          <h2 className={styles.valuesHeading}>
            The principles that guide every decision, product, and interaction at DropyHub.
          </h2>
        </div>

        <div className={styles.valuesGrid}>
          {VALUES_DATA.map((val) => (
            <div key={val.id} className={styles.valueCard}>
              <div className={styles.iconTile}>
                <Image
                  src={val.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.valueIcon}
                  aria-hidden="true"
                />
              </div>
              <h3 className={styles.valueTitle}>{val.title}</h3>
              <p className={styles.valueDescription}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hatched Divider Bar Transition */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 44" preserveAspectRatio="none">
          <line x1="1" y1="0" x2="1" y2="44" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
        <svg className={styles.brokenRailRight} viewBox="0 0 2 44" preserveAspectRatio="none">
          <line x1="1" y1="0" x2="1" y2="44" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 2. Roadmap / Phased Journey (Dark Background) */}
      <div className={styles.roadmapSection}>
        {/* Continuous Side Rails for Roadmap */}
        <div className={styles.railLeftDark} aria-hidden="true" />
        <div className={styles.railRightDark} aria-hidden="true" />

        <div className={styles.roadmapContainer}>
          <span className={styles.eyebrowDark}>
            <span className={styles.bulletYellow} aria-hidden="true" />
            OUR JOURNEY &amp; ROADMAP
          </span>

          <div className={styles.roadmapContentRow}>
            {/* Left: Phase Title & Subtitle */}
            <div className={styles.phaseTitleCol}>
              <h2 className={styles.phaseMainTitle}>
                {activePhase.year} – {activePhase.phaseLabel}
              </h2>
              <span className={styles.phaseSubtitle}>{activePhase.subtitle}</span>
            </div>

            {/* Right: Phase Description Highlight */}
            <div className={styles.phaseDescCol}>
              <p className={styles.phaseDescription}>{activePhase.description}</p>
            </div>
          </div>

          {/* Phase Selector Tabs */}
          <div className={styles.phaseTabs}>
            {ROADMAP_PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhaseId(phase.id)}
                className={`${styles.phaseTabBtn} ${
                  phase.id === activePhaseId ? styles.phaseTabBtnActive : ''
                }`}
                aria-pressed={phase.id === activePhaseId}
              >
                {phase.year} – {phase.phaseLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValuesTimeline;
