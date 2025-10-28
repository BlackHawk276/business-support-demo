"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  Plug,
  Bell,
  CreditCard,
  Shield,
  Check,
  Globe,
  Mail,
  MessageSquare,
  Smartphone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("company")

  const sections = [
    { id: "company", label: "Company Profile", icon: Building2 },
    { id: "preferences", label: "User Preferences", icon: Globe },
    { id: "team", label: "Team Management", icon: Users },
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === "company" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Company Profile
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">B</span>
                    </div>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Change Logo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Business Support Pro"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Type
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>FMCG Distribution</option>
                      <option>Electronics</option>
                      <option>Pharmaceuticals</option>
                      <option>Wholesale Trade</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      defaultValue="27AABCU9603R1ZM"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      defaultValue="AABCU9603R"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Registered Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Plot 123, Andheri East, Mumbai, Maharashtra - 400069"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Save Changes
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "preferences" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                User Preferences
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Language
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                      <option>Gujarati</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date Format
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency Format
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>₹ 1,00,000 (Indian)</option>
                      <option>₹ 100,000 (International)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Timezone
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>IST (UTC+5:30)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Notification Preferences
                  </h3>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">
                      Email Notifications
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">
                      SMS Notifications
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">
                      Push Notifications
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "team" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Team Management
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Invite Team Member
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Rahul Sharma",
                    email: "rahul@company.com",
                    role: "Sales Manager",
                    status: "Active",
                  },
                  {
                    name: "Priya Patel",
                    email: "priya@company.com",
                    role: "Sales Rep",
                    status: "Active",
                  },
                  {
                    name: "Vikram Singh",
                    email: "vikram@company.com",
                    role: "Sales Rep",
                    status: "Active",
                  },
                  {
                    name: "Anjali Desai",
                    email: "anjali@company.com",
                    role: "Accountant",
                    status: "Active",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        {member.role}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        {member.status}
                      </Badge>
                      <button className="text-sm text-slate-600 hover:text-slate-900">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "integrations" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Integrations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Tally</h3>
                        <p className="text-xs text-slate-600">
                          Accounting Software
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Last synced: 2 hours ago
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Configure
                    </button>
                    <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                      Disconnect
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          WhatsApp Business
                        </h3>
                        <p className="text-xs text-slate-600">Messaging</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100">
                      Not Connected
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Send automated messages to customers
                  </p>
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Connect WhatsApp
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          SMS Gateway
                        </h3>
                        <p className="text-xs text-slate-600">
                          Text Messaging
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100">
                      Not Connected
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Send payment reminders via SMS
                  </p>
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Connect SMS
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Email Service
                        </h3>
                        <p className="text-xs text-slate-600">
                          Gmail Integration
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Provider: Gmail
                  </p>
                  <button className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Notification Preferences
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Notification Type
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                        SMS
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                        Push
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                        In-App
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      {
                        type: "Payment Received",
                        email: true,
                        sms: true,
                        push: true,
                        inApp: true,
                      },
                      {
                        type: "Payment Overdue",
                        email: true,
                        sms: true,
                        push: true,
                        inApp: true,
                      },
                      {
                        type: "New Order",
                        email: true,
                        sms: false,
                        push: true,
                        inApp: true,
                      },
                      {
                        type: "Low Stock",
                        email: true,
                        sms: false,
                        push: true,
                        inApp: true,
                      },
                      {
                        type: "Team Activity",
                        email: false,
                        sms: false,
                        push: true,
                        inApp: true,
                      },
                      {
                        type: "System Updates",
                        email: true,
                        sms: false,
                        push: false,
                        inApp: true,
                      },
                    ].map((notif, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {notif.type}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={notif.email}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={notif.sms}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={notif.push}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={notif.inApp}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 pt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Billing & Subscription
              </h2>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Professional Plan
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Annual billing cycle
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        ₹2,000
                      </p>
                      <p className="text-sm text-slate-600">per year</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Next billing date: <strong>January 1, 2025</strong>
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Upgrade Plan
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Payment Method
                  </h3>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-slate-600">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Update
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Billing History
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        date: "Jan 1, 2024",
                        invoice: "INV-2024-001",
                        amount: 2000,
                      },
                      {
                        date: "Jan 1, 2023",
                        invoice: "INV-2023-001",
                        amount: 2000,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {item.invoice}
                          </p>
                          <p className="text-xs text-slate-600">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-slate-900">
                            ₹{item.amount.toLocaleString()}
                          </p>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Security Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Change Password
                  </h3>
                  <div className="space-y-3 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Enable 2FA
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      Configure 2FA
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Active Sessions
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        device: "Chrome on Windows",
                        location: "Mumbai, India",
                        time: "Active now",
                      },
                      {
                        device: "Safari on iPhone",
                        location: "Mumbai, India",
                        time: "2 hours ago",
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {session.device}
                          </p>
                          <p className="text-xs text-slate-600">
                            {session.location} • {session.time}
                          </p>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          Sign out
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-sm text-red-600 hover:text-red-700">
                    Sign out all other sessions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
