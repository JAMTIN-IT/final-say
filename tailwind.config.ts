import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dusk: "#2C2A4A",
        ember: {
          DEFAULT: "#C4704A",
          dark: "#A85A37",
        },
        sage: "#7A9E8E",
        ivory: "#FAF7F2",
        parchment: "#F0EBE1",
        stone: {
          900: "#1C1B2E",
          700: "#3D3B54",
          500: "#6B6882",
          300: "#B8B6CC",
          100: "#ECEAF5",
        },
        success: "#4A8C6F",
        warning: "#C49A4A",
        danger: "#A63D2F",
        info: "#4A7A9B",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "300" }],
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "400" }],
        h2: ["1.875rem", { lineHeight: "1.3", fontWeight: "400" }],
        h3: ["1.375rem", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        card: "12px",
        input: "6px",
        badge: "20px",
        modal: "16px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.10)",
        modal: "0 24px 64px rgba(0,0,0,0.2)",
        "input-focus": "0 0 0 3px rgba(44,42,74,0.12)",
        "input-error": "0 0 0 3px rgba(166,61,47,0.12)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        reveal: "600ms",
      },
      maxWidth: {
        content: "1200px",
        article: "720px",
        narrow: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
