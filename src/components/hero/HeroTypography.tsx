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
  const isHeroInView = useRef(true);
  const heroSectionRef = useRef<HTMLElement>(null);

  // 1. Intersection Observer: Hentikan rotasi saat Hero keluar layar
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Rotasi kata dinamis setiap 2.5 detik
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
      {/* ======================================================== */}
      {/* 1. CENTER STAGGERED TYPOGRAPHY (1:1 PURRWEB DRIBBBLE)     */}
      {/* Fully selectable, copy-pasteable, no obstructing circle   */}
      {/* ======================================================== */}
      <div className="relative my-auto w-full max-w-7xl mx-auto py-6 sm:py-8 px-2 sm:px-8 z-10 flex flex-col justify-center">
        <div className="relative w-full flex flex-col justify-center">
          
          {/* Baris 1: Creative + dynamic_word */}
          <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-7">
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
            className="w-full flex items-baseline leading-[0.95] pl-[clamp(1.2rem,6vw,2.5rem)] sm:pl-[clamp(2.5rem,11vw,13rem)]"
          >
            <span 
              className="font-sans font-medium text-[#F3F4F6] tracking-[-0.03em] text-[clamp(2.4rem,11.5vw,4.2rem)] sm:text-[clamp(4.2rem,10vw,9.5rem)] select-text"
            >
              designer
            </span>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BOTTOM ROW: METADATA 2-KOLOM (KIRI) & SCROLL LINE (KANAN) */}
      {/* ======================================================== */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 pb-4 z-10 font-mono">
        
        {/* Kiri Bawah: 2 Kolom Sejajar dengan Grid Atas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 text-[10px] tracking-wider uppercase select-text">
          {/* Kolom 1 */}
          <div className="flex flex-col">
            <span className="font-bold text-white leading-relaxed">
              {t.hero.specializations}
            </span>
            <span className="text-white/50 mt-3 font-normal">
              {t.hero.availability}
            </span>
          </div>

          {/* Kolom 2 */}
          <div className="flex flex-col">
            <span className="font-bold text-white leading-relaxed">
              {t.hero.location}
            </span>
            <span className="text-white/50 mt-3 font-normal">
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
