import {
  SiteIdentity,
  CategoryFilterItem,
  StackedCardCategory,
  ProjectItem,
} from '@/types/portfolio';

export const siteIdentityData: SiteIdentity = {
  brandName: 'INDRA WIJAYA',
  primaryRole: 'Motion Designer, Graphic Designer & AI Developer',
  heroKinetic: {
    prefix: 'Creative ',
    dynamicWords: ['motion', 'graphic', 'ai dev', 'creative'],
    suffix: ' designer',
    subHeadline:
      'Crafting high-voltage kinetic typography, graphic design identity systems, and generative AI development.',
    accentColor: '#E68A1E', // Warm amber / golden serif accent
  },
  metadataBar: {
    specializations: 'MOTION GRAPHIC / DESIGN GRAPHIC / AI DEVELOPMENT',
    availabilityStatus: 'CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATION',
    location: 'BASED IN INDONESIA (REMOTE WORLDWIDE)',
  },
  heroShowreel: {
    ambientBlurVideoUrl: '/videos/hero/reference-purrweb.mp4',
    sharpRevealVideoUrl: '/videos/hero/reference-purrweb.mp4',
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
      phoneNumber: '6281234567890',
      defaultMessage:
        'Hello Indra, I came across your portfolio and would like to discuss an upcoming collaboration.',
      categoryContextMessages: {
        'motion-graphics':
          'Hello Indra, I would like to discuss a Motion Graphic project for our brand.',
        'motion-graphic':
          'Hello Indra, I would like to discuss a Motion Graphic project for our brand.',
        'visual-design':
          'Hello Indra, I am interested in discussing Graphic Design & Brand Identity with you.',
        'graphic-design':
          'Hello Indra, I am interested in discussing Graphic Design & Brand Identity with you.',
        'ai-development':
          'Hello Indra, I want to talk about an AI Development & Creative Web project with you.',
        web:
          'Hello Indra, I want to talk about an AI Development & Creative Web project with you.',
        'video-editing':
          'Hello Indra, I would like to collaborate on Video Editing & Post-Production for our campaign.',
      },
    },
    instagram: {
      username: 'draawijayaa._8',
      profileUrl: 'https://www.instagram.com/draawijayaa._8?xtok=dXV3OXlzMWdvN3o3',
      displayHandle: '@draawijayaa._8',
    },
    socials: [
      {
        platform: 'INSTAGRAM',
        label: 'Instagram',
        url: 'https://www.instagram.com/draawijayaa._8?xtok=dXV3OXlzMWdvN3o3',
        isPrimary: true,
      },
      {
        platform: 'BEHANCE',
        label: 'Behance',
        url: 'https://behance.net/indrawijaya',
      },
      {
        platform: 'VIMEO',
        label: 'Vimeo',
        url: 'https://vimeo.com/indrawijaya',
      },
      {
        platform: 'LINKEDIN',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/indrawijaya',
      },
      {
        platform: 'GITHUB',
        label: 'GitHub',
        url: 'https://github.com/indrawijaya',
      },
    ],
  },
};

export const categoryFilterList: CategoryFilterItem[] = [
  {
    id: 'all',
    label: 'ALL',
    description: 'Complete curated archive across all creative disciplines.',
  },
  {
    id: 'motion-graphics',
    label: 'MOTION GRAPHIC',
    description: 'Dynamic kinetic typography, 3D commercial reels, and broadcast motion.',
  },
  {
    id: 'visual-design',
    label: 'DESIGN GRAPHIC',
    description: 'Brand identity systems, brutalist typography posters, and art direction.',
  },
  {
    id: 'web',
    label: 'AI DEVELOPMENT',
    description: 'Generative AI pipelines, neural interfaces, Next.js, and interactive apps.',
  },
  {
    id: 'video-editing',
    label: 'VIDEO EDITING',
    description: 'Cinematic pacing, commercial narrative cuts, and rhythm editing.',
  },
];

export const heroStackedCategories: StackedCardCategory[] = [
  {
    category: 'motion-graphics',
    title: 'MOTION GRAPHIC',
    tagline: 'High-Voltage Commercials & Kinetic Rhythms',
    previewVideoUrl: '/videos/hero/reference-purrweb.mp4',
    previewImageUrl:
      'https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png',
    posterUrl: '/posters/hero-poster.webp',
    accentBadge: 'REEL FOCUS',
    routeUrl: '/work/motion-graphics',
  },
  {
    category: 'visual-design',
    title: 'DESIGN GRAPHIC',
    tagline: 'Avant-Garde Editorial & Brand Visual Systems',
    previewImageUrl: '/posters/chronos-poster.webp',
    posterUrl: '/posters/chronos-poster.webp',
    accentBadge: 'KEY VISUAL',
    routeUrl: '/work/visual-design',
  },
  {
    category: 'web',
    title: 'AI DEVELOPMENT',
    tagline: 'Generative AI Pipelines & Intelligent Web Architectures',
    previewVideoUrl: '/videos/projects/lumina-preview.mp4',
    previewImageUrl: '/posters/lumina-poster.webp',
    posterUrl: '/posters/lumina-poster.webp',
    accentBadge: 'AI & CODE',
    routeUrl: '/work/web',
  },
];

export const projectsDataset: ProjectItem[] = [
  // 1. MOTION GRAPHICS
  {
    id: 'proj-mg-01',
    slug: 'hyperdrive-fintech-rebrand',
    title: 'Hyperdrive Fintech — Kinetic Rebrand Reel',
    titleId: 'Hyperdrive Fintech — Reel Rebrand Kinetik',
    category: 'motion-graphics',
    year: 2026,
    clientOrContext: 'Hyperdrive Labs Singapore',
    role: 'Lead Motion Designer & Art Director',
    description: {
      shortSnippet:
        'High-energy kinetic motion graphics campaign for the international launch of a next-gen digital payments app.',
      detailedChallenge:
        'Translate complex microsecond financial infrastructure into gripping visual metaphors within the crucial first 3 seconds of viewer attention.',
      solutionApplied:
        'Architected layered kinetic typography, optical motion blur, and precise audio-reactive match-cuts inside Adobe After Effects.',
    },
    descriptionId: {
      shortSnippet:
        'Kampanye motion graphic kinetik berenergi tinggi untuk peluncuran global aplikasi pembayaran digital generasi baru.',
      detailedChallenge:
        'Menerjemahkan infrastruktur transaksi mikro yang rumit menjadi metafora visual yang memikat dalam 3 detik pertama atensi audiens.',
      solutionApplied:
        'Menyusun tipografi kinetik berlapis, motion blur optik, dan transisi match-cut reaktif di Adobe After Effects.',
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
      durationSeconds: 12,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Premiere Pro', category: 'CORE_CREATIVE' },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: true,
    sortOrder: 1,
  },
  {
    id: 'proj-mg-02',
    slug: 'lumina-kinetic-typography',
    title: 'Lumina — Kinetic Typography & Brand Idents',
    titleId: 'Lumina — Tipografi Kinetik & Ident Brand',
    category: 'motion-graphics',
    year: 2026,
    clientOrContext: 'Lumina Creative Studio',
    role: 'Motion Designer',
    description: {
      shortSnippet:
        'Broadcast identity package featuring parametric typography shifts, displacement mapping, and high-framerate kinetic layouts.',
      detailedChallenge:
        'Create a responsive motion identity system that flexes seamlessly across 16:9 broadcast monitors and vertical 9:16 mobile feeds.',
      solutionApplied:
        'Engineered procedural expression rigs in After Effects paired with customized SVG kinetic vectors.',
    },
    descriptionId: {
      shortSnippet:
        'Paket identitas siaran menampilkan pergeseran tipografi parametrik, displacement mapping, dan tata letak kinetik framerate tinggi.',
      detailedChallenge:
        'Menciptakan sistem identitas motion responsif yang fleksibel antara layar siaran 16:9 dan format vertikal 9:16.',
      solutionApplied:
        'Mengembangkan ekspresi prosedural di After Effects dipadukan dengan aset vektor kinetik SVG kustom.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/hyperdrive-preview.mp4',
      fallbackPosterUrl: '/posters/hyperdrive-poster.webp',
      fullMediaUrl: '/videos/projects/hyperdrive-preview.mp4',
      aspectRatio: '16:9',
      durationSeconds: 15,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 2,
  },

  // 2. VIDEO EDITING
  {
    id: 'proj-ve-01',
    slug: 'zenith-broadcast-commercial',
    title: 'Zenith Watchmakers — Cinematic Commercial Cut',
    titleId: 'Zenith Watchmakers — Potongan Komersial Sinematik',
    category: 'video-editing',
    year: 2025,
    clientOrContext: 'Zenith Luxury Horology',
    role: 'Senior Video Editor & Colorist',
    description: {
      shortSnippet:
        'Paced 60-second narrative commercial cut weaving macro horology craftsmanship with modern cinematic momentum.',
      detailedChallenge:
        'Balance intimate macro watch mechanics footage with rapid electronic sound design and high-contrast color grading.',
      solutionApplied:
        'Cut with rhythmic pacing in Premiere Pro and DaVinci Resolve, utilizing ACES color management and multi-track audio design.',
    },
    descriptionId: {
      shortSnippet:
        'Iklan naratif berdurasi 60 detik yang memadukan keahlian pembuatan jam tangan mekanis dengan ritme sinematik modern.',
      detailedChallenge:
        'Menyeimbangkan rekaman mekanika makro yang presisi dengan tata suara elektronik bertempo cepat dan grading warna kontras tinggi.',
      solutionApplied:
        'Diedit dengan ritme presisi di Premiere Pro & DaVinci Resolve, memanfaatkan manajemen warna ACES dan desain suara multi-track.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/zenith-preview.mp4',
      fallbackPosterUrl: '/posters/zenith-poster.webp',
      fullMediaUrl: '/videos/projects/zenith-preview.mp4',
      aspectRatio: '16:9',
      durationSeconds: 20,
    },
    tools: [
      { name: 'Adobe Premiere Pro', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'DaVinci Resolve', category: 'FINISHING', isPrimary: true },
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: true,
    sortOrder: 3,
  },
  {
    id: 'proj-ve-02',
    slug: 'pulse-rhythm-film-cut',
    title: 'Pulse Rhythm — Vertical Social Campaign Cut',
    titleId: 'Pulse Rhythm — Kampanye Sosial Format Vertikal',
    category: 'video-editing',
    year: 2026,
    clientOrContext: 'Beats & Soundwear Collective',
    role: 'Video Editor & Sound Designer',
    description: {
      shortSnippet:
        'High-octane vertical 9:16 social commercial edit engineered for maximum retention and rhythmic audio synchronization.',
      detailedChallenge:
        'Retain audience immersion in mobile vertical video formats using speed ramps and seamless optical jump cuts.',
      solutionApplied:
        'Fine-tuned beat-synced cutting, directional whip transitions, and bass impact transients.',
    },
    descriptionId: {
      shortSnippet:
        'Iklan vertikal format 9:16 berkecepatan tinggi yang dirancang untuk retensi maksimal dan sinkronisasi audio presisi.',
      detailedChallenge:
        'Menjaga keterlibatan audiens pada layar vertikal ponsel menggunakan speed ramps dan potongan lompat optik yang mulus.',
      solutionApplied:
        'Penyelarasan ketukan suara, transisi cambuk terarah, dan penguatan efek suara bass imersif.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/pulse-preview.mp4',
      fallbackPosterUrl: '/posters/pulse-poster.webp',
      fullMediaUrl: '/videos/projects/pulse-preview.mp4',
      aspectRatio: '9:16',
      durationSeconds: 14,
    },
    tools: [
      { name: 'Adobe Premiere Pro', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 4,
  },

  // 3. VISUAL DESIGN
  {
    id: 'proj-vd-01',
    slug: 'chronos-runway-brutalist',
    title: 'Chronos Runway — Brutalist Key Visual & Poster Series',
    titleId: 'Chronos Runway — Seri Poster Brutalis & Key Visual',
    category: 'visual-design',
    year: 2025,
    clientOrContext: 'Chronos Studio Paris',
    role: 'Visual Designer & Typographer',
    description: {
      shortSnippet:
        'Avant-garde editorial posters and modular identity system exploring monochrome typography and optical distortion.',
      detailedChallenge:
        'Maintain exceptional legibility across massive display banners while pushing experimental brutalist typography grids.',
      solutionApplied:
        'Developed custom vector grid alignments in Illustrator and applied tactile risograph halftone textures in Photoshop.',
    },
    descriptionId: {
      shortSnippet:
        'Seri poster editorial avant-garde dan identitas modular yang mengeksplorasi tipografi monokrom dan distorsi optik.',
      detailedChallenge:
        'Mempertahankan keterbacaan tinggi pada banner berskala raksasa di tengah eksplorasi tata letak brutalis eksperimental.',
      solutionApplied:
        'Merancang grid vektor kustom di Illustrator dan memadukannya dengan tekstur halftone risografis di Photoshop.',
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
    featuredInHero: false,
    sortOrder: 5,
  },
  {
    id: 'proj-vd-02',
    slug: 'omni-brand-identity',
    title: 'Omni — Generative Brand Identity & Design System',
    titleId: 'Omni — Identitas Brand Generatif & Sistem Desain',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Omni Synthetic Systems',
    role: 'Art Director & Brand Designer',
    description: {
      shortSnippet:
        'Comprehensive visual identity program featuring responsive logo marks, custom geometric display fonts, and digital guidelines.',
      detailedChallenge:
        'Unify marketing materials across 12 product lines with a singular, minimalist visual architecture.',
      solutionApplied:
        'Built a 3-tier design token architecture and modular grid system for both digital interfaces and print publications.',
    },
    descriptionId: {
      shortSnippet:
        'Program identitas visual komprehensif mencakup tanda logo responsif, font display geometris, dan panduan desain digital.',
      detailedChallenge:
        'Menyatukan materi pemasaran dari 12 lini produk di bawah satu arsitektur visual minimalis yang konsisten.',
      solutionApplied:
        'Membangun sistem token desain 3-tingkat dan tata letak modular untuk antarmuka digital maupun publikasi cetak.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/omni-poster.webp',
      fallbackPosterUrl: '/posters/omni-poster.webp',
      fullMediaUrl: '/posters/omni-poster.webp',
      aspectRatio: '16:9',
    },
    tools: [
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 6,
  },

  // 4. WEB DEVELOPMENT
  {
    id: 'proj-web-01',
    slug: 'lumina-interactive-engine',
    title: 'Lumina Studio — Interactive Creative Web Experience',
    titleId: 'Lumina Studio — Pengalaman Web Kreatif & Interaktif',
    category: 'web',
    year: 2026,
    clientOrContext: 'Lumina Architectural Lab',
    role: 'Creative Developer & Frontend Architect',
    projectUrl: 'https://lumina-studio.demo',
    description: {
      shortSnippet:
        'Award-winning interactive website showcasing 60fps smooth scrolling, GPU optical lens masking, and dynamic physics.',
      detailedChallenge:
        'Achieve seamless 60fps rendering with complex radial masking and video playback without dropping frames on mobile hardware.',
      solutionApplied:
        'Built with Next.js 16 App Router, Lenis smooth scroll, GSAP animation ticker, and hardware-accelerated CSS clip-paths.',
    },
    descriptionId: {
      shortSnippet:
        'Website interaktif berstandar award dengan navigasi mulus 60fps, masking lensa optik GPU, dan efek fisika dinamis.',
      detailedChallenge:
        'Mencapai rendering 60fps yang stabil dengan masking radial kompleks dan pemutaran video tanpa frame drop di perangkat mobile.',
      solutionApplied:
        'Dibangun dengan Next.js 16 App Router, Lenis smooth scroll, ticker animasi GSAP, dan akselerasi hardware CSS clip-path.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/lumina-preview.mp4',
      fallbackPosterUrl: '/posters/lumina-poster.webp',
      fullMediaUrl: '/videos/projects/lumina-preview.mp4',
      aspectRatio: '16:9',
      durationSeconds: 18,
    },
    tools: [
      { name: 'Next.js', category: 'DEVELOPMENT', isPrimary: true },
      { name: 'React', category: 'DEVELOPMENT', isPrimary: true },
      { name: 'TypeScript', category: 'DEVELOPMENT', isPrimary: true },
      { name: 'Tailwind CSS', category: 'DEVELOPMENT' },
      { name: 'GSAP', category: 'DEVELOPMENT' },
    ],
    featuredInHero: true,
    sortOrder: 7,
  },
  {
    id: 'proj-web-02',
    slug: 'synapse-developer-portal',
    title: 'Synapse — Realtime Creative Developer Sandbox',
    titleId: 'Synapse — Sandbox Realtime Pengembang Kreatif',
    category: 'web',
    year: 2026,
    clientOrContext: 'Synapse Open Source',
    role: 'Full-Stack Creative Developer',
    projectUrl: 'https://synapse-dev.demo',
    description: {
      shortSnippet:
        'Interactive developer workspace for shader prototyping, generative canvas visualization, and design token inspection.',
      detailedChallenge:
        'Deliver sub-50ms reactive feedback while live compiling GLSL shaders and state machines in the browser.',
      solutionApplied:
        'Implemented Web Workers for off-thread compiling, WebGL canvas buffers, and Zustand transient state streams.',
    },
    descriptionId: {
      shortSnippet:
        'Ruang kerja interaktif pengembang untuk pembuatan prototipe shader, visualisasi kanvas generatif, dan inspeksi token desain.',
      detailedChallenge:
        'Menghadirkan respons real-time sub-50ms saat kompilasi langsung shader GLSL dan mesin status di browser.',
      solutionApplied:
        'Mengimplementasikan Web Workers untuk kompilasi latar belakang, buffer kanvas WebGL, dan streaming status Zustand.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/omni-preview.mp4',
      fallbackPosterUrl: '/posters/omni-poster.webp',
      fullMediaUrl: '/videos/projects/omni-preview.mp4',
      aspectRatio: '16:9',
      durationSeconds: 16,
    },
    tools: [
      { name: 'Next.js', category: 'DEVELOPMENT', isPrimary: true },
      { name: 'TypeScript', category: 'DEVELOPMENT' },
      { name: 'Tailwind CSS', category: 'DEVELOPMENT' },
    ],
    featuredInHero: false,
    sortOrder: 8,
  },

  // 5. AI DEVELOPMENT
  {
    id: 'proj-ai-01',
    slug: 'aura-neural-ai-agent',
    title: 'Aura AI — Autonomous Motion & Generative Visual Agent',
    titleId: 'Aura AI — Agen Motion Otonom & Visual Generatif',
    category: 'ai-development',
    year: 2026,
    clientOrContext: 'Aura Neural Labs',
    role: 'AI Engineer & Creative Technologist',
    projectUrl: 'https://aura-motion.ai',
    description: {
      shortSnippet:
        'Next-generation AI agent that converts natural language script directly into 60fps kinetic motion keyframes and generative video passes.',
      detailedChallenge:
        'Bridge the gap between probabilistic generative AI diffusion models and deterministic 60fps keyframe timelines.',
      solutionApplied:
        'Orchestrated multi-agent Claude 3.7 workflows connected with ComfyUI API nodes, generating vector SVG animation scripts and synchronized audio layers.',
    },
    descriptionId: {
      shortSnippet:
        'Agen AI generasi baru yang mengubah naskah bahasa alami langsung menjadi keyframe motion 60fps dan visual video generatif.',
      detailedChallenge:
        'Menjembatani model difusi AI generatif probabilistik dengan timeline animasi keyframe 60fps yang deterministik.',
      solutionApplied:
        'Mengorkestrasi agen multi-tahap Claude 3.7 yang terhubung dengan API ComfyUI, menghasilkan skrip animasi SVG dan lapisan audio tersinkronisasi.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/hero/reference-purrweb.mp4',
      fallbackPosterUrl: '/posters/hero-poster.webp',
      fullMediaUrl: '/videos/hero/reference-purrweb.mp4',
      aspectRatio: '16:9',
      durationSeconds: 24,
    },
    tools: [
      { name: 'ComfyUI', category: 'AI_TECH', isPrimary: true },
      { name: 'Claude / GPT-4', category: 'AI_TECH', isPrimary: true },
      { name: 'Runway Gen-3', category: 'AI_TECH' },
      { name: 'Next.js', category: 'DEVELOPMENT', isPrimary: true },
      { name: 'TypeScript', category: 'DEVELOPMENT' },
    ],
    featuredInHero: true,
    sortOrder: 9,
  },
  {
    id: 'proj-ai-02',
    slug: 'comfyui-generative-video-rig',
    title: 'Latent Motion Studio — ComfyUI Real-Time Video Rig',
    titleId: 'Latent Motion Studio — Rig Video Real-Time ComfyUI',
    category: 'ai-development',
    year: 2026,
    clientOrContext: 'Synthetic Vision Media',
    role: 'AI Pipeline Architect',
    description: {
      shortSnippet:
        'Custom modular ComfyUI node pipeline integrating AnimateDiff, ControlNet IP-Adapter, and WebGL realtime canvas previews.',
      detailedChallenge:
        'Maintain temporal coherence across high-speed camera pans without flickering or anatomical artifacts.',
      solutionApplied:
        'Engineered custom latent blend shaders with optical flow vectors and automated upscale interpolation.',
    },
    descriptionId: {
      shortSnippet:
        'Pipeline ComfyUI modular khusus yang mengintegrasikan AnimateDiff, ControlNet IP-Adapter, dan pratinjau kanvas real-time WebGL.',
      detailedChallenge:
        'Mempertahankan koherensi temporal pada gerakan kamera berkecepatan tinggi tanpa flicker atau artefak visual.',
      solutionApplied:
        'Merancang shader percampuran laten khusus dengan vektor aliran optik dan interpolasi peningkatan resolusi otomatis.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/lumina-preview.mp4',
      fallbackPosterUrl: '/posters/lumina-poster.webp',
      fullMediaUrl: '/videos/projects/lumina-preview.mp4',
      aspectRatio: '16:9',
      durationSeconds: 19,
    },
    tools: [
      { name: 'ComfyUI', category: 'AI_TECH', isPrimary: true },
      { name: 'Stable Diffusion', category: 'AI_TECH', isPrimary: true },
      { name: 'React', category: 'DEVELOPMENT' },
      { name: 'GSAP', category: 'DEVELOPMENT' },
    ],
    featuredInHero: false,
    sortOrder: 10,
  },
];
