import { TopNavbar } from '@/components/layout/TopNavbar';
import { AmbientBackground } from '@/components/hero/AmbientBackground';
import { HeroTypography } from '@/components/hero/HeroTypography';
import { heroStackedCategories } from '@/data/portfolio-data';
import { getWhatsAppUrl } from '@/utils/contact-links';
import { ArrowUpRight, Play, Eye } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f5f7] flex flex-col justify-between selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 1. Header Global Purrweb (4 Kolom) */}
      <TopNavbar />

      {/* 2. Ambient Dark Mesh Background with Subtle Noise */}
      <AmbientBackground />

      {/* 3. Hero Section dengan Kinetic Typography & Metadata Bar */}
      <main className="relative z-10 flex-1 flex flex-col justify-between">
        <HeroTypography />

        {/* 4. Preview Awal Hero Stacked Cards (Diperkenalkan di Milestone 2, disempurnakan di Milestone 3) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-4">
            
            {/* Quick Prompt / Context Pill */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#56565c] uppercase">
                // EXPLORE BY DISCIPLINE
              </span>
              <p className="text-xs text-[#8e8e93] font-mono">
                Click any category below to initiate direct WhatsApp inquiry or explore deliverables.
              </p>
            </div>

            {/* 3-Cards Horizontal Grid Preview (Milestone 2 baseline for Milestone 3 3D Stack) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              {heroStackedCategories.map((card, idx) => (
                <div
                  key={card.category}
                  className="group relative p-5 rounded-2xl border border-[#202024] bg-[#0f0f11]/80 hover:bg-[#161619] hover:border-amber-500/40 transition-all duration-300 backdrop-blur-xl space-y-3 min-w-[240px]"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
                    <span className="text-amber-400 font-semibold uppercase">
                      0{idx + 1}. {card.accentBadge}
                    </span>
                    <a
                      href={getWhatsAppUrl(card.category)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8e8e93] group-hover:text-emerald-400 transition-colors flex items-center gap-0.5"
                      title="Direct WhatsApp Inquiry"
                    >
                      <span>INQUIRE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#8e8e93] leading-relaxed line-clamp-2">
                    {card.tagline}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#56565c] group-hover:text-[#8e8e93] transition-colors border-t border-[#202024]/60">
                    <span className="flex items-center gap-1.5">
                      {card.category === 'motion-graphic' ? (
                        <>
                          <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>Muted Video Loop</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 text-blue-400" />
                          <span>High-Res Stills</span>
                        </>
                      )}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
