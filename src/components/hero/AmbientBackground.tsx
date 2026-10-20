"use client";

import React, { memo, useEffect, useState } from "react";

/**
 * AmbientBackground - 1:1 Cinematic Reference Recreation
 * Slide 01: Deep Navy Spotlight from upper-right with fine film grain.
 * Slide 02: Rich Chromatic Liquid Aura (cyan, magenta, olive-gold, crimson) matching frames t7.0s & t9.0s.
 */
function AmbientBackgroundComponent() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          // Progress from 0 (Slide 01) to 1 (Slide 02)
          const p = Math.min(Math.max((scrollY - vh * 0.15) / (vh * 0.7), 0), 1);
          setScrollProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden bg-[#050608] pointer-events-none select-none"
      style={{
        contain: 'strict',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* ======================================================== */}
      {/* 1. SLIDE 01: DIAGONAL DEEP NAVY SPOTLIGHT (Frame t0.0s)   */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ opacity: 1 - scrollProgress * 0.8 }}
      >
        {/* Navy Spotlight Beam (From Top-Right down across center) */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[95vw] h-[75vw] rounded-[100%] pointer-events-none"
          style={{
            transform: 'translate3d(0, 0, 0) rotate(-28deg)',
            background: 'radial-gradient(ellipse at 65% 35%, rgba(28, 68, 105, 0.75) 0%, rgba(18, 48, 76, 0.55) 30%, rgba(12, 34, 56, 0.30) 55%, rgba(5, 6, 8, 0) 80%)',
            filter: 'blur(55px)',
            willChange: 'transform',
          }}
        />

        {/* Ambient Dark Navy Fill */}
        <div 
          className="absolute top-[40%] left-[-15%] w-[60vw] h-[60vw] rounded-full pointer-events-none animate-ambient-medium"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(14, 38, 64, 0.45) 0%, rgba(10, 24, 40, 0.25) 50%, rgba(5, 6, 8, 0) 75%)',
            filter: 'blur(50px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. SLIDE 02: CHROMATIC LIQUID AURA (Frames t7.0s & t9.0s) */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ opacity: scrollProgress }}
      >
        {/* Blob A: Cyan / Emerald Glow (Upper-Center & Right) */}
        <div 
          className="absolute top-[-10%] right-[10%] w-[70vw] h-[55vw] rounded-full pointer-events-none animate-ambient-slow"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(0, 185, 155, 0.50) 0%, rgba(0, 120, 105, 0.35) 40%, rgba(5, 6, 8, 0) 75%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />

        {/* Blob B: Magenta / Violet Glow (Mid-Left & Upper-Left) */}
        <div 
          className="absolute top-[15%] left-[-15%] w-[65vw] h-[65vw] rounded-full pointer-events-none animate-ambient-medium"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(145, 18, 85, 0.55) 0%, rgba(95, 12, 55, 0.35) 45%, rgba(5, 6, 8, 0) 80%)',
            filter: 'blur(65px)',
            willChange: 'transform',
          }}
        />

        {/* Blob C: Deep Olive-Gold Glow (Lower-Left) */}
        <div 
          className="absolute bottom-[-15%] left-[5%] w-[60vw] h-[60vw] rounded-full pointer-events-none animate-ambient-fast"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(185, 140, 0, 0.50) 0%, rgba(125, 90, 0, 0.30) 45%, rgba(5, 6, 8, 0) 75%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />

        {/* Blob D: Fiery Crimson Glow (Lower-Right & Bottom-Center) */}
        <div 
          className="absolute bottom-[-20%] right-[15%] w-[65vw] h-[55vw] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(160, 32, 20, 0.40) 0%, rgba(100, 18, 12, 0.25) 50%, rgba(5, 6, 8, 0) 80%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 3. VIGNETTE & FILM GRAIN OVERLAY (Constant Across Slides) */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(5, 6, 8, 0) 30%, rgba(5, 6, 8, 0.70) 100%)',
        }}
      />

      {/* Hardware-Accelerated 1:1 Cinematic Film Grain Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.042] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
        }}
      />
    </div>
  );
}

export const AmbientBackground = memo(AmbientBackgroundComponent);
export default AmbientBackground;
