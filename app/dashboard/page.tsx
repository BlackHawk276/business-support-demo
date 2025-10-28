"use client"

import { useState, useEffect } from "react"
import { IndianRupee, Activity, AlertCircle, TrendingUp } from "lucide-react"
import KPICard from "@/components/dashboard/kpi-card"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentActivitiesWidget from "@/components/dashboard/overview/recent-activities-widget"
import TeamPerformanceWidget from "@/components/dashboard/overview/team-performance-widget"
import PaymentAlertsWidget from "@/components/dashboard/overview/payment-alerts-widget"
import QuickStats from "@/components/dashboard/overview/quick-stats"
import PaymentAgingChart from "@/components/dashboard/charts/payment-aging-chart"
import TeamPerformanceChart from "@/components/dashboard/charts/team-performance-chart"
import ActivityTrendsChart from "@/components/dashboard/charts/activity-trends-chart"
import { KPICard as KPICardType } from "@/lib/types/dashboard"
import {
  companyStats,
  getRecentActivitiesLimit,
  getMostOverduePayments,
  getTopPerformers,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { PageTransition } from "@/components/page-transition"
import { SkeletonCardGrid } from "@/components/ui/skeleton-card"
import { SkeletonChart } from "@/components/ui/skeleton-chart"
import { SkeletonActivity } from "@/components/ui/skeleton-activity"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const kpiCards: KPICardType[] = [
    {
      title: "Total Outstanding",
      value: formatCurrency(companyStats.totalOutstanding),
      subtitle: `Across 45 customers`,
      trend: {
        value: 5,
        isPositive: true,
      },
      icon: IndianRupee,
      color: "blue",
    },
    {
      title: "Activities Today",
      value: companyStats.activitiesToday,
      subtitle: "Target: 50",
      progress: {
        current: companyStats.activitiesToday,
        target: 50,
      },
      icon: Activity,
      color: "green",
    },
    {
      title: "Overdue Payments",
      value: formatCurrency(companyStats.overduePayments),
      subtitle: "23 customers",
      trend: {
        value: 12,
        isPositive: false,
      },
      icon: AlertCircle,
      color: "red",
      urgent: true,
    },
    {
      title: "Conversion Rate",
      value: `${companyStats.conversionRate}%`,
      subtitle: "This month",
      trend: {
        value: 3,
        isPositive: true,
      },
      icon: TrendingUp,
      color: "purple",
    },
  ]

  const recentActivities = getRecentActivitiesLimit(5)
  const overduePayments = getMostOverduePayments(3)
  const topPerformers = getTopPerformers(3)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonCardGrid count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkeletonActivity />
            <SkeletonChart />
          </div>
          <div className="space-y-6">
            <SkeletonChart height={200} />
            <SkeletonChart height={200} />
            <SkeletonActivity count={3} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((card, index) => (
            <KPICard key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* Quick Stats Bar - Moved up here */}
        <QuickStats />

        {/* Main Content Grid: Left Column + Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activities & Activity Trends (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivitiesWidget activities={recentActivities} />
            <ActivityTrendsChart />
          </div>

          {/* Right Column - Charts & Widgets (1/3 width) */}
          <div className="space-y-6">
            <PaymentAgingChart />
            <TeamPerformanceChart />
            <PaymentAlertsWidget payments={overduePayments} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
