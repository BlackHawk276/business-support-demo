"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, MapPin, Calendar, Mail, ArrowRight } from "lucide-react"
import { Activity } from "@/lib/types/dashboard"
import { formatRelativeDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface RecentActivitiesWidgetProps {
  activities: Activity[]
}

const activityIcons = {
  call: Phone,
  visit: MapPin,
  meeting: Calendar,
  email: Mail,
}

const outcomeColors = {
  sale_closed: "bg-emerald-100 text-emerald-700",
  meeting_scheduled: "bg-blue-100 text-blue-700",
  interested: "bg-green-100 text-green-700",
  callback: "bg-amber-100 text-amber-700",
  not_interested: "bg-slate-100 text-slate-700",
}

const outcomeLabels = {
  sale_closed: "Sale Closed",
  meeting_scheduled: "Meeting",
  interested: "Interested",
  callback: "Callback",
  not_interested: "Not Interested",
}

export default function RecentActivitiesWidget({ activities }: RecentActivitiesWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
        <Link
          href="/dashboard/activities"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type]

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {activity.customer}
                  </p>
                  <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
                    {formatRelativeDate(activity.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs text-slate-600">
                    {activity.rep}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`${outcomeColors[activity.outcome]} text-xs px-2 py-0`}
                  >
                    {outcomeLabels[activity.outcome]}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
