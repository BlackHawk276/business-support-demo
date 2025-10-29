// Mock AI Knowledge Base for simulating intelligent responses

export interface AIResponse {
  answer: string
  suggestions?: string[]
}

// Pattern matching for questions
export function getAIResponse(question: string, context: string): AIResponse {
  const q = question.toLowerCase()

  // Outstanding/Payment related questions
  if (q.includes("outstanding") || q.includes("₹27.5") || q.includes("27.5")) {
    return {
      answer: `The total outstanding amount of ₹27.5L represents unpaid invoices across 45 customers. This includes:

• ₹12.4L (45%) - 0-30 days old (current)
• ₹8.3L (30%) - 31-60 days old
• ₹4.1L (15%) - 61-90 days old
• ₹2.7L (10%) - 90+ days old (requires immediate attention)

The amount has increased 5% from last month, primarily due to 3 large corporate clients delaying payments. I recommend prioritizing follow-ups with customers having 90+ day overdue amounts.`,
      suggestions: [
        "Which customers have the highest overdue?",
        "How can I reduce outstanding faster?",
        "Show me payment trends",
      ],
    }
  }

  // Activities related questions
  if (q.includes("activities") || q.includes("38") || q.includes("today")) {
    return {
      answer: `Your team has completed 38 activities today against a target of 50 (76% achievement). Breakdown:

• Sales Calls: 18 (47%)
• Customer Visits: 12 (32%)
• Meetings: 5 (13%)
• Follow-up Emails: 3 (8%)

Top performing rep: Rahul Sharma (12 activities)
Peak activity time: 10 AM - 2 PM

To reach the target, your team needs 12 more activities. Based on current pace, you'll likely complete 42-45 activities by end of day.`,
      suggestions: [
        "Who is the top performing rep?",
        "What time is best for customer calls?",
        "How to improve team productivity?",
      ],
    }
  }

  // Overdue payments
  if (q.includes("overdue") || q.includes("₹4.2") || q.includes("4.2")) {
    return {
      answer: `The ₹4.2L in overdue payments is concerning and represents 15% of total outstanding. This has increased 12% from last month.

**Critical accounts** (90+ days overdue):
• ABC Corporation Ltd - ₹85,000
• Metro Retail Chain - ₹72,000
• Modern Trade Co - ₹65,000

**Recommended actions:**
1. Send automated WhatsApp reminders today
2. Schedule personal visits to top 5 accounts
3. Consider offering settlement discounts (5-7%)
4. Escalate accounts over ₹50,000 to senior management

The 12% increase suggests we need to tighten credit terms and improve follow-up frequency.`,
      suggestions: [
        "How to send automated reminders?",
        "Which customers should I visit first?",
        "Should I offer payment plans?",
      ],
    }
  }

  // Conversion rate
  if (q.includes("conversion") || q.includes("68%")) {
    return {
      answer: `Your 68% conversion rate is excellent and trending upward (+3% from last month). This means 68 out of every 100 leads are converting to customers.

**What's driving this:**
• Improved follow-up timing (within 24 hours)
• Better product demonstrations
• Competitive pricing on key SKUs
• Strong team performance

**Benchmark:** Industry average for FMCG distribution is 55-60%, so you're performing 13% above average!

To maintain this momentum, continue current strategies and consider expanding successful tactics to underperforming regions.`,
      suggestions: [
        "How to improve conversion further?",
        "Which products convert best?",
        "What's the best follow-up timing?",
      ],
    }
  }

  // Customer related questions
  if (q.includes("customers") || q.includes("156") || q.includes("142")) {
    return {
      answer: `You have 156 total customers with 142 active (91% activity rate).

**Customer segmentation:**
• High Value (₹50L+ annual): 23 customers (15%)
• Medium Value (₹10-50L): 68 customers (44%)
• Small Value (<₹10L): 51 customers (33%)
• New this month: 8 customers

**Health metrics:**
• Active: 142 (91%)
• Inactive (no orders in 60 days): 14 (9%)
• Credit limit utilization avg: 62%

Your new customer acquisition is strong (8 this month). Focus on reactivating the 14 inactive customers - they represent ₹12L in potential annual revenue.`,
      suggestions: [
        "Which customers are at risk of churning?",
        "How to reactivate inactive customers?",
        "Show me high-value customer details",
      ],
    }
  }

  // Team performance
  if (
    q.includes("team") ||
    q.includes("productivity") ||
    q.includes("87%")
  ) {
    return {
      answer: `Team productivity is at 87%, which is very good. This metric combines activity completion, conversion rate, and revenue per rep.

**Top performers:**
1. Rahul Sharma - ₹8.9L revenue, 68% conversion
2. Priya Patel - ₹8.4L revenue, 65% conversion
3. Vikram Singh - ₹7.9L revenue, 62% conversion

**Areas for improvement:**
• Response time to leads (currently 4 hours avg, target 2 hours)
• Follow-up consistency (some reps miss 2nd/3rd follow-ups)

**Recommendations:**
1. Share Rahul's best practices in weekly team meeting
2. Implement automated follow-up reminders
3. Set daily activity targets per rep (minimum 8 activities)`,
      suggestions: [
        "How can I motivate underperforming reps?",
        "What are Rahul Sharma's strategies?",
        "Should I adjust territory assignments?",
      ],
    }
  }

  // Revenue/Sales questions
  if (
    q.includes("revenue") ||
    q.includes("₹45.2") ||
    q.includes("sales")
  ) {
    return {
      answer: `Total revenue of ₹45.2L this period is tracking well. Here's the breakdown:

**By category:**
• Beverages: ₹12.5L (28%)
• Snacks: ₹9.8L (22%)
• Personal Care: ₹8.5L (19%)
• Dairy: ₹6.8L (15%)
• Others: ₹7.6L (16%)

**Revenue trends:**
• Month-over-month growth: +8%
• Best performing region: Mumbai (₹12.5L)
• Fastest growing segment: Health & Wellness (+22%)

**Opportunities:**
1. Beverages are strong - push seasonal flavors
2. Health & Wellness trending up - increase inventory
3. Dairy declining (-3%) - review pricing and promotions`,
      suggestions: [
        "Which products should I stock more?",
        "How to increase dairy sales?",
        "Show me seasonal trends",
      ],
    }
  }

  // Collection rate
  if (q.includes("collection") || q.includes("78%")) {
    return {
      answer: `78% collection rate means you're collecting ₹78 for every ₹100 invoiced, which is decent but has room for improvement.

**Industry benchmark:** 85-90% for FMCG distributors

**Why only 78%:**
• Payment terms too relaxed (30-45 days)
• Inconsistent follow-up on due dates
• Some customers habitually pay late
• No penalties for late payments

**Action plan to reach 85%:**
1. Send payment reminders 5 days before due date
2. Implement 1% late fee after 7 days
3. Offer 2% early payment discount
4. Weekly review of aging report
5. Tighten credit terms for chronic late payers

Improving to 85% would free up ₹3.2L in working capital!`,
      suggestions: [
        "How to implement early payment discounts?",
        "Which customers pay late most often?",
        "Should I reduce credit limits?",
      ],
    }
  }

  // Scheme/Promotion questions
  if (q.includes("scheme") || q.includes("promotion") || q.includes("discount")) {
    return {
      answer: `Your active schemes are performing well:

**"Buy 10 Get 2 Free"** on beverages:
• Uptake: 65% of eligible customers
• Volume increase: +35%
• Most popular on: Soft drinks, Juices

**"Flat 15% Discount"** on personal care:
• Redemptions: 42 this month
• Incremental revenue: ₹2.1L
• Customer satisfaction: High

**Tips for better scheme performance:**
1. Promote schemes via WhatsApp 3 days before they expire
2. Target schemes to customer segments (high-value vs. small retailers)
3. Track ROI - ensure margin isn't eroded too much
4. Create urgency with limited-time offers

Consider launching a volume-based scheme for slow-moving SKUs.`,
      suggestions: [
        "Which scheme is most profitable?",
        "How to promote schemes better?",
        "Should I create new schemes?",
      ],
    }
  }

  // Product/Catalog questions
  if (q.includes("product") || q.includes("catalog") || q.includes("stock")) {
    return {
      answer: `Your catalog has 150+ products across 8 categories. Here's the performance overview:

**Top sellers:**
1. Coca-Cola 2L - 450 units/month
2. Lays Classic - 380 units/month
3. Parle-G Biscuits - 320 units/month

**Stock alerts:**
• 12 products low stock (reorder soon)
• 5 products overstocked (slow moving)
• 3 products out of stock (affecting sales)

**Recommendations:**
1. Reorder fast-moving beverages weekly
2. Run promotions on overstocked items
3. Set up auto-reorder for top 20 SKUs
4. Consider delisting products with <5 units/month sales

Your Tally integration keeps stock levels synced in real-time.`,
      suggestions: [
        "Which products are overstocked?",
        "Should I add new products?",
        "How to handle slow-moving items?",
      ],
    }
  }

  // Analytics/Reports questions
  if (q.includes("analytics") || q.includes("report") || q.includes("trend")) {
    return {
      answer: `Your analytics show strong business health with a few focus areas:

**Positive trends:**
✓ Revenue up 8% month-over-month
✓ Customer retention at 92%
✓ Team productivity at 87%
✓ Conversion rate at 68% (industry-leading)

**Areas needing attention:**
⚠ Collection rate at 78% (target: 85%+)
⚠ Overdue payments increased 12%
⚠ 14 inactive customers (reactivation opportunity)

**Leading indicators:**
• More activities = More revenue (strong correlation)
• Fast follow-up (< 24hr) = Higher conversion
• Regular customer visits = Better retention

**Recommended focus:**
1. Improve collections to free up cash flow
2. Increase daily activities to 50+ per day
3. Reactivate inactive customers`,
      suggestions: [
        "Show me detailed revenue trends",
        "Which metrics should I track daily?",
        "How do I compare to competitors?",
      ],
    }
  }

  // General/Default response
  return {
    answer: `I can help you understand your business data! I can explain:

📊 **Metrics & Numbers:**
• Outstanding amounts and payment aging
• Activities and team performance
• Revenue and sales trends
• Customer metrics and segmentation
• Collection rates and cash flow

💡 **Common questions I can answer:**
• "Why is outstanding ₹27.5L?"
• "How can I improve collection rate?"
• "Which customers should I prioritize?"
• "What's driving the 68% conversion rate?"
• "How is my team performing?"

Try asking me about any number you see on your dashboard, or click on the suggested questions below!`,
    suggestions: [
      "Why is outstanding ₹27.5L?",
      "How can I improve collection rate?",
      "Which customers should I prioritize today?",
      "What's my team's performance like?",
    ],
  }
}

// Get context-aware example questions based on current page
export function getContextualQuestions(pathname: string): string[] {
  if (pathname.includes("/dashboard/analytics")) {
    return [
      "Why is revenue ₹45.2L?",
      "Which category is performing best?",
      "How is my team's productivity?",
    ]
  }

  if (pathname.includes("/dashboard/customers")) {
    return [
      "Why do I have 156 customers?",
      "Which customers are high-value?",
      "How can I reduce churn?",
    ]
  }

  if (pathname.includes("/dashboard/payments")) {
    return [
      "Why is collection rate 78%?",
      "Which payments are most overdue?",
      "How to improve cash flow?",
    ]
  }

  if (pathname.includes("/dashboard/activities")) {
    return [
      "Why only 38 activities today?",
      "Who is the top performing rep?",
      "How to increase team productivity?",
    ]
  }

  if (pathname.includes("/dashboard/catalog")) {
    return [
      "Which products sell the most?",
      "What items are low on stock?",
      "Should I add new products?",
    ]
  }

  if (pathname.includes("/dashboard/schemes")) {
    return [
      "Which scheme is most effective?",
      "How to create better promotions?",
      "Are schemes profitable?",
    ]
  }

  // Default dashboard questions
  return [
    "Why is outstanding ₹27.5L?",
    "How can I improve collection rate?",
    "Which customers should I prioritize?",
    "What's driving the 68% conversion rate?",
  ]
}
