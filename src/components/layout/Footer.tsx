'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export interface FooterProps {
  className?: string;
  showRails?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ className, showRails = true }) => {
  return (
    <footer className={`${styles.footerSection} ${className || ''}`} aria-label="Global Footer">
      {showRails && (
        <>
          <div className={styles.railLeft} aria-hidden="true" />
          <div className={styles.railRight} aria-hidden="true" />
        </>
      )}

      {/* Footer Top Divider with small gap on both left and right (does not touch rails) */}
      <div className={styles.footerTopDivider} aria-hidden="true" />

      <div className={styles.container}>
        {/* Footer Navigation Columns */}
        <div className={styles.footerLinksGrid}>
          {/* Company Column */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Company</h4>
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
              <li>
                <Link href="/benefits" className={styles.footerLink}>
                  IT Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className={`${styles.footerCol} ${styles.contactCol}`}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Image
                  src="/assets/Footer/mail.svg"
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
                  src="/assets/Footer/location.svg"
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

        {/* Social Links, Copyright & Description */}
        <div className={styles.socialLegalRow}>
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
                src="/assets/Footer/youtube.svg"
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
                src="/assets/Footer/insta.svg"
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
                src="/assets/Footer/facebook.svg"
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
                src="/assets/Footer/twitter.svg"
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
      </div>

      {/* Outlined Wordmark (Full Viewport Width) */}
      <div className={styles.outlinedWordmark} aria-hidden="true">
        Dropyhub
      </div>
    </footer>
  );
};

export default Footer;
