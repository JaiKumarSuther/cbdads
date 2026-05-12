import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#0A0C11",
          secondary: "#0F1219",
          tertiary: "#141720",
          elevated: "#181C25",
        },
        border: {
          DEFAULT: "#1E2332",
          subtle: "#161A24",
          strong: "#2A3045",
        },
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          900: "#78350F",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
        },
        rose: {
          400: "#FB7185",
          500: "#F43F5E",
        },
        violet: {
          400: "#A78BFA",
          500: "#8B5CF6",
        },
        text: {
          primary: "#F1F3F9",
          secondary: "#8892A4",
          tertiary: "#4B5568",
          inverse: "#0A0C11",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "slide-in": "slideIn 0.3s ease forwards",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideIn: { from: { opacity: "0", transform: "translateX(-8px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
