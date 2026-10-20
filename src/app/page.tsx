import { siteIdentityData } from "@/data/site-identity.data";
import { heroData } from "@/data/hero.data";
import { projectsData } from "@/data/projects.data";
import { servicesData } from "@/data/services.data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f7] flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl border border-[#202024] bg-[#0f0f11] rounded-2xl p-8 backdrop-blur-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {siteIdentityData.availability.badgeText}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
          {siteIdentityData.brandName}
        </h1>

        <p className="text-lg text-[#8e8e93] leading-relaxed">
          {heroData.headlinePrefix}{" "}
          <span className="text-white font-semibold underline decoration-[#38383e] underline-offset-4">
            {heroData.kineticKeywords[0].text}
          </span>{" "}
          {heroData.headlineSuffix}
        </p>

        <div className="pt-4 border-t border-[#202024] flex flex-wrap justify-center gap-4 text-xs font-mono text-[#8e8e93]">
          <span>Projects: {projectsData.length} loaded</span>
          <span>•</span>
          <span>Services: {servicesData.length} packages</span>
          <span>•</span>
          <span>Tools Arsenal: {siteIdentityData.toolsArsenal.length} calibrated</span>
        </div>
      </div>
    </main>
  );
}
