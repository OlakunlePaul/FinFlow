"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { sanitizeInput } from "@/lib/utils"
import { Mail, Lock, Eye, EyeOff, Shield, Loader2 } from "lucide-react"
import { springPresets } from "@/lib/hooks/use-motion-config"

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
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

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
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        })
        return
      }

      // If no error, treat as success (more resilient than requiring result?.ok)
      // This handles edge cases where result structure might differ
      // Use window.location for a full page reload to ensure session cookie is set
      // This is more reliable on Vercel where cookies need to be properly established
      toast({
        title: "Success!",
        description: "Redirecting to dashboard...",
        variant: "success",
      })
      // Full page reload ensures session cookie is properly set before navigation
      // This is critical on Vercel where cookie domain/secure settings matter
      window.location.href = "/dashboard"
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
    <div className="flex min-h-screen items-center justify-center bg-surface-base px-4 py-12 sm:px-6">
      {/* Centered auth card with motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          ...springPresets.gentle,
          duration: 0.4,
        }}
        className="w-full max-w-md"
      >
        <Card className="border-0 bg-surface-raised shadow-xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mb-1 flex justify-center">
              <span className="text-2xl font-bold tracking-tight text-primary">FinFlow</span>
            </div>
            <CardTitle className="text-h1 font-bold text-text-strong">Sign in</CardTitle>
            <CardDescription className="text-body text-text-muted">
              Access your account securely
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label 
                  htmlFor="email"
                  className="block text-sm font-semibold text-text-strong"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <motion.div
                    animate={{ scale: emailFocused ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className={`h-12 pl-11 pr-4 ${
                        errors.email 
                          ? "border-destructive focus-visible:ring-destructive/20" 
                          : "focus-visible:ring-primary/20"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </motion.div>
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="email-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label 
                  htmlFor="password"
                  className="block text-sm font-semibold text-text-strong"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  <motion.div
                    animate={{ scale: passwordFocused ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={`h-12 pl-11 pr-12 ${
                        errors.password 
                          ? "border-destructive focus-visible:ring-destructive/20" 
                          : "focus-visible:ring-primary/20"
                      }`}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-base hover:text-text-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="password-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-sm transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold shadow-sm text-white bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 active:from-primary/95 active:to-accent/95 border-0"
                  size="lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-text-muted">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-sm transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Security badge */}
            <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-base px-4 py-3">
              <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-text-muted">
                256-bit encryption • Your data is secure
              </span>
            </div>

            {/* Demo credentials helper */}
            <div className="mt-4 rounded-lg border border-accent-soft bg-accent-soft/30 px-4 py-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                Demo Account
              </p>
              <div className="space-y-1 text-xs text-text-default">
                <p><span className="font-medium">Email:</span> demo@finflow.com</p>
                <p><span className="font-medium">Password:</span> demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
