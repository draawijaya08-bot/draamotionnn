'use client';

import React, { useState } from 'react';
import { siteIdentityData } from '@/data/portfolio-data';
import { getWhatsAppUrl, INSTAGRAM_PROFILE_URL } from '@/utils/contact-links';
import { ArrowUpRight, MessageCircle, Instagram, Globe } from 'lucide-react';

interface TopNavbarProps {
  onOpenPlaybook?: () => void;
  onOpenContacts?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenPlaybook,
  onOpenContacts,
}) => {
  const { brandName, metadataBar, navigationAndContact } = siteIdentityData;
  const [socialsOpen, setSocialsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-[#080808]/75 border-b border-[#202024]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#f5f5f7]">
        
        {/* Kolom 1 (Kiri): Wordmark & Live Pill */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-display font-extrabold text-base tracking-normal text-white hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-white rounded-full inline-block" />
            {brandName}
          </a>
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#202024] text-[11px] text-[#8e8e93]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/90 font-mono">AVAILABLE FOR Q4</span>
          </div>
        </div>

        {/* Kolom 2: PLAYBOOK Link */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenPlaybook || (() => {
              const el = document.getElementById('playbook');
              el?.scrollIntoView({ behavior: 'smooth' });
            })}
            className="group flex items-center gap-2 py-2 px-3 rounded-lg text-[#8e8e93] hover:text-white hover:bg-[#161619] transition-all"
          >
            <span className="text-[#56565c] group-hover:text-amber-400 transition-colors">01.</span>
            <span>PLAYBOOK (WORKS)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#202024] text-[#8e8e93] group-hover:text-white group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-all">
              6
            </span>
          </button>
        </div>

        {/* Kolom 3: SOCIALS Dropdown/Toggle */}
        <div className="relative">
          <button
            onClick={() => setSocialsOpen(!socialsOpen)}
            onMouseEnter={() => setSocialsOpen(true)}
            className="group flex items-center gap-2 py-2 px-3 rounded-lg text-[#8e8e93] hover:text-white hover:bg-[#161619] transition-all"
            aria-expanded={socialsOpen}
          >
            <span className="text-[#56565c] group-hover:text-amber-400 transition-colors">02.</span>
            <span>SOCIALS</span>
            <span className="text-[10px] text-[#56565c] group-hover:text-white">▾</span>
          </button>

          {/* Socials Floating Popover */}
          {socialsOpen && (
            <div
              onMouseLeave={() => setSocialsOpen(false)}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 py-2 rounded-xl border border-[#202024] bg-[#0f0f11]/95 backdrop-blur-2xl shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {navigationAndContact.socials.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-1.5 text-[11px] text-[#8e8e93] hover:text-white hover:bg-[#161619] transition-all"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#56565c]" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Kolom 4 (Kanan): CONTACTS Quick CTA */}
        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppUrl('motion-graphic')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all font-mono text-[11px]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#202024] bg-[#161619] text-[#8e8e93] hover:text-white hover:border-[#38383e] transition-all text-[11px]"
            title="Instagram Direct"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden lg:inline">INSTAGRAM</span>
          </a>
        </div>
      </div>
    </header>
  );
};
