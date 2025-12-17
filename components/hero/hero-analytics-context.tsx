"use client"

import { createContext, useContext } from "react"

interface HeroAnalyticsContextType {
  trackCTA: (ctaType: "primary" | "secondary", ctaLabel?: string) => void
}

export const HeroAnalyticsContext = createContext<HeroAnalyticsContextType | null>(null)

export function useHeroAnalyticsContext() {
  const context = useContext(HeroAnalyticsContext)
  if (!context) {
    // Return no-op function if context is not available
    return {
      trackCTA: () => {},
    }
  }
  return context
}

