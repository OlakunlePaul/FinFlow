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
      return React.cloneElement(child as React.ReactElement<any>, {
        onFocus: (e: React.FocusEvent) => {
          handleFocus()
          if (child && typeof child === "object" && "props" in child) {
            const childProps = (child as React.ReactElement).props
            childProps.onFocus?.(e)
          }
        },
        onBlur: (e: React.FocusEvent) => {
          handleBlur()
          if (child && typeof child === "object" && "props" in child) {
            const childProps = (child as React.ReactElement).props
            childProps.onBlur?.(e)
          }
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

