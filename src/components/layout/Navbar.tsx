'use client';

import React from 'react';
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

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();

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

        <Link href="#join" className={styles.joinNowButton}>
          JOIN NOW
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
