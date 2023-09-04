import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair-display)'],
        opensans: ['var(--font-open-sans)'],
      },
      colors: {
        'color-primary': 'var(--brand-primary)',
        'color-secondary': 'var(--brand-secondary)',
        'color-accent': 'var(--brand-accent)',
        'color-neutral': 'var(--brand-neutral)',
        'color-base': 'var(--brand-base)',
      },
    },
  },
  plugins: [],
}
export default config
