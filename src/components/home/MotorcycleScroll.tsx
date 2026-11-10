'use client';

/**
 * MotorcycleScroll — Master Motorcycle Animation (Precision Video-Calibrated Engine)
 *
 * Section-by-Section Precision Architecture:
 * 1. Dedicated Hero Entrance & Resting State:
 *    - On page load, motorcycle smoothly glides down from above (1.2s, power2.out)
 *    - Stops firmly in Hero center (docX: 50vw, docY ≈ 380px, rot: 0°).
 *    - While at the top of the page, the bike remains firmly parked and resting in Hero.
 * 2. Rock-Solid Continuous Section-by-Section Triggers:
 *    - Every section has a defined, contiguous document-scroll window.
 *    - Moving between sections triggers a crisp, snappy GSAP transition (0.75s, power2.out).
 *    - Within each section, motorcycle moves 1:1 with document scroll, resting beside that section's content.
 * 3. Video-Calibrated Section Anchors:
 *    - 01. Hero: Center 50vw, upper-middle display area (~380px), rot: 0° (facing down)
 *    - 02. Why DropyHub: Central corridor between 4 cards, rot: 0° (facing down)
 *    - 03. Estimator: Lower whitespace of results card below onboarding line, rot: -90° (facing right)
 *    - 04. About: Right column directly below intro paragraph, rot: -270° (facing left)
 *    - 05. How to Start: Corridor between steps list & photo card, rot: -360° (facing down)
 *    - 06. Innovation: Left of security checklist, rot: -450° (facing right)
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
const CALIBRATED_WIDTH_1600 = 280; // 280px bike width at 1600px viewport

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

      // 01. Hero — centered horizontally, upper-middle display area
      const heroAnchor: StateAnchor = {
        docX: centerX,
        docY: Math.min(vh * 0.46, 380),
        rotation: 0,
      };

      // 02. Why DropyHub — center corridor between the 4 feature cards
      const whyContainer = document.querySelector('[class*="whySectionContainer"]');
      const leftCol = document.querySelector('[class*="cardsColumnLeft"]');
      const rightCol = document.querySelector('[class*="cardsColumnRight"]');
      let whyDocY = 1315;
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

      // 03. Estimator — resting in the lower whitespace of the results card below the 48-hour onboarding line
      const panel = document.querySelector('[class*="rightColumn"]');
      const note = document.querySelector('[class*="supportingText"]');
      let estDocX = centerX + 260;
      let estDocY = 2370;
      if (panel) {
        const pR = panel.getBoundingClientRect();
        estDocX = pR.left + pR.width * 0.52;
        if (note) {
          const nR = note.getBoundingClientRect();
          estDocY = nR.bottom + scrollY + 115;
        } else {
          estDocY = pR.top + scrollY + pR.height * 0.88;
        }
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
      let howDocY = 3680;
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
      let testDocX = 135;
      let testDocY = 4880;
      if (comp) {
        const compR = comp.getBoundingClientRect();
        testDocX = navBtn ? (navBtn.getBoundingClientRect().left - 105) : (compR.left + 28);
        testDocY = compR.top + scrollY + 180;
      }
      const testimonialsAnchor: StateAnchor = {
        docX: testDocX,
        docY: testDocY,
        rotation: -360, // Facing vertically down
      };

      // 08. FAQ — left column centered under "Common Questions"
      const title = document.querySelector('[class*="faqHeading"], [class*="faqTitle"]');
      let faqDocX = 310;
      let faqDocY = 5400;
      if (title) {
        const tR = title.getBoundingClientRect();
        faqDocX = tR.left + tR.width / 2;
        faqDocY = tR.bottom + scrollY + 180;
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

    // Resolves current active section state based on DOM scroll position
    function getActiveSection(scrollY: number): string {
      const vh = window.innerHeight;

      const whyEl = document.querySelector('[class*="whySectionContainer"], [class*="sectionWrapper"]');
      const estEl = document.querySelector('[class*="estimatorSection"]');
      const aboutEl = document.querySelector('[class*="aboutSection"]');
      const howStartEl = document.querySelector('[class*="howToStartContainer"], [class*="stepsList"]');
      const innovEl = document.querySelector('[class*="innovationEyebrow"], [class*="securityChecklist"]');
      const testEl = document.querySelector('[class*="testimonialsComponent"]');
      const faqEl = document.querySelector('[class*="faqHeading"], [class*="faqTitle"]');
      const footEl = document.querySelector('[class*="outlinedWordmark"], [class*="footerWordmark"]');

      const whyTop = whyEl ? (whyEl.getBoundingClientRect().top + scrollY) : 978;
      const estTop = estEl ? (estEl.getBoundingClientRect().top + scrollY) : 1672;
      const aboutTop = aboutEl ? (aboutEl.getBoundingClientRect().top + scrollY) : 2497;
      const howTop = howStartEl ? (howStartEl.getBoundingClientRect().top + scrollY) : 3446;
      const innovTop = innovEl ? (innovEl.getBoundingClientRect().top + scrollY) : 4137;
      const testTop = testEl ? (testEl.getBoundingClientRect().top + scrollY) : 4728;
      const faqTop = faqEl ? (faqEl.getBoundingClientRect().top + scrollY) : 5184;
      const footTop = footEl ? (footEl.getBoundingClientRect().top + scrollY) : 6000;

      // 01. Hero: active from top of page until user scrolls down towards Why section
      if (scrollY < whyTop - vh * 0.40) return 'hero';

      // 02. Why DropyHub: active while viewing Why feature cards
      if (scrollY < estTop - vh * 0.40) return 'why';

      // 03. Estimator: active while viewing earnings estimator
      if (scrollY < aboutTop - vh * 0.40) return 'estimator';

      // 04. About: active while viewing About intro & 6 value cards
      if (scrollY < howTop - vh * 0.40) return 'about';

      // 05. How to Start: active while viewing onboarding steps
      if (scrollY < innovTop - vh * 0.40) return 'howToStart';

      // 06. Innovation: active while viewing security checklist
      if (scrollY < testTop - vh * 0.40) return 'innovation';

      // 07. Testimonials: active while viewing testimonials carousel
      if (scrollY < faqTop - vh * 0.40) return 'testimonials';

      // 08. FAQ: active while viewing FAQ accordion questions
      if (scrollY < footTop - vh * 0.40) return 'faq';

      // 09. Footer: active at page bottom
      return 'footer';
    }

    // Current state machine tracking
    let currentSection = 'hero';

    // Current animated physics state (in document space)
    const animState = {
      docX: window.innerWidth / 2,
      docY: window.innerHeight * 0.44,
      rotation: 0,
    };

    /**
     * Dedicated GSAP transition to target section state
     * Snappy, polished movement (0.75s, power2.out).
     */
    function transitionTo(targetSectionName: string) {
      const anchors = getAnchors();
      const targetAnchor = anchors[targetSectionName];
      if (!targetAnchor) return;

      if (transitionTween) {
        transitionTween.kill();
        transitionTween = null;
      }

      transitionTween = gsap.to(animState, {
        docX: targetAnchor.docX,
        docY: targetAnchor.docY,
        rotation: targetAnchor.rotation,
        duration: 0.75,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    /**
     * Render Frame
     * Runs on every RAF tick (via gsap.ticker) at display refresh rate.
     * Projects document coordinates (animState.docX, animState.docY) into viewport coordinates.
     */
    function renderFrame() {
      const baseScale = getBaseScale();

      const currentViewportX = animState.docX - BIKE_W / 2;
      const currentViewportY = animState.docY - window.scrollY - BIKE_H / 2;

      gsap.set(assembly, {
        x: currentViewportX,
        y: currentViewportY,
        rotation: animState.rotation,
        scale: baseScale,
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

      gsap.set(entry, { y: -700 });
      gsap.set(glow, { opacity: 1 });
      renderFrame();

      gsap.ticker.add(renderFrame);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      // Handle user scroll during entrance: allow natural entrance without snapping
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

      // Hero Entrance: Wait 0.3s, then 1.2s smooth downward glide arriving and STOPPING in Hero
      entranceTween = gsap.to(entry, {
        y: 0,
        duration: 1.2,
        delay: 0.3,
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
