"use client"

import { X, Info } from "lucide-react"
import { useState, useEffect } from "react"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const dismissed = localStorage.getItem("demoBannerDismissed")
    if (dismissed) setIsVisible(false)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("demoBannerDismissed", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Demo Mode:</span> All data is
            simulated for demonstration purposes. Real data will sync from your
            systems in production.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-amber-600 hover:text-amber-900 transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
