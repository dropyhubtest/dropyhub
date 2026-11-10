"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import styles from "./FaqFooterSection.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "free-registration",
    question: "Is registration really free?",
    answer:
      "Yes. Always. There is no registration fee, deposit or documentation charge. DropyHub earns through platform partnerships, not from delivery executives.",
  },
  {
    id: "quick-start",
    question: "How quickly can I start working?",
    answer:
      "After registration, our onboarding team coordinates with you within 24–48 hours. This includes uniform fitting, equipment handover, ID card issuance, and platform profile setup. Most partners are actively delivering within 72 hours of signing up.",
  },
  {
    id: "vehicle-requirement",
    question: "Do I need my own vehicle?",
    answer:
      "No. DropyHub offers affordable daily and monthly vehicle rental programmes for 2-wheelers (bikes/scooters) and 3-wheelers (auto-rickshaws). Every rented vehicle comes with full maintenance, insurance, and roadside assistance included. You just show up and ride.",
  },
  {
    id: "bonuses-earnings",
    question: "When are bonuses paid and how much can I earn?",
    answer:
      "Weekly performance bonuses are credited directly to your registered bank account every Monday. On average, our partners earn between ₹18,000 and ₹32,000 per month (base salary + weekly bonuses + monthly incentives). Top performers have earned upwards of ₹45,000 in a single month during peak seasons like Diwali and New Year.",
  },
];

export const FaqFooterSection: React.FC = () => {
  // First item expanded by default per Figma spec
  const [expandedId, setExpandedId] = useState<string | null>("free-registration");

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section className={styles.section} aria-label="FAQ and Signup">
      {/* ==================================================================
          B. Full-Width FAQ Divider Band (y = 446px, h = 43px)
          ================================================================== */}
      <div className={styles.faqDividerBand} aria-hidden="true">
        <div className={styles.faqDividerPattern} />
        <div className={styles.faqDividerInner}>
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
        {/* Continuous desktop rails across FAQ and CTA */}
        <div className={styles.railFaqLeft} aria-hidden="true" />
        <div className={styles.railFaqRight} aria-hidden="true" />
        <div className={styles.railCtaLeft} aria-hidden="true" />
        <div className={styles.railCtaRight} aria-hidden="true" />

        {/* ================================================================
            A. FAQ Section
            ================================================================ */}
        <div className={styles.faqEyebrow}>
          <span className={styles.bullet} aria-hidden="true" />
          FAQ
        </div>

        <h2 className={styles.faqHeading}>Common Questions</h2>

        {/* FAQ Accordion */}
        <div className={styles.accordionContainer}>
          {FAQ_DATA.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionButton}
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded && <span className={styles.activeIndicator} aria-hidden="true" />}
                  <h3 className={styles.questionText}>{item.question}</h3>
                  <span className={styles.faqToggleIcon} aria-hidden="true">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className={`${styles.answerContent} ${styles.activeAnswerMargin}`}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================================================================
            C. Final Signup CTA (y = 575px)
            ================================================================ */}
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>Ready to Start Earning?</h2>

          <div className={styles.ctaRight}>
            <p className={styles.ctaDescription}>
              Join DropyHub today. Completely free registration. Instant access to top delivery
              companies.
            </p>

            <div className={styles.ctaActions}>
              <a href="#apply" className={styles.joinNowBtn}>
                <span>Join Now Free</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <Link href="/about" className={styles.learnMoreLink}>
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Shared Global Footer (Used identically across all internal pages) */}
    <Footer showRails={true} showTopDivider={true} />
    </>
  );
};

export default FaqFooterSection;