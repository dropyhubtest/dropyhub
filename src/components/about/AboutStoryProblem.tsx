'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutStoryProblem.module.css';

export const AboutStoryProblem: React.FC = () => {
  return (
    <section className={styles.storySection} aria-label="The DropyHub Story, Problem and Solution">
      {/* Continuous Side Rails at 40px (starting immediately after the hero section) */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Part 1: THE DROPYHUB STORY */}
        <div className={styles.storyBlock}>
          <div className={styles.storyTextCol}>
            <span className={styles.eyebrow}>
              <span className={styles.bullet} aria-hidden="true" />
              THE DROPYHUB STORY
            </span>
            <h2 className={styles.sectionHeading}>
              A Delivery Network Built Around People
            </h2>

            <div className={styles.paragraphs}>
              <p>
                Delivery work can be difficult when riders must arrange their own vehicle,
                housing and day-to-day support. DropyHub brings these essentials together
                so delivery executives can focus on completing orders safely and reliably.
              </p>
              <p>
                We coordinate with partner companies, onboard delivery executives and help
                organize the resources needed to keep deliveries moving—from EV bike access
                to hostel accommodation and weekly performance bonuses.
              </p>
              <p>
                Our role goes beyond recruitment. We connect delivery demand with an
                organized rider network and support our executives with practical resources,
                clear onboarding and ongoing assistance.
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
                priority
              />
            </div>
          </div>
        </div>

        {/* Part 2: WHY WE EXIST (The Problem & The Solution) */}
        <div className={styles.whyWeExistBlock}>
          {/* Top hairline border line from rail to rail */}
          <div className={styles.topDividerLine} aria-hidden="true" />

          {/* 50/50 Architecture Grid split by vertical center line */}
          <div className={styles.twoColumnGrid}>
            {/* The Problem Column */}
            <div className={styles.problemColumn}>
              <div className={styles.columnContent}>
                <span className={styles.eyebrow}>
                  <span className={styles.bullet} aria-hidden="true" />
                  WHY WE EXIST
                </span>
                <h3 className={styles.columnTitle}>The Problem</h3>
                <p className={styles.columnDescription}>
                  The delivery economy creates opportunities every day. But getting started
                  and staying on track can be challenging when people have to figure everything
                  out alone.
                </p>
              </div>
              <div className={styles.watermarkWrapper}>
                <Image
                  src="/assets/About/emojione-monotone_question-mark.png"
                  alt=""
                  width={179}
                  height={179}
                  className={styles.watermarkIcon}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* The Solution Column */}
            <div className={styles.solutionColumn}>
              <div className={styles.columnContent}>
                {/* Spacer so The Solution baseline aligns with The Problem */}
                <div className={styles.eyebrowSpacer} aria-hidden="true" />
                <h3 className={styles.columnTitle}>The Solution</h3>
                <p className={styles.columnDescription}>
                  DropyHub works to make that journey more accessible by connecting delivery
                  partners with work opportunities and support that can help them move forward.
                </p>
              </div>
              <div className={styles.watermarkWrapper}>
                <Image
                  src="/assets/About/mage_light-bulb.png"
                  alt=""
                  width={179}
                  height={179}
                  className={styles.watermarkIcon}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Bottom hairline line */}
          <div className={styles.bottomDividerLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default AboutStoryProblem;
