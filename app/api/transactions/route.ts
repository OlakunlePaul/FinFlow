import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock transaction data - In production, use a real database
const mockTransactions = [
  {
    id: "1",
    type: "transfer",
    amount: -150.0,
    currency: "USD",
    description: "Payment to John Doe",
    date: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
    category: "Payment",
    recipient: "john.doe@example.com",
  },
  {
    id: "2",
    type: "fund",
    amount: 500.0,
    currency: "USD",
    description: "Bank Transfer",
    date: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
    category: "Deposit",
  },
  {
    id: "3",
    type: "transfer",
    amount: -75.5,
    currency: "USD",
    description: "Grocery Store",
    date: new Date(Date.now() - 259200000).toISOString(),
    status: "completed",
    category: "Shopping",
  },
  {
    id: "4",
    type: "fund",
    amount: 1000.0,
    currency: "USD",
    description: "Salary Deposit",
    date: new Date(Date.now() - 345600000).toISOString(),
    status: "completed",
    category: "Income",
  },
  {
    id: "5",
    type: "transfer",
    amount: -25.0,
    currency: "USD",
    description: "Coffee Shop",
    date: new Date(Date.now() - 432000000).toISOString(),
    status: "completed",
    category: "Food & Drink",
  },
  {
    id: "6",
    type: "transfer",
    amount: -200.0,
    currency: "USD",
    description: "Rent Payment",
    date: new Date(Date.now() - 518400000).toISOString(),
    status: "completed",
    category: "Housing",
  },
  {
    id: "7",
    type: "fund",
    amount: 250.0,
    currency: "USD",
    description: "Freelance Payment",
    date: new Date(Date.now() - 604800000).toISOString(),
    status: "completed",
    category: "Income",
  },
  {
    id: "8",
    type: "transfer",
    amount: -50.0,
    currency: "USD",
    description: "Utility Bill",
    date: new Date(Date.now() - 691200000).toISOString(),
    status: "pending",
    category: "Bills",
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const category = searchParams.get("category")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Filter transactions
    let filtered = [...mockTransactions]

    if (status) {
      filtered = filtered.filter((txn) => txn.status === status)
    }

    if (type) {
      filtered = filtered.filter((txn) => txn.type === type)
    }

    if (category) {
      filtered = filtered.filter((txn) => txn.category === category)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filtered.slice(startIndex, endIndex)

    return NextResponse.json({
      transactions: paginatedTransactions,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

