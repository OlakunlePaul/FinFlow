"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    if (currentIndex >= words.length) {
      setIsComplete(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText(words.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, delay + duration * currentIndex)

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

