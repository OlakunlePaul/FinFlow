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
import { Mail, Lock, Eye, EyeOff, Shield, Loader2 } from "lucide-react"

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="flex min-h-screen bg-white">
      {/* Desktop illustration side */}
      <div className="hidden w-3/5 bg-dark-blue lg:flex">
        <div className="relative flex w-full items-center justify-center px-12 py-10 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-blue-light/40 to-deep-teal-dark/60" />
          <div className="relative z-10 max-w-md">
            <h2 className="mb-3 text-h1 lg:text-[2.5rem]">
              Welcome back to FinFlow
            </h2>
            <p className="mb-8 text-body-lg text-light-blue-pale">
              Track balances, manage virtual cards, and move money across
              borders in seconds.
            </p>
            <div className="rounded-2xl bg-dark-blue-dark/60 p-5 shadow-xl ring-1 ring-white/10">
              <p className="mb-3 text-tiny uppercase tracking-[0.16em] text-light-blue">
                Today&apos;s snapshot
              </p>
              <div className="mb-4 rounded-xl bg-gradient-to-br from-deep-teal to-dark-blue-light px-4 py-3">
                <p className="text-tiny text-light-blue-pale">Total balance</p>
                <p className="mt-1 text-2xl font-semibold">$12,345.67</p>
                <p className="mt-1 text-tiny text-light-blue-pale">
                  •••• •••• •••• 1234
                </p>
              </div>
              <div className="space-y-2 text-tiny text-gray-lightest">
                <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>Payment from Wise</span>
                  <span className="font-semibold text-emerald-light">+$1,320</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>Apple iCloud</span>
                  <span className="font-semibold text-crimson-light">-$9.99</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span>USDT → EUR</span>
                  <span className="font-semibold text-emerald-light">+2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:w-2/5 lg:bg-gray-lightest">
        <Card className="w-full max-w-md border border-gray-lighter shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mb-2 flex justify-center">
              <span className="text-xl font-semibold text-text-strong">FinFlow</span>
            </div>
            <CardTitle className="text-h2 text-text-strong">Sign in</CardTitle>
            <CardDescription className="text-body text-gray">
              Access your FinFlow dashboard securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-small font-medium text-dark-gray">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-light" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`h-11 rounded-lg border-2 bg-white pl-10 pr-3 text-body ${
                      errors.email ? "border-crimson-red" : "border-gray-lighter focus:border-light-blue"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-small text-crimson-red">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-small font-medium text-dark-gray">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-light" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`h-11 rounded-lg border-2 bg-white pl-10 pr-10 text-body ${
                      errors.password ? "border-crimson-red" : "border-gray-lighter focus:border-light-blue"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 rounded p-1 text-gray hover:bg-gray-lightest"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-small text-crimson-red">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-small font-medium text-light-blue hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg bg-gradient-to-r from-dark-blue to-dark-blue-light py-3 text-small font-semibold text-white hover:shadow-md disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-lighter" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-tiny text-gray">
                  OR
                </span>
              </div>
            </div>

            {/* Social login (placeholder) */}
            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-gray-lighter py-2.5 text-small text-dark-gray hover:bg-gray-lightest"
              aria-label="Sign in with Google"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.3-2 3.1l3.3 2.6C20.7 18.4 22 15.6 22 12.5 22 11.7 21.9 11 21.8 10.2H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.8 14.3l-3.1 2.4C5.1 19.2 8.3 21 12 21c2.7 0 4.9-.9 6.5-2.4l-3.3-2.6c-.9.6-2 1-3.2 1-2.5 0-4.6-1.7-5.3-4.1z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.7 7.9C3.1 9.1 2.8 10.5 2.8 12s.3 2.9.9 4.1l3.1-2.4C6.5 13 6.4 12.5 6.4 12c0-.5.1-1 .3-1.7L3.7 7.9z"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 5.2c1.5 0 2.8.5 3.8 1.4l2.8-2.8C17 2.2 14.8 1.3 12 1.3 8.3 1.3 5.1 3.1 3.7 5.9L6.7 8.3C7.4 6 9.5 5.2 12 5.2z"
                  />
                </svg>
              </span>
              Sign in with Google
            </Button>

            {/* Sign up link */}
            <p className="mt-4 text-center text-small text-gray">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-light-blue hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {/* Security badge */}
            <div className="mt-5 flex items-center justify-center gap-2 text-tiny text-gray-light">
              <Shield className="h-4 w-4 text-light-blue" />
              <span>256-bit Encryption • Your data is secure</span>
            </div>

            {/* Demo credentials helper */}
            <div className="mt-5 rounded-lg border border-light-blue-pale bg-light-blue-pale/40 px-4 py-3 text-tiny text-dark-gray">
              <p className="mb-1 font-semibold text-dark-blue">Demo login</p>
              <p>Email: demo@finflow.com</p>
              <p>Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

