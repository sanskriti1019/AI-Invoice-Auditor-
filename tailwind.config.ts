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
        dark: {
          DEFAULT: "#000000",
          900: "#050510", // Very dark navy/black
          800: "#0A0B1A", // Dark navy base
          700: "#12142B", // Lighter navy card backgrounds
        },
        primary: {
          DEFAULT: "#3B82F6", // Bright Blue
          hover: "#60A5FA",
          glow: "rgba(59, 130, 246, 0.5)",
        },
        accent: {
          purple: "#8B5CF6", // Violet/Purple accent
          cyan: "#06B6D4", // Neon Cyan accent
        },
        neon: {
          pink: "#F472B6",
          green: "#4ADE80",
          amber: "#FBBF24",
          red: "#F87171"
        }
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter", // Assuming Inter or similar modern font
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2), 0 0 10px rgba(139, 92, 246, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
