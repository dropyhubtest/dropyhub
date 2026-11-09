"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <section className={styles.section} aria-label="FAQ, Signup and Footer">
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
        {/* Continuous desktop rails across FAQ, CTA, and Footer */}
        <div className={styles.railFaqLeft} aria-hidden="true" />
        <div className={styles.railFaqRight} aria-hidden="true" />
        <div className={styles.railCtaLeft} aria-hidden="true" />
        <div className={styles.railCtaRight} aria-hidden="true" />
        <div className={styles.railFooterLeft} aria-hidden="true" />
        <div className={styles.railFooterRight} aria-hidden="true" />
        <div className={styles.railFadeLeft} aria-hidden="true" />
        <div className={styles.railFadeRight} aria-hidden="true" />

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

        {/* Horizontal Divider Line below CTA at y = 724px */}
        <div className={styles.ctaBottomLine} aria-hidden="true" />

        {/* ================================================================
            D. Footer Links (y = 785px)
            ================================================================ */}
        <div className={styles.footerLinks}>
          {/* Company */}
          <div className={`${styles.footerCol} ${styles.companyCol}`}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/warehouse" className={styles.footerLink}>
                  Wearhouse
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footerLink}>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/services#how-it-works" className={styles.footerLink}>
                  How it work
                </Link>
              </li>
              <li className={styles.desktopOnlyLink}>
                <Link href="/benefits" className={styles.footerLink}>
                  Benefits
                </Link>
              </li>
              <li className={styles.desktopOnlyLink}>
                <Link href="/partnership" className={styles.footerLink}>
                  SRH Partnership
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div className={`${styles.footerCol} ${styles.partnersCol}`}>
            <h4 className={styles.colTitle}>For Partners</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/apply" className={styles.footerLink}>
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footerLink}>
                  Vehicle Rental
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footerLink}>
                  Financial Loan
                </Link>
              </li>
              <li>
                <Link href="/benefits" className={styles.footerLink}>
                  Weekly bonuses
                </Link>
              </li>
              <li className={styles.desktopOnlyLink}>
                <Link href="/benefits" className={styles.footerLink}>
                  IT Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={`${styles.footerCol} ${styles.contactCol}`}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Image
                  src="/assets/footer/mail.svg"
                  alt=""
                  width={16}
                  height={13}
                  className={styles.contactIcon}
                  aria-hidden="true"
                />
                <a href="mailto:contact@dropyhub.com" className={styles.contactLink}>
                  contact@dropyhub.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <Image
                  src="/assets/footer/location.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={styles.contactIconLocation}
                  aria-hidden="true"
                />
                <span className={styles.addressText}>
                  3rd Floor, plot no. 11, Sector 3, HUDA Techno Enclave, Madhapur, Hyderabad,
                  Telangana 500081
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================================================================
            E. Social Links, Copyright & Footer Description
            ================================================================ */}
        <div className={styles.socialLinks}>
          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconBtn}
            aria-label="YouTube"
          >
            <Image
              src="/assets/footer/youtube.svg"
              alt="YouTube"
              width={20}
              height={14}
              className={styles.socialIconImg}
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dropy_hub"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconBtn}
            aria-label="Instagram"
          >
            <Image
              src="/assets/footer/insta.svg"
              alt="Instagram"
              width={20}
              height={20}
              className={styles.socialIconImg}
            />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconBtn}
            aria-label="Facebook"
          >
            <Image
              src="/assets/footer/facebook.svg"
              alt="Facebook"
              width={11}
              height={19}
              className={styles.socialIconImg}
            />
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconBtn}
            aria-label="Twitter"
          >
            <Image
              src="/assets/footer/twitter.svg"
              alt="Twitter"
              width={21}
              height={17}
              className={styles.socialIconImg}
            />
          </a>
        </div>

        <p className={styles.copyrightText}>&copy; 2026 DropyHub. All rights reserved.</p>

        <p className={styles.footerDescription}>
          India&apos;s premier delivery partner platform - empowering executives with zero
          registration fee, career growth, and financial support.
        </p>

      </div>

      {/* ================================================================
          F. Full Viewport Width Oversized Outlined Wordmark (y = 1140px)
          ================================================================ */}
      <div className={styles.outlinedWordmark} aria-hidden="true">
        Dropyhub
      </div>
    </section>
  );
};

export default FaqFooterSection;