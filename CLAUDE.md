# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Business Support App** demo for Indian SMBs (Small/Medium Businesses), built as a comprehensive sales and distribution management platform for FMCG (Fast-Moving Consumer Goods) companies. The application helps business owners and sales teams manage customers, track activities, monitor payments, manage product catalogs, and run promotional schemes.

**Target Market**: Indian B2B distribution businesses (wholesale, FMCG distributors)
**Demo Mode**: All data is client-side only (localStorage/component state), no backend/database

## Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Build & Production
npm run build        # Build production bundle
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Date utilities**: date-fns

## Architecture & Code Organization

### Data Flow Pattern

**Client-Side Only, No Backend:**
- Authentication uses `localStorage.getItem("isAuthenticated")` and `localStorage.getItem("user")`
- All data starts from mock data files in `lib/*-data.ts`
- Pages maintain local state with `useState` to allow browser-level CRUD operations
- New items (products, schemes, activities) are prepended to arrays and stored in component state
- Data does NOT persist across page refreshes by design (demo purposes)

### Directory Structure

```
app/
  ├── (landing)/          # Public pages (home, about, contact)
  ├── login/              # Login page with mock authentication
  └── dashboard/          # Protected dashboard area
      ├── layout.tsx      # Dashboard shell with Sidebar + TopBar + auth check
      ├── page.tsx        # Dashboard home with KPIs, charts, activity feed
      ├── activities/     # Sales activity tracking
      ├── payments/       # Outstanding payments & aging analysis
      ├── catalog/        # Product management with variants
      ├── schemes/        # Promotional schemes (quantity, cross-product, order value)
      ├── customers/      # Customer management
      ├── analytics/      # Analytics & reports
      └── settings/       # User settings

components/
  ├── ui/                 # shadcn/ui base components (Button, Input, Badge, etc.)
  └── dashboard/          # Dashboard-specific components
      ├── sidebar.tsx           # Desktop sidebar navigation
      ├── mobile-sidebar.tsx    # Mobile responsive sidebar
      ├── topbar.tsx            # Top navigation bar
      ├── overview/             # Dashboard home widgets
      ├── charts/               # Recharts chart components
      ├── activities/           # Activity feed components + Log Activity modal
      ├── catalog/              # Add Product modal
      └── schemes/              # Add Scheme modal

lib/
  ├── types/              # TypeScript interfaces
  │   ├── auth.ts         # User, Company, LoginFormData
  │   ├── dashboard.ts    # KPICard, Activity, Payment, SalesRep
  │   ├── payments.ts     # OutstandingPayment, PaymentCustomer, PaymentHistory
  │   └── catalog.ts      # Product, ProductVariant, Category, Scheme
  ├── utils.ts            # Utility functions (formatCurrency, formatDate, etc.)
  ├── mock-data.ts        # Dashboard mock data (KPIs, chart data, activities)
  ├── mock-data-extended.ts  # Extended activity data + generators
  ├── payments-data.ts    # Outstanding payments mock data (15 customers)
  └── catalog-data.ts     # Products (8 FMCG items) + Schemes (6 promotions)
```

### Key Architectural Patterns

#### 1. Modal State Management Pattern

All CRUD modals follow this pattern:

```tsx
// Page Component
const [isModalOpen, setIsModalOpen] = useState(false)
const [items, setItems] = useState(initialData)

const handleSave = (newItem) => {
  setItems([newItem, ...items])  // Prepend to show new items first
}

return (
  <>
    <button onClick={() => setIsModalOpen(true)}>Add Item</button>
    <AddItemModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSave}
    />
  </>
)
```

#### 2. Authentication Flow

- Login page (`app/login/page.tsx`) stores user data in localStorage
- Dashboard layout (`app/dashboard/layout.tsx`) checks auth on mount
- No password validation - any email+password combo works (demo mode)
- Demo credentials in login page: `demo@example.com` / any password
- Logout clears `localStorage.removeItem("user")` and `localStorage.removeItem("isAuthenticated")`

#### 3. Indian Localization

All currency and number formatting uses Indian conventions:

```typescript
// Currency: ₹1,25,000 (Indian numbering system)
formatCurrency(125000) // "₹1,25,000"

// Numbers with Indian commas
formatNumber(125000) // "1,25,000"

// All amounts throughout the app use these formatters
```

#### 4. Date Utilities Pattern

```typescript
import { formatDate, formatRelativeDate, calculateAgingDays } from "@/lib/utils"

formatDate(new Date())                    // "Oct 28, 2024"
formatRelativeDate(someDate)              // "2 hours ago"
calculateAgingDays(dueDate)               // Days since due date
getAgingBucket(dueDate)                   // "0-30 days", "30-60 days", etc.
```

#### 5. Scheme Types

Three promotional scheme types with different structures:

**Quantity Scheme:** Buy X get Y free
```typescript
{
  type: "quantity",
  details: {
    product: { id, name },
    buyQuantity: 10,
    freeQuantity: 2
  }
}
```

**Cross Product:** Buy X of Product A, get Y of Product B free
```typescript
{
  type: "cross_product",
  details: {
    product: { id, name },
    buyQuantity: 5,
    crossProduct: { id, name },
    freeQuantity: 1
  }
}
```

**Order Value:** Discount on minimum order value
```typescript
{
  type: "order_value",
  details: {
    minOrderValue: 5000,
    discountType: "percentage" | "fixed",
    discountValue: 10
  }
}
```

#### 6. Animation Pattern

Staggered animations using Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
>
  {/* Content */}
</motion.div>
```

#### 7. Chart Components Pattern

All charts wrapped in `ChartCard` for consistency:

```tsx
<ChartCard
  title="Chart Title"
  subtitle="Optional subtitle"
  index={0}  // For staggered animation
>
  <ResponsiveContainer width="100%" height={240}>
    {/* Recharts chart */}
  </ResponsiveContainer>
</ChartCard>
```

### Component Organization Conventions

**Page-level components** (`app/**page.tsx`):
- Manage state for data arrays
- Handle modal open/close state
- Implement filter/search logic
- Pass data to presentation components

**Modal components** (`components/dashboard/**/add-*-modal.tsx`):
- Multi-step forms or tabbed interfaces
- Form validation (required fields, type checking)
- Call `onSave(newItem)` prop with formatted data
- Call `onClose()` prop and reset form state

**Widget components** (`components/dashboard/overview/*-widget.tsx`):
- Receive data as props
- Display-only, no state management
- Consistent card styling with hover effects

**Chart components** (`components/dashboard/charts/*-chart.tsx`):
- Wrapped in `ChartCard` component
- Use Recharts library
- Interactive tooltips
- Responsive sizing

### Styling Conventions

**Color System:**
- Primary: Blue (`blue-600`, `blue-700`) - Actions, active states
- Success: Green - Completed, positive metrics
- Warning: Amber - Warnings, expiring soon
- Danger: Red - Overdue, urgent, errors
- Secondary: Purple - Special features
- Neutral: Slate - Text, borders, backgrounds

**Responsive Breakpoints:**
- Mobile: default (< 768px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

**Common Patterns:**
```tsx
// Card styling
className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"

// Button primary
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"

// Button secondary
className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"

// Input field
className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### Type Import Patterns

```typescript
// Dashboard types
import { Activity, KPICard, Payment } from "@/lib/types/dashboard"

// Auth types
import { User, Company } from "@/lib/types/auth"

// Catalog types
import { Product, ProductVariant, Scheme } from "@/lib/types/catalog"

// Payment types
import { OutstandingPayment, PaymentHistory } from "@/lib/types/payments"
```

### Mock Data Usage

```typescript
// Import initial data
import { products, schemes, catalogMetrics } from "@/lib/catalog-data"
import { outstandingPaymentsData } from "@/lib/payments-data"
import { allActivities, generateRandomActivity } from "@/lib/mock-data-extended"

// Use in component with local state for mutations
const [products, setProducts] = useState(initialProducts)
const [schemes, setSchemes] = useState(initialSchemes)
```

## Navigation Structure

Dashboard routes (`/dashboard/*`):
- `/dashboard` - Home (KPIs, charts, activity feed, quick stats)
- `/dashboard/activities` - Activity feed with live updates simulation
- `/dashboard/payments` - Outstanding payments table with aging analysis
- `/dashboard/catalog` - Product catalog with variants management
- `/dashboard/schemes` - Promotional schemes management
- `/dashboard/customers` - Customer list (placeholder)
- `/dashboard/analytics` - Analytics dashboard (placeholder)
- `/dashboard/settings` - User settings (placeholder)

## Important Conventions

1. **Always use "use client" directive** for components with interactivity (useState, useEffect, onClick)

2. **Path aliases**: Use `@/*` for all imports (resolves to project root)

3. **Indian business context**:
   - Currency in ₹ (INR)
   - Product examples: Coca Cola, Pepsi, Lays, Sunsilk, Dettol, Tropicana, Parle-G
   - Customer names: Indian business names (ABC Corporation Ltd, Sharma General Store)
   - Rep names: Indian names (Rahul, Priya, Amit, Vikram, etc.)

4. **Form validation**: Use React Hook Form + Zod (configured but not all forms use it yet)

5. **Modal animation**: All modals use Framer Motion with AnimatePresence for smooth enter/exit

6. **Responsive design**: Mobile-first approach with hamburger menu triggering MobileSidebar

7. **No emojis**: Professional enterprise UI - avoid emojis unless explicitly in data (scheme type icons use emoji)

8. **Activity Feed live updates**: Toggle-able simulation that adds new activities every 15 seconds

## Known Limitations & Future Considerations

- No backend/API integration (by design - demo app)
- Data doesn't persist across refreshes
- No actual authentication/authorization (localStorage mock)
- Payments page has Record Payment/Send Reminder placeholders
- Customers, Analytics, Settings pages are placeholder shells
- No image upload functionality (modal has placeholder)
- No actual email/SMS integration for reminders
