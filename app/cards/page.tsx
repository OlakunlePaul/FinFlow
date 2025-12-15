"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-gray-lightest">
      <div className="container px-4 py-8">
        <Card className="border border-gray-lighter bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-h2 text-dark-blue">
              Virtual cards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-body text-gray">
            <p>
              This is a placeholder page for managing your virtual cards in the
              FinFlow demo.
            </p>
            <p>
              Use the dashboard to interact with the primary virtual card
              component, or return to{" "}
              <Link
                href="/dashboard"
                className="font-medium text-light-blue hover:underline"
              >
                your dashboard
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


