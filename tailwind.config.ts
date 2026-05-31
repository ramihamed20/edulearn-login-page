import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          50: "#fff8f3",
          100: "#ffeddc",
          200: "#ffd8b6"
        }
      },
      boxShadow: {
        glass:
          "0 24px 80px rgba(124, 45, 18, 0.18), 0 1px 0 rgba(255, 255, 255, 0.72) inset"
      },
      fontFamily: {
        serif: [
          "Crimson Pro",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif"
        ],
        sans: [
          "Atkinson Hyperlegible",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
