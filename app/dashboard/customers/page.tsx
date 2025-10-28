"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Upload,
  Download,
  Search,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { customers as initialCustomers, customerMetrics, cities } from "@/lib/customers-data"
import { Customer } from "@/lib/types/customers"
import { formatCurrency, formatRelativeDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter

    const matchesCity = cityFilter === "all" || customer.city === cityFilter

    return matchesSearch && matchesStatus && matchesCity
  })

  const metrics = [
    {
      label: "Total Customers",
      value: customerMetrics.totalCustomers.toString(),
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Active Customers",
      value: customerMetrics.activeCustomers.toString(),
      subtitle: "last 30 days",
      color: "text-green-600 bg-green-100",
    },
    {
      label: "High Value",
      value: customerMetrics.highValueCustomers.toString(),
      subtitle: ">₹5L outstanding",
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "New This Month",
      value: customerMetrics.newThisMonth.toString(),
      color: "text-amber-600 bg-amber-100",
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRowBgColor = (customer: Customer) => {
    if (customer.outstanding > 200000) return "bg-red-50"
    if (customer.status === "inactive") return "bg-slate-100"
    const daysSinceCreated =
      (new Date().getTime() - customer.createdAt.getTime()) /
      (1000 * 60 * 60 * 24)
    if (daysSinceCreated < 7) return "bg-green-50"
    return "bg-white"
  }

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsQuickViewOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Customer Management
          </h1>
          <p className="text-slate-600 mt-1">
            View and manage your customer database
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import from Tally
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center flex-shrink-0`}
              >
                <div className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {metric.value}
                </p>
                <p className="text-sm text-slate-600">{metric.label}</p>
                {metric.subtitle && (
                  <p className="text-xs text-slate-500">{metric.subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <div className="text-sm text-slate-600 flex items-center">
            Showing{" "}
            <span className="font-semibold mx-1">{filteredCustomers.length}</span>{" "}
            customers
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Outstanding
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Credit Limit
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`${getRowBgColor(customer)} hover:bg-slate-50 transition-colors cursor-pointer`}
                  onClick={() => handleRowClick(customer)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {getInitials(customer.name)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {customer.name}
                        </p>
                        {customer.tallyId && (
                          <p className="text-xs text-slate-500">
                            {customer.tallyId}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-900">
                        {customer.contactPerson}
                      </p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${customer.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-700">{customer.city}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p
                      className={`text-sm font-semibold ${
                        customer.outstanding > 200000
                          ? "text-red-600"
                          : "text-slate-900"
                      }`}
                    >
                      {formatCurrency(customer.outstanding)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">
                      {formatRelativeDate(customer.lastActivity)}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="text-sm text-slate-700">
                      {formatCurrency(customer.creditLimit)}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant="secondary"
                      className={
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }
                    >
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(customer)
                        }}
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-600">
              No customers found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Quick View Sidebar */}
      {isQuickViewOpen && selectedCustomer && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsQuickViewOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-96 bg-white z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {getInitials(selectedCustomer.name)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {selectedCustomer.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {selectedCustomer.contactPerson}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsQuickViewOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedCustomer.phone}
                  </a>
                  <a
                    href={`mailto:${selectedCustomer.email}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedCustomer.email}
                  </a>
                  <p className="text-sm text-slate-600">
                    📍 {selectedCustomer.city}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs text-slate-600 uppercase">
                    Outstanding
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(selectedCustomer.outstanding)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase">
                    Credit Limit
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(selectedCustomer.creditLimit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase">
                    Utilization
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {Math.round(
                      (selectedCustomer.outstanding /
                        selectedCustomer.creditLimit) *
                        100
                    )}
                    %
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Company Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">GST Number:</span>
                      <span className="text-slate-900 font-mono">
                        {selectedCustomer.gstNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Address:</span>
                      <span className="text-slate-900 text-right">
                        {selectedCustomer.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Payment Terms:</span>
                      <span className="text-slate-900">
                        {selectedCustomer.paymentTerms}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Account Created:</span>
                      <span className="text-slate-900">
                        {selectedCustomer.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    {selectedCustomer.tallyId && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tally ID:</span>
                        <span className="text-slate-900 font-mono">
                          {selectedCustomer.tallyId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Activities */}
                {selectedCustomer.activities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                      Recent Activities
                    </h4>
                    <div className="space-y-2">
                      {selectedCustomer.activities.slice(0, 5).map((activity, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 rounded-lg text-sm"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-slate-900 capitalize">
                              {activity.type}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatRelativeDate(activity.date)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">
                            by {activity.rep}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-xs mt-1 bg-green-100 text-green-700"
                          >
                            {activity.outcome}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Payments */}
                {selectedCustomer.payments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                      Recent Payments
                    </h4>
                    <div className="space-y-2">
                      {selectedCustomer.payments.slice(0, 5).map((payment, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-3 bg-slate-50 rounded-lg text-sm"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-xs text-slate-600">
                              {payment.method} • {payment.invoiceNumber}
                            </p>
                          </div>
                          <span className="text-xs text-slate-500">
                            {formatRelativeDate(payment.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="space-y-2 pt-4 border-t border-slate-200">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Edit Customer
                </button>
                <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                  Send Reminder
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
