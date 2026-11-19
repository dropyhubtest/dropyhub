'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutStoryProblem.module.css';

export const AboutStoryProblem: React.FC = () => {
  return (
    <section className={styles.storySection} aria-label="The DropyHub Story, Problem and Solution">
            <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

            <div className={styles.storyContainer}>
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
                We coordinate with partner companies, onboard delivery executives and organize
                resources that keep deliveries moving—from EV bike access to hostel accommodation
                and weekly bonuses.
              </p>
              <p>
                Our role goes beyond recruitment. We connect delivery demand with an
                organized rider network and support our executives with clear onboarding
                and ongoing assistance.
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
      </div>

            <div className={styles.whyWeExistWrapper}>
                <div className={styles.topDividerLine} aria-hidden="true" />

        <div className={styles.twoColumnGrid}>
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

                    <div className={styles.solutionColumn}>
            <div className={styles.columnContent}>
                            <div className={styles.eyebrowSpacer} aria-hidden="true" />
              <h3 className={styles.columnTitle}>The Solution</h3>
              <p className={styles.columnDescription}>
                DropyHub makes that journey more accessible by connecting delivery
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

                <div className={styles.bottomDividerLine} aria-hidden="true" />
      </div>

            <div className={styles.blackSpacerBar} aria-hidden="true">
        <div className={styles.blackBarRailLeft} />
        <div className={styles.blackBarRailRight} />
      </div>

            <div className={styles.whiteSlashedBar} aria-hidden="true">
        <div className={styles.slashedPattern} />
        <svg className={styles.brokenRailLeft} viewBox="0 0 2 44" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="44"
            stroke="var(--color-raw-c3c4c8, #c3c4c8)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <svg className={styles.brokenRailRight} viewBox="0 0 2 44" preserveAspectRatio="none">
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="44"
            stroke="var(--color-raw-c3c4c8, #c3c4c8)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutStoryProblem;
