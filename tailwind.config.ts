import type { Config } from "tailwindcss"
import { colors, spacing, radius, motion } from "./design-system/tokens"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        // base semantic aliases used by shadcn styles
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // token-based semantic palette
        primary: colors.primary,
        "primary-soft": colors.primarySoft,
        accent: colors.accent,
        "accent-soft": colors.accentSoft,
        success: colors.success,
        "success-soft": colors.successSoft,
        warning: colors.warning,
        "warning-soft": colors.warningSoft,
        danger: colors.danger,
        "danger-soft": colors.dangerSoft,
        "surface-base": colors.surfaceBase,
        "surface-raised": colors.surfaceRaised,
        "surface-subtle": colors.surfaceSubtle,
        "border-subtle": colors.borderSubtle,
        "border-strong": colors.borderStrong,
        "text-strong": colors.textStrong,
        "text-default": colors.textDefault,
        "text-muted": colors.textMuted,
        "text-on-primary": colors.textOnPrimary,
        // Backwards-compatible aliases used in existing components
        "dark-blue": colors.primary,
        "dark-blue-light": colors.accent,
        "dark-blue-dark": colors.primary,
        "light-blue": colors.accent,
        "light-blue-pale": colors.accentSoft,
        "light-blue-dark": colors.accent,
        gold: colors.warning,
        "gold-light": colors.warningSoft,
        "gold-dark": colors.warning,
        white: "#FFFFFF",
        "dark-gray": colors.textStrong,
        gray: colors.textDefault,
        "gray-light": colors.textMuted,
        "gray-lighter": colors.borderSubtle,
        "gray-lightest": colors.surfaceBase,
      },
      spacing,
      borderRadius: {
        ...radius,
        lg: radius.lg,
        md: radius.md,
        sm: radius.sm,
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],
        tiny: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      transitionDuration: {
        fast: motion.duration.fast,
        standard: motion.duration.standard,
      },
      transitionTimingFunction: {
        standard: motion.easing.standard,
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(15, 23, 42, 0.03)",
        md: "0 4px 10px rgba(15, 23, 42, 0.08)",
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
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

