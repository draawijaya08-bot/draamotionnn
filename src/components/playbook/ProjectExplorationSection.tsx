'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { projectsDataset } from '@/data/portfolio-data';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectExplorationSection: React.FC = () => {
  const { locale } = useLanguageStore();
  const t = translations[locale];

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Drag-to-scroll & momentum physics state
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const pointerVelocity = useRef(0);
  const rafId = useRef<number | null>(null);

  // Calculate and apply dynamic zoom, curved arc layout, and white back-glow
  const updateCurvature = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const halfWidth = containerRect.width / 2;

    const width = window.innerWidth;
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive curvature parameters
    let maxDrop = 34;
    let maxRotateZ = 3.8;
    let maxRotateY = 4.5;
    let maxZoom = 0.16; // 1.08 max zoom down to 0.90 base

    if (isReduced) {
      maxDrop = 0;
      maxRotateZ = 0;
      maxRotateY = 0;
      maxZoom = 0;
    } else if (width < 640) {
      maxDrop = 12;
      maxRotateZ = 1.0;
      maxRotateY = 0;
      maxZoom = 0.08;
    } else if (width < 1024) {
      maxDrop = 22;
      maxRotateZ = 2.4;
      maxRotateY = 3.0;
      maxZoom = 0.12;
    }

    let closestIdx = 0;
    let minDistanceToCenter = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distFromCenter = Math.abs(cardCenter - centerX);

      if (distFromCenter < minDistanceToCenter) {
        minDistanceToCenter = distFromCenter;
        closestIdx = idx;
      }

      const normalized = (cardCenter - centerX) / halfWidth;
      const clamped = Math.max(-2, Math.min(2, normalized));

      // Proximity to dead-center: 1 when perfectly centered, 0 when far
      const proximity = Math.max(0, 1 - Math.abs(normalized) * 0.85);

      // 1. Zoom/Scale: focused project enlarges, others shrink
      const baseScale = width < 640 ? 0.94 : 0.90;
      const scale = baseScale + proximity * maxZoom;

      // 2. Parabolic vertical drop along the arc
      const translateY = (1 - Math.pow(proximity, 1.3)) * maxDrop;

      // 3. Tangent rotation
      const rotateZ = clamped * maxRotateZ * (1 - proximity * 0.6);

      // 4. Subtle 3D inward perspective
      const rotateY = -clamped * maxRotateY * (1 - proximity * 0.5);

      // 5. Z-Index to ensure focused card is always on top
      const zIndex = Math.round(proximity * 20 + 10);

      // 6. Subtle opacity: focused is 100%, unfocused is 72%
      const opacity = isReduced ? 1 : 0.72 + proximity * 0.28;

      card.style.transform = `translate3d(0, ${translateY.toFixed(
        2
      )}px, 0) scale(${scale.toFixed(3)}) rotateZ(${rotateZ.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      card.style.zIndex = zIndex.toString();
      card.style.opacity = opacity.toFixed(2);

      // 7. Subtle white back-glow behind the focused card
      const glow = glowRefs.current[idx];
      if (glow) {
        const glowOpacity = Math.pow(proximity, 2.2);
        glow.style.opacity = glowOpacity.toFixed(2);
      }
    });

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx;
      setActiveIndex(closestIdx);
    }
  }, []);

  // Smooth scroll a specific card dead-center into focus
  const scrollToCard = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const card = cardRefs.current[idx];
    if (!card) return;
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const targetScrollLeft = cardCenter - containerWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  // Snap to the closest card to center
  const snapToNearestCard = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const currentCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - currentCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    scrollToCard(closestIdx);
  }, [scrollToCard]);

  // Update curvature on scroll, resize, and initial render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateCurvature);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial update & center first card smoothly
    const initTimer = setTimeout(() => {
      scrollToCard(0);
      updateCurvature();
    }, 150);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(initTimer);
    };
  }, [scrollToCard, updateCurvature]);

  // Smooth mouse-wheel translation with natural edge handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // If user is mostly scrolling vertically on mouse wheel
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 0.8) {
        const isAtStart = container.scrollLeft <= 5 && e.deltaY < 0;
        const isAtEnd =
          container.scrollLeft >= container.scrollWidth - container.clientWidth - 5 &&
          e.deltaY > 0;

        // If not at extremes, smoothly scroll gallery horizontally
        if (!isAtStart && !isAtEnd) {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 0.85;

          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(updateCurvature);

          clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            snapToNearestCard();
          }, 180);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [snapToNearestCard, updateCurvature]);

  // Pointer Down (Mouse / Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!containerRef.current) return;

    isPointerDown.current = true;
    dragDistance.current = 0;
    startX.current = e.clientX;
    startScrollLeft.current = containerRef.current.scrollLeft;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    pointerVelocity.current = 0;

    // Capture pointer to prevent losing drag when moving fast
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // Pointer Move (Mouse Drag) with velocity tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !containerRef.current) return;

    const deltaX = e.clientX - startX.current;
    dragDistance.current = Math.abs(deltaX);

    if (dragDistance.current > 4 && !isDragging) {
      setIsDragging(true);
    }

    // Velocity calculation for momentum
    const now = performance.now();
    const dt = now - lastPointerTime.current;
    if (dt > 8) {
      pointerVelocity.current = (e.clientX - lastPointerX.current) / dt;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
    }

    // Scroll horizontal following pointer
    containerRef.current.scrollLeft = startScrollLeft.current - deltaX;

    // Real-time smooth curve & zoom update during drag
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(updateCurvature);
  };

  // Pointer Up / Cancel / Leave with momentum glide
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const didDragSignificantly = dragDistance.current > 12;
    const velocity = pointerVelocity.current;

    setTimeout(() => {
      setIsDragging(false);
      dragDistance.current = 0;
    }, 50);

    // If user threw/flicked with momentum
    if (didDragSignificantly && Math.abs(velocity) > 0.2 && containerRef.current) {
      const container = containerRef.current;
      const momentumDistance = velocity * 280;
      const projectedCenter =
        container.scrollLeft - momentumDistance + container.clientWidth / 2;

      let targetIdx = 0;
      let minDiff = Infinity;
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(cardCenter - projectedCenter);
        if (diff < minDiff) {
          minDiff = diff;
          targetIdx = idx;
        }
      });

      scrollToCard(targetIdx);
    } else if (didDragSignificantly) {
      snapToNearestCard();
    } else {
      updateCurvature();
    }
  };

  const handleCardClick = (idx: number) => {
    if (dragDistance.current > 6) return;
    scrollToCard(idx);
  };

  const getCardWidthClass = (aspectRatio?: string) => {
    switch (aspectRatio) {
      case '16:9':
        return 'w-[85vw] sm:w-[560px] md:w-[640px] lg:w-[720px]';
      case '1:1':
        return 'w-[75vw] sm:w-[380px] md:w-[420px] lg:w-[460px]';
      case '4:5':
        return 'w-[68vw] sm:w-[320px] md:w-[350px] lg:w-[380px]';
      case '9:16':
        return 'w-[55vw] sm:w-[260px] md:w-[290px] lg:w-[320px]';
      default:
        return 'w-[80vw] sm:w-[480px] md:w-[520px] lg:w-[580px]';
    }
  };

  const getMediaAspectClass = (aspectRatio?: string) => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      case '9:16':
        return 'aspect-[9/16]';
      default:
        return 'aspect-video';
    }
  };

  return (
    <section
      id="section-playbook"
      className="relative min-h-screen px-6 md:px-12 lg:px-16 py-28 md:py-36 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Section Header: Compact label, large heading, one short supporting description */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl select-none">
          <p className="text-[11px] font-mono tracking-[0.25em] text-[#00e5c0] uppercase">
            {t.slide3.eyebrow || 'THE PLAYBOOK'}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-[-0.03em] leading-[1.1]">
            {t.slide3.title || 'Project Exploration'}
          </h2>
          <p className="text-sm sm:text-base text-[#8e8e93] font-normal leading-relaxed">
            {t.slide3.subtitle ||
              'A curated selection of motion graphics, visual identities, and creative engineering.'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* CURVED FOCUS ZOOM HORIZONTAL CAROUSEL                    */}
        {/* (Active Zoom In, Inactive Zoom Out, White Back-Glow)     */}
        {/* ======================================================== */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`relative w-full overflow-x-auto no-scrollbar select-none py-24 -my-24 transition-cursor duration-150 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            perspective: '1200px',
          }}
        >
          {/* Subtle horizontal track ambient backlight glow */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-44 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-3xl pointer-events-none" />

          <div
            className="flex flex-nowrap items-end gap-6 sm:gap-10 lg:gap-12 w-max px-[20vw] sm:px-[25vw] lg:px-[30vw] py-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projectsDataset.map((project, idx) => {
              return (
                <div
                  key={project.id}
                  className={`flex-shrink-0 ${getCardWidthClass(project.media.aspectRatio)}`}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onClick={() => handleCardClick(idx)}
                    onDragStart={(e) => e.preventDefault()}
                    className="group relative rounded-3xl p-1 sm:p-1.5 cursor-pointer transition-[box-shadow,opacity] duration-300"
                    style={{
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d',
                      transformOrigin: '50% 100%',
                    }}
                    aria-label={`Project: ${project.title}`}
                  >
                    {/* Atmospheric subtle white back-glow behind active card */}
                    <div
                      ref={(el) => {
                        glowRefs.current[idx] = el;
                      }}
                      className="absolute -inset-6 sm:-inset-10 -z-10 rounded-[40px] bg-white/[0.14] blur-3xl pointer-events-none transition-opacity duration-300"
                      style={{ opacity: 0 }}
                    />

                    {/* Visual Card: Preserves Native Aspect Ratio Without Forcing 16:9 or Cropping */}
                    <div
                      className={`relative w-full ${getMediaAspectClass(
                        project.media.aspectRatio
                      )} overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0c0d12] shadow-2xl transition-all duration-500 group-hover:border-white/35 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
                    >
                      <div className="w-full h-full transform transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]">
                        <AdaptiveProjectMedia
                          media={project.media}
                          title={project.title}
                          isFeatured={project.featuredInHero}
                          className="w-full h-full !rounded-none !border-none pointer-events-none"
                        />
                      </div>

                      {/* Subtle Cinematic Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SLEEK NAVIGATION CONTROLS & PAGINATION                    */}
        {/* ======================================================== */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pt-2 select-none">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Pagination Dots with Active Count */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md shadow-lg">
            {projectsDataset.map((_, dotIdx) => {
              const isActive = activeIndex === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToCard(dotIdx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-6 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                      : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to project ${dotIdx + 1}`}
                />
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={() =>
              scrollToCard(Math.min(projectsDataset.length - 1, activeIndex + 1))
            }
            disabled={activeIndex === projectsDataset.length - 1}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
