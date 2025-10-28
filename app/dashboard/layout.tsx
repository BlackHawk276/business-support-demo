"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import TopBar from "@/components/dashboard/topbar"
import MobileSidebar from "@/components/dashboard/mobile-sidebar"
import { DemoBanner } from "@/components/demo-banner"
import { DemoControls } from "@/components/demo-controls"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (!isAuthenticated || !userData) {
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <TopBar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Demo Banner */}
        <DemoBanner />

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>

      {/* Demo Controls (Cmd+Shift+D) */}
      <DemoControls />
    </div>
  )
}
