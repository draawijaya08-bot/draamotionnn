'use client';

import React, { useEffect } from 'react';
import { ProjectCategory } from '@/types/portfolio';
import { getWhatsAppUrl, INSTAGRAM_PROFILE_URL } from '@/utils/contact-links';
import { X, ArrowUpRight } from 'lucide-react';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ProjectCategory;
  projectTitle?: string;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'motion-graphics',
  projectTitle,
}) => {
  // ESC key listener to smoothly close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Background WhatsApp URL with existing pre-filled context (preserved without showing complex UI)
  const currentWhatsAppUrl = getWhatsAppUrl(initialCategory, projectTitle);
  const behanceUrl = 'https://www.behance.net/indrawijaya46';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-[6px] animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      {/* Subtle Backdrop Click */}
      <div
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - Compact, Dark, Elegant, Personal Panel */}
      <div
        className="relative w-full max-w-[420px] rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0c0d10] p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10 select-none animate-in fade-in zoom-in-[0.97] duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Minimalist X Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label="Close modal"
          title="Close (ESC)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content Following Clean Creative Direction */}
        <div className="space-y-6 pt-1">
          {/* Eyebrow */}
          <p className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase">
            CONTACT
          </p>

          {/* Headline & Description */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-[36px] font-medium text-white tracking-[-0.03em] leading-tight font-sans">
              Let&apos;s talk.
            </h2>

            <p className="text-sm sm:text-[15px] text-white/60 font-normal leading-relaxed max-w-[340px]">
              Have a project, idea, or something you&apos;d like to create together?
            </p>
          </div>

          {/* Primary CTA: LET'S TALK ON WHATSAPP ↗ */}
          <div className="pt-2">
            <a
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer"
            >
              <span>LET&apos;S TALK ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Social Links: Instagram ↗ & Behance ↗ */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-center gap-7 text-xs sm:text-[13px] text-white/50">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <span className="w-1 h-1 rounded-full bg-white/20" />

            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
            >
              <span>Behance</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
