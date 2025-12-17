"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { springPresets } from "@/lib/hooks/use-motion-config"
import { Spinner } from "@/components/ui/spinner"
import { Check } from "lucide-react"

interface SlideToSubmitProps {
  onSubmit: () => void | Promise<void>
  disabled?: boolean
  className?: string
  label?: string
  completedLabel?: string
}

export function SlideToSubmit({
  onSubmit,
  disabled = false,
  className,
  label = "Slide to confirm",
  completedLabel = "Confirmed",
}: SlideToSubmitProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [maxX, setMaxX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const springX = useSpring(x, {
    ...springPresets.snappy,
    damping: 20,
  })

  // Calculate max drag distance
  useEffect(() => {
    const updateConstraints = () => {
      if (!trackRef.current || !knobRef.current) return
      const trackWidth = trackRef.current.offsetWidth
      const knobWidth = knobRef.current.offsetWidth
      // Only update if we have valid dimensions
      if (trackWidth > 0 && knobWidth > 0) {
        setMaxX(trackWidth - knobWidth)
      }
    }
    
    // Initial calculation
    updateConstraints()
    
    // Use ResizeObserver to detect layout changes
    const resizeObserver = new ResizeObserver(() => {
      updateConstraints()
    })
    
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current)
    }
    if (knobRef.current) {
      resizeObserver.observe(knobRef.current)
    }
    
    // Also listen to window resize as fallback
    window.addEventListener("resize", updateConstraints)
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateConstraints)
    }
  }, [])

  // Calculate progress percentage
  const progress = useTransform(springX, (latestX) => {
    return maxX > 0 ? (latestX / maxX) * 100 : 0
  })

  // Calculate width for progress fill
  const fillWidth = useTransform(progress, (p) => `${Math.min(Math.max(p, 0), 100)}%`)

  const startXRef = useRef(0)

  const handlePanStart = () => {
    if (disabled || isCompleted || isLoading) return
    startXRef.current = x.get() // Store current position
    setIsDragging(true)
  }

  const handlePan = (_: any, info: { offset: { x: number } }) => {
    if (disabled || isCompleted || isLoading) return
    
    // Calculate new position: start position + pan offset
    const newX = startXRef.current + info.offset.x
    
    // Constrain to track bounds and update motion value
    const constrainedX = Math.max(0, Math.min(newX, maxX))
    x.set(constrainedX)
  }

  const handlePanEnd = () => {
    if (disabled || isCompleted || isLoading) return
    
    const currentX = x.get()
    const threshold = maxX * 0.9 // 90% threshold
    
    if (currentX >= threshold) {
      // Completed - snap to end and trigger submit
      setIsCompleted(true)
      setIsLoading(true)
      x.set(maxX)
      
      // Trigger onSubmit
      Promise.resolve(onSubmit())
        .catch(() => {
          // On error, reset the component so user can try again
          setIsCompleted(false)
          x.set(0)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      // Not enough - spring back to start
      x.set(0)
    }
    
    setIsDragging(false)
    startXRef.current = 0
  }

  // Reset on disabled or when component unmounts
  useEffect(() => {
    if (disabled) {
      x.set(0)
      setIsCompleted(false)
      setIsLoading(false)
    }
  }, [disabled, x])

  // Get current progress value for text color
  const [progressValue, setProgressValue] = useState(0)
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setProgressValue(latest)
    })
    return unsubscribe
  }, [progress])

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={trackRef}
        className={cn(
          "relative h-14 w-full rounded-full border-2 transition-colors overflow-hidden",
          isCompleted
            ? "border-emerald-500 bg-emerald-50"
            : "border-border-subtle bg-surface-base"
        )}
      >
        {/* Progress fill */}
        <motion.div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-colors",
            isCompleted ? "bg-emerald-500" : "bg-primary"
          )}
          style={{
            width: isCompleted ? "100%" : fillWidth,
          }}
        />
        
        {/* Label text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={cn(
              "text-sm font-semibold transition-colors z-0",
              isCompleted
                ? "text-emerald-700"
                : progressValue > 50
                ? "text-text-on-primary"
                : "text-text-muted"
            )}
          >
            {isCompleted ? completedLabel : label}
          </span>
        </div>

        {/* Draggable knob */}
        <motion.div
          ref={knobRef}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className={cn(
            "absolute left-0 top-1 z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-full border-2 shadow-lg transition-colors active:cursor-grabbing select-none",
            isCompleted
              ? "border-emerald-600 bg-emerald-500"
              : "border-border-subtle bg-white",
            disabled && "cursor-not-allowed opacity-50"
          )}
          style={{
            x: springX,
          }}
          animate={{
            scale: isDragging ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {isLoading ? (
            <Spinner size="sm" className="text-white" />
          ) : isCompleted ? (
            <Check className="h-5 w-5 text-white" />
          ) : (
            <div className="flex flex-col gap-0.5">
              <div className="h-0.5 w-3 rounded-full bg-text-muted" />
              <div className="h-0.5 w-3 rounded-full bg-text-muted" />
              <div className="h-0.5 w-3 rounded-full bg-text-muted" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

