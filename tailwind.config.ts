import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === CUSTOMIZE YOUR COLORS HERE ===
        dark: {
          900: "#030014",
          800: "#0a0a1a",
          700: "#10102a",
          600: "#1a1a3a",
        },
        accent: {
          primary: "#6366f1",    // Electric indigo
          secondary: "#8b5cf6",  // Vibrant purple
          cyan: "#22d3ee",       // Cyan highlight
          pink: "#ec4899",       // Pink accent
        },
        glow: {
          purple: "rgba(139, 92, 246, 0.5)",
          cyan: "rgba(34, 211, 238, 0.5)",
          pink: "rgba(236, 72, 153, 0.5)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["5rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "morph": "morph 8s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "aurora": "aurora 10s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "50% 50%, 50% 50%" },
          "50%": { backgroundPosition: "100% 50%, 0% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(258, 89%, 67%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(339, 100%, 56%, 0.2) 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(139, 92, 246, 0.5)",
        "glow-md": "0 0 40px -10px rgba(139, 92, 246, 0.5)",
        "glow-lg": "0 0 60px -15px rgba(139, 92, 246, 0.6)",
        "glow-cyan": "0 0 40px -10px rgba(34, 211, 238, 0.5)",
        "glow-pink": "0 0 40px -10px rgba(236, 72, 153, 0.5)",
        "inner-glow": "inset 0 0 60px -20px rgba(139, 92, 246, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
