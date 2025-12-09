"use client"

import { Card } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function VirtualCard() {
  const { data: session } = useSession()
  const [isFlipped, setIsFlipped] = useState(false)
  const [showCVV, setShowCVV] = useState(false)

  // Generate masked card number for demo
  // In production, this would come from the API
  const cardNumber = "0000 0000 0000 0000"

  const cvv = "123"

  return (
    <div className="card-flip-container h-56 w-full">
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
        <Card className="card-flip-front h-full w-full overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          
          <div className="relative flex h-full flex-col p-6">
            {/* Top section - Chip and VISA */}
            <div className="mb-6 flex items-center justify-between">
              <div className="h-12 w-16 rounded-lg bg-white/20 backdrop-blur-sm" />
              <div className="text-sm font-semibold tracking-wider">VISA</div>
            </div>
            
            {/* Card Number Section */}
            <div className="mb-8 flex-1">
              <div className="mb-2 text-xs text-white/70">CARD NUMBER</div>
              <div className="text-2xl font-mono tracking-widest md:text-3xl">
                {cardNumber}
              </div>
            </div>
            
            {/* Bottom section - Cardholder and Expires */}
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <div className="mb-1 text-xs text-white/70">CARDHOLDER</div>
                <div className="text-lg font-semibold leading-tight">
                  {session?.user?.name?.toUpperCase() || "DEMO USER"}
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="mb-1 text-xs text-white/70">EXPIRES</div>
                <div className="text-lg font-semibold">12/25</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of Card */}
        <Card className="card-flip-back h-full w-full overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <div className="relative h-full p-6">
            <div className="mb-6 h-12 w-full rounded bg-black/50" />
            
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 text-xs text-white/70">CVV</div>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-white/20 px-4 py-2 font-mono text-xl tracking-widest">
                    {showCVV ? cvv : "•••"}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowCVV(!showCVV)
                    }}
                    className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
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
            
            <div className="mt-auto text-xs text-white/60">
              Click to flip back
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

