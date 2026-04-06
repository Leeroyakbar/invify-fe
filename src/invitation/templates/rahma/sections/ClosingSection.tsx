import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { type Invitation } from "../../../../types/Invitation"
import { Heart } from "lucide-react"

export default function ClosingSection({ data }: { data: Invitation }) {
  const [currentImage, setCurrentImage] = useState(0)
  const images = data.images.length > 0 ? data.images : ["/rahma/gallery-15.webp"]

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section id="closing" className="relative h-screen w-full overflow-hidden flex flex-col">
      {/* 1. TOP BOXED IMAGE (Slideshow Section) */}
      <div className="relative h-[50%] w-full flex flex-col items-center justify-center pt-16 shrink-0">
        <div className="relative">
          {/* HANDWRITING ACCENT: "Thank You" */}
          <motion.span
            initial={{ opacity: 0, rotate: -10, x: -20 }}
            whileInView={{ opacity: 0.7, rotate: -12, x: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute -top-10 -left-12 font-reenie-beanie text-4xl md:text-5xl text-white z-20 pointer-events-none select-none"
          >
            Thank You
          </motion.span>

          {/* Frame Kotak */}
          <div className="relative w-48 h-64 md:w-56 md:h-72 border border-white/10 p-2 bg-white/2 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${images[currentImage]}')` }}
              />
            </AnimatePresence>

            {/* Aksen Sudut Kotak */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/30" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/30" />
          </div>
        </div>

        {/* Name Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8 text-center">
          <span className="font-montserrat text-[8px] uppercase tracking-[0.8em] text-white/40 block mb-2">The Journey Begins</span>
          <h2 className="font-cinzel text-2xl text-white tracking-[0.2em] uppercase">
            {data.brideName} <span className="text-lg opacity-30">&</span> {data.groomName}
          </h2>
        </motion.div>
      </div>

      {/* 2. THANK YOU MESSAGE */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-8 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-center gap-3 opacity-20">
            <div className="h-[0.5px] w-6 bg-white" />
            <Heart size={10} className="fill-white" />
            <div className="h-[0.5px] w-6 bg-white" />
          </div>

          <p className="font-montserrat text-[10px] text-white/40 leading-relaxed tracking-[0.2em] uppercase italic max-w-[240px] mx-auto">Your presence and prayers are the greatest gifts for our new chapter.</p>

          <div className="pt-2">
            <span className="font-reenie-beanie text-2xl text-white/60 block -mb-1">With Love,</span>
            <p className="font-cinzel text-[11px] text-white tracking-[0.4em] uppercase">
              {data.brideName} & {data.groomName}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3. FOOTER */}
      <footer className="relative py-8 shrink-0 flex flex-col items-center justify-center gap-3 border-t border-white/5 bg-[#0A0A0A]">
        <div className="flex flex-col items-center group">
          <span className="font-montserrat text-[7px] uppercase tracking-[0.5em] text-white/20 mb-1 group-hover:text-white/40 transition-colors">Digital Invitation by</span>
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-md text-white tracking-[0.2em] font-bold">INVIFY</span>
            <div className="h-1 w-1 bg-white rounded-full animate-pulse" />
            <span className="font-montserrat text-[9px] text-white/40 tracking-widest uppercase">STUDIO</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
