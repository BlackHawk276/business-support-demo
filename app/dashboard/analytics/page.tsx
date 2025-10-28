"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Target,
  Award,
  Download,
} from "lucide-react"
import {
  analyticsMetrics,
  categoryRevenueData,
  paymentStatusData,
  topCustomersData,
  teamLeaderboardData,
} from "@/lib/analytics-data"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Total Revenue",
      value: formatCurrency(analyticsMetrics.totalRevenue),
      subtitle: "this period",
      icon: TrendingUp,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Collection Rate",
      value: `${analyticsMetrics.collectionRate}%`,
      subtitle: "+5% from last month",
      icon: Target,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Active Customers",
      value: analyticsMetrics.activeCustomers.toString(),
      icon: Users,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(analyticsMetrics.avgOrderValue),
      icon: ShoppingCart,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Team Productivity",
      value: `${analyticsMetrics.teamProductivity}%`,
      icon: Award,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      label: "Customer Retention",
      value: `${analyticsMetrics.customerRetention}%`,
      icon: Users,
      color: "text-pink-600 bg-pink-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics & Reports
          </h1>
          <p className="text-slate-600 mt-1">
            Business intelligence and insights
          </p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-slate-600">{metric.label}</p>
                  {metric.subtitle && (
                    <p className="text-xs text-slate-500 mt-1">
                      {metric.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Sales by Category
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Top performing product categories
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={120} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Top Customers by Revenue
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {topCustomersData.slice(0, 10).map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {customer.name}
                      </p>
                      <p className="text-xs text-slate-600">
                        {customer.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(customer.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Payment Status
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {paymentStatusData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-700">{item.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {item.value}%
                    </p>
                    <p className="text-xs text-slate-600">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Team Leaderboard
            </h3>
            <div className="space-y-3">
              {teamLeaderboardData.map((member, index) => (
                <div
                  key={member.name}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {member.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {member.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span>{formatCurrency(member.revenue)}</span>
                      <span>•</span>
                      <span>{member.conversion}% conv.</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-600">
                      {member.activities} acts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
