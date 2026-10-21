'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCategory } from '@/types/portfolio';
import { ArrowRight } from 'lucide-react';
import { CategoryVectorShowcase } from './CategoryVectorShowcase';

interface CategoryCardStackProps {
  onSelectCategory?: (category: ProjectCategory) => void;
  initialIndex?: number;
}

interface ShowcaseCard {
  id: ProjectCategory;
  title: string;
  nextPeek: string;
  route: string;
  type: 'video' | 'mockup' | 'image';
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
}

const showcaseCards: ShowcaseCard[] = [
  {
    id: 'motion-graphics',
    title: 'MOTION GRAPHICS',
    nextPeek: 'VIDEO EDITING',
    route: '/work/motion-graphics',
    type: 'video',
    videoUrl: 'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
    posterUrl: 'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
  },
  {
    id: 'video-editing',
    title: 'VIDEO EDITING',
    nextPeek: 'VISUAL DESIGN',
    route: '/work/video-editing',
    type: 'video',
    videoUrl: 'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
    posterUrl: 'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
  },
  {
    id: 'visual-design',
    title: 'VISUAL DESIGN',
    nextPeek: 'WEB DEVELOPMENT',
    route: '/work/visual-design',
    type: 'mockup',
    imageUrl: 'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
  },
  {
    id: 'web',
    title: 'WEB DEVELOPMENT',
    nextPeek: 'MOTION GRAPHICS',
    route: '/work/web',
    type: 'mockup',
    imageUrl: 'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
  },
];

export const CategoryCardStack: React.FC<CategoryCardStackProps> = ({ 
  onSelectCategory,
  initialIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
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

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[620px] flex flex-col items-end select-none">
      {/* ======================================================== */}
      {/* 1. STACKED CARDS CONTAINER (1:1 Frame t9.0s & t11.0s)    */}
      {/* ======================================================== */}
      <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px]">
        {showcaseCards.map((card, idx) => {
          // Calculate relative position to active card
          const count = showcaseCards.length;
          const pos = (idx - activeIndex + count) % count;
          const isFront = pos === 0;

          // Transforms matching Purrweb perspective:
          // Front card: scale(1), translateY(0), sharp
          // Back cards: elevated translateY(-28px, -54px, -78px), scale(0.95, 0.90, 0.85), blur(4px, 8px, 12px)
          const translateY = isFront ? 0 : pos === 1 ? -28 : pos === 2 ? -54 : -78;
          const scale = isFront ? 1 : pos === 1 ? 0.95 : pos === 2 ? 0.90 : 0.85;
          const blurAmount = isFront ? 0 : pos === 1 ? 4 : pos === 2 ? 8 : 12;
          const opacity = isFront ? 1 : pos === 1 ? 0.8 : pos === 2 ? 0.5 : 0.25;
          const zIndex = isFront ? 40 : pos === 1 ? 30 : pos === 2 ? 20 : 10;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-black p-6 sm:p-8 pb-0 sm:pb-0 flex flex-col justify-between shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer"
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                filter: `blur(${blurAmount}px)`,
                opacity: opacity,
                zIndex: zIndex,
                transformOrigin: 'bottom center',
                willChange: 'transform, filter, opacity',
              }}
            >
              {/* --- CARD HEADER (1:1 with reference) --- */}
              {/* Category Name ────── Horizontal Line ────── Next Peek Name */}
              <div className="relative z-20 flex items-center justify-between gap-4 font-sans">
                <span className="font-extrabold text-white text-lg sm:text-2xl tracking-tight">
                  {card.title}
                </span>

                <div className="flex-1 h-[1px] bg-white/20 mx-2 hidden sm:block" />

                <span className="text-white/40 text-xs sm:text-sm font-medium tracking-wider hidden sm:block">
                  {card.nextPeek}
                </span>
              </div>

              {/* --- CIRCULAR ARROW ACTION BUTTON (1:1 with reference) --- */}
              <div className="relative z-20 mt-4">
                <Link
                  href={card.route}
                  onClick={(e) => {
                    if (!isFront) {
                      e.preventDefault();
                      handleCardClick(idx);
                    } else if (onSelectCategory) {
                      onSelectCategory(card.id);
                    }
                  }}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 group/btn"
                  title={`Open ${card.title}`}
                  aria-label={`Open ${card.title}`}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* --- CARD MEDIA SHOWCASE BODY (1:1 with reference: full bar, bleeds to bottom edge) --- */}
              <div className="relative w-full flex-1 -mx-6 sm:-mx-8 overflow-hidden flex items-end justify-center">
                <CategoryVectorShowcase category={card.id} isFront={isFront} />
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
              onClick={() => setActiveIndex(dotIdx)}
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
