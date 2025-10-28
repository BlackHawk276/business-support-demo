import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Support Pro - Dashboard",
  description: "Manage your sales team, track payments, and grow your business",
  applicationName: "Business Support Pro",
  keywords: ["sales", "payment tracking", "CRM", "business management", "FMCG", "India"],
  authors: [{ name: "Business Support Pro" }],
  creator: "Business Support Pro",
  publisher: "Business Support Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
