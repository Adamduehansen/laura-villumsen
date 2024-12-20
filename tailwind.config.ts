import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    fontFamily: {
      "owners-wide": "owners-wide",
      "neue-haas": "neue-haas-grotesk-display",
    },
  },
  safelist: [
    {
      pattern: /^col-span-(?:[1-9]|1[0-2])$/,
      variants: ["md", "lg"],
    },
    {
      pattern: /^col-start-(?:[1-9]|1[0-2])$/,
      variants: ["md", "lg"],
    },
  ],
} satisfies Config;
