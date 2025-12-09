import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Mock cards database (same as in route.ts - in production, use a real database)
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

const updateCardSchema = z.object({
  isFrozen: z.boolean().optional(),
  nickname: z.string().optional(),
})

// PATCH - Update card (freeze/unfreeze, update nickname)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateCardSchema.parse(body)
    const cardId = params.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userCards = mockCards[session.user.id] || []
    const cardIndex = userCards.findIndex((c) => c.id === cardId)

    if (cardIndex === -1) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 })
    }

    // Update card
    if (validated.isFrozen !== undefined) {
      userCards[cardIndex].isFrozen = validated.isFrozen
    }

    return NextResponse.json({
      success: true,
      card: userCards[cardIndex],
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

// DELETE - Remove card
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cardId = params.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userCards = mockCards[session.user.id] || []
    const cardIndex = userCards.findIndex((c) => c.id === cardId)

    if (cardIndex === -1) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 })
    }

    // Remove card
    userCards.splice(cardIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Card deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

