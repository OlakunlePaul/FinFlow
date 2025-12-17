import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RippleButton } from "@/components/ui/ripple-button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { GradientText } from "@/components/ui/gradient-text"
import { ShimmeringText } from "@/components/ui/shimmering-text"
import { ArrowRight, Shield, Globe, CreditCard, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Global Accounts",
    description: "Open USD, EUR, GBP accounts instantly.",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description: "Create unlimited virtual cards for online purchases.",
  },
  {
    icon: Globe,
    title: "Crypto Exchange",
    description: "Convert between 50+ currencies and cryptocurrencies.",
  },
  {
    icon: Lock,
    title: "Fast Transfers",
    description: "Send money worldwide in minutes, not days.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-lighter bg-white/90 backdrop-blur-md">
        <div className="container flex flex-wrap items-center justify-between gap-3 px-4 py-4 lg:flex-nowrap lg:px-6">
          <div className="flex items-center">
            <span className="text-lg font-semibold lg:text-xl">FinFlow</span>
          </div>
          <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-text-default hover:bg-surface-base hover:text-text-strong"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-accent px-5 py-2 text-sm font-semibold text-text-on-primary hover:bg-accent/90">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main>
      {/* Hero Section */}
      <section className="relative flex flex-1 items-center bg-primary px-4 py-12 text-text-on-primary lg:py-20 overflow-hidden">
        <ParticlesBackground
          className="opacity-30"
          quantity={30}
          color="rgba(255, 255, 255, 0.15)"
        />
        <div className="container relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div className="max-w-xl">
            <p className="mb-4 text-tiny uppercase tracking-[0.18em] text-light-blue">
              For freelancers, small teams, and everyday users
            </p>
            <h1 className="text-hero leading-tight lg:text-[3.5rem]">
              <TextGenerateEffect
                words="One global account for work and life money"
                className="text-text-on-primary"
                cursorClassName="bg-text-on-primary"
                duration={10}
              />
            </h1>
            <p className="mt-4 text-body-lg text-light-blue">
              Get paid in multiple currencies, hold balances, and send money worldwide from a single, secure wallet.
            </p>

            {/* Inline journey summary */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-tiny text-light-blue/80">
              <span className="rounded-full bg-surface-base/10 px-2 py-0.5 font-medium text-text-on-primary">
                1. Create account
              </span>
              <span className="text-light-blue/60">›</span>
              <span className="rounded-full bg-surface-base/10 px-2 py-0.5 font-medium text-text-on-primary">
                2. Add or receive money
              </span>
              <span className="text-light-blue/60">›</span>
              <span className="rounded-full bg-surface-base/10 px-2 py-0.5 font-medium text-text-on-primary">
                3. Spend and move funds
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-tiny text-primary/10">
              <span className="rounded-full bg-surface-base/10 px-3 py-1 text-text-on-primary/80">
                Freelancers & creators
              </span>
              <span className="rounded-full bg-surface-base/10 px-3 py-1 text-text-on-primary/80">
                Remote teams & SMEs
              </span>
              <span className="rounded-full bg-surface-base/10 px-3 py-1 text-text-on-primary/80">
                Everyday consumers
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="flex-1">
                <RippleButton
                  rippleColor="rgba(255, 255, 255, 0.3)"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-text-on-primary hover:bg-accent/90"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </RippleButton>
              </Link>
              <Link href="/login" className="flex-1">
                <RippleButton
                  rippleColor="rgba(15, 23, 42, 0.1)"
                  variant="outline"
                  className="w-full rounded-lg border border-white bg-white text-sm font-semibold text-dark-blue hover:bg-gray-lightest"
                >
                  Sign In
                </RippleButton>
              </Link>
            </div>

            <p className="mt-4 text-small text-gray-light">
              Bank-level security • 256-bit encryption
            </p>
          </div>

          {/* Hero Visual – hidden on small screens */}
          <div className="hidden md:block">
            <div className="mx-auto w-full max-w-md rounded-3xl bg-dark-blue-dark/60 p-5 shadow-2xl ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-deep-teal to-dark-blue-light p-5">
                {/* Simulated balance card */}
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-dark-blue-light to-deep-teal px-5 py-4 shadow-lg">
                  <div className="flex items-center justify-between text-tiny text-light-blue">
                    <span>Total Balance</span>
                    <span>Multi-currency</span>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-white">$12,345.67</p>
                  <p className="mt-1 text-small text-light-blue">
                    •••• •••• •••• 1234
                  </p>
                </div>

                {/* Small floating cards (light skeuomorphism) */}
                <div className="space-y-2 text-tiny text-gray-lightest">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 backdrop-blur">
                    <span>Payment from Wise</span>
                    <span className="font-semibold text-emerald-light">
                      +$1,320
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 backdrop-blur">
                    <span>Virtual card top-up</span>
                    <span className="font-semibold text-crimson-light">
                      -$80
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 backdrop-blur">
                    <span>USDT to EUR exchange</span>
                    <span className="font-semibold text-emerald-light">
                      +2.5%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product overview strip (features + trust) */}
      <section className="bg-white px-4 py-12 lg:py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-h2 text-dark-blue">
              <GradientText gradientFrom="from-primary" gradientTo="to-accent" animate>
                Everything you need in one place
              </GradientText>
            </h2>
            <p className="mt-2 text-body text-gray">
              <ShimmeringText>
                Rich, intuitive experiences for your daily money, backed by enterprise‑grade safeguards.
              </ShimmeringText>
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:items-start">
            {/* Feature cards */}
            <div className="space-y-6 lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {features.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-gray-lighter bg-white p-6 shadow-sm transition-transform transition-shadow hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-light-blue-pale">
                      <Icon className="h-5 w-5 text-light-blue-dark" />
                    </div>
                    <h3 className="text-h3 text-dark-gray">
                      <GradientText gradientFrom="from-primary" gradientTo="to-accent">
                        {title}
                      </GradientText>
                    </h3>
                    <p className="mt-2 text-body text-gray">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust / compliance column */}
            <aside className="space-y-4 rounded-2xl border border-gray-lighter bg-gray-lightest px-5 py-6">
              <p className="text-small font-semibold text-dark-blue">
                Built for serious money workflows
              </p>
              <p className="text-small text-gray">
                FinFlow is designed with patterns used by modern banks and payment platforms, so your teams and
                clients feel at home from day one.
              </p>
              <div className="mt-2 grid grid-cols-3 gap-3 text-center text-tiny text-gray md:grid-cols-3">
                {["NovaBank", "AtlasPay", "GlobeX"].map((name) => (
                  <div
                    key={name}
                    className="flex h-10 items-center justify-center rounded-lg border border-gray-lighter bg-white text-gray-light"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2 text-tiny text-gray">
                <p className="font-medium text-dark-blue">Safety & reliability</p>
                <ul className="space-y-1">
                  {["PCI‑style card handling", "256‑bit SSL everywhere", "Read‑only demo data (no real funds)"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-light-blue" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface-base py-8">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-4 text-center text-small text-text-muted md:grid-cols-4">
            {[
              { value: "$2B+", label: "Total volume (demo)" },
              { value: "150+", label: "Countries represented" },
              { value: "99.9%", label: "Target uptime" },
              { value: "24/7", label: "Monitoring & alerts" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border-subtle bg-surface-raised px-4 py-4"
              >
                <p className="text-h2 text-text-strong">{stat.value}</p>
                <p className="mt-1 text-small text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-10 text-text-on-primary">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center">
                <span className="text-base font-semibold">FinFlow</span>
              </div>
              <p className="text-small text-text-muted">
                A modern demo platform for cross-border money, built with real
                world UX patterns.
              </p>
            </div>

            <div>
              <p className="mb-3 text-small font-semibold">Product</p>
              <ul className="space-y-2 text-small text-text-muted">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:underline">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-small font-semibold">Company</p>
              <ul className="space-y-2 text-small text-text-muted">
                <li>
                  <button className="text-left hover:underline">About</button>
                </li>
                <li>
                  <button className="text-left hover:underline">Security</button>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-small font-semibold">Legal</p>
              <ul className="space-y-2 text-small text-text-muted">
                <li>
                  <button className="text-left hover:underline">Privacy</button>
                </li>
                <li>
                  <button className="text-left hover:underline">Terms</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border-subtle/40 pt-6 text-center text-tiny text-text-muted">
            © {new Date().getFullYear()} FinFlow. Demo application for
            educational purposes only.
          </div>
        </div>
      </footer>
    </div>
  )
}

