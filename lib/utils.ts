import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, differenceInDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in Indian Rupee format
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format large numbers with Indian numbering system
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num)
}

// Format date as "X minutes ago", "X hours ago", etc.
export function formatRelativeDate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

// Format date as "Mar 15, 2024"
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Calculate percentage
export function calculatePercentage(current: number, target: number): number {
  if (target === 0) return 0
  return Math.round((current / target) * 100)
}

// Get aging bucket for payments
export function getAgingBucket(dueDate: Date): string {
  const days = differenceInDays(new Date(), dueDate)

  if (days < 0) return "Not due"
  if (days <= 30) return "0-30 days"
  if (days <= 60) return "30-60 days"
  if (days <= 90) return "60-90 days"
  return "90+ days"
}

// Calculate days overdue
export function getDaysOverdue(dueDate: Date): number {
  const days = differenceInDays(new Date(), dueDate)
  return days > 0 ? days : 0
}

// Calculate aging days from due date
export function calculateAgingDays(dueDate: Date): number {
  return differenceInDays(new Date(), dueDate)
}

// Format days overdue as string
export function formatDaysOverdue(days: number): string {
  if (days === 0) return "Due today"
  if (days < 0) return `Due in ${Math.abs(days)} days`
  if (days === 1) return "1 day overdue"
  return `${days} days overdue`
}

// Check if payment is overdue
export function isOverdue(dueDate: Date): boolean {
  return differenceInDays(new Date(), dueDate) > 0
}

// Calculate collection rate
export function calculateCollectionRate(
  paid: number,
  total: number
): number {
  if (total === 0) return 0
  return Math.round((paid / total) * 100)
}

// Get aging bucket color
export function getAgingBucketColor(bucket: string): string {
  switch (bucket) {
    case "0-30 days":
      return "bg-green-100 text-green-700"
    case "30-60 days":
      return "bg-amber-100 text-amber-700"
    case "60-90 days":
      return "bg-orange-100 text-orange-700"
    case "90+ days":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}
