'use client';

import React, { useState, useRef, useSyncExternalStore } from 'react';
import { heroStackedCategories } from '@/data/portfolio-data';
import { StackedCardCategory, ProjectCategory } from '@/types/portfolio';
import { useCursorStore } from '@/stores/cursorStore';
import { getWhatsAppUrl } from '@/utils/contact-links';
import { MagneticButton } from '@/components/interactive/MagneticButton';
import { ArrowRight, Play, Eye, Sparkles, MessageCircle } from 'lucide-react';

interface CategoryCardStackProps {
  onSelectCategory?: (category: ProjectCategory) => void;
}

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => false;

export const CategoryCardStack: React.FC<CategoryCardStackProps> = ({
  onSelectCategory,
}) => {
  // State urutan kartu dalam tumpukan: [depan, tengah, belakang]
  const [deck, setDeck] = useState<number[]>([0, 1, 2]);
  const [hoveredPos, setHoveredPos] = useState<number | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const { setCursorState } = useCursorStore();

  // Touch swipe gesture refs
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Fungsi memajukan kartu yang diklik ke posisi terdepan (Deck Shuffle)
  const bringToFront = (indexInDeck: number) => {
    if (indexInDeck === 0) return; // Sudah di depan
    setDeck((prevDeck) => {
      const selected = prevDeck[indexInDeck];
      const remaining = prevDeck.filter((_, i) => i !== indexInDeck);
      return [selected, ...remaining];
    });
  };

  // Navigasi via pagination dots
  const selectByOriginalIndex = (origIdx: number) => {
    const pos = deck.indexOf(origIdx);
    if (pos > 0) bringToFront(pos);
  };

  // Touch Swipe Handlers untuk Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    touchStartPos.current = null;

    // Minimum swipe threshold (40px)
    if (Math.abs(dx) > 40 || Math.abs(dy) > 40) {
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe: left to advance, right to cycle backward
        if (dx < 0) {
          bringToFront(1);
        } else {
          bringToFront(2);
        }
      } else {
        // Vertical swipe: up to advance, down to cycle backward
        if (dy < 0) {
          bringToFront(1);
        } else {
          bringToFront(2);
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col items-end select-none">
      {/* 1. Header Telemetri Kanan Bawah */}
      <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[380px] mb-3 text-[11px] font-mono tracking-widest text-[#8e8e93]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-white font-medium">DISCIPLINES STACK</span>
        </div>
        <span className="text-[#56565c] text-[10px] hidden sm:inline">SWIPE / CLICK TO SHUFFLE</span>
      </div>

      {/* 2. Kontainer Tumpukan Kartu Bertingkat (Depth of Field) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-[340px] sm:max-w-[380px] h-[260px] sm:h-[280px] touch-pan-y"
      >
        {deck.map((catIdx, pos) => {
          const card: StackedCardCategory = heroStackedCategories[catIdx];
          const isFront = pos === 0;
          const isMiddle = pos === 1;

          // Pengaturan Depth of Field (Scale, TranslateY, Blur, Opacity, Z-Index)
          let transformStyle = '';
          let filterStyle = '';
          let opacityStyle = 1;
          let zIndexStyle = 30;

          if (isFront) {
            transformStyle = 'translate3d(0, 0, 0) scale(1.0)';
            filterStyle = reducedMotion ? 'none' : 'blur(0px) brightness(1.0)';
            opacityStyle = 1;
            zIndexStyle = 30;
          } else if (isMiddle) {
            const hoverLift = hoveredPos === 1 && !reducedMotion ? -6 : 0;
            transformStyle = `translate3d(0, ${-18 + hoverLift}px, 0) scale(0.92)`;
            filterStyle = reducedMotion ? 'none' : 'blur(6px) brightness(0.7)';
            opacityStyle = 0.85;
            zIndexStyle = 20;
          } else {
            const hoverLift = hoveredPos === 2 && !reducedMotion ? -6 : 0;
            transformStyle = `translate3d(0, ${-36 + hoverLift}px, 0) scale(0.85)`;
            filterStyle = reducedMotion ? 'none' : 'blur(12px) brightness(0.45)';
            opacityStyle = 0.65;
            zIndexStyle = 10;
          }

          return (
            <div
              key={card.category}
              onClick={() => {
                if (!isFront) {
                  bringToFront(pos);
                } else if (onSelectCategory) {
                  onSelectCategory(card.category);
                }
              }}
              onMouseEnter={() => {
                setHoveredPos(pos);
                setCursorState('PROJECT_HOVER', isFront ? 'VIEW' : 'SHUFFLE');
                if (!isFront) {
                  bringToFront(pos);
                }
              }}
              onMouseLeave={() => {
                setHoveredPos(null);
                setCursorState('DEFAULT');
              }}
              className="absolute inset-0 rounded-2xl border border-[#26262b] bg-[#0f0f12]/95 backdrop-blur-2xl p-5 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
              style={{
                transform: transformStyle,
                filter: filterStyle,
                opacity: opacityStyle,
                zIndex: zIndexStyle,
                transformOrigin: 'bottom center',
                willChange: 'transform, filter, opacity',
                transitionDuration: reducedMotion ? '0.05s' : '0.45s',
              }}
            >
              {/* Muted Video Loop Background Preview for Motion Graphic Front Card */}
              {card.category === 'motion-graphic' && isFront && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0 opacity-25">
                  <video
                    src={card.previewVideoUrl || '/videos/projects/hyperdrive-preview.mp4'}
                    poster={card.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-[#0f0f12]/60 to-transparent" />
                </div>
              )}

              {/* Header Kartu */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-[10px] font-mono tracking-widest font-semibold uppercase">
                  {card.accentBadge}
                </span>

                <div className="flex items-center gap-2">
                  {card.category === 'motion-graphic' ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <Play className="w-3 h-3 fill-emerald-400" />
                      <span>60FPS REEL</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-blue-400">
                      <Eye className="w-3 h-3" />
                      <span>HIGH-RES</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Badan Kartu */}
              <div className="relative z-10 space-y-1.5 my-auto">
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-[#8e8e93] leading-relaxed line-clamp-2">
                  {card.tagline}
                </p>
              </div>

              {/* Footer Kartu & Tombol Aksi Melingkar (→) */}
              <div className="relative z-10 pt-3 border-t border-[#202024]/80 flex items-center justify-between">
                <a
                  href={getWhatsAppUrl(card.category)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#8e8e93] hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DIRECT WA</span>
                </a>

                {/* Circular Action Button with Magnetic Hover on Desktop */}
                <MagneticButton strength={0.35}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectCategory) {
                        onSelectCategory(card.category);
                      } else {
                        const el = document.getElementById('playbook');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all flex items-center justify-center text-white cursor-pointer group"
                    title="Explore Deliverables"
                    aria-label={`Explore ${card.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Tiga Titik Indikator Tumpukan (Pagination Dots) */}
      <div className="flex items-center gap-2 mt-4 pr-1">
        {heroStackedCategories.map((item, idx) => {
          const isActive = deck[0] === idx;
          return (
            <button
              key={item.category}
              onClick={() => selectByOriginalIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-7 h-2 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                  : 'w-2 h-2 bg-[#2a2a30] hover:bg-[#383842]'
              }`}
              title={`Switch to ${item.title}`}
              aria-label={`Switch to ${item.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};
