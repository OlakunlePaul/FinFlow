"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MeteorsProps {
  className?: string
  number?: number
}

export function Meteors({ className, number = 20 }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Array<{
    id: number
    left: string
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.floor(Math.random() * (100 - -10) + -10)}%`,
      delay: Math.random() * 0.6,
      duration: Math.random() * 0.6 + 0.4,
    }))
    setMeteors(newMeteors)
  }, [number])

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="animate-meteor-effect absolute top-0 h-px w-px rounded-full bg-gradient-to-r from-primary/50 to-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          style={{
            left: meteor.left,
            top: 0,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

