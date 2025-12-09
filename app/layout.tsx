import type { Metadata } from "next"
import { Inter, Instrument_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FinFlow - Modern Fintech Platform",
  description: "A complete fintech demo application built with Next.js 14",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

