'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AboutCtaFooter.module.css';

export const AboutCtaFooter: React.FC = () => {
  return (
    <footer className={styles.ctaFooterSection} aria-label="Call to Action and Footer">
      {/* Continuous Side Rails at 40px */}
      <div className={styles.railLeft} aria-hidden="true" />
      <div className={styles.railRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* 1. CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaLeftCol}>
            <h2 className={styles.ctaTitle}>
              Ready to Be Part of the DropyHub Family?
            </h2>
          </div>

          <div className={styles.ctaRightCol}>
            <p className={styles.ctaDescription}>
              Join 5,000+ active delivery partners across 12+ Indian cities today.
              Zero registration fees, complete vehicle support, and daily stability.
            </p>

            <div className={styles.ctaBtnRow}>
              <Link href="/apply" className={styles.primaryBtn}>
                <span>Apply Now for Free</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>

              <Link href="/services" className={styles.secondaryBtn}>
                <span>Explore Services</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>

              <a href="#contact" className={styles.tertiaryLink}>
                Talk to an Advisor
              </a>
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className={styles.footerDivider} aria-hidden="true" />

        {/* 2. Three Column Footer Links */}
        <div className={styles.footerLinksGrid}>
          {/* Company Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.colHeading}>COMPANY</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/warehouse" className={styles.footerLink}>
                  Warehouse
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
              <li>
                <Link href="/benefits" className={styles.footerLink}>
                  Career Development
                </Link>
              </li>
              <li>
                <Link href="/partnership" className={styles.footerLink}>
                  SRH Partnership
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.colHeading}>FOR PARTNERS</h3>
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
              <li>
                <Link href="/benefits" className={styles.footerLink}>
                  IT Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.colHeading}>CONTACT</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:contact@dropyhub.com" className={styles.contactLink}>
                  contact@dropyhub.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className={styles.addressText}>
                  3rd Floor, plot no. 11, Sector 3, HUDA Techno Enclave, Madhapur, Hyderabad,
                  Telangana 500081
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Social Icons & Legal Row */}
        <div className={styles.socialLegalRow}>
          <div className={styles.socialIcons}>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={styles.socialLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className={styles.socialLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          <p className={styles.copyrightText}>© 2026 DropyHub. All rights reserved.</p>
          <p className={styles.legalDisclaimer}>
            India&apos;s premier delivery partner platform - empowering executives with zero
            registration fee, career growth, and financial support.
          </p>
        </div>

        {/* 4. Giant Outlined Watermark Wordmark */}
        <div className={styles.wordmarkContainer} aria-hidden="true">
          <span className={styles.wordmarkText}>Dropyhub</span>
        </div>
      </div>
    </footer>
  );
};

export default AboutCtaFooter;
