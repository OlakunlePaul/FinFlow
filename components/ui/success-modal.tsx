"use client"

import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { springPresets } from "@/lib/hooks/use-motion-config"
import { Check } from "lucide-react"

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  amount?: number
  recipient?: string
}

export function SuccessModal({
  open,
  onOpenChange,
  title = "Success!",
  description,
  amount,
  recipient,
}: SuccessModalProps) {
  const [checkmarkPath, setCheckmarkPath] = useState(0)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [open])

  useEffect(() => {
    if (open && pathLength > 0) {
      // Reset and animate checkmark
      setCheckmarkPath(0)
      
      // Small delay to ensure modal is visible
      const timeout = setTimeout(() => {
        const duration = 800 // ms
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation (ease-out cubic)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setCheckmarkPath(easeOut * pathLength)

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }, 100)

      return () => clearTimeout(timeout)
    } else {
      setCheckmarkPath(0)
    }
  }, [open, pathLength])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
            >
              <svg
                className="h-12 w-12 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  ref={pathRef}
                  d="M5 13l4 4L19 7"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength - checkmarkPath}
                />
              </svg>
            </motion.div>

            <div className="text-center space-y-2">
              <DialogTitle className="text-2xl font-semibold text-emerald-700">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-base text-gray-600">
                  {description}
                </DialogDescription>
              )}
              {amount !== undefined && recipient && (
                <div className="pt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">
                      ${amount.toFixed(2)}
                    </span>{" "}
                    sent to
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {recipient}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

