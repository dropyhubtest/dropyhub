"use client";

import React from "react";
import Image from "next/image";
import styles from "./TrustPartnersTestimonials.module.css";

interface PartnerLogo {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
}

const PARTNER_LOGOS_SEQUENCE: PartnerLogo[] = [
  { id: "image 82", name: "Blinkit", src: "/assets/Home/blinkit.png", width: 40, height: 40 },
  { id: "image 28", name: "Delhivery", src: "/assets/Home/delhivery.png", width: 219, height: 40 },
  { id: "image 15", name: "BigBasket", src: "/assets/Home/big_basket.png", width: 152, height: 40 },
  { id: "image 16", name: "BookMyShow", src: "/assets/Home/bms.png", width: 140, height: 40 },
  { id: "image 17", name: "Zepto", src: "/assets/Home/zepto.png", width: 59, height: 40 },
  { id: "image 18", name: "Rapido", src: "/assets/Home/rapido.png", width: 89, height: 40 },
  { id: "image 19", name: "Shadowfax", src: "/assets/Home/shadowfax.png", width: 138, height: 40 },
  { id: "image 20", name: "Amazon", src: "/assets/Home/amazon.png", width: 131, height: 40 },
  { id: "image 21", name: "YogaBar", src: "/assets/Home/yogabar.png", width: 40, height: 40 },
  { id: "image 22", name: "Swiggy", src: "/assets/Home/swiggy.png", width: 53, height: 40 },
  { id: "image 23", name: "Swiggy Instamart", src: "/assets/Home/swiggy_instamart.png", width: 40, height: 40 },
  { id: "image 24", name: "Zomato", src: "/assets/Home/zomato.png", width: 40, height: 40 },
  { id: "image 25", name: "Uber", src: "/assets/Home/uber.png", width: 40, height: 40 },
  { id: "image 26", name: "Flipkart Minutes", src: "/assets/Home/flipkart_minutes.png", width: 40, height: 40 },
  { id: "image 27", name: "Flipkart", src: "/assets/Home/flipkart.png", width: 40, height: 40 },
];

// Repeat sequence 3 times statically as specified in Figma
const REPEATED_LOGOS = [
  ...PARTNER_LOGOS_SEQUENCE,
  ...PARTNER_LOGOS_SEQUENCE,
  ...PARTNER_LOGOS_SEQUENCE,
];

export const TrustPartnersTestimonials: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-label="Innovation and Our Partners"
    >
      {/* Top horizontal border at y = 42px - Full viewport width */}
      <div className={styles.topLine} aria-hidden="true" />

      {/* Frame 352: Divider (Full Viewport Width, 43px Height at y = 603px) */}
      <div className={styles.frame352Divider} aria-hidden="true">
        <div className={styles.frame352Pattern} />
        <div className={styles.frame352Inner}>
          <div className={styles.brokenRailLeft}>
            <svg width="2" height="43" viewBox="0 0 2 43" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="43"
                stroke="#c3c4c8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
          <div className={styles.brokenRailRight}>
            <svg width="2" height="43" viewBox="0 0 2 43" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="43"
                stroke="#c3c4c8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Continuous desktop rails across Innovation and Partners */}
        <div className={styles.railTopLeft} aria-hidden="true" />
        <div className={styles.railTopRight} aria-hidden="true" />

        {/* Horizontal Separator Lines inside 1440px container */}
        <div className={`${styles.separatorLine} ${styles.sep175}`} aria-hidden="true" />
        <div className={`${styles.separatorLine} ${styles.sep394}`} aria-hidden="true" />

        {/* ==================================================================
            Section A: Innovation / Your Security, Our Priority
            ================================================================== */}
        <div className={styles.innovationEyebrow}>
          <span className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            INNOVATION
          </span>
        </div>

        <h2 className={styles.innovationHeading}>Your Security, Our Priority.</h2>

        <p className={styles.innovationSupportingText}>
          We go above and beyond to ensure every partner feels safe and supported throughout
          their journey with us.
        </p>

        {/* Security Checklist */}
        <div className={styles.securityChecklist}>
          <div className={styles.securityItem}>
            <Image
              src="/assets/Home/hugeicons_tick-02.svg"
              alt=""
              width={24}
              height={24}
              className={styles.checkIcon}
              aria-hidden="true"
            />
            <span className={styles.securityText}>Comprehensive Insurance</span>
          </div>
          <div className={styles.securityItem}>
            <Image
              src="/assets/Home/hugeicons_tick-02.svg"
              alt=""
              width={24}
              height={24}
              className={styles.checkIcon}
              aria-hidden="true"
            />
            <span className={styles.securityText}>24/7 SOS Support</span>
          </div>
          <div className={styles.securityItem}>
            <Image
              src="/assets/Home/hugeicons_tick-02.svg"
              alt=""
              width={24}
              height={24}
              className={styles.checkIcon}
              aria-hidden="true"
            />
            <span className={styles.securityText}>Verified Partners</span>
          </div>
        </div>

        {/* Mobile Divider Line between Innovation & Our Partners */}
        <div className={styles.innovationPartnersDivider} aria-hidden="true" />

        {/* ==================================================================
            Section B: Our Partners
            ================================================================== */}
        <div className={styles.partnersEyebrow}>
          <span className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            OUR PARTNERS
          </span>
        </div>

        <h2 className={styles.partnersHeading}>Connecting you with India&apos;s top</h2>

        <div className={styles.partnersLogoStrip}>
          <div className={styles.logoTrack}>
            {PARTNER_LOGOS_SEQUENCE.concat(PARTNER_LOGOS_SEQUENCE).map((logo, index) => (
              <div
                key={`track1-${logo.id}-${index}`}
                className={styles.logoItem}
                style={{ width: `${logo.width}px` }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
          <div className={styles.logoTrack} aria-hidden="true">
            {PARTNER_LOGOS_SEQUENCE.concat(PARTNER_LOGOS_SEQUENCE).map((logo, index) => (
              <div
                key={`track2-${logo.id}-${index}`}
                className={styles.logoItem}
                style={{ width: `${logo.width}px` }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile White Lines Horizontal Bar after Partners */}
        <div className={styles.mobilePartnersTestimonialsDivider} aria-hidden="true">
          <div className={styles.mobilePartnersPattern} />
        </div>
      </div>
    </section>
  );
};

export default TrustPartnersTestimonials;