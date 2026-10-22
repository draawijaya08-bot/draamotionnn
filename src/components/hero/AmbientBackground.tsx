"use client";

import React, { memo, useEffect, useState, useRef } from "react";
import { ChromaticWaveCanvas } from "./ChromaticWaveCanvas";

/**
 * AmbientBackground - Kinetic 3D Tactile Velvet Dunes & Fluid Chromatic Wave
 * - 60fps WebGL Fluid S-Curve Gradient Wave (recreating YouTube reference -niUBSx3PKQ)
 * - 3D Tactile Velvet Sand Dunes landscape texture
 * - Living Tactile Grain: Real-time 12fps micro-particle jitter
 * - Full spectrum chromatic flow: Electric Cyan -> Cobalt -> Violet -> Magenta -> Sunset Coral
 * - Interactive cursor-driven fluid ripples and mouse spotlight
 * - Cinematic contrast falloffs for crisp readability
 */
interface AmbientBackgroundProps {
  forceSlide?: 1 | 2 | 3;
}

function AmbientBackgroundComponent({ forceSlide }: AmbientBackgroundProps) {
  const [scrollProgress, setScrollProgress] = useState(forceSlide === 2 ? 1 : 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorSpotlightRef = useRef<HTMLDivElement>(null);

  // 1. Scroll tracking for section transitions
  useEffect(() => {
    if (forceSlide !== undefined) {
      setScrollProgress(forceSlide === 2 ? 1 : 0);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          const p = Math.min(Math.max((scrollY - vh * 0.15) / (vh * 0.7), 0), 1);
          setScrollProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSlide]);

  // 2. Interactive Cursor Spotlight on Desktop
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorSpotlightRef.current) {
        cursorSpotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorSpotlightRef.current.style.opacity = "0.6";
      }
    };

    const handleMouseLeave = () => {
      if (cursorSpotlightRef.current) {
        cursorSpotlightRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden bg-[#040508] pointer-events-none select-none"
      style={{
        contain: "strict",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* ======================================================== */}
      {/* 1. 60FPS WEBGL CHROMATIC FLUID WAVE (YouTube Reference)   */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full">
        <ChromaticWaveCanvas scrollProgress={scrollProgress} />
      </div>

      {/* ======================================================== */}
      {/* 2. 3D TACTILE VELVET DUNES TEXTURE OVERLAY                */}
      {/* ======================================================== */}
      <div
        className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] animate-dune-float pointer-events-none"
        style={{
          mixBlendMode: "overlay",
          opacity: 0.65 - scrollProgress * 0.15,
          filter: "contrast(1.2) brightness(0.95)",
        }}
      >
        <img
          src="/textures/velvet-dunes.jpg"
          alt="3D Tactile Velvet Dunes Texture"
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
        />
      </div>

      {/* Secondary Soft-Light Texture Depth for Shadow Contours */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: "soft-light",
          opacity: 0.45,
        }}
      >
        <img
          src="/textures/velvet-dunes.jpg"
          alt="Velvet Texture Shading"
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
        />
      </div>

      {/* ======================================================== */}
      {/* 3. VOLUMETRIC AURORA LIGHT BEAMS (Harmonic Depth)        */}
      {/* ======================================================== */}
      <div
        className="absolute top-[20%] left-[-15%] w-[120vw] h-[35vw] pointer-events-none animate-crest-beam"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(217, 70, 239, 0.08) 25%, rgba(244, 114, 182, 0.28) 50%, rgba(6, 215, 230, 0.22) 75%, transparent 100%)",
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
      />

      {/* ======================================================== */}
      {/* 4. INTERACTIVE CURSOR CHROMATIC SPOTLIGHT                */}
      {/* ======================================================== */}
      <div
        ref={cursorSpotlightRef}
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full pointer-events-none transition-opacity duration-500 ease-out will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.16) 0%, rgba(6, 215, 230, 0.08) 45%, transparent 70%)",
          filter: "blur(25px)",
          mixBlendMode: "screen",
          opacity: 0,
        }}
      />

      {/* ======================================================== */}
      {/* 5. CINEMATIC VIGNETTES & CONTRAST GRADIENTS              */}
      {/* ======================================================== */}
      {/* Top Navbar Falloff (Ensures pristine navigation readability) */}
      <div
        className="absolute top-0 inset-x-0 h-44 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4, 5, 8, 0.85) 0%, rgba(4, 5, 8, 0.35) 60%, transparent 100%)",
        }}
      />

      {/* Bottom Soft Edge Falloff */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(4, 5, 8, 0.85) 0%, rgba(4, 5, 8, 0.3) 60%, transparent 100%)",
        }}
      />

      {/* Radial Peripheral Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 35%, rgba(4, 5, 8, 0.55) 100%)",
        }}
      />

      {/* ======================================================== */}
      {/* 6. LIVING TACTILE GRAIN SHIMMER (12fps Micro-Particles)  */}
      {/* ======================================================== */}
      <div
        className="absolute -inset-10 w-[calc(100%+5rem)] h-[calc(100%+5rem)] pointer-events-none animate-grain-jitter"
        style={{
          opacity: 0.16,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainJitterA'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainJitterA)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "135px 135px",
        }}
      />
    </div>
  );
}

export const AmbientBackground = memo(AmbientBackgroundComponent);
export default AmbientBackground;
