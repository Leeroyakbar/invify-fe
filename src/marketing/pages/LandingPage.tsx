import Navbar from "../components/layout/Navbar"
import AboutSection from "../components/sections/AboutSection"
import ContactSection from "../components/sections/ContactSection"
import FeaturesSection from "../components/sections/FeaturesSection"
import Footer from "../components/layout/Footer"
import HeroSection from "../components/sections/HeroSection"
import PricingSection from "../components/sections/PricingSection"
import TemplatesSection from "../components/sections/TemplatesSection"
import TestimonialSection from "../components/sections/TestimonialSection"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TemplatesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </>
  )
}

// │  ├─ ContactSection.tsx
// │  └─ CTASection.tsx
// │
