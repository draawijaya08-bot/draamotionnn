/**
 * CONTENT SCHEMA & TYPE CONTRACTS
 * Source of truth: /specs/01-data-architecture.md
 */

export type OperationalMode = 'STUDIO_CREATIVE' | 'PERSONAL_FREELANCER';

export type AvailabilityStatus = 
  | 'AVAILABLE_IMMEDIATE'   // Siap terima proyek baru
  | 'SELECTIVE_PROJECTS'    // Hanya menerima proyek skala tertentu
  | 'BOOKED_OUT';           // Sedang penuh hingga periode tertentu

export interface ToolItem {
  id: string;
  name: string;             // Contoh: "DaVinci Resolve Studio", "Adobe After Effects"
  category: 'COMPOSITING_MOTION' | 'COLOR_EDITING' | '3D_CGI' | 'AUDIO_DESIGN' | 'PLUGINS_SCRIPTS';
  iconIdentifier: string;   // Identifier ikon SVG
  proficiencyLevel?: 'MASTER' | 'ADVANCED' | 'CORE_STACK';
}

export interface SocialLink {
  platform: 'BEHANCE' | 'VIMEO' | 'INSTAGRAM' | 'YOUTUBE' | 'LINKEDIN' | 'WHATSAPP' | 'EMAIL';
  label: string;
  url: string;
  isPrimaryContact: boolean;
}

export interface SiteIdentitySchema {
  mode: OperationalMode;
  brandName: string;          // Contoh: "Indra Studio" atau "Indra Wijaya"
  legalName?: string;
  tagline: string;            // Contoh: "Sculpting Rhythm & Kinetic Motion for Bold Brands"
  shortBio: string;           // 1-2 kalimat positioning statement
  location: {
    city: string;
    country: string;
    timezone: string;         // Contoh: "Asia/Jakarta" (GMT+7)
  };
  availability: {
    status: AvailabilityStatus;
    badgeText: string;        // Contoh: "Available for Q4/2026 Projects"
    bookingSlotsOpenFrom?: string; // ISO date / bulan jika booked out
  };
  specializations: string[];  // Contoh: ["Kinetic Typography", "Commercial Editing", "CGI Motion", "Color Grading"]
  toolsArsenal: ToolItem[];
  socialLinks: SocialLink[];
}

export interface KineticKeyword {
  id: string;
  text: string;               // Contoh: "KINETIC RHYTHM", "BOLD COMMERCIALS", "3D DYNAMICS"
  accentColor?: string;       // Hex / HSL aksen opsional saat kata kunci ini aktif
}

export interface ShowreelHeroSchema {
  headlinePrefix: string;     // Contoh: "Crafting High-Voltage"
  kineticKeywords: KineticKeyword[];
  headlineSuffix: string;     // Contoh: "for Next-Gen Brands & Creators."
  subText: string;            // Keterangan pendukung di bawah headline
  
  // Dual-Layer Video Assets untuk Refraction / Cursor Lens
  mediaSources: {
    ambientBlurVideoUrl: string;       // Optimized low-bitrate MP4/WebM (Muted, Loop)
    sharpRevealVideoUrl: string;       // Ultra-sharp MP4/WebM sync loop
    fallbackPosterUrl: string;
    durationSeconds: number;
  };

  callToActions: {
    primary: {
      label: string;
      actionType: 'OPEN_SHOWREEL_MODAL' | 'SCROLL_TO_PROJECTS';
      targetVideoUrl?: string;
    };
    secondary: {
      label: string;
      targetSectionId: string;
    };
  };
}

export type ProjectCategory = 
  | 'MOTION_GRAPHICS'
  | 'COMMERCIAL_ADS'
  | '3D_VISUALS'
  | 'BRANDING_KINETIC'
  | 'EXPLAINER_PRODUCT';

export type AspectRatioType = 
  | '16:9'    // Landscape Cinematic / YouTube
  | '9:16'    // Vertical Social / Reels / TikTok Ads
  | '4:5'     // Portrait Feed
  | '1:1'     // Square Showcase
  | '21:9';   // Ultra-widescreen banner

export interface RoleContribution {
  roleName: string;          // Contoh: "Motion Director", "Color Grading", "Sound FX Sync"
  percentageOrScope?: string;// Contoh: "Lead 100%" atau "Compositing & Animation"
}

export interface ProjectItemSchema {
  id: string;
  slug: string;              // URL-friendly identifier unik (e.g. "hyperdrive-fintech-campaign")
  title: string;             // Judul Proyek
  client: {
    name: string;            // Nama Klien / Brand / Kreator
    industry?: string;       // Contoh: "Fintech", "Apparel", "SaaS", "Entertainment"
    logoUrl?: string;
  };
  category: ProjectCategory;
  year: number;              // Tahun produksi (misal: 2026)
  aspectRatio: AspectRatioType;
  
  // Media Assets
  media: {
    previewLoopUrl: string;  // Short silent video loop (WebM/MP4, audio-stripped)
    previewLoopWebmUrl?: string;
    posterThumbnailUrl: string; // Static fallback image / WebP
    fullVideoUrl: string;    // Full showcase video (YouTube/Vimeo/CDN)
    videoDurationSeconds: number;
    hasAudio: boolean;       // Menandai apakah proyek memiliki audio asli saat dibuka
  };
  
  // Breakdown & Keterangan Proyek
  description: {
    challengeSnippet: string;// 1-2 kalimat ringkasan tantangan kreatif
    solutionSnippet: string; // 1-2 kalimat solusi motion & visual yang diterapkan
  };
  roles: RoleContribution[];
  toolsUsed: string[];       // Daftar tools yang dipakai di proyek ini: ["After Effects", "DaVinci Resolve"]
  
  // Highlight / Performance Metrics (Opsional)
  metrics?: {
    viewsOrReach?: string;   // Contoh: "1.4M+ Impressions"
    keyResult?: string;      // Contoh: "Winner - Best Visual 2025"
  };

  // Status Tampilan
  featured: boolean;         // Tampil di Hero / Top Spotlight
  sortOrder: number;         // Prioritas urutan tampil
}

export interface DeliverableItem {
  name: string;              // Contoh: "Storyboarding & Styleframes", "Render 4K 60FPS"
  description?: string;
}

export interface ServicePackageSchema {
  id: string;
  title: string;             // Contoh: "Commercial Motion & Ads"
  shortDescription: string;  // Penjelasan tujuan layanan
  deliverables: DeliverableItem[];
  turnaroundTime: string;    // Contoh: "5-10 Hari Kerja"
  idealFor: string;          // Contoh: "Brand & Agensi yang butuh video promosi campaign berdampak tinggi"
  startingFromPrice?: string;// Opsional (e.g. "Custom Quote" atau nominal)
}
