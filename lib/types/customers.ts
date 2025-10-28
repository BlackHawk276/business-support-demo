export interface Customer {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  city: string
  gstNumber?: string
  creditLimit: number
  outstanding: number
  paymentTerms: string
  status: "active" | "inactive"
  lastActivity: Date
  tallyId?: string
  createdAt: Date
  activities: CustomerActivity[]
  payments: CustomerPayment[]
  orders: CustomerOrder[]
}

export interface CustomerActivity {
  type: "call" | "visit" | "meeting" | "email"
  date: Date
  rep: string
  outcome: string
}

export interface CustomerPayment {
  date: Date
  amount: number
  method: string
  invoiceNumber: string
}

export interface CustomerOrder {
  id: string
  date: Date
  amount: number
  status: "pending" | "delivered" | "cancelled"
  products: string[]
}

export interface CustomerMetrics {
  totalCustomers: number
  activeCustomers: number
  highValueCustomers: number
  newThisMonth: number
}
