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
        {/* CARD 1: ILLUSTRATIONS / MOTION GRAPHICS (1:1 Reference Frame)    */}
        {/* Mustard yellow hand holding pencil drawing chair & fruit bowl     */}
        {/* ================================================================ */}
        {category === 'motion-graphics' && (
          <g id="illustration-card-1">
            {/* 1. White Canvas Artboard on the right */}
            <g id="drawing-artboard">
              {/* Artboard Frame */}
              <rect
                x="435"
                y="25"
                width="280"
                height="340"
                rx="26"
                fill="#000000"
                stroke="#ffffff"
                strokeWidth="3.5"
              />

              {/* Minimalist Chair in White Outline */}
              <g id="chair-drawing" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Chair Seat (Perspective angle) */}
                <path d="M 485 235 L 575 250 L 665 220 L 565 212 Z" />
                <path d="M 485 235 L 480 252 L 570 268 L 575 250" />

                {/* Chair Legs reaching to bottom */}
                <path d="M 480 252 L 472 360" />
                <path d="M 570 268 L 560 360" />
                <path d="M 478 310 L 563 322" strokeWidth="2.5" />
                <path d="M 665 220 L 670 360" />

                {/* Chair Back Slats / Spindles */}
                <path d="M 585 215 L 590 90" />
                <path d="M 610 212 L 618 90" />
                <path d="M 635 210 L 646 90" />
                <path d="M 660 208 L 672 90" />
                {/* Curved Top Rail */}
                <path d="M 580 90 C 600 82, 655 82, 678 90" />
              </g>

              {/* Bowl of Fruit in Vibrant Cyan / Teal (#00e5c0) Line Art */}
              <g id="fruit-bowl-drawing" stroke="#00e5c0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* The Fruit Bowl */}
                <path d="M 470 135 C 505 150, 560 150, 595 135" />
                <path d="M 470 135 C 475 200, 515 235, 555 235 C 580 235, 595 190, 595 135" />
                <path d="M 530 235 L 526 246 L 556 246 L 550 235" strokeWidth="2.5" />

                {/* Pear with Stem */}
                <path d="M 510 140 C 490 120, 515 90, 530 70 C 545 90, 565 120, 545 140 Z" />
                <path d="M 530 70 C 527 55, 535 45, 533 40" />

                {/* Banana */}
                <path d="M 495 120 C 530 150, 575 140, 605 85 C 590 120, 545 140, 502 110" />

                {/* Leaves */}
                <path d="M 478 105 L 486 130" />
                <path d="M 493 95 L 496 125" />

                {/* Grapes / Berries Cluster */}
                <circle cx="554" cy="150" r="7" />
                <circle cx="568" cy="143" r="7" />
                <circle cx="581" cy="141" r="6.5" />
                <circle cx="561" cy="162" r="6.5" />
                <circle cx="575" cy="158" r="6.5" />
                <circle cx="587" cy="153" r="6" />
                <circle cx="570" cy="172" r="6" />
              </g>
            </g>

            {/* 2. Stylized Mustard-Yellow Hand (#ea9e28) & Pencil */}
            <g id="mustard-hand-and-pencil">
              {/* Hand Base & Fan of 3 Raised Fingers */}
              <path
                d="M 75 360
                   L 105 230
                   C 108 175, 118 100, 138 82
                   C 150 72, 162 82, 158 98
                   C 153 125, 146 175, 152 205
                   C 160 165, 178 120, 192 118
                   C 204 116, 212 128, 206 148
                   C 198 175, 194 200, 202 220
                   C 210 185, 230 142, 246 142
                   C 256 142, 262 155, 255 174
                   C 246 200, 238 225, 248 238
                   C 260 215, 305 200, 345 220
                   C 375 235, 388 260, 370 282
                   C 352 298, 325 295, 312 280
                   C 305 270, 280 305, 255 330
                   C 235 350, 215 358, 185 360
                   Z"
                fill="#ea9e28"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Lower Wrist Solid Fill to Bottom Border */}
              <path d="M 75 360 L 185 360 L 75 360 Z" fill="#ea9e28" />

              {/* Finger Creases (Black Lines matching reference) */}
              <path d="M 134 94 C 142 97, 149 93, 147 101" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 188 132 C 195 135, 202 131, 200 139" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 238 160 C 244 163, 251 159, 249 166" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

              {/* 3. The Stylized White Drafting Pencil with Cyan Tip */}
              <g id="pencil-group" stroke="#000000" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
                {/* Pencil Shaft (White Hexagonal) */}
                <polygon points="150,295 385,212 393,234 158,317" fill="#ffffff" />

                {/* Hexagonal Facet Lines running down body */}
                <line x1="153" y1="302" x2="388" y2="219" stroke="#000000" strokeWidth="2.5" />
                <line x1="155" y1="310" x2="390" y2="227" stroke="#000000" strokeWidth="2.5" />

                {/* End Cap / Ferrule (White rounded cap with black band) */}
                <path d="M 150 295 C 138 300, 138 312, 158 317" fill="#ffffff" />
                <line x1="158" y1="292" x2="166" y2="314" stroke="#000000" strokeWidth="4" />

                {/* Sharpened Wood Cone */}
                <polygon points="385,212 430,196 393,234" fill="#ffffff" />
                {/* Scalloped facet cuts */}
                <path d="M 385 212 Q 389 219 388 219 Q 391 227 390 227 Q 393 234 393 234" fill="none" stroke="#000000" strokeWidth="2" />

                {/* Sharp Lead Tip in Vibrant Cyan (#00e5c0) touching artboard */}
                <polygon points="430,196 450,188 425,206" fill="#00e5c0" />
              </g>

              {/* Negative Space Opening inside OK grip (shows dark card interior) */}
              <ellipse cx="295" cy="255" rx="16" ry="18" fill="#000000" stroke="#000000" strokeWidth="2" />

              {/* Thumb Loop Clamping Pencil From Below */}
              <path
                d="M 215 340
                   C 238 295, 282 275, 305 288
                   C 322 300, 312 328, 288 342
                   C 265 355, 235 358, 205 360
                   Z"
                fill="#ea9e28"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Inner Palm / Thumb Crease */}
              <path d="M 255 312 C 272 322, 272 336, 262 346" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

              {/* Forefinger Clamping Over Pencil from Above */}
              <path
                d="M 315 224
                   C 340 228, 365 244, 358 262
                   C 352 276, 336 280, 324 268
                   C 316 258, 314 238, 315 224 Z"
                fill="#ea9e28"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Forefinger Contour line at tip */}
              <path d="M 354 252 C 358 259, 356 266, 350 269" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
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
              <text x="160" y="140" fill="#ffffff" fontSize="48" fontWeight="800" letterSpacing="-0.03em">
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
