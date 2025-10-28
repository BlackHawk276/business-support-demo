"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, IndianRupee, BarChart } from "lucide-react"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function BenefitCard({ icon, title, description, delay }: BenefitCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
        <div className="text-blue-600">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function Benefits() {
  const benefits = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Track Every Interaction",
      description:
        "Log calls, visits, and meetings in seconds. GPS verification for field visits.",
    },
    {
      icon: <IndianRupee className="w-7 h-7" />,
      title: "Never Miss a Payment",
      description:
        "Automated reminders, aging analysis, and seamless Tally integration.",
    },
    {
      icon: <BarChart className="w-7 h-7" />,
      title: "Dashboard That Matters",
      description:
        "See your team's performance and cash flow in real-time.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
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
            Everything You Need to{" "}
            <span className="text-blue-600">Grow Your Business</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed specifically for Indian businesses
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
