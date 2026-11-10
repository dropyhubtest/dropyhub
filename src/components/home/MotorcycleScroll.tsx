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
const CALIBRATED_WIDTH_1600 = 280; // Increased bike size across every section (280px at 1600px viewport)

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

      // 01. Hero — centered horizontally, upper-middle display text
      const heroAnchor: StateAnchor = {
        docX: centerX,
        docY: Math.min(vh * 0.44, 375),
        rotation: 0,
      };

      // 02. Why DropyHub — center corridor between the 4 feature cards
      const whyContainer = document.querySelector('[class*="whySectionContainer"]');
      const leftCol = document.querySelector('[class*="cardsColumnLeft"]');
      const rightCol = document.querySelector('[class*="cardsColumnRight"]');
      let whyDocY = 1298;
      let whyDocX = centerX;
      if (leftCol && rightCol) {
        const lR = leftCol.getBoundingClientRect();
        const rR = rightCol.getBoundingClientRect();
        whyDocX = (lR.right + rR.left) / 2;
        const leftCards = leftCol.querySelectorAll('[class*="card"]');
        if (leftCards.length >= 2) {
          const topR = leftCards[0].getBoundingClientRect();
          const btmR = leftCards[leftCards.length - 1].getBoundingClientRect();
          whyDocY = (topR.top + btmR.bottom) / 2 + scrollY;
        }
      } else if (whyContainer) {
        const r = whyContainer.getBoundingClientRect();
        whyDocY = r.top + scrollY + r.height * 0.52;
      }
      const whyAnchor: StateAnchor = {
        docX: whyDocX,
        docY: whyDocY,
        rotation: 0,
      };

      // 03. Estimator — inside the right results card
      const panel = document.querySelector('[class*="rightColumn"]');
      let estDocX = centerX + 300;
      let estDocY = 2120;
      if (panel) {
        const pR = panel.getBoundingClientRect();
        estDocX = pR.left + pR.width * 0.50;
        estDocY = pR.top + scrollY + pR.height * 0.58;
      }
      const estimatorAnchor: StateAnchor = {
        docX: estDocX,
        docY: estDocY,
        rotation: -90, // Facing horizontal right
      };

      // 04. About DropyHub — right side directly below intro paragraph
      const desc = document.querySelector('[class*="topIntroRight"], [class*="aboutDescription"]');
      let aboutDocX = centerX + 260;
      let aboutDocY = 2760;
      if (desc) {
        const dR = desc.getBoundingClientRect();
        aboutDocX = dR.left + dR.width / 2;
        aboutDocY = dR.bottom + scrollY + 115;
      }
      const aboutAnchor: StateAnchor = {
        docX: aboutDocX,
        docY: aboutDocY,
        rotation: -270, // Facing horizontal left
      };

      // 05. How to Start — central corridor between steps list & photo panel
      const steps = document.querySelector('[class*="stepsList"]');
      const howPanel = document.querySelector('[class*="rightPanel"]');
      let howDocX = centerX - 120;
      let howDocY = 3650;
      if (steps && howPanel) {
        const stepR = steps.getBoundingClientRect();
        const pR2 = howPanel.getBoundingClientRect();
        howDocX = (stepR.right + pR2.left) / 2;
        howDocY = stepR.top + scrollY + stepR.height * 0.45;
      }
      const howToStartAnchor: StateAnchor = {
        docX: howDocX,
        docY: howDocY,
        rotation: -360, // Facing vertically down
      };

      // 06. Innovation — left of security checklist
      const checklist = document.querySelector('[class*="securityChecklist"], [class*="checklist"]');
      let innovDocX = 420;
      let innovDocY = 4320;
      if (checklist) {
        const cR = checklist.getBoundingClientRect();
        innovDocX = cR.left - 290;
        innovDocY = cR.top + scrollY + cR.height * 0.48;
      }
      const innovationAnchor: StateAnchor = {
        docX: innovDocX,
        docY: innovDocY,
        rotation: -450, // Facing horizontal right
      };

      // 07. Testimonials — beside quotation & left carousel navigation
      const navBtn = document.querySelector('[class*="navArrowBtn"], [class*="leftArrow"]');
      const comp = document.querySelector('[class*="testimonialsComponent"]');
      let testDocX = 230;
      let testDocY = 4850;
      if (comp) {
        const compR = comp.getBoundingClientRect();
        testDocX = navBtn ? (navBtn.getBoundingClientRect().left - 60) : (compR.left + 185);
        testDocY = compR.top + scrollY + 160;
      }
      const testimonialsAnchor: StateAnchor = {
        docX: testDocX,
        docY: testDocY,
        rotation: -360, // Facing vertically down
      };

      // 08. FAQ — left column centered under "Common Questions"
      const title = document.querySelector('[class*="faqHeading"], [class*="faqTitle"]');
      let faqDocX = 310;
      let faqDocY = 5420;
      if (title) {
        const tR = title.getBoundingClientRect();
        faqDocX = tR.left + tR.width / 2;
        faqDocY = tR.bottom + scrollY + 160;
      }
      const faqAnchor: StateAnchor = {
        docX: faqDocX,
        docY: faqDocY,
        rotation: -360, // Facing vertically down
      };

      // 09. Footer — over outlined "Dropyhub" wordmark
      const wordmark = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');
      let footerDocX = centerX - 120;
      let footerDocY = 6380;
      if (wordmark) {
        const wR = wordmark.getBoundingClientRect();
        footerDocX = wR.left + wR.width * 0.28;
        footerDocY = wR.top + scrollY + wR.height * 0.50;
      }
      const footerAnchor: StateAnchor = {
        docX: footerDocX,
        docY: footerDocY,
        rotation: -450, // Facing horizontal right
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

    // Resolves current active section based on actual section viewport presence
    // When a section commands ~55-65% of the viewport, the bike transitions smoothly into it
    function getActiveSection(): string {
      const vh = window.innerHeight;

      const footEl = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');
      const faqEl = document.querySelector('[class*="faqHeading"], [class*="faqTitle"], [class*="faqDividerBand"]');
      const testEl = document.querySelector('[class*="testimonialsComponent"]');
      const innovEl = document.querySelector('[class*="innovationEyebrow"], [class*="securityChecklist"]');
      const howStartEl = document.querySelector('[class*="howToStartContainer"], [class*="stepsList"]');
      const aboutEl = document.querySelector('[class*="aboutSection"]');
      const estEl = document.querySelector('[class*="estimatorSection"]');
      const whyEl = document.querySelector('[class*="whySectionContainer"], [class*="sectionWrapper"]');

      // Evaluated bottom-to-top so the latest entering section claims the bike
      if (footEl && footEl.getBoundingClientRect().top <= vh * 0.72) return 'footer';
      if (faqEl && faqEl.getBoundingClientRect().top <= vh * 0.58) return 'faq';
      if (testEl && testEl.getBoundingClientRect().top <= vh * 0.58) return 'testimonials';
      // 5% faster triggers on Innovation & How to Start as requested
      if (innovEl && innovEl.getBoundingClientRect().top <= vh * 0.68) return 'innovation';
      if (howStartEl && howStartEl.getBoundingClientRect().top <= vh * 0.68) return 'howToStart';
      if (aboutEl && aboutEl.getBoundingClientRect().top <= vh * 0.55) return 'about';
      if (estEl && estEl.getBoundingClientRect().top <= vh * 0.58) return 'estimator';
      if (whyEl && whyEl.getBoundingClientRect().top <= vh * 0.60) return 'why';

      return 'hero';
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

      // Snappy, video-calibrated transition duration (0.90s, 5% faster) with crisp power2.out deceleration
      transitionTween = gsap.to(animState, {
        docX: targetAnchor.docX,
        docY: targetAnchor.docY,
        rotation: targetAnchor.rotation,
        duration: 0.90,
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

      const active = getActiveSection();
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

        currentSection = getActiveSection();
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

      gsap.set(entry, { y: -700 });
      gsap.set(glow, { opacity: 1 });
      renderFrame();

      gsap.ticker.add(renderFrame);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      // Handle user scroll during entrance: allow natural entrance without snapping unless scrolled into next section
      const onScrollInterrupt = () => {
        if (window.scrollY > 80 && entrancePending) {
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

      // Hero Entrance: Wait 2.0s, then 1.5s smooth downward entrance arriving centered in Hero
      entranceTween = gsap.to(entry, {
        y: 0,
        duration: 1.5,
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
