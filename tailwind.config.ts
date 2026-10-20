import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'ambient-slow': 'ambientSlow 25s infinite alternate ease-in-out',
        'ambient-medium': 'ambientMedium 20s infinite alternate ease-in-out',
        'ambient-fast': 'ambientFast 15s infinite alternate ease-in-out',
      },
      keyframes: {
        ambientSlow: {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(1)' },
          '50%': { transform: 'translate3d(-40px, 60px, 0) scale(1.08)' },
          '100%': { transform: 'translate3d(30px, -20px, 0) scale(0.96)' },
        },
        ambientMedium: {
          '0%': { transform: 'translate3d(0px, 0px, 0) scale(0.95)' },
          '50%': { transform: 'translate3d(50px, -30px, 0) scale(1.1)' },
          '100%': { transform: 'translate3d(-20px, 40px, 0) scale(1)' },
        },
        ambientFast: {
          '0%': { transform: 'translate3d(0px, 0px, 0)' },
          '50%': { transform: 'translate3d(-30px, -40px, 0) scale(1.04)' },
          '100%': { transform: 'translate3d(20px, 20px, 0) scale(0.94)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
