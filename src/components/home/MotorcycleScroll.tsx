'use client';

/**
 * MotorcycleScroll — Master Motorcycle Animation (Precision Video-Calibrated Engine)
 *
 * Section-by-Section Precision Architecture:
 * 1. Independent Section-Triggered Transitions:
 *    - Predefined resting anchor for each section calibrated directly from reference video VID-20261030-WA0001.mp4.
 *    - Entering a new section triggers an independent, snappy GSAP transition (~0.85s, power2.out).
 *    - Once settled, the bike remains firmly locked in document space relative to that section's element.
 * 2. 100% Uniform Proportional Scale (Zero Shrinking):
 *    - Exactly uniform scale across all 9 sections (no arbitrary 0.85x multipliers).
 * 3. Document-Anchored Viewport Projection:
 *    - Coordinates tracked in document space (docX, docY) and projected onto viewport:
 *      viewportY = animState.docY - window.scrollY - BIKE_H / 2
 *    - Natural 1:1 scrolling within section cards, preventing premature departure.
 * 4. Calibrated Section Anchors:
 *    - 01. Hero: Center 50vw, ~42vh, rot: 0°
 *    - 02. Why DropyHub: Central corridor between 4 cards, rot: 0°
 *    - 03. Estimator: Lower whitespace of results card below onboarding line, rot: -90° (facing right)
 *    - 04. About: Right column directly below intro paragraph, rot: -270° (facing left)
 *    - 05. How to Start: Corridor between steps list & photo card, rot: -360° (facing down)
 *    - 06. Innovation: Left of security checklist, level with SOS Support, rot: -450° (facing right)
 *    - 07. Testimonials: Left column beside quotation & left arrow, rot: -360° (facing down)
 *    - 08. FAQ: Left column centered under "Common Questions", rot: -360° (facing down)
 *    - 09. Footer: Over outlined "Dropyhub" wordmark, rot: -450° (facing right)
 */

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MotorcycleScroll.module.css';

const BIKE_W = 262.55;
const BIKE_H = 393.83;
const BASE_VIEWPORT_W = 1600;
const CALIBRATED_WIDTH_1600 = 228; // Exactly 228px at 1600px viewport

export interface StateAnchor {
  docX: number;
  docY: number;
  rotation: number;
}

const subscribeClient = () => () => {};

export const MotorcycleScroll: React.FC = () => {
  const mounted = useSyncExternalStore(subscribeClient, () => true, () => false);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const entryRef    = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    // Desktop only (>= 1200px)
    if (window.innerWidth < 1200) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entry    = entryRef.current;
    const assembly = assemblyRef.current;
    const glow     = glowRef.current;
    if (!entry || !assembly || !glow) return;

    let entranceTween: gsap.core.Tween | null = null;
    let transitionTween: gsap.core.Tween | null = null;
    let entrancePending = true;

    function getBaseScale(): number {
      const vw = window.innerWidth;
      return (vw / BASE_VIEWPORT_W) * (CALIBRATED_WIDTH_1600 / BIKE_W);
    }

    // Dynamic document anchors resolved from live DOM elements
    function getAnchors(): Record<string, StateAnchor> {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const centerX = vw / 2;

      // 01. Hero
      const heroAnchor: StateAnchor = {
        docX: centerX,
        docY: vh * 0.42,
        rotation: 0,
      };

      // 02. Why DropyHub — center corridor between the 4 cards
      const whyEl = document.querySelector('[class*="sectionWrapper"]');
      const whyCards = whyEl ? whyEl.querySelectorAll('article, [class*="Card"], [class*="card"]') : null;
      let whyDocY = 1296;
      if (whyCards && whyCards.length >= 2) {
        const topR = whyCards[0].getBoundingClientRect();
        const btmR = whyCards[whyCards.length - 1].getBoundingClientRect();
        whyDocY = (topR.top + btmR.bottom) / 2 + scrollY;
      } else if (whyEl) {
        const r = whyEl.getBoundingClientRect();
        whyDocY = r.top + scrollY + r.height * 0.60;
      }
      const whyAnchor: StateAnchor = {
        docX: centerX,
        docY: whyDocY,
        rotation: 0,
      };

      // 03. Estimator — lower area of right results card
      const panel = document.querySelector('[class*="rightColumn"]');
      const supp = document.querySelector('[class*="supportingText"]');
      const pR = panel ? panel.getBoundingClientRect() : null;
      const sR = supp ? supp.getBoundingClientRect() : null;

      const panelLeft = pR ? pR.left : (centerX + 125);
      const panelWidth = pR ? pR.width : 603;
      const suppBottomDoc = sR
        ? sR.bottom + scrollY
        : (pR ? pR.bottom + scrollY - 145 : 2231);
      // Precision video calibration: sits centered inside the lower whitespace below the onboarding guarantee
      const estimatorDocY = suppBottomDoc + 48.5;

      const estimatorAnchor: StateAnchor = {
        docX: panelLeft + panelWidth * 0.52,
        docY: estimatorDocY,
        rotation: -90, // Facing right
      };

      // 04. About DropyHub — right column directly below intro paragraph, angled up-left towards description
      const desc = document.querySelector('[class*="topIntroRight"], [class*="aboutDescription"]');
      const dR = desc ? desc.getBoundingClientRect() : null;
      const aboutDocX = dR ? (dR.left + dR.width / 2) : (centerX + 280);
      const aboutDocY = dR ? (dR.bottom + scrollY + 115) : 2713;
      const aboutAnchor: StateAnchor = {
        docX: aboutDocX,
        docY: aboutDocY,
        rotation: -225, // Angled up-left matching reference video
      };

      // 05. How to Start — corridor between steps list & photo panel
      const steps = document.querySelector('[class*="stepsList"]');
      const howPanel = document.querySelector('[class*="rightPanel"]');
      let howDocX = centerX - 172;
      let howDocY = 3720;
      if (steps && howPanel) {
        const stepR = steps.getBoundingClientRect();
        const pR2 = howPanel.getBoundingClientRect();
        howDocX = (stepR.right + pR2.left) / 2;
        howDocY = stepR.top + scrollY + stepR.height * 0.45;
      }
      const howToStartAnchor: StateAnchor = {
        docX: howDocX,
        docY: howDocY,
        rotation: -360, // Facing down
      };

      // 06. Innovation — left of security checklist, level with SOS Support
      const checklist = document.querySelector('[class*="securityChecklist"], [class*="checklist"]');
      const cR = checklist ? checklist.getBoundingClientRect() : null;
      const innovDocX = cR ? (cR.left - 200) : (centerX - 240);
      const innovDocY = cR ? (cR.top + scrollY + cR.height / 2) : 4304;
      const innovationAnchor: StateAnchor = {
        docX: innovDocX,
        docY: innovDocY,
        rotation: -450, // Facing right
      };

      // 07. Testimonials — left column beside quotation & left arrow
      const navBtn = document.querySelector('[class*="navArrowBtn"], [class*="leftArrow"]');
      const comp = document.querySelector('[class*="testimonialsComponent"]');
      const nR = navBtn ? navBtn.getBoundingClientRect() : null;
      const compR = comp ? comp.getBoundingClientRect() : null;
      const testDocX = nR ? (nR.left - 130) : (compR ? compR.left + 115 : centerX - 510);
      const baseScale = getBaseScale();
      // Position delivery box cleanly 25px below the Testimonials section label
      const testDocY = compR
        ? compR.top + scrollY + 45 + (BIKE_H * baseScale) / 2
        : (nR ? nR.top + scrollY + 90 : 4940);
      const testimonialsAnchor: StateAnchor = {
        docX: testDocX,
        docY: testDocY,
        rotation: -360, // Facing down
      };

      // 08. FAQ — left column centered under "Common Questions"
      const title = document.querySelector('[class*="faqTitle"], [class*="faqHeading"]');
      const tR = title ? title.getBoundingClientRect() : null;
      const faqDocX = tR ? (tR.left + tR.width / 2) : (centerX - 450);
      const faqDocY = tR ? (tR.bottom + scrollY + 25 + (BIKE_H * baseScale) / 2) : 5360;
      const faqAnchor: StateAnchor = {
        docX: faqDocX,
        docY: faqDocY,
        rotation: -360, // Facing down
      };

      // 09. Footer — over "Dropyhub" outlined wordmark
      const wordmark = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');
      const wR = wordmark ? wordmark.getBoundingClientRect() : null;
      const footerDocX = wR ? (wR.left + wR.width * 0.38) : centerX;
      const footerDocY = wR ? (wR.top + scrollY + wR.height * 0.52) : 6415;
      const footerAnchor: StateAnchor = {
        docX: footerDocX,
        docY: footerDocY,
        rotation: -450, // Facing right
      };

      return {
        hero: heroAnchor,
        why: whyAnchor,
        estimator: estimatorAnchor,
        about: aboutAnchor,
        howToStart: howToStartAnchor,
        innovation: innovationAnchor,
        testimonials: testimonialsAnchor,
        faq: faqAnchor,
        footer: footerAnchor,
      };
    }

    // Resolves current active section state based on DOM scroll position
    function getActiveSection(scrollY: number): string {
      const whyEl = document.querySelector('[class*="sectionWrapper"]');
      const estEl = document.querySelector('[class*="estimatorSection"]');
      const stepsEl = document.querySelector('[class*="stepsList"]');
      const innovEl = document.querySelector('[class*="securityChecklist"], [class*="checklist"]');
      const testEl = document.querySelector('[class*="testimonialsComponent"]');
      const faqEl = document.querySelector('[class*="faqTitle"], [class*="faqHeading"]');

      const whyTop = whyEl ? (whyEl.getBoundingClientRect().top + scrollY) : 759;
      const estTop = estEl ? (estEl.getBoundingClientRect().top + scrollY) : 1631;
      const estBottom = estEl ? (estEl.getBoundingClientRect().bottom + scrollY) : 2456;
      const stepsTop = stepsEl ? (stepsEl.getBoundingClientRect().top + scrollY) : 3567;
      const innovTop = innovEl ? (innovEl.getBoundingClientRect().top + scrollY) : 4238;
      const testTop = testEl ? (testEl.getBoundingClientRect().top + scrollY) : 4687;
      const faqTop = faqEl ? (faqEl.getBoundingClientRect().top + scrollY) : 5143;

      // Section trigger thresholds:
      // 01. Hero: top of page (< 220px)
      if (scrollY < whyTop * 0.3) return 'hero';

      // 02. Why DropyHub: between Hero and Estimator
      if (scrollY < (whyTop + estTop) / 2) return 'why';

      // 03. Estimator: remains active while the results panel is on screen!
      // Must not exit until the bottom results card has scrolled mostly out of view.
      if (scrollY < estBottom - 180) return 'estimator';

      // 04. About: between Estimator and How to Start
      if (scrollY < (estBottom + stepsTop) / 2 - 100) return 'about';

      // 05. How to Start: between About and Innovation
      if (scrollY < (stepsTop + innovTop) / 2 - 50) return 'howToStart';

      // 06. Innovation: between How to Start and Testimonials
      if (scrollY < (innovTop + testTop) / 2 - 50) return 'innovation';

      // 07. Testimonials: between Innovation and FAQ
      if (scrollY < (testTop + faqTop) / 2 - 50) return 'testimonials';

      // 08. FAQ: between Testimonials and Footer
      if (scrollY < faqTop + 450) return 'faq';

      // 09. Footer
      return 'footer';
    }

    // Current state machine tracking
    let currentSection = 'hero';

    // Current animated physics state (in document space)
    const animState = {
      docX: window.innerWidth / 2,
      docY: window.innerHeight * 0.42,
      rotation: 0,
    };

    /**
     * Dedicated GSAP transition to target section state
     * Provides snappy, elegant movement (~0.85s) matching the reference video.
     */
    function transitionTo(targetSectionName: string) {
      const anchors = getAnchors();
      const targetAnchor = anchors[targetSectionName];
      if (!targetAnchor) return;

      if (transitionTween) {
        transitionTween.kill();
        transitionTween = null;
      }

      // Snappy, video-calibrated transition duration (0.95s) with crisp power2.out deceleration
      transitionTween = gsap.to(animState, {
        docX: targetAnchor.docX,
        docY: targetAnchor.docY,
        rotation: targetAnchor.rotation,
        duration: 0.95,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    /**
     * Render Frame
     * Runs on every RAF tick (via gsap.ticker) at display refresh rate.
     * Projects document coordinates (animState.docX, animState.docY) into viewport coordinates.
     * While resting in any section, the motorcycle naturally moves 1:1 with the page scroll.
     */
    function renderFrame() {
      const baseScale = getBaseScale();

      // Project document space coordinates to current viewport coordinates
      const currentViewportX = animState.docX - BIKE_W / 2;
      const currentViewportY = animState.docY - window.scrollY - BIKE_H / 2;

      gsap.set(assembly, {
        x: currentViewportX,
        y: currentViewportY,
        rotation: animState.rotation,
        scale: baseScale, // 100% UNIFORM PROPORTIONAL SCALE ACROSS ALL SECTIONS
        transformOrigin: '50% 50%',
      });
    }

    function onScroll() {
      if (entrancePending) return;

      const active = getActiveSection(window.scrollY);
      if (active !== currentSection) {
        currentSection = active;
        transitionTo(active);
      }
    }

    function onResize() {
      if (window.innerWidth < 1200) return;
      const anchors = getAnchors();
      const target = anchors[currentSection];
      if (target && !transitionTween?.isActive()) {
        animState.docX = target.docX;
        animState.docY = target.docY;
      }
    }

    function init() {
      const currentScroll = window.scrollY;

      // Deep-scroll refresh (> 100px): skip entrance animation
      if (currentScroll > 100) {
        entrancePending = false;
        gsap.set(entry, { y: 0 });

        currentSection = getActiveSection(currentScroll);
        const anchors = getAnchors();
        const initialAnchor = anchors[currentSection] || anchors.hero;

        animState.docX = initialAnchor.docX;
        animState.docY = initialAnchor.docY;
        animState.rotation = initialAnchor.rotation;

        gsap.set(glow, { opacity: 1 });
        renderFrame();
        gsap.ticker.add(renderFrame);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        return;
      }

      // Fresh page load: set initial placement off-screen above
      const anchors = getAnchors();
      const heroTarget = anchors.hero;
      animState.docX = heroTarget.docX;
      animState.docY = heroTarget.docY;
      animState.rotation = heroTarget.rotation;

      gsap.set(entry, { y: -800 });
      gsap.set(glow, { opacity: 1 });
      renderFrame();

      gsap.ticker.add(renderFrame);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      // Handle user scroll interrupt during entrance
      const onScrollInterrupt = () => {
        if (window.scrollY > 20 && entrancePending) {
          window.removeEventListener('scroll', onScrollInterrupt);
          if (entranceTween) {
            entranceTween.kill();
            entranceTween = null;
          }
          entrancePending = false;
          gsap.set(entry, { y: 0 });
          onScroll();
        }
      };
      window.addEventListener('scroll', onScrollInterrupt, { passive: true });

      // Hero Entrance: Wait exactly 2.0s, then 2.0s smooth downward entrance
      entranceTween = gsap.to(entry, {
        y: 0,
        duration: 2.0,
        delay: 2.0,
        ease: 'power2.out',
        onComplete: () => {
          entrancePending = false;
          window.removeEventListener('scroll', onScrollInterrupt);
        },
      });
    }

    init();

    return () => {
      if (entranceTween) entranceTween.kill();
      if (transitionTween) transitionTween.kill();
      gsap.ticker.remove(renderFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  // Render via React Portal directly into document.body to ensure
  // top-level stacking context (z-index: 100) above all sections and divider bands.
  return createPortal(
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      {/* Time-based entrance layer (vertical only) */}
      <div ref={entryRef} className={styles.entryLayer}>
        {/* Main persistent motorcycle assembly */}
        <div ref={assemblyRef} className={styles.assembly}>
          {/* Layer 1: Headlight yellow glow (Headlight.png, rotates with bike) */}
          <div ref={glowRef} className={styles.glowLayer}>
            <Image
              src="/assets/Home/Headlight.png"
              alt=""
              width={190}
              height={162}
              className={styles.glowAsset}
              priority
              draggable={false}
            />
          </div>

          {/* Layer 2: Primary Motorcycle & Rider (Bike.png, clean and sharp) */}
          <div className={styles.riderLayer}>
            <Image
              src="/assets/Home/Bike.png"
              alt=""
              width={263}
              height={394}
              className={styles.riderAsset}
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MotorcycleScroll;
