import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import { sanitizeInput } from "@/lib/utils"

const transferSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  recipient: z.string().min(1, "Recipient is required"),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = transferSchema.parse(body)

    // Sanitize inputs
    const recipient = sanitizeInput(validated.recipient)
    const description = validated.description
      ? sanitizeInput(validated.description)
      : undefined

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation - check if amount is reasonable
    if (validated.amount > 10000) {
      return NextResponse.json(
        { error: "Transfer amount exceeds limit" },
        { status: 400 }
      )
    }

    // Return success response with transaction details
    return NextResponse.json({
      success: true,
      transaction: {
        id: `txn_${Date.now()}`,
        type: "transfer",
        amount: -validated.amount,
        recipient,
        description: description || "Transfer",
        date: new Date().toISOString(),
        status: "completed",
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

