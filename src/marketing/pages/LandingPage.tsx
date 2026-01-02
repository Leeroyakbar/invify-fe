import Navbar from "../components/layout/Navbar"
import AboutSection from "../components/sections/AboutSection"
import FeaturesSection from "../components/sections/FeaturesSection"
import HeroSection from "../components/sections/HeroSection"
import TemplatesSection from "../components/sections/TemplatesSection"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TemplatesSection />
    </>
  )
}
