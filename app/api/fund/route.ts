import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const fundSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum(["USD", "EUR", "GBP"]).default("USD"),
  method: z.enum(["bank", "card", "crypto"]).default("bank"),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = fundSchema.parse(body)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (validated.amount > 50000) {
      return NextResponse.json(
        { error: "Funding amount exceeds limit" },
        { status: 400 }
      )
    }

    // Return success response with transaction details
    const methodNames = {
      bank: "Bank Transfer",
      card: "Credit Card",
      crypto: "Crypto Wallet",
    }
    
    return NextResponse.json({
      success: true,
      transaction: {
        id: `fund_${Date.now()}`,
        type: "fund",
        amount: validated.amount,
        currency: validated.currency,
        method: validated.method,
        source: validated.source || methodNames[validated.method],
        description: `Fund from ${validated.source || methodNames[validated.method]}`,
        date: new Date().toISOString(),
        status: "completed",
        category: "Deposit",
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

