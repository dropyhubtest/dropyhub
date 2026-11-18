'use client';

/**
 * MobileBikeScroll — Scroll-Synchronized Mobile Bike Engine
 *
 * Calibrated Behaviors:
 * 1. Hero Entrance & Resting State:
 *    - Starts tucked behind the navbar (y: -40px, centered x: vw/2, z-index behind navbar).
 *    - After 2 seconds, smoothly glides down onto the "Join As Delivery Partner" button (rotation: 0°).
 *    - If user scrolls, hand off immediately to scroll.
 *
 * 2. Curved Veering & Direction Change:
 *    - From Hero button to Stats lane: curves in an arc and TURNS towards the right (steers right to -65°),
 *      then straightens out to 0° (facing down) as it enters the right lane.
 *    - During all left-to-right section crossings (Estimator, About, FAQ): bike literally FACES RIGHT
 *      (rotation: -90°, headlights pointing right), driving across the screen, then banks into 0° facing down.
 *
 * 3. Precision Section Pacing (User-Calibrated):
 *    - Estimator: Enters from left AFTER Why DropyHub (at ~1480px), stays through the entire Monthly
 *      Estimated Net Earnings card, and exits right AFTER the earnings card (~2750–2950px).
 *    - About & How to Start: Enters from left at the START of About (~3000px), travels down through
 *      About and How to Start, and exits right at the VERY END of the section (~4950–5180px).
 *    - FAQ & Ready to Start Earning: Enters from left at top of FAQ (~5650px), travels down through
 *      FAQ questions and through Ready to Start Earning, exiting at the end of CTA (~6500–6680px).
 *
 * 4. Footer Wordmark Crossing:
 *    - Completely hidden during Company / Partners / Contact / Social / Copyright links.
 *    - Only appears when the outlined "Dropyhub" wordmark itself comes into view.
 *    - Starts at the far right (vw - 10px) and drives across the wordmark to the left facing left (rotation: 90°).
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

    // Entrance state: 0 = tucked behind navbar, 1 = landed on Hero CTA
    const entranceState = { progress: 0 };

    // Footer animated progress (driven by GSAP when wordmark enters view)
    const footerAnimState = { progress: 0, triggered: false };

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

    // After 2 seconds, smoothly animate bike down from behind navbar onto the button
    const entranceTimer = setTimeout(() => {
      gsap.to(entranceState, {
        progress: 1,
        duration: 2.4, // Graceful, slow glide from navbar to button
        ease: 'power2.out',
      });
    }, 2000);

    // If user starts scrolling before 2s, hand off smoothly to scroll
    const onInitialScroll = () => {
      if (window.scrollY > 15 && entranceState.progress < 1) {
        clearTimeout(entranceTimer);
        gsap.to(entranceState, {
          progress: 1,
          duration: 0.6,
          ease: 'power1.out',
        });
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

    // Physics State initialized early
    const cur = {
      x: getVw() / 2,
      y: -60,
      rotation: 0,
      opacity: 0,
    };

    // ─── Target State Computation ───
    function getTarget(scrollY: number) {
      const vw = getVw();
      const vh = getVh();

      const rightEdgeX = vw - BIKE_W / 2 - 8;
      const leftOffX   = -BIKE_W - 30;
      const rightOffX  = vw + BIKE_W + 30;
      const defaultY   = vh * 0.40;

      const bounds = getSectionBounds();

      // ─────────────────────────────────────────────────────────────
      // STAGE 5: FOOTER (Right-to-Left Wordmark Crossing)
      // Only active when the outlined "Dropyhub" wordmark itself is visible!
      // During Company / Partners / Contact links, bike is completely hidden.
      // ─────────────────────────────────────────────────────────────
      if (bounds.footWordmark) {
        const wmRect = bounds.footWordmark.getBoundingClientRect();
        // Trigger ONLY when wordmark has entered the viewport (top < vh * 0.90)
        if (wmRect.top < vh * 0.90) {
          const targetY = Math.min(vh - 35, Math.max(80, wmRect.top + wmRect.height * 0.48));

          if (!footerAnimState.triggered) {
            footerAnimState.triggered = true;
            // Snap physics directly to wordmark level at far right!
            cur.x = vw - 10;
            cur.y = targetY;
            cur.rotation = 90;
            cur.opacity = 1;

            gsap.to(footerAnimState, {
              progress: 1,
              duration: 2.8,
              ease: 'power1.inOut',
            });
          }

          // Combined progress from scroll and GSAP drive
          const scrollDist = Math.max(0, (vh * 0.90) - wmRect.top);
          const scrollP = Math.min(1, scrollDist / 300);
          const fp = Math.max(footerAnimState.progress, scrollP);

          // Rotate 90° (facing left, headlights shining left)
          const rotation = 90;

          // Start at far right (vw - 10) to left (-BIKE_H - 80)
          const startX = vw - 10;
          const endX   = -BIKE_H - 80;
          const targetX = gsap.utils.interpolate(startX, endX, fp);

          const opacity = targetX < endX + 15 ? 0 : 1;
          return { x: targetX, y: targetY, rotation, opacity };
        } else {
          // Reset trigger if user scrolls back up
          footerAnimState.triggered = false;
          footerAnimState.progress = 0;
        }
      }

      // ─────────────────────────────────────────────────────────────
      // HERO ENTRANCE & RESTING ON BUTTON
      // Starts tucked behind navbar (y: -40px)
      // ─────────────────────────────────────────────────────────────
      const cta = getHeroCta();
      const heroScreenY = cta.docY - scrollY;
      const startY = -60; // Safely tucked behind top of navbar
      const startX = vw / 2; // Centered
      const entranceP = entranceState.progress;

      // When at the very top (scrollY < 20): interpolate navbar -> button slowly
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
      // - Moves in an authentic curved arc veering right (turning to -55°).
      // - Straightens out smoothly to 0° facing down into the stats lane.
      // - Slower curve travel over 300px of scroll (20 -> 320px).
      // - Exits EARLY at start of Why DropyHub (scrollY ≈ 540–700px).
      // ─────────────────────────────────────────────────────────────
      const stage1CurveEnd = 320;
      const stage1ExitStart = 540;
      const stage1ExitEnd   = 700;

      if (scrollY < stage1ExitEnd) {
        // Subphase 1a: Curved arc veering right with smooth steering rotation
        if (scrollY < stage1CurveEnd) {
          const t = Math.max(0, (scrollY - 20) / (stage1CurveEnd - 20));
          const easeX = gsap.parseEase('sine.inOut')(t);
          const easeY = gsap.parseEase('sine.inOut')(t);
          const targetX = gsap.utils.interpolate(cta.x, rightEdgeX, easeX);
          const targetY = gsap.utils.interpolate(Math.max(80, heroScreenY), defaultY, easeY);

          // Steering rotation: turns right (-55°) and then smoothly straightens out to 0°
          let rotation = 0;
          if (t < 0.50) {
            rotation = gsap.utils.interpolate(0, -55, t / 0.50);
          } else {
            rotation = gsap.utils.interpolate(-55, 0, (t - 0.50) / 0.50);
          }

          return { x: targetX, y: targetY, rotation, opacity: 1 };
        }

        // Subphase 1b: Travel down along the right side through Stats
        if (scrollY < stage1ExitStart) {
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 1c: EARLY EXIT right into Why DropyHub
        const exitT = Math.max(0, Math.min(1, (scrollY - stage1ExitStart) / (stage1ExitEnd - stage1ExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 2: INTERACTIVE ESTIMATOR
      // - Enters from left AFTER Why DropyHub (~1460px)
      // - Drives horizontally facing RIGHT (rotation: -90°) across top bar to 1800px
      // - Travels down through sliders AND through Monthly Estimated Net Earnings
      // - Exits right AFTER the monthly estimated net earnings card (~2760–3000px)
      // ─────────────────────────────────────────────────────────────
      const estTriggerStart = 1460; // After Why DropyHub section finishes!
      const estTravelAcrossEnd = 1800; // Decreased crossing end to 1800px
      const estExitStart = 2760; // Stays through monthly net earnings, exits after!
      const estExitEnd   = 3000;

      if (scrollY < estExitEnd) {
        if (scrollY < estTriggerStart) {
          // Offscreen during Why section
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < estTravelAcrossEnd) {
          // Subphase 2a: Driving from left to right, facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - estTriggerStart) / (estTravelAcrossEnd - estTriggerStart)));
          const eased = gsap.parseEase('sine.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          // Faces right (-90°), and banks gently into 0° facing down in the last 25%
          let rotation = -90;
          if (t > 0.75) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.75) / 0.25);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < estExitStart) {
          // Subphase 2b: Down right lane through vehicle choices, sliders, AND Monthly Net Earnings card
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 2c: Exit right AFTER monthly estimated net earnings section
        const exitT = Math.max(0, Math.min(1, (scrollY - estExitStart) / (estExitEnd - estExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 3: ABOUT DROPYHUB & HOW TO START
      // - Enters from left at START of About DropyHub section (~3000px)
      // - Drives from left to right facing RIGHT (rotation: -90°) to 3350px
      // - Cruises down continuously through About, Ecosystem, & Steps 01-05
      // - Exits right at the VERY END of How to Start section (~4960–5200px)
      // ─────────────────────────────────────────────────────────────
      const aboutTriggerStart = 3000; // Right at start of About DropyHub!
      const aboutTravelAcrossEnd = 3350; // Decreased crossing end to 3350px
      const aboutExitStart = 4960; // Goes to the very end of How to Start!
      const aboutExitEnd   = 5200;

      if (scrollY < aboutExitEnd) {
        if (scrollY < aboutTriggerStart) {
          // Offscreen between estimator and about
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < aboutTravelAcrossEnd) {
          // Subphase 3a: Driving from left to right facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - aboutTriggerStart) / (aboutTravelAcrossEnd - aboutTriggerStart)));
          const eased = gsap.parseEase('sine.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          let rotation = -90;
          if (t > 0.75) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.75) / 0.25);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < aboutExitStart) {
          // Subphase 3b: Cruises down through About & How to Start to the very end
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 3c: Exit right at the VERY END of How to Start section
        const exitT = Math.max(0, Math.min(1, (scrollY - aboutExitStart) / (aboutExitEnd - aboutExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 4: FAQ & READY TO START EARNING
      // - Enters at top of FAQ (~5620px)
      // - Drives from left to right facing RIGHT (-90°) to 5950px
      // - Goes down through FAQ questions AND through Ready to Start Earning section
      // - Exits at the very end of Ready to Start Earning CTA (~6500–6720px)
      // ─────────────────────────────────────────────────────────────
      const faqTriggerStart = 5620; // At start of FAQ
      const faqTravelAcrossEnd = 5950; // Decreased crossing end to 5950px
      const ctaExitStart = 6500; // Goes through Ready to Start Earning!
      const ctaExitEnd   = 6720;

      if (scrollY < ctaExitEnd) {
        if (scrollY < faqTriggerStart) {
          // Offscreen during Innovation & Partners
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < faqTravelAcrossEnd) {
          // Subphase 4a: Driving from left to right facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - faqTriggerStart) / (faqTravelAcrossEnd - faqTriggerStart)));
          const eased = gsap.parseEase('sine.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          let rotation = -90;
          if (t > 0.75) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.75) / 0.25);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < ctaExitStart) {
          // Subphase 4b: Down right lane through FAQ & through Ready to Start Earning
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 4c: Exit right at the end of Ready to Start Earning
        const exitT = Math.max(0, Math.min(1, (scrollY - ctaExitStart) / (ctaExitEnd - ctaExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // Default fallback: parked offscreen right throughout footer links
      return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
    }

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
      const isWrapJump = Math.abs(tgt.x - cur.x) > vw * 0.35;
      const isBothOffscreen = cur.opacity <= 0.05 && tgt.opacity <= 0.05;

      if (isWrapJump || isBothOffscreen) {
        cur.x = tgt.x;
        cur.y = tgt.y;
        cur.rotation = tgt.rotation;
        cur.opacity = tgt.opacity;
      } else {
        cur.x += (tgt.x - cur.x) * 0.10;
        cur.y += (tgt.y - cur.y) * 0.10;
        cur.rotation += (tgt.rotation - cur.rotation) * 0.10;
        cur.opacity += (tgt.opacity - cur.opacity) * 0.15;
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
