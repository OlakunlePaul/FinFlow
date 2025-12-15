export const colors = {
  // Brand / semantic (tuned for strong contrast)
  primary: "#0F172A", // deep navy for nav & key actions
  primarySoft: "#E2E8F0",
  accent: "#1D4ED8",
  accentSoft: "#DBEAFE",

  success: "#15803D",
  successSoft: "#DCFCE7",
  warning: "#C05621",
  warningSoft: "#FEF3C7",
  danger: "#B91C1C",
  dangerSoft: "#FEE2E2",

  // Surfaces
  surfaceBase: "#F3F4F6", // app background
  surfaceRaised: "#FFFFFF",
  surfaceSubtle: "#E5E7EB",

  // Borders
  borderSubtle: "#E5E7EB",
  borderStrong: "#6B7280",

  // Text
  textStrong: "#111827",
  textDefault: "#1F2933",
  textMuted: "#6B7280",
  textOnPrimary: "#FFFFFF",
} as const

export const spacing = {
  0: "0px",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
} as const

export const radius = {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "10px",
  xl: "14px",
  full: "9999px",
} as const

export const motion = {
  duration: {
    fast: "120ms", // hover / focus
    standard: "200ms", // state change
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const


