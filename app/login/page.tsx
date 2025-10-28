import AuthLayout from "@/components/auth/auth-layout"
import LoginForm from "@/components/auth/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Business Support Pro",
  description: "Sign in to your Business Support Pro account",
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
