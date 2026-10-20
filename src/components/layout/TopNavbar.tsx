'use client';

import React, { useState } from 'react';
import { siteIdentityData } from '@/data/portfolio-data';
import { MagneticButton } from '@/components/interactive/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

interface TopNavbarProps {
  onOpenPlaybook?: () => void;
  onOpenContacts?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenPlaybook,
  onOpenContacts,
}) => {
  const { brandName, navigationAndContact } = siteIdentityData;
  const [socialsOpen, setSocialsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      {/* 4-Column CSS Grid Aligned Horizontally Across Top (padding: 2rem 4rem) */}
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
            <a
              href="#"
              className="text-[#FFFFFF] hover:text-amber-400 transition-colors uppercase font-bold"
              style={{
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
              }}
            >
              {brandName}
            </a>
          </MagneticButton>
        </div>

        {/* Kolom 2 (Tengah-Kiri): PLAYBOOK */}
        <div className="flex items-center justify-start md:justify-center">
          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={onOpenPlaybook}
              className="text-white/80 hover:text-white uppercase transition-colors cursor-pointer text-left font-medium"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }}
            >
              PLAYBOOK
            </button>
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
              <span>SOCIALS</span>
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

        {/* Kolom 4 (Kanan, Rata Kanan): CONTACTS */}
        <div className="flex items-center justify-end">
          <MagneticButton strength={0.25}>
            <button
              type="button"
              onClick={onOpenContacts}
              className="text-white/80 hover:text-white uppercase transition-colors cursor-pointer text-right font-medium"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }}
            >
              CONTACTS
            </button>
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
};
