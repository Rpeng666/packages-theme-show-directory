import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/src/themes/raycast/**/*.{ts,tsx}",
    "./packages/ui/src/themes/default/**/*.{ts,tsx}",
    "./packages/ui/src/themes/pixel/**/*.{ts,tsx}",
    "./packages/ui/src/themes/semi/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        panel: "hsl(var(--panel) / <alpha-value>)",
        brand: "hsl(var(--brand) / <alpha-value>)",
        purple: "hsl(var(--purple) / <alpha-value>)",
        blue: "hsl(var(--blue) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        retro: {
          bg: "var(--retro-bg)",
          surface: "var(--retro-surface)",
          card: "var(--retro-card)",
          text: "var(--retro-text)",
          border: "var(--retro-border)",
          "border-strong": "var(--retro-border-strong)",
          primary: "var(--retro-primary)",
          secondary: "var(--retro-secondary)",
          accent: "var(--retro-accent)",
          muted: "var(--retro-muted)",
          green: "var(--retro-green)",
          "green-hover": "var(--retro-green-hover)",
          cyan: "var(--retro-cyan)",
          red: "var(--retro-red)",
          gold: "var(--retro-gold)",
          purple: "var(--retro-purple)",
          pink: "var(--retro-pink)",
        },
        gray: {
          1: "hsl(var(--gray-1) / <alpha-value>)",
          2: "hsl(var(--gray-2) / <alpha-value>)",
          3: "hsl(var(--gray-3) / <alpha-value>)",
          4: "hsl(var(--gray-4) / <alpha-value>)",
          5: "hsl(var(--gray-5) / <alpha-value>)",
          6: "hsl(var(--gray-6) / <alpha-value>)",
          7: "hsl(var(--gray-7) / <alpha-value>)",
          8: "hsl(var(--gray-8) / <alpha-value>)",
          9: "hsl(var(--gray-9) / <alpha-value>)",
          10: "hsl(var(--gray-10) / <alpha-value>)",
          11: "hsl(var(--gray-11) / <alpha-value>)",
          12: "hsl(var(--gray-12) / <alpha-value>)",
          a1: "var(--gray-a1)",
          a2: "var(--gray-a2)",
          a3: "var(--gray-a3)",
          a4: "var(--gray-a4)",
          a5: "var(--gray-a5)",
          a6: "var(--gray-a6)",
          a7: "var(--gray-a7)",
          a8: "var(--gray-a8)",
          a9: "var(--gray-a9)",
          a10: "var(--gray-a10)",
          a11: "var(--gray-a11)",
          a12: "var(--gray-a12)",
        },
      },
      screens: {
        tall: { raw: "(min-height: 840px)" },
        tallx2: { raw: "(min-height: 1000px)" },
        desktop: { raw: "(min-height: 840px) and (min-width: 960px)" },
      },
      spacing: {
        "scrollbar-offset": "calc(16px + var(--removed-body-scroll-bar-size, 0px))",
      },
      borderRadius: {
        inherit: "inherit",
      },
      fontSize: {
        xxs: "11px",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: { opacity: "0", transform: "translateY(-1%) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0%) scale(1)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
