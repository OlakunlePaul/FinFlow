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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
  })

  const onSubmit = async (data: TransferForm) => {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            Transfer funds to another user or account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="mb-2 block text-sm font-medium">
              Recipient
            </label>
            <Input
              id="recipient"
              type="text"
              placeholder="Email or Account Number"
              {...register("recipient")}
              className={errors.recipient ? "border-destructive" : ""}
            />
            {errors.recipient && (
              <p className="mt-1 text-sm text-destructive">{errors.recipient.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
              className={errors.amount ? "border-destructive" : ""}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description (Optional)
            </label>
            <Input
              id="description"
              type="text"
              placeholder="Payment for..."
              {...register("description")}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} aria-label="Submit send money form">
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

