"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { paymentAgingData } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import ChartCard from "./chart-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PaymentAgingChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const total = paymentAgingData.reduce((sum, item) => sum + item.amount, 0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{data.bucket}</p>
          <p className="text-lg font-bold text-slate-900 mt-1">
            {formatCurrency(data.amount)}
          </p>
          <p className="text-sm text-slate-600">{data.percentage}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <ChartCard
      title="Payment Aging Analysis"
      subtitle="Outstanding by aging bucket"
      index={0}
      footer={
        <Link
          href="/dashboard/payments"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          View all payments
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      }
    >
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-full max-w-[220px] mx-auto">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={paymentAgingData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                dataKey="amount"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={1000}
              >
                {paymentAgingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    className="cursor-pointer transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-slate-600 font-medium">Total</p>
            <p className="text-base font-bold text-slate-900">
              {formatCurrency(total)}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2 mt-4">
          {paymentAgingData.map((item, index) => (
            <div
              key={item.bucket}
              className="flex items-center justify-between group cursor-pointer py-1"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-slate-700 font-medium truncate">
                  {item.bucket}
                </span>
              </div>
              <div className="text-right ml-2 flex-shrink-0">
                <p className="text-xs font-semibold text-slate-900">
                  {formatCurrency(item.amount)}
                </p>
                <p className="text-xs text-slate-500">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}
