// Reverted dashboard layout to the previous, simpler structure
"use client"

import { useSession, signOut } from "next-auth/react"
import { BalanceCard } from "./balance-card"
import { TransactionsList } from "./transactions-list"
import { VirtualCard } from "./virtual-card"
import { AddMoneyModal } from "./add-money-modal"
import { SendMoneyModal } from "./send-money-modal"
import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileText,
  Home,
  LogOut,
  Plus,
  Send,
  Settings,
  CreditCard as CardIcon,
  ArrowLeftRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useWalletStore } from "@/lib/store/wallet-store"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { useUiStore } from "@/lib/store/ui-store"
import { Button } from "@/components/ui/button"
import { RippleButton } from "@/components/ui/ripple-button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { CountingNumber } from "@/components/ui/counting-number"
import { Sparkles } from "@/components/ui/sparkles"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { GradientText } from "@/components/ui/gradient-text"
import { exportTransactionsCsv } from "@/lib/transactions/export-csv"

function KpiRow() {
  const items = [
    { label: "This week", value: 3.45, change: "+6.4%", isPositive: true },
    { label: "This month", value: 12.9, change: "-3.1%", isPositive: false },
    { label: "Upcoming", value: 14.4, change: "+10.3%", isPositive: true },
  ]

  return (
    <section aria-label="Account summary" className="space-y-3">
      <h3 className="text-sm font-semibold">
        <GradientText className="text-text-strong">Account summary</GradientText>
      </h3>
      <p className="text-tiny text-text-muted">
        Sample performance metrics for this demo environment.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-lg border border-border-subtle bg-surface-raised px-4 py-4 transition-all duration-300 hover:shadow-md hover:border-primary/20"
          >
            {item.isPositive && (
              <Sparkles
                count={15}
                color="rgba(21, 128, 61, 0.3)"
                size={3}
                className="opacity-50"
              />
            )}
            <p className="text-xs font-medium text-text-muted">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-text-strong">
              <CountingNumber
                value={item.value}
                duration={2000}
                decimals={2}
                prefix="$"
                suffix="k"
              />
            </p>
            <p
              className={`mt-1 text-xs font-medium ${
                item.isPositive
                  ? "text-emerald-green"
                  : "text-crimson-red"
              }`}
            >
              <span
                className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-lighter text-[10px]"
                aria-hidden="true"
              >
                {item.isPositive ? "↑" : "↓"}
              </span>
              <span>{item.change} vs last period</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function WalletDashboard() {
  const { data: session } = useSession()
  const { balance } = useWalletStore()
  const { idUploaded, currentStep } = useOnboardingStore()
  const {
    hasDismissedFirstTimeBanner,
    dismissFirstTimeBanner,
    alerts,
    setAlerts,
    connectionIssue,
  } = useUiStore()
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [showSendMoney, setShowSendMoney] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const isFirstTime = !hasDismissedFirstTimeBanner && (balance ?? 0) <= 0

  useEffect(() => {
    const list: { id: string; type: "info" | "success" | "warning" | "danger"; message: string }[] =
      []
    if (!idUploaded && currentStep >= 2) {
      list.push({
        id: "id-verification-pending",
        type: "warning",
        message: "Your ID verification is pending. Complete onboarding to unlock higher limits.",
      })
    }
    setAlerts(list)
  }, [idUploaded, currentStep, setAlerts])

  return (
    <div className="relative min-h-screen bg-surface-base overflow-hidden">
      {/* Subtle background effect */}
      <BackgroundBeams className="opacity-10" />
      {/* Desktop top navigation */}
      <nav className="hidden border-b border-border-subtle bg-primary text-text-on-primary md:block">
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold lg:text-xl">
              FinFlow
            </Link>
            <div className="hidden items-center gap-6 text-sm text-text-on-primary/80 lg:flex">
              <Link
                href="/dashboard"
                className="font-semibold text-text-on-primary"
              >
                Dashboard
              </Link>
              <Link href="/cards" className="hover:text-text-on-primary">
                Cards
              </Link>
              <Link
                href="/transactions"
                className="hover:text-text-on-primary"
              >
                Transactions
              </Link>
              <Link href="/exchange" className="hover:text-text-on-primary">
                Exchange
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/logs">
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-1 rounded-lg bg-surface-base/10 px-3 text-xs text-text-on-primary hover:bg-surface-base/20"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Logs</span>
              </Button>
            </Link>
            <div className="hidden items-center gap-2 rounded-full bg-surface-base/10 px-3 py-1 text-xs text-text-on-primary/80 lg:flex">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>{session?.user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="gap-1 rounded-lg bg-surface-base/10 px-3 text-xs text-text-on-primary hover:bg-surface-base/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header alerts */}
      {alerts.length > 0 && (
        <div className="border-b border-border-subtle bg-warning-soft">
          <div className="container flex items-center gap-2 px-4 py-2 text-tiny text-warning">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-medium">Important</p>
              <p>{alerts[0].message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Connection issue banner */}
      {connectionIssue && (
        <div className="border-b border-border-subtle bg-warning-soft/70">
          <div className="container flex items-center gap-2 px-4 py-2 text-tiny text-warning">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <p>
              We&apos;re having trouble refreshing some data. Recent balances or transactions may be out of date. Please
              try again in a moment.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="container pb-20 pt-5 md:pb-10 md:pt-8">
        <div className="mb-4 space-y-3 md:mb-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-h2 text-text-strong">
                Welcome back,{" "}
                <GradientText className="font-semibold">
                  {session?.user?.name || "User"}
                </GradientText>
              </h2>
              <p className="mt-1 text-small text-text-muted">
                Here&apos;s a snapshot of your wallets, cards, and activity.
              </p>
            </div>

            {/* Mobile sign out */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-1 inline-flex items-center gap-1 rounded-full border-border-subtle px-3 py-1 text-tiny text-text-muted md:hidden"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>

          {/* Account selector */}
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <section aria-label="Account overview">
              <h3 className="text-small font-semibold text-text-muted">
                Account overview
              </h3>
            </section>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-tiny font-medium text-text-default hover:bg-surface-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Select account"
              aria-expanded={accountMenuOpen}
              onClick={() => setAccountMenuOpen((open) => !open)}
            >
              <span>Primary USD wallet</span>
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>

            {accountMenuOpen && (
              <div className="mt-2 w-full rounded-xl border border-border-subtle bg-surface-raised p-3 text-tiny text-text-default shadow-md sm:absolute sm:right-0 sm:top-8 sm:mt-1 sm:w-72">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Current account
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-small font-medium text-text-strong">
                    Primary USD wallet
                  </span>
                  <span className="text-[11px] text-text-muted">
                    USD · ••••1234
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-text-muted">
                  Multi-account switching is coming soon in this demo.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mb-4 text-tiny text-text-muted">
          This is a sandbox demo environment. Balances and transactions are sample data only.
        </p>

        {isFirstTime && (
          <section
            aria-label="First-time setup"
            className="mb-5 rounded-2xl border border-border-subtle bg-surface-raised px-4 py-3 text-tiny text-text-default"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-small font-semibold text-text-strong">
                  First-time setup
                </p>
                <p className="mt-1 text-tiny text-text-muted">
                  Complete these quick steps to get the most out of FinFlow.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="h-7 rounded-full bg-primary px-3 text-tiny text-text-on-primary hover:bg-primary/90"
                    onClick={() => setShowAddMoney(true)}
                    aria-label="Add money to your wallet"
                  >
                    1. Add money
                  </Button>
                  <Link href="/cards">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 rounded-full border-border-subtle px-3 text-tiny text-text-default hover:bg-surface-base"
                      aria-label="Create a virtual card"
                    >
                      2. Create virtual card
                    </Button>
                  </Link>
                  <Link href="/onboarding">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 rounded-full border-border-subtle px-3 text-tiny text-text-default hover:bg-surface-base"
                      aria-label="Complete onboarding details"
                    >
                      3. Complete details
                    </Button>
                  </Link>
                </div>
              </div>
              <button
                type="button"
                onClick={dismissFirstTimeBanner}
                className="ml-2 text-tiny text-text-muted hover:text-text-strong focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Dismiss first-time setup banner"
              >
                Dismiss
              </button>
            </div>
          </section>
        )}

        <div className="grid gap-5 md:grid-cols-3">
          {/* Left / main column */}
          <div className="space-y-5 md:col-span-2">
            <BalanceCard
              onAddMoney={() => setShowAddMoney(true)}
              onSendMoney={() => setShowSendMoney(true)}
            />
            <KpiRow />
            <VirtualCard />
            <TransactionsList onAddMoney={() => setShowAddMoney(true)} />
          </div>

          {/* Right sidebar: quick actions */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border-subtle bg-surface-raised p-5 shadow-md">
              <h3 className="mb-1 text-small font-semibold text-text-strong">
                Quick actions
              </h3>
              <p className="mb-4 text-tiny text-text-muted">
                Common money tasks for your main wallet.
              </p>
              <div className="space-y-3">
                <RippleButton
                  rippleColor="rgba(255, 255, 255, 0.3)"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-small font-semibold text-text-on-primary transition-fast hover:bg-primary/90"
                  onClick={() => setShowAddMoney(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Money
                </RippleButton>
                <MagneticButton
                  magneticStrength={0.2}
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-border-subtle py-2.5 text-small font-semibold text-text-strong hover:bg-surface-base"
                  onClick={() => setShowSendMoney(true)}
                >
                  <Send className="h-4 w-4" />
                  Send Money
                </MagneticButton>
                <MagneticButton
                  magneticStrength={0.2}
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-border-subtle py-2.5 text-small font-medium text-text-default hover:bg-surface-base"
                  onClick={() => exportTransactionsCsv()}
                  aria-label="Download transaction statement as CSV"
                >
                  <Download className="h-4 w-4" />
                  Download statement (CSV)
                </MagneticButton>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-lighter bg-white md:hidden">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            href="/dashboard"
            className="flex flex-col items-center text-tiny text-dark-blue"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/cards"
            className="flex flex-col items-center text-tiny text-gray"
          >
            <CardIcon className="h-5 w-5" />
            <span>Cards</span>
          </Link>
          <Link
            href="/transactions"
            className="flex flex-col items-center text-tiny text-gray"
          >
            <ArrowLeftRight className="h-5 w-5" />
            <span>Transfer</span>
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center text-tiny text-gray"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* Modals */}
      <AddMoneyModal open={showAddMoney} onOpenChange={setShowAddMoney} />
      <SendMoneyModal open={showSendMoney} onOpenChange={setShowSendMoney} />
    </div>
  )
}


