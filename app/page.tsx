import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Stats from "@/components/landing/stats"
import Benefits from "@/components/landing/benefits"
import Features from "@/components/landing/features"
import Pricing from "@/components/landing/pricing"
import Footer from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Benefits />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
