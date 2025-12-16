"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  className?: string
  count?: number
  color?: string
  size?: number
  speed?: number
}

export function Sparkles({
  className,
  count = 20,
  color = "rgba(255, 255, 255, 0.8)",
  size = 4,
  speed = 1,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sparkles, setSparkles] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2,
    }))

    setSparkles(newSparkles)
  }, [count])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration * speed}s`,
          }}
        />
      ))}
    </div>
  )
}

