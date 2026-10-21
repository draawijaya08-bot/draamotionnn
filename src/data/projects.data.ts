import { ProjectItemSchema } from '@/types/content.types';

/**
 * Indra Wijaya Authentic Portfolio Projects
 * Only authentic projects provided by Indra Wijaya.
 */
export const projectsData: ProjectItemSchema[] = [
  // 1. INDRA WIJAYA SHOWREEL (MOTION GRAPHICS)
  {
    id: 'proj-01',
    slug: 'indra-wijaya-motion-showreel',
    title: 'Indra Wijaya — Motion & Kinetic Showreel',
    client: {
      name: 'Indra Wijaya Showcase',
      industry: 'Motion Design & Kinetic Branding',
    },
    category: 'MOTION_GRAPHICS',
    year: 2026,
    aspectRatio: '16:9',
    media: {
      previewLoopUrl: '/videos/projects/indra-portfolio-reel.mp4',
      posterThumbnailUrl: '/posters/karya-terbaik.jpg',
      fullVideoUrl: '/videos/projects/indra-portfolio-reel.mp4',
      videoDurationSeconds: 30,
      hasAudio: true,
    },
    description: {
      challengeSnippet: 'Synthesizing diverse motion design techniques into a seamless high-impact reel with razor-sharp rhythmic timing.',
      solutionSnippet: 'Created layered 3D camera projections, precision speed ramps, and seamless beat synchronization in After Effects.',
    },
    roles: [
      { roleName: 'Lead Motion Designer', percentageOrScope: 'Creative Direction & Animation' },
      { roleName: 'Video Editor & Colorist', percentageOrScope: 'Soundtrack Sync & Grade' },
    ],
    toolsUsed: ['Adobe After Effects', 'Adobe Premiere Pro'],
    metrics: {
      viewsOrReach: 'Featured Master Showreel',
      keyResult: 'Flagship Motion Showcase',
    },
    featured: true,
    sortOrder: 1,
  },

  // 2. MOTION LUTHER (MOTION GRAPHICS)
  {
    id: 'proj-02',
    slug: 'motion-luther-animation',
    title: 'Motion Luther — Dynamic Visual Animation',
    client: {
      name: 'Luther Creative Project',
      industry: 'Visual Storytelling',
    },
    category: 'MOTION_GRAPHICS',
    year: 2026,
    aspectRatio: '1:1',
    media: {
      previewLoopUrl: '/videos/projects/motion-luther-revisi.mp4',
      posterThumbnailUrl: '/posters/numb-pain-myself.png',
      fullVideoUrl: '/videos/projects/motion-luther-revisi.mp4',
      videoDurationSeconds: 25,
      hasAudio: true,
    },
    description: {
      challengeSnippet: 'Maintaining visual momentum and character silhouette clarity during fast-paced transitional scenes.',
      solutionSnippet: 'Fine-tuned bezier curves in After Effects, supplemented by frame-by-frame secondary action enhancements.',
    },
    roles: [
      { roleName: 'Motion Graphic Artist', percentageOrScope: 'Animation' },
      { roleName: 'Visual Development', percentageOrScope: 'Asset Prep' },
    ],
    toolsUsed: ['Adobe After Effects', 'Adobe Illustrator'],
    metrics: {
      viewsOrReach: 'Creative Animation',
      keyResult: 'Dynamic Motion System',
    },
    featured: true,
    sortOrder: 2,
  },

  // 3. LOGO FADE FINAL (MOTION GRAPHICS)
  {
    id: 'proj-03',
    slug: 'logo-fade-kinetic-ident',
    title: 'Logo Fade Final — Kinetic Brand Identity Animation',
    client: {
      name: 'Brand Identity Lab',
      industry: 'Branding & Kinetic Identity',
    },
    category: 'BRANDING_KINETIC',
    year: 2026,
    aspectRatio: '16:9',
    media: {
      previewLoopUrl: '/videos/projects/logo-fade-final.mp4',
      posterThumbnailUrl: '/posters/legend-assassin.jpg',
      fullVideoUrl: '/videos/projects/logo-fade-final.mp4',
      videoDurationSeconds: 6,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Crafting an unforgettable 3-second identity sting that feels modern, futuristic, and premium.',
      solutionSnippet: 'Combined particle emitter simulation with custom displacement glow maps and sound design.',
    },
    roles: [
      { roleName: 'Motion Identity Designer', percentageOrScope: 'Lookdev & Animation' },
    ],
    toolsUsed: ['Adobe After Effects', 'Adobe Illustrator'],
    metrics: {
      viewsOrReach: 'Kinetic Ident Sting',
      keyResult: 'Brand Visual Identity',
    },
    featured: false,
    sortOrder: 3,
  },

  // 4. GLASS POSTER (DESIGN GRAPHIC)
  {
    id: 'proj-04',
    slug: 'glass-poster-graphic-design',
    title: 'GLASS — Avant-Garde Typography & Poster System',
    client: {
      name: 'Exhibition Visual Arts',
      industry: 'Editorial & Graphic Art',
    },
    category: 'BRANDING_KINETIC',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/glass-poster.jpg',
      posterThumbnailUrl: '/posters/glass-poster.jpg',
      fullVideoUrl: '/posters/glass-poster.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Achieving hyper-refined compositional balance between dense type hierarchies and high-refraction glass elements.',
      solutionSnippet: 'Crafted in Photoshop and Illustrator with precision optical kerning, custom grain passes, and glass dispersion shaders.',
    },
    roles: [
      { roleName: 'Graphic Designer', percentageOrScope: '100%' },
      { roleName: 'Typographer', percentageOrScope: 'Custom Layout' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
    metrics: {
      viewsOrReach: 'Editorial Poster',
      keyResult: 'Key Visual System',
    },
    featured: false,
    sortOrder: 4,
  },

  // 5. KARYA TERBAIK (DESIGN GRAPHIC)
  {
    id: 'proj-05',
    slug: 'karya-terbaik-art-direction',
    title: 'KARYA TERBAIK — Masterpiece Visual Direction',
    client: {
      name: 'Indra Creative Showcase',
      industry: 'Art Direction & Visual Arts',
    },
    category: '3D_VISUALS',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/karya-terbaik.jpg',
      posterThumbnailUrl: '/posters/karya-terbaik.jpg',
      fullVideoUrl: '/posters/karya-terbaik.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Elevating graphic composition to fine-art standards while maintaining commercial visual clarity.',
      solutionSnippet: 'Utilized complex multi-pass lighting techniques, textured brushes, and high-dynamic-range color grading.',
    },
    roles: [
      { roleName: 'Lead Art Director', percentageOrScope: 'Concept & Direction' },
      { roleName: 'Visual Designer', percentageOrScope: 'Finishing' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Adobe Lightroom'],
    metrics: {
      viewsOrReach: 'Masterpiece Selection',
      keyResult: 'Curated Showcase',
    },
    featured: true,
    sortOrder: 5,
  },

  // 6. LEGEND ASSASSIN (CONCEPT ART)
  {
    id: 'proj-06',
    slug: 'legend-assassin-concept-art',
    title: 'Legend Assassin — Concept Art & Visual Composition',
    client: {
      name: 'Gaming & Narrative IP',
      industry: 'Digital Illustration & Concept Art',
    },
    category: '3D_VISUALS',
    year: 2025,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/legend-assassin.jpg',
      posterThumbnailUrl: '/posters/legend-assassin.jpg',
      fullVideoUrl: '/posters/legend-assassin.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Depicting depth, cinematic mood, and focal presence through high-contrast chiaroscuro shadows.',
      solutionSnippet: 'Painted digitally with custom atmospheric brushes, rim lighting overlays, and film grain grading.',
    },
    roles: [
      { roleName: 'Concept Artist', percentageOrScope: 'Illustration & Composition' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Digital Painting'],
    metrics: {
      viewsOrReach: 'Concept Art',
      keyResult: 'Atmospheric Key Visual',
    },
    featured: false,
    sortOrder: 6,
  },

  // 7. NUMB PAIN MYSELF (EXPERIMENTAL ARTWORK)
  {
    id: 'proj-07',
    slug: 'numb-pain-myself-artwork',
    title: 'Numb Pain Myself — Experimental Visual Artwork',
    client: {
      name: 'Personal Artistic Series',
      industry: 'Digital Mixed Media',
    },
    category: 'BRANDING_KINETIC',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/numb-pain-myself.png',
      posterThumbnailUrl: '/posters/numb-pain-myself.png',
      fullVideoUrl: '/posters/numb-pain-myself.png',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Translating complex emotional vulnerabilities into striking visual symbols without losing aesthetic elegance.',
      solutionSnippet: 'Blended analog scanner artifacts, torn paper displacement, and deep emotional monochromatic grading.',
    },
    roles: [
      { roleName: 'Digital Artist', percentageOrScope: 'Direction & Mixed Media' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
    metrics: {
      viewsOrReach: 'Experimental Series',
      keyResult: 'Artwork Release',
    },
    featured: false,
    sortOrder: 7,
  },

  // 8. ARTBOARD 1 (BRAND EDITORIAL)
  {
    id: 'proj-08',
    slug: 'brand-artboard-layout-system',
    title: 'Creative Brand Artboard & Editorial System',
    client: {
      name: 'Brand Studio Collection',
      industry: 'Brand Architecture & Systems',
    },
    category: 'COMMERCIAL_ADS',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/artboard-1.jpg',
      posterThumbnailUrl: '/posters/artboard-1.jpg',
      fullVideoUrl: '/posters/artboard-1.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Structuring expansive brand asset libraries into an effortless, readable editorial overview.',
      solutionSnippet: 'Engineered a modular Swiss-inspired grid system with tailored typographic scale and whitespace control.',
    },
    roles: [
      { roleName: 'Graphic Designer', percentageOrScope: 'System & Layout' },
    ],
    toolsUsed: ['Adobe Illustrator', 'Adobe InDesign'],
    metrics: {
      viewsOrReach: 'Design System',
      keyResult: 'Asset Library',
    },
    featured: false,
    sortOrder: 8,
  },

  // 9. ZENITH ICHIGO (VISUAL DESIGN)
  {
    id: 'proj-09',
    slug: 'zenith-ichigo-visual-art',
    title: 'Zenith Ichigo — Character Art & Dynamic Poster',
    client: {
      name: 'Anime & Character Concept Series',
      industry: 'Concept Art & Character Illustration',
    },
    category: 'BRANDING_KINETIC',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/zenith-ichigo.jpg',
      posterThumbnailUrl: '/posters/zenith-ichigo.jpg',
      fullVideoUrl: '/posters/zenith-ichigo.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Capturing the visceral intensity and spiritual power of the character while maintaining sleek editorial poster balance.',
      solutionSnippet: 'Layered high-contrast lighting passes, custom energy dispersion brushwork, and striking typographic framing.',
    },
    roles: [
      { roleName: 'Digital Illustrator', percentageOrScope: 'Character Art & Shading' },
      { roleName: 'Art Director', percentageOrScope: 'Poster Layout & Lighting' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Digital Illustration'],
    metrics: {
      viewsOrReach: 'Character Art',
      keyResult: 'Dynamic Poster Showcase',
    },
    featured: false,
    sortOrder: 9,
  },

  // 10. POSTER GABUT (VISUAL DESIGN)
  {
    id: 'proj-10',
    slug: 'creative-poster-visual-exploration',
    title: 'Creative Poster Exploration — Avant-Garde Graphic Study',
    client: {
      name: 'Experimental Graphic Lab',
      industry: 'Experimental Design & Typography',
    },
    category: 'BRANDING_KINETIC',
    year: 2026,
    aspectRatio: '4:5',
    media: {
      previewLoopUrl: '/posters/poster-gabut.jpg',
      posterThumbnailUrl: '/posters/poster-gabut.jpg',
      fullVideoUrl: '/posters/poster-gabut.jpg',
      videoDurationSeconds: 0,
      hasAudio: false,
    },
    description: {
      challengeSnippet: 'Exploring untethered artistic creativity while maintaining rigorous graphic design rhythm and focal balance.',
      solutionSnippet: 'Constructed with multi-layered scan textures, expressive typography experimentation, and deliberate negative space tension.',
    },
    roles: [
      { roleName: 'Graphic Designer', percentageOrScope: 'Typography & Composition' },
    ],
    toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
    metrics: {
      viewsOrReach: 'Experimental Art',
      keyResult: 'Typography Study',
    },
    featured: false,
    sortOrder: 10,
  },
];
