'use client';

import React from 'react';

interface AmbientBackgroundProps {
  children?: React.ReactNode;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Obsidian to Midnight Navy Gradient Mesh */}
      <div 
        className="absolute inset-0 bg-[#080808]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(14, 28, 54, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(26, 18, 42, 0.35) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(10, 16, 28, 0.25) 0%, transparent 65%),
            linear-gradient(180deg, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.95) 100%)
          `
        }}
      />

      {/* 2. Ambient Kinetic Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[130px] animate-pulse duration-[9000ms]" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[140px] animate-pulse duration-[12000ms]" />

      {/* 3. Subtle Film Grain & Noise Overlay via SVG Filter */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 4. Fine Blueprint Grid Lines for Precision Aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Optional Child Layers (Dual-Layer Reveal Canvas) */}
      {children}
    </div>
  );
};
