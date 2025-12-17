"use client"

import { useEffect, useRef } from "react"
import type { HeroVariant } from "@/components/hero/hero-variant-switcher"

interface AnalyticsEvent {
  event: string
  variant: HeroVariant
  timestamp: string
  session_id?: string
  [key: string]: unknown
}

// Simple analytics tracking function
// Can be extended to integrate with Google Analytics, Mixpanel, etc.
function trackEvent(event: AnalyticsEvent) {
  // In production, replace this with your analytics provider
  // Examples:
  // - Google Analytics: gtag('event', event.event, event)
  // - Mixpanel: mixpanel.track(event.event, event)
  // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) })
  
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event)
  }
  
  // Optional: Send to your analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event),
  // }).catch(console.error)
}

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === "undefined") return ""
  
  const storageKey = "finflow_session_id"
  let sessionId = sessionStorage.getItem(storageKey)
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(storageKey, sessionId)
  }
  
  return sessionId
}

export function useHeroAnalytics(variant: HeroVariant) {
  const previousVariantRef = useRef<HeroVariant | null>(null)
  const viewStartTimeRef = useRef<number>(Date.now())
  const sessionId = getSessionId()

  // Track variant view
  useEffect(() => {
    const now = Date.now()
    
    // Track variant switch if switching from another variant
    if (previousVariantRef.current && previousVariantRef.current !== variant) {
      const timeSpent = now - viewStartTimeRef.current
      
      trackEvent({
        event: "hero_variant_switched",
        variant: previousVariantRef.current,
        new_variant: variant,
        time_spent_ms: timeSpent,
        timestamp: new Date().toISOString(),
        session_id: sessionId,
      })
    }

    // Track new variant view
    trackEvent({
      event: "hero_variant_viewed",
      variant,
      timestamp: new Date().toISOString(),
      session_id: sessionId,
    })

    // Update refs
    previousVariantRef.current = variant
    viewStartTimeRef.current = now

    // Track time spent on variant when component unmounts or variant changes
    return () => {
      const timeSpent = Date.now() - viewStartTimeRef.current
      if (timeSpent > 1000) {
        // Only track if user spent more than 1 second
        trackEvent({
          event: "hero_variant_time_spent",
          variant,
          time_spent_ms: timeSpent,
          timestamp: new Date().toISOString(),
          session_id: sessionId,
        })
      }
    }
  }, [variant, sessionId])

  // Track CTA clicks
  const trackCTA = (ctaType: "primary" | "secondary", ctaLabel?: string) => {
    trackEvent({
      event: "hero_cta_clicked",
      variant,
      cta_type: ctaType,
      cta_label: ctaLabel,
      timestamp: new Date().toISOString(),
      session_id: sessionId,
    })
  }

  // Track scroll depth (optional)
  const trackScrollDepth = (depth: number) => {
    trackEvent({
      event: "hero_scroll_depth",
      variant,
      scroll_depth: depth,
      timestamp: new Date().toISOString(),
      session_id: sessionId,
    })
  }

  return {
    trackCTA,
    trackScrollDepth,
  }
}

