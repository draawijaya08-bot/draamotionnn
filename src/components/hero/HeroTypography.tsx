'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteIdentityData } from '@/data/portfolio-data';
import { ArrowDown } from 'lucide-react';

interface HeroTypographyProps {
  onScrollToWorks?: () => void;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ onScrollToWorks }) => {
  const { heroKinetic } = siteIdentityData;
  const { dynamicWords } = heroKinetic;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const outerMaskRef = useRef<HTMLDivElement>(null);
  const innerScaledRef = useRef<HTMLDivElement>(null);
  const glassRingRef = useRef<HTMLDivElement>(null);

  // Rotasi kata dinamis setiap 2.5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  // Sinkronisasi 1:1 Koordinat Lensa Kaca & Magnifikasi Teks
  useEffect(() => {
    const container = heroContainerRef.current;
    if (!container) return;

    // Posisi inisial di tengah typography
    const initRect = container.getBoundingClientRect();
    const initRelX = initRect.width * 0.48;
    const initRelY = initRect.height * 0.45;

    if (outerMaskRef.current) {
      outerMaskRef.current.style.clipPath = `circle(120px at ${initRelX}px ${initRelY}px)`;
      outerMaskRef.current.style.setProperty('-webkit-clip-path', `circle(120px at ${initRelX}px ${initRelY}px)`);
      outerMaskRef.current.style.opacity = '1';
    }
    if (innerScaledRef.current) {
      innerScaledRef.current.style.transformOrigin = `${initRelX}px ${initRelY}px`;
      innerScaledRef.current.style.transform = 'scale(1.22)';
    }
    if (glassRingRef.current) {
      glassRingRef.current.style.transform = `translate3d(${initRelX - 120}px, ${initRelY - 120}px, 0)`;
      glassRingRef.current.style.opacity = '1';
    }

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (!heroContainerRef.current) return;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Cek apakah kursor berada di dalam / dekat area Hero
      const isNearby = 
        e.clientX >= rect.left - 120 &&
        e.clientX <= rect.right + 120 &&
        e.clientY >= rect.top - 120 &&
        e.clientY <= rect.bottom + 120;

      if (outerMaskRef.current) {
        outerMaskRef.current.style.clipPath = `circle(120px at ${relX}px ${relY}px)`;
        outerMaskRef.current.style.setProperty('-webkit-clip-path', `circle(120px at ${relX}px ${relY}px)`);
        outerMaskRef.current.style.opacity = isNearby ? '1' : '0';
      }

      if (innerScaledRef.current) {
        innerScaledRef.current.style.transformOrigin = `${relX}px ${relY}px`;
        innerScaledRef.current.style.transform = 'scale(1.22)';
      }

      if (glassRingRef.current) {
        glassRingRef.current.style.transform = `translate3d(${relX - 120}px, ${relY - 120}px, 0)`;
        glassRingRef.current.style.opacity = isNearby ? '1' : '0';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  const activeWord = dynamicWords[currentIndex];

  const handleScrollClick = () => {
    if (onScrollToWorks) {
      onScrollToWorks();
    } else {
      const el = document.getElementById('section-works');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 py-6 md:px-16 md:py-8 pt-28 md:pt-36 select-none overflow-hidden bg-transparent">
      
      {/* ======================================================== */}
      {/* 1. CENTER STAGGERED TYPOGRAPHY (1:1 PURRWEB DRIBBBLE)     */}
      {/* ======================================================== */}
      <div 
        ref={heroContainerRef}
        className="relative my-auto w-full max-w-7xl mx-auto py-8 z-10 flex flex-col justify-center"
      >
        
        {/* --- LAYER A: Base Headline (Normal Scale & Crisp White) --- */}
        <div className="relative z-10">
          {/* Baris 1: Creative + dynamic_word */}
          <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-7">
            <span 
              className="font-sans font-medium text-[#F3F4F6] tracking-[-0.03em] leading-[0.95]"
              style={{ fontSize: 'clamp(4.2rem, 10vw, 9.5rem)' }}
            >
              Creative
            </span>
            <span 
              className={`font-[family-name:var(--font-serif)] italic text-[#E68A1E] leading-none transition-all duration-300 transform ${
                isTransitioning ? 'opacity-0 translate-y-3 blur-xs' : 'opacity-100 translate-y-0 blur-none'
              }`}
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}
            >
              {activeWord}
            </span>
          </div>

          {/* Baris 2: designer (Menjorok ke kanan 18vw tepat di bawah Creative) */}
          <div 
            className="w-full flex items-baseline leading-[0.95]"
            style={{ paddingLeft: 'clamp(2.5rem, 18vw, 24rem)' }}
          >
            <span 
              className="font-sans font-medium text-[#F3F4F6] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(4.2rem, 10vw, 9.5rem)' }}
            >
              designer
            </span>
          </div>
        </div>

        {/* --- LAYER B1: Outer Mask Wrapper (NO SCALE HERE to prevent offset) --- */}
        <div 
          ref={outerMaskRef}
          className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden transition-opacity duration-200"
          style={{
            clipPath: 'circle(120px at 50% 50%)',
            WebkitClipPath: 'circle(120px at 50% 50%)',
            willChange: 'clip-path',
          }}
        >
          {/* --- LAYER B2: Inner Scaled Text Wrapper (transformOrigin at exact relX, relY) --- */}
          <div
            ref={innerScaledRef}
            className="w-full h-full flex flex-col justify-center"
            style={{
              transform: 'scale(1.22)',
              transformOrigin: '50% 50%',
              textShadow:
                '-7px -3px 12px rgba(255, 95, 20, 0.9), 7px 3px 12px rgba(30, 165, 255, 0.9), -3px 2px 6px rgba(255, 140, 50, 0.65), 3px -2px 6px rgba(60, 200, 255, 0.65), 0px 0px 20px rgba(255, 255, 255, 0.35)',
              filter: 'blur(2.8px) contrast(1.08)',
              willChange: 'transform',
            }}
          >
            {/* Baris 1 Magnified */}
            <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-7">
              <span 
                className="font-sans font-medium text-white tracking-[-0.03em] leading-[0.95]"
                style={{ fontSize: 'clamp(4.2rem, 10vw, 9.5rem)' }}
              >
                Creative
              </span>
              <span 
                className="font-[family-name:var(--font-serif)] italic text-[#ff9d2e] leading-none"
                style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}
              >
                {activeWord}
              </span>
            </div>

            {/* Baris 2 Magnified */}
            <div 
              className="w-full flex items-baseline leading-[0.95]"
              style={{ paddingLeft: 'clamp(2.5rem, 18vw, 24rem)' }}
            >
              <span 
                className="font-sans font-medium text-white tracking-[-0.03em]"
                style={{ fontSize: 'clamp(4.2rem, 10vw, 9.5rem)' }}
              >
                designer
              </span>
            </div>
          </div>
        </div>

        {/* --- LAYER C: Synchronized Pure Optical Glass Ring --- */}
        <div
          ref={glassRingRef}
          className="absolute top-0 left-0 rounded-full pointer-events-none z-30 transition-opacity duration-200"
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.08) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.08)',
            willChange: 'transform',
          }}
        />

      </div>

      {/* ======================================================== */}
      {/* 2. BOTTOM ROW: METADATA 2-KOLOM (KIRI) & SCROLL LINE (KANAN) */}
      {/* ======================================================== */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 pb-4 z-10 font-mono">
        
        {/* Kiri Bawah: 2 Kolom Sejajar dengan Grid Atas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 text-[10px] tracking-wider uppercase">
          {/* Kolom 1 */}
          <div className="flex flex-col">
            <span className="font-bold text-white leading-relaxed">
              MOTION GRAPHIC / GRAPHIC DESIGN / AI DEVELOPMENT
            </span>
            <span className="text-white/50 mt-3 font-normal">
              CURRENTLY AVAILABLE FOR FREELANCE WORLDWIDE
            </span>
          </div>

          {/* Kolom 2 */}
          <div className="flex flex-col">
            <span className="font-bold text-white leading-relaxed">
              BASED IN INDONESIA
            </span>
            <span className="text-white/50 mt-3 font-normal">
              AE / PR / PS / AI WORKFLOW
            </span>
          </div>
        </div>

        {/* Kanan Bawah: Garis Vertikal 56px dengan Panah ke Bawah & Pulse */}
        <div className="flex items-center self-end sm:self-auto">
          <button
            type="button"
            onClick={handleScrollClick}
            className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
            title="Scroll to Works & Bio"
            aria-label="Scroll to Works & Bio"
          >
            <div 
              className="w-[1px] h-[56px] bg-white/40 group-hover:bg-amber-400 group-hover:h-[64px] transition-all duration-300 animate-pulse"
            />
            <ArrowDown className="w-3.5 h-3.5 text-white/60 group-hover:text-amber-400 group-hover:translate-y-1 transition-all" />
          </button>
        </div>

      </div>

    </section>
  );
};
