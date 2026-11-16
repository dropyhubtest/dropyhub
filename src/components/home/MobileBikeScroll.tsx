'use client';

/**
 * MobileBikeScroll — Horizontal Scroll-Synced Bike Animation (Mobile Only ≤ 1199px)
 *
 * Behaviour (from spec):
 * 1. Bike enters from the LEFT edge of the screen and travels HORIZONTALLY to
 *    the RIGHT, in sync with the user's scroll position.
 * 2. When it reaches the RIGHT viewport boundary it PAUSES (holds position) while
 *    the user scrolls through a "pause zone" (25% of a lap's scroll distance).
 * 3. After the pause zone, the bike instantly snaps back to the LEFT and begins
 *    the next crossing — seamless and continuous for the entire page.
 * 4. The bike is pinned to a fixed viewport Y so it stays in the same visual
 *    "lane" throughout scrolling.
 * 5. The asset (Bike.png, top-down vertical) is rotated -90° so it faces right.
 *    When rotated, displayed dimensions are:
 *    — rendered width  = BIKE_H = 154.778px  (original height becomes visual width)
 *    — rendered height = BIKE_W = 103.185px  (original width becomes visual height)
 *
 * Scroll-to-X mapping per lap:
 *   TRAVEL ZONE  (0% → 75% of lapSize): bike moves from offscreen-left to offscreen-right
 *   PAUSE ZONE   (75% → 100% of lapSize): bike clamped at right edge (stopped)
 *   On lap boundary: bike teleports to left offscreen start → new lap begins
 *
 * Performance:
 *   — gsap.ticker (rAF) for 60/120fps rendering, no layout reads inside rAF
 *   — transform: translate3d → GPU composited
 *   — No scroll event listener needed — polling scrollY each frame is cheaper
 *     and avoids jank from passive listener queuing.
 */

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './MobileBikeScroll.module.css';

/* ── Constants ─────────────────────────────────────────────────────────── */

/** Spec asset dimensions (px) — raw image dimensions */
const BIKE_W = 103.185;
const BIKE_H = 154.778;

/**
 * After -90° rotation, the bike's visual footprint on screen is:
 *   displayed width  = BIKE_H  (154.778px)
 *   displayed height = BIKE_W  (103.185px)
 */
const DISPLAY_W = BIKE_H;  // 154.778 — visual width of rotated bike
const DISPLAY_H = BIKE_W;  // 103.185 — visual height of rotated bike

/**
 * Number of full left-to-right crossings across the page scroll.
 * 6 crossings for a typical ~6000px mobile page (one per ~1000px scroll).
 */
const NUM_LAPS = 6;

/**
 * Fraction of each lap's scroll distance dedicated to the TRAVEL phase.
 * The remaining (1 - TRAVEL_FRACTION) is the PAUSE zone at the right edge.
 */
const TRAVEL_FRACTION = 0.75;

/**
 * Extra px beyond viewport edges where the bike starts/ends travel.
 * Keeps entry/exit fully invisible before the bike appears on-screen.
 */
const OFFSCREEN_MARGIN = DISPLAY_W + 16;

/**
 * Fraction of viewport height where the bike's centre is locked vertically.
 * 0.42 = 42% from top — a visually natural mid-to-upper band on mobile.
 */
const VERTICAL_FRACTION = 0.42;

/* ── Hydration guard (SSR-safe) ─────────────────────────────────────────── */
const subscribeClient = () => () => {};

/* ── Component ─────────────────────────────────────────────────────────── */
export const MobileBikeScroll: React.FC = () => {
  const mounted = useSyncExternalStore(subscribeClient, () => true, () => false);
  const assemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;

    /* Only active on mobile / tablet */
    if (window.innerWidth >= 1200) return;

    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const assembly = assemblyRef.current;
    if (!assembly) return;

    /* Mutable viewport cache (updated on resize) */
    let vw = window.innerWidth;
    let viewY = vw * VERTICAL_FRACTION;   // will be overwritten by correct vh below
    // Correct viewY uses innerHeight, not innerWidth:
    viewY = window.innerHeight * VERTICAL_FRACTION;

    /* ── Frame render ───────────────────────────────────────────────────── */
    function renderFrame() {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      /* Divide total scroll into NUM_LAPS equal segments */
      const lapSize = maxScroll / NUM_LAPS;
      const lapIndex = Math.floor(scrollY / lapSize);
      const lapScrollY = scrollY - lapIndex * lapSize;        // 0 … lapSize
      const lapProgress = Math.min(1, lapScrollY / lapSize);  // 0 → 1 within this lap

      /*
       * X position logic:
       *
       * During TRAVEL (lapProgress 0 → TRAVEL_FRACTION):
       *   Map 0 → TRAVEL_FRACTION to bike moving from (-OFFSCREEN_MARGIN) to (vw + OFFSCREEN_MARGIN - DISPLAY_W)
       *   i.e. from fully off-screen left to fully off-screen right.
       *
       * During PAUSE (lapProgress TRAVEL_FRACTION → 1):
       *   Clamp X to the right edge where the bike is just barely visible
       *   (bike's right edge flush with right viewport edge).
       *   rightEdgeX = vw - DISPLAY_W  (since x is the left edge of the assembly,
       *   and the assembly's visual width when rotated = DISPLAY_W)
       */
      const rightEdgeX = vw - DISPLAY_W - 8;   // 8px padding from screen edge
      const leftEdgeX = -OFFSCREEN_MARGIN;

      let bikeX: number;
      if (lapProgress <= TRAVEL_FRACTION) {
        /* Normalise travel progress 0→1 */
        const travelPct = lapProgress / TRAVEL_FRACTION;
        bikeX = leftEdgeX + travelPct * (rightEdgeX - leftEdgeX);
      } else {
        /* Pause zone — hold at right edge */
        bikeX = rightEdgeX;
      }

      /* Apply to DOM — GSAP set() is a single style mutation, no reflow */
      gsap.set(assembly, {
        x: bikeX,
        y: viewY - DISPLAY_H / 2,
        rotation: -90,       // rotate asset so front wheel faces right
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    /* ── Resize handler ─────────────────────────────────────────────────── */
    function onResize() {
      vw = window.innerWidth;
      viewY = window.innerHeight * VERTICAL_FRACTION;

      if (vw >= 1200) {
        gsap.set(assembly, { opacity: 0 });
      } else {
        gsap.set(assembly, { opacity: 1 });
      }
    }

    /* ── Boot ───────────────────────────────────────────────────────────── */
    gsap.set(assembly, { opacity: 1 });
    renderFrame();                             // Snap to correct position immediately
    gsap.ticker.add(renderFrame);             // Drive every rAF
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      gsap.ticker.remove(renderFrame);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  /* SSR guard */
  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} aria-hidden="true">
      {/*
        The assembly div is the GSAP target.
        Its CSS dimensions are the RAW asset size (103.185 × 154.778).
        GSAP applies rotation: -90deg which visually swaps width/height.
        transform-origin: 50% 50% ensures it rotates around its own centre.
      */}
      <div ref={assemblyRef} className={styles.bikeAssembly}>
        {/* Headlight glow — centred on front axle (bottom of vertical asset) */}
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

        {/* Bike + Rider — primary visual */}
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
