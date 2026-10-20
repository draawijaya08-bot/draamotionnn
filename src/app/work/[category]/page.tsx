import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsDataset } from '@/data/portfolio-data';
import { ProjectCategory } from '@/types/portfolio';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { CursorLens } from '@/components/interactive/CursorLens';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { getWhatsAppUrl } from '@/utils/contact-links';
import { ArrowLeft, ArrowRight, MessageCircle, Wrench, Sparkles } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const validCategories: ProjectCategory[] = [
  'motion-graphics',
  'video-editing',
  'visual-design',
  'web',
];

const categoryTitles: Record<string, { en: string; id: string; descEn: string; descId: string }> = {
  'motion-graphics': {
    en: 'Motion Graphics',
    id: 'Motion Graphics',
    descEn:
      'High-voltage commercial motion, kinetic typography, 3D broadcast reels, and kinetic brand idents.',
    descId:
      'Motion graphic komersial berenergi tinggi, tipografi kinetik, bumper siaran 3D, dan identitas brand dinamis.',
  },
  'video-editing': {
    en: 'Video Editing',
    id: 'Video Editing',
    descEn:
      'Cinematic commercial cuts, narrative pacing, social vertical rhythm edits, and post-production color grading.',
    descId:
      'Potongan komersial sinematik, ritme naratif, potongan ritme sosial format vertikal, dan grading warna.',
  },
  'visual-design': {
    en: 'Visual Design',
    id: 'Desain Visual',
    descEn:
      'Brand identity systems, brutalist typography posters, art direction, and tactile editorial publications.',
    descId:
      'Sistem identitas brand, poster tipografi brutalis, pengarahan seni, dan publikasi editorial taktil.',
  },
  web: {
    en: 'Web Development',
    id: 'Pengembangan Web',
    descEn:
      'High-performance creative engineering, 60fps GSAP timelines, optical lens masking, and full-stack interactive applications.',
    descId:
      'Rekayasa kreatif performa tinggi, animasi GSAP 60fps, masking lensa optik, dan aplikasi interaktif modern.',
  },
};

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category as ProjectCategory)) {
    notFound();
  }

  const categoryInfo = categoryTitles[category] || {
    en: category.replace('-', ' ').toUpperCase(),
    id: category.replace('-', ' ').toUpperCase(),
    descEn: 'Curated projects in this discipline.',
    descId: 'Koleksi kurasi proyek pada disiplin ini.',
  };

  const projects = projectsDataset.filter((p) => p.category === category);

  return (
    <div className="relative min-h-screen bg-transparent text-[#f5f5f7] flex flex-col selection:bg-amber-400 selection:text-black overflow-x-hidden">
      <CursorLens />
      <TopNavbar isSubPage={true} />
      <AmbientBackground />

      <main className="relative z-10 flex-1 px-6 md:px-16 pt-32 pb-24 max-w-7xl mx-auto w-full space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#8e8e93]">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-amber-400 font-semibold uppercase">{categoryInfo.en}</span>
        </div>

        {/* Category Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-[11px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CATEGORY ARCHIVE ({projects.length} WORKS)</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
              {categoryInfo.en}
            </h1>
            <p className="text-base sm:text-lg text-[#8e8e93] font-light leading-relaxed">
              {categoryInfo.descEn}
            </p>
          </div>

          {/* Quick switcher to other categories */}
          <div className="flex flex-wrap items-center gap-2">
            {validCategories.map((catKey) => {
              const isActive = catKey === category;
              return (
                <Link
                  key={catKey}
                  href={`/work/${catKey}`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'border border-white/10 bg-white/5 text-[#8e8e93] hover:text-white hover:border-white/30'
                  }`}
                >
                  {categoryTitles[catKey]?.en || catKey}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-[#202024] bg-[#0d0e12]/95 backdrop-blur-xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Preview Container */}
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
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
                        <span>VIEW CASE STUDY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Project Metadata Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8e8e93]">
                      <span>{project.clientOrContext}</span>
                      <span>{project.year}</span>
                    </div>

                    <Link
                      href={`/work/${project.category}/${project.slug}`}
                      className="block group-hover:text-amber-400 transition-colors"
                    >
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed line-clamp-2">
                      {project.description.shortSnippet}
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
        ) : (
          <div className="py-24 text-center rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <p className="font-mono text-sm text-[#8e8e93]">No public deliverables in this category yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
