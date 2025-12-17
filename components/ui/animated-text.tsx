"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { springPresets, useReducedMotion } from "@/lib/hooks/use-motion-config"

interface AnimatedTextProps {
  children: string
  className?: string
  staggerDelay?: number
  initialY?: number
}

export function AnimatedText({
  children,
  className,
  staggerDelay = 0.05,
  initialY = 20,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  const words = children.split(" ")

  // Track mount state to ensure consistent hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Always render the same structure to prevent hydration mismatches
  // Keep initial prop consistent to avoid animation restart during hydration
  // Control animation behavior through transition prop (duration: 0 for reduced motion)
  // Only animate when mounted AND user hasn't requested reduced motion
  const shouldAnimate = isMounted && !prefersReducedMotion

  return (
    <span className={cn("inline-block", className)} suppressHydrationWarning>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          // Always use the same initial value to prevent animation restart during hydration
          initial={{ opacity: 0, y: initialY }}
          // Always animate to final state - transition prop controls whether it's instant or animated
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldAnimate
              ? {
                  type: "spring",
                  ...springPresets.gentle,
                  delay: index * staggerDelay,
                }
              : { duration: 0 }
          }
          className="inline-block"
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  )
}

