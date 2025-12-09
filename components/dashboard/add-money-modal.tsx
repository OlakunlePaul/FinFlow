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
import { CreditCard, Building2, Coins } from "lucide-react"

const fundSchema = z.object({
  amount: z.number().positive("Amount must be positive").max(50000, "Maximum amount is $50,000"),
  currency: z.enum(["USD", "EUR", "GBP"]).default("USD"),
  method: z.enum(["bank", "card", "crypto"]).default("bank"),
})

type FundForm = z.infer<typeof fundSchema>

export function AddMoneyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { addToBalance } = useWalletStore()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FundForm>({
    resolver: zodResolver(fundSchema),
  })

  const onSubmit = async (data: FundForm) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency,
          method: data.method,
          source: data.method === "bank" ? "Bank Transfer" : data.method === "card" ? "Credit Card" : "Crypto Wallet",
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to add money")
      }

      addToBalance(data.amount)
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["balance"] })

      toast({
        title: "Success!",
        description: `$${data.amount.toFixed(2)} added to your account`,
        variant: "success",
      })

      reset()
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add money",
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
          <DialogTitle>Add Money</DialogTitle>
          <DialogDescription>
            Add funds to your wallet from your bank account or card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <label htmlFor="currency" className="mb-2 block text-sm font-medium">
              Currency
            </label>
            <select
              id="currency"
              {...register("currency")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className="relative flex cursor-pointer flex-col items-center rounded-lg border-2 border-muted p-4 transition-all hover:border-primary has-[:checked]:border-primary">
                <input
                  type="radio"
                  value="bank"
                  {...register("method")}
                  className="sr-only"
                />
                <Building2 className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">Bank</span>
              </label>
              <label className="relative flex cursor-pointer flex-col items-center rounded-lg border-2 border-muted p-4 transition-all hover:border-primary has-[:checked]:border-primary">
                <input
                  type="radio"
                  value="card"
                  {...register("method")}
                  className="sr-only"
                />
                <CreditCard className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">Card</span>
              </label>
              <label className="relative flex cursor-pointer flex-col items-center rounded-lg border-2 border-muted p-4 transition-all hover:border-primary has-[:checked]:border-primary">
                <input
                  type="radio"
                  value="crypto"
                  {...register("method")}
                  className="sr-only"
                />
                <Coins className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">Crypto</span>
              </label>
            </div>
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
            <Button type="submit" disabled={isSubmitting} aria-label="Submit add money form">
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Add Money"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

