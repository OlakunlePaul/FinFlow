"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedInputWrapper } from "@/components/ui/animated-input-wrapper"
import { sanitizeInput } from "@/lib/utils"

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().refine(
    (date) => {
      const d = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - d.getFullYear()
      return age >= 18
    },
    { message: "You must be at least 18 years old" }
  ),
  address: z.string().min(10, "Address must be at least 10 characters"),
})

type Step2Form = z.infer<typeof step2Schema>

export function OnboardingStep2() {
  const { name, dob, address, setStep2, setCurrentStep } = useOnboardingStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
    defaultValues: { name, dob, address },
  })

  const onSubmit = (data: Step2Form) => {
    setStep2(
      sanitizeInput(data.name),
      sanitizeInput(data.dob),
      sanitizeInput(data.address)
    )
    setCurrentStep(3)
  }

  const goBack = () => {
    setCurrentStep(1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="mb-3 text-2xl font-semibold">Personal information</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;re required by law to collect basic details about you to comply with KYC/AML regulations and determine
          which countries we can support.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatedInputWrapper
          label="Full Name"
        >
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}

        <AnimatedInputWrapper
          label={
            <>
              Date of birth{" "}
              <span className="text-xs font-normal text-muted-foreground">(you must be at least 18 years old)</span>
            </>
          }
        >
          <Input
            id="dob"
            type="date"
            {...register("dob")}
            className={errors.dob ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.dob && (
          <p className="mt-1 text-sm text-destructive">{errors.dob.message}</p>
        )}

        <AnimatedInputWrapper
          label={
            <>
              Address{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (include city, state, ZIP/postcode, and country)
              </span>
            </>
          }
        >
          <Input
            id="address"
            type="text"
            placeholder="123 Main St, City, State, ZIP"
            {...register("address")}
            className={errors.address ? "border-destructive" : ""}
          />
        </AnimatedInputWrapper>
        {errors.address && (
          <p className="mt-1 text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={goBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  )
}

