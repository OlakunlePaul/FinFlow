import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe, CreditCard, Lock, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
          <nav className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" className="hover:bg-white/80">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-20">
        <div className="container relative mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 text-sm backdrop-blur-sm shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-medium">Trusted by freelancers worldwide</span>
              </div>
              
              <h2 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Modern Fintech
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h2>
              
              <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 md:text-2xl">
                Experience the future of digital banking with FinFlow. Secure,
                fast, and designed for the modern world.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/auth/signup">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 bg-white/60 backdrop-blur-sm hover:bg-white/80">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Image/Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Placeholder for tablet with transaction cards image */}
                <div className="relative rounded-3xl border-8 border-gray-800 bg-gray-900 p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[3/4] w-full rounded-lg bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                    {/* Floating transaction cards */}
                    <div className="absolute inset-0 p-4">
                      {/* Transaction cards floating around */}
                      {[
                        { top: '5%', left: '0%', amount: '+$1300', desc: 'Payment from Wise', color: 'green' },
                        { top: '20%', left: '-5%', amount: '-$15', desc: 'Capcut Pro', color: 'red' },
                        { top: '35%', left: '0%', amount: '-$80', desc: 'Apple iCloud', color: 'red' },
                        { top: '10%', right: '0%', amount: '-$120', desc: 'Aliexpress', color: 'red' },
                        { top: '25%', right: '-5%', amount: '+$500', desc: 'Salary Payment', color: 'green' },
                        { top: '45%', right: '0%', amount: '+$270', desc: 'Upwork', color: 'green' },
                        { bottom: '10%', right: '0%', amount: '-$80', desc: 'Shein Shopping', color: 'red' },
                      ].map((card, idx) => (
                        <div
                          key={idx}
                          className="absolute rounded-xl bg-white/90 backdrop-blur-md p-3 shadow-lg w-28 transform hover:scale-110 transition-transform z-10"
                          style={{
                            top: card.top,
                            bottom: card.bottom,
                            left: card.left,
                            right: card.right,
                          }}
                        >
                          <div className="text-xs font-medium text-gray-600 mb-1 truncate">{card.desc}</div>
                          <div className={`text-sm font-bold ${card.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                            {card.amount}
                          </div>
                        </div>
                      ))}
                      {/* Central tablet screen */}
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="text-center text-white/80">
                          <CreditCard className="mx-auto mb-2 h-12 w-12" />
                          <p className="text-xs">FinFlow Dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 -top-4 -right-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-2xl" />
                <div className="absolute -z-10 -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400/30 to-pink-400/30 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/20 bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-4 text-center text-3xl font-bold md:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Why Choose FinFlow?
          </h3>
          <p className="mb-12 text-center text-muted-foreground text-lg">
            Everything you need for modern financial management
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl p-6 text-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:bg-white/80">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Bank-Level Security</h4>
              <p className="text-muted-foreground text-sm">
                End-to-end encryption and multi-factor authentication to keep your
                money safe.
              </p>
            </div>
            
            <div className="group rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl p-6 text-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:bg-white/80">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Lightning Fast</h4>
              <p className="text-muted-foreground text-sm">
                Instant transfers and real-time updates. No waiting, no delays.
              </p>
            </div>
            
            <div className="group rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl p-6 text-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:bg-white/80">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Global Reach</h4>
              <p className="text-muted-foreground text-sm">
                Send and receive money anywhere in the world, anytime.
              </p>
            </div>
            
            <div className="group rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl p-6 text-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:bg-white/80">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h4 className="mb-2 text-xl font-semibold">Virtual Cards</h4>
              <p className="text-muted-foreground text-sm">
                Create and manage virtual cards instantly for secure online payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            Trusted by leading financial institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Trust logo placeholders */}
            {["Bank Security", "PCI Compliant", "256-bit SSL", "ISO Certified"].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2"
              >
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 text-center z-10">
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to get started?
          </h3>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of users managing their finances with FinFlow
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6 h-auto bg-white text-blue-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              Create Your Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                  <span className="text-lg font-bold text-white">F</span>
                </div>
                <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FinFlow</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern fintech platform for freelancers and remote workers.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link href="/auth/signup" className="hover:text-foreground transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 FinFlow. Built with Next.js 14 and modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

