import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F3EC",
        cream: "#EFE7D8",
        sand: "#E4D9C4",
        stone: "#8A7C68",
        earth: "#5B5040",
        charcoal: "#242019",
        ink: "#1B1814",
        bronze: {
          DEFAULT: "#A9825A",
          light: "#C9A876",
          dark: "#8A6B45",
        },
        champagne: "#D8C4A0",
        line: "#DCD1BC",
      },
      fontFamily: {
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 8.5rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1" }],
      },
      maxWidth: {
        content: "1440px",
        prose: "68ch",
      },
      spacing: {
        section: "clamp(3rem, 6vw, 5.5rem)",
        gutter: "clamp(1.5rem, 5vw, 4rem)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        lg: "8px",
        xl: "16px",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(27, 24, 20, 0.15)",
        subtle: "0 8px 30px -12px rgba(27, 24, 20, 0.12)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        600: "600ms",
        800: "800ms",
        1000: "1000ms",
        1200: "1200ms",
      },
    },
  },
  plugins: [],
};
export default config;
