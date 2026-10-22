"use client";

import React, { useEffect, useRef } from "react";

/**
 * ChromaticWaveCanvas
 * 60fps WebGL fluid gradient wave in the electric-blue identity:
 * - Fluid undulating S-curve chromatic ribbon (Deep Blue -> Electric Blue -> Ice Blue)
 * - Living tactile sand/film grain synthesis
 * - Interactive cursor-driven fluid ripples and mouse tracking
 */

interface ChromaticWaveCanvasProps {
  scrollProgress?: number;
  className?: string;
}

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;

  // 2D Rotation Matrix
  mat2 rotate2d(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
  }

  // Pseudo-random noise for real-time living grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    // 1. Aspect-ratio corrected normalized coordinates (-1 to 1)
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0);

    // 2. Diagonal orientation matching the reference video (~28 deg)
    p = rotate2d(0.48) * p;

    // Time scaling (smooth, hypnotic flow)
    float t = u_time * 0.38;

    // 3. Dynamic Interactive Cursor Fluid Reaction
    vec2 mouseNorm = (u_mouse - 0.5) * vec2(aspect, 1.0);
    vec2 mouseRot = rotate2d(0.48) * mouseNorm;
    float distToMouse = length(p - mouseRot);
    float mouseWave = sin(distToMouse * 7.0 - t * 2.2) * 0.04 * exp(-distToMouse * 1.8);

    // 4. Multi-Harmonic S-Curve Liquid Wave Synthesis (Matching reference motion)
    float wave1 = sin(p.x * 2.1 + t * 0.9) * 0.22;
    float wave2 = cos(p.x * 1.3 - t * 0.6) * 0.16;
    float wave3 = sin(p.x * 3.6 + t * 1.4) * 0.07;
    float wave4 = cos(p.x * 0.8 + t * 0.3) * 0.12;

    float waveOffset = wave1 + wave2 + wave3 + wave4 + mouseWave - (u_scroll * 0.25);

    // Distance from the undulating ribbon centerline
    float dist = abs(p.y - waveOffset);

    // 5. Liquid Wave Thickness & Soft Diffused Edges
    float ribbon = smoothstep(0.42, 0.0, dist);
    float ribbonCore = smoothstep(0.18, 0.0, dist);
    float ambientAura = smoothstep(0.85, 0.0, dist);

    // 6. Color Flow Mapping along the wave (deep blue -> electric -> ice)
    float flow = clamp((p.x + 0.9) / 1.8, 0.0, 1.0);

    // Electric Blue Identity Palette:
    // Deep Blue -> Royal -> Electric Blue -> Ice Blue -> Near-White Ice
    vec3 colDeep    = vec3(0.039, 0.106, 0.302); // #0A1B4D Deep Blue
    vec3 colRoyal   = vec3(0.090, 0.220, 0.670); // #1738AB Royal Blue
    vec3 colElec    = vec3(0.180, 0.420, 1.000); // #2E6BFF Electric Blue
    vec3 colIce     = vec3(0.490, 0.706, 1.000); // #7DB4FF Ice Blue
    vec3 colFrost   = vec3(0.870, 0.930, 1.000); // #DEEDFF Frost White

    vec3 waveColor;
    if (flow < 0.25) {
      waveColor = mix(colDeep, colRoyal, flow / 0.25);
    } else if (flow < 0.55) {
      waveColor = mix(colRoyal, colElec, (flow - 0.25) / 0.30);
    } else if (flow < 0.85) {
      waveColor = mix(colElec, colIce, (flow - 0.55) / 0.30);
    } else {
      waveColor = mix(colIce, colFrost, (flow - 0.85) / 0.15);
    }

    // 7. Background: Deep Cinematic Obsidian with a blue undertone
    vec3 bgColor = vec3(0.012, 0.016, 0.030);

    // 8. Composite Wave with Luminous Layering
    vec3 color = mix(bgColor, waveColor, ribbon * 0.88 + ribbonCore * 0.35);
    color += waveColor * ambientAura * 0.22;

    // Subtle breathing highlight along the upper crest
    float crestHighlight = smoothstep(0.04, 0.0, abs(p.y - waveOffset - 0.08)) * 0.28;
    color += vec3(0.72, 0.86, 1.0) * crestHighlight * ribbon;

    // 9. Real-time Living Grain / Sand Shimmer in Shader (at 60fps)
    vec2 grainCoord = v_uv * u_resolution.xy;
    float timeJitter = floor(u_time * 12.0) * 0.17; // 12fps film grain jitter
    float grain = hash(grainCoord * 0.85 + vec2(timeJitter, -timeJitter));
    color += (grain - 0.5) * 0.075;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const ChromaticWaveCanvas: React.FC<ChromaticWaveCanvasProps> = ({
  scrollProgress = 0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL context
    const gl: WebGLRenderingContext | null =
      canvas.getContext("webgl", { alpha: false, antialias: true, powerPreference: "high-performance" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      // Fallback: simple CSS gradient background if WebGL completely unsupported
      return;
    }

    // Shader compilation helpers
    const compileShader = (type: number, src: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Screen quad buffer (-1 to 1)
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uScrollLoc = gl.getUniformLocation(program, "u_scroll");

    // Resize handler (caps DPR at 1.5 for buttery 60fps & power efficiency)
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      if (uResLoc) {
        gl!.uniform2f(uResLoc, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX / window.innerWidth;
      mousePos.current.targetY = 1.0 - e.clientY / window.innerHeight; // WebGL Y is inverted
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render loop
    let animId: number;
    const startTime = performance.now();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (now: number) => {
      if (isVisible) {
        // Smooth mouse LERP
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

        const elapsed = (now - startTime) * 0.001;

        if (uTimeLoc) gl!.uniform1f(uTimeLoc, elapsed);
        if (uMouseLoc) gl!.uniform2f(uMouseLoc, mousePos.current.x, mousePos.current.y);
        if (uScrollLoc) gl!.uniform1f(uScrollLoc, scrollRef.current);

        gl!.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animId);

      if (gl) {
        gl.deleteBuffer(posBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        transform: "translate3d(0, 0, 0)",
      }}
    />
  );
};

export default ChromaticWaveCanvas;
