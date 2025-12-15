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
import { useWalletStore } from "@/lib/store/wallet-store"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
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
    if (data.amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this transfer",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
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

      toast({
        title: "Success!",
        description: `$${data.amount.toFixed(2)} sent to ${data.recipient}`,
        variant: "success",
      })

      reset()
      onOpenChange(false)
      setStep("form")
      setReviewData(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send money",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => reviewData && executeTransfer(reviewData)}
                className="w-full rounded-lg bg-gradient-to-r from-dark-blue to-dark-blue-light text-white sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  "Send Money"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

