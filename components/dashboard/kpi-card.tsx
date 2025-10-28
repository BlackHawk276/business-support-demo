"use client"

import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import { KPICard as KPICardType } from "@/lib/types/dashboard"
import { cn } from "@/lib/utils"

interface KPICardProps {
  card: KPICardType
  index: number
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
  amber: "bg-amber-100 text-amber-600",
}

export default function KPICard({ card, index }: KPICardProps) {
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colorClasses[card.color])}>
          <Icon className="w-6 h-6" />
        </div>

        {card.urgent && (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">{card.title}</p>

        <motion.h3
          className="text-3xl font-bold text-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {card.value}
        </motion.h3>

        <p className="text-sm text-slate-500">{card.subtitle}</p>

        {card.progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Progress</span>
              <span>{Math.round((card.progress.current / card.progress.target) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(card.progress.current / card.progress.target) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </div>
        )}

        {card.trend && (
          <div className="flex items-center gap-1 mt-3">
            {card.trend.isPositive ? (
              <ArrowUp className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                card.trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {card.trend.value}% from last month
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
