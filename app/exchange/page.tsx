"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-surface-base pb-20 md:pb-10">
      <main className="container px-4 py-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-h1 text-text-strong">Exchange</h1>
            <p className="mt-1 text-body text-text-muted">
              Currency exchange is not wired in this demo yet. Use the wallets and transfers features to explore the
              product.
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="text-small">
              Back to dashboard
            </Button>
          </Link>
        </div>

        <Card className="border border-border-subtle bg-surface-raised shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-h3 text-text-strong">
              <ArrowLeftRight className="h-5 w-5 text-text-muted" />
              Exchange coming soon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-small text-text-muted">
            <p>
              In a production version of FinFlow, this screen would let you convert between supported currencies and
              move funds between your wallets.
            </p>
            <p>
              For this demo, focus on creating wallets, adding money, sending funds, and reviewing transactions — all
              of which are fully represented in the current UI.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}


