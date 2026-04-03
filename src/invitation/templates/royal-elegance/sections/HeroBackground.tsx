import { useEffect, useState } from "react"
import type { Invitation } from "../../../../types/Invitation"
import { motion, AnimatePresence } from "framer-motion"

export function HeroBackground({ data }: { data: Invitation }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = data.images && data.images.length > 0 ? data.images : [data.coverImage]

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 6000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <AnimatePresence mode="popLayout">
      <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute inset-0">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${images[currentIndex]}')` }} />
        {/* Overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
    </AnimatePresence>
  )
}
