import { Header } from "@/components/layout/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
