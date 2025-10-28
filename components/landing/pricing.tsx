"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Pricing() {
  const features = [
    "Unlimited users",
    "Sales activity tracking",
    "Payment management",
    "Tally ERP integration",
    "Mobile apps (iOS & Android)",
    "WhatsApp reminders",
    "GPS verification",
    "Real-time analytics",
    "Priority support",
    "Free updates",
  ]

  return (
    <section id="pricing" className="py-20 md:py-24 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            No hidden fees. Start with a 30-day free trial.
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
            {/* Badge */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 font-semibold">
              Most Popular Plan
            </div>

            <div className="p-8 md:p-12">
              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="text-slate-600 mb-2">One-time Setup Fee</div>
                <div className="text-5xl md:text-6xl font-bold text-slate-900 mb-1">
                  ₹18,000
                </div>
                <div className="text-slate-500 mb-6">+ GST</div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="text-slate-600 mb-2">Annual Subscription</div>
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">
                    ₹2,000
                    <span className="text-2xl text-slate-500 font-normal">/year</span>
                  </div>
                  <div className="text-slate-500">+ GST</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="font-semibold text-slate-900 mb-4">Everything included:</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Start 30-Day Free Trial
              </Link>
              <p className="text-center text-sm text-slate-500 mt-4">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-4">Trusted by businesses across India</p>
            <div className="flex justify-center gap-8 text-slate-400">
              <div>✓ 100% Secure</div>
              <div>✓ Data Privacy</div>
              <div>✓ 24/7 Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
