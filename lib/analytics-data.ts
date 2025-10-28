import { subDays } from "date-fns"

export const analyticsMetrics = {
  totalRevenue: 4520000,
  collectionRate: 78,
  activeCustomers: 142,
  avgOrderValue: 32450,
  teamProductivity: 87,
  customerRetention: 92,
}

export const revenueTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: subDays(new Date(), 29 - i).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  }),
  current: 120000 + Math.random() * 80000,
  previous: 100000 + Math.random() * 70000,
}))

export const categoryRevenueData = [
  { category: "Beverages", revenue: 1250000, growth: 12 },
  { category: "Snacks", revenue: 980000, growth: 8 },
  { category: "Personal Care", revenue: 850000, growth: 15 },
  { category: "Dairy Products", revenue: 680000, growth: -3 },
  { category: "Household Items", revenue: 520000, growth: 5 },
  { category: "Packaged Foods", revenue: 420000, growth: 18 },
  { category: "Confectionery", revenue: 380000, growth: 7 },
  { category: "Health & Wellness", revenue: 280000, growth: 22 },
]

export const paymentStatusData = [
  { status: "Paid", value: 78, amount: 3525600, color: "#10B981" },
  { status: "Pending", value: 15, amount: 678000, color: "#F59E0B" },
  { status: "Overdue", value: 7, amount: 316400, color: "#EF4444" },
]

export const topCustomersData = [
  { name: "ABC Corporation Ltd", revenue: 450000, orders: 45 },
  { name: "Premium Stores Ltd", revenue: 385000, orders: 38 },
  { name: "City Mart Retail", revenue: 340000, orders: 42 },
  { name: "Metro Retail Chain", revenue: 295000, orders: 35 },
  { name: "Modern Trade Co", revenue: 268000, orders: 31 },
  { name: "Royal Supermarket", revenue: 245000, orders: 28 },
  { name: "Kumar Enterprises", revenue: 220000, orders: 26 },
  { name: "Sharma General Store", revenue: 198000, orders: 24 },
  { name: "Golden Traders", revenue: 175000, orders: 22 },
  { name: "Patel Brothers", revenue: 152000, orders: 19 },
]

export const teamLeaderboardData = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    revenue: 892000,
    activities: 156,
    conversion: 68,
  },
  {
    name: "Priya Patel",
    initials: "PP",
    revenue: 845000,
    activities: 148,
    conversion: 65,
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    revenue: 798000,
    activities: 142,
    conversion: 62,
  },
  {
    name: "Anjali Desai",
    initials: "AD",
    revenue: 756000,
    activities: 138,
    conversion: 64,
  },
  {
    name: "Sneha Reddy",
    initials: "SR",
    revenue: 689000,
    activities: 125,
    conversion: 59,
  },
]

export const geographicData = [
  { city: "Mumbai", revenue: 1250000, customers: 45 },
  { city: "Delhi", revenue: 980000, customers: 38 },
  { city: "Bangalore", revenue: 850000, customers: 32 },
  { city: "Pune", revenue: 520000, customers: 24 },
  { city: "Hyderabad", revenue: 480000, customers: 22 },
  { city: "Chennai", revenue: 440000, customers: 18 },
]
