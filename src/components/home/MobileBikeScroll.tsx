'use client';

/**
 * MobileBikeScroll — Senior Precision Scroll-Synchronized Mobile Bike Engine
 *
 * User Specifications & Behaviors:
 * 1. Start Position:
 *    - Positioned directly ON the "Join As Delivery Partner" / Join Now button in the Hero section.
 *    - Facing downwards (0°), headlights illuminating down.
 *    - Immediately rendered in HTML/DOM with zero artificial delay or portal gating.
 *
 * 2. Continuous Scroll-Based Travel Across Screen:
 *    - Travels vertically and horizontally across the screen as user scrolls down.
 *    - When it reaches the right edge boundary, it STOPS TEMPORARILY and stays visible.
 *    - As the user continues scrolling, moves out of viewport on the right, wraps to left
 *      with ZERO reverse flyback (completely invisible during wrap), and re-enters smoothly from the left.
 *    - The bike is visible for the vast majority (>90%) of the page scroll, ensuring it is NEVER
 *      missing when the user is reading body sections (e.g. Estimator, About, Ecosystem).
 *
 * 3. Footer Crossing:
 *    - Drives across the outlined "Dropyhub" wordmark from RIGHT TO LEFT at a calm, unhurried pace.
 *    - Rotated 90° (facing left, headlights shining left).
 *    - Exits off-screen to the left.
 */

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MobileBikeScroll.module.css';

/* ── Asset Dimensions ─────────────────────────────────────────────────── */
const BIKE_W = 103.185;
const BIKE_H = 154.778;

export const MobileBikeScroll: React.FC = () => {
  const assemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const assembly = assemblyRef.current;
    if (!assembly) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // Helper to find Hero CTA button center
    function getHeroCtaCenter() {
      const btn = document.querySelector('a[class*="primaryCta"], a[class*="joinBtn"]');
      if (btn) {
        const r = btn.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          y: r.top + window.scrollY + r.height * 0.45,
        };
      }
      return { x: vw / 2, y: Math.min(vh * 0.52, 450) };
    }

    const heroCta = getHeroCtaCenter();

    // Physics state tracking
    const current = {
      x: heroCta.x,
      y: heroCta.y - window.scrollY,
      rotation: 0,
      opacity: vw >= 1200 ? 0 : 1,
    };

    /* ── Compute Target State Based on Scroll Position ─────────────────── */
    function getTargetState(scrollY: number) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

      // Section boundary anchors
      const whyEl = document.querySelector('[class*="whySectionContainer"], [class*="sectionWrapper"]');
      const footWordmark = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');

      const heroScrollEnd = whyEl ? Math.max(300, whyEl.getBoundingClientRect().top + scrollY - vh * 0.25) : 550;

      const rightEdgeX = vw - BIKE_W / 2 - 8;      // Right edge boundary lane
      const leftStartX = -BIKE_W - 20;             // Off-screen left entry point
      const rightExitX = vw + BIKE_W + 20;         // Off-screen right exit point
      const defaultY = vh * 0.44;                  // Standard vertical lane in body

      // ─────────────────────────────────────────────────────────────────
      // 1. FOOTER ZONE: Right-to-Left Wordmark Crossing & Exit
      // ─────────────────────────────────────────────────────────────────
      if (footWordmark) {
        const wRect = footWordmark.getBoundingClientRect();
        // Activate footer crossing when the wordmark enters the viewport
        if (wRect.top < vh + 100) {
          // Generous scroll distance (650px) for a calm, natural, unhurried pace
          const totalDistance = 650;
          const currentDist = Math.max(0, (vh + 100) - wRect.top);
          const footerProgress = Math.max(0, Math.min(1, currentDist / totalDistance));

          // Smooth rotation to 90° (facing left, headlights shining left)
          const rotProgress = Math.min(1, footerProgress * 2.5);
          const targetRot = gsap.utils.interpolate(0, 90, rotProgress);

          // Align vertically with the center of the outlined wordmark
          const targetY = Math.min(vh - 40, Math.max(90, wRect.top + wRect.height * 0.48));

          // Drive smoothly from RIGHT TO LEFT across the wordmark, exiting off-screen left
          const startFooterX = vw - 20;
          const exitFooterX = -BIKE_H - 90;
          const targetX = gsap.utils.interpolate(startFooterX, exitFooterX, footerProgress);

          const opacity = targetX < -BIKE_H - 10 ? 0 : 1;

          return { x: targetX, y: targetY, rotation: targetRot, opacity };
        }
      }

      // ─────────────────────────────────────────────────────────────────
      // 2. HERO ZONE: Stationed Directly On Join Now Button -> Glides Right
      // ─────────────────────────────────────────────────────────────────
      const cta = getHeroCtaCenter();
      const heroButtonScreenY = cta.y - scrollY;

      // When scrollY < 100: stays positioned directly ON the Join Now button!
      if (scrollY < 100) {
        return {
          x: cta.x,
          y: Math.max(120, heroButtonScreenY),
          rotation: 0,
          opacity: 1,
        };
      }

      // When 100 <= scrollY < heroScrollEnd:
      // Glides smoothly from the Join Now button over to the right edge lane
      if (scrollY < heroScrollEnd) {
        const t = (scrollY - 100) / (heroScrollEnd - 100);
        const easedT = gsap.parseEase('power2.inOut')(t);
        const targetX = gsap.utils.interpolate(cta.x, rightEdgeX, easedT);
        const targetY = gsap.utils.interpolate(Math.max(120, heroButtonScreenY), defaultY, easedT);

        return { x: targetX, y: targetY, rotation: 0, opacity: 1 };
      }

      // ─────────────────────────────────────────────────────────────────
      // 3. BODY SECTIONS: Continuous Travel Across Screen with Boundary Pauses
      // ─────────────────────────────────────────────────────────────────
      const wordmarkDocY = footWordmark ? (footWordmark.getBoundingClientRect().top + scrollY) : maxScroll;
      const bodyEndScroll = Math.max(heroScrollEnd + 500, wordmarkDocY - vh - 100);
      const bodyScroll = Math.max(0, scrollY - heroScrollEnd);
      const bodySpan = Math.max(1, bodyEndScroll - heroScrollEnd);

      // Cycle pacing: each cycle covers ~900px of scroll
      const cycleLength = Math.max(700, Math.min(1000, bodySpan / 4));
      const rawIndex = bodyScroll / cycleLength;
      const cycleIndex = Math.floor(rawIndex);
      const p = Math.max(0, Math.min(1, (bodyScroll - cycleIndex * cycleLength) / cycleLength));

      let targetX: number;
      let opacity = 1;

      if (p < 0.28) {
        // Phase A (0.00 -> 0.28): Travels across the screen from left side to right boundary
        const travelT = p / 0.28;
        const easedTravel = gsap.parseEase('power1.inOut')(travelT);
        targetX = gsap.utils.interpolate(leftStartX, rightEdgeX, easedTravel);
        // Fades in cleanly as it re-enters from left edge
        opacity = targetX < leftStartX + 10 ? 0 : Math.min(1, (targetX - leftStartX) / 40);
      } else if (p < 0.88) {
        // Phase B (0.28 -> 0.88): STOPS TEMPORARILY at the right edge boundary!
        // The bike remains FULLY VISIBLE (opacity = 1) along the right edge for 60% of every cycle!
        // This ensures whenever the user stops to read (e.g. Ecosystem, About, Estimator),
        // the bike is parked right there in view.
        targetX = rightEdgeX;
        opacity = 1;
      } else {
        // Phase C (0.88 -> 1.00): Resumes movement and exits off-screen right
        const exitT = (p - 0.88) / 0.12;
        const easedExit = gsap.parseEase('power1.in')(exitT);
        targetX = gsap.utils.interpolate(rightEdgeX, rightExitX, easedExit);
        opacity = targetX > vw + 10 ? 0 : Math.max(0, 1 - (targetX - vw) / (rightExitX - vw));
      }

      // Gentle vertical float within viewport synchronized with scroll
      const verticalOffset = Math.sin(bodyScroll * 0.004) * 25;
      const targetY = defaultY + verticalOffset;

      return {
        x: targetX,
        y: targetY,
        rotation: 0,
        opacity,
      };
    }

    /* ── Render Frame (RAF via GSAP Ticker) ────────────────────────────── */
    function renderFrame() {
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
        current.opacity = 0; // Completely invisible during snap!
      } else {
        // Smooth inertial tracking
        current.x += (target.x - current.x) * 0.16;
        current.y += (target.y - current.y) * 0.16;
        current.rotation += (target.rotation - current.rotation) * 0.16;
        current.opacity += (target.opacity - current.opacity) * 0.22;
      }

      // Hard safety guard: hide if center is far outside viewport
      const isOutside = current.x > vw + 40 || current.x < -BIKE_W - 40;
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

    // Initial setup — snap directly to computed position at current scroll
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

    window.addEventListener('resize', onResize);
    gsap.ticker.add(renderFrame);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(renderFrame);
    };
  }, []);

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div ref={assemblyRef} className={styles.bikeAssembly}>
        {/* Headlight glow layer */}
        <div className={styles.glowLayer}>
          <Image
            src="/assets/Home/Headlight.png"
            alt=""
            width={76}
            height={65}
            priority
            className={styles.glowAsset}
          />
        </div>

        {/* Motorcycle and rider top-down sprite */}
        <div className={styles.riderLayer}>
          <Image
            src="/assets/Home/Bike.png"
            alt=""
            width={103}
            height={155}
            priority
            className={styles.riderAsset}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileBikeScroll;
