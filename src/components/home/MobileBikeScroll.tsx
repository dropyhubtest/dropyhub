'use client';

/**
 * MobileBikeScroll — Senior Precision Scroll-Synchronized Mobile Bike Engine
 * Spec-Compliant Implementation:
 *
 * 1. Start (Hero Section):
 *    - Enters into viewport automatically at the top (Hero center, 50vw, rot: 0° facing down).
 *    - Rests over the "Join As Delivery Partner" / "Learn More" transition area.
 *    - As user scrolls down, begins moving smoothly across towards the right edge.
 *
 * 2. Body Sections (Continuous Across-the-Screen Travel with Pause at Boundary):
 *    - Travels horizontally across the screen as user scrolls down.
 *    - When it reaches the right edge of the screen, it STOPS TEMPORARILY (holds position).
 *    - As the user continues scrolling, it resumes movement, moves out of the viewport on the right,
 *      and RE-ENTERS FROM THE OPPOSITE SIDE (left side).
 *    - Repeats continuously throughout the entire page scroll, perfectly synchronized with scroll.
 *    - In reverse scroll (scrolling up), all transitions run in reverse.
 *
 * 3. Footer (Reverse Wordmark Crossing):
 *    - At the footer, the bike rotates to 90° (facing LEFT).
 *    - Drives across the outlined "Dropyhub" wordmark from RIGHT TO LEFT.
 *    - Goes completely out of the screen on the left, matching desktop behavior in reverse.
 */

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MobileBikeScroll.module.css';

/* ── Asset Dimensions ─────────────────────────────────────────────────── */
const BIKE_W = 103.185;
const BIKE_H = 154.778;

const subscribeClient = () => () => {};

export const MobileBikeScroll: React.FC = () => {
  const mounted = useSyncExternalStore(subscribeClient, () => true, () => false);
  const assemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const assembly = assemblyRef.current;
    if (!assembly) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // Current rendered physics state (viewport coordinates)
    const current = {
      x: vw / 2,
      y: Math.min(vh * 0.52, 420),
      rotation: 0,
      opacity: vw >= 1200 ? 0 : 1,
    };

    let entrancePending = window.scrollY < 40 && vw < 1200;

    /* ── Compute Target State Based on Scroll Position ─────────────────── */
    function getTargetState(scrollY: number) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

      // Section boundary anchors
      const whyEl = document.querySelector('[class*="whySectionContainer"], [class*="sectionWrapper"]');
      const footWordmark = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');

      const heroEnd = whyEl ? (whyEl.getBoundingClientRect().top + scrollY - vh * 0.3) : 600;
      const footerStart = Math.max(heroEnd + 1000, maxScroll - 320);

      const rightEdgeX = vw - BIKE_W / 2 - 8;   // Right edge resting boundary
      const leftStartX = -BIKE_W - 20;          // Off-screen left entry point
      const rightExitX = vw + BIKE_W + 20;      // Off-screen right exit point
      const defaultY = vh * 0.44;               // Comfortable vertical lane in body

      // ─────────────────────────────────────────────────────────────────
      // 1. FOOTER ZONE: Right-to-Left Wordmark Crossing & Exit
      // ─────────────────────────────────────────────────────────────────
      if (scrollY >= footerStart) {
        const footerProgress = Math.max(0, Math.min(1, (scrollY - footerStart) / Math.max(1, maxScroll - footerStart)));
        const wRect = footWordmark ? footWordmark.getBoundingClientRect() : null;

        // Rotate to 90° (facing LEFT: front wheel & headlight point left)
        const targetRot = gsap.utils.interpolate(0, 90, Math.min(1, footerProgress * 2.2));

        // Align vertically with the center of the outlined wordmark
        const targetY = wRect ? (wRect.top + wRect.height * 0.46) : (vh - 60);

        // Drive from RIGHT TO LEFT across the wordmark, exiting off-screen left
        const startFooterX = vw - 20;
        const exitFooterX = -BIKE_H - 50;
        const targetX = gsap.utils.interpolate(startFooterX, exitFooterX, footerProgress);

        return { x: targetX, y: targetY, rotation: targetRot, opacity: 1 };
      }

      // ─────────────────────────────────────────────────────────────────
      // 2. HERO ZONE: Center Resting & Initial Scroll Movement
      // ─────────────────────────────────────────────────────────────────
      if (scrollY <= 50) {
        return {
          x: vw / 2,
          y: Math.min(vh * 0.52, 420),
          rotation: 0,
          opacity: 1,
        };
      }

      if (scrollY < heroEnd) {
        // Smoothly moves from Hero center to the right edge
        const t = (scrollY - 50) / (heroEnd - 50);
        const easedT = gsap.parseEase('power2.inOut')(t);
        const targetX = gsap.utils.interpolate(vw / 2, rightEdgeX, easedT);
        const targetY = gsap.utils.interpolate(Math.min(vh * 0.52, 420), defaultY, easedT);

        return { x: targetX, y: targetY, rotation: 0, opacity: 1 };
      }

      // ─────────────────────────────────────────────────────────────────
      // 3. BODY SECTIONS: Continuous Travel Across Screen with Pauses
      // ─────────────────────────────────────────────────────────────────
      // Divide the body scroll distance into 5 continuous section cycles:
      // Cycle 0: Why DropyHub
      // Cycle 1: Estimator
      // Cycle 2: About DropyHub
      // Cycle 3: How to Start
      // Cycle 4: Innovation / Testimonials / FAQ / Ready to Start
      const bodyScroll = scrollY - heroEnd;
      const bodySpan = Math.max(1, footerStart - heroEnd);
      const NUM_CYCLES = 5;
      const cycleLength = bodySpan / NUM_CYCLES;

      const rawIndex = bodyScroll / cycleLength;
      const cycleIndex = Math.min(NUM_CYCLES - 1, Math.floor(rawIndex));
      const p = Math.max(0, Math.min(1, (bodyScroll - cycleIndex * cycleLength) / cycleLength));

      // Each cycle has 3 distinct synchronized phases:
      // Phase A (0.0 -> 0.50): Travels across the screen from left to right edge
      // Phase B (0.50 -> 0.85): STOPS TEMPORARILY at the right edge boundary
      // Phase C (0.85 -> 1.00): Resumes movement, exits off-screen right, wraps to left
      let targetX: number;
      if (p < 0.50) {
        // Moving across from left edge to right edge
        const travelT = p / 0.50;
        const easedTravel = gsap.parseEase('power1.inOut')(travelT);
        targetX = gsap.utils.interpolate(leftStartX, rightEdgeX, easedTravel);
      } else if (p < 0.85) {
        // Paused / stopped temporarily at right edge boundary
        targetX = rightEdgeX;
      } else {
        // Moves out of viewport to the right before re-entering on opposite side
        const exitT = (p - 0.85) / 0.15;
        const easedExit = gsap.parseEase('power1.in')(exitT);
        targetX = gsap.utils.interpolate(rightEdgeX, rightExitX, easedExit);
      }

      return {
        x: targetX,
        y: defaultY,
        rotation: 0, // Facing down (rot: 0°) with headlights illuminating downwards
        opacity: 1,
      };
    }

    /* ── Render Frame (RAF via GSAP Ticker) ────────────────────────────── */
    function renderFrame() {
      if (entrancePending) return;

      if (window.innerWidth >= 1200) {
        gsap.set(assembly, { opacity: 0 });
        return;
      }

      const target = getTargetState(window.scrollY);

      // Smooth inertial damping (0.16 for responsive, jank-free tracking)
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      current.rotation += (target.rotation - current.rotation) * 0.16;
      current.opacity += (target.opacity - current.opacity) * 0.16;

      // Position assembly from its visual center
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

    /* ── Resize Handler ─────────────────────────────────────────────────── */
    function onResize() {
      vw = window.innerWidth;
      vh = window.innerHeight;

      if (vw >= 1200) {
        gsap.set(assembly, { opacity: 0 });
      } else {
        gsap.set(assembly, { opacity: 1 });
      }
    }

    /* ── Initial Boot & Entrance ────────────────────────────────────────── */
    if (entrancePending) {
      current.x = vw / 2;
      current.y = Math.min(vh * 0.52, 420);
      current.rotation = 0;
      current.opacity = 1;

      // Place bike above viewport in Hero
      gsap.set(assembly, {
        x: current.x - BIKE_W / 2,
        y: current.y - BIKE_H / 2 - 280,
        rotation: 0,
        opacity: 1,
        transformOrigin: '50% 50%',
        force3D: true,
      });

      // Smooth downward entrance arriving in Hero (1.0s, power2.out)
      gsap.to(assembly, {
        y: current.y - BIKE_H / 2,
        duration: 1.0,
        delay: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          entrancePending = false;
        },
      });

      // User scrolls during entrance: immediately transition to scroll tracking
      const onScrollInterrupt = () => {
        if (window.scrollY > 30 && entrancePending) {
          window.removeEventListener('scroll', onScrollInterrupt);
          entrancePending = false;
        }
      };
      window.addEventListener('scroll', onScrollInterrupt, { passive: true });
    } else {
      // Reload or deep scroll: snap directly to computed position
      const initial = getTargetState(window.scrollY);
      current.x = initial.x;
      current.y = initial.y;
      current.rotation = initial.rotation;
      current.opacity = initial.opacity;

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
        {/* Layer 1: Headlight yellow glow — centered on front axle */}
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

        {/* Layer 2: Primary Bike & Rider */}
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
