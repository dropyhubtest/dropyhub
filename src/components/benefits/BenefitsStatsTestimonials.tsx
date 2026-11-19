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
      'The vehicle rental programme is a lifesaver. I do not own a bike and the daily rental is affordable with full maintenance taken care of. No breakdown stress, no repair costs. I focus solely on delivering and earning.',
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
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  // Auto-advance testimonials every 4.5 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section className={styles.section} aria-label="Partner Statistics and Testimonials">
            <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
                <div className={styles.statsGrid}>
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

                    <div className={styles.statBox}>
            <Image
              src="/assets/icons/rupee.svg"
              alt=""
              width={38}
              height={38}
              className={styles.statIcon}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>₹500</span>
              <span className={styles.statLabel}>Weekly Bonus</span>
            </div>
          </div>

                    <div className={styles.statBox}>
            <Image
              src="/assets/icons/shake-hands.svg"
              alt=""
              width={38}
              height={38}
              className={styles.statIcon}
              aria-hidden="true"
            />
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>₹0</span>
              <span className={styles.statLabel}>Joining Fee</span>
            </div>
          </div>

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

                <div className={styles.testimonialsHeader}>
          <span className={styles.eyebrow}>
            <span className={styles.bulletDot} aria-hidden="true" />
            VOICES OF OUR PARTNERS
          </span>
          <h2 className={styles.sectionTitle}>Voices of Our Partners</h2>
        </div>

                <div
          className={styles.testimonialsArea}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.sliderRow}>
            <div className={styles.labelCol}>
              <span className={styles.categoryLabel}>Testimonials</span>
            </div>

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
