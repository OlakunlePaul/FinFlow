import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { sanitizeInput } from "@/lib/utils"

// Mock user database - In production, use a real database
const users = [
  {
    id: "1",
    email: "demo@finflow.com",
    password: "demo123", // In production, use hashed passwords
    name: "Demo User",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Sanitize inputs
        const email = sanitizeInput(credentials.email)
        const password = sanitizeInput(credentials.password)

        // Find user
        const user = users.find(
          (u) => u.email === email && u.password === password
        )

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "finflow-secret-key-change-in-production",
}

