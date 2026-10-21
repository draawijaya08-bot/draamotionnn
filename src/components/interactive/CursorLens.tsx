'use client';

import React, { useEffect, useRef } from 'react';
import { useCursorStore } from '@/stores/cursorStore';

export const CursorLens: React.FC = () => {
  const { cursorState, cursorLabel, isTouchDevice, setIsTouchDevice } = useCursorStore();

  const lensRingRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Posisi target (langsung dari mouse) dan posisi terinterpolasi (LERP)
  const mousePos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const velocity = useRef(0);
  const isVisible = useRef(false);

  useEffect(() => {
    // 1. Deteksi Touch vs Fine Pointer (Mouse / Trackpad)
    // Jangan pernah anggap touch-only jika perangkat memiliki fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchOnly = !hasFinePointer && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    setIsTouchDevice(isTouchOnly);

    // Initial koordinat di tengah viewport agar lensa langsung aktif & siap pakai
    const initX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500;
    const initY = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 400;
    mousePos.current = { x: initX, y: initY, targetX: initX, targetY: initY };
    document.documentElement.style.setProperty('--lens-x', `${initX}px`);
    document.documentElement.style.setProperty('--lens-y', `${initY}px`);
    document.documentElement.style.setProperty('--lens-r', '230px');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchOnly) {
      // ----------------------------------------------------
      // Touch Fallback: Autonomous Lissajous Ambient Orbit (or static center on reduced motion)
      // ----------------------------------------------------
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--lens-x', '50vw');
        document.documentElement.style.setProperty('--lens-y', '45vh');
        document.documentElement.style.setProperty('--lens-r', '180px');
        return;
      }

      let animationFrameId: number;
      const startTime = performance.now();

      const runAutoOrbit = (time: number) => {
        const elapsed = (time - startTime) * 0.001; // detik
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Kurva Lissajous halus melintasi Hero viewport
        const centerX = width * 0.5;
        const centerY = height * 0.45;
        const radiusX = width * 0.35;
        const radiusY = height * 0.25;

        const autoX = centerX + Math.sin(elapsed * 0.6) * radiusX;
        const autoY = centerY + Math.cos(elapsed * 0.9) * radiusY;

        document.documentElement.style.setProperty('--lens-x', `${Math.round(autoX)}px`);
        document.documentElement.style.setProperty('--lens-y', `${Math.round(autoY)}px`);
        document.documentElement.style.setProperty('--lens-r', '180px');

        animationFrameId = requestAnimationFrame(runAutoOrbit);
      };

      animationFrameId = requestAnimationFrame(runAutoOrbit);
      return () => cancelAnimationFrame(animationFrameId);
    }

    // ----------------------------------------------------
    // Desktop: High-Performance RequestAnimationFrame LERP Loop
    // ----------------------------------------------------
    const handleMove = (e: MouseEvent | PointerEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        if (lensRingRef.current) lensRingRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const handlePointerLeave = () => {
      isVisible.current = false;
      if (lensRingRef.current) lensRingRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    let rafId: number;

    const render = () => {
      // Hitung LERP (Linear Interpolation: lambda = 0.15)
      const dx = mousePos.current.targetX - mousePos.current.x;
      const dy = mousePos.current.targetY - mousePos.current.y;

      mousePos.current.x += dx * 0.15;
      mousePos.current.y += dy * 0.15;

      // Hitung kecepatan untuk Dynamic Velocity Expansion
      const speed = Math.sqrt(dx * dx + dy * dy);
      velocity.current += (speed - velocity.current) * 0.1;

      const currentX = mousePos.current.x;
      const currentY = mousePos.current.y;

      // Ukuran lensa aperture dinamis (diameter 220px - 260px)
      const baseRadius = cursorState === 'PROJECT_HOVER' ? 56 : 115;
      const dynamicRadius = Math.min(baseRadius + velocity.current * 0.25, 130);

      // Terapkan ke CSS Custom Properties untuk masking Layer Tajam
      document.documentElement.style.setProperty('--lens-x', `${currentX.toFixed(1)}px`);
      document.documentElement.style.setProperty('--lens-y', `${currentY.toFixed(1)}px`);
      document.documentElement.style.setProperty('--lens-r', `${(dynamicRadius * 2).toFixed(1)}px`);

      // Gerakkan DOM Element follower & inner dot tanpa re-render React
      if (lensRingRef.current) {
        lensRingRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [cursorState, setIsTouchDevice]);

  if (isTouchDevice) {
    return null; // Di pure-touchscreen (HP/tablet tanpa mouse), efek dihandle oleh orbit
  }

  return (
    <>
      {/* Precision Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 mix-blend-difference"
      />
    </>
  );
};
