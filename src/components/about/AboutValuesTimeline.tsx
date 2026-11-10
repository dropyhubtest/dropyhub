'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    id: 'people-matter',
    title: 'People Matter',
    description: 'Every delivery network depends on the people behind it.',
    iconSrc: '/assets/About/griddy-icons_users-group.svg',
  },
  {
    id: 'access-opportunity',
    title: 'Access Creates Opportunity',
    description: 'The right resources can help more people take their first step.',
    iconSrc: '/assets/About/iconoven_compound-growth.svg',
  },
  {
    id: 'growth-beyond',
    title: 'Growth Goes Beyond the Job',
    description:
      'We want partners to have opportunities to develop skills and explore what comes next.',
    iconSrc: '/assets/About/bytesize_flag.svg',
  },
  {
    id: 'partnership-progress',
    title: 'Partnership Drives Progress',
    description:
      'Strong relationships between businesses, delivery partners and service providers create lasting value.',
    iconSrc: '/assets/About/fluent_handshake-20-regular.svg',
  },
];

interface HistoryPhase {
  id: string;
  year: string;
  displayTitle: string;
  topTag?: string;
  bottomTag?: string;
  description: string;
}

const HISTORY_PHASES: HistoryPhase[] = [
  {
    id: '2026-p1',
    year: '2026',
    displayTitle: '2026 - Phase 1',
    topTag: undefined,
    bottomTag: '2025 - Phase 1',
    description:
      'Launched Refer & Earn Programme and Partner Leadership Track creating pathways for top partners to become team leaders and city coordinators.',
  },
  {
    id: '2025-p1',
    year: '2025',
    displayTitle: '2025 - Phase 1',
    topTag: '2025 - Phase 1',
    bottomTag: '2025',
    description:
      'Announced Official Partnership with Sunrisers Hyderabad for TATA IPL 2026 — a national recognition of DropyHub\'s brand strength and community reach.',
  },
  {
    id: '2025-p2',
    year: '2025',
    displayTitle: '2025 - Phase 2',
    topTag: '2025',
    bottomTag: '2024 - Phase 1',
    description:
      'Expanded operations into Nellore, Kavali, and Prakasam districts bringing the DropyHub ecosystem to Tier-2 cities across Andhra Pradesh.',
  },
  {
    id: '2024-p1',
    year: '2024',
    displayTitle: '2024 - Phase 1',
    topTag: '2024 - Phase 1',
    bottomTag: '2024 - Phase 2',
    description:
      'Expanded to 12+ cities across South India including Bangalore, Chennai, Vijayawada, and Visakhapatnam with 3,000+ active delivery partners.',
  },
  {
    id: '2024-p2',
    year: '2024',
    displayTitle: '2024 - Phase 2',
    topTag: '2024 - Phase 2',
    bottomTag: '2024 - Phase 3',
    description:
      'Launched Vehicle Rental Programme and Financial Loan Services — giving partners access to vehicles and capital that was previously out of reach.',
  },
  {
    id: '2024-p3',
    year: '2024',
    displayTitle: '2024 - Phase 3',
    topTag: '2024 - Phase 3',
    bottomTag: '2023',
    description:
      'Reached 5,000+ active partners. Launched IT Training Programme enabling delivery executives to transition into tech careers.',
  },
  {
    id: '2023',
    year: '2023',
    displayTitle: '2023',
    topTag: '2023',
    bottomTag: '2020',
    description:
      'Signed first platform partnerships with Swiggy and Zomato. Onboarded our first 200 delivery partners in Hyderabad within 3 months.',
  },
  {
    id: '2020',
    year: '2020',
    displayTitle: '2020',
    topTag: '2020',
    bottomTag: undefined,
    description:
      'DropyHub Founded in Hyderabad with a bold vision: to make delivery work dignified, rewarding, and sustainable for every executive in India.',
  },
];

const CARD_HEIGHT = 220;

export const AboutValuesTimeline: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const activePhase = HISTORY_PHASES[activePhaseIndex] || HISTORY_PHASES[0];

  const scrollToPhase = (index: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    track.scrollTo({
      top: index * CARD_HEIGHT,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollTop / CARD_HEIGHT);
    if (index >= 0 && index < HISTORY_PHASES.length && index !== activePhaseIndex) {
      setActivePhaseIndex(index);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = scrollTrackRef.current;
    if (!section || !track) return;

    let isWheeling = false;

    const handleWheel = (e: WheelEvent) => {
      const atTop = track.scrollTop <= 5;
      const atBottom = track.scrollTop >= track.scrollHeight - track.clientHeight - 5;

      // Scroll down within timeline
      if (e.deltaY > 0 && !atBottom) {
        e.preventDefault();
        if (isWheeling) return;
        isWheeling = true;
        const currentIdx = Math.round(track.scrollTop / CARD_HEIGHT);
        const nextIdx = Math.min(HISTORY_PHASES.length - 1, currentIdx + 1);
        track.scrollTo({ top: nextIdx * CARD_HEIGHT, behavior: 'smooth' });
        setTimeout(() => {
          isWheeling = false;
        }, 400);
      } else if (e.deltaY < 0 && !atTop) {
        // Scroll up within timeline
        e.preventDefault();
        if (isWheeling) return;
        isWheeling = true;
        const currentIdx = Math.round(track.scrollTop / CARD_HEIGHT);
        const prevIdx = Math.max(0, currentIdx - 1);
        track.scrollTo({ top: prevIdx * CARD_HEIGHT, behavior: 'smooth' });
        setTimeout(() => {
          isWheeling = false;
        }, 400);
      }
      // If at boundary, allow page to scroll naturally
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section className={styles.sectionWrapper} aria-label="What We Believe In and Company History">
      {/* 1. What We Believe In (Light Background) */}
      <div className={styles.valuesContainer}>
        {/* Continuous Side Rails for Values */}
        <div className={styles.railLeftLight} aria-hidden="true" />
        <div className={styles.railRightLight} aria-hidden="true" />

        <div className={styles.valuesInner}>
          <div className={styles.valuesHeader}>
            <span className={styles.eyebrowLight}>
              <span className={styles.bulletDot} aria-hidden="true" />
              WHAT WE BELIEVE IN
            </span>
            <h2 className={styles.valuesHeading}>
              The principles that guide every decision, product and team at DropyHub.
            </h2>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES_DATA.map((val) => (
              <div key={val.id} className={styles.valueCard}>
                <div className={styles.iconWrapper}>
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
      </div>

      {/* Bar 1: Hatched Divider Bar Transition (Black 40px) */}
      <div className={styles.hatchedDivider} aria-hidden="true">
        <div className={styles.hatchedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="40"
            stroke="rgba(255,255,255,0.3)"
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
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* 2. Our History (Dark Background with hidden scrollbar and snap scroll mechanism) */}
      <div ref={sectionRef} className={styles.historySection}>
        {/* Continuous Side Rails for History */}
        <div className={styles.railLeftDark} aria-hidden="true" />
        <div className={styles.railRightDark} aria-hidden="true" />

        <div className={styles.historyContainer}>
          {/* Left Column: Eyebrow + Active Phase Title + Subtitle + Underline */}
          <div className={styles.historyLeftCol}>
            <span className={styles.eyebrowDark}>
              <span className={styles.bulletDotDark} aria-hidden="true" />
              OUR HISTORY
            </span>

            <div className={styles.historyTitleRow}>
              <h2 className={styles.historyActiveTitle}>
                {activePhase.displayTitle}
              </h2>
              <span className={styles.historySubtitle}>Our footprints since 2020</span>
            </div>
            <div className={styles.historyUnderline} aria-hidden="true" />
          </div>

          {/* Right Column: Scroll Container with invisible scrollbars and separator lines */}
          <div
            ref={scrollTrackRef}
            className={styles.historyScrollTrack}
            onScroll={handleScroll}
          >
            {HISTORY_PHASES.map((phase, index) => {
              return (
                <div key={phase.id} className={styles.historyPhaseCard}>
                  {/* Top Separator Line (if exists) */}
                  {phase.topTag ? (
                    <button
                      type="button"
                      onClick={() => scrollToPhase(index - 1)}
                      className={styles.separatorLineRow}
                      aria-label={`Scroll to previous milestone`}
                    >
                      <span className={styles.separatorTag}>
                        {phase.topTag}
                      </span>
                      <div className={styles.separatorLine} />
                    </button>
                  ) : (
                    <div className={styles.topSpacer} />
                  )}

                  {/* Description */}
                  <p className={styles.phaseDescription}>{phase.description}</p>

                  {/* Bottom Separator Line (if exists) */}
                  {phase.bottomTag ? (
                    <button
                      type="button"
                      onClick={() => scrollToPhase(index + 1)}
                      className={styles.separatorLineRow}
                      aria-label={`Scroll to next milestone`}
                    >
                      <span className={styles.separatorTag}>
                        {phase.bottomTag}
                      </span>
                      <div className={styles.separatorLine} />
                    </button>
                  ) : (
                    <div className={styles.bottomSpacer} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile History View (matches Figma mobile design) */}
        <div className={styles.mobileHistoryContainer}>
          <span className={styles.eyebrowDark}>
            <span className={styles.bulletDotDark} aria-hidden="true" />
            OUR HISTORY
          </span>

          <h2 className={styles.mobileHistoryTitle}>
            {activePhase.displayTitle}
          </h2>
          <span className={styles.mobileHistorySubtitle}>Our footprints since 2020</span>

          <p className={styles.mobileHistoryDesc}>{activePhase.description}</p>

          <div className={styles.mobilePillsScrollTrack}>
            {HISTORY_PHASES.map((phase, idx) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setActivePhaseIndex(idx);
                  scrollToPhase(idx);
                }}
                className={`${styles.mobilePill} ${idx === activePhaseIndex ? styles.mobilePillActive : ''}`}
              >
                {phase.displayTitle}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bar 2: White horizontal bar with slashes and dotted rail lines */}
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

export default AboutValuesTimeline;
