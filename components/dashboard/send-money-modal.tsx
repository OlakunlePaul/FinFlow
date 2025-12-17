"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SlideToSubmit } from "@/components/ui/slide-to-submit"
import { SuccessModal } from "@/components/ui/success-modal"
import { useWalletStore } from "@/lib/store/wallet-store"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect, useRef } from "react"
import { sanitizeInput } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

const transferSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  recipient: z.string().min(1, "Recipient is required"),
  description: z.string().optional(),
})

type TransferForm = z.infer<typeof transferSchema>

export function SendMoneyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { balance, subtractFromBalance } = useWalletStore()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"form" | "review">("form")
  const [reviewData, setReviewData] = useState<TransferForm | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState<{ amount: number; recipient: string } | null>(null)
  const successModalTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const successModalCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isShowingSuccessModalRef = useRef(false) // Track if we're in the process of showing success modal

  // Reset success state when the main modal closes
  useEffect(() => {
    if (!open) {
      // Always clear timeouts to prevent memory leaks and stale updates
      if (successModalTimeoutRef.current) {
        clearTimeout(successModalTimeoutRef.current)
        successModalTimeoutRef.current = null
      }
      if (successModalCloseTimeoutRef.current) {
        clearTimeout(successModalCloseTimeoutRef.current)
        successModalCloseTimeoutRef.current = null
      }
      // Only reset success state if we're not showing the success modal
      if (!isShowingSuccessModalRef.current) {
        setShowSuccessModal(false)
        setSuccessData(null)
      }
      setStep("form")
      setReviewData(null)
    }
  }, [open])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (successModalTimeoutRef.current) {
        clearTimeout(successModalTimeoutRef.current)
        successModalTimeoutRef.current = null
      }
      if (successModalCloseTimeoutRef.current) {
        clearTimeout(successModalCloseTimeoutRef.current)
        successModalCloseTimeoutRef.current = null
      }
      // Reset flag on unmount
      isShowingSuccessModalRef.current = false
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
  })

  const handleFormSubmit = (data: TransferForm) => {
    if (data.amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this transfer",
        variant: "destructive",
      })
      return
    }
    setReviewData(data)
    setStep("review")
  }

  const executeTransfer = async (data: TransferForm) => {
    setIsSubmitting(true)
    try {
      // Check balance before making the API call
      if (data.amount > balance) {
        const error = new Error("Insufficient Balance")
        toast({
          title: "Insufficient Balance",
          description: "You don't have enough funds for this transfer",
          variant: "destructive",
        })
        throw error
      }

      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: data.amount,
          recipient: sanitizeInput(data.recipient),
          description: data.description ? sanitizeInput(data.description) : undefined,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to send money")
      }

      subtractFromBalance(data.amount)
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["balance"] })

      // Set flag to indicate we're about to show success modal
      isShowingSuccessModalRef.current = true

      // Close the main modal first, then show success modal
      reset()
      onOpenChange(false)
      setStep("form")
      setReviewData(null)

      // Clear any existing timeout before setting a new one
      if (successModalTimeoutRef.current) {
        clearTimeout(successModalTimeoutRef.current)
      }

      // Show success modal after a brief delay to ensure parent modal is closed
      successModalTimeoutRef.current = setTimeout(() => {
        setSuccessData({ amount: data.amount, recipient: data.recipient })
        setShowSuccessModal(true)
        successModalTimeoutRef.current = null
        // Reset flag after timeout fires
        isShowingSuccessModalRef.current = false
      }, 100)
    } catch (error: any) {
      // Reset flag on error
      isShowingSuccessModalRef.current = false
      // Clear timeout if it was set
      if (successModalTimeoutRef.current) {
        clearTimeout(successModalTimeoutRef.current)
        successModalTimeoutRef.current = null
      }
      // Skip showing toast for balance validation errors since we already showed it
      if (error.message !== "Insufficient Balance") {
        toast({
          title: "Error",
          description: error.message || "Failed to send money",
          variant: "destructive",
        })
      }
      // Re-throw error so SlideToSubmit can catch it and reset
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h3 text-dark-blue">Send Money</DialogTitle>
          <DialogDescription className="text-small text-gray">
            {step === "form"
              ? "Enter recipient and amount details."
              : "Review and confirm your transfer."}
          </DialogDescription>
        </DialogHeader>

        {step === "form" && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4 py-2"
          >
            <div>
              <label className="mb-2 block text-small font-medium text-dark-gray">
                Recipient
              </label>
              <Input
                type="text"
                placeholder="Email or account number"
                {...register("recipient")}
                className={`h-10 rounded-lg border-2 bg-white text-small ${
                  errors.recipient ? "border-crimson-red" : "border-gray-lighter focus:border-light-blue"
                }`}
              />
              {errors.recipient && (
                <p className="mt-1 text-small text-crimson-red">
                  {errors.recipient.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-small font-medium text-dark-gray">
                Amount
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray">
                  $
                </span>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", { valueAsNumber: true })}
                  className={`h-11 rounded-lg border-2 bg-white pl-7 text-small ${
                    errors.amount ? "border-crimson-red" : "border-gray-lighter focus:border-light-blue"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-small text-crimson-red">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-small font-medium text-dark-gray">
                Note (optional)
              </label>
              <Input
                type="text"
                placeholder="Add a note for the recipient"
                {...register("description")}
                className="h-10 rounded-lg border-2 border-gray-lighter bg-white text-small focus:border-light-blue"
              />
            </div>

            <DialogFooter className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="w-full rounded-lg border-gray-lighter sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-dark-blue to-dark-blue-light text-white sm:w-auto"
              >
                Continue
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === "review" && reviewData && (
          <div className="space-y-5 py-2 text-small text-dark-gray">
            <div className="rounded-lg bg-gray-lightest px-4 py-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray">To</span>
                <span className="font-medium">{reviewData.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">Amount</span>
                <span className="font-semibold">
                  ${reviewData.amount.toFixed(2)}
                </span>
              </div>
              {reviewData.description && (
                <div className="pt-1 border-t border-gray-lighter mt-1">
                  <span className="text-gray">Note</span>
                  <p className="mt-1 text-small">{reviewData.description}</p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-gold-light/15 px-3 py-3 text-tiny text-dark-gray">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-gold-dark" />
              <p>
                Please confirm the recipient and amount. Transfers may not be
                reversible once sent.
              </p>
            </div>

            <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("form")}
                disabled={isSubmitting}
                className="w-full rounded-lg border-gray-lighter sm:w-auto"
              >
                Back
              </Button>
              <SlideToSubmit
                onSubmit={() => reviewData && executeTransfer(reviewData)}
                disabled={isSubmitting}
                label="Slide to send money"
                completedLabel="Sending..."
              />
            </DialogFooter>
          </div>
        )}
      </DialogContent>
      </Dialog>

      {/* Success Modal - rendered outside Dialog to persist after parent closes */}
      {successData && (
        <SuccessModal
          open={showSuccessModal}
          onOpenChange={(isOpen) => {
            setShowSuccessModal(isOpen)
            // Reset success data and flag when the success modal closes
            // Delay unmounting to allow Dialog close animation to complete (300ms)
            if (!isOpen) {
              // Clear any existing close timeout
              if (successModalCloseTimeoutRef.current) {
                clearTimeout(successModalCloseTimeoutRef.current)
              }
              // Wait for Dialog animation to complete before unmounting
              successModalCloseTimeoutRef.current = setTimeout(() => {
                setSuccessData(null)
                isShowingSuccessModalRef.current = false
                successModalCloseTimeoutRef.current = null
              }, 300) // Match Dialog's duration-300 animation
            }
          }}
          title="Transaction Successful!"
          description="Your money has been sent successfully."
          amount={successData.amount}
          recipient={successData.recipient}
        />
      )}
    </>
  )
}
