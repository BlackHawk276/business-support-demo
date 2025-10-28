export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: boolean
  image?: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  categoryId: string
  description: string
  basePrice: number
  packaging: string
  stockAvailable: boolean
  isActive: boolean
  images: string[]
  variants: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  parentId: string | null
  level: number
  productCount: number
}

export interface Scheme {
  id: string
  name: string
  type: "quantity" | "cross_product" | "order_value"
  status: "active" | "inactive" | "expiring"
  startDate: Date
  endDate: Date
  details: {
    product?: { id: string; name: string }
    buyQuantity?: number
    freeQuantity?: number
    crossProduct?: { id: string; name: string }
    minOrderValue?: number
    discountType?: "percentage" | "fixed"
    discountValue?: number
  }
  performance: {
    timesUsed: number
    totalSavings: number
    topReps: string[]
  }
  autoApply: boolean
  categories: string[]
}
