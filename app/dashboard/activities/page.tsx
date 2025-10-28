"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import ActivityFeed from "@/components/dashboard/activities/activity-feed"
import LogActivityModal from "@/components/dashboard/activities/log-activity-modal"
import { Button } from "@/components/ui/button"
import { allActivities } from "@/lib/mock-data-extended"
import { Activity } from "@/lib/types/dashboard"

export default function ActivitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activities, setActivities] = useState<Activity[]>(allActivities.slice(0, 10))

  const handleSaveActivity = (newActivity: any) => {
    // Convert the activity to match the Activity type
    const formattedActivity: Activity = {
      id: newActivity.id,
      type: newActivity.type,
      customer: newActivity.customer,
      location: newActivity.location,
      outcome: newActivity.outcome,
      notes: newActivity.notes,
      orderValue: newActivity.orderValue,
      timestamp: newActivity.timestamp,
      rep: newActivity.rep,
    }

    setActivities([formattedActivity, ...activities])
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Activities</h1>
          <p className="text-slate-600 mt-1">
            Track all customer interactions across your team
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log New Activity
        </Button>
      </div>

      {/* Activity Feed */}
      <ActivityFeed
        externalActivities={activities}
        onActivitiesChange={setActivities}
      />

      {/* Log Activity Modal */}
      <LogActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveActivity}
      />
    </div>
  )
}
