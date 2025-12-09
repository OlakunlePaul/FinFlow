"use client"

import { useState } from "react"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { OnboardingStep1 } from "@/components/onboarding/step-1"
import { OnboardingStep2 } from "@/components/onboarding/step-2"
import { OnboardingStep3 } from "@/components/onboarding/step-3"
import { OnboardingStep4 } from "@/components/onboarding/step-4"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to FinFlow</CardTitle>
          <CardDescription className="text-lg">
            Let's get you set up in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    step <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 flex-1 transition-all ${
                      step < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[400px]">
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

