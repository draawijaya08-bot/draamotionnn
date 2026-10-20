'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectCategory } from '@/types/portfolio';
import { categoryFilterList, projectsDataset } from '@/data/portfolio-data';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { getWhatsAppUrl } from '@/utils/contact-links';
import { Layers, ArrowRight, MessageCircle, Wrench } from 'lucide-react';

export const ProjectExplorationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'all'>('all');
  const { locale } = useLanguageStore();
  const t = translations[locale];

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projectsDataset;
    return projectsDataset.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="section-playbook"
      className="relative min-h-screen px-6 md:px-16 py-28 md:py-36 bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#00e5c0] uppercase">
              {t.slide3.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              {t.slide3.title}
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-[#8e8e93] font-light leading-relaxed">
              {t.slide3.subtitle}
            </p>
          </div>

          {/* Quick link to view all 4 category archives */}
          <div className="flex flex-wrap items-center gap-3">
            {['motion-graphics', 'video-editing', 'visual-design', 'web'].map((catSlug) => (
              <Link
                key={catSlug}
                href={`/work/${catSlug}`}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-amber-400/40 hover:text-amber-400 text-[11px] font-mono uppercase tracking-wider text-[#8e8e93] transition-all"
              >
                {t.categories[catSlug as keyof typeof t.categories] || catSlug} →
              </Link>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
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
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'border border-[#202024] bg-[#0f0f12] text-[#8e8e93] hover:text-white hover:border-[#38383e]'
                }`}
              >
                <span>
                  {cat.id === 'all'
                    ? t.categories.all
                    : t.categories[cat.id as keyof typeof t.categories] || cat.label}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black text-amber-400' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-[#202024] bg-[#0d0e12]/95 backdrop-blur-xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Preview Container with Aspect Ratio */}
              <div className="relative w-full overflow-hidden bg-black/40">
                <Link
                  href={`/work/${project.category}/${project.slug}`}
                  className="block relative overflow-hidden"
                >
                  <AdaptiveProjectMedia
                    media={project.media}
                    title={project.title}
                    isFeatured={project.featuredInHero}
                  />
                  {/* Overlay Hover Icon */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
                      <span>EXPLORE PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Project Metadata Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8e8e93]">
                    <Link
                      href={`/work/${project.category}`}
                      className="hover:text-amber-400 transition-colors uppercase tracking-wider"
                    >
                      {t.categories[project.category as keyof typeof t.categories] || project.category}
                    </Link>
                    <span>{project.year}</span>
                  </div>

                  <Link href={`/work/${project.category}/${project.slug}`} className="block group-hover:text-amber-400 transition-colors">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {locale === 'id' && project.titleId ? project.titleId : project.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed line-clamp-2">
                    {locale === 'id' && project.descriptionId
                      ? project.descriptionId.shortSnippet
                      : project.description.shortSnippet}
                  </p>
                </div>

                {/* Tools Badges */}
                <div className="pt-3 border-t border-[#202024]/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#56565c] mr-1" />
                    {project.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-[10px] font-mono text-[#8e8e93]"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={getWhatsAppUrl(project.category)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8e8e93] hover:text-emerald-400 transition-colors"
                      title="Direct WhatsApp Inquiry"
                      aria-label="Direct WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <Link
                      href={`/work/${project.category}/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-white group-hover:text-amber-400 font-semibold"
                    >
                      <span>DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
