import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "glow-breathe": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(59,130,246,0.3)" },
          "50%": { borderColor: "rgba(124,58,237,0.5)" },
        },
      },
      animation: {
        "glow-breathe": "glow-breathe 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "float-gentle": "float-gentle 7s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "border-glow": "border-glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        // Dot grid — dark
        "dot-grid-dark": "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        // Dot grid — light
        "dot-grid-light": "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
        // Line grid
        "line-grid-dark":
          "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
        "line-grid-light":
          "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
        // Blue glow
        "glow-blue": "radial-gradient(ellipse,rgba(59,130,246,0.18) 0%,transparent 70%)",
        // Violet glow
        "glow-violet": "radial-gradient(ellipse,rgba(124,58,237,0.14) 0%,transparent 70%)",
        // Cyan glow
        "glow-cyan": "radial-gradient(ellipse,rgba(6,182,212,0.12) 0%,transparent 70%)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
        "grid-64": "64px 64px",
      },
    },
  },
  plugins: [],
} satisfies Config;
