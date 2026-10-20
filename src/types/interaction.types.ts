/**
 * INTERACTION BEHAVIOR & STATE CONTRACTS
 * Source of truth: /specs/02-interaction-behavior.md
 */

export type CursorStateType = 
  | 'DEFAULT'
  | 'LENS_REVEAL'
  | 'PROJECT_HOVER'
  | 'MAGNETIC_BUTTON'
  | 'HIDDEN';

export type MediaPlaybackStateType = 
  | 'IDLE'
  | 'PRELOADING'
  | 'PREVIEW_LOOPING'
  | 'FULL_MODAL_PLAYING';

export interface CursorPosition {
  x: number;
  y: number;
}

export interface MagneticTargetData {
  element: HTMLElement | null;
  rect: DOMRect | null;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export interface HeroCanvasBounds {
  rect: DOMRect | null;
  localX: number;
  localY: number;
  velocity: number;
  apertureRadius: number;
}

export interface ActiveVideoEntry {
  id: string;
  intersectionRatio: number;
  distanceToCenter: number;
  state: MediaPlaybackStateType;
}
