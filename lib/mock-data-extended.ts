import { Activity } from "./types/dashboard"
import { subDays, subHours, subMinutes, subSeconds } from "date-fns"
import { salesReps } from "./mock-data"

// Activity templates for realistic descriptions
const activityTemplates = {
  call: [
    "Discussed new product requirements and pricing",
    "Follow-up on pending quotation for Q1 order",
    "Pricing negotiation for bulk purchase",
    "Customer inquiry about payment terms",
    "Product demo feedback and next steps",
    "Resolved technical queries about specifications",
    "Annual contract renewal discussion",
    "Cross-selling opportunity for product line extension",
  ],
  visit: [
    "On-site product demonstration completed",
    "Facility tour and requirement analysis",
    "Met with decision maker to finalize terms",
    "Delivered product samples for evaluation",
    "Conducted quarterly business review",
    "Site inspection for installation planning",
    "Customer appreciation visit with small gift",
    "Competitor analysis and market feedback",
  ],
  meeting: [
    "Scheduled product demo for next week",
    "Contract negotiation meeting planned",
    "Quarterly review meeting arranged",
    "Technical discussion with engineering team",
    "Budget approval meeting scheduled",
    "Presentation for new product line",
    "Follow-up meeting to close pending deal",
    "Introduction meeting with new procurement head",
  ],
  email: [
    "Sent detailed quotation with payment terms",
    "Shared product catalog and price list",
    "Forwarded case study and client references",
    "Sent contract draft for review",
    "Shared installation timeline and SOW",
    "Sent monthly newsletter with new offers",
    "Forwarded technical specifications",
    "Sent payment reminder with invoice copy",
  ],
}

const customers = [
  "ABC Corporation Ltd",
  "XYZ Industries Pvt Ltd",
  "PQR Traders",
  "LMN Enterprises",
  "Supreme Textiles",
  "Metro Manufacturing Co",
  "Global Tech Solutions",
  "Sunshine Retailers",
  "Royal Distributors",
  "Modern Supplies Ltd",
  "Elite Trading Co",
  "Premier Goods Ltd",
  "Mega Mart Pvt Ltd",
  "City Wholesalers",
  "Star Industries",
  "Apex Solutions",
  "Prime Ventures",
  "Unity Corporation",
  "Cosmos Traders",
  "Bright Future Ltd",
]

const locations = [
  { city: "Mumbai", area: "Andheri" },
  { city: "Mumbai", area: "Bandra" },
  { city: "Delhi", area: "Connaught Place" },
  { city: "Delhi", area: "Saket" },
  { city: "Bangalore", area: "Koramangala" },
  { city: "Bangalore", area: "Whitefield" },
  { city: "Pune", area: "Hinjewadi" },
  { city: "Pune", area: "Kothrud" },
  { city: "Hyderabad", area: "Hitech City" },
  { city: "Hyderabad", area: "Gachibowli" },
]

const outcomes: Activity["outcome"][] = [
  "interested",
  "not_interested",
  "callback",
  "meeting_scheduled",
  "sale_closed",
]

// Generate a random activity
export function generateRandomActivity(): Activity {
  const types: Activity["type"][] = ["call", "visit", "meeting", "email"]
  const type = types[Math.floor(Math.random() * types.length)]
  const rep = salesReps[Math.floor(Math.random() * salesReps.length)]
  const customer = customers[Math.floor(Math.random() * customers.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const templates = activityTemplates[type]
  const notes = templates[Math.floor(Math.random() * templates.length)]
  const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]

  // More recent activities (within last 8 hours)
  const hoursAgo = Math.floor(Math.random() * 8)
  const minutesAgo = Math.floor(Math.random() * 60)

  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    type,
    customer,
    rep: rep.name,
    outcome,
    timestamp: subMinutes(subHours(new Date(), hoursAgo), minutesAgo),
    notes,
    location: `${location.area}, ${location.city}`,
  }
}

// Generate multiple activities
export function generateActivities(count: number): Activity[] {
  const activities: Activity[] = []

  for (let i = 0; i < count; i++) {
    // Distribute activities over last 3 days
    const daysAgo = Math.floor(i / 20) // ~20 activities per day
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)

    const type: Activity["type"] = ["call", "visit", "meeting", "email"][
      Math.floor(Math.random() * 4)
    ] as Activity["type"]

    const rep = salesReps[Math.floor(Math.random() * salesReps.length)]
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const templates = activityTemplates[type]
    const notes = templates[Math.floor(Math.random() * templates.length)]
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]

    activities.push({
      id: `activity-${i}`,
      type,
      customer,
      rep: rep.name,
      outcome,
      timestamp: subMinutes(subHours(subDays(new Date(), daysAgo), hoursAgo), minutesAgo),
      notes,
      location: `${location.area}, ${location.city}`,
    })
  }

  // Sort by most recent first
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Initial feed of 50 activities
export const allActivities = generateActivities(50)

// Get activities for feed (paginated)
export function getActivitiesPaginated(page: number = 0, perPage: number = 10): Activity[] {
  const start = page * perPage
  const end = start + perPage
  return allActivities.slice(start, end)
}

// Filter activities by type
export function filterActivitiesByType(
  activities: Activity[],
  type: Activity["type"] | "all"
): Activity[] {
  if (type === "all") return activities
  return activities.filter((a) => a.type === type)
}

// Filter activities by outcome
export function filterActivitiesByOutcome(
  activities: Activity[],
  outcome: Activity["outcome"] | "all"
): Activity[] {
  if (outcome === "all") return activities
  return activities.filter((a) => a.outcome === outcome)
}

// Search activities
export function searchActivities(activities: Activity[], query: string): Activity[] {
  const lowercaseQuery = query.toLowerCase()
  return activities.filter(
    (a) =>
      a.customer.toLowerCase().includes(lowercaseQuery) ||
      a.rep.toLowerCase().includes(lowercaseQuery) ||
      a.notes.toLowerCase().includes(lowercaseQuery) ||
      a.location.toLowerCase().includes(lowercaseQuery)
  )
}
