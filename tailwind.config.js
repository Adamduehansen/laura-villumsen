function calculateRemFromPixel(pixelValue, baseFontSize = 16) {
  const remValue = pixelValue / baseFontSize;
  return remValue;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      link: '#1453F7',
    },
    fontFamily: {
      'owners-wide': 'owners-wide',
      'neue-haas': 'neue-haas-grotesk-display',
    },
    extend: {
      margin: {
        grid: `${calculateRemFromPixel(10)}rem`,
      },
      padding: {
        main: `${calculateRemFromPixel(88)}rem`,
      },
      fontSize: {
        lg: [
          `${calculateRemFromPixel(20)}rem`,
          `${calculateRemFromPixel(21.3)}rem`,
        ],
        xl: [
          `${calculateRemFromPixel(35)}rem`,
          `${calculateRemFromPixel(38.5)}rem`,
        ],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^col-span-(?:[1-9]|1[0-2])$/,
      variants: ['md', 'lg'],
    },
    {
      pattern: /^col-start-(?:[1-9]|1[0-2])$/,
      variants: ['md', 'lg'],
    },
  ],
};
