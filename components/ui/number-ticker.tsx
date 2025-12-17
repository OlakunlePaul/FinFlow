"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
  currency?: string
  locale?: string
  decimals?: number
}

export function NumberTicker({
  value,
  duration = 2000,
  className,
  currency = "USD",
  locale = "en-US",
  decimals = 2,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    // Only animate on mount (from 0 to value)
    if (hasAnimatedRef.current) {
      setDisplayValue(value)
      return
    }

    setIsAnimating(true)
    const startTime = performance.now()
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function: ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        hasAnimatedRef.current = true
        startTimeRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [value, duration])

  // Format using Intl.NumberFormat for proper currency formatting
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  const formattedValue = formatter.format(displayValue)

  return (
    <span className={cn("tabular-nums", className)}>
      {formattedValue}
    </span>
  )
}

