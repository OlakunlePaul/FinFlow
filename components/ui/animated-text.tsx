"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
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
  const words = children.split(" ")

  if (prefersReducedMotion) {
    return <span className={cn(className)}>{children}</span>
  }

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            ...springPresets.gentle,
            delay: index * staggerDelay,
          }}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  )
}

