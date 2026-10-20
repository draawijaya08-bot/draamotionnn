# SPEC-03: TECHNICAL ARCHITECTURE & ASSET PIPELINE
**Phase**: 03 — Technical Architecture & Asset Pipeline  
**Status**: DRAFT (Review Pending)  
**References**: [01-data-architecture.md](file:///d:/WEBSITE%20PORTOFOLIO%20INDRA/specs/01-data-architecture.md) & [02-interaction-behavior.md](file:///d:/WEBSITE%20PORTOFOLIO%20INDRA/specs/02-interaction-behavior.md)  
**Constraint**: Spesifikasi teknis arsitektur perangkat lunak, pohon komponen, alur data, dan pipeline aset murni. DILARANG membuat scaffolding atau kode implementasi aplikasi di luar direktori `/specs/`.

---

## 1. Tech Stack & Library Lock

Pemilihan stack dirancang untuk memaksimalkan performa rendering grafis (60–120 FPS tanpa frame drop), meminimalkan ukuran JavaScript runtime di browser (*zero hydration bottleneck*), serta menjamin akurasi fisika interaksi kursor lensa dan manajemen memori video.

```mermaid
graph TD
    subgraph CoreFramework [Core Engine & UI Framework]
        A[Next.js 15 App Router + React 19]
        B[TypeScript Strict Mode]
        C[Tailwind CSS v3/v4 Design System]
    end

    subgraph MotionAndPhysics [Motion, Scroll & Physics Engines]
        D[GSAP 3 Core + ScrollTrigger]
        E[Lenis Smooth Scroll]
        F[Zustand Lightweight Transient Store]
    end

    subgraph RenderingAndMasking [GPU Hardware Rendering]
        G[CSS clip-path / Radial Masking GPU Compositing]
        H[HTML5 Video Hardware Decoders + IntersectionObserver API]
    end

    A --> D
    A --> E
    B --> A
    C --> A
    D --> G
    E --> D
    F --> G
    F --> H
```

### Rincian Komponen Teknologi & Rationale Pemilihan:

| Layer Teknologi | Solusi Terpilih | Versi / Library | Rationale & Alasan Teknis |
| :--- | :--- | :--- | :--- |
| **Framework & SSR** | **Next.js (App Router)** | `15.x` (React 19) | Mendukung *React Server Components (RSC)* sehingga data portofolio (karya, bio, teks) dirender statis di server tanpa beban runtime JS. LCP (*Largest Contentful Paint*) tercapai < 0.8s. Client boundary hanya diterapkan pada kanvas interaktif dan pengontrol kursor. |
| **Bahasa Pemrograman** | **TypeScript** | `5.x (Strict)` | Memastikan seluruh kontrak data dari `SPEC-01` dan payload event `SPEC-02` terlindungi secara *type-safe* tanpa kemungkinan `undefined` runtime error. |
| **Styling & Design Tokens** | **Tailwind CSS + CSS Variables** | `3.4.x / 4.x` | Menghilangkan beban CSS runtime-in-JS. Palet warna dark luxury (`#080808`, `#0f0f11`, `#1c1c20`, aksen monokrom kontras) didefinisikan sebagai CSS custom properties native untuk rendering instan. |
| **Smooth Scrolling** | **Lenis Scroll** | `@studio-freight/lenis` | Scroll inertia berbasis pegas fisik berbobot ringan (<3KB). Tidak membajak (*hijack*) native event browser, ramah aksesibilitas keyboard/touch, dan dapat disinkronkan langsung ke ticker GSAP. |
| **Animasi & Timeline** | **GSAP (GreenSock)** | `gsap 3.x` | Mesin tweening industri paling stabil untuk 60/120 FPS frame synchronization. Digunakan untuk scroll-pinned hero, FLIP shared-element modal transition, dan kinetic typography loop. |
| **State Kursor & Media** | **Zustand** | `zustand 5.x` | Global store ultra-ringan (<1KB). Mendukung **transient subscriptions** (pembaruan koordinat kursor X/Y dan state playback langsung memanipulasi DOM ref tanpa memicu re-render siklus React yang berat). |
| **Masking Lensa Kursor** | **Native CSS `clip-path` + GPU Transform** | Native Web Platform | Menghindari penggunaan engine 3D berat (Three.js/WebGL) yang memakan bundle >600KB. CSS `clip-path: circle(...)` yang diakselerasi GPU (`will-change: clip-path`) berjalan pada 60 FPS murni dengan konsumsi daya baterai sangat hemat. |
| **Ikonografi & Font** | **Lucide React + `next/font`** | `lucide-react` | Ikon SVG berbasis tree-shaking otomatis. Font display (*Clash Display* / *Syne*) dan font UI (*Inter* / *Plus Jakarta Sans*) dimuat secara zero-layout-shift via `next/font`. |

---

## 2. Component Tree & Data Flow Architecture

### A. Hirarki Komponen Visual (Component Tree)

```
RootLayout (app/layout.tsx)
│
├── SmoothScrollProvider (Lenis context & RAF Ticker)
│   │
│   ├── CustomCursorPortal (Zustand: CursorState)
│   │   ├── CursorInnerDot
│   │   ├── CursorFollowerRing
│   │   ├── LensCoordinatesBadge (X, Y telemetry)
│   │   └── HoverActionLabel ("VIEW" / "PLAY")
│   │
│   ├── GlobalHeader (SiteIdentitySchema.availability)
│   │   ├── StudioMonogram / BrandWordmark
│   │   ├── AvailabilityPill (Status badge: Open for Projects)
│   │   ├── NavigationAnchors (Works, Services, Profile, Contact)
│   │   └── AudioGlobalToggle (Mute/Unmute state)
│   │
│   ├── MainContent (app/page.tsx - Server Component)
│   │   │
│   │   ├── HeroSection (ShowreelHeroSchema)
│   │   │   ├── KineticHeadlineLoop (Auto-rotating kinetic keywords)
│   │   │   ├── HeroDualVideoCanvas (Client Interactive Canvas)
│   │   │   │   ├── AmbientBlurVideo (Layer 0: Filter blur 28px, Muted Loop)
│   │   │   │   ├── SharpRevealVideo (Layer 1: Pristine 1080p, clip-path mask)
│   │   │   │   ├── LensApertureOverlay (SVG Precision Ticks & Border Ring)
│   │   │   │   └── GyroscopeController (Mobile deviceorientation handler)
│   │   │   └── HeroActionGroup
│   │   │       ├── MagneticButton ("Watch Full Reel")
│   │   │       └── MagneticButton ("Book Collaboration")
│   │   │
│   │   ├── SelectedWorksSection (ProjectItemSchema[])
│   │   │   ├── SectionHeader ("The Playbook / Selected Works")
│   │   │   ├── CategoryFilterBar (All, Motion, Commercial, 3D, Branding)
│   │   │   └── ProjectResponsiveGrid
│   │   │       └── ProjectCard [x N] (IntersectionObserver Controlled)
│   │   │           ├── MediaContainer (Aspect ratio: 16:9 / 9:16 / 4:5)
│   │   │           │   ├── PosterImage (WebP progressive fallback)
│   │   │           │   └── VideoPreviewStream (Silent loop 3-7s, lazy src)
│   │   │           ├── ProjectMetaBar (Title, Client, Year, Duration)
│   │   │           └── RoleBadgesList (Compositing, 3D Motion, Grading)
│   │   │
│   │   ├── ServicesSection (ServicePackageSchema[])
│   │   │   ├── SectionHeader ("Services & Strategic Motion")
│   │   │   └── ServicesCardGrid
│   │   │       └── ServicePackageCard [x N]
│   │   │           ├── ServiceTitle & TurnaroundBadge
│   │   │           ├── DeliverablesChecklist
│   │   │           └── DirectInquiryTrigger
│   │   │
│   │   ├── StudioProfileSection (SiteIdentitySchema)
│   │   │   ├── BioPhilosophyStatement
│   │   │   ├── MetricsShowcase (Total reach, awards, deliverables)
│   │   │   └── ToolsArsenalGrid (DaVinci, After Effects, C4D, Blender)
│   │   │
│   │   └── ContactInquirySection
│   │       ├── QuickBriefSelector (Category, Budget range, Timeline)
│   │       └── DirectChannels (Email, WhatsApp, Discord, Behance)
│   │
│   ├── GlobalFooter
│   │   ├── LiveTimezoneClock (WIB / GMT+7 live second tick)
│   │   ├── SocialMediaLinks
│   │   └── CopyrightNotice
│   │
│   └── ProjectDetailModal (Portal: Fullscreen FLIP Transition)
│       ├── BackdropBlurOverlay
│       ├── ExpandedVideoPlayer (Full HD/4K CDN stream with Audio & Controls)
│       ├── TechnicalCaseStudyContent (Challenge, Solution, Workflow breakdown)
│       └── CloseModalButton (ESC trigger / Memory GC release)
```

---

### B. Aliran Data & State Handshake (Data Flow Diagram)

Data statis disuntikkan dari Server Component `app/page.tsx`, sementara event interaksi berkecepatan tinggi dikelola oleh Zustand store tanpa re-render pohon komponen utama.

```mermaid
sequenceDiagram
    autonumber
    participant Server as Next.js Server (app/page.tsx)
    participant HeroUI as HeroSection (Client)
    participant GridUI as ProjectCard (Client)
    participant CStore as Zustand: CursorStore
    participant MStore as Zustand: MediaPlaybackStore
    participant CursorUI as CustomCursorPortal

    Note over Server: Membaca skema data statis (SPEC-01)
    Server->>HeroUI: Props: ShowreelHeroSchema
    Server->>GridUI: Props: ProjectItemSchema[]

    Note over HeroUI,CursorUI: Siklus Interaksi Kursor Lensa
    HeroUI->>CStore: setCursorState('LENS_REVEAL', { rect: heroRect })
    CStore-->>CursorUI: Subscriber Update: Transform Aperture Lens Ring
    HeroUI->>HeroUI: CSS clip-path: circle(R at X Y) mengikuti pointer lokal

    Note over GridUI,MStore: Siklus Manajemen Memori Video
    GridUI->>MStore: registerObserverEntry(cardId, intersectionRatio, centerY)
    MStore->>MStore: Evaluasi Concurrency Budget (Maks 2 Desktop / 1 Mobile)
    MStore-->>GridUI: Command: play() untuk 2 terdekat; pause() untuk lainnya
```

---

## 3. Video & Asset Pipeline Specification

Agar halaman dapat mempertahankan **60–120 FPS tanpa micro-stutter** saat video dimuat dan diputar bersamaan, seluruh aset video dan gambar harus memenuhi standar kompresi dan encoding berikut.

### A. Matriks Spesifikasi Encoding Video

| Tipe Aset Video | Format & Kontainer | Codec Video | Resolusi Maksimal | Framerate | Target Bitrate | Batas Ukuran File | Konfigurasi Audio |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **Hero Ambient Blur (Layer 0)** | WebM (Primary)<br>MP4 (Fallback) | VP9 (WebM)<br>H.264 High (MP4) | 1920 × 1080 (Desktop)<br>1280 × 720 (Mobile) | 30 FPS | 1.1 Mbps – 1.4 Mbps | **Maks. 3.5 MB** (durasi 10–14s) | **WAJIB DIHAPUS (No Audio Track)** |
| **Hero Sharp Reveal (Layer 1)** | WebM (Primary)<br>MP4 (Fallback) | VP9 (WebM)<br>H.264 High (MP4) | 1920 × 1080 | 30 FPS *(frame sync)* | 2.0 Mbps – 2.5 Mbps | **Maks. 5.5 MB** (durasi 10–14s) | **WAJIB DIHAPUS (No Audio Track)** |
| **Project Card Preview Loop** | WebM (Primary)<br>MP4 (Fallback) | VP9 (WebM)<br>H.264 Constrained | 1280 × 720 (16:9)<br>720 × 1280 (9:16) | 30 FPS | 700 kbps – 1.0 Mbps | **Maks. 1.2 MB** per item (durasi 3–6s) | **WAJIB DIHAPUS (No Audio Track)** |
| **Full Project Showcase Video** | Embedded CDN / Stream HLS | H.264 / AV1 / HLS | 1080p / 4K Adaptive | 60 FPS | Adaptive Stream | Streaming CDN (Vimeo/Cloudflare/YouTube) | Stereo AAC 192 kbps (Fade-in enabled) |

> [!IMPORTANT]
> **Aturan Penghapusan Audio Track pada Preview Loops:**  
> Seluruh video loop latar belakang (`Hero` dan `Project Card Previews`) **wajib di-strip track audionya pada level kontainer file** (bukan sekadar diatur `muted` di tag HTML). Keberadaan track audio kosong tetap memaksa browser menginisialisasi audio decoding thread yang menyerap CPU cycle dan memperlambat autoplay policy.

### B. Formula Batch Transcoding FFmpeg (Standardized Asset Pipeline)

Untuk memproduksi aset yang memenuhi spesifikasi di atas dari file master render ProRes/MP4, gunakan perintah FFmpeg standar berikut:

```bash
# 1. Menghasilkan Video WebM (VP9, Muted / No Audio, Dua-Pass VBR)
ffmpeg -i input_master.mov -an -c:v libvpx-vp9 -b:v 1200k -minrate 600k -maxrate 1500k \
  -crf 28 -quality good -speed 2 -threads 8 -pix_fmt yuv420p output_preview.webm

# 2. Menghasilkan Video Fallback MP4 (H.264, No Audio, Faststart untuk Progressive Streaming)
ffmpeg -i input_master.mov -an -c:v libx264 -preset slow -crf 23 -maxrate 1400k -bufsize 2800k \
  -pix_fmt yuv420p -movflags +faststart output_preview.mp4

# 3. Menghasilkan Thumbnail Poster WebP (Keyframe Frame 0, Kualitas Tajam Teroptimasi)
ffmpeg -ss 00:00:00 -i input_master.mov -vframes 1 -q:v 80 -pix_fmt yuv420p output_poster.webp
```

### C. Standar Aset Gambar & Font
- **Poster Thumbnail**: Format **WebP** dengan batas ukuran maksimal $\le 85\text{ KB}$ per gambar.
- **Ikon Kustom**: Vektor SVG murni inline atau di-load via SVGR, tanpa embedding raster PNG di dalam SVG.
- **Font Web**: Subsetting font latin murni (`woff2` only), ukuran total bundle font $\le 120\text{ KB}$.

---

## 4. Folder Structure Blueprint

Struktur direktori dirancang dengan pendekatan modular, memisahkan domain data murni, state management atomik, animasi canvas, dan antarmuka komponen.

```
WEBSITE PORTOFOLIO INDRA/
│
├── .agents/                          # Agent workspace configuration
├── specs/                            # Living Architectural Specifications
│   ├── 01-data-architecture.md       # Fase 1: Content contracts & schema
│   ├── 02-interaction-behavior.md    # Fase 2: State machines & physics logic
│   └── 03-technical-architecture.md   # Fase 3: Tech stack, component tree & assets
│
├── public/                           # Static production assets
│   ├── fonts/                        # Local display fonts (ClashDisplay, Syne)
│   ├── videos/
│   │   ├── hero/
│   │   │   ├── hero-ambient-blur.webm
│   │   │   ├── hero-ambient-blur.mp4
│   │   │   ├── hero-sharp-reveal.webm
│   │   │   └── hero-sharp-reveal.mp4
│   │   └── projects/
│   │       ├── project-01-preview.webm
│   │       ├── project-01-preview.mp4
│   │       └── ...
│   ├── posters/                      # WebP low-latency fallback posters
│   └── icons/                        # Custom tool & SVG brand monograms
│
├── src/
│   ├── app/                          # Next.js App Router root
│   │   ├── layout.tsx                # Root layout with Lenis & Cursor portal
│   │   ├── page.tsx                  # Server Component: main showcase entry
│   │   ├── globals.css               # Design tokens & CSS variables
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── atomic/                   # Primitive reusable UI atoms
│   │   │   ├── MagneticButton.tsx    # Spring physics magnetic button wrapper
│   │   │   ├── AvailabilityBadge.tsx # Glowing pulse project availability pill
│   │   │   ├── SectionHeading.tsx    # Kinetic typography display title
│   │   │   └── ToolBadge.tsx         # Software/Tool chip with category color
│   │   │
│   │   ├── cursor/                   # Custom pointer & optics lens elements
│   │   │   ├── CustomCursor.tsx      # Main cursor coordinate follower portal
│   │   │   ├── LensCoordinates.tsx   # Live [X, Y] lens telemetry overlay
│   │   │   └── LensApertureRings.tsx # SVG concentric optical markings
│   │   │
│   │   ├── layout/                   # Global shell scaffolding
│   │   │   ├── GlobalHeader.tsx      # Sticky floating navigation bar
│   │   │   ├── GlobalFooter.tsx      # Timezone clock & social links
│   │   │   └── SmoothScrollProvider.tsx # Lenis ticker & GSAP synchronization
│   │   │
│   │   ├── modules/                  # Feature domain compound sections
│   │   │   ├── hero/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HeroDualVideoCanvas.tsx # CSS clip-path dual layer video
│   │   │   │   ├── KineticHeadlineLoop.tsx
│   │   │   │   └── GyroscopeController.ts  # DeviceOrientation fallback
│   │   │   │
│   │   │   ├── works/
│   │   │   │   ├── SelectedWorksSection.tsx
│   │   │   │   ├── CategoryFilterBar.tsx
│   │   │   │   ├── ProjectCard.tsx         # Observer-controlled item
│   │   │   │   └── ProjectDetailModal.tsx  # FLIP expanded video showcase
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   └── ServicePackageCard.tsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── StudioProfileSection.tsx
│   │   │   │   └── ToolsArsenalGrid.tsx
│   │   │   │
│   │   │   └── contact/
│   │   │       ├── ContactSection.tsx
│   │   │       └── InquiryBriefForm.tsx
│   │   │
│   │   └── media/                    # Media player abstractions
│   │       ├── VideoPreviewPlayer.tsx# Auto-lazy loaded muted loop player
│   │       └── AudioGlobalToggle.tsx # Master sound ambience switch
│   │
│   ├── data/                         # Data layer implementing SPEC-01
│   │   ├── site-identity.data.ts     # Profile, bio, tools & availability
│   │   ├── hero.data.ts              # Headline copy, kinetic tags, reel URLs
│   │   ├── projects.data.ts          # Gallery of selected works & metadata
│   │   └── services.data.ts          # Packages, turnaround & deliverables
│   │
│   ├── hooks/                        # Custom behavioral hooks
│   │   ├── useCursorState.ts         # Hook to manipulate CursorState
│   │   ├── useIntersectionVideo.ts   # Observer logic for Concurrency Budget
│   │   ├── useDeviceOrientation.ts   # Tilt sensor listener with permissions
│   │   ├── useMagneticEffect.ts      # Damped spring calculation for buttons
│   │   └── useReducedMotion.ts       # Respects user OS accessibility settings
│   │
│   ├── stores/                       # Zustand high-frequency stores
│   │   ├── cursorStore.ts            # X/Y pointer telemetry & cursor state
│   │   └── mediaPlaybackStore.ts     # Concurrency queue & active streams
│   │
│   ├── types/                        # TypeScript type contracts
│   │   ├── content.types.ts          # Mirrors SPEC-01 interfaces
│   │   └── interaction.types.ts      # Mirrors SPEC-02 state machine types
│   │
│   └── lib/                          # Utilities & third-party configs
│       ├── lenis.ts                  # Lenis instance singleton
│       ├── gsap.ts                   # GSAP plugins registration
│       └── utils.ts                  # Classnames merge & math clamp/lerp
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 5. Ringkasan Keselarasan Arsitektur (Traceability Matrix)

| Kebutuhan Spesifikasi | Solusi Teknis Terpilih | Letak Implementasi |
| :--- | :--- | :--- |
| **Data Architecture (`SPEC-01`)** | TypeScript Interface Contracts + Frozen Static Data Objects | `src/types/content.types.ts` & `src/data/*.ts` |
| **Cursor Lens 60 FPS (`SPEC-02`)** | CSS `clip-path` GPU layer + Zustand Transient Store (tanpa React re-render) | `src/components/modules/hero/HeroDualVideoCanvas.tsx` & `src/stores/cursorStore.ts` |
| **Mobile Gyroscope Tilt (`SPEC-02`)** | Hook `useDeviceOrientation` memetakan derajat sudut ke koordinat lokal | `src/hooks/useDeviceOrientation.ts` & `GyroscopeController.ts` |
| **Video Concurrency Budget (`SPEC-02`)** | `useIntersectionVideo` + Center-Proximity priority sorting di Zustand | `src/stores/mediaPlaybackStore.ts` & `src/hooks/useIntersectionVideo.ts` |
| **FLIP Modal Transition (`SPEC-02`)** | GSAP Flip plugin / Shared Bounding Rect Transition | `src/components/modules/works/ProjectDetailModal.tsx` |
| **Fast Load & 60 FPS Video** | Dual WebM/MP4 container, audio track di-strip, WebP poster | `public/videos/` & Pipeline FFmpeg di Section 3 |
