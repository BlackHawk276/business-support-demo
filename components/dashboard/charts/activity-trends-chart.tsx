"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { activityTrendsData } from "@/lib/mock-data"
import ChartCard from "./chart-card"
import Link from "next/link"
import { ArrowRight, Phone, Users, Calendar, Mail } from "lucide-react"

const activityTypes = [
  { key: "calls", label: "Calls", color: "#3B82F6", icon: Phone },
  { key: "visits", label: "Visits", color: "#10B981", icon: Users },
  { key: "meetings", label: "Meetings", color: "#8B5CF6", icon: Calendar },
  { key: "emails", label: "Emails", color: "#F59E0B", icon: Mail },
]

export default function ActivityTrendsChart() {
  const [hiddenLines, setHiddenLines] = useState<string[]>([])

  const toggleLine = (key: string) => {
    setHiddenLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2.5 rounded-lg shadow-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any) => (
              <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.stroke }}
                />
                <span className="text-slate-700 capitalize">{entry.name}:</span>
                <span className="font-semibold text-slate-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  const CustomLegend = () => (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      {activityTypes.map(({ key, label, color, icon: Icon }) => (
        <button
          key={key}
          onClick={() => toggleLine(key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            hiddenLines.includes(key)
              ? "bg-slate-100 text-slate-400"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: hiddenLines.includes(key) ? "#94A3B8" : color,
            }}
          />
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  )

  const totalActivities = activityTrendsData.reduce(
    (sum, day) => sum + day.calls + day.visits + day.meetings + day.emails,
    0
  )

  return (
    <ChartCard
      title="Activity Trends"
      subtitle="Last 7 days"
      index={1}
      footer={
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Total: <span className="font-semibold text-slate-900">{totalActivities}</span> activities
          </p>
          <Link
            href="/dashboard/activities"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
          >
            View all activities
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      }
    >
      <div className="w-full">
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={activityTrendsData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

              <XAxis
                dataKey="day"
                tick={{ fill: "#64748B", fontSize: 11 }}
                tickLine={{ stroke: "#E2E8F0" }}
                stroke="#CBD5E1"
              />

              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                tickLine={{ stroke: "#E2E8F0" }}
                stroke="#CBD5E1"
                width={35}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Each Area is independent, NOT stacked */}
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorCalls)"
                name="Calls"
                hide={hiddenLines.includes("calls")}
                animationDuration={800}
                dot={false}
              />

              <Area
                type="monotone"
                dataKey="visits"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#colorVisits)"
                name="Visits"
                hide={hiddenLines.includes("visits")}
                animationDuration={800}
                dot={false}
              />

              <Area
                type="monotone"
                dataKey="meetings"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#colorMeetings)"
                name="Meetings"
                hide={hiddenLines.includes("meetings")}
                animationDuration={800}
                dot={false}
              />

              <Area
                type="monotone"
                dataKey="emails"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#colorEmails)"
                name="Emails"
                hide={hiddenLines.includes("emails")}
                animationDuration={800}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </div>
    </ChartCard>
  )
}
