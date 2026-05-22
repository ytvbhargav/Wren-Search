import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#383026",
        tan: "#d4cfbf",
        eggshell: "#fafaf5",
        orange: "#e35438",
        ink: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.08em",
        widest2: "0.18em",
      },
      transitionTimingFunction: {
        wren: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
