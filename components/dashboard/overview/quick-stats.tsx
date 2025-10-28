"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Clock, Activity } from "lucide-react"

const stats = [
  {
    label: "Active Customers",
    value: "156",
    icon: Users,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "This Week's Sales",
    value: "₹8.5L",
    icon: TrendingUp,
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Pending Follow-ups",
    value: "12",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  {
    label: "Team Utilization",
    value: "87%",
    icon: Activity,
    color: "text-purple-600 bg-purple-100",
  },
]

export default function QuickStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm py-4 px-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 group cursor-default hover:scale-105 transition-transform"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-600 leading-tight truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
