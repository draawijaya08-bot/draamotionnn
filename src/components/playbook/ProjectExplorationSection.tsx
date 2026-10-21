'use client';

import React from 'react';
import Link from 'next/link';
import { projectsDataset } from '@/data/portfolio-data';
import { useLanguageStore, translations } from '@/stores/languageStore';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { ArrowUpRight } from 'lucide-react';

export const ProjectExplorationSection: React.FC = () => {
  const { locale } = useLanguageStore();
  const t = translations[locale];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'motion-graphics':
        return 'MOTION GRAPHIC';
      case 'visual-design':
        return 'DESIGN GRAPHIC';
      case 'web':
        return 'AI DEVELOPMENT';
      case 'video-editing':
        return 'VIDEO EDITING';
      default:
        return (
          t.categories[category as keyof typeof t.categories] ||
          category.replace('-', ' ').toUpperCase()
        );
    }
  };

  return (
    <section
      id="section-playbook"
      className="relative min-h-screen px-6 md:px-12 lg:px-16 py-28 md:py-36 bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header: Compact label, large heading, one short supporting description */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl select-none">
          <p className="text-[11px] font-mono tracking-[0.25em] text-[#00e5c0] uppercase">
            {t.slide3.eyebrow || 'THE PLAYBOOK'}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-[-0.03em] leading-[1.1]">
            {t.slide3.title || 'Project Exploration'}
          </h2>
          <p className="text-sm sm:text-base text-[#8e8e93] font-normal leading-relaxed">
            {t.slide3.subtitle ||
              'A curated selection of motion graphics, visual identities, and creative engineering.'}
          </p>
        </div>

        {/* Editorial Project Grid: Clean Two-Column on Desktop, Adapts on Tablet/Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {projectsDataset.map((project) => {
            const projectTitle =
              locale === 'id' && project.titleId ? project.titleId : project.title;
            const projectUrl = `/work/${project.category}/${project.slug}`;

            return (
              <Link
                key={project.id}
                href={projectUrl}
                className="group relative flex flex-col space-y-4 rounded-3xl p-2 sm:p-2.5 -m-2 sm:-m-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black cursor-pointer select-none"
                aria-label={`View project: ${projectTitle}`}
              >
                {/* Visual Card: Large Image/Video Preview with Consistent Ratio */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c0d12] shadow-2xl transition-all duration-500 group-hover:border-white/25 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <div className="w-full h-full transform transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]">
                    <AdaptiveProjectMedia
                      media={project.media}
                      title={project.title}
                      isFeatured={project.featuredInHero}
                      className="w-full h-full !aspect-auto !rounded-none !border-none"
                    />
                  </div>

                  {/* Subtle Cinematic Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

                  {/* Simple Floating Arrow Indicator on Cover */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:scale-105 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Minimal Card Footer: Title, Subtle Category Label, View Project Link */}
                <div className="flex items-start justify-between gap-4 px-1">
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-[11px] font-mono tracking-widest text-[#00e5c0] uppercase truncate">
                      {getCategoryLabel(project.category)}
                      <span className="text-white/20 mx-2">•</span>
                      <span className="text-white/40">{project.year}</span>
                    </p>

                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight transition-colors group-hover:text-amber-400 truncate">
                      {projectTitle}
                    </h3>
                  </div>

                  {/* View Project text link */}
                  <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-white/50 group-hover:text-white transition-colors shrink-0 pt-1">
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
