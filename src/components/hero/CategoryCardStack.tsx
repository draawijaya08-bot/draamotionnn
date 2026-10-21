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
    route: '/work/motion-graphics',
    type: 'video',
    videoUrl: '/videos/hero/reference-purrweb.mp4',
    posterUrl: '/posters/hero-poster.webp',
  },
  {
    id: 'visual-design',
    title: 'DESIGN GRAPHIC',
    nextPeek: 'AI DEVELOPMENT',
    peekCode: 'AI DEV',
    route: '/work/visual-design',
    type: 'mockup',
  },
  {
    id: 'web',
    title: 'AI DEVELOPMENT',
    nextPeek: 'MOTION GRAPHIC',
    peekCode: 'MOT',
    route: '/work/web',
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
      <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px]">
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
            // Back cards: elevated translateY(-48px, -90px, -128px), scale(0.95, 0.90, 0.85)
            const translateY = isFront ? 0 : pos === 1 ? -48 : pos === 2 ? -90 : -128;
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
              className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-black p-6 sm:p-8 pb-0 sm:pb-0 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer"
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
              <div className="relative z-20 flex items-center justify-between gap-3 sm:gap-4 font-sans overflow-hidden">
                <span className="font-extrabold text-white text-lg sm:text-2xl tracking-tight shrink-0">
                  {card.title}
                </span>

                <div className="flex-1 border-t border-white/40 mx-3 min-w-[20px]" />

                <span className="font-extrabold text-white text-lg sm:text-2xl tracking-tight shrink-0">
                  {card.peekCode || card.nextPeek.substring(0, 3)}
                </span>
              </div>

              {/* --- CIRCULAR ARROW ACTION BUTTON (1:1 with reference) --- */}
              <div className="relative z-20 mt-3 sm:mt-4 flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/50 hover:border-white hover:bg-white hover:text-black text-white flex items-center justify-center shrink-0 transition-all duration-200 group/btn cursor-pointer"
                  title={`Next: ${card.nextPeek}`}
                  aria-label={`Next: ${card.nextPeek}`}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
                </button>
              </div>

              {/* --- CARD MEDIA SHOWCASE BODY (1:1 with reference: full bar, bleeds to bottom edge) --- */}
              <div className="relative w-full flex-1 -mx-6 sm:-mx-8 overflow-hidden flex items-end justify-center">
                {card.type === 'video' ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden pb-3 px-5 sm:px-8">
                    <div className="relative w-full h-[230px] sm:h-[265px] rounded-2xl overflow-hidden border border-white/20 bg-[#08080a] shadow-2xl group/player">
                      <video
                        src={card.videoUrl || '/videos/hero/reference-purrweb.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={card.posterUrl || '/posters/hero-poster.webp'}
                        className="w-full h-full object-cover object-center"
                      >
                        <source src="/videos/hero/reference-purrweb.mp4" type="video/mp4" />
                        <source src="https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4" type="video/mp4" />
                      </video>
                      
                      {/* Subtle Vignette & Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                      {/* Live Motion Status Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-[#00e5c0] animate-pulse" />
                          MOTION GRAPHIC • 60 FPS
                        </span>
                      </div>

                      {/* Bottom Metadata Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px]">
                        <span className="text-white/90 font-medium">INDRA WIJAYA / SHOWREEL</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#00e5c0] border border-white/15">
                          AFTER EFFECTS + 3D
                        </span>
                      </div>
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
      {/* Active dot: cyan pill [#00e5c0], Inactive: circles       */}
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
                  ? 'w-7 h-2 rounded-full bg-[#00e5c0] shadow-[0_0_12px_rgba(0,229,192,0.6)]'
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
