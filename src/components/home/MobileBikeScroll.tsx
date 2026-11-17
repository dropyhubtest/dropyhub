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
 * 3. Early Exits & Early Entrances:
 *    - Exits right early at the start of Why section, at end of Estimator, and at end of How to Start.
 *    - Enters early at the very top horizontal bar of Estimator, About, and FAQ sections.
 *
 * 4. Footer Wordmark Crossing:
 *    - Remains completely hidden during Company / Partners / Contact footer links.
 *    - Only appears when the outlined "Dropyhub" wordmark itself comes into view.
 *    - Drives across the wordmark from right to left facing left (rotation: 90°).
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
      const defaultY   = vh * 0.40;

      const bounds = getSectionBounds();

      // ─────────────────────────────────────────────────────────────
      // STAGE 5: FOOTER (Right-to-Left Wordmark Crossing)
      // Only active when the outlined "Dropyhub" wordmark itself is visible!
      // During Company / Partners / Contact links, bike is completely hidden.
      // ─────────────────────────────────────────────────────────────
      if (bounds.footWordmark) {
        const wmRect = bounds.footWordmark.getBoundingClientRect();
        // Trigger ONLY when wordmark has entered the viewport (top < vh * 0.92)
        if (wmRect.top < vh * 0.92) {
          if (!footerAnimState.triggered) {
            footerAnimState.triggered = true;
            gsap.to(footerAnimState, {
              progress: 1,
              duration: 1.8,
              ease: 'power1.inOut',
            });
          }

          // Combined progress from scroll and GSAP drive
          const scrollDist = Math.max(0, (vh * 0.92) - wmRect.top);
          const scrollP = Math.min(1, scrollDist / 180);
          const fp = Math.max(footerAnimState.progress, scrollP);

          // Rotate 90° (facing left, headlights shining left)
          const rotation = 90;

          // Center vertically on the wordmark
          const targetY = Math.min(vh - 35, Math.max(80, wmRect.top + wmRect.height * 0.48));

          // Cross from right (vw - 20) to left (-BIKE_H - 80)
          const startX = vw - 20;
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
      const startY = -40; // Tucked behind navbar
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
      // - Moves in an authentic curved arc veering right (turning to -65°).
      // - Straightens out to 0° facing down into the stats lane.
      // - Exits EARLY at start of Why DropyHub (by scrollY ≈ 600px).
      // ─────────────────────────────────────────────────────────────
      const stage1CurveEnd = 240;
      const stage1ExitStart = 480;
      const stage1ExitEnd   = 620;

      if (scrollY < stage1ExitEnd) {
        // Subphase 1a: Curved arc veering right with steering rotation
        if (scrollY < stage1CurveEnd) {
          const t = Math.max(0, (scrollY - 20) / (stage1CurveEnd - 20));
          const easeX = gsap.parseEase('power2.inOut')(t);
          const easeY = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(cta.x, rightEdgeX, easeX);
          const targetY = gsap.utils.interpolate(Math.max(80, heroScreenY), defaultY, easeY);

          // Steering rotation: turns right (-65°) and then straightens out to 0°
          let rotation = 0;
          if (t < 0.55) {
            rotation = gsap.utils.interpolate(0, -65, t / 0.55);
          } else {
            rotation = gsap.utils.interpolate(-65, 0, (t - 0.55) / 0.45);
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
      // - Enters EARLY at the very top horizontal bar of Estimator.
      // - Drives horizontally from left to right facing RIGHT (rotation: -90°).
      // - Banks into 0° facing down into the right lane.
      // - Exits EARLY at end of estimator results card.
      // ─────────────────────────────────────────────────────────────
      const estTopDoc = bounds.estimator ? bounds.estimator.top : 1800;
      const estTriggerStart = estTopDoc - vh * 0.75; // ~1170px (EARLY entrance!)
      const estTravelAcrossEnd = estTriggerStart + 220; // 220px crossing span
      const estExitStart = 2300; // Early exit as results card is reached
      const estExitEnd   = 2460;

      if (scrollY < estExitEnd) {
        if (scrollY < estTriggerStart) {
          // Offscreen during Why section
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < estTravelAcrossEnd) {
          // Subphase 2a: Driving from left to right, facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - estTriggerStart) / 220));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          // Faces right (-90°), and banks into 0° facing down at the end
          let rotation = -90;
          if (t > 0.72) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.72) / 0.28);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < estExitStart) {
          // Subphase 2b: Down right lane through vehicle choices & sliders
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 2c: Early Exit right
        const exitT = Math.max(0, Math.min(1, (scrollY - estExitStart) / (estExitEnd - estExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 3: ABOUT DROPYHUB & HOW TO START
      // - Enters EARLY at the very top of About.
      // - Drives from left to right facing RIGHT (rotation: -90°).
      // - Banks into 0° facing down into the right lane.
      // - Cruises down continuously through About, Ecosystem, & Steps 01-05.
      // - Exits EARLY right when Step 05 finishes.
      // ─────────────────────────────────────────────────────────────
      const aboutTopDoc = bounds.about ? bounds.about.top : 3036;
      const aboutTriggerStart = aboutTopDoc - vh * 0.75; // ~2400px (EARLY entrance!)
      const aboutTravelAcrossEnd = aboutTriggerStart + 220;
      const aboutExitStart = 4550; // Early exit as step 05 finishes
      const aboutExitEnd   = 4720;

      if (scrollY < aboutExitEnd) {
        if (scrollY < aboutTriggerStart) {
          // Offscreen between estimator and about
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < aboutTravelAcrossEnd) {
          // Subphase 3a: Driving from left to right facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - aboutTriggerStart) / 220));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          let rotation = -90;
          if (t > 0.72) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.72) / 0.28);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < aboutExitStart) {
          // Subphase 3b: Cruises down through About & How to Start
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 3c: Early Exit right
        const exitT = Math.max(0, Math.min(1, (scrollY - aboutExitStart) / (aboutExitEnd - aboutExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // ─────────────────────────────────────────────────────────────
      // STAGE 4: FAQ & READY TO START EARNING
      // - Enters EARLY at the top of FAQ.
      // - Drives from left to right facing RIGHT (rotation: -90°).
      // - Travels down right lane through FAQ & Ready to Start Earning CTA.
      // - Exits EARLY at end of Ready to Start Earning.
      // ─────────────────────────────────────────────────────────────
      const faqTopDoc = bounds.faq ? bounds.faq.top : 6011;
      const faqTriggerStart = faqTopDoc - vh * 0.75; // ~5380px (EARLY entrance!)
      const faqTravelAcrossEnd = faqTriggerStart + 220;
      const faqExitStart = 6180; // Early exit after Ready to Start Earning CTA
      const faqExitEnd   = 6320;

      if (scrollY < faqExitEnd) {
        if (scrollY < faqTriggerStart) {
          // Offscreen during Innovation & Partners
          return { x: rightOffX, y: defaultY, rotation: 0, opacity: 0 };
        }

        if (scrollY < faqTravelAcrossEnd) {
          // Subphase 4a: Driving from left to right facing RIGHT (-90°)
          const t = Math.max(0, Math.min(1, (scrollY - faqTriggerStart) / 220));
          const eased = gsap.parseEase('power1.inOut')(t);
          const targetX = gsap.utils.interpolate(leftOffX, rightEdgeX, eased);

          let rotation = -90;
          if (t > 0.72) {
            rotation = gsap.utils.interpolate(-90, 0, (t - 0.72) / 0.28);
          }

          const opacity = t < 0.04 ? 0 : Math.min(1, (t - 0.04) / 0.12);
          return { x: targetX, y: defaultY, rotation, opacity };
        }

        if (scrollY < faqExitStart) {
          // Subphase 4b: Down right lane through FAQ & Ready to Start Earning CTA
          return { x: rightEdgeX, y: defaultY, rotation: 0, opacity: 1 };
        }

        // Subphase 4c: Early Exit right
        const exitT = Math.max(0, Math.min(1, (scrollY - faqExitStart) / (faqExitEnd - faqExitStart)));
        const eased = gsap.parseEase('power1.in')(exitT);
        const targetX = gsap.utils.interpolate(rightEdgeX, rightOffX, eased);
        const rotation = gsap.utils.interpolate(0, -70, exitT);
        const opacity = Math.max(0, 1 - exitT);
        return { x: targetX, y: defaultY, rotation, opacity };
      }

      // Default fallback: parked offscreen right until wordmark is reached
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
      const isWrapJump = Math.abs(tgt.x - cur.x) > vw * 0.35;
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
