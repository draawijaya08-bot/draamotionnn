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
    <div className="relative w-full h-full min-h-[200px] sm:min-h-[240px] flex items-center justify-center overflow-hidden bg-[#060709] rounded-xl sm:rounded-2xl select-none">
      {/* Background Subtle Grid & Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Canvas (Full bar, responsive, perfectly scaled, zero clipping) */}
      <svg
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain pointer-events-none transition-transform duration-700 ease-out"
        style={{
          filter: isFront ? 'drop-shadow(0 0 24px rgba(0, 229, 192, 0.08))' : 'none',
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="flow-gradient-motion" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5c0" />
            <stop offset="50%" stopColor="#ffaa2a" />
            <stop offset="100%" stopColor="#8a2be2" />
          </linearGradient>

          <linearGradient id="flow-gradient-video" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="50%" stopColor="#ff3b5c" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>

          <linearGradient id="flow-gradient-visual" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8c00" />
            <stop offset="50%" stopColor="#e0115f" />
            <stop offset="100%" stopColor="#00f090" />
          </linearGradient>

          <linearGradient id="flow-gradient-web" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f090" />
            <stop offset="50%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#00e5c0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="vector-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================================================================ */}
        {/* CATEGORY 1: MOTION GRAPHICS                                      */}
        {/* Theme: Kinetic ribbons, 3D wireframe solids, keyframe tangents   */}
        {/* ================================================================ */}
        {category === 'motion-graphics' && (
          <g className="animate-in fade-in duration-500">
            {/* Ambient Background Aura */}
            <circle cx="280" cy="240" r="140" fill="#00e5c0" opacity="0.06" filter="url(#vector-glow)" />
            <circle cx="560" cy="200" r="120" fill="#ffaa2a" opacity="0.05" filter="url(#vector-glow)" />

            {/* Continuous Flowing Spine (Enters at y=240, Exits at y=240) */}
            <path
              d="M 0 240 C 140 140, 240 340, 400 240 C 560 140, 660 340, 800 240"
              stroke="url(#flow-gradient-motion)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#soft-glow)"
            />
            {/* Kinetic Secondary Parallel Ribbon */}
            <path
              d="M 0 255 C 140 155, 240 355, 400 255 C 560 155, 660 355, 800 255"
              stroke="#00e5c0"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              opacity="0.6"
              fill="none"
            />
            <path
              d="M 0 225 C 140 125, 240 325, 400 225 C 560 125, 660 325, 800 225"
              stroke="#ffaa2a"
              strokeWidth="1.5"
              strokeDasharray="10 6"
              opacity="0.5"
              fill="none"
            />

            {/* Left Sector: 3D Isometric Rotating Geometry Wireframe */}
            <g transform="translate(180, 210)">
              {/* Isometric Cube */}
              <polygon points="0,-40 38,-18 38,24 0,42 -38,24 -38,-18" fill="rgba(0,229,192,0.06)" stroke="#00e5c0" strokeWidth="1.8" />
              <line x1="0" y1="-40" x2="0" y2="42" stroke="#00e5c0" strokeWidth="1.5" opacity="0.7" />
              <line x1="0" y1="0" x2="38" y2="-18" stroke="#00e5c0" strokeWidth="1.5" opacity="0.7" />
              <line x1="0" y1="0" x2="-38" y2="-18" stroke="#00e5c0" strokeWidth="1.5" opacity="0.7" />
              {/* Orbiting Ring */}
              <ellipse cx="0" cy="2" rx="60" ry="24" stroke="rgba(255,170,42,0.7)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" transform="rotate(-20)" />
              {/* Glowing Vertices */}
              <circle cx="0" cy="-40" r="3.5" fill="#ffffff" />
              <circle cx="38" cy="-18" r="3" fill="#ffaa2a" />
              <circle cx="-38" cy="-18" r="3" fill="#00e5c0" />
              <circle cx="0" cy="42" r="3.5" fill="#ffffff" />
            </g>

            {/* Center Sector: After Effects Graph Editor Bézier Curve & Tangents */}
            <g transform="translate(380, 160)">
              {/* Grid Box */}
              <rect x="-80" y="0" width="160" height="130" rx="8" fill="#0b0d13" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <line x1="-80" y1="65" x2="80" y2="65" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="0" y1="0" x2="0" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              
              {/* S-Curve (Ease-In-Out) */}
              <path d="M -60 100 C -20 100, 20 30, 60 30" stroke="#00e5c0" strokeWidth="2.5" fill="none" />
              
              {/* Tangent Handles */}
              <line x1="-60" y1="100" x2="-20" y2="100" stroke="#ffaa2a" strokeWidth="1.5" />
              <circle cx="-20" cy="100" r="3.5" fill="#ffaa2a" />
              <line x1="60" y1="30" x2="20" y2="30" stroke="#ffaa2a" strokeWidth="1.5" />
              <circle cx="20" cy="30" r="3.5" fill="#ffaa2a" />

              {/* Diamond Keyframes */}
              <polygon points="-60,94 -54,100 -60,106 -66,100" fill="#ffffff" stroke="#00e5c0" strokeWidth="1.5" />
              <polygon points="60,24 66,30 60,36 54,30" fill="#ffffff" stroke="#00e5c0" strokeWidth="1.5" />
            </g>

            {/* Right Sector: Kinetic Typography & Particles */}
            <g transform="translate(620, 220)">
              {/* Concentric Velocity Arcs */}
              <circle cx="0" cy="0" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
              <path d="M -45 0 A 45 45 0 0 1 35 -28" stroke="#ffaa2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 45 0 A 45 45 0 0 1 -35 28" stroke="#00e5c0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              
              {/* Central Kinetic Symbol */}
              <polygon points="-12,-16 16,0 -12,16" fill="rgba(255,255,255,0.9)" />

              {/* Floating 60 FPS Badge */}
              <rect x="35" y="-50" width="56" height="20" rx="4" fill="rgba(0,229,192,0.12)" stroke="#00e5c0" strokeWidth="1" />
              <text x="63" y="-36" fill="#00e5c0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">60 FPS</text>
            </g>

            {/* Metadata Badges in Corners */}
            <text x="50" y="60" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em">PIPELINE / 01</text>
            <text x="50" y="80" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.05em">KINETIC MOTION ENGINE</text>
            
            <text x="750" y="60" fill="#00e5c0" fontSize="10" fontFamily="monospace" textAnchor="end" letterSpacing="0.15em">AE / C4D / GSAP</text>
          </g>
        )}

        {/* ================================================================ */}
        {/* CATEGORY 2: VIDEO EDITING                                        */}
        {/* Theme: Cinematic 16:9 frame, audio waveforms, precision cuts     */}
        {/* ================================================================ */}
        {category === 'video-editing' && (
          <g className="animate-in fade-in duration-500">
            {/* Ambient Aura */}
            <circle cx="340" cy="240" r="150" fill="#ff3b5c" opacity="0.06" filter="url(#vector-glow)" />
            <circle cx="600" cy="220" r="120" fill="#ff8c00" opacity="0.05" filter="url(#vector-glow)" />

            {/* Continuous Flowing Spine (Enters at y=240, Exits at y=240) */}
            <path
              d="M 0 240 C 140 320, 260 160, 400 240 C 540 320, 660 160, 800 240"
              stroke="url(#flow-gradient-video)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#soft-glow)"
            />
            {/* Parallel Filmstrip Perforation Lines */}
            <path
              d="M 0 215 C 140 295, 260 135, 400 215 C 540 295, 660 135, 800 215"
              stroke="rgba(255,59,92,0.4)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
            />
            <path
              d="M 0 265 C 140 345, 260 185, 400 265 C 540 345, 660 185, 800 265"
              stroke="rgba(255,140,0,0.5)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
            />

            {/* Left Sector: Cinematic 16:9 Viewport & Crop Marks */}
            <g transform="translate(180, 200)">
              {/* 16:9 Frame */}
              <rect x="-85" y="-50" width="170" height="96" rx="6" fill="#090a10" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              
              {/* Corner Registration Marks */}
              <path d="M -75 -40 L -65 -40 M -75 -40 L -75 -30" stroke="#ff3b5c" strokeWidth="1.5" />
              <path d="M 75 -40 L 65 -40 M 75 -40 L 75 -30" stroke="#ff3b5c" strokeWidth="1.5" />
              <path d="M -75 36 L -65 36 M -75 36 L -75 26" stroke="#ff3b5c" strokeWidth="1.5" />
              <path d="M 75 36 L 65 36 M 75 36 L 75 26" stroke="#ff3b5c" strokeWidth="1.5" />

              {/* REC Indicator */}
              <circle cx="-60" cy="-30" r="3.5" fill="#ff3b5c" />
              <text x="-50" y="-27" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">REC</text>

              {/* Timecode */}
              <text x="65" y="-27" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace" textAnchor="end">00:14:22:18</text>

              {/* Center Crosshair */}
              <line x1="-8" y1="-2" x2="8" y2="-2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="0" y1="-10" x2="0" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </g>

            {/* Center-Right Sector: Multi-Track Timeline & Audio Waveforms */}
            <g transform="translate(490, 180)">
              {/* Timeline Container Box */}
              <rect x="-140" y="-45" width="280" height="120" rx="8" fill="#090a12" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              
              {/* Track V1 (Video Blocks with Cut Lines) */}
              <rect x="-130" y="-35" width="60" height="20" rx="3" fill="rgba(138,43,226,0.25)" stroke="#8a2be2" strokeWidth="1" />
              <rect x="-65" y="-35" width="90" height="20" rx="3" fill="rgba(255,59,92,0.3)" stroke="#ff3b5c" strokeWidth="1" />
              <rect x="30" y="-35" width="95" height="20" rx="3" fill="rgba(255,140,0,0.25)" stroke="#ff8c00" strokeWidth="1" />

              {/* Track A1: Audio Waveform Peak Bars */}
              <g transform="translate(-130, 0)">
                <rect x="0" y="0" width="255" height="26" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                {/* Simulated Waveform Bars */}
                {[-10, 8, 14, -12, 18, -15, 20, 24, -18, 12, -8, 16, 22, -20, 15, -10, 8, -6, 14, 20, -16, 10, -8, 14, 18, -12, 8, 16, -10].map((h, i) => (
                  <line
                    key={i}
                    x1={8 + i * 8.5}
                    y1={13 - Math.abs(h) * 0.45}
                    x2={8 + i * 8.5}
                    y2={13 + Math.abs(h) * 0.45}
                    stroke={i > 10 && i < 20 ? '#ff3b5c' : '#ffaa2a'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Track A2: Ambient Sub-track */}
              <rect x="-130" y="34" width="140" height="14" rx="2" fill="rgba(0,229,192,0.15)" stroke="rgba(0,229,192,0.4)" strokeWidth="1" />
              <rect x="15" y="34" width="110" height="14" rx="2" fill="rgba(138,43,226,0.15)" stroke="rgba(138,43,226,0.4)" strokeWidth="1" />

              {/* Red Laser Playhead Cursor */}
              <line x1="20" y1="-45" x2="20" y2="75" stroke="#ff3b5c" strokeWidth="2" />
              <polygon points="14,-45 26,-45 20,-38" fill="#ff3b5c" />
            </g>

            {/* Metadata Badges in Corners */}
            <text x="50" y="60" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em">PIPELINE / 02</text>
            <text x="50" y="80" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.05em">CINEMATIC EDITING SUITE</text>
            
            <text x="750" y="60" fill="#ff3b5c" fontSize="10" fontFamily="monospace" textAnchor="end" letterSpacing="0.15em">PR / DAVINCI RESOLVE / 4K</text>
          </g>
        )}

        {/* ================================================================ */}
        {/* CATEGORY 3: VISUAL DESIGN                                        */}
        {/* Theme: Swiss typography grid, golden ratio spiral, brand vectors */}
        {/* ================================================================ */}
        {category === 'visual-design' && (
          <g className="animate-in fade-in duration-500">
            {/* Ambient Aura */}
            <circle cx="280" cy="240" r="140" fill="#e0115f" opacity="0.06" filter="url(#vector-glow)" />
            <circle cx="560" cy="220" r="130" fill="#00f090" opacity="0.05" filter="url(#vector-glow)" />

            {/* Continuous Flowing Spine (Enters at y=240, Exits at y=240) */}
            <path
              d="M 0 240 C 150 160, 250 320, 400 240 C 550 160, 670 320, 800 240"
              stroke="url(#flow-gradient-visual)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#soft-glow)"
            />
            {/* Swiss Grid Alignment Vector Lines */}
            <path
              d="M 0 250 C 150 170, 250 330, 400 250 C 550 170, 670 330, 800 250"
              stroke="rgba(0,240,144,0.4)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
            <path
              d="M 0 230 C 150 150, 250 310, 400 230 C 550 150, 670 310, 800 230"
              stroke="rgba(224,17,95,0.45)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
            />

            {/* Left Sector: Golden Ratio Logarithmic Spiral & Geometry */}
            <g transform="translate(180, 210)">
              {/* Nested Golden Ratio Rectangles */}
              <rect x="-65" y="-55" width="110" height="110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="45" y="-55" width="68" height="68" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="71" y="13" width="42" height="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Golden Spiral Arc */}
              <path
                d="M -65 55 A 110 110 0 0 1 45 -55 A 68 68 0 0 1 113 13 A 42 42 0 0 1 71 55"
                stroke="#e0115f"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Crosshair Markers */}
              <circle cx="45" cy="13" r="3" fill="#00f090" />
              <line x1="45" y1="5" x2="45" y2="21" stroke="#00f090" strokeWidth="1" />
              <line x1="37" y1="13" x2="53" y2="13" stroke="#00f090" strokeWidth="1" />
            </g>

            {/* Center Sector: Typography & Swiss Poster Grid Nodes */}
            <g transform="translate(390, 160)">
              {/* Poster Artboard Box */}
              <rect x="-70" y="0" width="140" height="150" rx="6" fill="#0a0a0f" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
              
              {/* Giant Serif "Aa" Typographic Vector */}
              <text x="0" y="70" fill="url(#flow-gradient-visual)" fontSize="56" fontFamily="serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">
                Aa
              </text>
              <line x1="-50" y1="85" x2="50" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Grid Metric Tags */}
              <text x="-50" y="105" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">GRID 12-COL</text>
              <text x="-50" y="120" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">KERNING: -0.04</text>
              <rect x="15" y="100" width="35" height="14" rx="2" fill="rgba(0,240,144,0.15)" stroke="#00f090" strokeWidth="1" />
              <text x="32" y="111" fill="#00f090" fontSize="8" fontFamily="monospace" textAnchor="middle">RGB</text>
            </g>

            {/* Right Sector: Brand Identity Color Chips & Vector Palette */}
            <g transform="translate(620, 200)">
              {/* 3 Isometric Brand Identity Swatch Cards */}
              <g transform="rotate(-12)">
                <rect x="-40" y="-30" width="60" height="40" rx="4" fill="#00f090" stroke="#ffffff" strokeWidth="1" />
                <rect x="-40" y="-6" width="60" height="16" fill="#ffffff" />
                <text x="-34" y="5" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="bold">#00F090</text>
              </g>

              <g transform="rotate(8) translate(25, 20)">
                <rect x="-40" y="-30" width="60" height="40" rx="4" fill="#e0115f" stroke="#ffffff" strokeWidth="1" />
                <rect x="-40" y="-6" width="60" height="16" fill="#ffffff" />
                <text x="-34" y="5" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="bold">#E0115F</text>
              </g>

              <g transform="translate(-10, 60)">
                <rect x="-40" y="-30" width="60" height="40" rx="4" fill="#ffaa2a" stroke="#ffffff" strokeWidth="1" />
                <rect x="-40" y="-6" width="60" height="16" fill="#ffffff" />
                <text x="-34" y="5" fill="#000000" fontSize="7" fontFamily="monospace" fontWeight="bold">#FFAA2A</text>
              </g>
            </g>

            {/* Metadata Badges in Corners */}
            <text x="50" y="60" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em">PIPELINE / 03</text>
            <text x="50" y="80" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.05em">VISUAL IDENTITY &amp; BRANDING</text>
            
            <text x="750" y="60" fill="#00f090" fontSize="10" fontFamily="monospace" textAnchor="end" letterSpacing="0.15em">FIGMA / AI / ART DIRECTION</text>
          </g>
        )}

        {/* ================================================================ */}
        {/* CATEGORY 4: WEB DEVELOPMENT                                      */}
        {/* Theme: Browser frame, responsive viewport wireframes, code tree  */}
        {/* ================================================================ */}
        {category === 'web' && (
          <g className="animate-in fade-in duration-500">
            {/* Ambient Aura */}
            <circle cx="320" cy="240" r="150" fill="#00b4d8" opacity="0.06" filter="url(#vector-glow)" />
            <circle cx="620" cy="220" r="130" fill="#00e5c0" opacity="0.05" filter="url(#vector-glow)" />

            {/* Continuous Flowing Spine (Enters at y=240, Loops back to y=240) */}
            <path
              d="M 0 240 C 140 300, 250 170, 400 240 C 550 310, 680 180, 800 240"
              stroke="url(#flow-gradient-web)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#soft-glow)"
            />
            {/* Code Syntax Connecting Data Lines */}
            <path
              d="M 0 225 C 140 285, 250 155, 400 225 C 550 295, 680 165, 800 225"
              stroke="rgba(0,180,216,0.45)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              fill="none"
            />
            <path
              d="M 0 255 C 140 315, 250 185, 400 255 C 550 325, 680 195, 800 255"
              stroke="rgba(0,229,192,0.4)"
              strokeWidth="1.5"
              strokeDasharray="10 4"
              fill="none"
            />

            {/* Left Sector: Modern Browser Window Frame with Wireframe Layout */}
            <g transform="translate(180, 185)">
              {/* Window Container */}
              <rect x="-95" y="-45" width="190" height="120" rx="8" fill="#080910" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              
              {/* Window Title Bar */}
              <rect x="-95" y="-45" width="190" height="22" rx="8" fill="rgba(255,255,255,0.04)" />
              <circle cx="-82" cy="-34" r="3" fill="#ff5f56" />
              <circle cx="-73" cy="-34" r="3" fill="#ffbd2e" />
              <circle cx="-64" cy="-34" r="3" fill="#27c93f" />
              <rect x="-45" y="-39" width="100" height="10" rx="3" fill="rgba(255,255,255,0.08)" />

              {/* Wireframe Hero UI Section inside window */}
              <rect x="-80" y="-12" width="70" height="14" rx="2" fill="rgba(0,229,192,0.4)" />
              <rect x="-80" y="8" width="100" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="-80" y="18" width="80" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
              <rect x="25" y="-12" width="55" height="42" rx="4" fill="rgba(0,180,216,0.15)" stroke="#00b4d8" strokeWidth="1" />
              <polygon points="48,5 58,11 48,17" fill="#00e5c0" />

              {/* Responsive Device Mini Frame */}
              <rect x="50" y="24" width="32" height="45" rx="3" fill="#050608" stroke="#00e5c0" strokeWidth="1" />
              <rect x="54" y="30" width="24" height="6" rx="1" fill="rgba(255,255,255,0.3)" />
              <circle cx="66" cy="64" r="1.5" fill="#ffffff" />
            </g>

            {/* Center-Right Sector: Interactive Code Node Matrix */}
            <g transform="translate(480, 170)">
              {/* Code Box */}
              <rect x="-120" y="-35" width="240" height="110" rx="8" fill="#060810" stroke="rgba(0,180,216,0.3)" strokeWidth="1" />
              
              {/* Code Lines with Syntax Highlighting Colors */}
              <text x="-105" y="-12" fill="#00e5c0" fontSize="11" fontFamily="monospace">const canvas = new WebGL();</text>
              <text x="-105" y="8" fill="#ffaa2a" fontSize="11" fontFamily="monospace">gsap.to(&apos;.mesh-aura&apos;, &#123;</text>
              <text x="-90" y="28" fill="#00b4d8" fontSize="11" fontFamily="monospace">fps: 60, ease: &apos;expo.out&apos;</text>
              <text x="-105" y="48" fill="#ffaa2a" fontSize="11" fontFamily="monospace">&#125;);</text>

              {/* Pulsing Connective Node Points */}
              <circle cx="95" cy="5" r="5" fill="#00e5c0" filter="url(#soft-glow)" />
              <circle cx="95" cy="5" r="2" fill="#ffffff" />
              <line x1="95" y1="5" x2="140" y2="5" stroke="#00e5c0" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* Rightmost Floating Tech Badge */}
            <g transform="translate(680, 220)">
              <rect x="-40" y="-30" width="80" height="60" rx="8" fill="rgba(0,229,192,0.06)" stroke="rgba(0,229,192,0.3)" strokeWidth="1" />
              <text x="0" y="-10" fill="#00e5c0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">NEXT.JS</text>
              <text x="0" y="6" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">REACT 19</text>
              <text x="0" y="20" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace" textAnchor="middle">TYPESCRIPT</text>
            </g>

            {/* Metadata Badges in Corners */}
            <text x="50" y="60" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace" letterSpacing="0.2em">PIPELINE / 04</text>
            <text x="50" y="80" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.05em">CREATIVE WEB &amp; ARCHITECTURE</text>
            
            <text x="750" y="60" fill="#00b4d8" fontSize="10" fontFamily="monospace" textAnchor="end" letterSpacing="0.15em">NEXT.JS / TS / TAILWIND / GSAP</text>
          </g>
        )}

        {/* Global Connecting Flow Anchor Nodes (Left x=0, y=240 | Right x=800, y=240) */}
        {/* These physically connect all choices together seamlessly ("nyambung per pilihan") */}
        <circle cx="0" cy="240" r="5" fill="#00e5c0" />
        <circle cx="800" cy="240" r="5" fill="#00e5c0" />
      </svg>
    </div>
  );
};

export default CategoryVectorShowcase;
