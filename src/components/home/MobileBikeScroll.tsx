'use client';

/**
 * MobileBikeScroll — Scroll-Synchronized Mobile Bike Engine
 *
 * Implements the user's exact 5 scroll stages and behaviors:
 *
 * 1. Hero Entrance & Resting State:
 *    - Starts behind the navbar at top center (x: vw/2, y: 65px).
 *    - After 2 seconds (or immediately on user scroll), smoothly glides down onto the
 *      "Join As Delivery Partner" button (x: cta.x, y: cta.y).
 *
 * 2. Stage 1 (Hero to Stats End):
 *    - As user scrolls, glides towards the right side and travels down through Stats.
 *    - At the bottom of Stats (hatched divider bar), exits out of the viewport from the right.
 *    - Remains offscreen during Why DropyHub.
 *
 * 3. Stage 2 (Interactive Estimator):
 *    - At the horizontal bar above the estimator, enters smoothly from the left side and
 *      glides across to the right side (smooth, comfortable traversal paced with scroll).
 *    - Travels down the right side through vehicle choices, sliders, and earnings card.
 *    - At the end of the estimator, exits out of the viewport from the right side.
 *
 * 4. Stage 3 (About DropyHub & How to Start):
 *    - At the About section, enters smoothly from the left side across to the right.
 *    - Continues down along the right side through About intro, Ecosystem values, and
 *      all steps (01-05) of How to Start.
 *    - At the end of How to Start, exits out of the viewport to the right.
 *    - Remains offscreen during Innovation & Partners.
 *
 * 5. Stage 4 (FAQ & Ready to Start Earning):
 *    - At the FAQ section, enters from the left side and glides to the right.
 *    - Travels down along the right side through FAQ questions and Ready to Start Earning CTA.
 *    - At the end of Ready to Start Earning, exits out of the viewport to the right.
 *
 * 6. Stage 5 (Footer Wordmark):
 *    - Enters into the footer from the right side, rotated 90° (facing left, headlights shining left).
 *    - Travels smoothly across the outlined "Dropyhub" wordmark from right to left.
 *    - Exits off the left edge of the viewport.
 *
 * Zero-Reverse Flyback:
 *    - Bike NEVER flies backward across the viewport between stages.
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

    const getVw = () => window.innerWidth;
    const getVh = () => window.innerHeight;

    // Entrance state: 0 = behind navbar, 1 = landed on Hero CTA
    const entranceState = { progress: 0 };

    // Find Hero CTA button position
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

    // After 2 seconds, smoothly animate bike down from navbar onto the button
    const entranceTimer = setTimeout(() => {
      gsap.to(entranceState, {
        progress: 1,
        duration: 1.2,
        ease: 'power2.out',
      });
    }, 2000);

    // If user starts scrolling before 2s, hand off immediately to scroll
    const onInitialScroll = () => {
      if (window.scrollY > 15 && entranceState.progress < 1) {
        clearTimeout(entranceTimer);
        entranceState.progress = 1;
      }
    };
    window.addEventListener('scroll', onInitialScroll, { passive: true });

    // Cache or resolve section document metrics dynamically
    function getSectionBounds() {
      const scrollY = window.scrollY;

      const getBox = (sel: string) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: r.top + scrollY,
          bottom: r.bottom + scrollY,
          height: r.height,
        };
      };

      const heroBtn = getBox('a[class*="primaryCta"], a[class*="joinBtn"]');
      const stats = getBox('[class*="statsBarContainer"], [class*="statsGrid"]');
      const whyDivider = getBox('[class*="fullBleedDivider"]');
      const estimator = getBox('[class*="estimatorSection"]');
      const about = getBox('[class*="aboutSection"]');
      const howStart = getBox('[class*="howToStartContainer"], [class*="stepsList"]');
      const faq = getBox('[class*="faqHeading"], [class*="faqTitle"]');
      const cta = getBox('[class*="ctaContainer"]');
      const footWordmark = document.querySelector('[class*="outlinedWordmark"]') as HTMLElement | null;

      return {
        heroBtn,
        stats,
        whyDivider,
        estimator,
        about,
        howStart,
        faq,
        cta,
        footWordmark,
      };
    }

    // ─── Target State Computation ───
    function getTarget(scrollY: number) {
      const vw = getVw();
      const vh = getVh();

      const rightEdgeX = vw - BIKE_W / 2 - 8;
      const leftOffX   = -BIKE_W - 30;
      const rightOffX  = vw + BIKE_W + 30;
      const defaultY   = vh * 0.42;

      const bounds = getSectionBounds();

      // ─────────────────────────────────────────────────────────────
      // STAGE 5: FOOTER (Right-to-Left Wordmark Crossing)
      // ─────────────────────────────────────────────────────────────
      if (bounds.footWordmark) {
        const wmRect = bounds.footWordmark.getBoundingClientRect();
        if (wmRect.top < vh + 100) {
          const totalDist = 720; // Generous distance for smooth, comfortable pace
          const currentDist = Math.max(0, (vh + 100) - wmRect.top);
          const fp = Math.max(0, Math.min(1, currentDist / totalDist));

          // Rotate 0° -> 90° (facing left, headlights shining left)
          const rotT = Math.min(1, fp * 2.2);
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
      // HERO ENTRANCE & RESTING ON BUTTON
      // ─────────────────────────────────────────────────────────────
      const cta = getHeroCta();
      const heroScreenY = cta.docY - scrollY;
      const startY = 65; // Behind navbar
      const startX = vw / 2; // Centered
      const entranceP = entranceState.progress;

      // When at the very top (scrollY < 20): interpolate navbar -> button
      if (scrollY < 20) {
        const targetX = gsap.utils.interpolate(startX, cta.x, entranceP);
        const targetY = gsap.utils.interpolate(startY, Math.max(80, heroScreenY), entranceP);
        return {
          x: targetX,
          y: targetY,
          rotation: 0,
          opacity: 1,
        };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 1: HERO BUTTON -> STATS SECTION END
      // ─────────────────────────────────────────────────────────────
      // Stats is at top: 559, bottom: 817, whyDivider: 817 to 855.
      // Bike stays visible throughout Stats, exiting at whyDivider.
      const statsDividerTop = bounds.whyDivider ? bounds.whyDivider.top : 817;
      const stage1ExitStart = statsDividerTop - 120; // ~697px
      const stage1ExitEnd   = statsDividerTop + 60;  // ~877px

      if (scrollY < stage1ExitEnd) {
        // Subphase 1a: Scroll 20 -> 220px: glide from CTA button over to right edge
        if (scrollY < 220) {
          const t = Math.max(0, (scrollY - 20) / 200);
          const eased = gsap.parseEase('power2.inOut')(t);
          const targetX = gsap.utils.interpolate(cta.x, rightEdgeX, eased);
          const targetY = gsap.utils.interpolate(Math.max(80, heroScreenY), defaultY, eased);
          return { x: targetX, y: targetY, rotation: 0, opacity: 1 };
        }

        // Subphase 1b: Travel down along the right side through Stats
        if (scrollY < stage1ExitStart) {
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 1c: Exit offscreen right at the bottom of Stats
        const exitT = Math.max(0, Math.min(1, (scrollY - stage1ExitStart) / (stage1ExitEnd - stage1ExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation: 0, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 2: INTERACTIVE ESTIMATOR
      // ─────────────────────────────────────────────────────────────
      // Estimator top: 1800, bottom: 3036.
      const estTopDoc = bounds.estimator ? bounds.estimator.top : 1800;
      const estBottomDoc = bounds.estimator ? bounds.estimator.bottom : 3036;

      const estTriggerStart = estTopDoc - vh * 0.40; // ~1460px
      const estTravelAcrossEnd = estTriggerStart + 350; // 350px smooth traversal window
      const estExitStart = estBottomDoc - vh * 0.35; // ~2740px
      const estExitEnd = estBottomDoc - vh * 0.15;   // ~2910px

      if (scrollY < estExitEnd) {
        if (scrollY < estTriggerStart) {
          // Parked offscreen right during Why section
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < estTravelAcrossEnd) {
          // Subphase 2a: Smooth entrance from left side across to right edge
          const t = Math.max(0, Math.min(1, (scrollY - estTriggerStart) / 350));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);
          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation: 0, opacity };
        }

        if (scrollY < estExitStart) {
          // Subphase 2b: Travel down along right side through estimator
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 2c: Exit right at end of estimator
        const exitT = Math.max(0, Math.min(1, (scrollY - estExitStart) / (estExitEnd - estExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation: 0, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 3: ABOUT DROPYHUB & HOW TO START
      // ─────────────────────────────────────────────────────────────
      // About top: 3036, bottom: 5233.
      const aboutTopDoc = bounds.about ? bounds.about.top : 3036;
      const aboutBottomDoc = bounds.about ? bounds.about.bottom : 5233;

      const aboutTriggerStart = aboutTopDoc - vh * 0.40; // ~2700px
      const aboutTravelAcrossEnd = aboutTriggerStart + 350; // 350px smooth traversal
      const aboutExitStart = aboutBottomDoc - vh * 0.35; // ~4940px
      const aboutExitEnd = aboutBottomDoc - vh * 0.15;   // ~5100px

      if (scrollY < aboutExitEnd) {
        if (scrollY < aboutTriggerStart) {
          // Parked offscreen right between estimator and about
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < aboutTravelAcrossEnd) {
          // Subphase 3a: Smooth entrance from left across to right edge
          const t = Math.max(0, Math.min(1, (scrollY - aboutTriggerStart) / 350));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);
          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation: 0, opacity };
        }

        if (scrollY < aboutExitStart) {
          // Subphase 3b: Goes on and on down right side through About & How to Start
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 3c: At How to Start end, exit offscreen right
        const exitT = Math.max(0, Math.min(1, (scrollY - aboutExitStart) / (aboutExitEnd - aboutExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation: 0, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 4: FAQ & READY TO START EARNING
      // ─────────────────────────────────────────────────────────────
      // FAQ top: 6011, CTA bottom: ~6800.
      const faqTopDoc = bounds.faq ? bounds.faq.top : 6011;
      const ctaBottomDoc = bounds.cta ? bounds.cta.bottom : 6800;

      const faqTriggerStart = faqTopDoc - vh * 0.40; // ~5670px
      const faqTravelAcrossEnd = faqTriggerStart + 350; // 350px smooth traversal
      const ctaExitStart = ctaBottomDoc - vh * 0.35; // ~6500px
      const ctaExitEnd = ctaBottomDoc - vh * 0.15;   // ~6670px

      if (scrollY < ctaExitEnd) {
        if (scrollY < faqTriggerStart) {
          // Parked offscreen right during Innovation & Partners
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < faqTravelAcrossEnd) {
          // Subphase 4a: Smooth entrance from left side across to right
          const t = Math.max(0, Math.min(1, (scrollY - faqTriggerStart) / 350));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);
          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation: 0, opacity };
        }

        if (scrollY < ctaExitStart) {
          // Subphase 4b: Down right side through FAQ & Ready to Start Earning CTA
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 4c: Exit right at end of Ready to Start Earning
        const exitT = Math.max(0, Math.min(1, (scrollY - ctaExitStart) / (ctaExitEnd - ctaExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation: 0, opacity };
      }

      // Default fallback before footer wordmark is reached
      return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
    }

    // ─── Physics State ───
    const initial = getTarget(window.scrollY);
    const cur = {
      x: initial.x,
      y: initial.y,
      rotation: initial.rotation,
      opacity: initial.opacity,
    };

    // Set initial position
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
      // If target jumps across boundaries (e.g. from right-offscreen to left-offscreen),
      // or if both target and current are invisible/offscreen, snap cur without animating across!
      const isWrapJump = Math.abs(tgt.x - cur.x) > vw * 0.40;
      const isBothOffscreen = cur.opacity <= 0.05 && tgt.opacity <= 0.05;

      if (isWrapJump || isBothOffscreen) {
        cur.x = tgt.x;
        cur.y = tgt.y;
        cur.rotation = tgt.rotation;
        cur.opacity = tgt.opacity;
      } else {
        cur.x += (tgt.x - cur.x) * 0.16;
        cur.y += (tgt.y - cur.y) * 0.16;
        cur.rotation += (tgt.rotation - cur.rotation) * 0.16;
        cur.opacity += (tgt.opacity - cur.opacity) * 0.22;
      }

      // Hard safety guard: if outside bounds, guarantee opacity 0
      const isOutside = cur.x > vw + 25 || cur.x < -BIKE_W - 25;
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
      clearTimeout(entranceTimer);
      window.removeEventListener('scroll', onInitialScroll);
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
