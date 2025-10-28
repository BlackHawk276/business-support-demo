"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  IndianRupee,
  AlertCircle,
  Calendar,
  TrendingUp,
  Search,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react"
import { outstandingPaymentsData, paymentMetrics } from "@/lib/payments-data"
import { formatCurrency, formatDate, getAgingBucketColor, formatDaysOverdue } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import KPICard from "@/components/dashboard/kpi-card"
import { KPICard as KPICardType } from "@/lib/types/dashboard"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [agingFilter, setAgingFilter] = useState<string>("all")

  // Filter payments
  const filteredPayments = outstandingPaymentsData.filter((payment) => {
    const matchesSearch =
      payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "overdue" && payment.status === "overdue") ||
      (statusFilter === "due_soon" && payment.status === "due_soon") ||
      (statusFilter === "current" && payment.status === "current")

    const matchesAging =
      agingFilter === "all" ||
      payment.agingBucket === agingFilter

    return matchesSearch && matchesStatus && matchesAging
  })

  const kpiCards: KPICardType[] = [
    {
      title: "Total Outstanding",
      value: formatCurrency(paymentMetrics.totalOutstanding),
      subtitle: `${outstandingPaymentsData.length} customers`,
      trend: {
        value: 5,
        isPositive: true,
      },
      icon: IndianRupee,
      color: "blue",
    },
    {
      title: "Overdue Amount",
      value: formatCurrency(paymentMetrics.overdueAmount),
      subtitle: `${paymentMetrics.overdueCount} customers`,
      icon: AlertCircle,
      color: "red",
      urgent: true,
    },
    {
      title: "Due This Week",
      value: formatCurrency(paymentMetrics.dueThisWeek),
      subtitle: `${paymentMetrics.dueThisWeekCount} customers`,
      icon: Calendar,
      color: "amber",
    },
    {
      title: "Collection Rate",
      value: `${paymentMetrics.collectionRate}%`,
      subtitle: "This month",
      trend: {
        value: 3,
        isPositive: true,
      },
      icon: TrendingUp,
      color: "green",
    },
  ]

  const getRowBgColor = (payment: typeof outstandingPaymentsData[0]) => {
    if (payment.agingDays >= 90) return "bg-red-50"
    if (payment.agingDays >= 60) return "bg-orange-50"
    if (payment.agingDays > 0 && payment.agingDays < 7) return "bg-amber-50"
    return "bg-white"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
        <p className="text-slate-600 mt-1">
          Track outstanding payments and manage collections
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <KPICard key={card.title} card={card} index={index} />
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="overdue">Overdue</option>
            <option value="due_soon">Due Soon</option>
            <option value="current">Current</option>
          </select>

          {/* Aging Filter */}
          <select
            value={agingFilter}
            onChange={(e) => setAgingFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Aging</option>
            <option value="0-30 days">0-30 days</option>
            <option value="30-60 days">30-60 days</option>
            <option value="60-90 days">60-90 days</option>
            <option value="90+ days">90+ days</option>
          </select>

          <div className="text-sm text-slate-600 flex items-center">
            Showing <span className="font-semibold mx-1">{filteredPayments.length}</span> payments
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Invoices
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Aging
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`${getRowBgColor(payment)} hover:bg-slate-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                        {payment.customer.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {payment.customer.name}
                        </p>
                        <p className="text-xs text-slate-600 truncate">
                          {payment.customer.contactPerson}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <a
                        href={`tel:${payment.customer.phone}`}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                      >
                        <Phone className="w-3 h-3" />
                        {payment.customer.phone}
                      </a>
                      <a
                        href={`mailto:${payment.customer.email}`}
                        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-700"
                      >
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{payment.customer.email}</span>
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-600">
                      {payment.invoices.map((inv, i) => (
                        <div key={inv} className="truncate">
                          {inv}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(payment.amount)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-slate-900">{formatDate(payment.dueDate)}</p>
                      {payment.agingDays > 0 && (
                        <p className="text-xs text-red-600 font-medium">
                          {formatDaysOverdue(payment.agingDays)}
                        </p>
                      )}
                      {payment.agingDays < 0 && (
                        <p className="text-xs text-green-600">
                          {formatDaysOverdue(payment.agingDays)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={`${getAgingBucketColor(payment.agingBucket)} text-xs`}
                    >
                      {payment.agingBucket}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1">
                      View Details
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-600">No payments found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
