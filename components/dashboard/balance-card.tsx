"use client"

import { useQuery } from "@tanstack/react-query"
import { useWalletStore } from "@/lib/store/wallet-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Plus, Send, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

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

// Count-up animation hook
function useCountUp(targetValue: number, duration = 1000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (targetValue === 0) {
      setCount(0)
      return
    }

    let startTime: number | null = null
    const startValue = count

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (targetValue - startValue) * easeOutQuart
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(targetValue)
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, duration])

  return count
}

export function BalanceCard({
  onAddMoney,
  onSendMoney,
}: {
  onAddMoney: () => void
  onSendMoney: () => void
}) {
  const { balance, setBalance } = useWalletStore()

  const { data, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: fetchBalance,
  })

  useEffect(() => {
    if (data !== undefined) {
      setBalance(data)
    }
  }, [data, setBalance])

  const displayBalance = balance || 0
  const animatedBalance = useCountUp(displayBalance, 1500)

  // Mock 7-day trend data
  const trendData = [1250, 1300, 1280, 1350, 1400, 1450, displayBalance]

  return (
    <Card className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 opacity-50" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <CardContent className="relative p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-2">Total Balance</p>
          {isLoading ? (
            <div className="mt-2 h-16 w-64 animate-pulse rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted" />
          ) : (
            <h2 className="mt-2 text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent transition-all duration-300">
              {formatCurrency(animatedBalance)}
            </h2>
          )}
        </div>

        {/* 7-Day Trend Graph */}
        <div className="mb-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/40 to-white/20 p-5 backdrop-blur-sm shadow-inner">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">7-Day Trend</span>
            <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="flex h-20 items-end justify-between gap-1.5">
            {trendData.map((value, index) => {
              const maxValue = Math.max(...trendData)
              const height = (value / maxValue) * 100
              return (
                <div
                  key={index}
                  className="group/bar flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-500 transition-all duration-300 hover:from-blue-500 hover:via-indigo-400 hover:to-purple-400 hover:scale-105"
                  style={{ height: `${height}%` }}
                  title={`Day ${index + 1}: ${formatCurrency(value)}`}
                >
                  <div className="h-full w-full rounded-t-lg bg-gradient-to-t from-blue-400/50 to-transparent opacity-0 transition-opacity group-hover/bar:opacity-100" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onAddMoney}
            className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Add Money
          </Button>
          <Button
            onClick={onSendMoney}
            variant="outline"
            className="flex-1 gap-2 border-2 bg-white/60 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/80 hover:shadow-lg"
            size="lg"
          >
            <Send className="h-5 w-5" />
            Send Money
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

