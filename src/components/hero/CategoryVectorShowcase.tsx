'use client';

import React from 'react';
import { ProjectCategory } from '@/types/portfolio';

interface CategoryVectorShowcaseProps {
  category: ProjectCategory;
  isFront?: boolean;
}

export const CategoryVectorShowcase: React.FC<CategoryVectorShowcaseProps> = ({
  category,
  isFront = false,
}) => {
  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden select-none">
      {/* SVG Canvas - 1:1 Purrweb Editorial Art Style */}
      <svg
        viewBox="0 0 700 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain object-bottom pointer-events-none"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Laptop Screen Gradient for Card 2 & 4 */}
          <linearGradient id="purrweb-screen-aura" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b99b" />
            <stop offset="30%" stopColor="#125688" />
            <stop offset="65%" stopColor="#8a185b" />
            <stop offset="100%" stopColor="#d91b5c" />
          </linearGradient>

          <linearGradient id="gold-metal-ferrule" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Pencil Shadow */}
          <filter id="pencil-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ================================================================ */}
        {/* CARD 1: MOTION GRAPHICS / ILLUSTRATIONS (1:1 Reference Frame)    */}
        {/* Mustard yellow hand holding pencil drawing chair & fruit bowl     */}
        {/* ================================================================ */}
        {category === 'motion-graphics' && (
          <g id="illustration-card-1">
            {/* 1. White Canvas Artboard on the right */}
            <g id="drawing-artboard">
              {/* Artboard Frame */}
              <rect
                x="410"
                y="30"
                width="280"
                height="330"
                rx="22"
                fill="#000000"
                stroke="#ffffff"
                strokeWidth="3.5"
              />

              {/* Minimalist Chair in White Outline */}
              <g id="chair-drawing" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Chair Seat */}
                <path d="M 465 240 L 640 240" />

                {/* Chair Back Slats */}
                <path d="M 590 240 L 594 135" />
                <path d="M 612 240 L 620 135" />
                <path d="M 634 240 L 646 135" />
                <path d="M 586 135 C 600 130, 638 130, 650 135" />

                {/* Chair Legs */}
                <path d="M 480 240 L 472 360" />
                <path d="M 525 240 L 520 360" />
                <path d="M 625 240 L 632 360" />
                {/* Horizontal Rung */}
                <path d="M 476 300 L 522 300" strokeWidth="2.5" />
              </g>

              {/* Bowl of Fruit in Vibrant Cyan / Teal (#00e5c0) Line Art */}
              <g id="fruit-bowl-drawing" stroke="#00e5c0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* The Fruit Bowl */}
                <path d="M 460 175 Q 525 260 590 175" />
                <path d="M 460 175 C 475 168, 575 168, 590 175" />
                <path d="M 510 230 L 505 240 L 545 240 L 540 230" strokeWidth="2.5" />

                {/* Pear with Stem & Leaf */}
                <path d="M 505 130 C 495 145, 485 155, 495 180 C 505 190, 528 190, 538 180 C 548 155, 538 145, 528 130 Z" />
                <path d="M 517 130 Q 520 115, 528 110" />

                {/* Banana */}
                <path d="M 480 165 Q 525 205 575 150 Q 535 185 490 170" />

                {/* Grapes / Berries Cluster */}
                <path d="M 535 170 C 530 185, 565 185, 560 170 C 565 160, 550 155, 535 170" />
                <circle cx="550" cy="180" r="7" />
                <circle cx="562" cy="175" r="7" />
                <circle cx="555" cy="190" r="6.5" />
                <circle cx="568" cy="188" r="6" />
                <circle cx="576" cy="178" r="5.5" />
              </g>
            </g>

            {/* 2. Stylized Mustard-Yellow Hand (#f2a922) */}
            <g id="mustard-hand">
              {/* Outer Hand Silhouette */}
              <path
                d="M 120 360
                   L 125 240
                   C 125 220, 140 160, 165 140
                   C 180 128, 192 135, 190 155
                   C 188 175, 172 230, 175 250
                   C 185 240, 220 220, 250 215
                   C 285 210, 340 225, 375 255
                   C 395 272, 400 290, 388 308
                   C 375 325, 355 330, 325 325
                   C 310 322, 295 315, 280 305
                   C 260 325, 235 345, 205 360
                   Z"
                fill="#f2a922"
                stroke="#000000"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Lower Wrist / Arm Fill to Bottom Edge */}
              <path
                d="M 120 360 L 205 360 L 260 360 L 120 360 Z"
                fill="#f2a922"
              />

              {/* Thumb Loop Clamping Pencil From Below */}
              <path
                d="M 270 310
                   C 310 295, 365 315, 350 355
                   C 335 385, 275 390, 245 350
                   C 235 335, 250 318, 270 310 Z"
                fill="#f2a922"
                stroke="#000000"
                strokeWidth="3.5"
              />

              {/* Teardrop Negative Space Inside Hand (Black Background Hole) */}
              <path
                d="M 285 295
                   C 310 280, 335 290, 330 320
                   C 325 340, 290 345, 275 325
                   C 270 310, 275 300, 285 295 Z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="3"
              />

              {/* Knuckle and Finger Detail Creases (Black Lines) */}
              <path d="M 155 180 C 158 190, 165 190, 168 180" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 285 235 C 295 245, 305 245, 315 235" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 335 340 C 330 355, 315 365, 300 365" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* 3. The Stylized White Pencil with Cyan Tip Touching the Canvas */}
            <g id="pencil" transform="rotate(-18 360 270)" filter="url(#pencil-shadow)">
              {/* Eraser / Back Cap */}
              <rect x="180" y="278" width="22" height="18" rx="5" fill="#f87171" stroke="#000000" strokeWidth="3" />
              
              {/* Metal Ferrule Band */}
              <rect x="202" y="277" width="16" height="20" fill="url(#gold-metal-ferrule)" stroke="#000000" strokeWidth="3" />
              <line x1="210" y1="277" x2="210" y2="297" stroke="#000000" strokeWidth="2" />

              {/* Hexagonal Pencil Body (White) */}
              <rect x="218" y="276" width="180" height="22" fill="#ffffff" stroke="#000000" strokeWidth="3.5" />
              {/* Pencil Facet Center Line */}
              <line x1="218" y1="287" x2="398" y2="287" stroke="#000000" strokeWidth="2" />

              {/* Sharpened Wood Cone */}
              <polygon points="398,276 430,287 398,298" fill="#fde68a" stroke="#000000" strokeWidth="3" />

              {/* Graphite Tip in Vibrant Cyan (#00e5c0) */}
              <polygon points="420,283.5 436,287 420,290.5" fill="#00e5c0" stroke="#000000" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* ================================================================ */}
        {/* CARD 2: VIDEO EDITING (1:1 Purrweb Perspective Laptop)           */}
        {/* White laptop with chromatic screen aura and keyboard pill keys   */}
        {/* ================================================================ */}
        {category === 'video-editing' && (
          <g id="laptop-card-2" transform="translate(40, 20)">
            {/* 1. Laptop Screen Bezel */}
            <rect
              x="120"
              y="20"
              width="440"
              height="250"
              rx="24"
              fill="#06070a"
              stroke="#ffffff"
              strokeWidth="4"
            />

            {/* Laptop Screen Display with Rich Chromatic Aura */}
            <rect
              x="128"
              y="28"
              width="424"
              height="234"
              rx="18"
              fill="url(#purrweb-screen-aura)"
            />

            {/* Screen Inner Artwork: Purrweb Signature Screen Layout */}
            <g id="screen-content" className="select-none font-sans">
              <text x="160" y="60" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
                INDRA WIJAYA / 4K CINEMATIC
              </text>
              <text x="160" y="140" fill="#ffffff" fontSize="48" fontWeight="800" letterSpacing="-0.03em" lineHeight="0.9">
                CINEMATIC
              </text>
              <text x="160" y="195" fill="#ffffff" fontSize="44" fontWeight="800" letterSpacing="-0.03em">
                EDITING <tspan fill="#00e5c0" fontStyle="italic" fontFamily="serif" fontWeight="normal">motion</tspan>
              </text>
              <text x="160" y="235" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace">
                COLOR GRADING / TIMELINE CUTS / AUDIO VISUAL
              </text>
            </g>

            {/* 2. Laptop Keyboard Base (Rising from Bottom) */}
            <g id="laptop-keyboard" transform="translate(0, 265)">
              {/* Keyboard Top Plate */}
              <path
                d="M 70 5 L 610 5 L 650 75 L 30 75 Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Stylized Pill Keyboard Keys (Black on White Plate) */}
              <g fill="#000000">
                {/* Row 1 Keys */}
                <rect x="90" y="15" width="34" height="14" rx="7" />
                <rect x="135" y="15" width="34" height="14" rx="7" />
                <rect x="180" y="15" width="34" height="14" rx="7" />
                <rect x="225" y="15" width="34" height="14" rx="7" />
                <rect x="270" y="15" width="34" height="14" rx="7" />
                <rect x="315" y="15" width="34" height="14" rx="7" />
                <rect x="360" y="15" width="34" height="14" rx="7" />
                <rect x="405" y="15" width="34" height="14" rx="7" />
                <rect x="450" y="15" width="34" height="14" rx="7" />
                <rect x="495" y="15" width="34" height="14" rx="7" />
                <rect x="540" y="15" width="38" height="14" rx="7" />

                {/* Row 2 Keys */}
                <rect x="80" y="38" width="40" height="15" rx="7.5" />
                <rect x="130" y="38" width="36" height="15" rx="7.5" />
                <rect x="176" y="38" width="36" height="15" rx="7.5" />
                <rect x="222" y="38" width="36" height="15" rx="7.5" />
                <rect x="268" y="38" width="130" height="15" rx="7.5" /> {/* Spacebar */}
                <rect x="408" y="38" width="36" height="15" rx="7.5" />
                <rect x="454" y="38" width="36" height="15" rx="7.5" />
                <rect x="500" y="38" width="40" height="15" rx="7.5" />
                <rect x="550" y="38" width="48" height="15" rx="7.5" />
              </g>
            </g>
          </g>
        )}

        {/* ================================================================ */}
        {/* CARD 3: VISUAL DESIGN / BRANDING (Editorial Poster & Geometry)   */}
        {/* Hand arranging Swiss typography layout & brand identity vectors  */}
        {/* ================================================================ */}
        {category === 'visual-design' && (
          <g id="branding-card-3" transform="translate(30, 10)">
            {/* 1. Large Editorial Typography Artboard */}
            <rect
              x="130"
              y="20"
              width="460"
              height="330"
              rx="22"
              fill="#08080c"
              stroke="#ffffff"
              strokeWidth="3.5"
            />

            {/* Poster Grid & Giant Serif "Aa" */}
            <g transform="translate(160, 45)">
              <text x="0" y="40" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="monospace" letterSpacing="0.2em">
                BRAND SYSTEM / 03
              </text>

              {/* Giant Serif Accent Typography */}
              <text x="0" y="140" fill="#ffffff" fontSize="90" fontFamily="serif" fontStyle="italic" fontWeight="bold">
                Aa
              </text>
              <text x="150" y="130" fill="#00e5c0" fontSize="48" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.03em">
                DESIGN
              </text>

              {/* Grid Metric Crosshairs */}
              <line x1="0" y1="165" x2="380" y2="165" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" />
              <line x1="135" y1="50" x2="135" y2="280" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

              {/* Golden Spiral Geometric Arc in Magenta */}
              <path
                d="M 280 260 A 80 80 0 0 1 360 180 A 50 50 0 0 1 410 230"
                stroke="#e0115f"
                strokeWidth="3"
                fill="none"
              />

              {/* Isometric Palette Color Swatches */}
              <g transform="translate(160, 190)">
                <rect x="0" y="0" width="65" height="55" rx="5" fill="#f2a922" stroke="#ffffff" strokeWidth="2" />
                <rect x="0" y="35" width="65" height="20" rx="3" fill="#ffffff" />
                <text x="6" y="50" fill="#000000" fontSize="9" fontFamily="monospace" fontWeight="bold">#F2A922</text>

                <rect x="75" y="0" width="65" height="55" rx="5" fill="#00e5c0" stroke="#ffffff" strokeWidth="2" />
                <rect x="75" y="35" width="65" height="20" rx="3" fill="#ffffff" />
                <text x="81" y="50" fill="#000000" fontSize="9" fontFamily="monospace" fontWeight="bold">#00E5C0</text>

                <rect x="150" y="0" width="65" height="55" rx="5" fill="#e0115f" stroke="#ffffff" strokeWidth="2" />
                <rect x="150" y="35" width="65" height="20" rx="3" fill="#ffffff" />
                <text x="156" y="50" fill="#000000" fontSize="9" fontFamily="monospace" fontWeight="bold">#E0115F</text>
              </g>
            </g>
          </g>
        )}

        {/* ================================================================ */}
        {/* CARD 4: WEB DEVELOPMENT (Interactive Multi-Device Wireframe)     */}
        {/* Desktop Browser + Mobile screen with modern UI components        */}
        {/* ================================================================ */}
        {category === 'web' && (
          <g id="web-card-4" transform="translate(40, 20)">
            {/* Desktop Browser Window Bezel */}
            <rect
              x="80"
              y="20"
              width="440"
              height="280"
              rx="18"
              fill="#080a10"
              stroke="#ffffff"
              strokeWidth="3.5"
            />

            {/* Window Top Bar with Traffic Light Dots */}
            <rect x="80" y="20" width="440" height="34" rx="18" fill="rgba(255,255,255,0.06)" />
            <circle cx="106" cy="37" r="5" fill="#ff5f56" />
            <circle cx="122" cy="37" r="5" fill="#ffbd2e" />
            <circle cx="138" cy="37" r="5" fill="#27c93f" />
            <rect x="170" y="29" width="180" height="16" rx="6" fill="rgba(255,255,255,0.1)" />

            {/* Wireframe Hero UI Section inside window */}
            <g transform="translate(110, 80)">
              <rect x="0" y="0" width="160" height="20" rx="4" fill="rgba(0,229,192,0.6)" />
              <rect x="0" y="30" width="220" height="10" rx="3" fill="rgba(255,255,255,0.3)" />
              <rect x="0" y="48" width="180" height="10" rx="3" fill="rgba(255,255,255,0.18)" />

              {/* Interactive Component Card */}
              <rect x="0" y="80" width="140" height="90" rx="10" fill="rgba(255,255,255,0.04)" stroke="#00e5c0" strokeWidth="2" />
              <circle cx="35" cy="115" r="16" fill="rgba(0,229,192,0.2)" />
              <polygon points="32,107 42,115 32,123" fill="#00e5c0" />
              <rect x="62" y="108" width="60" height="8" rx="2" fill="#ffffff" />
              <rect x="62" y="122" width="45" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
            </g>

            {/* Nested Mobile Device Wireframe on the Right (Overlapping) */}
            <g transform="translate(380, 70)">
              <rect
                x="0"
                y="0"
                width="140"
                height="245"
                rx="24"
                fill="#000000"
                stroke="#00e5c0"
                strokeWidth="3.5"
              />
              {/* Speaker notch */}
              <rect x="45" y="10" width="50" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
              {/* Screen Aura */}
              <rect x="10" y="28" width="120" height="190" rx="14" fill="url(#purrweb-screen-aura)" />
              <text x="25" y="75" fill="#ffffff" fontSize="22" fontWeight="bold">WEB</text>
              <text x="25" y="105" fill="#00e5c0" fontSize="18" fontWeight="bold">NEXT.JS</text>
              <text x="25" y="140" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">60 FPS GSAP</text>
              {/* Home indicator */}
              <rect x="45" y="228" width="50" height="4" rx="2" fill="#ffffff" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

export default CategoryVectorShowcase;
