interface ExportParams {
  search?: string
}

// Lightweight CSV export utility for the demo.
// Uses the existing /api/transactions route and triggers a client-side download.
export async function exportTransactionsCsv(params: ExportParams = {}) {
  const searchParams = new URLSearchParams({
    page: "1",
    limit: "100",
  })

  if (params.search) {
    searchParams.append("search", params.search)
  }

  const res = await fetch(`/api/transactions?${searchParams.toString()}`)
  if (!res.ok) {
    console.error("Failed to fetch transactions for export")
    return
  }

  const data = await res.json()
  const transactions = data.transactions ?? []

  const header = [
    "ID",
    "Date",
    "Description",
    "Category",
    "Amount",
    "Type",
    "Status",
  ]

  const rows = transactions.map((txn: any) => [
    stringifyCell(txn.id),
    stringifyCell(txn.date),
    stringifyCell(txn.description),
    stringifyCell(txn.category ?? ""),
    stringifyCell(txn.amount),
    stringifyCell(txn.type),
    stringifyCell(txn.status),
  ])

  const csvContent = [header, ...rows].map((r) => r.join(",")).join("\r\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute(
    "download",
    `finflow-transactions-${new Date().toISOString().slice(0, 10)}.csv`
  )
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function stringifyCell(value: unknown): string {
  if (value === null || value === undefined) return ""
  const str = String(value)
  // Escape quotes and wrap cell in quotes so commas are safe.
  const escaped = str.replace(/"/g, '""')
  return `"${escaped}"`
}


