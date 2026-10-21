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
        {/* CARD 1: MOTION GRAPHICS BANNER (Transparent Monitor Workspace)  */}
        {/* ================================================================ */}
        {(category === 'motion-graphics' || category === 'motion-graphic') && (
          <g id="illustration-card-1">
            <image
              href="/posters/motion-graphic-banner.png"
              x="30"
              y="10"
              width="640"
              height="340"
              preserveAspectRatio="xMidYMid meet"
            />
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
        {/* CARD 2: DESIGN GRAPHIC / BRANDING (Editorial Poster & Geometry)  */}
        {/* ================================================================ */}
        {(category === 'visual-design' || category === 'graphic-design') && (
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
              <text x="150" y="110" fill="#00e5c0" fontSize="40" fontFamily="sans-serif" fontWeight="900" letterSpacing="-0.03em">
                GRAPHIC
              </text>
              <text x="150" y="148" fill="#ffffff" fontSize="32" fontFamily="sans-serif" fontWeight="800" letterSpacing="-0.02em">
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
        {/* CARD 3: AI DEVELOPMENT (Neural Pipelines & Generative Agents)    */}
        {/* ================================================================ */}
        {(category === 'web' || category === 'ai-development') && (
          <g id="ai-dev-card-4" transform="translate(40, 20)">
            {/* Desktop Browser Window Bezel */}
            <rect
              x="80"
              y="20"
              width="440"
              height="280"
              rx="18"
              fill="#06080e"
              stroke="#ffffff"
              strokeWidth="3.5"
            />

            {/* Window Top Bar with Traffic Light Dots */}
            <rect x="80" y="20" width="440" height="34" rx="18" fill="rgba(255,255,255,0.06)" />
            <circle cx="106" cy="37" r="5" fill="#ff5f56" />
            <circle cx="122" cy="37" r="5" fill="#ffbd2e" />
            <circle cx="138" cy="37" r="5" fill="#27c93f" />
            
            <text x="165" y="41" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">
              INDRA WIJAYA / AI DEVELOPMENT LAB
            </text>

            {/* Neural Graph & AI Code Stream inside window */}
            <g transform="translate(110, 75)">
              {/* Neural Synapse Nodes and Connectors */}
              <g stroke="rgba(0,229,192,0.4)" strokeWidth="2" strokeDasharray="4 3">
                <line x1="25" y1="35" x2="85" y2="20" />
                <line x1="25" y1="35" x2="85" y2="55" />
                <line x1="85" y1="20" x2="155" y2="35" />
                <line x1="85" y1="55" x2="155" y2="35" />
                <line x1="155" y1="35" x2="225" y2="35" />
              </g>

              {/* Neural Nodes with pulsing fills */}
              <circle cx="25" cy="35" r="9" fill="#0e121d" stroke="#00e5c0" strokeWidth="2.5" />
              <circle cx="25" cy="35" r="4" fill="#00e5c0" />

              <circle cx="85" cy="20" r="8" fill="#0e121d" stroke="#e0115f" strokeWidth="2" />
              <circle cx="85" cy="20" r="3.5" fill="#e0115f" />

              <circle cx="85" cy="55" r="8" fill="#0e121d" stroke="#f2a922" strokeWidth="2" />
              <circle cx="85" cy="55" r="3.5" fill="#f2a922" />

              <circle cx="155" cy="35" r="10" fill="#0e121d" stroke="#00e5c0" strokeWidth="2.5" />
              <circle cx="155" cy="35" r="4.5" fill="#00e5c0" />

              <circle cx="225" cy="35" r="11" fill="#00e5c0" stroke="#ffffff" strokeWidth="2" />

              {/* Code Snippets & AI Model Diagnostics */}
              <g transform="translate(0, 90)" fontFamily="monospace" fontSize="10">
                <rect x="0" y="0" width="245" height="105" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
                <text x="12" y="24" fill="#00e5c0">&gt; model.pipeline(&quot;ComfyUI&quot;)</text>
                <text x="12" y="44" fill="rgba(255,255,255,0.8)">&gt; agent.eval({`{`} latency: &quot;12ms&quot; {`}`})</text>
                <text x="12" y="64" fill="#e0115f">&gt; generative.synthesize(60fps)</text>
                <text x="12" y="86" fill="#f2a922">&gt; status: 100% DEPLOYED ONLINE</text>
              </g>
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
              <text x="25" y="68" fill="#ffffff" fontSize="20" fontWeight="bold">AI DEV</text>
              <text x="25" y="98" fill="#00e5c0" fontSize="15" fontWeight="bold">NEURAL</text>
              <text x="25" y="125" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="monospace">COMFYUI • LLM</text>
              <text x="25" y="145" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">NEXT.JS 16</text>
              <text x="25" y="175" fill="#f2a922" fontSize="9" fontFamily="monospace">60 FPS TICKER</text>
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
