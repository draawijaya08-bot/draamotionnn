# Asset Inventory
**Project**: Indra Wijaya — Creative Developer & Motion Designer Portfolio  
**Audit Date**: 2026-10-20  
**Status**: Comprehensive Local & Remote Asset Mapping  

---

## 1. Summary of Discovered Assets

| Category | File Path | Asset Type | Dimensions / Specs | Assigned Category / Context | Usable Directly | Notes |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **Hero Master Stream** | `https://cdn.dribbble.com/userupload/3989861/file/original-1f1610f0a43c0aed537ab125d7ef8e45.mp4` | MP4 Video (H.264) | 16:9 1080p | Slide 1 (Hero) & Slide 2 | Yes | Purrweb authentic motion reel stream |
| **Hero Master Still** | `https://cdn.dribbble.com/userupload/3989861/file/still-a6e8bb4abb91f9ed2e4ccad1d3bd24bd.png` | PNG Poster | 1600 × 1200 | Hero Poster Fallback | Yes | Crisp frame 0 still |
| **Local Hero Ambient** | `/videos/hero/hero-ambient-blur.mp4` | MP4 Video | 16:9 | Slide 1 Background | Yes | Local fallback loop |
| **Local Hero Sharp** | `/videos/hero/hero-sharp-reveal.mp4` | MP4 Video | 16:9 | Slide 1 Lens Reveal | Yes | Local fallback loop |
| **Hero Poster WebP** | `/posters/hero-poster.webp` | WebP Image | 16:9 | Hero Poster | Yes | Lightweight poster (<50KB) |
| **Project 01: Hyperdrive** | `/videos/projects/hyperdrive-preview.mp4` & `.webm` | Video Loop | 16:9 (720p) | Motion Graphics | Yes | Kinetic Rebrand Reel |
| **Project 01 Poster** | `/posters/hyperdrive-poster.webp` | WebP Image | 16:9 | Motion Graphics | Yes | Poster keyframe |
| **Project 02: Chronos** | `/videos/projects/chronos-preview.mp4` & `.webm` | Video Loop | 1:1 | Visual Design | Yes | Brutalist Key Visual |
| **Project 02 Poster** | `/posters/chronos-poster.webp` | WebP Image | 1:1 | Visual Design | Yes | Poster keyframe |
| **Project 03: Neural Genesis** | `/videos/projects/pulse-preview.mp4` & `.webm` | Video Loop | 9:16 | Video Editing | Yes | Commercial Reel Cut |
| **Project 03 Poster** | `/posters/pulse-poster.webp` | WebP Image | 9:16 | Video Editing | Yes | Poster keyframe |
| **Project 04: Lumina Studio** | `/videos/projects/lumina-preview.mp4` & `.webm` | Video Loop | 16:9 | Web Development | Yes | Interactive 3D Web App |
| **Project 04 Poster** | `/posters/lumina-poster.webp` | WebP Image | 16:9 | Web Development | Yes | Poster keyframe |
| **Project 05: Omni Brand** | `/videos/projects/omni-preview.mp4` & `.webm` | Video Loop | 16:9 | Visual Design | Yes | Brand Design System |
| **Project 05 Poster** | `/posters/omni-poster.webp` | WebP Image | 16:9 | Visual Design | Yes | Poster keyframe |
| **Project 06: Zenith Cut** | `/videos/projects/zenith-preview.mp4` & `.webm` | Video Loop | 16:9 | Video Editing | Yes | Cinematic Film Cut |
| **Project 06 Poster** | `/posters/zenith-poster.webp` | WebP Image | 16:9 | Video Editing | Yes | Poster keyframe |

---

## 2. Category Mapping to Disciplines

### 1. Motion Graphics (`/work/motion-graphics`)
- **Primary Project**: *Hyperdrive Fintech — Kinetic Rebrand Reel*
- **Supporting Media**: MP4/WebM loops, After Effects + Premiere Pro pipeline.

### 2. Video Editing (`/work/video-editing`)
- **Primary Project**: *Zenith Broadcast — Cinematic Commercial Cut*
- **Secondary Project**: *Pulse Rhythm — Dynamic Music Video Edit*
- **Supporting Media**: 16:9 and 9:16 rhythm cuts, DaVinci Resolve & Premiere Pro.

### 3. Visual Design (`/work/visual-design`)
- **Primary Project**: *Chronos Runway — Brutalist Key Visual & Poster Series*
- **Secondary Project**: *Omni Identity — Generative Brand Guidelines*
- **Supporting Media**: 1:1 and 16:9 high-res artwork, Illustrator & Photoshop.

### 4. Web Development (`/work/web`)
- **Primary Project**: *Lumina Kinetic — WebGL & Interactive Portfolio Engine*
- **Secondary Project**: *Synapse Labs — Generative Creative Developer Portal*
- **Supporting Media**: Interactive previews, Next.js, React, GSAP, Tailwind CSS.

---

## 3. Media Integrity & Rules
- All preview video loops have audio tracks stripped (`-an`) to optimize browser playback and preserve battery.
- High-res posters are loaded as fallback WebP representations to guarantee zero layout shifts during hydrations.
- Aspect ratios are strictly preserved (`16:9`, `9:16`, `1:1`) across all gallery and detail views.
