"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { useHeroAnalyticsContext } from "./hero-analytics-context"

const easing = [0.4, 0, 0.2, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing },
}

export function HeroConversion() {
  const { trackCTA } = useHeroAnalyticsContext()

  return (
    <>
      <motion.div
        {...fadeInUp}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-text-strong sm:text-5xl lg:text-6xl">
          Start accepting payments in minutes
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted sm:text-xl">
          Join thousands of businesses using FinFlow to process payments, manage wallets, 
          and scale their financial operations. No credit check required.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup" onClick={() => trackCTA("primary", "Create Free Account")}>
            <Button size="lg" className="bg-primary text-text-on-primary hover:bg-primary/90">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signin" onClick={() => trackCTA("secondary", "Sign In")}>
            <Button size="lg" variant="outline" className="border-border-subtle text-text-strong hover:bg-surface-base">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </motion.div>

      {/* Conversion-focused visual */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.5, ease: easing }}
        className="mt-16 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <div className="relative rounded-2xl border border-border-subtle bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            <div className="grid gap-4 sm:grid-cols-3">
              {["$0", "2.9%", "24/7"].map((stat, i) => (
                <div key={i} className="rounded-lg border border-border-subtle bg-white/60 p-6 text-center backdrop-blur-sm transition-all duration-200 hover:bg-white/80 hover:shadow-sm">
                  <div className="text-2xl font-bold text-text-strong">{stat}</div>
                  <div className="mt-1 text-xs text-text-muted">
                    {i === 0 ? "Setup fee" : i === 1 ? "Transaction fee" : "Support"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

