"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { AlertCircle, Info, AlertTriangle, XCircle, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

async function fetchLogs(level?: string) {
  const url = level ? `/api/logs?level=${level}` : "/api/logs"
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  const data = await res.json()
  return data.logs
}

const levelIcons = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const levelColors = {
  error: "text-red-600 bg-red-50 border-red-200",
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
}

export function LogsViewer() {
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ["logs", filter],
    queryFn: () => fetchLogs(filter),
    refetchInterval: 10000, // Refetch every 10 seconds
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded bg-muted" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">Failed to load logs</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Error Logs</h1>
            <p className="text-muted-foreground">
              Monitor application errors and events
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(undefined)}
            >
              All
            </Button>
            <Button
              variant={filter === "error" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("error")}
            >
              Errors
            </Button>
            <Button
              variant={filter === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("warning")}
            >
              Warnings
            </Button>
            <Button
              variant={filter === "info" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("info")}
            >
              Info
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {filter ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Logs` : "All Logs"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs?.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No logs found
                </p>
              ) : (
                logs?.map((log: any) => {
                  const Icon = levelIcons[log.level as keyof typeof levelIcons] || AlertCircle
                  const colorClass =
                    levelColors[log.level as keyof typeof levelColors] ||
                    "text-gray-600 bg-gray-50 border-gray-200"

                  return (
                    <div
                      key={log.id}
                      className={`rounded-lg border p-4 ${colorClass}`}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold uppercase">{log.level}</span>
                        </div>
                        <span className="text-sm opacity-70">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      <p className="mb-2 font-medium">{log.message}</p>
                      {log.user && (
                        <p className="text-sm opacity-70">User: {log.user}</p>
                      )}
                      {log.context && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">
                            Context
                          </summary>
                          <pre className="mt-2 overflow-auto rounded bg-black/10 p-2 text-xs">
                            {JSON.stringify(log.context, null, 2)}
                          </pre>
                        </details>
                      )}
                      {log.stack && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">
                            Stack Trace
                          </summary>
                          <pre className="mt-2 overflow-auto rounded bg-black/10 p-2 text-xs">
                            {log.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

