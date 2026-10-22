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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Cached static card center offsets (zero getBoundingClientRect / zero reflow during animation)
  const cardPositionsRef = useRef<number[]>([]);

  // Smooth LERP scrolling physics engine
  const targetScrollX = useRef(0);
  const currentScrollX = useRef(0);
  const isAnimatingLerp = useRef(false);
  const lerpRafId = useRef<number | null>(null);

  // RAF scheduler for native scroll/drag events to guarantee 1 update per screen refresh
  const rafScheduled = useRef(false);

  // Pointer drag velocity & tracking
  const isPointerDown = useRef(false);
  const startPointerX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const pointerVelocity = useRef(0);

  // Measure card horizontal centers statically on mount and window resize
  const measureCardPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    cardPositionsRef.current = itemRefs.current.map((item) => {
      if (!item) return 0;
      const rect = item.getBoundingClientRect();
      return rect.left - containerRect.left + container.scrollLeft + rect.width / 2;
    });
  }, []);

  // Update active pagination dot directly via DOM (zero React re-renders during active scroll)
  const updateActiveDotUI = useCallback((idx: number) => {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      if (i === idx) {
        dot.className =
          'w-6 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.85)] cursor-pointer';
      } else {
        dot.className =
          'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60 cursor-pointer';
      }
    });
  }, []);

  // 120FPS 3D Scrolling Rotation, Curvature & Focus Zoom Engine
  // Pure GPU composite math — Zero forced reflows per frame!
  const updateCurvature = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const halfWidth = containerWidth / 2;
    const currentCenter = scrollLeft + halfWidth;

    const width = window.innerWidth;
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3D Scrolling Rotation & Curvature parameters
    let maxDrop = 34;        // Vertical parabolic curve drop (px)
    let maxRotateY = 18.0;   // 3D Cylinder Yaw Rotation (degrees)
    let maxRotateZ = 3.6;    // Tangent arc tilt (degrees)
    let maxDepthZ = 45;      // 3D Perspective Depth Translation (px)
    let maxZoom = 0.16;      // Focus zoom factor

    if (isReduced) {
      maxDrop = 0;
      maxRotateY = 0;
      maxRotateZ = 0;
      maxDepthZ = 0;
      maxZoom = 0;
    } else if (width < 640) {
      maxDrop = 10;
      maxRotateY = 8.0;
      maxRotateZ = 1.2;
      maxDepthZ = 15;
      maxZoom = 0.08;
    } else if (width < 1024) {
      maxDrop = 22;
      maxRotateY = 13.0;
      maxRotateZ = 2.4;
      maxDepthZ = 30;
      maxZoom = 0.12;
    }

    const baseScale = width < 640 ? 0.94 : 0.90;
    const cardCenters = cardPositionsRef.current;

    let closestIdx = 0;
    let minDistanceToCenter = Infinity;

    for (let idx = 0; idx < cardRefs.current.length; idx++) {
      const card = cardRefs.current[idx];
      if (!card) continue;

      const cardCenter = cardCenters[idx] || 0;
      const distFromCenter = Math.abs(cardCenter - currentCenter);

      if (distFromCenter < minDistanceToCenter) {
        minDistanceToCenter = distFromCenter;
        closestIdx = idx;
      }

      // Normalized distance from center (-1 to 1 across visible viewport)
      const normalized = (cardCenter - currentCenter) / halfWidth;
      const clamped = Math.max(-2, Math.min(2, normalized));

      // Proximity to dead-center: 1 when perfectly centered, 0 when far
      const proximity = Math.max(0, 1 - Math.abs(normalized) * 0.85);

      // 1. Dynamic Focus Zoom (Centermost card scales up to ~1.08x)
      const scale = baseScale + proximity * maxZoom;

      // 2. Parabolic vertical drop along smooth curved arc
      const translateY = (1 - Math.pow(proximity, 1.3)) * maxDrop;

      // 3. 3D Perspective Depth (active card pushes toward camera, edges recess back)
      const translateZ = (proximity - 0.4) * maxDepthZ;

      // 4. SCROLLING ROTATION (3D Cylinder Yaw: rotates cards inward toward center)
      // Cards to left rotate clockwise (+Y), cards to right rotate counter-clockwise (-Y)
      const rotateY = -clamped * maxRotateY * (1 - proximity * 0.4);

      // 5. Tangent rotation following circular trajectory
      const rotateZ = clamped * maxRotateZ * (1 - proximity * 0.6);

      // 6. Z-Index layer ordering (center card always on top)
      const zIndex = Math.round(proximity * 25 + 10);

      // 7. Subtle focus opacity: center is 100%, unfocused sides are 75%
      const opacity = isReduced ? 1 : 0.75 + proximity * 0.25;

      // Apply hardware-accelerated 3D transform directly to GPU
      card.style.transform = `translate3d(0, ${translateY.toFixed(
        2
      )}px, ${translateZ.toFixed(2)}px) scale(${scale.toFixed(
        3
      )}) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`;
      card.style.zIndex = zIndex.toString();
      card.style.opacity = opacity.toFixed(2);

      // 8. Atmospheric white ambient back-glow behind centered card
      const glow = glowRefs.current[idx];
      if (glow) {
        glow.style.opacity = Math.pow(proximity, 2.2).toFixed(2);
      }
    }

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx;
      updateActiveDotUI(closestIdx);
    }
  }, [updateActiveDotUI]);

  // RequestAnimationFrame scheduler for native scroll/drag events
  const scheduleUpdateCurvature = useCallback(() => {
    if (rafScheduled.current) return;
    rafScheduled.current = true;
    requestAnimationFrame(() => {
      rafScheduled.current = false;
      updateCurvature();
    });
  }, [updateCurvature]);

  // Frame-rate independent delta-time LERP animation tick
  const startLerp = useCallback(() => {
    if (isAnimatingLerp.current) return;
    isAnimatingLerp.current = true;

    let lastTime = performance.now();

    const tick = (currentTime: number) => {
      const container = containerRef.current;
      if (!container || isPointerDown.current) {
        isAnimatingLerp.current = false;
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const target = Math.max(0, Math.min(maxScroll, targetScrollX.current));
      const current = currentScrollX.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.35) {
        // Silky smooth exponential damping (identical on 60Hz, 120Hz, 144Hz)
        const factor = 1 - Math.exp(-15 * dt);
        currentScrollX.current += diff * factor;
        container.scrollLeft = currentScrollX.current;
        updateCurvature();
        lerpRafId.current = requestAnimationFrame(tick);
      } else {
        currentScrollX.current = target;
        container.scrollLeft = target;
        updateCurvature();
        isAnimatingLerp.current = false;
        setActiveIndex(activeIndexRef.current);
      }
    };

    lerpRafId.current = requestAnimationFrame(tick);
  }, [updateCurvature]);

  // Smooth scroll a specific card dead-center into focus using LERP
  const scrollToCard = useCallback(
    (idx: number) => {
      const container = containerRef.current;
      if (!container) return;

      const cardCenters = cardPositionsRef.current;
      const cardCenter = cardCenters[idx] || 0;

      const target = cardCenter - container.clientWidth / 2;
      const maxScroll = container.scrollWidth - container.clientWidth;
      targetScrollX.current = Math.max(0, Math.min(maxScroll, target));
      currentScrollX.current = container.scrollLeft;

      startLerp();
      activeIndexRef.current = idx;
      updateActiveDotUI(idx);
    },
    [startLerp, updateActiveDotUI]
  );

  // Snap smoothly to the closest card to center
  const snapToNearestCard = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentCenter = container.scrollLeft + container.clientWidth / 2;
    const cardCenters = cardPositionsRef.current;

    let closestIdx = 0;
    let minDiff = Infinity;

    cardCenters.forEach((center, idx) => {
      const diff = Math.abs(center - currentCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    scrollToCard(closestIdx);
  }, [scrollToCard]);

  // Setup listeners and initial layout
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      measureCardPositions();
      updateCurvature();
    };

    const handleNativeScroll = () => {
      if (!isAnimatingLerp.current && !isPointerDown.current) {
        currentScrollX.current = container.scrollLeft;
        targetScrollX.current = container.scrollLeft;
        scheduleUpdateCurvature();
      }
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('scroll', handleNativeScroll, { passive: true });

    // Initial smooth alignment
    const initTimer = setTimeout(() => {
      measureCardPositions();
      scrollToCard(0);
      updateCurvature();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('scroll', handleNativeScroll);
      if (lerpRafId.current) cancelAnimationFrame(lerpRafId.current);
      clearTimeout(initTimer);
    };
  }, [measureCardPositions, scheduleUpdateCurvature, scrollToCard, updateCurvature]);

  // Smooth Horizontal Wheel Navigation with Zero-Trapping (Page scroll never gets stuck)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelSnapTimeout: NodeJS.Timeout;
    let consecutiveDownScrolls = 0;
    let consecutiveUpScrolls = 0;
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const timeSinceLast = now - lastWheelTime;
      lastWheelTime = now;

      // Reset consecutive counter after a 450ms pause
      if (timeSinceLast > 450) {
        consecutiveDownScrolls = 0;
        consecutiveUpScrolls = 0;
      }

      // 1. Explicit Horizontal Trackpad Gesture or Shift + Wheel
      const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (isHorizontalGesture) {
        const delta = e.shiftKey ? e.deltaY : e.deltaX;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const current = container.scrollLeft;
        const isAtStart = current <= 4 && delta < 0;
        const isAtEnd = current >= maxScroll - 4 && delta > 0;

        if (!isAtStart && !isAtEnd) {
          e.preventDefault();
          if (!isAnimatingLerp.current) {
            currentScrollX.current = container.scrollLeft;
            targetScrollX.current = container.scrollLeft;
          }
          targetScrollX.current = Math.max(0, Math.min(maxScroll, targetScrollX.current + delta * 0.95));
          startLerp();
          clearTimeout(wheelSnapTimeout);
          wheelSnapTimeout = setTimeout(() => { snapToNearestCard(); }, 260);
        }
        return;
      }

      // 2. Standard Vertical Mouse Wheel:
      // Slide horizontal cards smoothly, but NEVER trap the user when scrolling down to Contact!
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        consecutiveDownScrolls++;
        consecutiveUpScrolls = 0;

        // On first downward scroll, advance 1 card into view
        // If user continues scrolling down (consecutive >= 2) or already at last card, NEVER intercept -> let page scroll to Contact!
        if (consecutiveDownScrolls <= 1 && activeIndexRef.current < projectsDataset.length - 1) {
          e.preventDefault();
          scrollToCard(activeIndexRef.current + 1);
        } else {
          // Allow page vertical scroll to proceed freely and naturally down to Contact!
        }
      } else if (isScrollingUp) {
        consecutiveUpScrolls++;
        consecutiveDownScrolls = 0;

        // On first upward scroll, retreat 1 card into view
        // If user continues scrolling up or already at first card, let page scroll up!
        if (consecutiveUpScrolls <= 1 && activeIndexRef.current > 0) {
          e.preventDefault();
          scrollToCard(activeIndexRef.current - 1);
        } else {
          // Allow page vertical scroll to proceed freely and naturally up!
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelSnapTimeout);
    };
  }, [scrollToCard, snapToNearestCard, startLerp]);

  // Pointer Down (Mouse Drag / Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!containerRef.current) return;

    if (lerpRafId.current) cancelAnimationFrame(lerpRafId.current);
    isAnimatingLerp.current = false;

    isPointerDown.current = true;
    dragDistance.current = 0;
    startPointerX.current = e.clientX;
    startScrollLeft.current = containerRef.current.scrollLeft;
    currentScrollX.current = containerRef.current.scrollLeft;
    targetScrollX.current = containerRef.current.scrollLeft;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    pointerVelocity.current = 0;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // Pointer Move (Mouse Drag) with velocity tracking & RAF throttled updates
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !containerRef.current) return;

    const deltaX = e.clientX - startPointerX.current;
    dragDistance.current = Math.abs(deltaX);

    if (dragDistance.current > 4 && !isDragging) {
      setIsDragging(true);
    }

    const now = performance.now();
    const dt = now - lastPointerTime.current;
    if (dt > 8) {
      pointerVelocity.current = (e.clientX - lastPointerX.current) / dt;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
    }

    const nextScroll = startScrollLeft.current - deltaX;
    containerRef.current.scrollLeft = nextScroll;
    currentScrollX.current = nextScroll;
    targetScrollX.current = nextScroll;

    scheduleUpdateCurvature();
  };

  // Pointer Up / Cancel with momentum glide
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const didDragSignificantly = dragDistance.current > 10;
    const velocity = pointerVelocity.current;

    setTimeout(() => {
      setIsDragging(false);
      dragDistance.current = 0;
    }, 50);

    // If user threw with momentum (flick gesture)
    if (didDragSignificantly && Math.abs(velocity) > 0.16 && containerRef.current) {
      const container = containerRef.current;
      const momentumDistance = velocity * 300;
      const projectedCenter =
        container.scrollLeft - momentumDistance + container.clientWidth / 2;
      const cardCenters = cardPositionsRef.current;

      let targetIdx = 0;
      let minDiff = Infinity;
      cardCenters.forEach((center, idx) => {
        const diff = Math.abs(center - projectedCenter);
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
      className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-24 md:py-36 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="space-y-2.5 sm:space-y-4 max-w-2xl select-none">
          <p className="text-[11px] font-mono tracking-[0.25em] text-[#7db4ff] uppercase">
            {t.slide3.eyebrow || 'THE PLAYBOOK'}
          </p>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-[-0.03em] leading-[1.1]">
            {t.slide3.title || 'Project Exploration'}
          </h2>
          <p className="text-sm sm:text-base text-[#8e8e93] font-normal leading-relaxed">
            {t.slide3.subtitle ||
              'A curated selection of motion graphics, visual identities, and creative engineering.'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 3D ROTATION & LIQUID-SMOOTH CURVED FOCUS CAROUSEL        */}
        {/* ======================================================== */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`relative w-full overflow-x-auto no-scrollbar select-none py-8 sm:py-10 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            perspective: '1400px',
          }}
        >
          {/* Subtle horizontal track ambient backlight glow */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-48 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-3xl pointer-events-none" />

          <div
            className="flex flex-nowrap items-end gap-6 sm:gap-10 lg:gap-12 w-max px-[20vw] sm:px-[25vw] lg:px-[30vw] py-12"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projectsDataset.map((project, idx) => {
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`flex-shrink-0 ${getCardWidthClass(project.media.aspectRatio)}`}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onClick={() => handleCardClick(idx)}
                    onDragStart={(e) => e.preventDefault()}
                    className="group relative rounded-3xl p-1 sm:p-1.5 cursor-pointer"
                    style={{
                      willChange: 'transform, opacity',
                      transformStyle: 'preserve-3d',
                      transformOrigin: '50% 50%',
                      backfaceVisibility: 'hidden',
                    }}
                    aria-label={`Project: ${project.title}`}
                  >
                    {/* Atmospheric subtle white back-glow behind centered card */}
                    <div
                      ref={(el) => {
                        glowRefs.current[idx] = el;
                      }}
                      className="absolute -inset-6 sm:-inset-10 -z-10 rounded-[40px] bg-white/[0.13] blur-2xl pointer-events-none"
                      style={{ opacity: 0, willChange: 'opacity' }}
                    />

                    {/* Visual Card: Preserves Native Aspect Ratio Without Forcing 16:9 or Cropping */}
                    <div
                      className={`relative w-full ${getMediaAspectClass(
                        project.media.aspectRatio
                      )} overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0c0d12] shadow-2xl transition-colors duration-300 group-hover:border-white/35`}
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
            onClick={() => scrollToCard(Math.max(0, activeIndexRef.current - 1))}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Pagination Dots */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md shadow-lg">
            {projectsDataset.map((_, dotIdx) => {
              const isActive = activeIndex === dotIdx;
              return (
                <button
                  key={dotIdx}
                  ref={(el) => {
                    dotRefs.current[dotIdx] = el;
                  }}
                  type="button"
                  onClick={() => scrollToCard(dotIdx)}
                  className={`cursor-pointer ${
                    isActive
                      ? 'w-6 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.85)]'
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
              scrollToCard(
                Math.min(projectsDataset.length - 1, activeIndexRef.current + 1)
              )
            }
            className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
