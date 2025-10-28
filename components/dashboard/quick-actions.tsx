"use client"

import { motion } from "framer-motion"
import { Activity, Users, IndianRupee, FileText } from "lucide-react"

const actions = [
  {
    name: "Send Reminder",
    icon: IndianRupee,
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  {
    name: "Log Activity",
    icon: Activity,
    color: "bg-green-50 text-green-600 hover:bg-green-100",
  },
  {
    name: "Add Customer",
    icon: Users,
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  },
  {
    name: "View Reports",
    icon: FileText,
    color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
]

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg ${action.color} transition-colors flex flex-col items-center justify-center gap-2`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.name}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
