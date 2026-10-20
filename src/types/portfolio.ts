/**
 * PORTFOLIO DATA CONTRACTS & TYPE SCHEMAS
 * References: /docs/reference-analysis.md & /docs/asset-inventory.md
 * Target Profile: INDRA WIJAYA — Creative Developer & Motion Designer
 */

export type ProjectCategory = 
  | 'motion-graphics' 
  | 'video-editing' 
  | 'visual-design' 
  | 'web'
  // Legacy aliases for backward compatibility:
  | 'motion-graphic'
  | 'graphic-design'
  | 'ai-development';

export interface CategoryFilterItem {
  id: ProjectCategory | 'all';
  label: string;
  description: string;
  count?: number;
}

export type CoreCreativeTool = 
  | 'Adobe After Effects'
  | 'Adobe Premiere Pro'
  | 'Adobe Photoshop'
  | 'Adobe Illustrator'
  | 'DaVinci Resolve'
  | 'Next.js'
  | 'React'
  | 'TypeScript'
  | 'Tailwind CSS'
  | 'GSAP'
  | 'Three.js / WebGL';

export type AiAndTechTool = 
  | 'Midjourney'
  | 'Runway Gen-3'
  | 'ComfyUI'
  | 'Stable Diffusion'
  | 'ElevenLabs'
  | 'Claude / GPT-4'
  | 'Cinema 4D / Blender'
  | string;

export interface ToolBadge {
  name: CoreCreativeTool | AiAndTechTool;
  category: 'CORE_CREATIVE' | 'AI_TECH' | 'DEVELOPMENT' | 'FINISHING';
  isPrimary?: boolean;
}

export type AspectRatioType = '16:9' | '9:16' | '1:1';

export type MediaType = 'VIDEO_LOOP' | 'IMAGE_STILL' | 'INTERACTIVE_COMPARISON';

export interface AdaptiveMedia {
  type: MediaType;
  previewUrl: string;          // Video loop WebM/MP4 (tanpa audio) atau WebP
  fallbackPosterUrl: string;   // High-res WebP fallback poster
  fullMediaUrl: string;        // Full video showcase atau high-res image
  aspectRatio: AspectRatioType;
  durationSeconds?: number;    // Khusus video loop
  comparisonSourceBeforeUrl?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  titleId?: string;
  category: ProjectCategory;
  year: number;
  clientOrContext: string;
  role?: string;
  projectUrl?: string;
  description: {
    shortSnippet: string;
    detailedChallenge?: string;
    solutionApplied?: string;
  };
  descriptionId?: {
    shortSnippet: string;
    detailedChallenge?: string;
    solutionApplied?: string;
  };
  media: AdaptiveMedia;
  tools: ToolBadge[];
  featuredInHero?: boolean;
  sortOrder: number;
}

export interface WhatsAppConfig {
  phoneNumber: string;         // e.g. "6281234567890" (tanpa '+' atau spasi)
  defaultMessage: string;
  categoryContextMessages: Record<string, string>;
}

export interface InstagramConfig {
  username: string;            // e.g. "indrawijaya.motion"
  profileUrl: string;
  displayHandle: string;       // e.g. "@indrawijaya.motion"
}

export interface SocialLink {
  platform: 'BEHANCE' | 'VIMEO' | 'LINKEDIN' | 'YOUTUBE' | 'INSTAGRAM' | 'WHATSAPP' | 'GITHUB';
  label: string;
  url: string;
  isPrimary?: boolean;
}

export interface NavigationAndContactSchema {
  navLinks: Array<{
    id: string;
    label: string;
    targetAnchor: string;
  }>;
  whatsapp: WhatsAppConfig;
  instagram: InstagramConfig;
  socials: SocialLink[];
}

export interface SiteIdentity {
  brandName: string;           // "INDRA WIJAYA"
  primaryRole: string;         // "Creative Developer & Motion Designer"
  
  heroKinetic: {
    prefix: string;            // "Creative "
    dynamicWords: string[];    // ["developer", "motion", "visual", "creative"]
    suffix: string;            // " designer"
    subHeadline: string;
    accentColor: string;       // e.g. "#f59e0b" (warm gold/amber)
  };

  metadataBar: {
    specializations: string;   // "MOTION GRAPHICS / VIDEO EDITING / VISUAL DESIGN / WEB"
    availabilityStatus: string;// "CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATION"
    location: string;          // "BASED IN INDONESIA (REMOTE WORLDWIDE)"
  };

  heroShowreel: {
    ambientBlurVideoUrl: string;
    sharpRevealVideoUrl: string;
    fallbackPosterUrl: string;
    durationSeconds: number;
  };

  navigationAndContact: NavigationAndContactSchema;
}

/**
 * INTERACTION BEHAVIOR TYPES (SPEC-02)
 */
export type CursorState = 
  | 'DEFAULT'
  | 'LENS_REVEAL'
  | 'PROJECT_HOVER'
  | 'MAGNETIC_BUTTON'
  | 'HIDDEN';

export type MediaPlaybackState = 
  | 'IDLE'
  | 'PRELOADING'
  | 'PREVIEW_LOOPING'
  | 'FULL_MODAL_PLAYING';

export interface StackedCardCategory {
  category: ProjectCategory;
  title: string;
  tagline: string;
  previewVideoUrl?: string;
  previewImageUrl: string;
  posterUrl: string;
  accentBadge: string;
  routeUrl: string;
}
