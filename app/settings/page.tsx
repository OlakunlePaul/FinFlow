"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-lightest">
      <div className="container px-4 py-8">
        <Card className="border border-gray-lighter bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-h2 text-dark-blue">
              Settings (demo)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-body text-gray">
            <p>
              This is a placeholder settings page for the FinFlow demo
              experience. In a production app this would include profile,
              security, and preferences.
            </p>
            <p>
              For now, you can continue exploring the{" "}
              <Link
                href="/dashboard"
                className="font-medium text-light-blue hover:underline"
              >
                dashboard
              </Link>{" "}
              and transactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


