"use client"

import { Card } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Eye, EyeOff, Wifi } from "lucide-react"
import { motion } from "framer-motion"
import { springPresets } from "@/lib/hooks/use-motion-config"

export function VirtualCard() {
  const { data: session } = useSession()
  const [isFlipped, setIsFlipped] = useState(false)
  const [showCVV, setShowCVV] = useState(false)

  // Generate masked card number for demo
  // In production, this would come from the API
  const cardNumber = "0000 0000 0000 0000"

  const cvv = "123"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        ...springPresets.gentle,
        delay: 0.15,
      }}
      className="card-flip-container h-60 w-full md:h-52"
    >
      <div
        className={`card-flip-inner ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsFlipped(!isFlipped)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "Flip card to front" : "Flip card to back"}
      >
        {/* Front of Card */}
        <Card className="card-flip-front relative h-full w-full overflow-hidden border-0 bg-gradient-to-br from-primary via-primary to-accent text-text-on-primary shadow-xl transition-all duration-300 hover:shadow-2xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
            {/* Top row: logo + chip + contactless */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-raised/90 text-xs font-semibold text-primary">
                  F
                </div>
                <div className="flex flex-col">
                  <span className="text-tiny font-medium text-surface-subtle">
                    Virtual debit
                  </span>
                  <span className="text-small font-semibold">FinFlow</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-7 w-10 items-center justify-center rounded-sm bg-surface-raised/10 border border-surface-subtle/60 text-surface-subtle"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 32 24"
                    className="h-5 w-8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="28"
                      height="16"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="5"
                      y="9"
                      width="8"
                      height="6"
                      rx="1"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <line
                      x1="16"
                      y1="8"
                      x2="26"
                      y2="8"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="16"
                      x2="26"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <Wifi className="h-4 w-4 text-surface-subtle" aria-hidden="true" />
              </div>
            </div>

            {/* Card Number Section */}
            <div className="mb-4 flex-1">
              <p className="mb-1 text-tiny uppercase tracking-[0.14em] text-surface-subtle">
                Card number
              </p>
              <p className="text-xl font-mono tracking-[0.35em] md:text-2xl">
                {cardNumber}
              </p>
            </div>

            {/* Bottom section */}
            <div className="mt-auto flex items-end justify-between gap-6 text-sm">
              <div className="flex flex-col">
                <p className="text-tiny uppercase tracking-[0.14em] text-surface-subtle">
                  Cardholder
                </p>
                <p className="mt-1 font-semibold leading-tight">
                  {session?.user?.name?.toUpperCase() || "DEMO USER"}
                </p>
              </div>
              <div className="flex items-end gap-6">
                <div className="text-right">
                  <p className="text-tiny uppercase tracking-[0.14em] text-surface-subtle">
                    Valid thru
                  </p>
                  <p className="mt-1 font-semibold">12/25</p>
                </div>
                <div
                  className="flex items-center gap-1"
                  aria-label="Card network"
                >
                  <span className="h-5 w-5 rounded-full bg-surface-raised/90" />
                  <span className="h-5 w-5 rounded-full border border-surface-subtle/70 bg-transparent" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of Card */}
        <Card className="card-flip-back relative h-full w-full overflow-hidden border border-border-subtle bg-surface-raised text-text-strong shadow-xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface-base/50 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
            {/* Magnetic stripe */}
            <div className="mb-5 h-8 w-full rounded-sm bg-neutral-800" />

            {/* CVV row */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="mb-1 text-tiny uppercase tracking-[0.14em] text-text-muted">
                  CVV
                </p>
                <div className="flex items-center gap-2">
                  <div className="min-w-[72px] rounded-md bg-surface-base px-3 py-1 font-mono text-sm tracking-[0.3em]">
                    {showCVV ? cvv : "•••"}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCVV(!showCVV)
                    }}
                    className="rounded-md border border-border-subtle bg-surface-raised p-1.5 text-text-muted transition-fast ease-standard hover:bg-surface-base"
                    aria-label={showCVV ? "Hide CVV" : "Show CVV"}
                  >
                    {showCVV ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto text-tiny text-text-muted">
              Click to flip card and hide sensitive details.
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

