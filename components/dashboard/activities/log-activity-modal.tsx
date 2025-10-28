"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MapPin, Mail, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LogActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (activity: any) => void
}

export default function LogActivityModal({
  isOpen,
  onClose,
  onSave,
}: LogActivityModalProps) {
  const [formData, setFormData] = useState({
    type: "call" as "call" | "visit" | "meeting" | "email",
    customerId: "",
    customerName: "",
    outcome: "",
    notes: "",
    orderValue: "",
    nextFollowUp: "",
  })

  const activityTypes = [
    {
      type: "call" as const,
      label: "Phone Call",
      icon: Phone,
      color: "bg-blue-100 text-blue-700",
    },
    {
      type: "visit" as const,
      label: "Store Visit",
      icon: MapPin,
      color: "bg-green-100 text-green-700",
    },
    {
      type: "meeting" as const,
      label: "Meeting",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-700",
    },
    {
      type: "email" as const,
      label: "Email",
      icon: Mail,
      color: "bg-amber-100 text-amber-700",
    },
  ]

  const outcomes = [
    { value: "sale_closed", label: "Sale Closed", color: "bg-green-100 text-green-700" },
    { value: "meeting_scheduled", label: "Meeting Scheduled", color: "bg-blue-100 text-blue-700" },
    { value: "interested", label: "Interested", color: "bg-purple-100 text-purple-700" },
    { value: "callback", label: "Callback Required", color: "bg-amber-100 text-amber-700" },
    { value: "not_interested", label: "Not Interested", color: "bg-red-100 text-red-700" },
  ]

  const customers = [
    { id: "c1", name: "ABC Corporation Ltd", location: "Mumbai" },
    { id: "c2", name: "Sharma General Store", location: "Delhi" },
    { id: "c3", name: "City Mart Retail", location: "Bangalore" },
    { id: "c4", name: "Kumar Enterprises", location: "Chennai" },
    { id: "c5", name: "Modern Trade Co", location: "Pune" },
    { id: "c6", name: "Patel Brothers", location: "Ahmedabad" },
    { id: "c7", name: "Premium Stores Ltd", location: "Hyderabad" },
    { id: "c8", name: "Metro Retail Chain", location: "Kolkata" },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    const customer = customers.find((c) => c.id === formData.customerId)
    const outcome = outcomes.find((o) => o.value === formData.outcome)

    const newActivity = {
      id: Date.now().toString(),
      type: formData.type,
      customer: customer ? customer.name : "",
      location: customer ? customer.location : "",
      outcome: outcome ? outcome.label : "",
      notes: formData.notes,
      orderValue: formData.orderValue ? parseFloat(formData.orderValue) : null,
      timestamp: new Date(),
      rep: "You", // Current user
      nextFollowUp: formData.nextFollowUp ? new Date(formData.nextFollowUp) : null,
    }

    onSave(newActivity)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      type: "call",
      customerId: "",
      customerName: "",
      outcome: "",
      notes: "",
      orderValue: "",
      nextFollowUp: "",
    })
    onClose()
  }

  const isFormValid = () => {
    return formData.customerId && formData.outcome
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Log New Activity
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Record customer interaction
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Activity Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Activity Type *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {activityTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.type}
                          onClick={() =>
                            setFormData({ ...formData, type: type.type })
                          }
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            formData.type === type.type
                              ? "border-blue-600 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-medium text-slate-700">
                            {type.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Customer Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Customer *
                  </label>
                  <select
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Outcome */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Outcome *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {outcomes.map((outcome) => (
                      <button
                        key={outcome.value}
                        onClick={() =>
                          setFormData({ ...formData, outcome: outcome.value })
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                          formData.outcome === outcome.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {outcome.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.outcome === "sale_closed" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Order Value (₹)
                    </label>
                    <input
                      type="number"
                      name="orderValue"
                      value={formData.orderValue}
                      onChange={handleInputChange}
                      placeholder="e.g., 25000"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {(formData.outcome === "callback" ||
                  formData.outcome === "meeting_scheduled") && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Next Follow-up Date
                    </label>
                    <input
                      type="datetime-local"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Add any additional details about this interaction..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-600">
                  {!isFormValid() && (
                    <span className="text-amber-600">
                      * Select customer and outcome to continue
                    </span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isFormValid()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Log Activity
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
