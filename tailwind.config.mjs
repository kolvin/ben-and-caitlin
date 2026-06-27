/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#EDE0C8',
        parchment: '#F5EDD6',
        navy: '#1A3A5C',
        teal: '#2A7F7F',
        coral: '#C94F2C',
        gold: '#A8874A',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Lato"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
