/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{njk,md}', './src/**/*.svg'],
  theme: {
    colors: {
      green: '#11AB4F',
    },
    fontSize: {
      header: '20rem',
    },
    fontFamily: {
      syne: 'syne, sans-serif;',
    },
  },
  plugins: [],
};
