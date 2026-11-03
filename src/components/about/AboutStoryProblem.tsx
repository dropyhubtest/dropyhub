'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutStoryProblem.module.css';

export const AboutStoryProblem: React.FC = () => {
  return (
    <section className={styles.storySection} aria-label="Our Story, Problem and Solution">
      <div className={styles.container}>
        {/* Top Part: Story Narrative & Visual */}
        <div className={styles.storyBlock}>
          <div className={styles.storyTextCol}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              OUR STORY &amp; PURPOSE
            </span>
            <h2 className={styles.sectionHeading}>
              A Delivery Network Built Around People
            </h2>

            <div className={styles.paragraphs}>
              <p>
                India&apos;s delivery ecosystem runs on millions of daily rides, but behind every
                delivery is a partner navigating fuel costs, vehicle breakdowns, lack of insurance,
                and unpredictable daily earnings. DropyHub was founded to change this reality.
              </p>
              <p>
                We created India&apos;s first complete partner ecosystem: a captive delivery network
                where the company handles asset ownership, weekly payouts, fuel efficiency, training,
                and grievance resolution, so delivery partners can focus on doing what they do best.
              </p>
              <p>
                Operating across 12+ cities with a network of 5,000+ active delivery executives,
                DropyHub serves top platforms like Swiggy, Zomato, Blinkit, Amazon, Zepto, Flipkart,
                and Uber, ensuring guaranteed deployment, high SLA adherence, and a disciplined,
                verified partner workforce.
              </p>
            </div>
          </div>

          <div className={styles.storyImageCol}>
            <div className={styles.imageCard}>
              <Image
                src="/assets/About/image-85.png"
                alt="DropyHub Delivery Partner Riding EV Scooter at Night"
                width={708}
                height={506}
                className={styles.riderImage}
              />
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className={styles.hairlineDivider} aria-hidden="true" />

        {/* Bottom Part: The Problem & The Solution */}
        <div className={styles.problemSolutionBlock}>
          <span className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            THE PROBLEM &amp; THE SOLUTION
          </span>

          <div className={styles.splitCardsGrid}>
            {/* The Problem Card */}
            <div className={`${styles.card} ${styles.problemCard}`}>
              <div className={styles.watermarkWrapper}>
                <Image
                  src="/assets/About/emojione-monotone_question-mark.png"
                  alt=""
                  width={120}
                  height={120}
                  className={styles.watermarkIcon}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>The Problem</h3>
                <p className={styles.cardDescription}>
                  The delivery ecosystem moves millions of parcels every day, but delivery
                  partners face high entry costs, lack of vehicles, low daily earnings,
                  zero safety nets, and negligible career mobility.
                </p>
              </div>
            </div>

            {/* The Solution Card */}
            <div className={`${styles.card} ${styles.solutionCard}`}>
              <div className={styles.watermarkWrapper}>
                <Image
                  src="/assets/About/mage_light-bulb.png"
                  alt=""
                  width={120}
                  height={120}
                  className={styles.watermarkIcon}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>The Solution</h3>
                <p className={styles.cardDescription}>
                  DropyHub creates a captive fleet ecosystem: we provide vehicles, guaranteed
                  daily earnings, structured onboarding, and comprehensive support so partners
                  thrive while platforms get reliable SLAs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bottom Hatched Divider */}
      <div className={styles.hatchedDivider} aria-hidden="true" />
    </section>
  );
};

export default AboutStoryProblem;
