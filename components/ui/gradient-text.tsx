"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
  animate?: boolean
}

export function GradientText({
  children,
  className,
  gradientFrom = "from-primary",
  gradientTo = "to-accent",
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientFrom,
        gradientTo,
        animate && "bg-[length:200%_auto] animate-gradient-shift",
        className
      )}
    >
      {children}
    </span>
  )
}

