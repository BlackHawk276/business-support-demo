"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, Calendar, Mail, IndianRupee, MoreVertical } from "lucide-react"
import { Activity } from "@/lib/types/dashboard"
import { formatRelativeDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: Activity
  index: number
  isNew?: boolean
}

const activityIcons = {
  call: Phone,
  visit: MapPin,
  meeting: Calendar,
  email: Mail,
}

const activityColors = {
  call: "bg-blue-100 text-blue-600 border-blue-500",
  visit: "bg-green-100 text-green-600 border-green-500",
  meeting: "bg-purple-100 text-purple-600 border-purple-500",
  email: "bg-orange-100 text-orange-600 border-orange-500",
}

const outcomeColors = {
  sale_closed: "bg-emerald-100 text-emerald-700 border-emerald-300",
  meeting_scheduled: "bg-blue-100 text-blue-700 border-blue-300",
  interested: "bg-green-100 text-green-700 border-green-300",
  callback: "bg-amber-100 text-amber-700 border-amber-300",
  not_interested: "bg-slate-100 text-slate-700 border-slate-300",
}

const outcomeLabels = {
  sale_closed: "Sale Closed",
  meeting_scheduled: "Meeting Scheduled",
  interested: "Interested",
  callback: "Callback",
  not_interested: "Not Interested",
}

export default function ActivityCard({ activity, index, isNew }: ActivityCardProps) {
  const Icon = activityIcons[activity.type]
  const colorClass = activityColors[activity.type]
  const borderColor = colorClass.split(" ")[2]

  return (
    <motion.div
      initial={{ opacity: 0, y: isNew ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: isNew ? 0 : index * 0.05 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border-l-4 transition-all duration-200 hover:shadow-md group",
        borderColor,
        isNew && "animate-pulse"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Activity Icon */}
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", colorClass.split(" ").slice(0, 2).join(" "))}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900">
                  {activity.rep}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">
                  {formatRelativeDate(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-2">
                {activity.type === "call" && "called "}
                {activity.type === "visit" && "visited "}
                {activity.type === "meeting" && "scheduled meeting with "}
                {activity.type === "email" && "emailed "}
                <span className="font-medium text-blue-600 cursor-pointer hover:underline">
                  {activity.customer}
                </span>
              </p>
              <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                {activity.notes}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                <span>{activity.location}</span>
              </div>
            </div>

            {/* Actions (show on hover) */}
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Outcome Badge */}
          <div className="mt-3">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium border", outcomeColors[activity.outcome])}
            >
              {activity.outcome === "sale_closed" && "✓ "}
              {outcomeLabels[activity.outcome]}
            </Badge>
          </div>
        </div>
      </div>

      {/* New Activity Indicator */}
      {isNew && (
        <div className="absolute top-2 right-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      )}
    </motion.div>
  )
}
