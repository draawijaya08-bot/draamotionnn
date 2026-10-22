/**
 * Centralized motion tokens for the immersive portfolio.
 * Phase 1: foundation only — GSAP wiring comes later; these constants
 * are the single source of truth every animation will consume.
 */

// ---------------------------------------------------------------------------
// Durations (seconds for GSAP, ms for CSS)
// ---------------------------------------------------------------------------
export const DURATION = {
  /** Micro feedback: hover states, color shifts */
  fast: 0.2,
  /** Standard UI transition: magnetic pull, card settle */
  base: 0.45,
  /** Cinematic reveal: text masks, section fades */
  slow: 0.8,
  /** Page-level moves: hero reveal, scroll choreography */
  cinematic: 1.2,
} as const;

export const DURATION_MS = {
  fast: 200,
  base: 450,
  slow: 800,
  cinematic: 1200,
} as const;

// ---------------------------------------------------------------------------
// Easing curves
// ---------------------------------------------------------------------------
export const EASING = {
  /** Default for reveals — smooth deceleration, premium feel */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Symmetric in/out — overlays, curtains, wipes */
  inOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
  /** Snappy micro-interactions */
  snappy: 'cubic-bezier(0.25, 1, 0.5, 1)',
} as const;

// ---------------------------------------------------------------------------
// Common transition values
// ---------------------------------------------------------------------------
export const TRANSITION = {
  hover: `transform ${DURATION_MS.fast}ms ${EASING.snappy}, opacity ${DURATION_MS.fast}ms ${EASING.snappy}`,
  card: `transform ${DURATION_MS.base}ms ${EASING.out}, opacity ${DURATION_MS.base}ms ${EASING.out}`,
  magnetic: {
    /** While the pointer is over the element */
    engaged: `transform 0.12s ${EASING.snappy}`,
    /** Springing back after pointer leaves */
    release: `transform ${DURATION_MS.base}ms ${EASING.out}`,
  },
} as const;

// ---------------------------------------------------------------------------
// Reduced motion
// ---------------------------------------------------------------------------
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Synchronous check — safe inside effects and event handlers. */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

/** Subscribe to live changes — pair with useSyncExternalStore. */
export const subscribeReducedMotion = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

export const getReducedMotionSnapshot = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const getReducedMotionServerSnapshot = (): boolean => false;
