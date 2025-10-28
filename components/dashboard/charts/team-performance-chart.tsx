"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { teamPerformanceData } from "@/lib/mock-data"
import ChartCard from "./chart-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function TeamPerformanceChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Sort by percentage (highest first) and take top 3
  const sortedData = [...teamPerformanceData]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{data.name}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-slate-700">
              Actual: <span className="font-semibold">{data.actual}</span>{" "}
              activities
            </p>
            <p className="text-sm text-slate-700">
              Target: <span className="font-semibold">{data.target}</span>
            </p>
            <p className="text-sm font-bold text-blue-600">
              {data.percentage}% of target
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return "#10B981" // green-500
    if (percentage >= 90) return "#3B82F6" // blue-500
    return "#94A3B8" // slate-400
  }

  const getBadgeColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-100 text-green-700"
    if (percentage >= 90) return "bg-blue-100 text-blue-700"
    return "bg-slate-100 text-slate-600"
  }

  return (
    <ChartCard
      title="Top Performers This Week"
      subtitle="Activity count vs target"
      index={1}
      footer={
        <Link
          href="/dashboard/analytics"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
        >
          View full leaderboard
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      }
    >
      <div className="space-y-5">
        {sortedData.map((rep, index) => (
          <div
            key={rep.name}
            className="group"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Rep Info */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-semibold flex-shrink-0">
                  {rep.initials}
                </div>
                <span className="text-sm font-medium text-slate-900 truncate">
                  {rep.name}
                </span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ml-2 flex-shrink-0 ${getBadgeColor(
                  rep.percentage
                )}`}
              >
                {rep.percentage}%
              </span>
            </div>

            {/* Progress Bars */}
            <div className="relative h-6">
              {/* Target Bar (background) */}
              <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-200 rounded-full transition-all duration-300"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Actual Bar (foreground) */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min((rep.actual / rep.target) * 100, 100)}%`,
                    backgroundColor: getBarColor(rep.percentage),
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              </div>

              {/* Labels */}
              <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium">
                <span className="text-slate-700">
                  {rep.actual}/{rep.target}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
