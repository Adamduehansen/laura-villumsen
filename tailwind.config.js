/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}'],
  theme: {
    fontFamily: {
      syne: 'Syne, sans-serif;',
      unbounded: 'Unbounded, sans-serif;',
    },
    extend: {
      fontSize: {
        header: '20rem',
      },
    },
  },
  plugins: [],
  safelist: ['h-screen', 'translate-y-0', 'rotate-45'],
};
