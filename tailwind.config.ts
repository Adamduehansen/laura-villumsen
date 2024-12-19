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
} satisfies Config;
