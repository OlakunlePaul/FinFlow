"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedInputWrapper } from "@/components/ui/animated-input-wrapper"
import { sanitizeInput } from "@/lib/utils"

const step1Schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type Step1Form = z.infer<typeof step1Schema>

export function OnboardingStep1() {
  const { email, password, setStep1, setCurrentStep } = useOnboardingStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email, password, confirmPassword: "" },
  })

  const onSubmit = (data: Step1Form) => {
    setStep1(sanitizeInput(data.email), sanitizeInput(data.password))
    setCurrentStep(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="mb-3 text-2xl font-semibold">Create your account</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll use your email and password to secure your wallet and help us meet basic compliance requirements.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatedInputWrapper
          label="Email Address"
        >
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}

        <AnimatedInputWrapper
          label="Password"
        >
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
        )}

        <AnimatedInputWrapper
          label="Confirm Password"
        >
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Continue"}
      </Button>
    </form>
  )
}

