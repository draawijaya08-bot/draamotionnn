'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCategory } from '@/types/portfolio';
import { ArrowRight } from 'lucide-react';
import { CategoryVectorShowcase } from './CategoryVectorShowcase';

interface CategoryCardStackProps {
  onSelectCategory?: (category: ProjectCategory) => void;
  onCardChange?: (index: number) => void;
  initialIndex?: number;
}

interface ShowcaseCard {
  id: ProjectCategory;
  title: string;
  nextPeek: string;
  peekCode: string;
  route: string;
  type: 'video' | 'mockup' | 'image';
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
}

const showcaseCards: ShowcaseCard[] = [
  {
    id: 'motion-graphics',
    title: 'MOTION GRAPHIC',
    nextPeek: 'DESIGN GRAPHIC',
    peekCode: 'DES',
    route: '/#section-exploration',
    type: 'image',
    imageUrl: '/posters/motion-graphic-banner.png',
    posterUrl: '/posters/motion-graphic-banner.png',
  },
  {
    id: 'visual-design',
    title: 'DESIGN GRAPHIC',
    nextPeek: 'AI DEVELOPMENT',
    peekCode: 'AI DEV',
    route: '/#section-exploration',
    type: 'mockup',
  },
  {
    id: 'web',
    title: 'AI DEVELOPMENT',
    nextPeek: 'MOTION GRAPHIC',
    peekCode: 'MOT',
    route: '/#section-exploration',
    type: 'mockup',
  },
];

export const CategoryCardStack: React.FC<CategoryCardStackProps> = ({ 
  onSelectCategory,
  onCardChange,
  initialIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transitionTo = (newIndex: number) => {
    if (newIndex === activeIndex || exitingIndex !== null) return;
    
    // Set currently active card as exiting to the right (1:1 Frame t9.6s & t9.8s)
    setExitingIndex(activeIndex);
    onCardChange?.(newIndex);

    // After card completes rightward slide, settle new card as active
    setTimeout(() => {
      setActiveIndex(newIndex);
      setExitingIndex(null);
    }, 420);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % showcaseCards.length;
    transitionTo(nextIdx);
  };

  // Auto-slide every 5 seconds when in view and not hovered (1:1 with reference video)
  useEffect(() => {
    if (!isInView || isHovered || exitingIndex !== null) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isInView, isHovered, activeIndex, exitingIndex]);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex && exitingIndex === null) {
      transitionTo(index);
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[620px] flex flex-col items-end select-none"
    >
      {/* ======================================================== */}
      {/* 1. STACKED CARDS CONTAINER (1:1 Frame t9.0s & t11.0s)    */}
      {/* ======================================================== */}
      <div className="relative w-full h-[320px] xs:h-[350px] sm:h-[450px] lg:h-[480px]">
        {showcaseCards.map((card, idx) => {
          // Calculate relative position to active card
          const count = showcaseCards.length;
          const pos = (idx - activeIndex + count) % count;
          const isFront = pos === 0;
          const isExiting = exitingIndex === idx;

          // Transforms matching Purrweb perspective & right-swipe slide:
          let transformStr: string;
          let opacityVal: number;
          let blurVal: number;
          let zIndexVal: number;
          let transitionStr: string;

          if (isExiting) {
            // Outgoing card slides gracefully to the right and down with slight tilt (Frame t9.6s & t9.8s)
            transformStr = 'translate3d(115%, 25px, 0) scale(0.96) rotate(4.5deg)';
            opacityVal = 0;
            blurVal = 2;
            zIndexVal = 50;
            transitionStr = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.4s ease-out, filter 0.4s ease-out';
          } else {
            // Front card: scale(1), translateY(0), sharp
            // Back cards: elevated translateY(-48px, -90px, -128px on desktop, -26px, -48px, -68px on mobile)
            const translateY = isFront 
              ? 0 
              : pos === 1 
                ? (isMobile ? -26 : -48) 
                : pos === 2 
                  ? (isMobile ? -48 : -90) 
                  : (isMobile ? -68 : -128);
            const scale = isFront ? 1 : pos === 1 ? 0.95 : pos === 2 ? 0.90 : 0.85;
            blurVal = isFront ? 0 : pos === 1 ? 2.5 : pos === 2 ? 5.5 : 9;
            opacityVal = isFront ? 1 : pos === 1 ? 0.92 : pos === 2 ? 0.75 : 0.45;
            zIndexVal = isFront ? 40 : pos === 1 ? 30 : pos === 2 ? 20 : 10;
            transformStr = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            transitionStr = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out';
          }

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-black p-4 sm:p-8 pb-0 sm:pb-0 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer"
              style={{
                transform: transformStr,
                filter: `blur(${blurVal}px)`,
                opacity: opacityVal,
                zIndex: zIndexVal,
                transition: transitionStr,
                transformOrigin: 'top center',
                willChange: 'transform, filter, opacity',
              }}
            >
              {/* --- CARD HEADER (1:1 with reference) --- */}
              {/* Category Name ────── Horizontal Line ────── Next Peek Name (GRA) */}
              <div className="relative z-20 flex items-center justify-between gap-2.5 sm:gap-4 font-sans overflow-hidden">
                <span className="font-extrabold text-white text-base sm:text-2xl tracking-tight shrink-0">
                  {card.title}
                </span>

                <div className="flex-1 border-t border-white/40 mx-2 sm:mx-3 min-w-[14px]" />

                <span className="font-extrabold text-white text-base sm:text-2xl tracking-tight shrink-0">
                  {card.peekCode || card.nextPeek.substring(0, 3)}
                </span>
              </div>

              {/* --- CIRCULAR ARROW ACTION BUTTON (1:1 with reference) --- */}
              <div className="relative z-20 mt-2.5 sm:mt-4 flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/50 hover:border-white hover:bg-white hover:text-black text-white flex items-center justify-center shrink-0 transition-all duration-200 group/btn cursor-pointer"
                  title={`Next: ${card.nextPeek}`}
                  aria-label={`Next: ${card.nextPeek}`}
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
                </button>
              </div>

              {/* --- CARD MEDIA SHOWCASE BODY (1:1 with reference: full bar, bleeds to bottom edge) --- */}
              <div className="relative w-full flex-1 -mx-4 sm:-mx-8 overflow-hidden flex items-end justify-center">
                {card.id === 'motion-graphics' ? (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4">
                    {/* Atmospheric soft teal glow perfectly centered */}
                    <div className="absolute inset-0 m-auto w-[240px] sm:w-[400px] h-[140px] sm:h-[180px] bg-[#2e6bff]/12 blur-3xl pointer-events-none rounded-full" />
                    
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src="/posters/motion-graphic-banner.png"
                        alt="Motion Graphic Workspace"
                        width={740}
                        height={493}
                        priority
                        className="w-auto h-full max-h-[190px] sm:max-h-[285px] object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                ) : (
                  <CategoryVectorShowcase category={card.id} isFront={isFront} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 2. THREE PAGINATION DOTS (1:1 Frame t9.0s & t11.0s)      */}
      {/* Active dot: electric blue pill, Inactive: circles       */}
      {/* ======================================================== */}
      <div className="flex items-center gap-2.5 mt-8 mr-2 z-30">
        {showcaseCards.map((_, dotIdx) => {
          const isActive = activeIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              onClick={() => transitionTo(dotIdx)}
              className={`transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 h-2 rounded-full bg-[#2e6bff] shadow-[0_0_12px_rgba(46,107,255,0.6)]'
                  : 'w-2 h-2 rounded-full border border-white/40 hover:border-white/80'
              }`}
              title={`View slide ${dotIdx + 1}`}
              aria-label={`View slide ${dotIdx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCardStack;
