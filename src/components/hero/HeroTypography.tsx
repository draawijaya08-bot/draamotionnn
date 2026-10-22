'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteIdentityData } from '@/data/portfolio-data';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';
import { ArrowDown } from 'lucide-react';

interface HeroTypographyProps {
  onScrollToWorks?: () => void;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ onScrollToWorks }) => {
  const { heroKinetic } = siteIdentityData;
  const { dynamicWords } = heroKinetic;
  const { locale } = useLanguageStore();
  const t = translations[locale];
  const { getLenis } = useSmoothScroll();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const baseTextRef = useRef<HTMLDivElement>(null);
  const outerMaskRef = useRef<HTMLDivElement>(null);
  const innerScaledRef = useRef<HTMLDivElement>(null);
  const glassRingRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useRef(true);

  // 1. Deteksi Perangkat: Mobile vs Desktop / MacBook / Laptop
  useEffect(() => {
    const checkDevice = () => {
      // Desktop / MacBook: memiliki fine pointer (mouse / trackpad) dan layar >= 768px (bukan touch-only phone)
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchOnly = !hasFinePointer && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
      const isDesktop = hasFinePointer && window.innerWidth >= 768 && !isTouchOnly;
      setIsDesktopDevice(isDesktop);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // 2. Intersection Observer: Hentikan tracking & interval saat Hero di-scroll keluar layar
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (outerMaskRef.current) outerMaskRef.current.style.opacity = '0';
          if (glassRingRef.current) glassRingRef.current.style.opacity = '0';
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Rotasi kata dinamis setiap 2.5 detik (hanya saat hero in view)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHeroInView.current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  // 4. Sinkronisasi 1:1 Koordinat Lensa Kaca & Liquify Physics KHUSUS Desktop / MacBook
  const physicsRef = useRef({
    targetX: 0,
    targetY: 0,
    prevTargetX: 0,
    prevTargetY: 0,
    smoothVx: 0,
    smoothVy: 0,
    dragX: 0,
    dragY: 0,
    skewX: 0,
    skewY: 0,
    dispScale: 0,
    isNearby: false,
    isInitialized: false,
  });

  useEffect(() => {
    // Pada perangkat mobile / smartphone, cursor lens dihilangkan sepenuhnya
    if (!isDesktopDevice) {
      if (outerMaskRef.current) outerMaskRef.current.style.opacity = '0';
      if (glassRingRef.current) glassRingRef.current.style.opacity = '0';
      return;
    }

    const container = heroContainerRef.current;
    if (!container) return;

    if (outerMaskRef.current) outerMaskRef.current.style.opacity = '0';
    if (glassRingRef.current) glassRingRef.current.style.opacity = '0';

    let rafId: number | null = null;
    let lastMoveTime = performance.now();

    const radius = 125; // Diameter 250px di desktop/MacBook

    const tick = () => {
      if (!heroContainerRef.current || !isHeroInView.current) {
        rafId = null;
        return;
      }

      const p = physicsRef.current;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const relX = p.targetX - rect.left;
      const relY = p.targetY - rect.top;

      // Instantaneous velocity calculation
      const rawVx = p.targetX - p.prevTargetX;
      const rawVy = p.targetY - p.prevTargetY;
      p.prevTargetX = p.targetX;
      p.prevTargetY = p.targetY;

      // Smooth damped velocity (liquid inertia)
      p.smoothVx += (rawVx - p.smoothVx) * 0.28;
      p.smoothVy += (rawVy - p.smoothVy) * 0.28;

      const speed = Math.hypot(p.smoothVx, p.smoothVy);

      // Viscous edge pull / lag
      const targetDragX = Math.max(-28, Math.min(28, -p.smoothVx * 0.45));
      const targetDragY = Math.max(-20, Math.min(20, -p.smoothVy * 0.35));
      p.dragX += (targetDragX - p.dragX) * 0.22;
      p.dragY += (targetDragY - p.dragY) * 0.22;

      // Liquify skew / angular pull along drag vector
      const targetSkewX = Math.max(-13, Math.min(13, -p.smoothVx * 0.22));
      const targetSkewY = Math.max(-9, Math.min(9, -p.smoothVy * 0.16));
      p.skewX += (targetSkewX - p.skewX) * 0.22;
      p.skewY += (targetSkewY - p.skewY) * 0.22;

      // Dynamic convex liquid expansion
      const dynamicScale = 1.0 + Math.min(speed * 0.002, 0.05);

      // SVG liquify displacement turbulence scale
      const targetDisp = Math.min(speed * 0.45, 12);
      p.dispScale += (targetDisp - p.dispScale) * 0.25;

      // 1. Mask Layer: clipped to circle, transparent background
      if (outerMaskRef.current) {
        outerMaskRef.current.style.clipPath = `circle(${radius}px at ${relX}px ${relY}px)`;
        outerMaskRef.current.style.setProperty('-webkit-clip-path', `circle(${radius}px at ${relX}px ${relY}px)`);
        outerMaskRef.current.style.maskImage = 'none';
        outerMaskRef.current.style.setProperty('-webkit-mask-image', 'none');
        outerMaskRef.current.style.background = 'transparent';
        outerMaskRef.current.style.opacity = p.isNearby ? '1' : '0';
      }

      // 2. Inner Scaled Text: exact 1:1 origin, liquify drag & skew
      if (innerScaledRef.current) {
        innerScaledRef.current.style.transformOrigin = `${relX}px ${relY}px`;
        innerScaledRef.current.style.transform = `translate3d(${p.dragX.toFixed(2)}px, ${p.dragY.toFixed(2)}px, 0) scale(${dynamicScale.toFixed(3)}) skewX(${p.skewX.toFixed(2)}deg) skewY(${p.skewY.toFixed(2)}deg)`;
      }

      // 3. Dynamic SVG Displacement Ripple
      const dispEl = document.getElementById('hero-liquify-disp');
      if (dispEl) {
        dispEl.setAttribute('scale', p.dispScale.toFixed(1));
      }

      // 4. Concentric Glass Ring with surface tension squish
      if (glassRingRef.current) {
        const ringSquishX = 1 + Math.min(Math.abs(p.smoothVx) * 0.0015, 0.06);
        const ringSquishY = 1 + Math.min(Math.abs(p.smoothVy) * 0.0015, 0.06);
        glassRingRef.current.style.transform = `translate3d(${relX - radius}px, ${relY - radius}px, 0) scale(${ringSquishX.toFixed(3)}, ${ringSquishY.toFixed(3)})`;
        glassRingRef.current.style.opacity = p.isNearby ? '1' : '0';
      }

      // Keep animation frame running while settling down or moving
      const isSettling = 
        speed > 0.06 || 
        Math.abs(p.dragX) > 0.1 || 
        Math.abs(p.skewX) > 0.1 || 
        p.dispScale > 0.1;

      if (isSettling || performance.now() - lastMoveTime < 160) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (!isHeroInView.current || !heroContainerRef.current) return;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const p = physicsRef.current;

      p.targetX = e.clientX;
      p.targetY = e.clientY;

      if (!p.isInitialized) {
        p.prevTargetX = e.clientX;
        p.prevTargetY = e.clientY;
        p.isInitialized = true;
      }

      p.isNearby = 
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100;

      lastMoveTime = performance.now();

      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      if (!isHeroInView.current || !physicsRef.current.isInitialized) return;
      // Saat scrolling, sembunyikan jika pointer berada di luar bounding box hero
      if (heroContainerRef.current) {
        const rect = heroContainerRef.current.getBoundingClientRect();
        const p = physicsRef.current;
        p.isNearby = 
          p.targetX >= rect.left - 100 &&
          p.targetX <= rect.right + 100 &&
          p.targetY >= rect.top - 100 &&
          p.targetY <= rect.bottom + 100;
      }
      lastMoveTime = performance.now();
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseLeave = () => {
      physicsRef.current.isNearby = false;
      if (outerMaskRef.current) outerMaskRef.current.style.opacity = '0';
      if (glassRingRef.current) glassRingRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDesktopDevice]);

  const activeWord = dynamicWords[currentIndex];

  const handleScrollClick = () => {
    if (onScrollToWorks) {
      onScrollToWorks();
    } else {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo('#section-works', { duration: 1.1 });
      } else {
        const el = document.getElementById('section-works');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={heroSectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-16 md:py-8 pt-24 sm:pt-28 md:pt-36 overflow-hidden bg-transparent"
    >
      {/* SVG Liquify Displacement Filter (Hardware Accelerated) - Hanya aktif jika di Desktop/MacBook */}
      {isDesktopDevice && (
        <svg className="absolute w-0 h-0 pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="hero-liquify-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="1" result="noise" />
              <feDisplacementMap id="hero-liquify-disp" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
      
      {/* ======================================================== */}
      {/* 1. CENTER STAGGERED TYPOGRAPHY (1:1 PURRWEB DRIBBBLE)     */}
      {/* Mobile: Tampil Clean & Tajam tanpa hambatan scroll jari    */}
      {/* Desktop / MacBook: Dilengkapi Optical Glass Cursor Lens   */}
      {/* ======================================================== */}
      <div className="relative my-auto w-full max-w-7xl mx-auto py-6 sm:py-8 px-2 sm:px-8 z-10 flex flex-col justify-center">
        {/* Master Coordinate Container */}
        <div 
          ref={heroContainerRef}
          className="relative w-full flex flex-col justify-center"
        >
          {/* --- LAYER A: Base Headline (Normal Scale, Fully Selectable & Copyable on ALL devices) --- */}
          <div ref={baseTextRef} className="relative z-10 w-full select-text">
            {/* Baris 1: Creative + dynamic_word */}
            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-7 select-text">
              <span 
                className="font-sans font-medium text-[#F3F4F6] tracking-[-0.03em] leading-[0.95] text-[clamp(2.4rem,11.5vw,4.2rem)] sm:text-[clamp(4.2rem,10vw,9.5rem)] select-text"
              >
                Creative
              </span>
              <span 
                className={`font-[family-name:var(--font-serif)] italic text-[#E68A1E] leading-none transition-all duration-300 transform text-[clamp(1.8rem,8.5vw,3rem)] sm:text-[clamp(3rem,6.5vw,6rem)] select-text ${
                  isTransitioning ? 'opacity-0 translate-y-3 blur-xs' : 'opacity-100 translate-y-0 blur-none'
                }`}
              >
                {activeWord}
              </span>
            </div>

            {/* Baris 2: designer */}
            <div 
              className="w-full flex items-baseline leading-[0.95] pl-[clamp(1.2rem,6vw,2.5rem)] sm:pl-[clamp(2.5rem,11vw,13rem)] select-text"
            >
              <span 
                className="font-sans font-medium text-[#F3F4F6] tracking-[-0.03em] text-[clamp(2.4rem,11.5vw,4.2rem)] sm:text-[clamp(4.2rem,10vw,9.5rem)] select-text"
              >
                designer
              </span>
            </div>
          </div>

          {/* --- LAYER B1: Outer Mask Wrapper (KHUSUS Desktop / MacBook - Hidden on Mobile) --- */}
          {isDesktopDevice && (
            <div 
              ref={outerMaskRef}
              className="hidden md:block absolute inset-0 pointer-events-none select-none z-20 transition-opacity duration-200"
              style={{
                clipPath: 'circle(125px at 50% 50%)',
                WebkitClipPath: 'circle(125px at 50% 50%)',
                willChange: 'clip-path, transform',
                opacity: 0,
              }}
            >
              {/* --- LAYER B2: Inner Scaled Text Wrapper with Liquify Edge Pull & Chromatic Glow --- */}
              <div
                ref={innerScaledRef}
                className="relative w-full flex flex-col justify-center pointer-events-none select-none"
                style={{
                  textShadow:
                    '-6px -2px 14px rgba(40, 190, 255, 0.95), 6px 2px 14px rgba(255, 120, 30, 0.95), -3px -1px 8px rgba(70, 220, 255, 0.75), 3px 1px 8px rgba(255, 140, 40, 0.75), 0px 0px 18px rgba(255, 255, 255, 0.45)',
                  filter: 'url(#hero-liquify-filter) blur(1.8px) contrast(1.08)',
                  willChange: 'transform',
                }}
              >
                {/* Baris 1 Magnified & Aligned */}
                <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-7">
                  <span 
                    className="font-sans font-medium text-white tracking-[-0.03em] leading-[0.95] text-[clamp(2.4rem,11.5vw,4.2rem)] sm:text-[clamp(4.2rem,10vw,9.5rem)]"
                  >
                    Creative
                  </span>
                  <span 
                    className={`font-[family-name:var(--font-serif)] italic text-[#E68A1E] leading-none transition-all duration-300 transform text-[clamp(1.8rem,8.5vw,3rem)] sm:text-[clamp(3rem,6.5vw,6rem)] ${
                      isTransitioning ? 'opacity-0 translate-y-3 blur-xs' : 'opacity-100 translate-y-0 blur-none'
                    }`}
                  >
                    {activeWord}
                  </span>
                </div>

                {/* Baris 2 Magnified & Aligned */}
                <div 
                  className="w-full flex items-baseline leading-[0.95] pl-[clamp(1.2rem,6vw,2.5rem)] sm:pl-[clamp(2.5rem,11vw,13rem)]"
                >
                  <span 
                    className="font-sans font-medium text-white tracking-[-0.03em] text-[clamp(2.4rem,11.5vw,4.2rem)] sm:text-[clamp(4.2rem,10vw,9.5rem)]"
                  >
                    designer
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* --- LAYER C: Synchronized Pure Optical Glass Ring (KHUSUS Desktop / MacBook - Hidden on Mobile) --- */}
          {isDesktopDevice && (
            <div
              ref={glassRingRef}
              className="hidden md:block absolute top-0 left-0 rounded-full pointer-events-none select-none z-30 transition-opacity duration-200 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]"
              style={{
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, rgba(56, 189, 248, 0.05) 70%, rgba(255, 255, 255, 0.08) 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.38)',
                boxShadow: 'inset 0 0 25px rgba(255, 255, 255, 0.22), inset 0 0 45px rgba(56, 189, 248, 0.12)',
                backdropFilter: 'blur(1px)',
                willChange: 'transform',
              }}
            />
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BOTTOM ROW: METADATA 2-KOLOM (KIRI) & SCROLL LINE (KANAN) */}
      {/* ======================================================== */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 pb-4 z-10 font-mono">
        
        {/* Kiri Bawah: 2 Kolom Sejajar dengan Grid Atas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 text-[10px] tracking-wider uppercase select-text">
          {/* Kolom 1 */}
          <div className="flex flex-col select-text">
            <span className="font-bold text-white leading-relaxed select-text">
              {t.hero.specializations}
            </span>
            <span className="text-white/50 mt-3 font-normal select-text">
              {t.hero.availability}
            </span>
          </div>

          {/* Kolom 2 */}
          <div className="flex flex-col select-text">
            <span className="font-bold text-white leading-relaxed select-text">
              {t.hero.location}
            </span>
            <span className="text-white/50 mt-3 font-normal select-text">
              AE / PR / PS / AI / TS / REACT / GSAP
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
