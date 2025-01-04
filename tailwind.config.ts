import { type Config } from "tailwindcss";

/**
 * Font sizes:
 *
 * |                      | Desktop | Mobile  |
 * |----------------------------------|
 * | Menu                 | 110     | 90      |
 * | Case Intro           | 55      | 30      |
 * | Case Text            | 18      | 15      |
 * | Case Info            | 16      | 16      |
 * | Case Column Heading  | 35      | 30      |
 */

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    fontFamily: {
      "owners-wide": "owners-wide",
      "neue-haas": "neue-haas-grotesk-display",
    },
    fontSize: {
      sm: "0.938rem", // 15px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.875rem", // 30px
      "2xl": "2.1875rem", // 35px
      "3xl": "3.4375rem", // 55px
      "4xl": "5.625rem", // 90px
      "5xl": "6.875rem", // 110px
    },
    extend: {
      spacing: {
        "8.5": "34px",
      },
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
