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
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const previousValueRef = useRef(value)
  const displayValueRef = useRef(value)

  // Keep displayValueRef in sync with displayValue
  useEffect(() => {
    displayValueRef.current = displayValue
  }, [displayValue])

  useEffect(() => {
    // If value hasn't changed, no need to animate
    if (previousValueRef.current === value) {
      return
    }

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    setIsAnimating(true)
    const startTime = performance.now()
    // Use current displayed value as start (in case animation was interrupted)
    const startValue = displayValueRef.current
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
        previousValueRef.current = value
        startTimeRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      // Update previous value to current displayed value when animation is cancelled
      previousValueRef.current = displayValueRef.current
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

