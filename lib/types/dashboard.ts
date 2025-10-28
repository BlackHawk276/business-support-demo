import { LucideIcon } from "lucide-react"

export interface KPICard {
  title: string
  value: string | number
  subtitle: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: LucideIcon
  color: "blue" | "green" | "red" | "purple" | "amber"
  progress?: {
    current: number
    target: number
  }
  urgent?: boolean
}

export interface Activity {
  id: string
  type: "call" | "visit" | "meeting" | "email"
  customer: string
  rep: string
  outcome: "interested" | "not_interested" | "callback" | "meeting_scheduled" | "sale_closed"
  timestamp: Date
  notes: string
  location: string
}

export interface Payment {
  id: string
  customer: string
  amount: number
  dueDate: Date
  status: "pending" | "overdue"
  agingDays: number
}

export interface SalesRep {
  id: string
  name: string
  avatar?: string
  initials: string
  activities: number
  target: number
  actual: number
  conversion: number
  lastActive: Date
}

export interface CompanyStats {
  totalOutstanding: number
  overduePayments: number
  activitiesToday: number
  activitiesThisWeek: number
  conversionRate: number
  totalCustomers: number
  activeSalesReps: number
}
