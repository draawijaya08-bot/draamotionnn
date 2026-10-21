'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCategory, ProjectItem } from '@/types/portfolio';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { HeroTypography } from '@/components/hero/HeroTypography';
import { CategoryCardStack } from '@/components/hero/CategoryCardStack';
import { ProjectExplorationSection } from '@/components/playbook/ProjectExplorationSection';
import { CursorLens } from '@/components/interactive/CursorLens';
import { PlaybookModal } from '@/components/playbook/PlaybookModal';
import { QuickContactModal } from '@/components/contact/QuickContactModal';
import { ContactSection } from '@/components/contact/ContactSection';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';
import { ArrowDown } from 'lucide-react';

export default function Home() {
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [playbookFilter, setPlaybookFilter] = useState<ProjectCategory | 'all'>('motion-graphics');

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactCategory, setContactCategory] = useState<ProjectCategory>('motion-graphics');
  const [contactProjectTitle, setContactProjectTitle] = useState<string | undefined>(undefined);

  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'playbook' | 'contacts'>('hero');
  const [activeCard, setActiveCard] = useState(0);

  const { locale } = useLanguageStore();
  const t = translations[locale];
  const { getLenis } = useSmoothScroll();

  // Scroll position observer to update activeNav for ABOUT ME or CONTACTS underline
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.45;
      const contactsEl = document.getElementById('contacts');
      const contactsThreshold = contactsEl ? contactsEl.offsetTop - window.innerHeight * 0.5 : Infinity;

      if (scrollY >= contactsThreshold) {
        setActiveSection('contacts');
      } else if (scrollY > heroThreshold) {
        setActiveSection('about');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (window.location.search.includes('slide=2')) {
      const el = document.getElementById('section-works');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
        setActiveSection('about');
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Buka katalog playbook modal dengan filter spesifik
  const handleOpenPlaybook = (category: ProjectCategory | 'all' = 'motion-graphics') => {
    setPlaybookFilter(category);
    setIsPlaybookOpen(true);
  };

  // Buka kontak modal dengan konteks kategori/proyek
  const handleOpenContact = (category: ProjectCategory = 'motion-graphics', projectTitle?: string) => {
    setContactCategory(category);
    setContactProjectTitle(projectTitle);
    setIsContactOpen(true);
  };

  const handleScrollToWorks = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#section-works', { duration: 1.1 });
    } else {
      const el = document.getElementById('section-works');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPlaybook = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#section-playbook', { duration: 1.1 });
    } else {
      const el = document.getElementById('section-playbook');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContacts = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#contacts', { duration: 1.2 });
    } else {
      const el = document.getElementById('contacts');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#f5f5f7] flex flex-col selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 1. Custom Interactive Magnifying Lens Cursor (True Optical Lens with RGB Aberration) */}
      <CursorLens />

      {/* 2. Global Purrweb 4-Column Top Navigation with Active Underline */}
      <TopNavbar
        activeNav={activeSection}
        onOpenAbout={handleScrollToWorks}
        onOpenPlaybook={handleScrollToWorks}
        onOpenContacts={handleScrollToContacts}
      />

      {/* 3. Deep Navy Spotlight & Film Grain Ambient Mesh Background */}
      <AmbientBackground />

      <main className="relative z-10 flex-1">
        {/* ======================================================== */}
        {/* SLIDE 01: Fullscreen Hero (Center Staggered Typography)   */}
        {/* ======================================================== */}
        <HeroTypography onScrollToWorks={handleScrollToWorks} />

        {/* ======================================================== */}
        {/* SLIDE 02: Purrweb Perspective Card Stack (1:1 Frame t9.0s)*/}
        {/* ======================================================== */}
        <section 
          id="section-works"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-16 py-16 sm:py-24 md:py-36 bg-transparent"
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Sisi Kiri (lg:col-span-6): Clean Statement Typography (1:1 Frame t9.0s & t11.5s) */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2 sm:py-4 select-none min-h-auto sm:min-h-[360px]">
              {/* Teks Perkenalan Purrweb Signature (Dynamically syncs with active card) */}
              <h2 className="text-2xl sm:text-4xl lg:text-[36px] xl:text-[40px] font-sans font-normal text-white tracking-[-0.02em] leading-[1.3] max-w-2xl transition-opacity duration-300">
                {t.bio.statementPrefix}
                <span className="text-white font-medium">{t.bio.statementName}</span>.
                <br />
                {activeCard === 0 && (
                  <>
                    {locale === 'en' ? 'I turn ideas into ' : 'Saya mengubah ide menjadi '}
                    <span className="font-[family-name:var(--font-serif)] italic text-[#00e5c0] font-normal">
                      {t.bio.statementAccent}
                    </span>{' '}
                    {locale === 'en' ? (
                      <>
                        through motion graphics,
                        <br />
                        kinetic typography &amp; 3D.
                      </>
                    ) : (
                      <>
                        melalui motion graphic,
                        <br />
                        tipografi kinetik &amp; 3D.
                      </>
                    )}
                  </>
                )}
                {activeCard === 1 && (
                  <>
                    {locale === 'en' ? 'I shape ' : 'Saya membentuk '}
                    <span className="font-[family-name:var(--font-serif)] italic text-[#00e5c0] font-normal">
                      {locale === 'en' ? 'memorable visual identities' : 'identitas visual kuat'}
                    </span>{' '}
                    {locale === 'en' ? (
                      <>
                        &amp; graphic design systems
                        <br />
                        that stand the test of time.
                      </>
                    ) : (
                      <>
                        &amp; sistem desain grafis
                        <br />
                        berkarakter yang abadi.
                      </>
                    )}
                  </>
                )}
                {activeCard === 2 && (
                  <>
                    {locale === 'en' ? 'I engineer ' : 'Saya membangun '}
                    <span className="font-[family-name:var(--font-serif)] italic text-[#00e5c0] font-normal">
                      {locale === 'en' ? 'neural AI systems' : 'sistem AI cerdas'}
                    </span>{' '}
                    {locale === 'en' ? (
                      <>
                        uniting generative intelligence,
                        <br />
                        creative web &amp; performance.
                      </>
                    ) : (
                      <>
                        menyatukan inteligensi generatif,
                        <br />
                        web interaktif &amp; performa tinggi.
                      </>
                    )}
                  </>
                )}
              </h2>

              {/* Bottom metadata & scroll indicator matching bottom-left of reference frame t9.0s */}
              <div className="pt-8 sm:pt-24 space-y-6 sm:space-y-8 font-mono">
                <div className="text-[10px] sm:text-[11px] tracking-widest text-white/50 uppercase leading-relaxed whitespace-pre-line">
                  {activeCard === 0 && 'MOTION GRAPHICS / 3D CGI /\nAFTER EFFECTS & CINEMA 4D'}
                  {activeCard === 1 && 'DESIGN GRAPHIC / BRAND IDENTITY /\nEDITORIAL & TYPOGRAPHY'}
                  {activeCard === 2 && 'AI DEVELOPMENT / AGENTIC WORKFLOWS /\nNEXT.JS & INTERACTIVE WEB'}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleScrollToPlaybook}
                    className="group flex flex-col items-start gap-2 cursor-pointer focus:outline-none"
                    title="Scroll to Playbook Projects"
                    aria-label="Scroll to Playbook Projects"
                  >
                    <div className="w-[1px] h-10 bg-white/30 group-hover:bg-[#00e5c0] group-hover:h-12 transition-all duration-300" />
                    <ArrowDown className="w-3.5 h-3.5 text-white/50 group-hover:text-[#00e5c0] group-hover:translate-y-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sisi Kanan (lg:col-span-6): Perspective Stacked Card Deck */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <CategoryCardStack
                onCardChange={(idx) => setActiveCard(idx)}
                onSelectCategory={(category) => {
                  setPlaybookFilter(category);
                  handleScrollToPlaybook();
                }}
              />
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 03: Project Exploration (The Playbook Full Grid)   */}
        {/* ======================================================== */}
        <ProjectExplorationSection />

        {/* ======================================================== */}
        {/* SLIDE 04: Contact Section (1:1 Reference Image 1)        */}
        {/* ======================================================== */}
        <ContactSection onOpenQuickContact={() => handleOpenContact('motion-graphics')} />
      </main>

      {/* 5. Playbook Drawer / Modal Archive (Fast Exploration) */}
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
