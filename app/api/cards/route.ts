import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Mock cards database - In production, use a real database
const mockCards: Record<string, Array<{
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isFrozen: boolean
  createdAt: string
}>> = {
  "1": [
    {
      id: "card_1",
      last4: "3456",
      brand: "VISA",
      expiryMonth: 12,
      expiryYear: 2025,
      isFrozen: false,
      createdAt: new Date().toISOString(),
    },
  ],
}

const createCardSchema = z.object({
  nickname: z.string().optional(),
})

const updateCardSchema = z.object({
  isFrozen: z.boolean().optional(),
  nickname: z.string().optional(),
})

// GET - List all cards for the user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const userCards = mockCards[session.user.id] || []

    return NextResponse.json({
      cards: userCards,
      total: userCards.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST - Create a new virtual card
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = createCardSchema.parse(body)

    // Simulate API delay (card tokenization)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock card number
    const last4 = Math.floor(1000 + Math.random() * 9000).toString()
    const newCard = {
      id: `card_${Date.now()}`,
      last4,
      brand: "VISA",
      expiryMonth: 12,
      expiryYear: 2025,
      isFrozen: false,
      createdAt: new Date().toISOString(),
      nickname: validated.nickname,
    }

    // Add to mock database
    if (!mockCards[session.user.id]) {
      mockCards[session.user.id] = []
    }
    mockCards[session.user.id].push(newCard)

    return NextResponse.json({
      success: true,
      card: newCard,
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

