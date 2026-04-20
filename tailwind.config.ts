import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-ink)",
        surface: "var(--color-surface)",
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
        },
        rule: "var(--color-rule)",
        brand: {
          DEFAULT: "var(--color-brand)",
          soft: "var(--color-brand-soft)",
          warm: "var(--color-brand-warm)",
        },
        accent: "var(--color-accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
