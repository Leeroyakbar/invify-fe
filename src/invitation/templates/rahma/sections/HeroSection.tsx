// sections/HeroSection.tsx
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import type { Invitation } from "../../../../types/Invitation"

export default function HeroSection({ data }: { data: Invitation }) {
  const containerRef = useRef(null)

  // Parallax effect untuk background agar terasa lebih dalam saat di-scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={containerRef} id="hero" className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-8 md:p-16 bg-black">
      {/* 1. BACKGROUND LAYER */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <img src="/rahma/gallery-10.webp" alt="Hero Background" className="w-full h-full object-cover object-[70%_center] md:object-[90%_center] opacity-70" />
        {/* Multilayer Overlay untuk kedalaman visual */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-black/20 backdrop-grayscale-[20%]" />
      </motion.div>

      {/* 2. TOP CONTENT: Editorial Label */}
      <div className="relative z-10 flex flex-col gap-4">   
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-white/40" />
          <p className="font-montserrat text-[9px] uppercase tracking-[0.6em] text-white/60 leading-relaxed">The Wedding Celebration</p>
        </motion.div>
      </div>

      {/* 3. CENTER/BOTTOM CONTENT: Names & Date */}
      <div className="relative z-10">
        <div className="mb-12 space-y-2">
          {/* Accent text menggunakan Reenie Beanie */}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1, duration: 1.5 }} className="font-reenie-beanie text-3xl text-white/80 block -mb-4 ml-1">
            The Union of
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            className="font-cinzel text-white text-[48px] md:text-[80px] leading-[0.9] font-light uppercase tracking-tighter"
          >
            {data.brideName} <br />
            <span className="flex items-center gap-6">
              <span className="text-2xl md:text-4xl text-white/30 font-montserrat italic">&</span>
              {data.groomName}
            </span>
          </motion.h1>
        </div>

        {/* Info Bar dengan Montserrat */}
        <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} transition={{ duration: 1.5, delay: 1.2 }} className="flex items-center gap-6">
          <p className="font-montserrat text-white/90 text-[11px] uppercase tracking-[0.5em] whitespace-nowrap">{data.eventDateFormatted.split(" • ").slice(0, 2).join(" / ")}</p>
          <div className="h-[0.5px] bg-white/30 flex-1" />
          <p className="font-montserrat text-white/90 text-[11px] tracking-[0.5em] font-light">2027</p>
        </motion.div>
      </div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-6 right-8 flex flex-col items-center gap-4">
        <span className="font-montserrat text-[8px] uppercase tracking-[0.4em] text-white/20 vertical-text rotate-180" style={{ writingMode: "vertical-rl" }}>
          Scroll to explore
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}
