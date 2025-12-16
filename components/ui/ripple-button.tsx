"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RippleButtonProps extends ButtonProps {
  rippleColor?: string
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, rippleColor = "rgba(255, 255, 255, 0.3)", ...props }, ref) => {
    const [ripples, setRipples] = React.useState<
      Array<{ x: number; y: number; id: number }>
    >([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => buttonRef.current!)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        x,
        y,
        id: Date.now(),
      }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)

      props.onClick?.(e)
    }

    return (
      <Button
        {...props}
        ref={buttonRef}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
      >
        {props.children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </Button>
    )
  }
)

RippleButton.displayName = "RippleButton"

export { RippleButton }

