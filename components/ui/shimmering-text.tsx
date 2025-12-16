"use client"

import { cn } from "@/lib/utils"

interface ShimmeringTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmeringText({ children, className }: ShimmeringTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block bg-gradient-to-r from-text-strong via-text-default to-text-strong bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer-text",
        className
      )}
    >
      {children}
    </span>
  )
}

