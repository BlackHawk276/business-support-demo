"use client"

import { Phone, MapPin, Calendar, Mail, LayoutList } from "lucide-react"
import { Activity } from "@/lib/types/dashboard"
import { cn } from "@/lib/utils"

interface ActivityFiltersProps {
  activeFilter: Activity["type"] | "all"
  onFilterChange: (filter: Activity["type"] | "all") => void
}

const filters = [
  { id: "all" as const, label: "All", icon: LayoutList },
  { id: "call" as const, label: "Calls", icon: Phone },
  { id: "visit" as const, label: "Visits", icon: MapPin },
  { id: "meeting" as const, label: "Meetings", icon: Calendar },
  { id: "email" as const, label: "Emails", icon: Mail },
]

export default function ActivityFilters({ activeFilter, onFilterChange }: ActivityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = activeFilter === filter.id

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        )
      })}
    </div>
  )
}
