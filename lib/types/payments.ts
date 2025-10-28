export interface PaymentCustomer {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
}

export interface PaymentHistory {
  date: Date
  amount: number
  method: string
}

export interface OutstandingPayment {
  id: string
  customer: PaymentCustomer
  invoices: string[]
  amount: number
  dueDate: Date
  agingDays: number
  agingBucket: string
  lastReminder: Date | null
  status: "overdue" | "due_soon" | "current"
  paymentHistory: PaymentHistory[]
}

export interface PaymentMetric {
  title: string
  value: string
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: any
  color: string
  urgent?: boolean
}
