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
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-40px, 60px) scale(1.1)' },
          '100%': { transform: 'translate(30px, -20px) scale(0.95)' },
        },
        ambientMedium: {
          '0%': { transform: 'translate(0px, 0px) scale(0.9)' },
          '50%': { transform: 'translate(50px, -30px) scale(1.15)' },
          '100%': { transform: 'translate(-20px, 40px) scale(1)' },
        },
        ambientFast: {
          '0%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(-30px, -40px) scale(1.05)' },
          '100%': { transform: 'translate(20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
