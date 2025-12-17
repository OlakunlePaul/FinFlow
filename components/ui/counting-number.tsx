"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface CountingNumberProps {
  value: number
  duration?: number
  className?: string
  decimals?: number
  prefix?: string
  suffix?: string
}

export function CountingNumber({
  value,
  duration = 2000,
  className,
  decimals = 2,
  prefix = "",
  suffix = "",
}: CountingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const startValueRef = useRef(value)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const displayValueRef = useRef(value)
  const isInitialMountRef = useRef(true)

  // Keep displayValueRef in sync with displayValue
  useEffect(() => {
    displayValueRef.current = displayValue
  }, [displayValue])

  useEffect(() => {
    // On initial mount, just set the value without animation
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      setDisplayValue(value)
      displayValueRef.current = value
      startValueRef.current = value
      return
    }

    // If value hasn't changed, no need to animate
    if (startValueRef.current === value) {
      setDisplayValue(value)
      displayValueRef.current = value
      return
    }

    setIsAnimating(true)
    const startValue = startValueRef.current
    const endValue = value
    const startTime = performance.now()

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
      displayValueRef.current = currentValue

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        startValueRef.current = value
        startTimeRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      // Update startValueRef to current displayValue when animation is cancelled
      // to prevent visual jumps when value changes before animation completes
      startValueRef.current = displayValueRef.current
      startTimeRef.current = null
    }
  }, [value, duration])

  const formatValue = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num)
  }

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  )
}

