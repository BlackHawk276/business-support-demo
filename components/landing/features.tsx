"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, Smartphone, TrendingUp } from "lucide-react"

interface FeatureProps {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  imagePosition: "left" | "right"
  gradient: string
}

function FeatureSection({ title, description, features, icon, imagePosition, gradient }: FeatureProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contentOrder = imagePosition === "left" ? "md:order-2" : "md:order-1"
  const imageOrder = imagePosition === "left" ? "md:order-1" : "md:order-2"

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center mb-24">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={contentOrder}
      >
        <div className="mb-6 inline-block p-3 bg-blue-100 rounded-lg">
          <div className="text-blue-600">{icon}</div>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {title}
        </h3>
        <p className="text-lg text-slate-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image placeholder */}
      <motion.div
        initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={imageOrder}
      >
        <div className={`relative w-full h-[400px] rounded-2xl ${gradient} shadow-xl overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

          {/* Mock content */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
              <div className="h-3 bg-slate-200 rounded w-2/3 mb-6" />
              <div className="space-y-3 mb-6">
                <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg" />
                <div className="h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-lg" />
                <div className="h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg" />
              </div>
              <div className="h-2 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Features() {
  const featureList = [
    {
      title: "Sales Activity Tracking",
      description: "Keep your sales team accountable with detailed activity logs and GPS-verified field visits.",
      features: [
        "Log calls, meetings, and visits instantly",
        "GPS verification for field visits",
        "Real-time activity dashboard",
        "Performance analytics and reports",
      ],
      icon: <TrendingUp className="w-8 h-8" />,
      imagePosition: "left" as const,
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      title: "Payment Dashboard",
      description: "Stay on top of collections with automated reminders and aging analysis integrated with Tally.",
      features: [
        "Automated payment reminders via WhatsApp",
        "Aging analysis and reports",
        "Seamless Tally ERP integration",
        "Collection forecasting",
      ],
      icon: <CheckCircle2 className="w-8 h-8" />,
      imagePosition: "right" as const,
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      title: "Mobile App for Sales Reps",
      description: "Empower your team with a mobile-first experience designed for field sales.",
      features: [
        "iOS and Android apps",
        "Offline mode for rural areas",
        "Quick check-in with one tap",
        "Customer history at your fingertips",
      ],
      icon: <Smartphone className="w-8 h-8" />,
      imagePosition: "left" as const,
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
  ]

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Features That <span className="text-blue-600">Drive Results</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for Indian businesses, designed for growth
          </p>
        </motion.div>

        {/* Features */}
        {featureList.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}
