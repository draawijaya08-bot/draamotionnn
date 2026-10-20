"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050608] pointer-events-none select-none">
      {/* 1. DIAGONAL NAVY SPOTLIGHT ELIPS (Sorotan dari Kanan Atas ke Tengah Layar) */}
      <div 
        className="absolute top-[-25%] right-[-15%] w-[90vw] h-[70vw] rounded-[100%] will-change-transform pointer-events-none"
        style={{
          transform: 'rotate(-28deg)',
          background: 'radial-gradient(ellipse at 65% 35%, rgba(36, 82, 122, 0.65) 0%, rgba(17, 42, 69, 0.45) 50%, rgba(5, 6, 8, 0) 80%)',
          filter: 'blur(110px)',
        }}
      />

      {/* 2. SECONDARY SOFT ACCENT GLOW (Bergerak lambat dari Kiri Tengah) */}
      <div 
        className="absolute top-[35%] left-[-20%] w-[65vw] h-[65vw] rounded-full bg-[#112A45] opacity-[0.40] mix-blend-screen filter blur-[140px] will-change-transform animate-ambient-medium pointer-events-none"
      />

      {/* 3. TERTIARY GLOW (Sorotan halus di area Kartu Kanan Bawah) */}
      <div 
        className="absolute bottom-[-15%] right-[5%] w-[55vw] h-[55vw] rounded-full bg-[#24527A] opacity-[0.35] mix-blend-screen filter blur-[120px] will-change-transform animate-ambient-fast pointer-events-none"
      />

      {/* 4. OVERLAY VIGNETTE (Radial Gradient Halus) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(5,6,8,0)_30%,rgba(5,6,8,0.70)_100%)] pointer-events-none" />

      {/* 5. SVG GRAIN OVERLAY (Tekstur Film Grain Sinematik) */}
      <div className="absolute inset-0 opacity-[0.045] mix-blend-overlay pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="grainNoise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.80" 
              numOctaves="4" 
              stitchTiles="stitch" 
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainNoise)" />
        </svg>
      </div>
    </div>
  );
}

export { AmbientBackground };
