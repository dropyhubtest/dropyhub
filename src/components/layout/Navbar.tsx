'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'WAREHOUSE', href: '/warehouse' },
  { label: 'SERVICES', href: '/services' },
  { label: 'BENEFITS', href: '/benefits' },
  { label: 'PARTNERSHIP', href: '/partnership' },
];

const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Warehouse', href: '/warehouse' },
  { label: 'Services', href: '/services' },
  { label: 'Benefits', href: '/benefits' },
  { label: 'Partnership', href: '/partnership' },
  { label: 'Contact Us', href: '/contact' },
];

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${className || ''}`} aria-label="Main Navigation Header">
      <div className={styles.logoWrapper}>
        <Link href="/" aria-label="DropyHub Home">
          <Image
            src="/assets/Home/Dropyhub_logo.png"
            alt="DropyHub Logo"
            width={88}
            height={54}
            priority
            className={styles.logoImage}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.navigation} aria-label="Main Navigation">
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href);
            return (
              <li key={item.label} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/apply" className={styles.joinNowButton}>
          JOIN NOW
        </Link>
      </nav>

      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        className={styles.hamburgerButton}
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open Navigation Menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {/* Mobile Navigation Popover (matches Figma reference image) */}
      {mobileMenuOpen && (
        <>
          <div
            className={styles.mobileBackdrop}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
            <div className={styles.drawerHeader}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className={styles.mobileNavContainer}>
              <ul className={styles.mobileNavList}>
                {MOBILE_NAV_ITEMS.map((item) => (
                  <li key={item.label} className={styles.mobileNavItem}>
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className={styles.mobileNavItem}>
                  <Link
                    href="/apply"
                    className={styles.mobileJoinButton}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Us Now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
