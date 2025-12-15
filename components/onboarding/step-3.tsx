"use client"

import { useState } from "react"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2 } from "lucide-react"

export function OnboardingStep3() {
  const { idUploaded, setStep3, setCurrentStep } = useOnboardingStore()
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStep3(true)
    setUploading(false)
  }

  const goBack = () => {
    setCurrentStep(2)
  }

  const continueToNext = () => {
    if (idUploaded) {
      setCurrentStep(4)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 text-2xl font-semibold">Identity verification</h2>
        <p className="text-sm text-muted-foreground">
          Upload a government-issued ID so we can verify it&apos;s really you. This is required for financial
          institutions to prevent fraud and comply with anti-money-laundering (AML) regulations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 transition-colors hover:border-primary">
          {idUploaded ? (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="font-medium text-green-600">ID Uploaded Successfully</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-16 w-16 text-muted-foreground" />
              <div className="text-center">
                <p className="mb-2 font-medium">Upload ID Document</p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: JPG, PNG, PDF (Max 5MB)
                </p>
              </div>
              <label htmlFor="id-upload">
                <input
                  id="id-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  className="cursor-pointer"
                  asChild
                >
                  <span>{uploading ? "Uploading..." : "Choose File"}</span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {uploading && (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={goBack} className="flex-1">
          Back
        </Button>
        <Button
          type="button"
          onClick={continueToNext}
          className="flex-1"
          disabled={!idUploaded}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

