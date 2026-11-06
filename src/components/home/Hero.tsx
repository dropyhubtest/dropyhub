import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Hero Section">
      {/* Shared Global Navbar */}
      <Navbar />

      <div className={styles.heroFrame}>
        {/* Continuous desktop rails across Hero */}
        <div className={styles.decorativeLine} aria-hidden="true" />
        <div className={styles.decorativeLineRight} aria-hidden="true" />

        {/* Small italic tagline */}
        <p className={styles.tagline}>
          Your Delivery Workforce, Ready to Move
        </p>

        {/* Main Heading */}
        <h1 className={styles.mainTitle}>
          <span className={styles.titleLineFirst}>Delivery</span>
          <span className={styles.titleLineSecond}>Partners</span>
        </h1>

        {/* Circular Fast Delivery Sticker */}
        <div className={styles.stickerWrapper} aria-hidden="true">
          <Image
            src="/assets/Home/Hero_sticker.png"
            alt=""
            width={160}
            height={160}
            priority
            className={styles.stickerImage}
          />
        </div>

        {/* Sunrisers Hyderabad Official Partner Badge */}
        <div className={styles.partnerBadge}>
          <div className={styles.badgeFrame}>
            <div className={styles.badgeInner}>
              <Image
                src="/assets/Home/IPL.png"
                alt="TATA IPL 2025"
                width={26}
                height={26}
                className={styles.iplLogo}
              />
              <Image
                src="/assets/Home/SRH_logo.svg"
                alt="Sunrisers Hyderabad"
                width={44}
                height={32}
                className={styles.srhLogo}
              />
            </div>
          </div>
          <div className={styles.badgeText}>
            <span className={styles.badgeTitle}>Official Partners</span>
            <span className={styles.badgeSubtitle}>IPL-2025 Sunrisers</span>
          </div>
        </div>

        {/* Bottom Row / Content */}
        <div className={styles.bottomRow}>
          <p className={styles.description}>
            DropyHub connects delivery platforms with trained delivery executives. We
            coordinate deliveries and support our riders with EV bikes, hostel
            accommodation and weekly bonuses.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/apply" className={styles.primaryCta}>
              <span>Join As Delivery Partner</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                ↗
              </span>
            </Link>

            <Link href="/services" className={styles.secondaryCta}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
