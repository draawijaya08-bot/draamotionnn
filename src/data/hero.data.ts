import { ShowreelHeroSchema } from '@/types/content.types';

export const heroData: ShowreelHeroSchema = {
  headlinePrefix: 'Sculpting',
  kineticKeywords: [
    { id: 'kinetic-rhythm', text: 'KINETIC RHYTHM', accentColor: '#ffffff' },
    { id: 'bold-commercials', text: 'BOLD COMMERCIALS', accentColor: '#e5e5ea' },
    { id: '3d-dynamics', text: '3D CGI DYNAMICS', accentColor: '#d1d1d6' },
    { id: 'visual-identity', text: 'HIGH-VOLTAGE REELS', accentColor: '#ffffff' },
  ],
  headlineSuffix: 'for Next-Gen Brands & Visionary Creators.',
  subText: 'Hover across the canvas with your pointer lens to reveal pristine, uncompressed motion frames beneath the atmospheric haze.',
  mediaSources: {
    ambientBlurVideoUrl: '/videos/hero/hero-ambient-blur.mp4',
    sharpRevealVideoUrl: '/videos/hero/hero-sharp-reveal.mp4',
    fallbackPosterUrl: '/posters/hero-poster.webp',
    durationSeconds: 12,
  },
  callToActions: {
    primary: {
      label: 'Watch Showreel 2026',
      actionType: 'OPEN_SHOWREEL_MODAL',
      targetVideoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    secondary: {
      label: 'Explore Selected Works',
      targetSectionId: '#selected-works',
    },
  },
};
