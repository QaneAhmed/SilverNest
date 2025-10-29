import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['Inter', "sans-serif"],
      },
      colors: {
        rose: {
          400: "#e68a8a",
          500: "#e27272",
        },
        stone: {
          50: "#faf9f8",
          100: "#f5f4f3",
          800: "#2c2b29",
        },
        amber: {
          300: "#f6ca83",
        },
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(44, 43, 41, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
