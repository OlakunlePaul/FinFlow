"use client"

import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { OnboardingStep1 } from "@/components/onboarding/step-1"
import { OnboardingStep2 } from "@/components/onboarding/step-2"
import { OnboardingStep3 } from "@/components/onboarding/step-3"
import { OnboardingStep4 } from "@/components/onboarding/step-4"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
          <div className="mb-6 flex items-center justify-center">
            {steps.map((step, index) => {
              const isCompleted = index < activeIndex
              const isActive = index === activeIndex

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-small font-semibold transition-all
                      ${
                        isCompleted
                          ? "bg-emerald-green text-white"
                          : isActive
                          ? "bg-light-blue text-white"
                          : "bg-gray-lighter text-gray"
                      }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-10 md:w-16 transition-colors ${
                        index < activeIndex ? "bg-emerald-green" : "bg-gray-lighter"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <p className="mb-6 text-center text-small text-gray">
            Step {activeIndex + 1} of {steps.length}: {steps[activeIndex].label}
          </p>

          {/* Step content */}
          <div className="min-h-[420px]">
            {currentStep === 1 && <OnboardingStep1 />}
            {currentStep === 2 && <OnboardingStep2 />}
            {currentStep === 3 && <OnboardingStep3 />}
            {currentStep === 4 && <OnboardingStep4 />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

