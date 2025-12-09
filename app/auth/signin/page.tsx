"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { sanitizeInput } from "@/lib/utils"

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInForm) => {
    setIsSubmitting(true)
    try {
      const result = await signIn("credentials", {
        email: sanitizeInput(data.email),
        password: sanitizeInput(data.password),
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success!",
        description: "Signed in successfully",
        variant: "success",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image/Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-xl opacity-90 mb-8">
              Manage your finances with ease and security
            </p>
            {/* Placeholder for transaction cards image */}
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
              <div className="text-center space-y-3">
                <p className="text-sm opacity-70 mb-4">Your Transactions</p>
                {[
                  { amount: '+$1300', desc: 'Payment from Wise', color: 'green' },
                  { amount: '-$15', desc: 'Capcut Pro', color: 'red' },
                  { amount: '+$500', desc: 'Salary Payment', color: 'green' },
                ].map((txn, idx) => (
                  <div key={idx} className="rounded-lg bg-white/20 p-3 backdrop-blur-sm text-left">
                    <div className="text-xs opacity-80 mb-1">{txn.desc}</div>
                    <div className={`text-sm font-bold ${txn.color === 'green' ? 'text-green-300' : 'text-red-300'}`}>
                      {txn.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-4">
        <Card className="w-full max-w-md border-0 bg-white/70 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your FinFlow account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : "bg-white/80"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-destructive" : "bg-white/80"}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-sm backdrop-blur-sm">
              <p className="font-semibold mb-2 text-blue-900">Demo Credentials:</p>
              <p className="text-blue-700">Email: demo@finflow.com</p>
              <p className="text-blue-700">Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

