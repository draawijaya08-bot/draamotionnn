'use client';

import React, { useState, useMemo } from 'react';
import { ProjectCategory, ProjectItem } from '@/types/portfolio';
import { categoryFilterList, projectsDataset } from '@/data/portfolio-data';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { getWhatsAppUrl } from '@/utils/contact-links';
import { X, MessageCircle, ArrowUpRight, Wrench, Layers } from 'lucide-react';

interface PlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: ProjectCategory | 'all';
  onSelectProjectForInquiry?: (project: ProjectItem) => void;
}

export const PlaybookModal: React.FC<PlaybookModalProps> = ({
  isOpen,
  onClose,
  initialFilter = 'motion-graphic',
  onSelectProjectForInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'all'>(initialFilter);

  // Filter karya berdasarkan kategori terpilih
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projectsDataset;
    return projectsDataset.filter((p) => p.category === activeTab);
  }, [activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      {/* Container Drawer / Modal Fullscreen */}
      <div className="relative w-full max-w-7xl min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between space-y-8">
        
        {/* Top Header: Judul & Tombol Tutup */}
        <div className="flex items-start justify-between border-b border-[#202024] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-[10px] font-mono tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>THE PLAYBOOK ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-[#8e8e93] font-mono">
              Curated motion design, brand visual systems, and generative AI visual explorations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-[#202024] bg-[#141418] text-[#8e8e93] hover:text-white hover:border-[#38383e] transition-all cursor-pointer flex items-center gap-2 font-mono text-xs"
          >
            <span className="hidden sm:inline">CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#202024]/60 pb-4">
          {categoryFilterList.map((cat) => {
            const isActive = activeTab === cat.id;
            const count =
              cat.id === 'all'
                ? projectsDataset.length
                : projectsDataset.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                    : 'border border-[#202024] bg-[#0f0f12] text-[#8e8e93] hover:text-white hover:border-[#38383e]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#1b1b20] text-[#8e8e93]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-[#202024] bg-[#0e0e12]/80 hover:border-amber-400/40 transition-all duration-300 p-4 flex flex-col justify-between space-y-4 shadow-xl"
            >
              {/* Media Container Adaptif */}
              <AdaptiveProjectMedia
                media={project.media}
                title={project.title}
                isActive={isOpen}
              />

              {/* Konten Metadata */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8e8e93]">
                  <span className="uppercase text-amber-400 font-semibold tracking-wider">
                    {project.category.replace('-', ' ')}
                  </span>
                  <span>{project.year} • {project.clientOrContext}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#8e8e93] leading-relaxed line-clamp-2">
                  {project.description.shortSnippet}
                </p>
              </div>

              {/* Tool Badges List (After Effects, Premiere, Photoshop, Illustrator, AI Tools) */}
              <div className="pt-2 border-t border-[#202024]/60 space-y-2">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <Wrench className="w-3 h-3 text-[#56565c] mr-0.5" />
                  {project.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-tight ${
                        tool.category === 'AI_TECH'
                          ? 'border border-violet-500/30 bg-violet-500/10 text-violet-300'
                          : 'border border-white/10 bg-[#161619] text-[#a1a1aa]'
                      }`}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>

                {/* Direct WhatsApp CTA with Project-Specific Pre-filled Message */}
                <div className="pt-1 flex items-center justify-between">
                  <a
                    href={getWhatsAppUrl(project.category, project.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      onSelectProjectForInquiry?.(project);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono text-xs transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>INQUIRE THIS PROJECT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Playbook Modal */}
        <div className="border-t border-[#202024] pt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#56565c]">
          <span>TOTAL ARCHIVED: {projectsDataset.length} WORKS</span>
          <span>INDRA WIJAYA — MOTION DESIGNER & ART DIRECTOR</span>
        </div>

      </div>
    </div>
  );
};
