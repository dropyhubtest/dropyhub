'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './BenefitsStatsTestimonials.module.css';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      'The vehicle rental programme is a lifesaver. I do not own a bike and the daily rental is affordable with full maintenance taken care of. No breakdown stress, no repair costs. I focus solely on delivering and earning. DropyHub truly handles everything so I can focus on what matters.',
    name: 'Praveen Reddy',
    role: 'Star Partner · Vijayawada · 2 yrs',
    avatarSrc: '/assets/benefits/profile_1.png',
  },
  {
    id: '2',
    quote:
      'DropyHub completely changed my life. Before joining, I was stuck with one company earning ₹12,000 a month. Now I work across Swiggy, Zomato, and Blinkit simultaneously and earn ₹28,000+ every month. The weekly bonuses are real and on time. I even got a ₹3 lakh loan to buy a new bike without any paperwork headaches.',
    name: 'Ramesh Kumar',
    role: 'Delivery Partner · Hyderabad · 2 yrs',
    avatarSrc: '/assets/benefits/profile_2.jpg',
  },
  {
    id: '3',
    quote:
      'I joined DropyHub in Nellore after hearing from a friend. The onboarding was completed in just 2 days — uniform, ID card, everything. I now earn more than I ever did at my previous factory job. The insurance coverage gives my family peace of mind. Best decision I ever made.',
    name: 'Md. Saleem',
    role: 'Delivery Executive · Nellore · 1 yr',
    avatarSrc: '/assets/benefits/profile_3.jpg',
  },
];

export const BenefitsStatsTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < TESTIMONIALS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <section className={styles.section} aria-label="Partner Statistics and Testimonials">
      {/* Continuous Side Rails at 48px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* 4 Large Stats Grid */}
        <div className={styles.statsGrid}>
          {/* Stat 1: Cities Active */}
          <div className={styles.statBox}>
            <Image
              src="/assets/icons/user.svg"
              alt=""
              width={38}
              height={38}
              className={styles.statIcon}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>12+</span>
              <span className={styles.statLabel}>Cities Active</span>
            </div>
          </div>

          {/* Stat 2: Weekly Bonus */}
          <div className={styles.statBox}>
            <Image
              src="/assets/icons/rupee.svg"
              alt=""
              width={38}
              height={38}
              className={`${styles.statIcon} ${styles.statIconMobileHidden}`}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>500 Rs</span>
              <span className={styles.statLabel}>Weekly Bonus</span>
            </div>
          </div>

          {/* Stat 3: Joining Fee */}
          <div className={styles.statBox}>
            <Image
              src="/assets/icons/shake-hands.svg"
              alt=""
              width={38}
              height={38}
              className={`${styles.statIcon} ${styles.statIconMobileHidden}`}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>0 Rs</span>
              <span className={styles.statLabel}>Joining Fee</span>
            </div>
          </div>

          {/* Stat 4: Max Loan Available */}
          <div className={styles.statBox}>
            <Image
              src="/assets/icons/loan.svg"
              alt=""
              width={38}
              height={38}
              className={styles.statIcon}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>₹10L</span>
              <span className={styles.statLabel}>Max Loan Available</span>
            </div>
          </div>
        </div>

        {/* Section Header: VOICES OF OUR PARTNERS */}
        <div className={styles.testimonialsHeader}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletDot} aria-hidden="true" />
            VOICES OF OUR PARTNERS
          </span>
          <h2 className={styles.sectionTitle}>Voices of Our Partners</h2>
        </div>

        {/* Testimonials Slider Area matching video prototype */}
        <div className={styles.testimonialsArea}>
          <div className={styles.sliderRow}>
            <div className={styles.labelCol}>
              <span className={styles.categoryLabel}>Testimonials</span>
            </div>

            {/* Previous Button (Disabled on First Slide) */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous Testimonial"
              className={`${styles.navBtn} ${
                currentIndex === 0 ? styles.navBtnDisabled : styles.navBtnActive
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Vertical Sliding Viewport & Track */}
            <div className={styles.quoteSliderViewport}>
              <div
                className={styles.quoteSliderTrack}
                style={{
                  transform: `translateY(-${currentIndex * 100}%)`,
                }}
              >
                {TESTIMONIALS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`${styles.quoteSlide} ${currentIndex === idx ? styles.activeMobileSlide : ''}`}
                  >
                    <p className={styles.quoteText}>{item.quote}</p>
                    <div className={styles.authorCard}>
                      <Image
                        src={item.avatarSrc}
                        alt={item.name}
                        width={48}
                        height={48}
                        className={styles.authorAvatar}
                      />
                      <div className={styles.authorMeta}>
                        <h4 className={styles.authorName}>{item.name}</h4>
                        <span className={styles.authorRole}>{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button (Disabled on Last Slide) */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === TESTIMONIALS.length - 1}
              aria-label="Next Testimonial"
              className={`${styles.navBtn} ${
                currentIndex === TESTIMONIALS.length - 1
                  ? styles.navBtnDisabled
                  : styles.navBtnActive
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Mobile Pagination Dots */}
          <div className={styles.dotsPagination} aria-label="Testimonial Pagination">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${currentIndex === idx ? styles.dotActive : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsStatsTestimonials;
