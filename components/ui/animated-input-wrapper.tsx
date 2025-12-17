"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { springPresets } from "@/lib/hooks/use-motion-config"

interface AnimatedInputWrapperProps {
  children: ReactNode
  label?: ReactNode
  className?: string
  labelClassName?: string
}

export function AnimatedInputWrapper({
  children,
  label,
  className,
  labelClassName,
}: AnimatedInputWrapperProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // Clone children to add focus/blur handlers
  const childrenWithHandlers = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Extract handlers from current child props to avoid stale closures
      const childProps = child.props as { onFocus?: (e: React.FocusEvent) => void; onBlur?: (e: React.FocusEvent) => void }
      const originalOnFocus = childProps.onFocus
      const originalOnBlur = childProps.onBlur

      return React.cloneElement(child as React.ReactElement<any>, {
        onFocus: (e: React.FocusEvent) => {
          handleFocus()
          originalOnFocus?.(e)
        },
        onBlur: (e: React.FocusEvent) => {
          handleBlur()
          originalOnBlur?.(e)
        },
      })
    }
    return child
  })

  return (
    <div className={cn("relative", className)}>
      {label && (
        <motion.label
          className={cn("mb-2 block text-sm font-medium", labelClassName)}
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{
            type: "spring",
            ...springPresets.gentle,
          }}
        >
          {label}
        </motion.label>
      )}
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{
          type: "spring",
          ...springPresets.gentle,
        }}
      >
        {childrenWithHandlers}
      </motion.div>
    </div>
  )
}

