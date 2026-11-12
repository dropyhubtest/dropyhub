import React from "react";
import Image from "next/image";
import styles from "./StatsWhySection.module.css";

interface StatItemData {
  id: string;
  icon: string;
  value: string;
  hasSup?: boolean;
  sup?: string;
  label: string;
  iconWidth: number;
  iconHeight: number;
}

interface WhyCardData {
  id: string;
  icon: string;
  title: string;
  body: string;
}

const STATS_DATA: StatItemData[] = [
  {
    id: "active-partners",
    icon: "/assets/icons/user.svg",
    value: "5000",
    hasSup: true,
    sup: "+",
    label: "Active Partners",
    iconWidth: 39,
    iconHeight: 39,
  },
  {
    id: "cities-covered",
    icon: "/assets/icons/location.svg",
    value: "12",
    hasSup: true,
    sup: "+",
    label: "Cities Covered",
    iconWidth: 39,
    iconHeight: 39,
  },
  {
    id: "platform-partners",
    icon: "/assets/icons/shake-hands.svg",
    value: "11",
    hasSup: true,
    sup: "+",
    label: "Platform Partners",
    iconWidth: 39,
    iconHeight: 39,
  },
  {
    id: "max-loan",
    icon: "/assets/icons/loan.svg",
    value: "₹10L",
    label: "Max Loan Available",
    iconWidth: 39,
    iconHeight: 39,
  },
  {
    id: "onboarding-time",
    icon: "/assets/icons/clock.svg",
    value: "48 hrs",
    label: "Onboarding Time",
    iconWidth: 39,
    iconHeight: 39,
  },
  {
    id: "registration-fee",
    icon: "/assets/icons/rupee.svg",
    value: "0 Rs",
    label: "Registration Fee",
    iconWidth: 22,
    iconHeight: 33,
  },
];

const WHY_CARDS: WhyCardData[] = [
  {
    id: "zero-reg",
    icon: "/assets/icons/zero_reg.svg",
    title: "Zero Registration Fee",
    body: "Start your journey with no financial burden. Completely free to join, always.",
  },
  {
    id: "vehicle-support",
    icon: "/assets/icons/vehicle.svg",
    title: "Vehicle Rental Support",
    body: "Affordable 2W & 3W rentals with full maintenance. No ownership stress.",
  },
  {
    id: "earn-more",
    icon: "/assets/icons/earn.svg",
    title: "Earn More, Grow More",
    body: "Salary + weekly bonuses + monthly awards. We invest in your success.",
  },
  {
    id: "hostel-acc",
    icon: "/assets/icons/Hostel.svg",
    title: "Hostel Accommodation",
    body: "We provide safe and affordable hostel accommodation.",
  },
];

const LEFT_CARDS: WhyCardData[] = [WHY_CARDS[0], WHY_CARDS[2]];
const RIGHT_CARDS: WhyCardData[] = [WHY_CARDS[1], WHY_CARDS[3]];

export const StatsWhySection: React.FC = () => {
  return (
    <section className={styles.sectionWrapper} aria-label="Statistics and Why DropyHub">
      {/* 1. Top Statistics Bar (Bounded by 1319px inner grid from x=61px to x=1380px) */}
      <div className={styles.statsBarContainer}>
        <div className={styles.statsBarFrame}>
          <div className={styles.railLeft} aria-hidden="true" />
          <div className={styles.railRight} aria-hidden="true" />
          <div className={styles.statsGrid}>
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className={styles.statItem}>
                <div className={styles.statIconWrapper}>
                  <Image
                    src={stat.icon}
                    alt=""
                    width={stat.iconWidth}
                    height={stat.iconHeight}
                    aria-hidden="true"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statValue}>
                    {stat.value}
                    {stat.hasSup && <span className={styles.statSup}>{stat.sup}</span>}
                  </p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Full-Viewport Horizontal Divider (Width 100%, Height 40px) */}
      <div className={styles.fullBleedDivider} aria-hidden="true">
        <div className={styles.dividerPattern} />
        <div className={styles.dividerInner}>
          <div className={styles.dottedRailLeft}>
            <svg width="2" height="40" viewBox="0 0 2 40" fill="none" style={{ display: "block" }}>
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
          <div className={styles.dottedRailRight}>
            <svg width="2" height="40" viewBox="0 0 2 40" fill="none" style={{ display: "block" }}>
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
        </div>
      </div>

      {/* 3. Why DropyHub Content Area */}
      <div className={styles.whySectionContainer}>
        <div className={styles.whySectionFrame}>
          <div className={styles.railLeft} aria-hidden="true" />
          <div className={styles.railRight} aria-hidden="true" />
          {/* Why DropyHub Heading */}
          <div className={styles.headerArea}>
            <span className={styles.subBadge}>
              <span className={styles.bullet} aria-hidden="true" />
              WHY DROPYHUB
            </span>
            <h2 className={styles.sectionTitle}>
              The Smarter Way to Deliver &amp; Earn
            </h2>
          </div>

          {/* Desktop Left Column Feature Cards */}
          <div className={styles.cardsColumnLeft}>
            {LEFT_CARDS.map((card) => (
              <div key={card.id} className={styles.card}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h3 className={styles.cardHeading}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Desktop Right Column Feature Cards */}
          <div className={styles.cardsColumnRight}>
            {RIGHT_CARDS.map((card) => (
              <div key={card.id} className={styles.card}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h3 className={styles.cardHeading}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Mobile Single-Column In-Order Cards List (1 -> 2 -> 3 -> 4) */}
          <div className={styles.mobileCardsList}>
            {WHY_CARDS.map((card) => (
              <div key={`m-${card.id}`} className={styles.card}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h3 className={styles.cardHeading}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsWhySection;
