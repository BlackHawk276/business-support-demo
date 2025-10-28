"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"
import { SalesRep } from "@/lib/types/dashboard"

interface TeamPerformanceWidgetProps {
  topPerformers: SalesRep[]
}

export default function TeamPerformanceWidget({ topPerformers }: TeamPerformanceWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-slate-900">Top Performers</h3>
        </div>
        <Link
          href="/dashboard/analytics"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
        >
          View analytics
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {topPerformers.map((rep, index) => {
          const percentage = Math.round((rep.actual / rep.target) * 100)

          return (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {rep.initials}
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="absolute -top-1 -right-1 text-xl">🥇</span>
                    )}
                    {index === 1 && (
                      <span className="absolute -top-1 -right-1 text-xl">🥈</span>
                    )}
                    {index === 2 && (
                      <span className="absolute -top-1 -right-1 text-xl">🥉</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{rep.name}</p>
                    <p className="text-xs text-slate-500">
                      {rep.actual} / {rep.target} deals
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${percentage >= 80 ? "text-green-600" : "text-amber-600"}`}>
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${percentage >= 80 ? "bg-green-600" : "bg-amber-600"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 + 0.2 }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
