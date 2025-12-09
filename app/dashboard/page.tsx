"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { WalletDashboard } from "@/components/dashboard/wallet-dashboard"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <WalletDashboard />
    </ProtectedRoute>
  )
}

