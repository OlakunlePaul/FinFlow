"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
}

export function AnimatedProgress({
  value,
  max = 100,
  className,
  barClassName,
}: AnimatedProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-lighter", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={cn("h-full rounded-full bg-primary", barClassName)}
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: [0.2, 0.0, 0.2, 1.0], // Spring-like easing curve
        }}
      />
    </div>
  )
}

