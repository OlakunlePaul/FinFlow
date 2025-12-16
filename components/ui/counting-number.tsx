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

  useEffect(() => {
    if (startValueRef.current === value) {
      setDisplayValue(value)
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
      }
    }
  }, [value, duration])

  const formatValue = (num: number) => {
    if (decimals === 0) {
      return Math.round(num).toLocaleString()
    }
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  )
}

