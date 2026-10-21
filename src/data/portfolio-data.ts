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
    ambientBlurVideoUrl: '/videos/hero/hero-reel.mp4',
    sharpRevealVideoUrl: '/videos/hero/hero-reel.mp4',
    fallbackPosterUrl: '/posters/karya-terbaik.jpg',
    durationSeconds: 30,
  },
  navigationAndContact: {
    navLinks: [
      { id: 'works', label: 'ABOUT ME', targetAnchor: '#section-works' },
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
        url: 'https://www.behance.net/indrawijaya46',
      },
      {
        platform: 'WHATSAPP',
        label: 'WhatsApp',
        url: 'https://wa.me/6281234567890',
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
    previewVideoUrl: '/videos/projects/indra-portfolio-reel.mp4',
    previewImageUrl: '/posters/karya-terbaik.jpg',
    posterUrl: '/posters/karya-terbaik.jpg',
    accentBadge: 'REEL FOCUS',
    routeUrl: '/#section-exploration',
  },
  {
    category: 'visual-design',
    title: 'DESIGN GRAPHIC',
    tagline: 'Avant-Garde Editorial & Brand Visual Systems',
    previewImageUrl: '/posters/glass-poster.jpg',
    posterUrl: '/posters/glass-poster.jpg',
    accentBadge: 'KEY VISUAL',
    routeUrl: '/#section-exploration',
  },
  {
    category: 'web',
    title: 'AI DEVELOPMENT',
    tagline: 'Generative AI Pipelines & Intelligent Web Architectures',
    previewVideoUrl: '/videos/projects/logo-fade-final.mp4',
    previewImageUrl: '/posters/legend-assassin.jpg',
    posterUrl: '/posters/legend-assassin.jpg',
    accentBadge: 'AI & CODE',
    routeUrl: '/#section-exploration',
  },
];

export const projectsDataset: ProjectItem[] = [
  // 1. INDRA WIJAYA SHOWREEL (MOTION GRAPHICS)
  {
    id: 'proj-indra-reel',
    slug: 'indra-wijaya-motion-showreel',
    title: 'Indra Wijaya — Motion & Kinetic Showreel',
    titleId: 'Indra Wijaya — Showreel Motion & Kinetik',
    category: 'motion-graphics',
    year: 2026,
    clientOrContext: 'Indra Wijaya Showcase',
    role: 'Lead Motion Designer & Animator',
    description: {
      shortSnippet:
        'Signature motion showreel showcasing dynamic typography, commercial cuts, 3D kinetic flow, and high-energy pacing.',
      detailedChallenge:
        'Synthesizing diverse motion design techniques into a seamless high-impact reel with razor-sharp rhythmic timing.',
      solutionApplied:
        'Created layered 3D camera projections, precision speed ramps, and seamless beat synchronization in After Effects.',
    },
    descriptionId: {
      shortSnippet:
        'Showreel motion andalan yang menampilkan tipografi dinamis, potongan komersial, alur kinetik, dan ritme bertempo tinggi.',
      detailedChallenge:
        'Menggabungkan beragam teknik motion design menjadi reel berdampak tinggi dengan ketepatan ritme yang presisi.',
      solutionApplied:
        'Menyusun proyeksi kamera 3D berlapis, kurva kecepatan presisi, dan sinkronisasi audio di After Effects.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/indra-portfolio-reel.mp4',
      fallbackPosterUrl: '/posters/karya-terbaik.jpg',
      fullMediaUrl: '/videos/projects/indra-portfolio-reel.mp4',
      aspectRatio: '16:9',
      durationSeconds: 30,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Premiere Pro', category: 'CORE_CREATIVE', isPrimary: true },
    ],
    featuredInHero: true,
    sortOrder: 1,
  },

  // 2. MOTION LUTHER (MOTION GRAPHICS)
  {
    id: 'proj-luther-motion',
    slug: 'motion-luther-animation',
    title: 'Motion Luther — Dynamic Visual Animation',
    titleId: 'Motion Luther — Animasi Visual Dinamis',
    category: 'motion-graphics',
    year: 2026,
    clientOrContext: 'Luther Creative Project',
    role: 'Motion Graphic Artist & Animator',
    description: {
      shortSnippet:
        'Fluid character and graphic motion piece featuring expressive visual rhythm, smooth easing, and energetic camera movement.',
      detailedChallenge:
        'Maintaining visual momentum and character silhouette clarity during fast-paced transitional scenes.',
      solutionApplied:
        'Fine-tuned bezier curves in After Effects, supplemented by frame-by-frame secondary action enhancements.',
    },
    descriptionId: {
      shortSnippet:
        'Karya animasi grafis dengan ritme visual ekspresif, kurva transisi mulus, dan pergerakan kamera dinamis.',
      detailedChallenge:
        'Menjaga momentum visual dan kejelasan siluet objek pada rangkaian transisi berkecepatan tinggi.',
      solutionApplied:
        'Mengoptimalkan kurva bezier di After Effects dengan penambahan aksi sekunder untuk fleksibilitas gerakan.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/motion-luther-revisi.mp4',
      fallbackPosterUrl: '/posters/numb-pain-myself.png',
      fullMediaUrl: '/videos/projects/motion-luther-revisi.mp4',
      aspectRatio: '1:1',
      durationSeconds: 25,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: true,
    sortOrder: 2,
  },

  // 3. LOGO FADE FINAL (MOTION GRAPHICS)
  {
    id: 'proj-logo-fade',
    slug: 'logo-fade-kinetic-ident',
    title: 'Logo Fade Final — Kinetic Brand Identity Animation',
    titleId: 'Logo Fade Final — Animasi Identitas Brand Kinetik',
    category: 'motion-graphics',
    year: 2026,
    clientOrContext: 'Brand Identity Lab',
    role: 'Motion Identity Designer',
    description: {
      shortSnippet:
        'Mesmerizing kinetic logo dissolve and reveal exploring optical particle dispersal, neon glow, and minimalist aesthetics.',
      detailedChallenge:
        'Crafting an unforgettable 3-second identity sting that feels modern, futuristic, and premium.',
      solutionApplied:
        'Combined particle emitter simulation with custom displacement glow maps and sound design.',
    },
    descriptionId: {
      shortSnippet:
        'Animasi pembuka logo kinetik dengan efek disintegrasi partikel optik, pendaran neon, dan estetika minimalis modern.',
      detailedChallenge:
        'Merancang animasi identitas brand berdurasi ringkas namun meninggalkan impresi visual yang kuat dan mewah.',
      solutionApplied:
        'Memadukan simulasi emisi partikel dengan displacement glow map kustom serta penataan suara.',
    },
    media: {
      type: 'VIDEO_LOOP',
      previewUrl: '/videos/projects/logo-fade-final.mp4',
      fallbackPosterUrl: '/posters/legend-assassin.jpg',
      fullMediaUrl: '/videos/projects/logo-fade-final.mp4',
      aspectRatio: '16:9',
      durationSeconds: 6,
    },
    tools: [
      { name: 'Adobe After Effects', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 3,
  },

  // 4. GLASS POSTER (VISUAL DESIGN)
  {
    id: 'proj-glass-poster',
    slug: 'glass-poster-graphic-design',
    title: 'GLASS — Avant-Garde Typography & Poster System',
    titleId: 'GLASS — Sistem Poster & Tipografi Avant-Garde',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Exhibition Visual Arts',
    role: 'Graphic Designer & Typographer',
    description: {
      shortSnippet:
        'Striking editorial poster design balancing brutalist typography layout, translucent glass textures, and monochrome contrast.',
      detailedChallenge:
        'Achieving hyper-refined compositional balance between dense type hierarchies and high-refraction glass elements.',
      solutionApplied:
        'Crafted in Photoshop and Illustrator with precision optical kerning, custom grain passes, and glass dispersion shaders.',
    },
    descriptionId: {
      shortSnippet:
        'Desain poster editorial memukau yang memadukan tata letak tipografi brutalis, tekstur kaca transparan, dan kontras monokrom.',
      detailedChallenge:
        'Mencapai keseimbangan komposisi yang presisi antara hierarki teks padat dan refraksi elemen kaca.',
      solutionApplied:
        'Dibuat di Photoshop & Illustrator dengan penyesuaian kerning optik, tekstur grain khusus, dan shader dispersi kaca.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/glass-poster.jpg',
      fallbackPosterUrl: '/posters/glass-poster.jpg',
      fullMediaUrl: '/posters/glass-poster.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE', isPrimary: true },
    ],
    featuredInHero: false,
    sortOrder: 4,
  },

  // 5. KARYA TERBAIK (VISUAL DESIGN)
  {
    id: 'proj-karya-terbaik',
    slug: 'karya-terbaik-art-direction',
    title: 'KARYA TERBAIK — Masterpiece Visual Direction',
    titleId: 'KARYA TERBAIK — Arahan Visual Masterpiece',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Indra Creative Showcase',
    role: 'Lead Art Director & Visual Designer',
    description: {
      shortSnippet:
        'Selected centerpiece artwork featuring rich textural layering, dramatic lighting, and avant-garde composition.',
      detailedChallenge:
        'Elevating graphic composition to fine-art standards while maintaining commercial visual clarity.',
      solutionApplied:
        'Utilized complex multi-pass lighting techniques, textured brushes, and high-dynamic-range color grading.',
    },
    descriptionId: {
      shortSnippet:
        'Karya utama pilihan yang menampilkan perlapisan tekstur kaya, pencahayaan dramatis, dan komposisi avant-garde.',
      detailedChallenge:
        'Meningkatkan komposisi grafis ke standar visual bernilai seni tinggi dengan kejelasan pesan yang kuat.',
      solutionApplied:
        'Menggunakan teknik pencahayaan multi-pass, kuas bertekstur, dan penyesuaian warna high-dynamic-range.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/karya-terbaik.jpg',
      fallbackPosterUrl: '/posters/karya-terbaik.jpg',
      fullMediaUrl: '/posters/karya-terbaik.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Lightroom', category: 'FINISHING' },
    ],
    featuredInHero: true,
    sortOrder: 5,
  },

  // 6. LEGEND ASSASSIN (VISUAL DESIGN)
  {
    id: 'proj-legend-assassin',
    slug: 'legend-assassin-concept-art',
    title: 'Legend Assassin — Concept Art & Visual Composition',
    titleId: 'Legend Assassin — Concept Art & Komposisi Visual',
    category: 'visual-design',
    year: 2025,
    clientOrContext: 'Gaming & Narrative IP',
    role: 'Concept Artist & Digital Illustrator',
    description: {
      shortSnippet:
        'Atmospheric key visual concept depicting a stealth operative enveloped in cinematic volumetric fog and shadowplay.',
      detailedChallenge:
        'Depicting depth, cinematic mood, and focal presence through high-contrast chiaroscuro shadows.',
      solutionApplied:
        'Painted digitally with custom atmospheric brushes, rim lighting overlays, and film grain grading.',
    },
    descriptionId: {
      shortSnippet:
        'Konsep visual atmosferik yang menggambarkan agen rahasia berbalut kabut volumetrik dan permainan bayangan sinematik.',
      detailedChallenge:
        'Menghadirkan kedalaman ruang dan nuansa dramatis melalui kontras bayangan chiaroscuro yang intens.',
      solutionApplied:
        'Dilukis secara digital dengan brush atmosferik kustom, efek rim-light, dan grading film grain.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/legend-assassin.jpg',
      fallbackPosterUrl: '/posters/legend-assassin.jpg',
      fullMediaUrl: '/posters/legend-assassin.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Digital Painting', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 6,
  },

  // 7. NUMB PAIN MYSELF (VISUAL DESIGN)
  {
    id: 'proj-numb-pain',
    slug: 'numb-pain-myself-artwork',
    title: 'Numb Pain Myself — Experimental Visual Artwork',
    titleId: 'Numb Pain Myself — Karya Seni Visual Eksperimental',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Personal Artistic Series',
    role: 'Digital Artist & Creative Director',
    description: {
      shortSnippet:
        'Raw, emotive digital mixed-media poster piece exploring visceral human emotion, distress textures, and bold typography.',
      detailedChallenge:
        'Translating complex emotional vulnerabilities into striking visual symbols without losing aesthetic elegance.',
      solutionApplied:
        'Blended analog scanner artifacts, torn paper displacement, and deep emotional monochromatic grading.',
    },
    descriptionId: {
      shortSnippet:
        'Poster media campuran digital yang mengeksplorasi emosi mendalam melalui tekstur distorsi dan tipografi berani.',
      detailedChallenge:
        'Menerjemahkan kerentanan emosional menjadi simbol visual yang memikat tanpa kehilangan estetika artistik.',
      solutionApplied:
        'Memadukan tekstur scan analog, efek robekan kertas, dan grading monokromatik emosional.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/numb-pain-myself.png',
      fallbackPosterUrl: '/posters/numb-pain-myself.png',
      fullMediaUrl: '/posters/numb-pain-myself.png',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 7,
  },

  // 8. ARTBOARD 1 (VISUAL DESIGN)
  {
    id: 'proj-artboard-1',
    slug: 'brand-artboard-layout-system',
    title: 'Creative Brand Artboard & Editorial System',
    titleId: 'Artboard Brand Kreatif & Sistem Editorial',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Brand Studio Collection',
    role: 'Graphic Designer',
    description: {
      shortSnippet:
        'Architectural artboard layout establishing modern visual harmony, minimalist grid structures, and typography scales.',
      detailedChallenge:
        'Structuring expansive brand asset libraries into an effortless, readable editorial overview.',
      solutionApplied:
        'Engineered a modular Swiss-inspired grid system with tailored typographic scale and whitespace control.',
    },
    descriptionId: {
      shortSnippet:
        'Tata letak artboard terstruktur yang menghadirkan harmoni visual modern, sistem grid minimalis, dan hierarki tipografi.',
      detailedChallenge:
        'Menyusun ragam aset identitas brand menjadi ikhtisar editorial yang mudah dipahami dan estetis.',
      solutionApplied:
        'Merancang grid bergaya Swiss dengan skala tipografi proporsional dan kendali ruang negatif.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/artboard-1.jpg',
      fallbackPosterUrl: '/posters/artboard-1.jpg',
      fullMediaUrl: '/posters/artboard-1.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe InDesign', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 8,
  },

  // 9. ZENITH ICHIGO (VISUAL DESIGN)
  {
    id: 'proj-zenith-ichigo',
    slug: 'zenith-ichigo-visual-art',
    title: 'Zenith Ichigo — Character Art & Dynamic Poster',
    titleId: 'Zenith Ichigo — Seni Karakter & Poster Dinamis',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Anime & Character Concept Series',
    role: 'Digital Illustrator & Art Director',
    description: {
      shortSnippet:
        'High-energy character artwork merging bold kinetic linework, dramatic chiaroscuro contrast, and expressive anime aesthetics.',
      detailedChallenge:
        'Capturing the visceral intensity and spiritual power of the character while maintaining sleek editorial poster balance.',
      solutionApplied:
        'Layered high-contrast lighting passes, custom energy dispersion brushwork, and striking typographic framing.',
    },
    descriptionId: {
      shortSnippet:
        'Karya seni karakter berenergi tinggi yang memadukan garis kinetik berani, kontras chiaroscuro dramatis, dan estetika anime ekspresif.',
      detailedChallenge:
        'Menangkap intensitas karakter yang kuat sembari mempertahankan keseimbangan tata letak poster editorial yang modern.',
      solutionApplied:
        'Menyusun pencahayaan berkontras tinggi, kuas dispersi energi kustom, dan pembingkaian tipografi yang tegas.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/zenith-ichigo.jpg',
      fallbackPosterUrl: '/posters/zenith-ichigo.jpg',
      fullMediaUrl: '/posters/zenith-ichigo.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Digital Illustration', category: 'CORE_CREATIVE', isPrimary: true },
    ],
    featuredInHero: false,
    sortOrder: 9,
  },

  // 10. POSTER GABUT (VISUAL DESIGN)
  {
    id: 'proj-poster-gabut',
    slug: 'creative-poster-visual-exploration',
    title: 'Creative Poster Exploration — Avant-Garde Graphic Study',
    titleId: 'Eksplorasi Poster Kreatif — Studi Grafis Avant-Garde',
    category: 'visual-design',
    year: 2026,
    clientOrContext: 'Experimental Graphic Lab',
    role: 'Graphic Designer & Visual Experimenter',
    description: {
      shortSnippet:
        'Spontaneous experimental poster exploration celebrating expressive typography, analog texture grain, and unrestricted compositional freedom.',
      detailedChallenge:
        'Exploring untethered artistic creativity while maintaining rigorous graphic design rhythm and focal balance.',
      solutionApplied:
        'Constructed with multi-layered scan textures, expressive typography experimentation, and deliberate negative space tension.',
    },
    descriptionId: {
      shortSnippet:
        'Eksplorasi poster eksperimental spontan yang merayakan tipografi ekspresif, butiran tekstur analog, dan kebebasan komposisi visual.',
      detailedChallenge:
        'Mengeksplorasi kreativitas artistik tanpa batas dengan tetap mempertahankan ritme desain grafis dan fokus visual yang kuat.',
      solutionApplied:
        'Dibangun dengan perpaduan tekstur scan multi-layer, eksperimen tipografi ekspresif, dan tensi ruang negatif yang terukur.',
    },
    media: {
      type: 'IMAGE_STILL',
      previewUrl: '/posters/poster-gabut.jpg',
      fallbackPosterUrl: '/posters/poster-gabut.jpg',
      fullMediaUrl: '/posters/poster-gabut.jpg',
      aspectRatio: '4:5',
    },
    tools: [
      { name: 'Adobe Photoshop', category: 'CORE_CREATIVE', isPrimary: true },
      { name: 'Adobe Illustrator', category: 'CORE_CREATIVE' },
    ],
    featuredInHero: false,
    sortOrder: 10,
  },
];
