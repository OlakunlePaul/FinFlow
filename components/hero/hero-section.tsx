"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { HeroDefault } from "./hero-default"
import { HeroConversion } from "./hero-conversion"
import { HeroBrand } from "./hero-brand"
import { HeroDev } from "./hero-dev"
import { HeroVariantSwitcher, type HeroVariant } from "./hero-variant-switcher"

const fadeTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
}

export function HeroSection() {
  const [variant, setVariant] = useState<HeroVariant>("default")

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
      <HeroVariantSwitcher variant={variant} onVariantChange={setVariant} />

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto max-w-6xl">
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
      </div>
    </section>
  )
}

