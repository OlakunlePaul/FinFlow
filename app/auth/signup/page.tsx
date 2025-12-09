"use client"

import { useState } from "react"
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

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpForm) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would create an account
      // For now, redirect to onboarding
      toast({
        title: "Success!",
        description: "Account created successfully",
        variant: "success",
      })

      router.push("/onboarding")
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
            <h2 className="text-4xl font-bold mb-4">Join FinFlow Today</h2>
            <p className="text-xl opacity-90 mb-8">
              Experience seamless financial management with our modern platform
            </p>
            {/* Placeholder for tablet image - replace with actual image */}
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm opacity-70 mb-2">Transaction Preview</p>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                      <div className="h-4 w-24 bg-white/30 rounded mb-1" />
                      <div className="h-3 w-16 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
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
              Create Account
            </CardTitle>
            <CardDescription className="text-base">
              Sign up to get started with FinFlow
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
                  className={errors.email ? "border-destructive" : ""}
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
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/signin" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

