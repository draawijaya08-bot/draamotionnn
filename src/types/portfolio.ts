/**
 * PORTFOLIO DATA CONTRACTS & TYPE SCHEMAS
 * References: /specs/01-data-architecture.md & /specs/02-interaction-behavior.md
 * Target Profile: INDRA WIJAYA — Motion Designer
 */

export type ProjectCategory = 
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
  | 'Adobe Illustrator';

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
  category: 'CORE_CREATIVE' | 'AI_TECH' | 'FINISHING';
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
  comparisonSourceBeforeUrl?: string; // Khusus AI dev (Original RAW vs Synthesized)
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  clientOrContext: string;
  description: {
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
  categoryContextMessages: Record<ProjectCategory, string>;
}

export interface InstagramConfig {
  username: string;            // e.g. "indrawijaya.motion"
  profileUrl: string;
  displayHandle: string;       // e.g. "@indrawijaya.motion"
}

export interface SocialLink {
  platform: 'BEHANCE' | 'VIMEO' | 'LINKEDIN' | 'YOUTUBE' | 'INSTAGRAM' | 'WHATSAPP';
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
  primaryRole: string;         // "Motion Designer"
  
  heroKinetic: {
    prefix: string;            // "Creative "
    dynamicWords: string[];    // ["motion", "visual", "AI-driven"]
    suffix: string;            // " designer"
    subHeadline: string;
    accentColor: string;       // e.g. "#f59e0b" (warm gold/amber)
  };

  metadataBar: {
    specializations: string;   // "MOTION GRAPHIC / GRAPHIC DESIGN / AI DEVELOPMENT"
    availabilityStatus: string;// "CURRENTLY AVAILABLE FOR FREELANCE & COLLABORATION"
    location: string;          // "INDONESIA (WORLDWIDE REMOTE)"
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
}
