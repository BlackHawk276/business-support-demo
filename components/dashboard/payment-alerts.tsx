"use client"

import { motion } from "framer-motion"
import { AlertCircle, Send } from "lucide-react"
import { Payment } from "@/lib/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PaymentAlertsProps {
  payments: Payment[]
}

export default function PaymentAlerts({ payments }: PaymentAlertsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-slate-900">Payment Alerts</h3>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 mb-1 truncate">
                {payment.customer}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  {formatCurrency(payment.amount)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {payment.agingDays} days overdue
                </Badge>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-xs ml-4"
            >
              <Send className="w-3 h-3" />
              Remind
            </Button>
          </motion.div>
        ))}
      </div>

      <Button variant="link" className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700">
        View all overdue payments →
      </Button>
    </motion.div>
  )
}
