"use client"

import { useState } from "react"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { format } from "date-fns"
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  Receipt,
  Search,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { exportTransactionsCsv } from "@/lib/transactions/export-csv"

interface Transaction {
  id: string
  date: string
  description: string
  category?: string
  amount: number
  type: "fund" | "transfer"
  status: "completed" | "pending" | "failed"
}

async function fetchTransactions(params: {
  page: number
  search: string
}) {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    limit: "10",
  })
  if (params.search) {
    searchParams.append("search", params.search)
  }

  const res = await fetch(`/api/transactions?${searchParams.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export default function TransactionsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions-page", page, search],
    queryFn: () => fetchTransactions({ page, search }),
    placeholderData: keepPreviousData,
  })

  const transactions: Transaction[] = data?.transactions ?? []
  const totalPages: number = data?.totalPages ?? 1
  const totalCount: number = data?.total ?? transactions.length

  const handleExport = async () => {
    await exportTransactionsCsv({ search })
  }

  return (
    <div className="min-h-screen bg-gray-lightest pb-20 md:pb-8">
      <main className="container px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-h1 text-dark-blue">Transaction history</h1>
            <p className="mt-1 text-body text-gray">
              Search, filter, and export all your activity.
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-2 rounded-lg border-gray-lighter px-4 py-2 text-small text-dark-blue hover:bg-gray-lightest"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>

        {/* Search & filters card */}
        <Card className="mb-5 border border-gray-lighter bg-white">
          <CardContent className="pt-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-light" />
                <input
                  type="search"
                  placeholder="Search by name, amount, or reference..."
                  value={search}
                  onChange={(e) => {
                    setPage(1)
                    setSearch(e.target.value)
                  }}
                  className="h-10 w-full rounded-lg border border-gray-lighter bg-white pl-9 pr-3 text-small text-dark-gray placeholder:text-gray-light focus:border-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue/20"
                />
              </div>

              {/* Filter toggle */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex items-center justify-center gap-2 rounded-lg border-gray-lighter px-3 py-2 text-small text-dark-blue hover:bg-gray-lightest"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Collapsible filters (simplified for demo) */}
            {showFilters && (
              <div className="mt-4 border-t border-gray-lighter pt-4 text-tiny text-gray">
                <p>
                  Additional filters (date range, status, amount) can be wired here
                  for a real backend. This demo keeps them minimal.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transactions table / list */}
        <Card className="border border-gray-lighter bg-white">
          <CardHeader className="border-b border-gray-lighter">
            <CardTitle className="text-h3 text-dark-blue">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-gray-lightest bg-gray-lightest/60 p-3"
                  >
                    <div className="h-9 w-9 animate-pulse rounded-full bg-gray-lighter" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 animate-pulse rounded bg-gray-lighter" />
                      <div className="h-3 w-20 animate-pulse rounded bg-gray-lighter" />
                    </div>
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-lighter" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-6 text-body text-crimson-red">
                Failed to load transactions. Please try again.
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Receipt className="h-12 w-12 text-gray-light" />
                <p className="text-body text-dark-gray">
                  No transactions found
                </p>
                {search && (
                  <p className="text-small text-gray">
                    Try clearing your search or adjusting filters.
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block">
                  <table className="w-full text-left text-small text-dark-gray">
                    <thead className="bg-gray-lightest text-tiny uppercase tracking-wide text-gray">
                      <tr>
                        <th className="px-4 py-3">
                          <button className="inline-flex items-center gap-1">
                            Date
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3 text-right">
                          <button className="inline-flex items-center gap-1">
                            Amount
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr
                          key={txn.id}
                          className="border-t border-gray-lightest hover:bg-gray-lightest/60"
                        >
                          <td className="px-4 py-3 align-top text-gray">
                            <div>{format(new Date(txn.date), "MMM d, yyyy")}</div>
                            <div className="text-tiny text-gray-light">
                              {format(new Date(txn.date), "h:mm a")}
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="font-medium text-dark-gray">
                              {txn.description}
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            {txn.category && (
                              <span className="inline-flex rounded-full bg-gray-lightest px-2 py-0.5 text-tiny text-gray">
                                {txn.category}
                              </span>
                            )}
                          </td>
                          <td
                            className={`px-4 py-3 align-top text-right font-semibold ${
                              txn.amount >= 0 ? "text-emerald-green" : "text-crimson-red"
                            }`}
                          >
                            {txn.amount >= 0 ? "+" : "-"}$
                            {Math.abs(txn.amount).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 align-top text-center">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-tiny font-medium ${
                                txn.status === "completed"
                                  ? "bg-emerald-green/10 text-emerald-green"
                                  : txn.status === "pending"
                                  ? "bg-gold/15 text-gold"
                                  : "bg-crimson-red/10 text-crimson-red"
                              }`}
                            >
                              {txn.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-right">
                            <button className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-lightest">
                              <MoreVertical className="h-4 w-4 text-gray" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile list view */}
                <div className="space-y-3 p-4 md:hidden">
                  {transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between rounded-lg border border-gray-lightest bg-white px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light-blue-pale text-light-blue-dark">
                          <ArrowLeftRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-small font-medium text-dark-gray">
                            {txn.description}
                          </p>
                          <p className="text-tiny text-gray-light">
                            {format(new Date(txn.date), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-small font-semibold">
                        <p
                          className={
                            txn.amount >= 0 ? "text-emerald-green" : "text-crimson-red"
                          }
                        >
                          {txn.amount >= 0 ? "+" : "-"}$
                          {Math.abs(txn.amount).toFixed(2)}
                        </p>
                        <p className="text-tiny text-gray-light">{txn.status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination footer */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-lightest px-4 py-3 text-tiny text-gray sm:flex-row">
                  <p>
                    Showing page {page} of {totalPages} • {totalCount} transactions
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="h-8 w-8 rounded-lg border-gray-lighter"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="h-8 w-8 rounded-lg border-gray-lighter"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}


