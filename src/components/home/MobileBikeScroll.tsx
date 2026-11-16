'use client';

/**
 * MobileBikeScroll — Senior Precision Scroll-Synchronized Mobile Bike Engine
 * Spec-Compliant Implementation:
 *
 * 1. Start (Hero Section):
 *    - Starts under the navbar (Figma Frame 1, center, y ~ 75px, rot: 0° facing down).
 *    - As user starts scrolling, drives vertically down the center to the Hero CTA resting position (Figma Frame 2, y ~ 420px).
 *    - Pauses over the CTA buttons, then glides smoothly across to the right edge boundary (Figma Frame 3).
 *
 * 2. Body Sections (Continuous Travel Across Screen with Pause at Boundary & Zero-Reverse Flyback):
 *    - Travels horizontally across the screen from left to right as user scrolls.
 *    - When it reaches the right edge of the screen, it STOPS TEMPORARILY at the boundary.
 *    - As the user continues scrolling, moves out of the viewport on the right.
 *    - While outside the viewport, it is completely hidden and snaps to the left offscreen position.
 *    - It NEVER flies backwards across the screen; it re-enters smoothly from the opposite (left) side.
 *    - Repeats continuously throughout the entire page scroll, perfectly synchronized with scroll.
 *
 * 3. Footer (Calm, Paced Reverse Wordmark Crossing):
 *    - When the outlined "Dropyhub" wordmark enters the viewport, the bike is at the right edge of the wordmark.
 *    - Smoothly rotates to 90° (facing LEFT, headlights casting left).
 *    - Drives across the outlined "Dropyhub" wordmark from RIGHT TO LEFT at a natural, unhurried pace.
 *    - Exits completely off the screen to the left (Figma Frames 16 & 17).
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
      y: 75,
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

      const heroScrollEnd = whyEl ? (whyEl.getBoundingClientRect().top + scrollY - vh * 0.3) : 600;

      const rightEdgeX = vw - BIKE_W / 2 - 8;   // Right edge resting boundary
      const leftStartX = -BIKE_W - 30;          // Off-screen left entry point
      const rightExitX = vw + BIKE_W + 30;      // Off-screen right exit point
      const defaultY = vh * 0.44;               // Vertical lane in body

      // ─────────────────────────────────────────────────────────────────
      // 1. FOOTER ZONE: Right-to-Left Wordmark Crossing & Exit
      // ─────────────────────────────────────────────────────────────────
      if (footWordmark) {
        const wRect = footWordmark.getBoundingClientRect();
        // Activate footer crossing when the wordmark enters the viewport
        if (wRect.top < vh + 80) {
          // Progress from when wordmark top enters (vh + 80) to max scroll
          const totalDistance = 500; // Generous 500px smooth scroll distance
          const currentDist = Math.max(0, (vh + 80) - wRect.top);
          const footerProgress = Math.max(0, Math.min(1, currentDist / totalDistance));

          // Smooth rotation to 90° (facing left, headlights casting left)
          const rotProgress = Math.min(1, footerProgress * 2.2);
          const targetRot = gsap.utils.interpolate(0, 90, rotProgress);

          // Align vertically with the center of the outlined wordmark
          const targetY = Math.min(vh - 45, Math.max(100, wRect.top + wRect.height * 0.46));

          // Drive from RIGHT TO LEFT across the wordmark, exiting off-screen left
          const startFooterX = vw - 25;
          const exitFooterX = -BIKE_H - 80;
          const targetX = gsap.utils.interpolate(startFooterX, exitFooterX, footerProgress);

          const opacity = targetX < -BIKE_H - 20 ? 0 : 1;

          return { x: targetX, y: targetY, rotation: targetRot, opacity };
        }
      }

      // ─────────────────────────────────────────────────────────────────
      // 2. HERO ZONE: Starts Under Navbar -> Stops at CTA -> Glides Right
      // ─────────────────────────────────────────────────────────────────
      // Scroll 0 -> 200px: Glides vertically down center from under navbar to CTA
      if (scrollY < 200) {
        const t = Math.max(0, Math.min(1, scrollY / 200));
        const easedT = gsap.parseEase('power1.out')(t);
        const startY = 75; // Directly under navbar (Figma Frame 1)
        const heroRestY = Math.min(vh * 0.52, 420);
        const targetY = gsap.utils.interpolate(startY, heroRestY, easedT);

        return {
          x: vw / 2,
          y: targetY,
          rotation: 0,
          opacity: 1,
        };
      }

      // Scroll 200 -> 320px: Stops temporarily at Hero CTA resting position (Figma Frame 2)
      if (scrollY < 320) {
        return {
          x: vw / 2,
          y: Math.min(vh * 0.52, 420),
          rotation: 0,
          opacity: 1,
        };
      }

      // Scroll 320 -> heroScrollEnd: Moves smoothly across to right edge boundary (Figma Frame 3)
      if (scrollY < heroScrollEnd) {
        const t = (scrollY - 320) / (heroScrollEnd - 320);
        const easedT = gsap.parseEase('power2.inOut')(t);
        const targetX = gsap.utils.interpolate(vw / 2, rightEdgeX, easedT);
        const targetY = gsap.utils.interpolate(Math.min(vh * 0.52, 420), defaultY, easedT);

        return { x: targetX, y: targetY, rotation: 0, opacity: 1 };
      }

      // ─────────────────────────────────────────────────────────────────
      // 3. BODY SECTIONS: Continuous Travel Across Screen with Boundary Pauses
      // ─────────────────────────────────────────────────────────────────
      const wordmarkDocY = footWordmark ? (footWordmark.getBoundingClientRect().top + scrollY) : maxScroll;
      const bodyEndScroll = Math.max(heroScrollEnd + 600, wordmarkDocY - vh - 80);
      const bodyScroll = Math.max(0, scrollY - heroScrollEnd);
      const bodySpan = Math.max(1, bodyEndScroll - heroScrollEnd);
      const NUM_CYCLES = 5;
      const cycleLength = bodySpan / NUM_CYCLES;

      const rawIndex = bodyScroll / cycleLength;
      const cycleIndex = Math.min(NUM_CYCLES - 1, Math.floor(rawIndex));
      const p = Math.max(0, Math.min(1, (bodyScroll - cycleIndex * cycleLength) / cycleLength));

      let targetX: number;
      let opacity = 1;

      if (p < 0.45) {
        // Phase A: Travels across the screen from left side towards right edge
        const travelT = p / 0.45;
        const easedTravel = gsap.parseEase('power1.inOut')(travelT);
        targetX = gsap.utils.interpolate(leftStartX, rightEdgeX, easedTravel);
        // Smooth fade-in as it enters from the left edge
        opacity = targetX < leftStartX + 15 ? 0 : Math.min(1, (targetX - leftStartX) / 45);
      } else if (p < 0.82) {
        // Phase B: STOPS TEMPORARILY at the right edge boundary (Figma frames 3, 5, 6, 8, etc.)
        targetX = rightEdgeX;
        opacity = 1;
      } else {
        // Phase C: Resumes movement and exits off-screen right
        const exitT = (p - 0.82) / 0.18;
        const easedExit = gsap.parseEase('power1.in')(exitT);
        targetX = gsap.utils.interpolate(rightEdgeX, rightExitX, easedExit);
        // Fade out as it leaves viewport on the right
        opacity = targetX > vw + 10 ? 0 : Math.max(0, 1 - (targetX - vw) / (rightExitX - vw));
      }

      return {
        x: targetX,
        y: defaultY,
        rotation: 0,
        opacity,
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

      // ─────────────────────────────────────────────────────────────────
      // ZERO-REVERSE-FLYBACK WRAP LOGIC:
      // If the target jumps between right and left across a cycle boundary,
      // snap current.x directly without tweening across the viewport!
      // ─────────────────────────────────────────────────────────────────
      const isWrapJump = Math.abs(target.x - current.x) > vw * 0.45;
      if (isWrapJump) {
        current.x = target.x;
        current.y = target.y;
        current.rotation = target.rotation;
        current.opacity = 0; // Completely invisible during wrap jump!
      } else {
        // Smooth inertial tracking
        current.x += (target.x - current.x) * 0.16;
        current.y += (target.y - current.y) * 0.16;
        current.rotation += (target.rotation - current.rotation) * 0.16;
        current.opacity += (target.opacity - current.opacity) * 0.22;
      }

      // Hard safety guard: if bike center is physically outside viewport, hide completely
      const isOutside = current.x > vw + 20 || current.x < -BIKE_W - 20;
      const renderOpacity = isOutside ? 0 : Math.max(0, Math.min(1, current.opacity));

      // Position assembly from its visual center
      const assemblyLeft = current.x - BIKE_W / 2;
      const assemblyTop = current.y - BIKE_H / 2;

      gsap.set(assembly, {
        x: assemblyLeft,
        y: assemblyTop,
        rotation: current.rotation,
        opacity: renderOpacity,
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
      current.y = 75; // Starts under the navbar (Figma Frame 1)
      current.rotation = 0;
      current.opacity = 1;

      // Start above navbar and glide down into position under navbar
      gsap.set(assembly, {
        x: current.x - BIKE_W / 2,
        y: -BIKE_H,
        rotation: 0,
        opacity: 1,
        transformOrigin: '50% 50%',
        force3D: true,
      });

      gsap.to(assembly, {
        y: current.y - BIKE_H / 2,
        duration: 0.9,
        delay: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          entrancePending = false;
        },
      });

      // User scrolls during entrance: immediately hand over to scroll tracking
      const onScrollInterrupt = () => {
        if (window.scrollY > 15 && entrancePending) {
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
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(renderFrame);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={assemblyRef}
      className={styles.bikeAssembly}
      aria-hidden="true"
      style={{
        width: `${BIKE_W}px`,
        height: `${BIKE_H}px`,
      }}
    >
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
      <div className={styles.riderLayer}>
        <Image
          src="/assets/Home/Bike.png"
          alt=""
          width={104}
          height={155}
          className={styles.riderAsset}
          priority
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
};

export default MobileBikeScroll;
