"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { ReactNode } from "react"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  footer?: ReactNode
  index?: number
}

export default function ChartCard({
  title,
  subtitle,
  children,
  action,
  footer,
  index = 0,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>

      {/* Chart Content */}
      <div>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-100">{footer}</div>
      )}
    </motion.div>
  )
}
