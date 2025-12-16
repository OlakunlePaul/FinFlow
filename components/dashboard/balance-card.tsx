"use client"

import { useQuery } from "@tanstack/react-query"
import { useWalletStore } from "@/lib/store/wallet-store"
import { useUiStore } from "@/lib/store/ui-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Plus, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CountingNumber } from "@/components/ui/counting-number"
import { RippleButton } from "@/components/ui/ripple-button"
import { Spinner } from "@/components/ui/spinner"

async function fetchBalance() {
  const res = await fetch("/api/transactions")
  const data = await res.json()
  // Calculate balance from transactions
  const balance = data.transactions.reduce(
    (sum: number, txn: { amount: number }) => sum + txn.amount,
    0
  )
  return balance
}

export function BalanceCard({
  onAddMoney,
  onSendMoney,
}: {
  onAddMoney: () => void
  onSendMoney: () => void
}) {
  const { balance, setBalance } = useWalletStore()
  const { setConnectionIssue } = useUiStore()
  const [highlight, setHighlight] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  })

  useEffect(() => {
    if (data !== undefined) {
      setBalance(data)
    }
  }, [data, setBalance])

  useEffect(() => {
    if (error) {
      setConnectionIssue(true)
    }
  }, [error, setConnectionIssue])

  const displayBalance = balance || 0
  const prevBalanceRef = useRef<number | undefined>(undefined)
  const [showBadge, setShowBadge] = useState(false)

  // subtle highlight + inline badge when balance changes
  useEffect(() => {
    if (balance === undefined) return
    if (prevBalanceRef.current !== undefined && prevBalanceRef.current !== balance) {
      setHighlight(true)
      setShowBadge(true)
      const timeout = setTimeout(() => setHighlight(false), 200)
      const badgeTimeout = setTimeout(() => setShowBadge(false), 2200)
      return () => {
        clearTimeout(timeout)
        clearTimeout(badgeTimeout)
      }
    }
    prevBalanceRef.current = balance
  }, [balance])

  return (
    <Card className="border border-border-subtle bg-surface-raised shadow-md">
      <CardContent className="p-6 md:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-small font-medium text-text-muted">
              Total balance
            </p>
            {isLoading ? (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-9 w-32 animate-pulse rounded bg-surface-subtle" />
                <Spinner size="sm" />
              </div>
            ) : (
              <p
                className={`mt-1 text-3xl font-semibold tracking-tight text-text-strong transition-standard ease-standard ${
                  highlight ? "bg-primary-soft px-1 py-0.5 rounded" : ""
                }`}
              >
                <CountingNumber
                  value={displayBalance}
                  duration={1500}
                  decimals={2}
                  prefix="$"
                />
              </p>
            )}
          </div>
          {!isLoading && (
            <div className="rounded border border-border-subtle px-3 py-1 text-right">
              <p className="text-tiny text-text-muted">Available</p>
              <p className="text-small font-medium text-text-default">
                {formatCurrency(displayBalance)}
              </p>
            </div>
          )}
        </div>

        {showBadge && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-tiny font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span>Balance updated</span>
          </div>
        )}

        <div className="mb-6 rounded-lg border border-border-subtle bg-surface-base px-4 py-3">
          <p className="text-tiny font-medium text-text-muted">7‑day overview</p>
          <p className="mt-1 text-small text-text-default">
            Activity breakdown is available in the Transactions section.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <RippleButton
            rippleColor="rgba(255, 255, 255, 0.3)"
            onClick={onAddMoney}
            className="flex-1 gap-2 rounded-md bg-primary text-text-on-primary transition-fast ease-standard hover:bg-primary/90"
            size="lg"
            aria-label="Add money to wallet"
          >
            <Plus className="h-5 w-5" />
            Add Money
          </RippleButton>
          <RippleButton
            rippleColor="rgba(15, 23, 42, 0.1)"
            onClick={onSendMoney}
            variant="outline"
            className="flex-1 gap-2 rounded-md border border-border-subtle bg-surface-raised text-text-default transition-fast ease-standard hover:bg-surface-base"
            size="lg"
            aria-label="Send money"
          >
            <Send className="h-5 w-5" />
            Send Money
          </RippleButton>
        </div>

        <p className="mt-2 text-tiny text-text-muted">
          Add money to top up your main wallet, or send funds to another account.
        </p>
      </CardContent>
    </Card>
  )
}
