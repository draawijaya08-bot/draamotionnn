'use client';

import React, { useState, useEffect } from 'react';
import { siteIdentityData } from '@/data/portfolio-data';
import { Sparkles, MapPin, Radio } from 'lucide-react';

export const HeroTypography: React.FC = () => {
  const { heroKinetic, metadataBar } = siteIdentityData;
  const { dynamicWords, prefix, suffix, subHeadline } = heroKinetic;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotasi kata dinamis setiap 2.5 detik dengan efek transisi halus
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsTransitioning(false);
      }, 350); // Durasi fade-out sebelum teks baru masuk
    }, 2500);

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col justify-between min-h-[calc(100vh-4.5rem)]">
      {/* 1. Headline Kinetik Utama (Purrweb Signature Style) */}
      <div className="space-y-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-[#8e8e93] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SHOWREEL 2026 EDITION</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
          {prefix}
          <span className="inline-block relative px-2">
            <span
              className={`font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 inline-block transition-all duration-350 ease-out transform ${
                isTransitioning
                  ? 'opacity-0 translate-y-3 blur-xs'
                  : 'opacity-100 translate-y-0 blur-none'
              }`}
            >
              {dynamicWords[currentIndex]}
            </span>
          </span>
          {suffix}
        </h1>

        <p className="max-w-2xl text-base sm:text-lg text-[#8e8e93] font-light leading-relaxed">
          {subHeadline}
        </p>
      </div>

      {/* 2. Metadata Bar Kiri Bawah (Purrweb 2-Column Telemetry) */}
      <div className="pt-12 sm:pt-16 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#202024]/80 text-xs font-mono uppercase tracking-wider">
        {/* Kolom Kiri: Spesialisasi 3 Kategori */}
        <div className="space-y-2">
          <span className="text-[10px] text-[#56565c] tracking-widest">
            // SPECIALIZATIONS
          </span>
          <p className="text-white font-medium tracking-wide">
            {metadataBar.specializations}
          </p>
        </div>

        {/* Kolom Kanan: Status Ketersediaan & Lokasi Remote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-[#56565c] tracking-widest">
              // AVAILABILITY STATUS
            </span>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{metadataBar.availabilityStatus}</span>
            </div>
          </div>

          <div className="space-y-1 sm:text-right">
            <span className="text-[10px] text-[#56565c] tracking-widest">
              // LOCATION & TIMEZONE
            </span>
            <div className="flex items-center sm:justify-end gap-1.5 text-[#8e8e93]">
              <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{metadataBar.location} (WIB / GMT+7)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
