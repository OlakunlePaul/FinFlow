"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Code, Shield, Zap, Globe, Plus, Send, Download } from "lucide-react"
import { HeroSection } from "@/components/hero/hero-section"

const easing = [0.4, 0, 0.2, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing },
}

// JSON payload for code example
const jsonPayload = `{` + `"amount": 1000, "currency": "USD"` + `}`

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-white/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold tracking-tight text-text-strong">
              FinFlow
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm" className="text-text-muted hover:text-text-strong">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary text-text-on-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <Suspense fallback={<div className="h-[600px] bg-white" />}>
          <HeroSection />
        </Suspense>

        {/* Dashboard Preview Section */}
        <section className="bg-slate-50 px-6 py-20 lg:py-32">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              {...fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
                Built for developers, designed for users
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                A complete dashboard experience with real-time balance updates, 
                transaction history, and seamless money operations.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              className="mt-12"
            >
              <div className="overflow-hidden rounded-2xl border border-border-subtle bg-slate-900 shadow-xl transition-all duration-200 hover:shadow-2xl">
                {/* Realistic FinFlow Dashboard Preview */}
                <div className="bg-surface-base min-h-[600px]">
                  {/* Top Navigation */}
                  <div className="border-b border-border-subtle bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-primary">FinFlow</span>
                        <nav className="hidden md:flex items-center gap-1">
                          {["Dashboard", "Cards", "Transactions", "Settings"].map((nav, i) => (
                            <button
                              key={nav}
                              className={`px-3 py-1.5 rounded text-sm font-medium ${
                                i === 0
                                  ? "bg-primary/10 text-primary"
                                  : "text-text-muted hover:text-text-strong"
                              }`}
                            >
                              {nav}
                            </button>
                          ))}
                        </nav>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src="https://i.pravatar.cc/150?img=12"
                          alt="Profile"
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-full object-cover border border-border-subtle"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6 bg-surface-base">
                    {/* Welcome Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-text-strong">
                        Welcome back, <span className="text-primary">John Doe</span>
                      </h2>
                      <p className="mt-2 text-sm text-text-muted">
                        Here&apos;s a snapshot of your wallets, cards, and activity.
                      </p>
                    </div>

                    {/* Balance Card - Gradient */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-accent text-white shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                      <div className="relative z-10 p-6 md:p-8">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex-1">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/80">
                              Total balance
                            </p>
                            <p className="text-5xl font-bold tracking-tight md:text-6xl text-white">
                              $12,345.67
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-right backdrop-blur-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                              Available
                            </p>
                            <p className="mt-0.5 text-base font-semibold text-white">
                              $12,345.67
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                          <button className="flex-1 gap-2.5 rounded-lg bg-white/20 backdrop-blur-sm py-3 px-4 text-sm font-semibold text-white hover:bg-white/30 transition-all">
                            <Plus className="h-5 w-5 inline" /> Add Money
                          </button>
                          <button className="flex-1 gap-2.5 rounded-lg border border-white/30 bg-transparent py-3 px-4 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                            <Send className="h-5 w-5 inline" /> Send Money
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
                        {/* Virtual Card */}
                        <div className="relative h-60 w-full rounded-xl border-0 bg-gradient-to-br from-primary via-primary to-accent text-white shadow-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
                            <div className="mb-5 flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-xs font-semibold">
                                  F
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-white/70">Virtual debit</span>
                                  <span className="block text-sm font-semibold">FinFlow</span>
                                </div>
                              </div>
                              <div className="h-7 w-10 rounded bg-white/10 border border-white/20" />
                            </div>
                            <div className="mb-4 flex-1">
                              <p className="mb-1 text-xs uppercase tracking-widest text-white/70">Card number</p>
                              <p className="text-xl font-mono tracking-widest md:text-2xl">4532 •••• •••• 1234</p>
                            </div>
                            <div className="mt-auto flex items-end justify-between text-sm">
                              <div>
                                <p className="text-xs uppercase tracking-widest text-white/70">Cardholder</p>
                                <p className="mt-1 font-semibold">JOHN DOE</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs uppercase tracking-widest text-white/70">Valid thru</p>
                                <p className="mt-1 font-semibold">12/25</p>
                              </div>
                    </div>
              </div>
            </div>

                        {/* Transactions List */}
                        <div className="rounded-xl border border-border-subtle bg-white shadow-md">
                          <div className="border-b border-border-subtle p-6 pb-4">
                            <h3 className="text-lg font-semibold text-text-strong">Recent transactions</h3>
                            <p className="mt-1.5 text-xs text-text-muted">Updated just now</p>
                          </div>
                          <div className="p-6 space-y-3">
                            {[
                              { desc: "Payment from Wise", date: "Today", amount: "+$1,320.00", type: "credit" },
                              { desc: "Virtual card top-up", date: "Yesterday", amount: "-$80.00", type: "debit" },
                              { desc: "USDT to EUR exchange", date: "2 days ago", amount: "+$2,450.00", type: "credit" },
                              { desc: "Subscription payment", date: "3 days ago", amount: "-$29.99", type: "debit" },
                            ].map((txn, i) => (
                              <div key={i} className="flex items-center gap-4 rounded-lg border border-border-subtle bg-surface-base px-5 py-4 transition-all duration-200 hover:bg-surface-raised hover:shadow-sm">
                                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 ${
                                  txn.type === "credit" 
                                    ? "border-green-200 bg-green-50 text-green-600" 
                                    : "border-red-200 bg-red-50 text-red-600"
                                }`}>
                                  {txn.type === "credit" ? "↓" : "↑"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-text-strong">{txn.desc}</div>
                                  <div className="mt-1.5 text-xs text-text-muted">
                                    {txn.date}
                                  </div>
                                </div>
                                <div className={`text-base font-bold tracking-tight ${
                                  txn.type === "credit" ? "text-green-600" : "text-red-600"
                                }`}>
                                  {txn.amount}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Sidebar - Quick Actions */}
                      <aside className="space-y-6">
                        <div className="rounded-xl border border-border-subtle bg-white p-6 shadow-md">
                          <h3 className="mb-2 text-sm font-semibold text-text-strong">Quick actions</h3>
                          <p className="mb-5 text-xs text-text-muted">
                            Common money tasks for your main wallet.
                          </p>
                          <div className="space-y-3">
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-all">
                              <Plus className="h-4 w-4" /> Add Money
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border-subtle py-2.5 text-sm font-semibold text-text-strong hover:bg-surface-base transition-all">
                              <Send className="h-4 w-4" /> Send Money
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle py-2.5 text-sm font-medium text-text-default hover:bg-surface-base transition-all">
                              <Download className="h-4 w-4" /> Download CSV
                            </button>
                          </div>
              </div>
            </aside>
          </div>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>
      </section>

        {/* Features Grid */}
        <section className="bg-white px-6 py-20 lg:py-32">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              {...fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
                Everything you need to build
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Comprehensive APIs and tools for modern financial applications.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level encryption, SOC 2 compliance, and comprehensive audit logs.",
                },
                {
                  icon: Zap,
                  title: "Real-time Updates",
                  description: "Webhooks and live balance synchronization for instant transaction processing.",
                },
                {
                  icon: Globe,
                  title: "Multi-currency",
                  description: "Support for 50+ currencies with automatic conversion and settlement.",
                },
                {
                  icon: Code,
                  title: "Developer-First",
                  description: "RESTful APIs, comprehensive documentation, and SDKs for all platforms.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  {...fadeInUp}
                  transition={{ delay: 0.1 * index, duration: 0.5, ease: easing }}
                  className="group rounded-xl border border-border-subtle bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 transition-colors group-hover:bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-strong">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-text-muted">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding Section */}
        <section className="bg-slate-50 px-6 py-20 lg:py-32">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              {...fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
                Get started in minutes
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Simple, fast onboarding that gets your team up and running quickly.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              className="mt-12"
            >
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-8 top-0 h-full w-0.5 bg-border-subtle" />
                
                {/* Steps */}
                <div className="space-y-8">
                  {[
                    { step: 1, title: "Create Account", description: "Sign up with email and verify your identity." },
                    { step: 2, title: "Add Funds", description: "Connect your bank or add money via card." },
                    { step: 3, title: "Create Virtual Card", description: "Generate cards for online purchases instantly." },
                    { step: 4, title: "Start Transacting", description: "Send money, make payments, and manage your wallet." },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.1, duration: 0.4, ease: easing }}
                      className="relative flex gap-6"
                    >
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-lg font-semibold text-primary shadow-sm transition-all duration-200 hover:shadow-md">
                        {item.step}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-semibold text-text-strong">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="bg-white px-6 py-20 lg:py-32">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              {...fadeInUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
                Built for production
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Monitor, debug, and scale with confidence using our developer tools.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5, ease: easing }}
              className="mt-12"
            >
              <div className="overflow-hidden rounded-2xl border border-border-subtle bg-slate-900 shadow-xl transition-all duration-200 hover:shadow-2xl">
                <div className="border-b border-slate-700/50 bg-slate-800 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-sm font-mono text-slate-400">
                      terminal
                    </span>
                  </div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-2 text-slate-300">
                    <div>
                      <span className="text-slate-500">$</span>{" "}
                      <span className="text-green-400">curl</span>{" "}
                      <span className="text-blue-400">-X POST</span>{" "}
                      <span className="text-purple-400">https://api.finflow.com/v1/transfers</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-slate-500">-H</span>{" "}
                      <span className="text-yellow-400">&quot;Authorization: Bearer sk_live_...&quot;</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-slate-500">-d</span>{" "}
                      <span className="text-cyan-400">
                        &apos;{jsonPayload}&apos;
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-slate-500">{">"}</span>{" "}
                      <span className="text-green-400">{"{"}</span>
                    </div>
                    <div className="ml-4 text-slate-400">
                      <span className="text-blue-400">&quot;id&quot;</span>:{" "}
                      <span className="text-yellow-400">&quot;txn_abc123&quot;</span>,
                    </div>
                    <div className="ml-4 text-slate-400">
                      <span className="text-blue-400">&quot;status&quot;</span>:{" "}
                      <span className="text-green-400">&quot;completed&quot;</span>,
                    </div>
                    <div className="ml-4 text-slate-400">
                      <span className="text-blue-400">&quot;amount&quot;</span>:{" "}
                      <span className="text-cyan-400">1000</span>
                    </div>
                    <div>
                      <span className="text-green-400">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-50 px-6 py-20 lg:py-32">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Join teams building the future of financial infrastructure.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary text-text-on-primary hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] active:translate-y-0 transition-all duration-200">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="border-border-subtle text-text-strong hover:bg-surface-base hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] active:translate-y-0 transition-all duration-200">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-white px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4">
                <span className="text-lg font-semibold tracking-tight text-text-strong">FinFlow</span>
              </div>
              <p className="text-sm leading-relaxed text-text-muted">
                Production-ready wallet infrastructure for modern financial applications.
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-text-strong">Product</p>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <Link href="/dashboard" className="hover:text-text-strong transition-colors inline-block">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-text-strong transition-colors inline-block">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-text-strong transition-colors inline-block">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-text-strong">Company</p>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <button className="text-left hover:text-text-strong transition-colors">About</button>
                </li>
                <li>
                  <button className="text-left hover:text-text-strong transition-colors">Security</button>
                </li>
                <li>
                  <button className="text-left hover:text-text-strong transition-colors">Documentation</button>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-text-strong">Legal</p>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <button className="text-left hover:text-text-strong transition-colors">Privacy Policy</button>
                </li>
                <li>
                  <button className="text-left hover:text-text-strong transition-colors">Terms of Service</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border-subtle pt-8 text-center text-sm text-text-muted">
            © {new Date().getFullYear()} FinFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
