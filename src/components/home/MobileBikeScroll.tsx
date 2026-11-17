'use client';

/**
 * MobileBikeScroll — Scroll-Synchronized Mobile Bike Engine
 *
 * Implements the user's specified path & scroll-based behaviors:
 *
 * 1. Hero Start:
 *    - Positioned directly ON the "Join As Delivery Partner" button (center-x, button-y).
 *    - Facing downwards (0°), headlights shining down into the stats grid.
 *
 * 2. Continuous Scroll-Based Travel Across Screen:
 *    - The bike moves vertically across the screen as user scrolls down.
 *    - Travels across from left to right towards the right boundary.
 *    - When it reaches the right edge of the screen, it STOPS TEMPORARILY.
 *    - As user continues scrolling, moves out of the viewport on the right and
 *      re-enters from the opposite (left) side with ZERO reverse flyback.
 *    - The behavior repeats continuously throughout the entire page scroll.
 *
 * 3. Footer Crossing:
 *    - Reaches the outlined "Dropyhub" wordmark, turns 90° (facing left).
 *    - Drives smoothly from RIGHT TO LEFT across the wordmark and exits screen-left.
 */

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MobileBikeScroll.module.css';

const BIKE_W = 103.185;
const BIKE_H = 154.778;

export const MobileBikeScroll: React.FC = () => {
  const assemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const assembly = assemblyRef.current;
    if (!assembly) return;

    // Helper to get fresh viewport metrics
    const getVw = () => window.innerWidth;
    const getVh = () => window.innerHeight;

    // Helper: Find Hero CTA button center
    function getHeroCta() {
      const vw = getVw();
      const vh = getVh();
      const btn = document.querySelector('a[class*="primaryCta"], a[class*="joinBtn"]') as HTMLElement | null;
      if (btn) {
        const r = btn.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          docY: r.top + window.scrollY + r.height * 0.45,
        };
      }
      return { x: vw / 2, docY: Math.min(vh * 0.52, 450) };
    }

    // ─── Target State Computation ───
    function getTarget(scrollY: number) {
      const vw = getVw();
      const vh = getVh();
      const docH = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, docH - vh);

      const rightEdgeX = vw - BIKE_W / 2 - 8;
      const leftOffX   = -BIKE_W - 20;
      const rightOffX  = vw + BIKE_W + 20;
      const defaultY   = vh * 0.42;

      // ─────────────────────────────────────────────────────────────
      // 1. FOOTER ZONE: Right-to-Left Wordmark Crossing
      // ─────────────────────────────────────────────────────────────
      const footWordmark = document.querySelector('[class*="outlinedWordmark"]') as HTMLElement | null;
      if (footWordmark) {
        const wmRect = footWordmark.getBoundingClientRect();
        if (wmRect.top < vh + 100) {
          const totalDist = 650;
          const currentDist = Math.max(0, (vh + 100) - wmRect.top);
          const fp = Math.max(0, Math.min(1, currentDist / totalDist));

          // Rotate 0° -> 90° (facing left, headlights shining left)
          const rotT = Math.min(1, fp * 2.5);
          const rotation = gsap.utils.interpolate(0, 90, rotT);

          // Center vertically on the wordmark
          const targetY = Math.min(vh - 35, Math.max(80, wmRect.top + wmRect.height * 0.48));

          // Cross from right (vw - 20) to left (-BIKE_H - 80)
          const startX = vw - 20;
          const endX   = -BIKE_H - 80;
          const targetX = gsap.utils.interpolate(startX, endX, fp);

          const opacity = targetX < endX + 15 ? 0 : 1;
          return { x: targetX, y: targetY, rotation, opacity };
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 2. HERO ZONE: Stationed Directly On the Join Now Button
      // ─────────────────────────────────────────────────────────────
      const cta = getHeroCta();
      const heroScreenY = cta.docY - scrollY;

      // Scroll 0 -> 100px: firmly resting on the button
      if (scrollY < 100) {
        return {
          x: cta.x,
          y: Math.max(80, heroScreenY),
          rotation: 0,
          opacity: 1,
        };
      }

      // Scroll 100 -> 550px: smooth glide from Hero CTA over to the right boundary
      const heroTransitionEnd = 550;
      if (scrollY < heroTransitionEnd) {
        const t = (scrollY - 100) / (heroTransitionEnd - 100);
        const easedT = gsap.parseEase('power2.inOut')(t);
        const targetX = gsap.utils.interpolate(cta.x, rightEdgeX, easedT);
        const targetY = gsap.utils.interpolate(Math.max(80, heroScreenY), defaultY, easedT);

        return { x: targetX, y: targetY, rotation: 0, opacity: 1 };
      }

      // ─────────────────────────────────────────────────────────────
      // 3. BODY SECTIONS: Continuous Scroll-Based Travel Across Screen
      //    - Travels across from left to right boundary
      //    - Stops temporarily at the right edge boundary
      //    - Exits right and re-enters smoothly from left (no flyback)
      // ─────────────────────────────────────────────────────────────
      const bodyStart = heroTransitionEnd;
      const bodyScroll = Math.max(0, scrollY - bodyStart);

      // Cycle pacing: each traversal and pause cycle spans ~850px of scroll
      const cycleLen = 850;
      const rawCycle = bodyScroll / cycleLen;
      const cycleIdx = Math.floor(rawCycle);
      const p = rawCycle - cycleIdx; // 0.0 -> 1.0 within cycle

      let targetX: number;
      let opacity = 1;

      if (p < 0.28) {
        // Phase A (0.00 -> 0.28): Re-enters from left and travels across to right edge
        const travelT = p / 0.28;
        const eased = gsap.parseEase('power1.inOut')(travelT);
        targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);
        // Clean fade in as it enters from screen-left
        opacity = targetX < leftOffX + 15 ? 0 : Math.min(1, (targetX - leftOffX) / 45);
      } else if (p < 0.88) {
        // Phase B (0.28 -> 0.88): STOPS TEMPORARILY AT RIGHT EDGE BOUNDARY
        // Visible and parked in the right lane while user reads content
        targetX = rightEdgeX;
        opacity = 1;
      } else {
        // Phase C (0.88 -> 1.00): Resumes movement and exits off-screen right
        const exitT = (p - 0.88) / 0.12;
        const eased = gsap.parseEase('power1.in')(exitT);
        targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        opacity = targetX > vw + 10 ? 0 : Math.max(0, 1 - (targetX - vw) / (rightOffX - vw));
      }

      // Gentle vertical motion synchronized with scroll down the lane
      const drift = Math.sin(bodyScroll * 0.003) * 25;
      const targetY = defaultY + drift;

      return {
        x: targetX,
        y: targetY,
        rotation: 0,
        opacity,
      };
    }

    // ─── Physics State ───
    const initial = getTarget(window.scrollY);
    const cur = {
      x: initial.x,
      y: initial.y,
      rotation: initial.rotation,
      opacity: initial.opacity,
    };

    // Set initial layout immediately
    gsap.set(assembly, {
      x: cur.x - BIKE_W / 2,
      y: cur.y - BIKE_H / 2,
      rotation: cur.rotation,
      opacity: getVw() >= 1200 ? 0 : cur.opacity,
      transformOrigin: '50% 50%',
      force3D: true,
    });

    // ─── Render Frame (RAF via GSAP Ticker) ───
    function renderFrame() {
      const vw = getVw();
      if (vw >= 1200) {
        gsap.set(assembly, { opacity: 0 });
        return;
      }

      const tgt = getTarget(window.scrollY);

      // ZERO-REVERSE-FLYBACK:
      // If target jumps across cycle boundaries (from right offscreen to left offscreen),
      // snap cur.x directly without animating across the screen!
      const isWrapJump = Math.abs(tgt.x - cur.x) > vw * 0.45;
      if (isWrapJump) {
        cur.x = tgt.x;
        cur.y = tgt.y;
        cur.rotation = tgt.rotation;
        cur.opacity = 0; // invisible during wrap snap
      } else {
        cur.x += (tgt.x - cur.x) * 0.16;
        cur.y += (tgt.y - cur.y) * 0.16;
        cur.rotation += (tgt.rotation - cur.rotation) * 0.16;
        cur.opacity += (tgt.opacity - cur.opacity) * 0.22;
      }

      // Hard safety guard
      const isOutside = cur.x > vw + 30 || cur.x < -BIKE_W - 30;
      const finalOpacity = isOutside ? 0 : Math.max(0, Math.min(1, cur.opacity));

      gsap.set(assembly, {
        x: cur.x - BIKE_W / 2,
        y: cur.y - BIKE_H / 2,
        rotation: cur.rotation,
        opacity: finalOpacity,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    function onResize() {
      if (getVw() >= 1200) {
        gsap.set(assembly, { opacity: 0 });
      }
    }

    window.addEventListener('resize', onResize, { passive: true });
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
