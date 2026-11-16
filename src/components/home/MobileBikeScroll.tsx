'use client';

/**
 * MobileBikeScroll — Precision Scroll-Synced Mobile Bike Animation Engine
 * Calibrated against the 17 Figma Mobile Static Frames (iPhone 16 & 17 Pro - 1 to 17)
 * ONLY active on mobile/tablet viewports (≤ 1199px)
 *
 * Trajectory & Architecture:
 * 1. Single Continuous Journey (One Lap: Top to Bottom):
 *    - Follows user scroll from Hero down through all 8 sections to the Footer.
 * 2. Visual Anchoring & Orientations:
 *    - Hero (Frames 1-2):
 *        - Centered horizontally (docX = 50vw).
 *        - Rests over the "Join As Delivery Partner" / "Learn More" transition (rot: 0°, facing DOWN).
 *    - Why DropyHub (Frames 3-4):
 *        - Smoothly curves from center to the right corridor (rot: 0°, facing DOWN).
 *        - Rests beside the 4 feature cards along the right gutter.
 *    - Interactive Estimator (Frames 5-7):
 *        - Rides down the right corridor beside vehicle/city buttons, sliders 3 & 4, and into the earnings summary card (rot: 0°, facing DOWN).
 *    - About DropyHub (Frames 8-9):
 *        - Rides down the right corridor beside the intro text and the 6 partner value cards (rot: 0°, facing DOWN).
 *    - How to Start (Frames 10-12):
 *        - Rides down beside the onboarding steps, crossing the black hatched divider (rot: 0°, facing DOWN).
 *    - Testimonials / Innovation (Frame 13):
 *        - Rides down the right side of the partner quotes (rot: 0°, facing DOWN).
 *    - FAQ & Ready to Start (Frames 14-15):
 *        - Rides down beside the accordion questions and into the CTA band (rot: 0°, facing DOWN).
 *    - Footer Wordmark (Frames 16-17):
 *        - Aligns with the outline "Dropyhub" wordmark.
 *        - Rotates to -90° (facing horizontal right).
 *        - Glides smoothly across the wordmark and exits off the right edge of the screen!
 * 3. Dimensions & Assets:
 *    - Exact spec dimensions: 103.185px × 154.778px.
 *    - Warm headlight glow layer on the front wheel.
 */

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MobileBikeScroll.module.css';

/* ── Constants ─────────────────────────────────────────────────────────── */
const BIKE_W = 103.185;
const BIKE_H = 154.778;

const subscribeClient = () => () => {};

export const MobileBikeScroll: React.FC = () => {
  const mounted = useSyncExternalStore(subscribeClient, () => true, () => false);
  const assemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    // Mobile / Tablet only
    if (window.innerWidth >= 1200) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const assembly = assemblyRef.current;
    if (!assembly) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // Current smooth-rendered physics state (viewport coordinates)
    const current = {
      x: vw / 2,
      y: Math.min(vh * 0.52, 420),
      rotation: 0,
      opacity: 1,
    };

    let entrancePending = window.scrollY < 50;

    /* ── Compute Target State for Current Scroll Position ──────────────── */
    function getTargetState(scrollY: number) {
      const whyEl = document.querySelector('[class*="whySectionContainer"], [class*="sectionWrapper"]');
      const footWordmark = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const whyTop = whyEl ? (whyEl.getBoundingClientRect().top + scrollY) : 850;
      const rightGutterX = vw - BIKE_W / 2 - 8; // Right gutter position (Frames 3-15)

      // 1. Footer Wordmark Interaction (Frames 16-17)
      // As user reaches the bottom footer, bike rotates -90° and drives off-screen right
      const footerScrollStart = Math.max(0, maxScroll - 400);
      if (scrollY >= footerScrollStart) {
        const footerProgress = Math.max(0, Math.min(1, (scrollY - footerScrollStart) / 400));
        const wRect = footWordmark ? footWordmark.getBoundingClientRect() : null;

        // Quick rotate to horizontal right (-90deg)
        const targetRot = gsap.utils.interpolate(0, -90, Math.min(1, footerProgress * 2.2));
        // Aligns with the horizontal centerline of the outlined Dropyhub wordmark
        const targetY = wRect ? (wRect.top + wRect.height * 0.46) : (vh - 50);
        // Drives horizontally across and exits off the right edge (Frame 16 -> 17)
        const targetX = gsap.utils.interpolate(rightGutterX, vw + BIKE_H + 50, footerProgress);

        return { x: targetX, y: targetY, rotation: targetRot, opacity: 1 };
      }

      // 2. Hero Section (Frames 1-2)
      // When at the very top of the page, bike is centered horizontally
      const heroThreshold = Math.max(200, whyTop - vh * 0.5);
      if (scrollY <= 50) {
        return {
          x: vw / 2,
          y: Math.min(vh * 0.52, 420),
          rotation: 0,
          opacity: 1,
        };
      }

      // 3. Transition from Hero (center) to Why DropyHub (right gutter)
      if (scrollY < heroThreshold) {
        const t = Math.max(0, Math.min(1, (scrollY - 50) / (heroThreshold - 50)));
        // Smooth easing curve from center to right
        const easedT = gsap.parseEase('power2.inOut')(t);
        const targetX = gsap.utils.interpolate(vw / 2, rightGutterX, easedT);
        const targetY = gsap.utils.interpolate(Math.min(vh * 0.52, 420), vh * 0.44, easedT);

        return {
          x: targetX,
          y: targetY,
          rotation: 0,
          opacity: 1,
        };
      }

      // 4. Body Sections: Why DropyHub through Ready to Start Earning (Frames 3-15)
      // Rests stably along the right gutter, facing vertically down (rot: 0°),
      // with headlight illuminating downward
      return {
        x: rightGutterX,
        y: vh * 0.44,
        rotation: 0,
        opacity: 1,
      };
    }

    /* ── Render Frame (RAF Ticker) ─────────────────────────────────────── */
    function renderFrame() {
      if (entrancePending) return;

      const target = getTargetState(window.scrollY);

      // Smooth inertial interpolation (lerp factor: 0.14 for snappy responsive tracking)
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      current.rotation += (target.rotation - current.rotation) * 0.14;
      current.opacity += (target.opacity - current.opacity) * 0.14;

      // Position the bike assembly relative to its center
      const assemblyLeft = current.x - BIKE_W / 2;
      const assemblyTop = current.y - BIKE_H / 2;

      gsap.set(assembly, {
        x: assemblyLeft,
        y: assemblyTop,
        rotation: current.rotation,
        opacity: current.opacity,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    /* ── Resize handler ─────────────────────────────────────────────────── */
    function onResize() {
      vw = window.innerWidth;
      vh = window.innerHeight;

      if (vw >= 1200) {
        gsap.set(assembly, { opacity: 0 });
      } else {
        gsap.set(assembly, { opacity: 1 });
      }
    }

    /* ── Boot & Entrance ────────────────────────────────────────────────── */
    if (entrancePending) {
      // Start in Hero position with a gentle entrance from above
      current.x = vw / 2;
      current.y = Math.min(vh * 0.52, 420);
      current.rotation = 0;
      current.opacity = 1;

      gsap.set(assembly, {
        x: current.x - BIKE_W / 2,
        y: current.y - BIKE_H / 2 - 250, // Starts above
        rotation: 0,
        opacity: 1,
        transformOrigin: '50% 50%',
        force3D: true,
      });

      // Smooth glide down into resting Hero position (1.0s, power2.out)
      gsap.to(assembly, {
        y: current.y - BIKE_H / 2,
        duration: 1.0,
        delay: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          entrancePending = false;
        },
      });

      // User scrolls during entrance: cancel immediately and track scroll
      const onScrollInterrupt = () => {
        if (window.scrollY > 40 && entrancePending) {
          window.removeEventListener('scroll', onScrollInterrupt);
          entrancePending = false;
        }
      };
      window.addEventListener('scroll', onScrollInterrupt, { passive: true });
    } else {
      // Direct load scrolled down (e.g. reload): snap immediately
      const initialTarget = getTargetState(window.scrollY);
      current.x = initialTarget.x;
      current.y = initialTarget.y;
      current.rotation = initialTarget.rotation;
      current.opacity = initialTarget.opacity;

      gsap.set(assembly, {
        x: current.x - BIKE_W / 2,
        y: current.y - BIKE_H / 2,
        rotation: current.rotation,
        opacity: current.opacity,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    gsap.ticker.add(renderFrame);
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      gsap.ticker.remove(renderFrame);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} aria-hidden="true">
      {/* Bike assembly: 103.185 × 154.778px */}
      <div ref={assemblyRef} className={styles.bikeAssembly}>
        {/* Headlight yellow glow — centered on front axle */}
        <div className={styles.glowLayer}>
          <Image
            src="/assets/Home/Headlight.png"
            alt=""
            width={76}
            height={65}
            className={styles.glowAsset}
            priority
            draggable={false}
          />
        </div>

        {/* Primary Bike + Rider */}
        <div className={styles.riderLayer}>
          <Image
            src="/assets/Home/Bike.png"
            alt=""
            width={103}
            height={155}
            className={styles.riderAsset}
            priority
            draggable={false}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileBikeScroll;
