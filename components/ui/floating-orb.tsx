"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingOrbProps {
  className?: string
  size?: number
  blur?: number
  opacity?: number
}

export function FloatingOrb({
  className,
  size = 600,
  blur = 100,
  opacity = 0.15,
}: FloatingOrbProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Use spring for smooth, laggy follow effect
  const springConfig = { damping: 20, stiffness: 50 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  
  // Create transform string that combines centering (-50%) with motion values
  const transform = useTransform(
    [xSpring, ySpring],
    ([x, y]) => `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to viewport center in pixels
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      // Offset from center (in pixels, scaled down for subtle movement)
      const offsetX = (e.clientX - centerX) * 0.3
      const offsetY = (e.clientY - centerY) * 0.3

      mouseX.set(offsetX)
      mouseY.set(offsetY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)",
          opacity,
          filter: `blur(${blur}px)`,
          left: "50%",
          top: "50%",
          transform,
        }}
      />
    </div>
  )
}

