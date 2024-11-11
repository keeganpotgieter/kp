import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        cascadia: ["CascadiaCode", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        valid: {
          DEFAULT: "hsl(var(--valid))",
        },
        invalid: {
          DEFAULT: "hsl(var(--invalid))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      transitionTimingFunction: {
        "better-ease-in-out": "cubic-bezier(0.44, 0.05, 0.6, 0.94)", //"cubic-bezier(0,0,0.2,1)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(360deg) scale(10)" },
        },
        "rotate-bg": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "minimize-window": {
          "0%": { height: "100%", width: "100%" },
          "50%": { height: "0%", width: "100%" },
          "100%": { height: "0%", width: "0%" },
        },
        "maximize-window": {
          "0%": { height: "0%", width: "0%" },
          "50%": { height: "0%", width: "100%" },
          "100%": { height: "100%", width: "100%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        wave: {
          "40%": { transform: "rotate(0deg)" },
          "70%": { transform: "rotate(0deg)" },
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(10deg)" },
          "15%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-10deg)" },
          "25%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(10deg)" },

          // "0%": { transform: "rotate(0deg)" },
          // "25%": { transform: "rotate(-10deg)" },
          // "50%": { transform: "rotate(10deg)" },
          // "75%": { transform: "rotate(-10deg)" },
          // "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rotate: "rotate 10s linear infinite",
        "rotate-bg": "rotate-bg 2s linear infinite",
        "minimize-window":
          "minimize-window 0.5s cubic-bezier(0.44, 0.05, 0.6, 0.94)",
        "maximize-window":
          "maximize-window 0.5s cubic-bezier(0.44, 0.05, 0.6, 0.94)",
        "fade-in": "fade-in 1s cubic-bezier(0.44, 0.05, 0.6, 0.94) forwards",
        wave: "wave 1s cubic-bezier(0.44, 0.05, 0.6, 0.94) 1s",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;

export default config;
