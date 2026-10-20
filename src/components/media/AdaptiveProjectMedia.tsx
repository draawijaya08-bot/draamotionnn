'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { AdaptiveMedia } from '@/types/portfolio';
import { Eye, Sparkles, VolumeX } from 'lucide-react';

interface AdaptiveProjectMediaProps {
  media: AdaptiveMedia;
  title: string;
  isActive?: boolean;
  className?: string;
  isFeatured?: boolean;
}

export const AdaptiveProjectMedia: React.FC<AdaptiveProjectMediaProps> = ({
  media,
  title,
  isActive = true,
  className = '',
  isFeatured = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // 1. Viewport Intersection Observer: Hanya play video saat terlihat di layar
  useEffect(() => {
    const el = containerRef.current;
    if (!el || media.type !== 'VIDEO_LOOP') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '120px 0px 120px 0px', // Buffer 120px untuk transisi mulus
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [media.type]);

  // 2. Kontrol pemutaran video hening: HANYA play saat isActive DAN isInView
  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== 'VIDEO_LOOP') return;

    if (isActive && isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: tetap tenang, poster WebP tetap tampil
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isInView, media.type]);

  // Rasio aspek mapping
  const aspectClass =
    media.aspectRatio === '16:9'
      ? 'aspect-video'
      : media.aspectRatio === '9:16'
      ? 'aspect-[9/16]'
      : 'aspect-square';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-[#0a0a0d] border ${
        isFeatured ? 'border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.12)]' : 'border-[#202024]'
      } group ${className}`}
      style={{
        contain: 'paint layout',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* 1. Format Video Loop (Khusus Motion Graphic & AI Video Preview) */}
      {media.type === 'VIDEO_LOOP' && (
        <>
          <video
            ref={videoRef}
            src={media.previewUrl}
            poster={media.fallbackPosterUrl}
            loop
            muted
            playsInline
            preload={isInView ? 'metadata' : 'none'}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          />

          {/* Badge Muted Video Indicator */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[9px] font-mono text-[#8e8e93] pointer-events-none">
            <VolumeX className="w-3 h-3 text-amber-400" />
            <span className="uppercase tracking-wider">SILENT LOOP</span>
          </div>
        </>
      )}

      {/* 2. Format Image Still (Khusus Graphic Design) */}
      {media.type === 'IMAGE_STILL' && (
        <>
          <Image
            src={media.previewUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[9px] font-mono text-[#8e8e93] pointer-events-none">
            <Eye className="w-3 h-3 text-blue-400" />
            <span className="uppercase tracking-wider">HIGH-RES STILL</span>
          </div>
        </>
      )}

      {/* 3. Format Interactive Comparison (Khusus AI Development: RAW vs Synthesized) */}
      {media.type === 'INTERACTIVE_COMPARISON' && (
        <>
          <Image
            src={
              showComparison && media.comparisonSourceBeforeUrl
                ? media.comparisonSourceBeforeUrl
                : media.previewUrl
            }
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
            className="object-cover transition-all duration-300"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowComparison(!showComparison);
            }}
            className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-300 hover:bg-amber-400 hover:text-black transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>{showComparison ? 'SHOW FINAL' : 'SHOW RAW/PROMPT'}</span>
          </button>
        </>
      )}

      {/* Subtle Bottom Gradient Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
    </div>
  );
};
