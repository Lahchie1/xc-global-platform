import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111827",
          foreground: "#FFFFFF",
          container: "#141b2b",
          tint: "#575e70",
        },
        secondary: {
          DEFAULT: "#DB833A",
          foreground: "#111827",
          hover: "#C67228",
          fixed: "#FED7AA",
          "fixed-dim": "#F5A866",
        },
        accent: {
          gold: "#DB833A",
          copper: "#DB833A",
          "gold-hover": "#C67228",
          stone: "#9CA3AF",
        },
        background: "#F8F9FA",
        surface: {
          DEFAULT: "#F8F9FA",
          white: "#FFFFFF",
          dim: "#D9DADB",
          bright: "#F8F9FA",
          "container-lowest": "#FFFFFF",
          "container-low": "#F3F4F5",
          container: "#EDEEEF",
          "container-high": "#E7E8E9",
          "container-highest": "#E1E3E4",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          subtle: "#F3F4F6",
        },
        status: {
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
        },
        badge: {
          "gold-bg": "#FFEDD5",
          "gold-text": "#9A3412",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.5rem", // 24px
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05), 0 10px 25px -5px rgba(0,0,0,0.04)",
        card: "0 1px 3px rgba(0,0,0,0.05)",
        floating: "0 16px 36px -6px rgba(17, 24, 39, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

