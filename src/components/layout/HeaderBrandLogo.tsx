'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface HeaderBrandLogoProps {
  brandName?: string;
}

export const HeaderBrandLogo: React.FC<HeaderBrandLogoProps> = ({ brandName = 'DRAMOTION' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true, alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let videoCallbackHandle: number | null = null;
    let isDestroyed = false;
    let lastTime = -1;
    let hasMarkedReady = false;

    // Process each video frame to remove any dark/black background with true RGBA transparency
    const processFrame = () => {
      if (isDestroyed) return;

      if (video.readyState >= 2) {
        if (video.currentTime !== lastTime) {
          lastTime = video.currentTime;

          const w = canvas.width;
          const h = canvas.height;

          // Draw the current video frame into the canvas
          ctx.drawImage(video, 0, 0, w, h);

          // Get image data to make black background pixels 100% transparent
          const frame = ctx.getImageData(0, 0, w, h);
          const d = frame.data;
          const len = d.length;

          for (let i = 0; i < len; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const maxVal = Math.max(r, g, b);

            // Clean black background removal threshold
            if (maxVal < 25) {
              d[i + 3] = 0; // 100% transparent
            } else if (maxVal < 55) {
              // Smooth anti-aliased edge feathering
              d[i + 3] = Math.round(((maxVal - 25) / 30) * 255);
            }
          }

          ctx.putImageData(frame, 0, 0);

          if (!hasMarkedReady) {
            hasMarkedReady = true;
            setIsReady(true);
          }
        }
      }

      // Schedule next frame
      if ('requestVideoFrameCallback' in video) {
        videoCallbackHandle = (
          video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number }
        ).requestVideoFrameCallback(processFrame);
      } else {
        animId = requestAnimationFrame(processFrame);
      }
    };

    const tryPlay = () => {
      if (!isDestroyed) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    tryPlay();

    // Start frame loop
    if ('requestVideoFrameCallback' in video) {
      videoCallbackHandle = (
        video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number }
      ).requestVideoFrameCallback(processFrame);
    } else {
      animId = requestAnimationFrame(processFrame);
    }

    return () => {
      isDestroyed = true;
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      if (animId !== null) cancelAnimationFrame(animId);
      if (
        videoCallbackHandle !== null &&
        'cancelVideoFrameCallback' in video &&
        typeof (video as any).cancelVideoFrameCallback === 'function'
      ) {
        (video as any).cancelVideoFrameCallback(videoCallbackHandle);
      }
    };
  }, []);

  return (
    <Link
      href="/"
      className="flex items-center group cursor-pointer focus:outline-none"
      title={`${brandName} — Home`}
      aria-label={`${brandName} — Home`}
    >
      {/* Hidden Hardware-Accelerated Video Player */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden"
        style={{ display: 'none' }}
      >
        <source src="/brand/dramotion-header.webm" type="video/webm" />
        <source src="/brand/dramotion-header.mp4" type="video/mp4" />
      </video>

      {/* Pristine 100% Transparent Real-Time Render Canvas (Zero Black Box on ANY device) */}
      <canvas
        ref={canvasRef}
        width={600}
        height={220}
        className={`h-7 xs:h-8 sm:h-9 md:h-10 lg:h-11 w-auto max-w-[150px] sm:max-w-[190px] object-contain transition-all duration-300 group-hover:scale-105 select-none ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          aspectRatio: '600 / 220',
          pointerEvents: 'none',
        }}
      />

      <span className="sr-only">{brandName}</span>
    </Link>
  );
};

export default HeaderBrandLogo;
