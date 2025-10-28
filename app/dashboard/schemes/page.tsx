"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  TrendingUp,
  AlertCircle,
  Users,
  BarChart3,
  Clock,
  Package,
  Gift,
} from "lucide-react"
import { schemes as initialSchemes, schemeMetrics } from "@/lib/catalog-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { differenceInDays } from "date-fns"
import AddSchemeModal from "@/components/dashboard/schemes/add-scheme-modal"

export default function SchemesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [schemes, setSchemes] = useState(initialSchemes)

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || scheme.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSaveScheme = (newScheme: any) => {
    setSchemes([newScheme, ...schemes])
  }

  const metrics = [
    {
      label: "Active Schemes",
      value: schemeMetrics.activeSchemes.toString(),
      icon: TrendingUp,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Expiring Soon",
      value: schemeMetrics.expiringSchemes.toString(),
      icon: AlertCircle,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Scheme Mentions",
      value: schemeMetrics.totalMentions.toString(),
      icon: BarChart3,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Avg Discount",
      value: `${schemeMetrics.avgDiscount}%`,
      icon: Gift,
      color: "text-purple-600 bg-purple-100",
    },
  ]

  const getSchemeTypeLabel = (type: string) => {
    switch (type) {
      case "quantity":
        return "Quantity"
      case "cross_product":
        return "Cross Product"
      case "order_value":
        return "Order Value"
      default:
        return type
    }
  }

  const getSchemeTypeColor = (type: string) => {
    switch (type) {
      case "quantity":
        return "bg-blue-100 text-blue-700"
      case "cross_product":
        return "bg-purple-100 text-purple-700"
      case "order_value":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-l-4 border-green-500"
      case "expiring":
        return "border-l-4 border-amber-500"
      case "inactive":
        return "border-l-4 border-slate-300"
      default:
        return ""
    }
  }

  const getDaysRemaining = (endDate: Date) => {
    return differenceInDays(endDate, new Date())
  }

  const getSchemeDetails = (scheme: typeof schemes[0]) => {
    switch (scheme.type) {
      case "quantity":
        return `Buy ${scheme.details.buyQuantity} get ${scheme.details.freeQuantity} free`
      case "cross_product":
        return `Buy ${scheme.details.buyQuantity} ${scheme.details.product?.name}, get ${scheme.details.freeQuantity} ${scheme.details.crossProduct?.name} free`
      case "order_value":
        return `Orders above ${formatCurrency(scheme.details.minOrderValue || 0)} get ${scheme.details.discountValue}% off`
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Schemes & Promotions
          </h1>
          <p className="text-slate-600 mt-1">
            Create and manage promotional offers
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Scheme
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-slate-600">{metric.label}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="text-sm text-slate-600 flex items-center">
            Showing{" "}
            <span className="font-semibold mx-1">{filteredSchemes.length}</span>{" "}
            schemes
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow ${getStatusColor(scheme.status)}`}
          >
            {/* Scheme Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {scheme.name}
                </h3>
                <Badge
                  variant="secondary"
                  className={`${getSchemeTypeColor(scheme.type)} text-xs`}
                >
                  {getSchemeTypeLabel(scheme.type)}
                </Badge>
              </div>
            </div>

            {/* Validity */}
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <Clock className="w-4 h-4" />
              <span>
                {formatDate(scheme.startDate)} - {formatDate(scheme.endDate)}
              </span>
            </div>

            {scheme.status === "expiring" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                <p className="text-xs text-amber-700 font-medium">
                  Expiring in {getDaysRemaining(scheme.endDate)} days
                </p>
              </div>
            )}

            {/* Scheme Details */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-slate-700 font-medium">
                {getSchemeDetails(scheme)}
              </p>
            </div>

            {/* Performance */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Times Used:</span>
                <span className="font-semibold text-slate-900">
                  {scheme.performance.timesUsed}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Savings:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(scheme.performance.totalSavings)}
                </span>
              </div>
            </div>

            {/* Top Reps */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-slate-400" />
              <div className="flex -space-x-2">
                {scheme.performance.topReps.slice(0, 3).map((rep, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-700 text-xs font-semibold"
                  >
                    {rep.substring(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
          <p className="text-slate-600">No schemes found matching your filters.</p>
        </div>
      )}

      {/* Add Scheme Modal */}
      <AddSchemeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveScheme}
      />
    </div>
  )
}
