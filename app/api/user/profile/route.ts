import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import { sanitizeInput } from "@/lib/utils"

// Mock user profiles - In production, use a real database
const mockProfiles: Record<string, {
  id: string
  email: string
  name: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: string
  updatedAt: string
}> = {
  "1": {
    id: "1",
    email: "demo@finflow.com",
    name: "Demo User",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
})

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const profile = mockProfiles[session.user.id] || {
      id: session.user.id,
      email: session.user.email || "",
      name: session.user.name || "User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PATCH - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateProfileSchema.parse(body)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get or create profile
    let profile = mockProfiles[session.user.id]
    if (!profile) {
      profile = {
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.name || "User",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockProfiles[session.user.id] = profile
    }

    // Update fields
    if (validated.name) {
      profile.name = sanitizeInput(validated.name)
    }
    if (validated.phone) {
      profile.phone = sanitizeInput(validated.phone)
    }
    if (validated.address) {
      profile.address = {
        ...profile.address,
        ...Object.fromEntries(
          Object.entries(validated.address).map(([key, value]) => [
            key,
            value ? sanitizeInput(value) : value,
          ])
        ),
      } as typeof profile.address
    }

    profile.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      profile,
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

