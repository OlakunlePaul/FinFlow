"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { useHeroAnalyticsContext } from "./hero-analytics-context"

const easing = [0.4, 0, 0.2, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing },
}

export function HeroDefault() {
  const { trackCTA } = useHeroAnalyticsContext()

  return (
    <>
      <motion.div
        {...fadeInUp}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-text-strong sm:text-5xl lg:text-6xl">
          Production-ready wallet infrastructure
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted sm:text-xl">
          Build secure, scalable financial products with enterprise-grade reliability. 
          Trusted by teams shipping real money features.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup" onClick={() => trackCTA("primary", "Get Started")}>
            <Button size="lg" className="bg-primary text-text-on-primary hover:bg-primary/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signin" onClick={() => trackCTA("secondary", "View Dashboard")}>
            <Button size="lg" variant="outline" className="border-border-subtle text-text-strong hover:bg-surface-base">
              View Dashboard
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-text-muted">
          <Shield className="mr-1.5 inline h-4 w-4" />
          SOC 2 compliant • 256-bit encryption • 99.9% uptime SLA
        </p>
      </motion.div>

      {/* Hero Visual - Subtle Virtual Card */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.6, ease: easing }}
        className="mt-16 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <div className="relative rounded-2xl border border-border-subtle bg-gradient-to-br from-surface-base to-white p-8 shadow-lg">
            {/* Subtle glassy card mock */}
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-xl border border-border-subtle/50 bg-white/60 p-6 backdrop-blur-sm shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-8 w-12 rounded bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="h-6 w-6 rounded-full border-2 border-border-subtle" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="h-4 w-32 rounded bg-text-muted/20" />
                  <div className="h-4 w-24 rounded bg-text-muted/10" />
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-text-muted">
                  <span>•••• 1234</span>
                  <span>12/25</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

