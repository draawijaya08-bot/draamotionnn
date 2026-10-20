'use client';

import React, { useState } from 'react';
import { ProjectCategory, ProjectItem } from '@/types/portfolio';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { HeroTypography } from '@/components/hero/HeroTypography';
import { CategoryCardStack } from '@/components/hero/CategoryCardStack';
import { CursorLens } from '@/components/interactive/CursorLens';
import { PlaybookModal } from '@/components/playbook/PlaybookModal';
import { QuickContactModal } from '@/components/contact/QuickContactModal';
import { MagneticButton } from '@/components/interactive/MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [playbookFilter, setPlaybookFilter] = useState<ProjectCategory | 'all'>('motion-graphic');

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactCategory, setContactCategory] = useState<ProjectCategory>('motion-graphic');
  const [contactProjectTitle, setContactProjectTitle] = useState<string | undefined>(undefined);

  // Buka katalog playbook dengan filter spesifik
  const handleOpenPlaybook = (category: ProjectCategory | 'all' = 'motion-graphic') => {
    setPlaybookFilter(category);
    setIsPlaybookOpen(true);
  };

  // Buka kontak modal dengan konteks kategori/proyek
  const handleOpenContact = (category: ProjectCategory = 'motion-graphic', projectTitle?: string) => {
    setContactCategory(category);
    setContactProjectTitle(projectTitle);
    setIsContactOpen(true);
  };

  const handleScrollToWorks = () => {
    const el = document.getElementById('section-works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#f5f5f7] flex flex-col selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 1. Custom Interactive Magnifying Lens Cursor (True Optical Lens with RGB Aberration) */}
      <CursorLens />

      {/* 2. Global Purrweb 4-Column Top Navigation */}
      <TopNavbar
        onOpenPlaybook={() => handleOpenPlaybook('all')}
        onOpenContacts={() => handleOpenContact('motion-graphic')}
      />

      {/* 3. Deep Navy Spotlight & Film Grain Ambient Mesh Background */}
      <AmbientBackground />

      <main className="relative z-10 flex-1">
        {/* ======================================================== */}
        {/* SECTION 1: Fullscreen Hero (Center Staggered Typography) */}
        {/* ======================================================== */}
        <HeroTypography onScrollToWorks={handleScrollToWorks} />

        {/* ======================================================== */}
        {/* SECTION 2: Purrweb Scroll Transition (Bio & 3-Card Stack) */}
        {/* ======================================================== */}
        <section 
          id="section-works"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-16 py-28 md:py-36 bg-transparent"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Sisi Kiri (lg:col-span-7): Bio Text Ref Purrweb */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-[#8e8e93] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ABOUT & CREATIVE PHILOSOPHY</span>
              </div>

              {/* Teks Perkenalan Purrweb Signature */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight leading-[1.25]">
                I am <span className="text-white font-bold">Indra Wijaya</span>, I create <span className="font-[family-name:var(--font-serif)] italic text-amber-400">unconventional</span> yet functional & visually pleasing motion and visual experiences.
              </h2>

              <p className="max-w-2xl text-base sm:text-lg text-[#8e8e93] font-light leading-relaxed">
                Specialized in high-voltage commercial motion graphics, brand identity systems, and generative AI creative pipelines. Delivering kinetic stories crafted in 60fps precision for visionary brands and bold creators worldwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton strength={0.25}>
                  <button
                    type="button"
                    onClick={() => handleOpenPlaybook('all')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-amber-400 transition-colors cursor-pointer group"
                  >
                    <span>OPEN PLAYBOOK</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </MagneticButton>

                <MagneticButton strength={0.25}>
                  <button
                    type="button"
                    onClick={() => handleOpenContact('motion-graphic')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#26262b] bg-[#0f0f12] text-white hover:border-amber-400/50 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>DISCUSS COLLABORATION</span>
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Sisi Kanan (lg:col-span-5): 3-Card Category Stack */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <CategoryCardStack
                onSelectCategory={(category) => handleOpenPlaybook(category)}
              />
            </div>

          </div>
        </section>
      </main>

      {/* 5. Playbook Drawer / Modal Archive */}
      <PlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
        initialFilter={playbookFilter}
        onSelectProjectForInquiry={(project: ProjectItem) => {
          handleOpenContact(project.category, project.title);
        }}
      />

      {/* 6. Quick Connect Direct WhatsApp & Instagram Modal */}
      <QuickContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialCategory={contactCategory}
        projectTitle={contactProjectTitle}
      />
    </div>
  );
}
