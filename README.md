# Business Support Pro - Demo Application

A comprehensive sales and payment management system designed for Indian FMCG distributors and wholesalers.

## Features

### Dashboard
- Real-time KPI tracking (Outstanding, Activities, Overdue Payments, Conversion Rate)
- Activity feed with live updates
- Payment aging analysis
- Team performance metrics

### Activities Management
- Log sales calls, visits, meetings, and emails
- Filter by rep, customer, type, and outcome
- Real-time activity feed

### Payments Tracking
- Payment aging analysis with visual charts
- Quick payment recording
- Automated reminders via WhatsApp/SMS/Email
- Overdue payment alerts

### Catalog Management
- Product catalog with categories
- Variant management (size, flavor, pack)
- Stock tracking
- Quick product lookup

### Scheme Management
- Create promotional schemes (Buy X Get Y, Flat Discount, etc.)
- Set validity periods
- Target customer segments
- Track scheme performance

### Customer Management
- Comprehensive customer database
- Credit limit tracking
- Outstanding payment monitoring
- Quick view sidebar with customer details
- Activity and payment history

### Analytics Dashboard
- Revenue metrics and trends
- Sales by category
- Payment status distribution
- Top customers by revenue
- Team leaderboard
- Geographic distribution

### Settings
- Company profile management
- User preferences (language, date format, currency, timezone)
- Team management
- Integrations (Tally, WhatsApp, SMS, Email)
- Notification preferences
- Billing and subscription
- Security settings

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Toast Notifications:** Sonner
- **Date Handling:** date-fns

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd business-support-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Login credentials** (Demo mode)
   - Email: Any email (e.g., demo@company.com)
   - Password: Any password (e.g., demo123)

## Demo Features

### Demo Controls (Hidden)
- Press **Cmd+Shift+D** (Mac) or **Ctrl+Shift+D** (Windows) to open demo controls
- Options:
  - Add random activity
  - Simulate payment received
  - Send test reminder
  - Reset demo

### Demo Banner
- Appears at the top of the dashboard
- Can be dismissed (uses localStorage)
- Explains that all data is simulated

### Toast Notifications
The application shows real-time feedback for all actions:
- Payment recorded
- Reminder sent
- Customer added
- Product saved
- Scheme created
- Logout
- Errors

## Demo Script for Client Presentations

### Opening (30 seconds)
1. Land on homepage (http://localhost:3000)
2. Highlight value propositions:
   - "Track payments and reduce overdue amounts"
   - "Manage sales team activities in real-time"
   - "Automate reminders via WhatsApp/SMS"
3. Click "Start Free Demo"

### Login (10 seconds)
1. Enter any email and password
2. Show smooth transition to dashboard

### Dashboard Overview (1 minute)
1. Point out 4 KPI cards at the top:
   - Total Outstanding: ₹27.5L
   - Activities Today: 38/50
   - Overdue Payments: ₹4.2L (Alert - Red)
   - Conversion Rate: 68% (Trending up)

2. Scroll to show:
   - Real-time activity feed
   - Payment aging chart
   - Team performance metrics

3. Mention: "This refreshes in real-time as your team works"

### Activities Management (1 minute)
1. Navigate to **Activities** page
2. Show activity feed with filters
3. Point out:
   - Different activity types (calls, visits, meetings, emails)
   - Customer names and outcomes
   - Time tracking
4. Demonstrate filters:
   - Filter by sales rep
   - Filter by outcome (successful, follow-up needed)

### Payment Management (1-2 minutes)
1. Navigate to **Payments** page
2. Show payment aging chart:
   - 0-30 days: 45% (₹12.4L)
   - 31-60 days: 30% (₹8.3L)
   - 61-90 days: 15% (₹4.1L)
   - 90+ days: 10% (₹2.7L)

3. Scroll to payment list
4. Demonstrate "Record Payment" button:
   - Click to open modal
   - Show fields (customer, amount, date, method)
   - Mention: "You can also upload proof of payment"

5. Show "Send Reminder" feature:
   - Click reminder button
   - Select WhatsApp/SMS/Email
   - Show toast notification "Reminder sent successfully"

### Product Catalog (45 seconds)
1. Navigate to **Catalog** page
2. Show category filter (All, Beverages, Snacks, etc.)
3. Scroll through products
4. Click on a product to show:
   - Product details
   - Variants (different sizes/flavors)
   - Current stock
   - Pricing

5. Mention: "Syncs with Tally for real-time stock updates"

### Schemes (30 seconds)
1. Navigate to **Schemes** page
2. Show active schemes:
   - Buy 10 Get 2 Free
   - Flat 15% Discount
   - Volume discount
3. Point out:
   - Validity dates
   - Target segments
   - Performance tracking

### Customers (1 minute)
1. Navigate to **Customers** page
2. Show customer metrics:
   - Total: 156
   - Active: 142
   - High Value: 23
   - New this month: 8

3. Demonstrate filters:
   - Search by name/city
   - Filter by status

4. Click on a customer row to show Quick View:
   - Contact information (clickable phone/email)
   - Outstanding amount and credit limit
   - Credit utilization percentage
   - Recent activities
   - Payment history
   - Company details (GST, Tally ID)

5. Mention: "One click to call or email customer"

### Analytics (45 seconds)
1. Navigate to **Analytics** page
2. Show key metrics:
   - Total Revenue: ₹45.2L
   - Collection Rate: 78%
   - Team Productivity: 87%

3. Point out visualizations:
   - Sales by category (bar chart)
   - Payment status (pie chart - 78% paid, 15% pending, 7% overdue)
   - Top 10 customers by revenue
   - Team leaderboard

4. Mention: "Export reports with one click"

### Settings (30 seconds)
1. Navigate to **Settings** page
2. Quickly show sections:
   - Company Profile
   - User Preferences (language support)
   - Team Management
   - **Integrations** (highlight this):
     - Tally (Connected)
     - WhatsApp Business
     - SMS Gateway
     - Email Service

3. Mention: "Seamless integration with your existing systems"

### Closing (30 seconds)
1. Navigate back to Dashboard
2. Summarize key benefits:
   - **Reduce overdue payments** - Automated reminders
   - **Increase team productivity** - Real-time tracking
   - **Data-driven decisions** - Comprehensive analytics
   - **Easy setup** - Integrates with Tally, WhatsApp, etc.

3. Call to action:
   - "Setup takes less than 1 hour"
   - "Training provided for your team"
   - "Free support for first 3 months"

**Total Demo Time: 5-7 minutes**

## Customization for Clients

Before presenting to a specific client, you can customize:

1. **Company Name**: Update in Settings > Company Profile
2. **Logo**: Add client's logo in Settings
3. **Data**: Modify `/lib/mock-data.ts` to use client's actual data ranges
4. **Currency**: Change in `/lib/utils.ts` (default: Indian Rupees)
5. **Language**: Settings > User Preferences (English, Hindi, Marathi, Gujarati)

## Key Selling Points

1. **Indian Market Focus**
   - Indian currency (₹) and numbering
   - GST and PAN number support
   - Regional language support
   - WhatsApp integration (popular in India)

2. **Mobile-Friendly**
   - Responsive design
   - Works on all devices
   - Touch-optimized for tablets

3. **Offline-First** (Production)
   - Works without internet
   - Syncs when online
   - Never lose data

4. **Security**
   - Role-based access control
   - Data encryption
   - Regular backups
   - Audit logs

5. **Integration**
   - Tally sync for real-time data
   - WhatsApp Business API
   - SMS gateways
   - Email services
   - Custom integrations available

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel (Recommended)**
   ```bash
   npm install -g vercel
   vercel
   ```

## Environment Variables (Production)

Create `.env.local` file:

```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com

# WhatsApp Integration
WHATSAPP_API_KEY=your-api-key
WHATSAPP_PHONE_NUMBER=your-business-number

# SMS Gateway
SMS_API_KEY=your-sms-api-key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Tally Integration
TALLY_SERVER_URL=http://localhost:9000
```

## Support

For questions or issues:
- Email: support@businesssupportpro.com
- Phone: +91-XXXXXXXXXX
- Documentation: https://docs.businesssupportpro.com

## License

Proprietary - Business Support Pro © 2024

---

**Built with ❤️ for Indian businesses**
