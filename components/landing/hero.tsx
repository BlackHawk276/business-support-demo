"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Transform Your Business{" "}
              <span className="text-blue-600">Operations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              Track your sales team, manage payments, and integrate with Tally -
              all in one powerful platform
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-center"
              >
                Start Free Demo
              </Link>
              <button className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Video
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />

              {/* Mock dashboard preview */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-slate-100 rounded" />
                    <div className="h-16 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">30-Day Trial</div>
                  <div className="text-sm text-slate-600">No credit card required</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
