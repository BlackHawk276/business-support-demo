"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Search, Zap, ZapOff } from "lucide-react"
import ActivityCard from "./activity-card"
import ActivityFilters from "./activity-filters"
import { Activity } from "@/lib/types/dashboard"
import {
  allActivities,
  generateRandomActivity,
  filterActivitiesByType,
  searchActivities,
} from "@/lib/mock-data-extended"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ActivityFeedProps {
  externalActivities?: Activity[]
  onActivitiesChange?: (activities: Activity[]) => void
}

export default function ActivityFeed({ externalActivities, onActivitiesChange }: ActivityFeedProps = {}) {
  const [activities, setActivities] = useState<Activity[]>(externalActivities || allActivities.slice(0, 10))
  const [activeFilter, setActiveFilter] = useState<Activity["type"] | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLiveEnabled, setIsLiveEnabled] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(10)
  const [newActivityId, setNewActivityId] = useState<string | null>(null)

  // Filter and search activities
  const filteredActivities = useCallback(() => {
    let filtered = activities

    // Apply type filter
    if (activeFilter !== "all") {
      filtered = filterActivitiesByType(filtered, activeFilter)
    }

    // Apply search
    if (searchQuery) {
      filtered = searchActivities(filtered, searchQuery)
    }

    return filtered
  }, [activities, activeFilter, searchQuery])

  // Sync external activities
  useEffect(() => {
    if (externalActivities) {
      setActivities(externalActivities)
    }
  }, [externalActivities])

  // Notify parent of changes
  useEffect(() => {
    if (onActivitiesChange) {
      onActivitiesChange(activities)
    }
  }, [activities, onActivitiesChange])

  // Real-time simulation
  useEffect(() => {
    if (!isLiveEnabled) return

    const interval = setInterval(() => {
      const newActivity = generateRandomActivity()
      setNewActivityId(newActivity.id)
      setActivities((prev) => [newActivity, ...prev])

      // Clear new indicator after 3 seconds
      setTimeout(() => setNewActivityId(null), 3000)
    }, 15000) // New activity every 15 seconds

    return () => clearInterval(interval)
  }, [isLiveEnabled])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      // Simulate refresh by regenerating
      setActivities(allActivities.slice(0, displayedCount))
      setIsRefreshing(false)
    }, 500)
  }

  const handleLoadMore = () => {
    const newCount = displayedCount + 10
    setDisplayedCount(newCount)
    setActivities(allActivities.slice(0, newCount))
  }

  const toggleLiveUpdates = () => {
    setIsLiveEnabled(!isLiveEnabled)
  }

  const displayed = filteredActivities()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Team Activity Feed
              {isLiveEnabled && (
                <Badge className="bg-green-500 text-white animate-pulse">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Live
                </Badge>
              )}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Real-time updates from your sales team
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLiveUpdates}
              className={isLiveEnabled ? "bg-green-50 border-green-200" : ""}
            >
              {isLiveEnabled ? (
                <>
                  <Zap className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-green-600">Live On</span>
                </>
              ) : (
                <>
                  <ZapOff className="w-4 h-4 mr-2" />
                  <span>Enable Live</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search customers, reps, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <ActivityFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Activity List */}
      <div className="p-6">
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {displayed.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="text-slate-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">No activities found</p>
                  <p className="text-sm">Try adjusting your filters or search query</p>
                </div>
              </motion.div>
            ) : (
              displayed.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                  isNew={activity.id === newActivityId}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {!searchQuery && activeFilter === "all" && displayed.length > 0 && displayedCount < allActivities.length && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="w-full sm:w-auto"
            >
              Load More Activities
            </Button>
          </div>
        )}

        {/* Activity Count */}
        <div className="mt-4 text-center text-sm text-slate-500">
          Showing {displayed.length} {displayed.length === 1 ? "activity" : "activities"}
        </div>
      </div>
    </div>
  )
}
