"use client"

import { useRouter } from "next/navigation"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

export function OnboardingStep4() {
  const router = useRouter()
  const { toast } = useToast()
  const { email, password, name, dob, address, idUploaded, reset, setCurrentStep } =
    useOnboardingStore()

  const goBack = () => {
    setCurrentStep(3)
  }

  const handleSubmit = async () => {
    try {
      // In a real app, you'd create the account here
      // For demo, we'll just sign them in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Error",
          description: "Failed to create account. Please try again.",
          variant: "destructive",
        })
        return
      }

      reset()
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Review Your Information</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border bg-muted/50 p-6">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-muted-foreground">Email:</span>
          <span>{email}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-muted-foreground">Name:</span>
          <span>{name}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-muted-foreground">Date of Birth:</span>
          <span>{new Date(dob).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-muted-foreground">Address:</span>
          <span className="text-right">{address}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-muted-foreground">ID Verified:</span>
          <span className="flex items-center gap-2">
            {idUploaded ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Yes</span>
              </>
            ) : (
              <span>No</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={goBack} className="flex-1">
          Back
        </Button>
        <Button type="button" onClick={handleSubmit} className="flex-1">
          Submit & Create Account
        </Button>
      </div>
    </div>
  )
}

