import {
  SiteIdentity,
  CategoryFilterItem,
  StackedCardCategory,
  ProjectItem,
} from '@/types/portfolio';

export const siteIdentityData: SiteIdentity = {
  brandName: 'INDRA WIJAYA',
  primaryRole: 'Motion Designer',
  heroKinetic: {
    prefix: 'Creative ',
    dynamicWords: ['motion', 'visual', 'AI-driven'],
    suffix: ' designer',
    subHeadline:
      'Crafting high-voltage kinetic typography, commercial motion reels, and generative AI visual pipelines with precision rhythm and aesthetic restraint.',
    accentColor: '#f59e0b', // Warm amber / golden serif accent
  },
  metadataBar: {
    specializations: 'MOTION GRAPHIC / GRAPHIC DESIGN / AI DEVELOPMENT',
    availabilityStatus: 'CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATION',
    location: 'INDONESIA (WORLDWIDE REMOTE)',
  },
  heroShowreel: {
    ambientBlurVideoUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
    sharpRevealVideoUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
    fallbackPosterUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
    durationSeconds: 12,
  },
  navigationAndContact: {
    navLinks: [
      { id: 'works', label: 'PLAYBOOK', targetAnchor: '#playbook' },
      { id: 'socials', label: 'SOCIALS', targetAnchor: '#socials' },
      { id: 'contacts', label: 'CONTACTS', targetAnchor: '#contacts' },
    ],
    whatsapp: {
      phoneNumber: '6281234567890', // Placeholder awal
      defaultMessage:
        'Halo Indra, saya melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek kolaborasi.',
      categoryContextMessages: {
        'motion-graphic':
          'Halo Indra, saya tertarik berdiskusi mengenai proyek Motion Graphic / Commercial Animation untuk brand saya.',
        'graphic-design':
          'Halo Indra, saya tertarik berdiskusi mengenai kebutuhan Visual Identity / Graphic Design proyek kami.',
        'ai-development':
          'Halo Indra, saya tertarik berdiskusi mengenai eksplorasi AI Creative Pipeline & Visual Generation untuk campaign kami.',
      },
    },
    instagram: {
      username: 'draawijayaa._8'
      ,
      profileUrl: 'https://www.instagram.com/draawijayaa._8?xtok=dXV3OXlzMWdvN3o3',
      displayHandle: '@indrawijaya.motion',
    },
    socials: [
      {
        platform: 'BEHANCE',
        label: 'Behance',
        url: 'https://behance.net/indrawijaya',
      },
      {
        platform: 'VIMEO',
        label: 'Vimeo Pro',
        url: 'https://vimeo.com/indrawijaya',
      },
      {
        platform: 'INSTAGRAM',
        label: 'Instagram',
        url: 'https://instagram.com/indrawijaya.motion',
        isPrimary: true,
      },
      {
        platform: 'YOUTUBE',
        label: 'YouTube',
        url: 'https://youtube.com/@indrawijaya',
      },
      {
        platform: 'LINKEDIN',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/indrawijaya',
      },
    ],
  },
};

export const categoryFilterList: CategoryFilterItem[] = [
  {
    id: 'motion-graphic',
    label: 'MOTION GRAPHIC',
    description: 'Animasi dinamis, showreel, bumper komersial & kinetic typography',
  },
  {
    id: 'graphic-design',
    label: 'GRAPHIC DESIGN',
    description: 'Visual branding, poster editorial, key visual & modular layout',
  },
  {
    id: 'ai-development',
    label: 'AI DEVELOPMENT',
    description: 'Eksplorasi generative video, visual synthesis & custom pipeline workflow',
  },
  {
    id: 'all',
    label: 'ALL',
    description: 'Seluruh arsip karya kurasi Indra Wijaya',
  },
];

export const heroStackedCategories: StackedCardCategory[] = [
  {
    category: 'motion-graphic',
    title: 'MOTION GRAPHIC',
    tagline: 'High-Voltage Commercials & Kinetic Rhythms',
    previewVideoUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
    previewImageUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
    posterUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
    accentBadge: 'REEL FOCUS',
  },
  {
    category: 'graphic-design',
    title: 'GRAPHIC DESIGN',
    tagline: 'Avant-Garde Editorial & Brand Visual Systems',
    previewImageUrl: '/posters/chronos-poster.webp',
    posterUrl: '/posters/chronos-poster.webp',
    accentBadge: 'KEY VISUAL',
  },
  {
    category: 'ai-development',
    title: 'AI DEVELOPMENT',
    tagline: 'Generative Video Synthesis & Neural Pipelines',
    previewVideoUrl: '/videos/projects/neural-genesis-preview.mp4',
    previewImageUrl: '/posters/neural-genesis-poster.webp',
    posterUrl: '/posters/neural-genesis-poster.webp',
    accentBadge: 'NEURAL LAB',
  },
];

export const projectsDataset: ProjectItem[] = [
  {
    id: 'proj-mg-01',
    slug: 'hyperdrive-fintech-rebrand',
    title: 'Hyperdrive Fintech — Kinetic Rebrand Reel',
    category: 'motion-graphic',
    year: 2026,
    clientOrContext: 'Hyperdrive Labs Singapore',
    description: {
      shortSnippet:
        'Kampanye motion graphic berenergi tinggi untuk peluncuran global platform transaksi digital.',
      detailedChallenge:
        'Membawakan alur transaksi mikro yang cepat menjadi visual kinetik yang memikat audiens dalam 3 detik pertama.',
      solutionApplied:
        'Menyusun animasi tipografi kinetik berlapis, motion blur presisi, dan transisi match-cut di After Effects.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl:
        'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
      fallbackPosterUrl:
        'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
      fullMediaUrl:
        'https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4',
      aspectRatio: '16:9',
      durationSeconds: 32,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Premiere Pro', category: 'CORE_CREATIVE' },
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: true,
    sortOrder: 1,
  },
  {
    id: 'proj-mg-02',
    slug: 'pulse-beverage-social-blitz',
    title: 'Pulse Energy — Liquid Neon Surge Campaign',
    category: 'motion-graphic',
    year: 2025,
    clientOrContext: 'Pulse Beverages Asia',
    description: {
      shortSnippet:
        'Format vertical reels berkecepatan tinggi dengan integrasi ilustrasi dinamis dan efek glitch.',
      detailedChallenge:
        'Menghentikan scroll pengguna pada feed Instagram dan TikTok dengan warna neon mencolok dan ritme beat drum.',
      solutionApplied:
        'Kombinasi cel animation 2D dengan efek chromatic dispersion dan audio foley haptic.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/pulse-preview.mp4',
      fallbackPosterUrl: '/posters/pulse-poster.webp',
      fullMediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      aspectRatio: '9:16',
      durationSeconds: 20,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 2,
  },
  {
    id: 'proj-gd-01',
    slug: 'chronos-brutalist-identity',
    title: 'Chronos Runway — Brutalist Key Visual & Poster System',
    category: 'graphic-design',
    year: 2025,
    clientOrContext: 'Chronos Studio Paris',
    description: {
      shortSnippet:
        'Seri poster editorial dan visual identity modular monokromatik untuk gelaran pekan mode.',
      detailedChallenge:
        'Menciptakan komposisi visual yang mempertahankan keterbacaan tinggi di tengah eksperimen distorsi tipografi brutalist.',
      solutionApplied:
        'Merancang sistem grid modular di Adobe Illustrator serta grading tekstur film halftones di Photoshop.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/chronos-poster.webp',
      fallbackPosterUrl: '/posters/chronos-poster.webp',
      fullMediaUrl: '/posters/chronos-poster.webp',
      aspectRatio: '1:1',
    },
    tools: [
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
    ],
    featuredInHero: true,
    sortOrder: 3,
  },
  {
    id: 'proj-gd-02',
    slug: 'zenith-apex-automotive-editorial',
    title: 'Zenith Apex EV — Nocturnal Key Visuals',
    category: 'graphic-design',
    year: 2025,
    clientOrContext: 'Zenith Motors Global',
    description: {
      shortSnippet:
        'Desain visual promosi produk kendaraan listrik ultra-mewah dengan penekanan garis aerodinamis.',
      detailedChallenge:
        'Menyajikan material carbon fiber dan refleksi lampu neon secara realistis dalam format billboard dan digital display.',
      solutionApplied:
        'Kompositing high-res passes, color grading gelap dramatis, dan tipografi Swiss clean.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/zenith-poster.webp',
      fallbackPosterUrl: '/posters/zenith-poster.webp',
      fullMediaUrl: '/posters/zenith-poster.webp',
      aspectRatio: '16:9',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 4,
  },
  {
    id: 'proj-ai-01',
    slug: 'neural-genesis-ai-pipeline',
    title: 'Neural Genesis — Generative Video Synthesis R&D',
    category: 'ai-development',
    year: 2026,
    clientOrContext: 'Generative Art Collective (Internal R&D)',
    description: {
      shortSnippet:
        'Eksplorasi sintesis video berbasis AI yang mengombinasikan Midjourney, Runway Gen-3, dan compositing di After Effects.',
      detailedChallenge:
        'Menstabilkan flicker temporal dan menjaga konsistensi karakter antar pergantian frame AI generator.',
      solutionApplied:
        'Membangun pipeline multi-pass dengan optical flow interpolation dan color stabilization di After Effects & Premiere Pro.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/neural-genesis-preview.mp4',
      fallbackPosterUrl: '/posters/neural-genesis-poster.webp',
      fullMediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      aspectRatio: '9:16',
      durationSeconds: 24,
      comparisonSourceBeforeUrl: '/posters/neural-genesis-poster.webp',
    },
    tools: [
      { name: 'Midjourney', category: 'AI_TECH', isPrimary: true },
      { name: 'Runway Gen-3', category: 'AI_TECH', isPrimary: true },
      { name: 'ComfyUI', category: 'AI_TECH' },
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: true,
    sortOrder: 5,
  },
  {
    id: 'proj-ai-02',
    slug: 'quantum-synthetics-motion-lab',
    title: 'Quantum Fluidics — Neural Material Generation',
    category: 'ai-development',
    year: 2026,
    clientOrContext: 'Future Visuals Initiative',
    description: {
      shortSnippet:
        'Simulasi material cairan dan partikel kuantum yang dibangkitkan melalui prompt-guided latent diffusion model.',
      detailedChallenge:
        'Menghasilkan tekstur mikroskopis yang bergerak secara matematis tanpa memakan waktu render simulasi 3D berhari-hari.',
      solutionApplied:
        'Fine-tuning model difusi khusus materi cairan lalu di-upscale ke resolusi 4K dengan post-processing di Photoshop & After Effects.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/omni-poster.webp',
      fallbackPosterUrl: '/posters/omni-poster.webp',
      fullMediaUrl: '/posters/omni-poster.webp',
      aspectRatio: '1:1',
    },
    tools: [
      { name: 'Stable Diffusion', category: 'AI_TECH', isPrimary: true },
      { name: 'ComfyUI', category: 'AI_TECH' },
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 6,
  },
];
