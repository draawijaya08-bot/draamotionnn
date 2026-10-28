'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

    let isDestroyed = false;
    let animId: number | null = null;
    let videoCallbackHandle: number | null = null;

    // Try WebGL first for 100% GPU-accelerated 60fps true-alpha rendering (0% CPU load)
    const gl =
      canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true }) ||
      (canvas.getContext('experimental-webgl', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
      }) as WebGLRenderingContext | null);

    let useWebGL = false;
    let glTexture: WebGLTexture | null = null;
    let glProgram: WebGLProgram | null = null;

    if (gl) {
      try {
        const vsSource = `
          attribute vec2 a_position;
          varying vec2 v_texCoord;
          void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = (a_position + 1.0) * 0.5;
            v_texCoord.y = 1.0 - v_texCoord.y;
          }
        `;

        const fsSource = `
          precision mediump float;
          uniform sampler2D u_image;
          varying vec2 v_texCoord;
          void main() {
            vec4 c = texture2D(u_image, v_texCoord);
            float maxVal = max(c.r, max(c.g, c.b));
            // Color key: smoothly remove dark/black background
            float alpha = smoothstep(0.04, 0.18, maxVal);
            gl_FragColor = vec4(c.rgb * alpha, alpha);
          }
        `;

        const compileShader = (type: number, src: string) => {
          const s = gl.createShader(type);
          if (!s) return null;
          gl.shaderSource(s, src);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            gl.deleteShader(s);
            return null;
          }
          return s;
        };

        const vs = compileShader(gl.VERTEX_SHADER, vsSource);
        const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);

        if (vs && fs) {
          const prog = gl.createProgram();
          if (prog) {
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
              glProgram = prog;
              gl.useProgram(prog);

              const posBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
              gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                gl.STATIC_DRAW
              );

              const posLoc = gl.getAttribLocation(prog, 'a_position');
              gl.enableVertexAttribArray(posLoc);
              gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

              glTexture = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, glTexture);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

              gl.viewport(0, 0, canvas.width, canvas.height);
              gl.clearColor(0, 0, 0, 0);

              useWebGL = true;
            }
          }
        }
      } catch {
        useWebGL = false;
      }
    }

    // 2D fallback context if WebGL fails
    const ctx2d = !useWebGL ? canvas.getContext('2d', { alpha: true }) : null;

    let hasMarkedReady = false;

    const render = () => {
      if (isDestroyed) return;

      if (video.readyState >= 2) {
        if (useWebGL && gl && glTexture) {
          gl.bindTexture(gl.TEXTURE_2D, glTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        } else if (ctx2d) {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          ctx2d.globalCompositeOperation = 'screen';
          ctx2d.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        if (!hasMarkedReady) {
          hasMarkedReady = true;
          setIsReady(true);
        }
      }

      // Chain next frame: requestVideoFrameCallback when supported, fallback to rAF
      if (
        'requestVideoFrameCallback' in video &&
        typeof (video as any).requestVideoFrameCallback === 'function'
      ) {
        videoCallbackHandle = (
          video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number }
        ).requestVideoFrameCallback(render);
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    const tryPlay = () => {
      if (!isDestroyed && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('playing', () => {
      if (!hasMarkedReady) {
        hasMarkedReady = true;
        setIsReady(true);
      }
    });

    tryPlay();

    // Start render loop
    if (
      'requestVideoFrameCallback' in video &&
      typeof (video as any).requestVideoFrameCallback === 'function'
    ) {
      videoCallbackHandle = (
        video as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number }
      ).requestVideoFrameCallback(render);
    } else {
      animId = requestAnimationFrame(render);
    }

    // Safety heartbeat: ensure video plays & renders even if paused or throttled
    const heartbeatTimer = setInterval(() => {
      if (isDestroyed) return;
      if (video.paused) {
        video.play().catch(() => {});
      }
      if (!hasMarkedReady && video.readyState >= 2) {
        render();
      }
    }, 500);

    return () => {
      isDestroyed = true;
      clearInterval(heartbeatTimer);
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
      if (gl) {
        if (glTexture) gl.deleteTexture(glTexture);
        if (glProgram) gl.deleteProgram(glProgram);
      }
    };
  }, []);

  return (
    <Link
      href="/"
      className="relative flex items-center group cursor-pointer focus:outline-none select-none"
      title={`${brandName} — Home`}
      aria-label={`${brandName} — Home`}
    >
      {/* Offscreen Hardware Video Decoder (active in DOM for reliable 60fps playback) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <source src="/brand/dramotion-header.webm" type="video/webm" />
        <source src="/brand/dramotion-header.mp4" type="video/mp4" />
      </video>

      {/* GPU-Accelerated WebGL/Canvas Renderer (Zero Black Box, Smooth 60fps) */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={440}
        className={`h-7 xs:h-8 sm:h-9 md:h-10 lg:h-11 w-auto max-w-[150px] sm:max-w-[190px] object-contain transition-all duration-500 group-hover:scale-105 select-none ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          aspectRatio: '1200 / 440',
          pointerEvents: 'none',
        }}
      />

      {/* Static Fallback Placeholder while video initializes */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center gap-1.5 h-7 xs:h-8 sm:h-9 md:h-10 lg:h-11 w-auto transition-opacity duration-300 pointer-events-none">
          <Image
            src="/brand/logo.png"
            alt={brandName}
            width={32}
            height={32}
            priority
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
          />
          <span className="font-sans font-bold tracking-wider text-white text-[0.8rem] sm:text-[0.95rem]">
            {brandName}
          </span>
        </div>
      )}

      <span className="sr-only">{brandName}</span>
    </Link>
  );
};

export default HeaderBrandLogo;
