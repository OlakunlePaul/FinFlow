"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowDownCircle, ArrowUpCircle, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

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

export function TransactionsList() {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined)

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", page, statusFilter, typeFilter],
    queryFn: () => fetchTransactions(page, statusFilter, typeFilter),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const transactions = data?.transactions || []
  const totalPages = data?.totalPages || 1

  if (isLoading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-muted to-muted/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gradient-to-r from-muted to-muted/50" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gradient-to-r from-muted to-muted/50" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded bg-gradient-to-r from-muted to-muted/50" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load transactions</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-2xl transition-all hover:shadow-3xl">
      <CardHeader className="border-b border-white/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button
              variant={statusFilter === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(undefined)}
              className={statusFilter === undefined ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className={statusFilter === "completed" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
            >
              Completed
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className={statusFilter === "pending" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
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
            className={typeFilter === undefined ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
          >
            All Types
          </Button>
          <Button
            variant={typeFilter === "fund" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("fund")}
            className={typeFilter === "fund" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
          >
            Deposits
          </Button>
          <Button
            variant={typeFilter === "transfer" ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter("transfer")}
            className={typeFilter === "transfer" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
          >
            Transfers
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No transactions found</p>
              {(statusFilter || typeFilter) && (
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => {
                    setStatusFilter(undefined)
                    setTypeFilter(undefined)
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {transactions.map((txn: any) => (
                <div
                  key={txn.id}
                  className="group flex items-center gap-4 rounded-xl border border-white/20 bg-white/40 p-4 backdrop-blur-sm transition-all hover:bg-white/60 hover:shadow-lg hover:scale-[1.01]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110 ${
                      txn.amount > 0
                        ? "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 shadow-sm"
                        : "bg-gradient-to-br from-red-100 to-rose-100 text-red-700 shadow-sm"
                    }`}
                  >
                    {txn.amount > 0 ? (
                      <ArrowDownCircle className="h-6 w-6" />
                    ) : (
                      <ArrowUpCircle className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{txn.description}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(txn.date)}</span>
                      {txn.category && (
                        <>
                          <span>•</span>
                          <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                            {txn.category}
                          </span>
                        </>
                      )}
                      {txn.status && (
                        <>
                          <span>•</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              txn.status === "completed"
                                ? "bg-green-50 text-green-700"
                                : txn.status === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      txn.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.amount > 0 ? "+" : ""}
                    {formatCurrency(Math.abs(txn.amount))}
                  </div>
                </div>
              ))}
              
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
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

