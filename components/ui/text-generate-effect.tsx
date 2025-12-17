"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  words: string
  className?: string
  cursorClassName?: string
  duration?: number
  delay?: number
}

export function TextGenerateEffect({
  words,
  className,
  cursorClassName,
  duration = 30,
  delay = 0,
}: TextGenerateEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Reset when words change
    setDisplayedText("")
    setCurrentIndex(0)
    setIsComplete(false)
    startTimeRef.current = null
  }, [words])

  useEffect(() => {
    if (currentIndex >= words.length) {
      setIsComplete(true)
      return
    }

    // Track when animation started
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now()
    }

    // Calculate absolute time from start: each character appears at delay + (index * duration)
    // This ensures equal spacing between characters regardless of when the effect runs
    const elapsed = performance.now() - startTimeRef.current
    const targetTime = delay + duration * currentIndex
    const remainingDelay = Math.max(0, targetTime - elapsed)

    const timeout = setTimeout(() => {
      setDisplayedText(words.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, remainingDelay)

    return () => clearTimeout(timeout)
  }, [currentIndex, words, duration, delay])

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {!isComplete && (
        <span
          className={cn(
            "inline-block h-[1em] w-[2px] animate-pulse bg-current align-middle",
            cursorClassName
          )}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

