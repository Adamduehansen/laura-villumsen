/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        grid: '0.625rem',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^col-span-(?:[1-9]|1[0-2])$/,
    },
  ],
};
