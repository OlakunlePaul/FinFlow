"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type HeroVariant = "default" | "conversion" | "brand" | "dev"

interface HeroVariantSwitcherProps {
  variant: HeroVariant
  onVariantChange: (variant: HeroVariant) => void
}

const variants: { value: HeroVariant; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "conversion", label: "Conversion" },
  { value: "brand", label: "Brand" },
  { value: "dev", label: "Dev" },
]

export function HeroVariantSwitcher({
  variant,
  onVariantChange,
}: HeroVariantSwitcherProps) {
  return (
    <div
      className="absolute top-6 right-6 z-20 flex items-center gap-1 rounded-lg border border-border-subtle bg-white/80 backdrop-blur-sm p-1 shadow-sm"
      role="tablist"
      aria-label="Hero variant switcher"
    >
      {variants.map((v) => (
        <button
          key={v.value}
          onClick={() => onVariantChange(v.value)}
          className={cn(
            "relative px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
            variant === v.value
              ? "text-text-strong"
              : "text-text-muted hover:text-text-strong"
          )}
          role="tab"
          aria-selected={variant === v.value}
          aria-controls={`hero-variant-${v.value}`}
        >
          {variant === v.value && (
            <motion.div
              layoutId="activeVariant"
              className="absolute inset-0 rounded-md bg-surface-base border border-border-subtle"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{v.label}</span>
        </button>
      ))}
    </div>
  )
}

