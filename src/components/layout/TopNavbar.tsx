'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteIdentityData } from '@/data/portfolio-data';
import { MagneticButton } from '@/components/interactive/MagneticButton';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { ArrowUpRight, Globe } from 'lucide-react';

interface TopNavbarProps {
  onOpenAbout?: () => void;
  onOpenPlaybook?: () => void;
  onOpenContacts?: () => void;
  isSubPage?: boolean;
  activeNav?: 'hero' | 'about' | 'playbook' | 'socials' | 'contacts';
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenAbout,
  onOpenPlaybook,
  onOpenContacts,
  isSubPage = false,
  activeNav = 'hero',
}) => {
  const { brandName, navigationAndContact } = siteIdentityData;
  const [socialsOpen, setSocialsOpen] = useState(false);
  const { locale, toggleLocale } = useLanguageStore();
  const t = translations[locale];

  const isAboutActive = activeNav === 'about' || activeNav === 'playbook';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      {/* 4-Column CSS Grid Aligned Horizontally Across Top */}
      <nav 
        className="w-full grid grid-cols-4 items-center px-6 py-6 md:px-16 md:py-8 font-sans select-none"
        style={{
          paddingLeft: 'clamp(1.5rem, 4vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
          paddingTop: 'clamp(1.25rem, 2.5vw, 2rem)',
          paddingBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
        }}
      >
        {/* Kolom 1 (Kiri): INDRA WIJAYA */}
        <div className="flex items-center">
          <MagneticButton strength={0.2}>
            <Link
              href="/"
              className="text-[#FFFFFF] hover:text-amber-400 transition-colors uppercase font-bold tracking-wider"
              style={{
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
              }}
            >
              {brandName}
            </Link>
          </MagneticButton>
        </div>

        {/* Kolom 2 (Tengah-Kiri): ABOUT ME (Navigates to About Me / Bio Section) */}
        <div className="flex items-center justify-start md:justify-center">
          <MagneticButton strength={0.25}>
            {isSubPage ? (
              <Link
                href="/#section-works"
                className={`uppercase transition-colors cursor-pointer text-left font-medium ${
                  isAboutActive
                    ? 'text-white border-b border-white pb-0.5'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                }}
              >
                {t.nav.about || 'ABOUT ME'}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onOpenAbout || onOpenPlaybook}
                className={`uppercase transition-colors cursor-pointer text-left font-medium ${
                  isAboutActive
                    ? 'text-white border-b border-white pb-0.5'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                }}
              >
                {t.nav.about || 'ABOUT ME'}
              </button>
            )}
          </MagneticButton>
        </div>

        {/* Kolom 3 (Tengah-Kanan): SOCIALS */}
        <div className="relative flex items-center justify-start md:justify-center">
          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={() => setSocialsOpen(!socialsOpen)}
              onMouseEnter={() => setSocialsOpen(true)}
              className="text-white/80 hover:text-white uppercase transition-colors cursor-pointer font-medium flex items-center gap-1"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }}
              aria-expanded={socialsOpen}
            >
              <span>{t.nav.socials}</span>
            </button>
          </MagneticButton>

          {/* Socials Floating Popover */}
          {socialsOpen && (
            <div
              onMouseLeave={() => setSocialsOpen(false)}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 rounded-xl border border-[#202024] bg-[#090b10]/95 backdrop-blur-2xl shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50"
            >
              {navigationAndContact.socials.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-1.5 text-[11px] text-[#8e8e93] hover:text-white hover:bg-[#161619] transition-all font-mono"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#56565c]" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Kolom 4 (Kanan, Rata Kanan): CONTACTS + BILINGUAL SWITCHER */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">
          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={onOpenContacts}
              className={`uppercase transition-colors cursor-pointer text-right font-medium ${
                activeNav === 'contacts'
                  ? 'text-white border-b border-white pb-0.5'
                  : 'text-white/80 hover:text-white'
              }`}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }}
            >
              {t.nav.contacts}
            </button>
          </MagneticButton>

          {/* Language Switcher [ ID | EN ] */}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/15 bg-white/5 hover:border-amber-400/50 hover:bg-white/10 text-[10px] font-mono tracking-wider transition-colors cursor-pointer text-white/90"
            title="Switch Language / Ganti Bahasa"
            aria-label="Switch Language"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span className={locale === 'en' ? 'text-amber-400 font-bold' : 'text-white/60'}>EN</span>
            <span className="text-white/30">/</span>
            <span className={locale === 'id' ? 'text-amber-400 font-bold' : 'text-white/60'}>ID</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
