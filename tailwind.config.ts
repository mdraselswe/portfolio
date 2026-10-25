import type { Config } from "tailwindcss";

const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        paper: channel("paper"),
        surface: channel("surface"),
        ink: channel("ink"),
        muted: channel("muted"),
        accent: channel("accent"),
        "accent-ink": channel("accent-ink"),
        marigold: channel("marigold"),
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-bn)", "system-ui", "sans-serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "system-ui",
          "var(--font-bn)",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
