"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, Send, ArrowRight } from "lucide-react"
import { Payment } from "@/lib/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PaymentAlertsWidgetProps {
  payments: Payment[]
}

export default function PaymentAlertsWidget({ payments }: PaymentAlertsWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-slate-900">Payment Alerts</h3>
        </div>
        <Link
          href="/dashboard/payments"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate mb-1">
                {payment.customer}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-red-600">
                  {formatCurrency(payment.amount)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {payment.agingDays}d overdue
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
    </motion.div>
  )
}
