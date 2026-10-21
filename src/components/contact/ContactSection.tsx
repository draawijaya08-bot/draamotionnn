'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/utils/contact-links';

interface ContactSectionProps {
  onOpenQuickContact?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuickContact }) => {
  // Only active platforms: Instagram, Behance, WhatsApp
  const socialLinks = [
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/draawijayaa._8?xtok=dXV3OXlzMWdvN3o3',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      id: 'behance',
      label: 'Behance',
      url: 'https://www.behance.net/indrawijaya46',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.971 3-3.401 0-5.755-2.222-5.755-5.954 0-3.671 2.308-5.955 5.639-5.955 3.532 0 5.322 2.468 4.982 6.003h-7.797c.058 1.905 1.178 3.102 2.977 3.102 1.503 0 2.478-.779 2.925-1.896l2-.3zm-4.971-6.154c-1.353 0-2.316.852-2.551 2.35h5.111c-.083-1.468-.962-2.35-2.56-2.35zm-13.755 9.154h-5v-14h5.66c3.214 0 4.84 1.527 4.84 3.978 0 1.63-.787 2.766-2.08 3.328 1.644.526 2.58 1.838 2.58 3.738 0 2.956-2.27 4.956-6 4.956zm-2-8h2.373c1.559 0 2.627-.615 2.627-1.981 0-1.327-.999-1.928-2.505-1.928h-2.495v3.909zm0 6h2.808c1.782 0 2.992-.72 2.992-2.22 0-1.458-1.127-2.189-2.883-2.189h-2.917v4.409z"/>
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      url: getWhatsAppUrl('motion-graphics'),
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
  ];

  const handleContactClick = () => {
    if (onOpenQuickContact) {
      onOpenQuickContact();
    } else {
      window.open(getWhatsAppUrl('motion-graphics'), '_blank');
    }
  };

  return (
    <section 
      id="contacts"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Ethereal Cloudy / Atmospheric Ambient Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Soft atmospheric white clouds & gradient haze matching Image 1 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,rgba(240,242,245,0.7)_40%,rgba(215,220,228,0.3)_70%,transparent_100%)] opacity-95 blur-2xl" />
        
        {/* Organic soft cloud blobs */}
        <div className="absolute -top-12 left-1/4 w-[480px] h-[320px] bg-white/70 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 w-[520px] h-[350px] bg-white/80 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-[420px] h-[300px] bg-white/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[320px] bg-white/60 rounded-full blur-3xl" />
      </div>

      {/* Main Frosted Card matching 1:1 Image 1 */}
      <div className="relative z-10 w-full max-w-4xl mx-auto rounded-[32px] sm:rounded-[40px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_30px_90px_rgba(0,0,0,0.12),0_10px_30px_rgba(0,0,0,0.06)] p-8 sm:p-14 md:p-16 flex flex-col items-center text-center space-y-7 sm:space-y-8 select-none">
        
        {/* Top Status Pill: ● Available for New Project */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs font-semibold text-gray-800 tracking-tight transition-transform hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span>Available for New Project</span>
        </div>

        {/* Large Bold Headline: HAVE A PROJECT IN MIND? */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-[-0.03em] text-[#111317] uppercase font-sans leading-[1.08] max-w-2xl">
          HAVE A PROJECT IN MIND?
        </h2>

        {/* Descriptive Subtitle */}
        <p className="max-w-xl text-xs sm:text-sm md:text-[15px] text-gray-600 font-normal leading-relaxed text-center px-2">
          Together, we can create something clear and impactful. Let’s collaborate to bring our ideas to life in a way that resonates with everyone.
        </p>

        {/* Primary CTA Button: Contact Me ↗ */}
        <div className="pt-1 sm:pt-2">
          <button
            type="button"
            onClick={handleContactClick}
            className="group px-7 sm:px-8 py-3.5 rounded-full bg-[#18181b] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            title="Get in touch with Indra Wijaya"
            aria-label="Contact Me"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Row of Pills (Avatar + Social Platforms) */}
        <div className="w-full pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 border-t border-gray-100">
          
          {/* Avatar Name Pill: [Avatar] Indra Wijaya */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] text-white shadow-md text-xs font-semibold select-none">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-[9px] font-black text-black">
              IW
            </div>
            <span>Indra Wijaya</span>
          </div>

          {/* Social Platform Badges */}
          {socialLinks.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200/90 text-gray-800 hover:text-black text-xs font-semibold shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              title={`Visit ${platform.label}`}
              aria-label={platform.label}
            >
              <span className="text-gray-700">{platform.icon}</span>
              <span>{platform.label}</span>
            </a>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
