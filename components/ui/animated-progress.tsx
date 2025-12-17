"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { springPresets } from "@/lib/hooks/use-motion-config"

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
  
  // Use motion value and spring for smooth animation
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    ...springPresets.gentle,
    duration: 0.5, // 500ms as requested
  })
  const width = useTransform(springValue, (val) => `${val}%`)

  useEffect(() => {
    motionValue.set(percentage)
  }, [percentage, motionValue])

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
        style={{ width }}
      />
    </div>
  )
}

