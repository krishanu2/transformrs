/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0B0B0C',
        dark: '#111111',
        darkCard: '#1A1A1A',
        offWhite: '#F7F5F0',
        gold: '#F4C400',
        goldDark: '#D4A800',
        magenta: '#C6417E',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
