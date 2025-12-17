"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { useHeroAnalyticsContext } from "./hero-analytics-context"

const easing = [0.4, 0, 0.2, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing },
}

export function HeroBrand() {
  const { trackCTA } = useHeroAnalyticsContext()

  return (
    <>
      <motion.div
        {...fadeInUp}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-base px-4 py-2 text-sm text-text-muted">
          <Star className="h-4 w-4 text-primary" />
          <span>Trusted by leading fintech companies</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-text-strong sm:text-5xl lg:text-6xl">
          The future of financial infrastructure
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted sm:text-xl">
          FinFlow powers the next generation of financial applications. 
          Built with precision, designed for scale, trusted by innovators.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup" onClick={() => trackCTA("primary", "Explore Platform")}>
            <Button size="lg" className="bg-primary text-text-on-primary hover:bg-primary/90">
              Explore Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signin" onClick={() => trackCTA("secondary", "Learn More")}>
            <Button size="lg" variant="outline" className="border-border-subtle text-text-strong hover:bg-surface-base">
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Brand-focused visual */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.6, ease: easing }}
        className="mt-16 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <div className="relative rounded-2xl border border-border-subtle bg-gradient-to-br from-surface-base to-white p-12 shadow-lg">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                <span className="text-2xl font-bold text-text-strong">FinFlow</span>
              </div>
              <p className="max-w-md text-text-muted">
                Empowering businesses to build, scale, and innovate with confidence
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

