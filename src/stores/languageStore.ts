import { create } from 'zustand';

export type SupportedLocale = 'en' | 'id';

interface LanguageStore {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  toggleLocale: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  locale: 'en',
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_locale', locale);
      } catch {}
    }
    set({ locale });
  },
  toggleLocale: () =>
    set((state) => {
      const nextLocale = state.locale === 'en' ? 'id' : 'en';
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('portfolio_locale', nextLocale);
        } catch {}
      }
      return { locale: nextLocale };
    }),
}));

export const translations = {
  en: {
    nav: {
      about: 'ABOUT ME',
      playbook: 'ABOUT ME',
      socials: 'SOCIALS',
      contacts: 'CONTACTS',
      backToHome: 'BACK TO PORTFOLIO',
      backToCategory: 'BACK TO CATEGORY',
      viewAll: 'VIEW ALL',
    },
    hero: {
      role: 'Creative Developer & Motion Designer',
      prefix: 'Creative ',
      suffix: 'designer',
      dynamicWords: ['developer', 'motion', 'visual', 'creative'],
      specializations: 'MOTION GRAPHICS / VIDEO EDITING / VISUAL DESIGN / WEB',
      availability: 'CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATION',
      location: 'BASED IN INDONESIA (REMOTE WORLDWIDE)',
      scrollToWorks: 'Scroll to Works & Bio',
    },
    bio: {
      eyebrow: 'ABOUT & CREATIVE PHILOSOPHY',
      statementPrefix: "I’m ",
      statementName: 'Indra Wijaya',
      statementLead: '. I turn ideas into ',
      statementAccent: 'visual experiences',
      statementSuffix: ' through motion, video, and interactive web.',
      description:
        'Specialized in high-voltage commercial motion graphics, cinematic video editing, brand identity systems, and modern creative web engineering. Delivering kinetic stories crafted in 60fps precision for visionary brands and bold creators worldwide.',
      btnPlaybook: 'OPEN PLAYBOOK',
      btnContact: 'DISCUSS COLLABORATION',
      exploreCategory: 'EXPLORE CATEGORY',
    },
    slide3: {
      eyebrow: 'THE PLAYBOOK',
      title: 'Project Exploration',
      subtitle: 'Curated projects spanning kinetic rhythm, narrative editing, visual identities, and interactive web software.',
    },
    categories: {
      all: 'ALL',
      'motion-graphics': 'MOTION GRAPHICS',
      'video-editing': 'VIDEO EDITING',
      'visual-design': 'VISUAL DESIGN',
      web: 'WEB DEVELOPMENT',
    },
    categoryDescriptions: {
      'motion-graphics': 'Commercial animation, kinetic typography, 3D broadcast reels, and showreels.',
      'video-editing': 'Cinematic pacing, narrative short-form, commercial rhythm cuts, and color grading.',
      'visual-design': 'Brand identity systems, brutalist typography, editorial posters, and art direction.',
      web: 'Interactive web applications, high-performance portfolios, GSAP timelines, and full-stack solutions.',
    },
    projectDetail: {
      client: 'Client / Context',
      year: 'Year',
      discipline: 'Discipline',
      toolsUsed: 'Creative Pipeline & Tools',
      overview: 'Project Overview',
      challenge: 'The Challenge',
      solution: 'Creative & Technical Solution',
      visitLive: 'Launch Live Project',
      prevProject: 'Previous Project',
      nextProject: 'Next Project',
      inquireThisProject: 'Inquire About Similar Project',
    },
    contactModal: {
      title: 'Discuss Collaboration',
      subtitle: 'Fast-track communication via direct WhatsApp or Instagram DM.',
      btnWa: 'Chat via WhatsApp',
      btnIg: 'Message on Instagram',
    },
  },
  id: {
    nav: {
      about: 'ABOUT ME',
      playbook: 'ABOUT ME',
      socials: 'SOSIAL',
      contacts: 'KONTAK',
      backToHome: 'KEMBALI KE BERANDA',
      backToCategory: 'KEMBALI KE KATEGORI',
      viewAll: 'LIHAT SEMUA',
    },
    hero: {
      role: 'Creative Developer & Motion Designer',
      prefix: 'Creative ',
      suffix: 'designer',
      dynamicWords: ['developer', 'motion', 'visual', 'creative'],
      specializations: 'MOTION GRAPHICS / VIDEO EDITING / VISUAL DESIGN / WEB',
      availability: 'TERSEDIA UNTUK FREELANCE & KOLABORASI GLOBAL',
      location: 'BERBASIS DI INDONESIA (REMOTE GLOBAL)',
      scrollToWorks: 'Gulir ke Karya & Bio',
    },
    bio: {
      eyebrow: 'TENTANG & FILOSOFI KREATIF',
      statementPrefix: 'Saya ',
      statementName: 'Indra Wijaya',
      statementLead: '. Saya mengubah ide menjadi ',
      statementAccent: 'pengalaman visual',
      statementSuffix: ' melalui motion, video, dan web interaktif.',
      description:
        'Spesialisasi dalam motion graphic komersial bertenaga tinggi, editing video sinematik, sistem identitas visual, dan rekayasa web kreatif modern. Menghadirkan narasi kinetik berpresisi 60fps untuk brand visioner dan kreator di seluruh dunia.',
      btnPlaybook: 'BUKA PLAYBOOK',
      btnContact: 'DISKUSI KOLABORASI',
      exploreCategory: 'EKSPLORASI KATEGORI',
    },
    slide3: {
      eyebrow: 'THE PLAYBOOK',
      title: 'Eksplorasi Karya',
      subtitle: 'Koleksi kurasi karya mencakup ritme kinetik, editing naratif, identitas visual, dan software web interaktif.',
    },
    categories: {
      all: 'SEMUA',
      'motion-graphics': 'MOTION GRAPHICS',
      'video-editing': 'VIDEO EDITING',
      'visual-design': 'VISUAL DESIGN',
      web: 'WEB DEVELOPMENT',
    },
    categoryDescriptions: {
      'motion-graphics': 'Animasi komersial, kinetic typography, bumper siaran 3D, dan showreel.',
      'video-editing': 'Pacing sinematik, short-form naratif, potongan ritme komersial, dan color grading.',
      'visual-design': 'Sistem identitas brand, tipografi brutalis, poster editorial, dan art direction.',
      web: 'Aplikasi web interaktif, portofolio performa tinggi, animasi GSAP, dan solusi full-stack.',
    },
    projectDetail: {
      client: 'Klien / Konteks',
      year: 'Tahun',
      discipline: 'Disiplin',
      toolsUsed: 'Pipeline & Alat Kreatif',
      overview: 'Ringkasan Proyek',
      challenge: 'Tantangan',
      solution: 'Solusi Kreatif & Teknis',
      visitLive: 'Kunjungi Website Langsung',
      prevProject: 'Proyek Sebelumnya',
      nextProject: 'Proyek Selanjutnya',
      inquireThisProject: 'Diskusikan Proyek Serupa',
    },
    contactModal: {
      title: 'Mulai Kolaborasi',
      subtitle: 'Komunikasi langsung tanpa friksi melalui WhatsApp atau Instagram DM.',
      btnWa: 'Hubungi via WhatsApp',
      btnIg: 'Kirim Pesan di Instagram',
    },
  },
};
