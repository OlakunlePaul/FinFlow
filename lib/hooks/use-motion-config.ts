"use client"

import { useEffect, useState } from "react"
import motionDesignSystem from "@/motion-design-system.json"

// Export spring presets from the JSON
export const springPresets = motionDesignSystem.physics.spring_presets

// Export physics configuration
export const physics = {
  globalEasing: motionDesignSystem.physics.global_easing as [number, number, number, number],
  springPresets: motionDesignSystem.physics.spring_presets,
}

// Hook to check for reduced motion preference
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return

    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

