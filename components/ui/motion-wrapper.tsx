"use client"

import { motion, MotionProps, TargetAndTransition } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { springPresets, useReducedMotion } from "@/lib/hooks/use-motion-config"

interface MotionWrapperProps extends Omit<MotionProps, "initial" | "animate" | "exit"> {
  children: ReactNode
  delay?: number
  preset?: "fade" | "slideUp" | "zoom"
  className?: string
}

// Animation variants mapped to presets
const animationVariants: Record<string, {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
}> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
}

export function MotionWrapper({
  children,
  delay = 0,
  preset = "fade",
  className,
  transition,
  ...props
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()
  const variant = animationVariants[preset]

  // If user prefers reduced motion, use immediate transitions
  const motionTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        ...springPresets.gentle,
        delay,
        ...transition,
      }

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={motionTransition}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

