import React from "react";
import Image from "next/image";
import styles from "./AboutSection.module.css";
import HowToStart from "./HowToStart";

interface PartnerValueCard {
  id: string;
  positionClass: string;
  title: string;
  description: string;
  iconSrc: string;
}

const CARDS_DATA: PartnerValueCard[] = [
  {
    id: "skilled-verified-riders",
    positionClass: styles.cardR1C1,
    title: "Skilled & Verified Riders",
    description:
      "Every rider is background verified, professionally trained, uniformed, and equipped with safety gear before their first delivery.",
    iconSrc: "/assets/About/delivery-bike.svg",
  },
  {
    id: "low-attrition-rates",
    positionClass: styles.cardR1C2,
    title: "Low Attrition Rates",
    description:
      "Our rewards, insurance, loans and career programmes keep partners motivated and loyal.",
    iconSrc: "/assets/About/mdi_chart-multiline.svg",
  },
  {
    id: "pan-india-reach",
    positionClass: styles.cardR2C1,
    title: "Pan-India Reach",
    description:
      "Active across 12+ cities including Hyderabad, Bangalore, Chennai, Vijayawada and Visakhapatnam.",
    iconSrc: "/assets/About/iconoven_map-pin-lock.svg",
  },
  {
    id: "end-to-end-management",
    positionClass: styles.cardR2C2,
    title: "End-to-End Workforce Management",
    description:
      "From recruitment and onboarding to tracking and grievance resolution, DropyHub manages everything.",
    iconSrc: "/assets/About/ri_shake-hands-fill.svg",
  },
  {
    id: "48-hour-deployment",
    positionClass: styles.cardR3C1,
    title: "48-Hour Deployment",
    description:
      "We onboard and deploy verified riders to your zone within 48 hours, without delays.",
    iconSrc: "/assets/About/akar-icons_clock.svg",
  },
  {
    id: "srh-official-partner",
    positionClass: styles.cardR3C2,
    title: "SRH Official Partner 2025",
    description:
      "Our TATA IPL 2025 partnership reflects our national credibility, brand strength and scale.",
    iconSrc: "/assets/About/maki_cricket.svg",
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.aboutSection} aria-label="About DropyHub and Partner Value Grid">
      <div className={styles.aboutContainer}>
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />
                <div className={styles.topIntro}>
          <div className={styles.topIntroLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              ABOUT DROPYHUB
            </span>
            <h2 className={styles.mainHeading}>
              India&apos;s Most Partner-First Delivery Network
            </h2>
          </div>
          <div className={styles.topIntroRight}>
            <p className={styles.aboutDescription}>
              Founded in 2020 and based in Hyderabad, DropyHub connects delivery
              executives with leading platforms like Swiggy, Zomato, Blinkit, Amazon, Zepto,
              Flipkart, BookMyShow and Uber through one free-to-join partnership.
            </p>
          </div>
        </div>

                <div className={styles.ecosystemIntro}>
          <h3 className={styles.ecosystemHeading}>
            More Than Staffing. A Complete Partner Ecosystem.
          </h3>
          <p className={styles.ecosystemDescription}>
            Beyond job placement, DropyHub supports 5,000+ active partners with vehicle
            rentals, loans up to ₹10 lakhs, insurance, weekly bonuses, monthly awards and
            24/7 support.
          </p>
        </div>

                <div className={styles.ecosystemDivider} aria-hidden="true" />

                        <div className={`${styles.horizontalDivider} ${styles.divider1}`} aria-hidden="true" />
                <div className={`${styles.horizontalDivider} ${styles.divider2}`} aria-hidden="true" />
                <div className={`${styles.horizontalDivider} ${styles.divider3}`} aria-hidden="true" />

                <div className={`${styles.verticalDivider} ${styles.vDividerRow1}`} aria-hidden="true" />
        <div className={`${styles.verticalDivider} ${styles.vDividerRow2}`} aria-hidden="true" />
        <div className={`${styles.verticalDivider} ${styles.vDividerRow3}`} aria-hidden="true" />

                {CARDS_DATA.map((card) => (
          <div key={card.id} className={`${styles.card} ${card.positionClass}`}>
            <div className={styles.iconTile}>
              <Image
                src={card.iconSrc}
                alt=""
                width={32}
                height={32}
                className={styles.iconImage}
                aria-hidden="true"
              />
            </div>
            <div className={styles.textArea}>
              <h4 className={styles.cardTitle}>{card.title}</h4>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}

                <HowToStart />

                <div className={styles.howToStartBlackBar} aria-hidden="true" />
      </div>

            <div className={styles.divider4FullBleed} aria-hidden="true" />

            <div className={styles.aboutBottomDivider} aria-hidden="true">
        <div className={styles.aboutBottomDividerPattern} />
        <div className={styles.aboutBottomDividerInner}>
          <div className={styles.brokenRailLeft}>
            <svg width="2" height="64" viewBox="0 0 2 64" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="64"
                stroke="#3e3e3e"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          <div className={styles.brokenRailRight}>
            <svg width="2" height="64" viewBox="0 0 2 64" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="64"
                stroke="#3e3e3e"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
