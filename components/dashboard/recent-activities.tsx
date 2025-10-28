"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, Mail, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Activity } from "@/lib/types/dashboard"
import { formatRelativeDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface RecentActivitiesProps {
  activities: Activity[]
}

const activityIcons = {
  call: Phone,
  visit: MapPin,
  email: Mail,
  meeting: Users,
}

const outcomeColors = {
  sale_closed: "bg-green-100 text-green-700",
  meeting_scheduled: "bg-blue-100 text-blue-700",
  interested: "bg-purple-100 text-purple-700",
  callback: "bg-amber-100 text-amber-700",
  not_interested: "bg-slate-100 text-slate-700",
}

const outcomeLabels = {
  sale_closed: "Sale Closed",
  meeting_scheduled: "Meeting Scheduled",
  interested: "Interested",
  callback: "Callback",
  not_interested: "Not Interested",
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
        <Link
          href="/dashboard/activities"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type]

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {activity.customer}
                  </p>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {formatRelativeDate(activity.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  By {activity.rep} • {activity.location}
                </p>
                <Badge variant="secondary" className={outcomeColors[activity.outcome]}>
                  {outcomeLabels[activity.outcome]}
                </Badge>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
