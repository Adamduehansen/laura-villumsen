function calculateRemFromPixel(pixelValue, baseFontSize = 16) {
  const remValue = pixelValue / baseFontSize;
  return remValue;
}

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
        grid: `${calculateRemFromPixel(10)}rem`,
      },
      padding: {
        main: `${calculateRemFromPixel(88)}rem`,
      },
      fontSize: {
        lg: [
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
    },
  ],
};
