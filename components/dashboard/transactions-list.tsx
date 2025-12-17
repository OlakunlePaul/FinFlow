"use client"

import { motion, Variants } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Meteors } from "@/components/ui/meteors"
import { formatCurrency, formatDate } from "@/lib/utils"
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useUiStore } from "@/lib/store/ui-store"
import { springPresets } from "@/lib/hooks/use-motion-config"

async function fetchTransactions(page = 1, status?: string, type?: string, category?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  })
  if (status) params.append("status", status)
  if (type) params.append("type", type)
  if (category) params.append("category", category)
  
  const res = await fetch(`/api/transactions?${params.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch")
  const data = await res.json()
  return data
}

export function TransactionsList({ onAddMoney }: { onAddMoney?: () => void } = {}) {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined)
  const { setConnectionIssue } = useUiStore()

  const { data, isLoading, error, dataUpdatedAt, isFetching } = useQuery({
    queryKey: ["transactions", page, statusFilter, typeFilter],
    queryFn: () => fetchTransactions(page, statusFilter, typeFilter),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 60_000,
  })

  const transactions = data?.transactions || []
  const totalPages = data?.totalPages || 1

  useEffect(() => {
    if (error) {
      setConnectionIssue(true)
    } else if (data && !isLoading) {
      // Reset connection issue when query succeeds
      setConnectionIssue(false)
    }
  }, [error, data, isLoading, setConnectionIssue])

  if (!data && isLoading) {
    return (
      <Card className="border border-border-subtle bg-surface-raised shadow-card-elevated">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-border-subtle bg-surface-raised shadow-md">
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <CardTitle className="text-h3 text-text-strong">
              Recent transactions
            </CardTitle>
            {dataUpdatedAt ? (
              <p className="text-tiny text-text-muted">
                Updated{" "}
                {isFetching ? "just now" : "a few moments ago"}
              </p>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load transactions</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        ...springPresets.gentle,
        delay: 0.3,
      }}
    >
      <Card className="border border-border-subtle bg-surface-raised shadow-md">
      <CardHeader className="border-b border-border-subtle pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-h2 font-semibold">
              Recent transactions
            </CardTitle>
            {dataUpdatedAt && (
              <p className="mt-1.5 text-tiny text-text-muted">
                Updated {isFetching ? "just now" : "a few moments ago"}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-text-muted" aria-hidden="true" />
            <Button
              variant={statusFilter === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(undefined)}
              className={statusFilter === undefined ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show all transaction statuses"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className={statusFilter === "completed" ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show completed transactions"
            >
              Completed
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className={statusFilter === "pending" ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show pending transactions"
            >
              Pending
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            variant={typeFilter === undefined ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter(undefined)}
              className={typeFilter === undefined ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show all transaction types"
          >
            All Types
          </Button>
          <Button
            variant={typeFilter === "fund" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("fund")}
              className={typeFilter === "fund" ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show deposit transactions"
          >
            Deposits
          </Button>
          <Button
            variant={typeFilter === "transfer" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("transfer")}
              className={typeFilter === "transfer" ? "bg-primary text-text-on-primary" : ""}
              aria-label="Show transfer transactions"
          >
            Transfers
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          {transactions.length === 0 ? (
            <div className="relative flex flex-col items-center gap-3 py-10 text-center overflow-hidden rounded-lg">
              <Meteors number={10} className="opacity-30" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-surface-base text-primary">
                <Wallet className="h-6 w-6 animate-pulse-gentle" aria-hidden="true" />
              </div>
              <div className="relative z-10">
                <p className="text-small font-medium text-text-strong">
                  No transactions yet
                </p>
                <p className="mt-1 text-tiny text-text-muted">
                  When you add or send money, your activity will appear here.
                </p>
              </div>
              <div className="relative z-10 mt-2 flex flex-col gap-2">
                {onAddMoney && (
                  <Button
                    size="sm"
                    className="rounded-md bg-primary px-4 text-text-on-primary hover:bg-primary/90"
                    onClick={onAddMoney}
                    aria-label="Add money to get started"
                  >
                    Add money to get started
                  </Button>
                )}
                {(statusFilter || typeFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-tiny text-text-muted"
                    aria-label="Clear transaction filters"
                    onClick={() => {
                      setStatusFilter(undefined)
                      setTypeFilter(undefined)
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {transactions.map((txn: any) => {
                const itemVariants: Variants = {
                  hidden: {
                    opacity: 0,
                    y: 10,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      ...springPresets.gentle,
                    },
                  },
                }

                return (
                  <motion.div
                    key={txn.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="group flex items-center gap-4 rounded-xl border border-border-subtle bg-surface-base px-5 py-4 transition-all duration-200 hover:border-border-strong hover:bg-surface-raised hover:shadow-sm"
                  >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm transition-all duration-200 ${
                      txn.amount > 0
                        ? "border-success/30 bg-success-soft/50 text-success group-hover:border-success/50 group-hover:bg-success-soft"
                        : "border-danger/30 bg-danger-soft/50 text-danger group-hover:border-danger/50 group-hover:bg-danger-soft"
                    }`}
                  >
                    {txn.amount > 0 ? (
                      <ArrowDownCircle className="h-5 w-5" />
                    ) : (
                      <ArrowUpCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-strong">
                      {txn.description}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                      <span>{formatDate(txn.date)}</span>
                      {txn.category && (
                        <span className="rounded-md bg-surface-raised px-2 py-0.5 text-[11px] font-medium text-text-default">
                          {txn.category}
                        </span>
                      )}
                      {txn.status && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                            txn.status === "completed"
                              ? "bg-success-soft/60 text-success border border-success/20"
                              : txn.status === "pending"
                              ? "bg-warning-soft/60 text-warning border border-warning/20"
                              : "bg-danger-soft/60 text-danger border border-danger/20"
                          }`}
                          aria-label={`Status: ${txn.status}`}
                        >
                          {txn.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold tracking-tight tabular-nums ${
                        txn.amount > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {txn.amount > 0 ? "+" : ""}
                      {formatCurrency(Math.abs(txn.amount))}
                    </div>
                  </div>
                  </motion.div>
                )
              })}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-white/20 pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm font-medium text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="border-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  )
}

