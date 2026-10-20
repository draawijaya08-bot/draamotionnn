import { ServicePackageSchema } from '@/types/content.types';

export const servicesData: ServicePackageSchema[] = [
  {
    id: 'pack-commercial',
    title: 'Commercial Motion & Campaign Films',
    shortDescription: 'High-voltage motion direction, editing, and VFX compositing designed to command instant viewer attention and elevate brand prestige across digital and broadcast screens.',
    deliverables: [
      { name: 'Creative Treatment & Moodboards', description: 'Visual style direction, color script, and reference curation' },
      { name: 'Detailed Styleframes & Storyboard', description: 'Full narrative breakdown before animation commences' },
      { name: 'Motion Compositing & VFX', description: 'Multi-layer animation, chromatic polish, and lens simulation' },
      { name: 'Color Grading & Finishing', description: 'Cinema-grade color pass in DaVinci Resolve Studio' },
      { name: 'Master Deliveries in 4K & Vertical', description: 'Optimized renders for 16:9, 9:16 Reels, and 1:1 feeds' },
    ],
    turnaroundTime: '7 — 14 Business Days',
    idealFor: 'Forward-thinking brands, tech startups, and creative agencies needing a flagship campaign hero video.',
    startingFromPrice: 'Custom Quote / Scope-based',
  },
  {
    id: 'pack-3d-dynamics',
    title: '3D CGI Product Dynamics & Lookdev',
    shortDescription: 'Photorealistic and stylized 3D simulations that dissect, illuminate, and dramatize physical products with impossible physics and tactile lighting.',
    deliverables: [
      { name: 'CAD / Model Optimization & Retopology', description: 'Clean mesh topology ready for cinematic deformation' },
      { name: 'Custom Procedural Texturing', description: 'Micro-detail materials created in Substance & Redshift' },
      { name: 'Dynamic Particle & Fluid Simulations', description: 'Tactile physical reactions, forces, and atmospheric fields' },
      { name: 'Multi-angle Hero Turnarounds', description: 'Exploded views, X-ray reveals, and macroscopic lens passes' },
      { name: 'Sound FX & Haptic Audio Sync', description: 'Precision foley tailored to every gear click and surface impact' },
    ],
    turnaroundTime: '10 — 18 Business Days',
    idealFor: 'Hardware companies, consumer electronics, luxury fashion, and industrial designers showcasing new releases.',
    startingFromPrice: 'Custom Quote / Scope-based',
  },
  {
    id: 'pack-kinetic-identity',
    title: 'Kinetic Typography & Social Hyper-Reels',
    shortDescription: 'Bold, brutalist, and rhythmic typography animations paired with rapid-fire video cuts that dominate algorithmic feeds on TikTok, Instagram, and YouTube Shorts.',
    deliverables: [
      { name: 'Custom Variable Type Rigging', description: 'Expressive kinetic typography synced to music beats' },
      { name: 'Hook Retention Optimization', description: 'Pacing engineered for the crucial 0-3 second retention curve' },
      { name: 'Motion Brand Guidelines Asset Pack', description: 'Reusable kinetic templates (.MOGRT) for your internal team' },
      { name: 'High-speed Multi-aspect Renders', description: 'Ultra-compressed, pristine WebM and MP4 delivery' },
    ],
    turnaroundTime: '4 — 7 Business Days',
    idealFor: 'Content creators, direct-to-consumer (DTC) brands, and apparel labels wanting thumb-stopping social impact.',
    startingFromPrice: 'Custom Quote / Scope-based',
  },
];
