"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { springPresets } from "@/lib/hooks/use-motion-config"
import { Card } from "@/components/ui/card"

interface CardWithEffectsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function CardWithEffects({
  children,
  className,
  ...cardProps
}: CardWithEffectsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [hasSheenPlayed, setHasSheenPlayed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 3D tilt effect (desktop only)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateXSpring = useSpring(mouseY, { damping: 15, stiffness: 150 })
  const rotateYSpring = useSpring(mouseX, { damping: 15, stiffness: 150 })

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Play sheen effect once on mobile load
    if (isMobile && !hasSheenPlayed) {
      const timer = setTimeout(() => setHasSheenPlayed(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isMobile, hasSheenPlayed])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = e.clientX - centerX
    const y = e.clientY - centerY
    
    // Normalize to -1 to 1 range
    const normalizedX = x / (rect.width / 2)
    const normalizedY = y / (rect.height / 2)
    
    // Max rotation: 5 degrees
    mouseX.set(normalizedX * 5)
    mouseY.set(-normalizedY * 5) // Negative for natural tilt
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        ...springPresets.snappy,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateXSpring,
        rotateY: isMobile ? 0 : rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={cn("relative", className)}
    >
      <Card {...cardProps} className={cn("relative overflow-hidden", cardProps.className)}>
        {/* Sheen effect for mobile */}
        {isMobile && hasSheenPlayed && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
              width: "50%",
              height: "100%",
            }}
          />
        )}
        {children}
      </Card>
    </motion.div>
  )
}

