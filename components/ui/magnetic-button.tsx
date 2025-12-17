"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, magneticStrength = 0.3, style, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })

    React.useImperativeHandle(ref, () => buttonRef.current!)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      setPosition({
        x: x * magneticStrength,
        y: y * magneticStrength,
      })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    return (
      <Button
        {...props}
        ref={buttonRef}
        className={cn("transition-transform duration-200 ease-out", className)}
        style={{
          ...style,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </Button>
    )
  }
)

MagneticButton.displayName = "MagneticButton"

export { MagneticButton }

