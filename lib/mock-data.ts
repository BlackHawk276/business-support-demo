import { Activity, Payment, SalesRep, CompanyStats } from "./types/dashboard"
import { subDays, subHours, subMinutes, addDays } from "date-fns"

// Company Stats
export const companyStats: CompanyStats = {
  totalOutstanding: 1250000, // ₹12,50,000
  overduePayments: 420000, // ₹4,20,000
  activitiesToday: 47,
  activitiesThisWeek: 203,
  conversionRate: 34,
  totalCustomers: 156,
  activeSalesReps: 8,
}

// Mock Sales Reps
export const salesReps: SalesRep[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    initials: "RS",
    activities: 45,
    target: 50,
    actual: 38,
    conversion: 42,
    lastActive: subMinutes(new Date(), 15),
  },
  {
    id: "2",
    name: "Priya Patel",
    initials: "PP",
    activities: 52,
    target: 50,
    actual: 42,
    conversion: 38,
    lastActive: subHours(new Date(), 2),
  },
  {
    id: "3",
    name: "Amit Kumar",
    initials: "AK",
    activities: 38,
    target: 50,
    actual: 30,
    conversion: 35,
    lastActive: subHours(new Date(), 4),
  },
  {
    id: "4",
    name: "Sneha Reddy",
    initials: "SR",
    activities: 41,
    target: 50,
    actual: 35,
    conversion: 40,
    lastActive: subMinutes(new Date(), 45),
  },
  {
    id: "5",
    name: "Vikram Singh",
    initials: "VS",
    activities: 35,
    target: 50,
    actual: 28,
    conversion: 32,
    lastActive: subHours(new Date(), 6),
  },
  {
    id: "6",
    name: "Anjali Desai",
    initials: "AD",
    activities: 48,
    target: 50,
    actual: 40,
    conversion: 36,
    lastActive: subMinutes(new Date(), 30),
  },
  {
    id: "7",
    name: "Rajesh Gupta",
    initials: "RG",
    activities: 43,
    target: 50,
    actual: 36,
    conversion: 34,
    lastActive: subHours(new Date(), 3),
  },
  {
    id: "8",
    name: "Kavita Menon",
    initials: "KM",
    activities: 39,
    target: 50,
    actual: 32,
    conversion: 31,
    lastActive: subHours(new Date(), 1),
  },
]

// Mock Activities - Last 7 days
export const recentActivities: Activity[] = [
  {
    id: "1",
    type: "visit",
    customer: "ABC Corporation Ltd",
    rep: "Rahul Sharma",
    outcome: "sale_closed",
    timestamp: subMinutes(new Date(), 30),
    notes: "Closed deal for annual maintenance contract worth ₹2.5L",
    location: "Mumbai",
  },
  {
    id: "2",
    type: "call",
    customer: "XYZ Industries Pvt Ltd",
    rep: "Priya Patel",
    outcome: "meeting_scheduled",
    timestamp: subHours(new Date(), 2),
    notes: "Scheduled product demo for next week, interested in bulk purchase",
    location: "Delhi",
  },
  {
    id: "3",
    type: "meeting",
    customer: "PQR Traders",
    rep: "Amit Kumar",
    outcome: "interested",
    timestamp: subHours(new Date(), 4),
    notes: "Discussed credit terms, positive response",
    location: "Bangalore",
  },
  {
    id: "4",
    type: "email",
    customer: "LMN Enterprises",
    rep: "Sneha Reddy",
    outcome: "callback",
    timestamp: subHours(new Date(), 6),
    notes: "Sent quotation, awaiting response",
    location: "Pune",
  },
  {
    id: "5",
    type: "visit",
    customer: "Supreme Textiles",
    rep: "Vikram Singh",
    outcome: "not_interested",
    timestamp: subDays(new Date(), 1),
    notes: "Currently working with competitor, will reconsider after 6 months",
    location: "Hyderabad",
  },
  {
    id: "6",
    type: "call",
    customer: "Metro Manufacturing Co",
    rep: "Anjali Desai",
    outcome: "interested",
    timestamp: subDays(new Date(), 1),
    notes: "Interested in product line extension",
    location: "Mumbai",
  },
  {
    id: "7",
    type: "meeting",
    customer: "Global Tech Solutions",
    rep: "Rajesh Gupta",
    outcome: "meeting_scheduled",
    timestamp: subDays(new Date(), 2),
    notes: "Follow-up meeting scheduled with decision maker",
    location: "Delhi",
  },
  {
    id: "8",
    type: "visit",
    customer: "Sunshine Retailers",
    rep: "Kavita Menon",
    outcome: "sale_closed",
    timestamp: subDays(new Date(), 2),
    notes: "Closed ₹1.8L order for Q1",
    location: "Bangalore",
  },
  {
    id: "9",
    type: "call",
    customer: "Royal Distributors",
    rep: "Rahul Sharma",
    outcome: "callback",
    timestamp: subDays(new Date(), 3),
    notes: "Need to callback after budget approval",
    location: "Pune",
  },
  {
    id: "10",
    type: "email",
    customer: "Modern Supplies Ltd",
    rep: "Priya Patel",
    outcome: "interested",
    timestamp: subDays(new Date(), 3),
    notes: "Shared product catalog and pricing",
    location: "Hyderabad",
  },
]

// Mock Outstanding Payments
export const outstandingPayments: Payment[] = [
  {
    id: "1",
    customer: "ABC Corporation Ltd",
    amount: 185000,
    dueDate: subDays(new Date(), 45),
    status: "overdue",
    agingDays: 45,
  },
  {
    id: "2",
    customer: "XYZ Industries Pvt Ltd",
    amount: 320000,
    dueDate: subDays(new Date(), 62),
    status: "overdue",
    agingDays: 62,
  },
  {
    id: "3",
    customer: "PQR Traders",
    amount: 95000,
    dueDate: subDays(new Date(), 15),
    status: "overdue",
    agingDays: 15,
  },
  {
    id: "4",
    customer: "LMN Enterprises",
    amount: 450000,
    dueDate: subDays(new Date(), 95),
    status: "overdue",
    agingDays: 95,
  },
  {
    id: "5",
    customer: "Supreme Textiles",
    amount: 125000,
    dueDate: subDays(new Date(), -10),
    status: "pending",
    agingDays: 0,
  },
  {
    id: "6",
    customer: "Metro Manufacturing Co",
    amount: 275000,
    dueDate: subDays(new Date(), 22),
    status: "overdue",
    agingDays: 22,
  },
  {
    id: "7",
    customer: "Global Tech Solutions",
    amount: 340000,
    dueDate: subDays(new Date(), -5),
    status: "pending",
    agingDays: 0,
  },
  {
    id: "8",
    customer: "Sunshine Retailers",
    amount: 88000,
    dueDate: subDays(new Date(), 8),
    status: "overdue",
    agingDays: 8,
  },
  {
    id: "9",
    customer: "Royal Distributors",
    amount: 215000,
    dueDate: subDays(new Date(), 38),
    status: "overdue",
    agingDays: 38,
  },
  {
    id: "10",
    customer: "Modern Supplies Ltd",
    amount: 165000,
    dueDate: subDays(new Date(), -15),
    status: "pending",
    agingDays: 0,
  },
  {
    id: "11",
    customer: "Elite Trading Co",
    amount: 195000,
    dueDate: subDays(new Date(), 52),
    status: "overdue",
    agingDays: 52,
  },
  {
    id: "12",
    customer: "Premier Goods Ltd",
    amount: 142000,
    dueDate: subDays(new Date(), 28),
    status: "overdue",
    agingDays: 28,
  },
  {
    id: "13",
    customer: "Mega Mart Pvt Ltd",
    amount: 385000,
    dueDate: subDays(new Date(), -20),
    status: "pending",
    agingDays: 0,
  },
  {
    id: "14",
    customer: "City Wholesalers",
    amount: 98000,
    dueDate: subDays(new Date(), 12),
    status: "overdue",
    agingDays: 12,
  },
  {
    id: "15",
    customer: "Star Industries",
    amount: 228000,
    dueDate: subDays(new Date(), 75),
    status: "overdue",
    agingDays: 75,
  },
]

// Get most overdue payments (top 3-4)
export const getMostOverduePayments = (limit: number = 4): Payment[] => {
  return outstandingPayments
    .filter((p) => p.status === "overdue")
    .sort((a, b) => b.agingDays - a.agingDays)
    .slice(0, limit)
}

// Get recent activities
export const getRecentActivitiesLimit = (limit: number = 5): Activity[] => {
  return recentActivities.slice(0, limit)
}

// Get all activities
export const getAllActivities = (): Activity[] => {
  return recentActivities
}

// Get top performers
export const getTopPerformers = (limit: number = 3): SalesRep[] => {
  return salesReps
    .sort((a, b) => b.conversion - a.conversion)
    .slice(0, limit)
}

// Payment Aging Data for Charts
export const paymentAgingData = [
  { bucket: "0-30 days", amount: 320000, percentage: 26, color: "#10B981" },
  { bucket: "30-60 days", amount: 450000, percentage: 36, color: "#F59E0B" },
  { bucket: "60-90 days", amount: 280000, percentage: 22, color: "#F97316" },
  { bucket: "90+ days", amount: 200000, percentage: 16, color: "#EF4444" },
]

// Team Performance Data for Charts
export const teamPerformanceData = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    actual: 52,
    target: 50,
    percentage: 104,
  },
  {
    name: "Priya Patel",
    initials: "PP",
    actual: 48,
    target: 50,
    percentage: 96,
  },
  { name: "Amit Kumar", initials: "AK", actual: 45, target: 50, percentage: 90 },
  {
    name: "Sneha Reddy",
    initials: "SR",
    actual: 43,
    target: 45,
    percentage: 96,
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    actual: 38,
    target: 40,
    percentage: 95,
  },
]

// Activity Trends Data for Charts (Last 7 days)
export const activityTrendsData = [
  { day: "Mon", calls: 28, visits: 12, meetings: 8, emails: 15 },
  { day: "Tue", calls: 32, visits: 15, meetings: 10, emails: 18 },
  { day: "Wed", calls: 30, visits: 18, meetings: 12, emails: 16 },
  { day: "Thu", calls: 35, visits: 14, meetings: 9, emails: 20 },
  { day: "Fri", calls: 38, visits: 20, meetings: 11, emails: 22 },
  { day: "Sat", calls: 20, visits: 10, meetings: 5, emails: 12 },
  { day: "Sun", calls: 18, visits: 8, meetings: 4, emails: 10 },
]
