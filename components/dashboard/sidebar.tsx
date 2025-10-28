"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Home,
  Activity,
  IndianRupee,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Package,
  Gift,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/types/auth"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Activities", href: "/dashboard/activities", icon: Activity },
  { name: "Payments", href: "/dashboard/payments", icon: IndianRupee },
  { name: "Catalog", href: "/dashboard/catalog", icon: Package },
  { name: "Schemes", href: "/dashboard/schemes", icon: Gift },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200">
      <div className="flex flex-col h-full">
        {/* Logo & Company */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-900 text-sm truncate">
              Business Support Pro
            </div>
            <div className="text-xs text-slate-500 truncate">
              {user?.company.name || "Demo Company"}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 -ml-1 pl-3"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {user ? getInitials(user.name) : "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {user?.name || "User"}
              </div>
              <Badge
                variant="secondary"
                className="text-xs mt-1 bg-slate-100 text-slate-600"
              >
                {user?.role.replace("_", " ") || "Owner"}
              </Badge>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
