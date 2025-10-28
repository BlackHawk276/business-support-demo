"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"

export function DemoControls() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "d") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50 w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">Demo Controls</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => {
            toast.success("Activity Added", {
              description: "New sales call logged by Rahul Sharma",
            })
          }}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-all duration-200 active:scale-95"
        >
          Add Random Activity
        </button>
        <button
          onClick={() => {
            toast.success("Payment Received", {
              description: "₹50,000 received from ABC Corporation Ltd",
            })
          }}
          className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-all duration-200 active:scale-95"
        >
          Simulate Payment
        </button>
        <button
          onClick={() => {
            toast.info("Reminder Sent", {
              description: "Payment reminder sent via WhatsApp",
            })
          }}
          className="w-full px-3 py-2 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 transition-all duration-200 active:scale-95"
        >
          Send Test Reminder
        </button>
        <button
          onClick={() => {
            localStorage.clear()
            toast.success("Demo Reset", {
              description: "Refreshing page...",
            })
            setTimeout(() => window.location.reload(), 1000)
          }}
          className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all duration-200 active:scale-95"
        >
          Reset Demo
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-3 text-center">
        Press Cmd+Shift+D to toggle
      </p>
    </div>
  )
}
