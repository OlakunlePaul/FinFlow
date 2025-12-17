"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { OnboardingStep1 } from "@/components/onboarding/step-1"
import { OnboardingStep2 } from "@/components/onboarding/step-2"
import { OnboardingStep3 } from "@/components/onboarding/step-3"
import { OnboardingStep4 } from "@/components/onboarding/step-4"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedProgress } from "@/components/ui/animated-progress"
import { springPresets } from "@/lib/hooks/use-motion-config"

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore()
  const steps = [
    { id: 1, label: "Account details" },
    { id: 2, label: "Personal information" },
    { id: 3, label: "ID verification" },
    { id: 4, label: "Review & submit" },
  ]

  const activeIndex = Math.min(Math.max(currentStep - 1, 0), steps.length - 1)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-lightest px-4 py-8">
      <Card className="w-full max-w-3xl border border-gray-lighter shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-h1 text-dark-blue">
            Create your FinFlow account
          </CardTitle>
          <CardDescription className="text-body text-gray">
            Complete these quick steps to start sending and receiving money
            globally.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-6 space-y-4">
            <AnimatedProgress
              value={(activeIndex + 1) * 25}
              max={100}
              className="mx-auto max-w-md"
            />
            <div className="flex items-center justify-center">
              {steps.map((step, index) => {
                const isCompleted = index < activeIndex
                const isActive = index === activeIndex

                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-small font-semibold transition-all
                        ${
                          isCompleted
                            ? "bg-emerald-green text-white"
                            : isActive
                            ? "bg-light-blue text-white"
                            : "bg-gray-lighter text-gray"
                        }`}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{
                        type: "spring",
                        ...springPresets.gentle,
                      }}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <motion.div
                        className={`mx-2 h-0.5 w-10 md:w-16 ${
                          index < activeIndex ? "bg-emerald-green" : "bg-gray-lighter"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: index < activeIndex ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          ...springPresets.gentle,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <p className="mb-6 text-center text-small text-gray">
            Step {activeIndex + 1} of {steps.length}: {steps[activeIndex].label}
          </p>

          {/* Step content */}
          <div className="min-h-[420px] relative overflow-visible">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    ...springPresets.gentle,
                  }}
                >
                  <OnboardingStep1 />
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    ...springPresets.gentle,
                  }}
                >
                  <OnboardingStep2 />
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    ...springPresets.gentle,
                  }}
                >
                  <OnboardingStep3 />
                </motion.div>
              )}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    ...springPresets.gentle,
                  }}
                >
                  <OnboardingStep4 />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

