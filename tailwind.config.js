/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}'],
  theme: {
    fontFamily: {
      syne: 'Syne, sans-serif;',
      unbounded: 'Unbounded, sans-serif;',
      neue: 'neue-haas-grotesk-display',
    },
    extend: {
      fontSize: {
        header: '20rem',
      },
      colors: {
        lime: {
          450: '#96C92C',
        },
      },
    },
  },
  plugins: [],
  safelist: ['h-screen', 'translate-y-0', 'rotate-45'],
};
