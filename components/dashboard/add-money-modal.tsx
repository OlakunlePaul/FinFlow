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
    watch,
    setValue,
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

  const watchedAmount = watch("amount")
  const watchedMethod = watch("method")

  const parsedAmount = Number.isFinite(watchedAmount) ? watchedAmount : 0
  const cardFee =
    watchedMethod === "card" && parsedAmount > 0 ? parsedAmount * 0.025 : 0
  const total = parsedAmount + cardFee

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h3 text-dark-blue">Add Money</DialogTitle>
          <DialogDescription className="text-small text-gray">
            Choose how much you want to add and your preferred funding method.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
          {/* Amount */}
          <div>
            <label className="mb-2 block text-small font-medium text-dark-gray">
              Amount
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray">
                $
              </span>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount", { valueAsNumber: true })}
                className={`h-12 rounded-lg border-2 bg-white pl-9 pr-20 text-center text-body-lg font-semibold ${
                  errors.amount ? "border-crimson-red" : "border-gray-lighter focus:border-light-blue"
                }`}
              />
              <select
                {...register("currency")}
                className="absolute right-3 top-1/2 h-8 -translate-y-1/2 rounded-md border border-gray-lighter bg-gray-lightest px-2 text-tiny font-medium text-dark-blue focus:outline-none"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            {errors.amount && (
              <p className="mt-1 text-small text-crimson-red">
                {errors.amount.message}
              </p>
            )}

            {/* Quick amounts */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[50, 100, 250, 500].map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => {
                    setValue("amount", a, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                  className="rounded-lg border border-gray-lighter bg-white px-2 py-1 text-tiny font-medium text-dark-blue hover:border-light-blue hover:bg-light-blue-pale/30"
                >
                  ${a}
                </button>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div>
            <label className="mb-3 block text-small font-medium text-dark-gray">
              Payment Method
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "bank",
                  label: "Bank transfer",
                  sub: "Free • 1–2 business days",
                  Icon: Building2,
                },
                {
                  id: "card",
                  label: "Debit / credit card",
                  sub: "Instant • 2.5% fee",
                  Icon: CreditCard,
                },
                {
                  id: "crypto",
                  label: "Cryptocurrency",
                  sub: "Fast • Network fees apply",
                  Icon: Coins,
                },
              ].map(({ id, label, sub, Icon }) => {
                const selected = watchedMethod === id
                return (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-3 text-left transition-colors ${
                      selected
                        ? "border-light-blue bg-light-blue-pale/30"
                        : "border-gray-lighter hover:border-gray"
                    }`}
                  >
                    <input
                      type="radio"
                      value={id}
                      {...register("method")}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-md ${
                        selected
                          ? "bg-light-blue text-white"
                          : "bg-gray-lightest text-gray"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-small font-medium text-dark-gray">
                        {label}
                      </p>
                      <p className="text-tiny text-gray">{sub}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Fee breakdown */}
          {parsedAmount > 0 && (
            <div className="rounded-lg bg-gray-lightest px-4 py-3 text-tiny text-dark-gray">
              <div className="flex justify-between">
                <span>Amount</span>
                <span>${parsedAmount.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Fee</span>
                <span>
                  {cardFee > 0 ? `$${cardFee.toFixed(2)}` : "$0.00"}
                </span>
              </div>
              <div className="mt-2 border-t border-gray-lighter pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
              aria-label="Submit add money form"
              className="w-full rounded-lg bg-gradient-to-r from-dark-blue to-dark-blue-light text-white sm:w-auto"
            >
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

