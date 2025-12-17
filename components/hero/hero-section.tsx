"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { HeroDefault } from "./hero-default"
import { HeroConversion } from "./hero-conversion"
import { HeroBrand } from "./hero-brand"
import { HeroDev } from "./hero-dev"
import { HeroVariantSwitcher, type HeroVariant } from "./hero-variant-switcher"
import { useHeroAnalytics } from "@/hooks/use-hero-analytics"
import { HeroAnalyticsContext } from "./hero-analytics-context"

const easing = [0.4, 0, 0.2, 1] as const

const fadeTransition = {
  duration: 0.3,
  ease: easing,
}

const VALID_VARIANTS: HeroVariant[] = ["default", "conversion", "brand", "dev"]

function isValidVariant(variant: string | null): variant is HeroVariant {
  return variant !== null && VALID_VARIANTS.includes(variant as HeroVariant)
}

export function HeroSection() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isUserActionRef = useRef(false)
  
  // Initialize variant from URL or default to "default"
  const [variant, setVariant] = useState<HeroVariant>(() => {
    const urlVariant = searchParams.get("variant")
    return isValidVariant(urlVariant) ? urlVariant : "default"
  })

  // Sync URL when variant changes (from user action)
  useEffect(() => {
    if (!isUserActionRef.current) return
    
    const currentVariant = searchParams.get("variant")
    if (currentVariant !== variant) {
      const newUrl = variant === "default" 
        ? window.location.pathname 
        : `?variant=${variant}`
      router.push(newUrl, { scroll: false })
    }
    isUserActionRef.current = false
  }, [variant, router, searchParams])

  // Sync variant when URL changes (browser back/forward or direct URL)
  useEffect(() => {
    const urlVariant = searchParams.get("variant")
    const newVariant = isValidVariant(urlVariant) ? urlVariant : "default"
    
    // Use functional update to avoid stale closure
    setVariant((currentVariant) => {
      if (newVariant !== currentVariant) {
        isUserActionRef.current = false // Prevent URL update loop
        return newVariant
      }
      return currentVariant
    })
  }, [searchParams]) // Only depend on searchParams

  // Analytics tracking
  const { trackCTA } = useHeroAnalytics(variant)

  const handleVariantChange = (newVariant: HeroVariant) => {
    isUserActionRef.current = true
    setVariant(newVariant)
  }

  const renderVariant = () => {
    switch (variant) {
      case "conversion":
        return <HeroConversion />
      case "brand":
        return <HeroBrand />
      case "dev":
        return <HeroDev />
      default:
        return <HeroDefault />
    }
  }

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:py-32">
      {/* Interactive Grid Pattern Background - Hero Section Only */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <InteractiveGridPattern
          width={50}
          height={50}
          squares={[25, 25]}
          className="opacity-35"
          squaresClassName="stroke-slate-400/50"
        />
      </div>

      {/* Variant Switcher */}
      <HeroVariantSwitcher variant={variant} onVariantChange={handleVariantChange} />

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto max-w-6xl">
        <HeroAnalyticsContext.Provider value={{ trackCTA }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={fadeTransition}
            >
              {renderVariant()}
            </motion.div>
          </AnimatePresence>
        </HeroAnalyticsContext.Provider>
      </div>
    </section>
  )
}

