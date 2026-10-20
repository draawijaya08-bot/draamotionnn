'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { CategoryCardStack } from '@/components/hero/CategoryCardStack';
import { ArrowDown } from 'lucide-react';
import { useLanguageStore, translations } from '@/stores/languageStore';

function PreviewCardsContent() {
  const { locale } = useLanguageStore();
  const t = translations[locale];
  const searchParams = useSearchParams();
  const cardParam = Number(searchParams.get('card') || '0');
  const initialIndex = !isNaN(cardParam) && cardParam >= 0 && cardParam <= 3 ? cardParam : 0;

  return (
    <div className="relative min-h-screen bg-[#050608] text-[#f5f5f7] flex flex-col overflow-x-hidden">
      <TopNavbar activeNav="playbook" />
      <AmbientBackground />

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-16 py-28 md:py-36">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Statement Typography */}
          <div className="lg:col-span-6 flex flex-col justify-between py-4 select-none">
            <h2 className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[40px] font-sans font-normal text-white tracking-[-0.02em] leading-[1.3] max-w-2xl">
              {t.bio.statementPrefix}
              <span className="text-white font-medium">{t.bio.statementName}</span>.
              <br />
              {locale === 'en' ? 'I turn ideas into ' : 'Saya mengubah ide menjadi '}
              <span className="font-[family-name:var(--font-serif)] italic text-[#00e5c0] font-normal">
                {t.bio.statementAccent}
              </span>{' '}
              {locale === 'en' ? (
                <>
                  through motion, video,
                  <br />
                  and interactive web.
                </>
              ) : (
                <>
                  melalui motion, video,
                  <br />
                  dan web interaktif.
                </>
              )}
            </h2>

            <div className="pt-16 sm:pt-24 space-y-8 font-mono">
              <div className="text-[10px] sm:text-[11px] tracking-widest text-white/50 uppercase leading-relaxed">
                MOTION GRAPHICS / VIDEO EDITING /<br />
                VISUAL DESIGN &amp; WEB
              </div>

              <div>
                <div className="w-[1px] h-10 bg-white/30" />
                <ArrowDown className="w-3.5 h-3.5 text-white/50 mt-1" />
              </div>
            </div>
          </div>

          {/* Right: Category Card Stack Deck with Vector Showcases */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <CategoryCardStack key={initialIndex} initialIndex={initialIndex} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default function PreviewCardsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050608]" />}>
      <PreviewCardsContent />
    </Suspense>
  );
}
