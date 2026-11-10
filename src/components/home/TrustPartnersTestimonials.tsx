"use client";

import React, { useState } from "react";
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

interface TestimonialItem {
  id: string;
  name: string;
  subtitle: string;
  quote: string;
  avatarSrc: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "praveen-reddy",
    name: "Praveen Reddy",
    subtitle: "Star Partner · Vijayawada · 2 yrs",
    quote:
      "The vehicle rental programme is a lifesaver. I do not own a bike and the daily rental is affordable with full maintenance taken care of. No breakdown stress, no repair costs. I focus solely on delivering and earning. DropyHub truly handles everything so I can focus on what matters.",
    avatarSrc: "/assets/benefits/profile_1.png",
  },
  {
    id: "ramesh-kumar",
    name: "Ramesh Kumar",
    subtitle: "Delivery Partner · Hyderabad · 2 yrs",
    quote:
      "DropyHub completely changed my life. Before joining, I was stuck with one company earning ₹12,000 a month. Now I work across Swiggy, Zomato, and Blinkit simultaneously and earn ₹28,000+ every month. The weekly bonuses are real and on time. I even got a ₹3 lakh loan to buy a new bike without any paperwork headaches.",
    avatarSrc: "/assets/benefits/profile_2.jpg",
  },
  {
    id: "md-saleem",
    name: "Md. Saleem",
    subtitle: "Delivery Executive · Nellore · 1 yr",
    quote:
      "I joined DropyHub in Nellore after hearing from a friend. The onboarding was completed in just 2 days — uniform, ID card, everything. I now earn more than I ever did at my previous factory job. The insurance coverage gives my family peace of mind. Best decision I ever made.",
    avatarSrc: "/assets/benefits/profile_3.jpg",
  },
];

export const TrustPartnersTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      className={styles.section}
      aria-label="Innovation, Our Partners and Testimonials"
    >
      {/* Top horizontal border at y = 42px - Full viewport width */}
      <div className={styles.topLine} aria-hidden="true" />

      {/* Frame 352: Partner-to-Testimonials Divider (Full Viewport Width, 43px Height at y = 603px) */}
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
        {/* Continuous desktop rails across TrustPartners and Testimonials */}
        <div className={styles.railTopLeft} aria-hidden="true" />
        <div className={styles.railTopRight} aria-hidden="true" />
        <div className={styles.railBottomLeft} aria-hidden="true" />
        <div className={styles.railBottomRight} aria-hidden="true" />

        {/* Horizontal Separator Lines inside 1440px container */}
        <div className={`${styles.separatorLine} ${styles.sep175}`} aria-hidden="true" />
        <div className={`${styles.separatorLine} ${styles.sep394}`} aria-hidden="true" />
        <div className={`${styles.separatorLine} ${styles.sep1068}`} aria-hidden="true" />

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

        {/* ==================================================================
            Section C: Testimonials
            ================================================================== */}
        <div className={styles.testimonialsComponent}>
          <div className={styles.testimonialsCategoryLabel}>Testimonials</div>

          {/* Navigation Controls */}
          <button
            type="button"
            className={`${styles.navArrowBtn} ${styles.leftArrow} ${
              activeIndex === 0 ? styles.navArrowBtnDisabled : ""
            }`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <Image
              src="/assets/Home/circle-chevron-right.svg"
              alt=""
              width={32}
              height={32}
              className={styles.navIcon}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className={`${styles.navArrowBtn} ${styles.rightArrow} ${
              activeIndex === TESTIMONIALS_DATA.length - 1 ? styles.navArrowBtnDisabled : ""
            }`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <Image
              src="/assets/Home/circle-chevron-right.svg"
              alt=""
              width={32}
              height={32}
              className={styles.navIcon}
              aria-hidden="true"
            />
          </button>

          {/* Main Testimonial Sliding Viewport */}
          <div className={styles.quoteSliderViewport}>
            <div
              className={styles.quoteSliderTrack}
              style={{
                transform: `translateY(-${activeIndex * 100}%)`,
              }}
            >
              {TESTIMONIALS_DATA.map((item, idx) => (
                <div
                  key={item.id}
                  className={`${styles.quoteSlide} ${idx === activeIndex ? styles.quoteSlideActive : ""}`}
                >
                  <blockquote className={styles.quoteText}>
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className={styles.authorProfile}>
                    <div className={styles.avatarWrapper}>
                      <Image
                        src={item.avatarSrc}
                        alt={item.name}
                        width={62}
                        height={62}
                        className={styles.avatarImg}
                      />
                    </div>
                    <div className={styles.authorInfo}>
                      <p className={styles.authorName}>{item.name}</p>
                      <p className={styles.authorSubtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Dots */}
          <div className={styles.paginationDots} aria-label="Testimonial pagination">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustPartnersTestimonials;