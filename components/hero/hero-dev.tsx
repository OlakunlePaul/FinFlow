"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Terminal } from "lucide-react"
import { useHeroAnalyticsContext } from "./hero-analytics-context"

const easing = [0.4, 0, 0.2, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing },
}

export function HeroDev() {
  const { trackCTA } = useHeroAnalyticsContext()

  return (
    <>
      <motion.div
        {...fadeInUp}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-text-strong sm:text-5xl lg:text-6xl">
          Developer-first wallet API
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted sm:text-xl">
          RESTful APIs, comprehensive documentation, and SDKs for every platform. 
          Ship financial features faster with our battle-tested infrastructure.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup" onClick={() => trackCTA("primary", "View Documentation")}>
            <Button size="lg" className="bg-primary text-text-on-primary hover:bg-primary/90">
              <Code className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </Link>
          <Link href="/auth/signin" onClick={() => trackCTA("secondary", "Get API Key")}>
            <Button size="lg" variant="outline" className="border-border-subtle text-text-strong hover:bg-surface-base">
              <Terminal className="mr-2 h-4 w-4" />
              Get API Key
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          <span>REST API</span>
          <span>•</span>
          <span>Webhooks</span>
          <span>•</span>
          <span>TypeScript SDK</span>
          <span>•</span>
          <span>React Components</span>
        </div>
      </motion.div>

      {/* Dev-focused visual */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.6, ease: easing }}
        className="mt-16 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <div className="relative rounded-2xl border border-border-subtle bg-slate-900 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm font-mono text-slate-400">api.finflow.com</span>
            </div>
            <div className="space-y-2 font-mono text-sm text-slate-300">
              <div>
                <span className="text-slate-500">$</span>{" "}
                <span className="text-green-400">curl</span>{" "}
                <span className="text-blue-400">https://api.finflow.com/v1/wallets</span>
              </div>
              <div className="ml-4">
                <span className="text-slate-500">-H</span>{" "}
                <span className="text-yellow-400">&quot;Authorization: Bearer sk_...&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

