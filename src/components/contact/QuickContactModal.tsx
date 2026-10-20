'use client';

import React, { useState } from 'react';
import { ProjectCategory } from '@/types/portfolio';
import { siteIdentityData } from '@/data/portfolio-data';
import { getWhatsAppUrl, INSTAGRAM_PROFILE_URL, INSTAGRAM_HANDLE } from '@/utils/contact-links';
import { X, MessageCircle, ArrowUpRight, Copy, Check, Send } from 'lucide-react';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ProjectCategory;
  projectTitle?: string;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'motion-graphic',
  projectTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(initialCategory);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentWhatsAppUrl = getWhatsAppUrl(selectedCategory, projectTitle);
  const { whatsapp, socials } = siteIdentityData.navigationAndContact;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentWhatsAppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories: Array<{ id: ProjectCategory; label: string }> = [
    { id: 'motion-graphic', label: 'Motion Graphic' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'ai-development', label: 'AI Development' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl border border-[#26262b] bg-[#0e0e12] p-6 sm:p-8 shadow-2xl space-y-6 z-10">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT CHANNELS (NO FORMS)</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">
              Initiate Collaboration
            </h2>
            <p className="text-xs text-[#8e8e93]">
              Connect directly with Indra Wijaya via WhatsApp or Instagram.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#202024] text-[#8e8e93] hover:text-white hover:bg-[#161619] transition-all cursor-pointer"
            title="Close modal (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Channel WhatsApp: Dynamic Category Selector */}
        <div className="space-y-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>WHATSAPP DIRECT CHAT</span>
            </span>
            <span className="text-[#56565c] text-[10px]">+{whatsapp.phoneNumber}</span>
          </div>

          {/* Category Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#8e8e93] uppercase tracking-wider">
              Select Project Discipline:
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-400 text-black font-semibold shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'border border-[#26262b] bg-[#141418] text-[#8e8e93] hover:text-white hover:border-[#38383e]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pre-filled Message Preview Box */}
          <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-[11px] text-[#8e8e93] font-mono leading-relaxed">
            <span className="text-[9px] text-[#56565c] block mb-1 uppercase tracking-widest">
              Automated Pre-filled Message:
            </span>
            &ldquo;{whatsapp.categoryContextMessages[selectedCategory]}&rdquo;
          </div>

          {/* Tombol Aksi WhatsApp & Copy Link */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>START WHATSAPP CHAT</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl border border-[#26262b] bg-[#141418] text-[#8e8e93] hover:text-white hover:border-[#38383e] transition-all cursor-pointer"
              title="Copy WhatsApp Direct URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. Channel Instagram Direct */}
        <div className="p-4 rounded-xl border border-[#202024] bg-[#141418] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#8e8e93] uppercase tracking-wider">
              Instagram DM & Portfolio Feed:
            </span>
            <div className="font-semibold text-sm text-white font-mono">
              {INSTAGRAM_HANDLE}
            </div>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 text-xs font-mono transition-all"
          >
            <span>OPEN DM</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* 3. Socials Grid Footer */}
        <div className="pt-2 border-t border-[#202024] flex items-center justify-between text-xs font-mono text-[#56565c]">
          <span>OTHER PLATFORMS:</span>
          <div className="flex items-center gap-3">
            {socials.filter(s => s.platform !== 'INSTAGRAM').map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
