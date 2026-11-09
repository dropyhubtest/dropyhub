'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import styles from './ContactFaqSection.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 'free-registration',
    question: 'Is registration really free?',
    answer:
      'Yes. Always. There is no registration fee, no deposit, and no documentation charge — ever. DropyHub was founded on the principle that cost should never be a barrier for a delivery executive wanting to build a better life. We make 100% of our income from our platform partnerships, not from you.',
  },
  {
    id: 'quick-start',
    question: 'How quickly can I start working?',
    answer:
      'After registration, our onboarding team coordinates with you within 24–48 hours. This includes uniform fitting, equipment handover, ID card issuance, and platform profile setup. Most partners are actively delivering within 72 hours of signing up.',
  },
  {
    id: 'vehicle-requirement',
    question: 'Do I need my own vehicle?',
    answer:
      'No. DropyHub offers affordable daily and monthly vehicle rental programmes for 2-wheelers (bikes/scooters) and 3-wheelers (auto-rickshaws). Every rented vehicle comes with full maintenance, insurance, and roadside assistance included. You just show up and ride.',
  },
  {
    id: 'bonuses-earnings',
    question: 'When are bonuses paid and how much can I earn?',
    answer:
      'Weekly performance bonuses are credited directly to your registered bank account every Monday. On average, our partners earn between ₹18,000 and ₹32,000 per month (base salary + weekly bonuses + monthly incentives). Top performers have earned upwards of ₹45,000 in a single month during peak seasons like Diwali and New Year.',
  },
];

export const ContactFaqSection: React.FC = () => {
  // Collapsed by default matching Figma
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section className={styles.faqSection} aria-label="Frequently Asked Questions">
        {/* Continuous 48px Side Rails stopping before bottom transition bar */}
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.layoutGrid}>
            {/* Left Column: Heading & Info */}
            <div className={styles.leftCol}>
              <div className={styles.eyebrow}>
                <span className={styles.bullet} aria-hidden="true" />
                FAQ
              </div>
              <h2 className={styles.heading}>Common Questions</h2>
              <p className={styles.description}>
                Everything you need to know about DropyHub — tap any question to expand.
              </p>
            </div>

            {/* Right Column: Accordion (matches Figma) */}
            <div className={styles.accordionList} role="region" aria-label="FAQ Accordion">
              {FAQ_LIST.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div key={item.id} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={styles.accordionHeader}
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span
                        className={`${styles.questionText} ${
                          isExpanded ? styles.questionActive : ''
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className={styles.faqToggleIcon} aria-hidden="true">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>

                    {isExpanded && (
                      <div id={`faq-answer-${item.id}`} className={styles.answerBox}>
                        <p className={styles.answerText}>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className={styles.viewMoreWrapper}>
                <Link href="/services" className={styles.viewMoreLink}>
                  View More &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* White Slashed Divider Bar before Footer: ONLY dotted lines inside */}
        <div className={styles.whiteSlashedDivider} aria-hidden="true">
          <div className={styles.whiteSlashedPattern} />
          <svg className={styles.brokenRailLeft} viewBox="0 0 2 40" preserveAspectRatio="none">
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
          <svg className={styles.brokenRailRight} viewBox="0 0 2 40" preserveAspectRatio="none">
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
      </section>

      {/* Global Unified Footer: showTopDivider={false} prevents duplicate divider line under slashed bar */}
      <Footer showRails={true} showTopDivider={false} />
    </>
  );
};

export default ContactFaqSection;
