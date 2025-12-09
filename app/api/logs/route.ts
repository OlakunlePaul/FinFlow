import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock Sentry error logs
const mockLogs = [
  {
    id: "1",
    level: "error",
    message: "Failed to process payment transaction",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "user@example.com",
    context: {
      transactionId: "txn_12345",
      amount: 150.0,
    },
    stack: "Error: Payment gateway timeout\n  at processPayment (payment.js:45)",
  },
  {
    id: "2",
    level: "warning",
    message: "Slow API response detected",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "user@example.com",
    context: {
      endpoint: "/api/transactions",
      responseTime: 3500,
    },
  },
  {
    id: "3",
    level: "error",
    message: "Database connection failed",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    user: null,
    context: {
      database: "primary",
      retryCount: 3,
    },
    stack: "Error: Connection timeout\n  at connect (db.js:12)",
  },
  {
    id: "4",
    level: "info",
    message: "User login successful",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    user: "user@example.com",
    context: {
      ip: "192.168.1.1",
      userAgent: "Mozilla/5.0...",
    },
  },
  {
    id: "5",
    level: "error",
    message: "Invalid authentication token",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    user: null,
    context: {
      token: "expired_token_xyz",
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { searchParams } = new URL(request.url)
    const level = searchParams.get("level")
    const filteredLogs = level
      ? mockLogs.filter((log) => log.level === level)
      : mockLogs

    return NextResponse.json({
      logs: filteredLogs,
      total: filteredLogs.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

