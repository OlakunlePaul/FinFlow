"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { LogsViewer } from "@/components/logs/logs-viewer"

export default function LogsPage() {
  return (
    <ProtectedRoute>
      <LogsViewer />
    </ProtectedRoute>
  )
}

