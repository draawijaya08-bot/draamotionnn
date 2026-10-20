import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsDataset } from '@/data/portfolio-data';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { CursorLens } from '@/components/interactive/CursorLens';
import { AdaptiveProjectMedia } from '@/components/media/AdaptiveProjectMedia';
import { getWhatsAppUrl } from '@/utils/contact-links';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Wrench,
  Sparkles,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsDataset.map((project) => ({
    category: project.category,
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { category, slug } = await params;

  const projectIndex = projectsDataset.findIndex(
    (p) => p.slug === slug && p.category === category
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsDataset[projectIndex];

  // Previous and Next Project Navigation
  const prevProject =
    projectIndex > 0 ? projectsDataset[projectIndex - 1] : projectsDataset[projectsDataset.length - 1];
  const nextProject =
    projectIndex < projectsDataset.length - 1 ? projectsDataset[projectIndex + 1] : projectsDataset[0];

  const categoryName = project.category.replace('-', ' ').toUpperCase();

  return (
    <div className="relative min-h-screen bg-transparent text-[#f5f5f7] flex flex-col selection:bg-amber-400 selection:text-black overflow-x-hidden">
      <CursorLens />
      <TopNavbar isSubPage={true} />
      <AmbientBackground />

      <main className="relative z-10 flex-1 px-6 md:px-16 pt-32 pb-28 max-w-6xl mx-auto w-full space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8e8e93]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href={`/work/${project.category}`} className="hover:text-amber-400 transition-colors uppercase">
            {categoryName}
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/90 truncate max-w-[200px] sm:max-w-none">{project.slug}</span>
        </div>

        {/* Project Header Title & Metadata */}
        <div className="space-y-6 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-[11px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CASE STUDY & DELIVERABLE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[#8e8e93] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3 h-3 text-amber-400" />
                <span>CLIENT / CONTEXT</span>
              </span>
              <p className="text-white font-semibold">{project.clientOrContext}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#8e8e93] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>YEAR</span>
              </span>
              <p className="text-white font-semibold">{project.year}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#8e8e93] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3 h-3 text-amber-400" />
                <span>ROLE</span>
              </span>
              <p className="text-white font-semibold">{project.role || 'Lead Motion Designer'}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#8e8e93] text-[10px] uppercase tracking-wider">DISCIPLINE</span>
              <Link
                href={`/work/${project.category}`}
                className="text-amber-400 font-semibold hover:underline block uppercase"
              >
                {categoryName}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Immersive Showcase Media */}
        <div className="rounded-3xl border border-[#26262b] bg-[#0c0d10] overflow-hidden shadow-2xl">
          <AdaptiveProjectMedia media={project.media} title={project.title} isFeatured={true} />
        </div>

        {/* Project Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Sisi Kiri (Description, Challenge, Solution) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <span>01</span>
                <span className="w-8 h-[1px] bg-amber-400/40" />
                <span>Project Overview</span>
              </h2>
              <p className="text-lg sm:text-xl text-white font-light leading-relaxed">
                {project.description.shortSnippet}
              </p>
            </div>

            {/* The Challenge */}
            {project.description.detailedChallenge && (
              <div className="space-y-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8e8e93] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>The Creative Challenge</span>
                </h3>
                <p className="text-sm sm:text-base text-[#d1d1d6] leading-relaxed">
                  {project.description.detailedChallenge}
                </p>
              </div>
            )}

            {/* The Solution */}
            {project.description.solutionApplied && (
              <div className="space-y-3 p-6 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>The Execution & Technical Solution</span>
                </h3>
                <p className="text-sm sm:text-base text-[#d1d1d6] leading-relaxed">
                  {project.description.solutionApplied}
                </p>
              </div>
            )}
          </div>

          {/* Sisi Kanan (Sidebar: Tools & Direct Inquiry Action) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Creative Stack Badges */}
            <div className="p-6 rounded-2xl border border-[#202024] bg-[#0f0f12]/95 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e8e93]">
                Creative Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-white/90"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Link Button if available */}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-400 font-mono text-xs uppercase tracking-wider font-bold transition-all"
              >
                <span>VISIT LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Direct Inquiry Action via WhatsApp */}
            <div className="p-6 rounded-2xl border border-[#202024] bg-[#0f0f12]/95 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e8e93]">
                Commission a Similar Project
              </h3>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                Connect directly with Indra Wijaya to discuss timeline, creative pipeline, and production scope.
              </p>
              <a
                href={getWhatsAppUrl(project.category)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INQUIRE VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Previous / Next Project Pagination */}
        <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/work/${prevProject.category}/${prevProject.slug}`}
            className="group flex items-center gap-4 text-left p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="block text-[10px] font-mono text-[#8e8e93] uppercase">PREVIOUS PROJECT</span>
              <span className="font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            href={`/work/${project.category}`}
            className="px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono uppercase text-[#8e8e93] hover:text-white transition-colors"
          >
            ALL {categoryName}
          </Link>

          <Link
            href={`/work/${nextProject.category}/${nextProject.slug}`}
            className="group flex items-center gap-4 text-right p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all w-full sm:w-auto justify-end"
          >
            <div>
              <span className="block text-[10px] font-mono text-[#8e8e93] uppercase">NEXT PROJECT</span>
              <span className="font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </div>
  );
}
