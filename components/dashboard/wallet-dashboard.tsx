"use client"

import { useSession, signOut } from "next-auth/react"
import { BalanceCard } from "./balance-card"
import { TransactionsList } from "./transactions-list"
import { VirtualCard } from "./virtual-card"
import { AddMoneyModal } from "./add-money-modal"
import { SendMoneyModal } from "./send-money-modal"
import { Button } from "@/components/ui/button"
import { LogOut, FileText, Plus, Send } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function WalletDashboard() {
  const { data: session } = useSession()
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [showSendMoney, setShowSendMoney] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FinFlow
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/logs">
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-2 hover:bg-white/80"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Logs</span>
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">{session?.user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="gap-2 hover:bg-white/80"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="mb-2 text-4xl font-bold tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{session?.user?.name || "User"}</span>!
          </h2>
          <p className="text-muted-foreground text-lg">Here's your financial overview</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Balance & Virtual Card */}
          <div className="space-y-6 lg:col-span-2">
            <BalanceCard
              onAddMoney={() => setShowAddMoney(true)}
              onSendMoney={() => setShowSendMoney(true)}
            />
            <VirtualCard />
            <TransactionsList />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl transition-all hover:shadow-2xl hover:bg-white/70">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => setShowAddMoney(true)}
                  size="lg"
                >
                  <Plus className="h-5 w-5" />
                  Add Money
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-2 transition-all hover:scale-[1.02] hover:bg-white/80"
                  onClick={() => setShowSendMoney(true)}
                  size="lg"
                >
                  <Send className="h-5 w-5" />
                  Send Money
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddMoneyModal open={showAddMoney} onOpenChange={setShowAddMoney} />
      <SendMoneyModal open={showSendMoney} onOpenChange={setShowSendMoney} />
    </div>
  )
}

