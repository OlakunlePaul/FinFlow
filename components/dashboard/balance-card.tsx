"use client"

import { useQuery } from "@tanstack/react-query"
import { useWalletStore } from "@/lib/store/wallet-store"
import { useUiStore } from "@/lib/store/ui-store"
import { CardContent } from "@/components/ui/card"
import { CardWithEffects } from "@/components/ui/card-with-effects"
import { formatCurrency } from "@/lib/utils"
import { Plus, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { motion } from "framer-motion"
import { springPresets } from "@/lib/hooks/use-motion-config"

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
      const timeout = setTimeout(() => setHighlight(false), 300)
      const badgeTimeout = setTimeout(() => setShowBadge(false), 2500)
      return () => {
        clearTimeout(timeout)
        clearTimeout(badgeTimeout)
      }
    }
    prevBalanceRef.current = balance
  }, [balance])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        ...springPresets.gentle,
        delay: 0,
      }}
    >
      <CardWithEffects className="relative overflow-hidden border-0 bg-gradient-to-br from-surface-raised via-surface-raised to-surface-base shadow-xl">
        {/* Subtle gradient glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,78,216,0.08),transparent_50%)] pointer-events-none" />
        
        <CardContent className="relative p-8 md:p-10">
          {/* Balance Display */}
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Total Balance
            </p>
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="h-16 w-64 animate-pulse rounded-lg bg-surface-subtle" />
                <Spinner size="sm" />
              </div>
            ) : (
              <motion.div
                animate={highlight ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-5xl md:text-6xl font-bold tracking-tight text-text-strong tabular-nums">
                  <NumberTicker
                    value={displayBalance}
                    duration={1500}
                    decimals={2}
                  />
                </p>
              </motion.div>
            )}
          </div>

          {/* Balance updated badge */}
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-success-soft/90 px-4 py-2 text-xs font-medium text-success backdrop-blur-sm border border-success/20"
            >
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
              <span>Balance updated</span>
            </motion.div>
          )}

          {/* Primary Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex-1"
            >
              <Button
                onClick={onAddMoney}
                className="w-full h-12 gap-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-base font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-primary/90 hover:to-accent/90 active:scale-[0.98] border-0"
                size="lg"
                aria-label="Add money to wallet"
              >
                <Plus className="h-5 w-5" />
                Add Money
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex-1"
            >
              <Button
                onClick={onSendMoney}
                variant="outline"
                className="w-full h-12 gap-2.5 rounded-lg border-2 border-border-subtle bg-surface-raised text-base font-semibold text-text-strong transition-all duration-200 hover:bg-surface-base hover:border-primary/30 active:scale-[0.98]"
                size="lg"
                aria-label="Send money"
              >
                <Send className="h-5 w-5" />
                Send Money
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </CardWithEffects>
    </motion.div>
  )
}
