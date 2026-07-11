import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface LiveStreamSectionProps {
  data: Invitation
}

export default function LiveStreamSection({ data }: LiveStreamSectionProps) {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] as const },
  }

  return (
    <section className="relative w-full py-20 px-8 flex flex-col items-center justify-center">
      {/* CARD CONTAINER: Menggunakan aspect-square atau auto agar foto tidak stretch */}
      <motion.div {...fadeUp} className="relative z-10 w-full py-20 max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0F0F0F]">
        {/* Background Image: Object-cover memastikan foto terpotong rapi, bukan ditarik/stretch */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={data.images[2]} alt="Live Background" className="w-full h-full object-cover opacity-30 scale-110 transition-transform duration-[3s] hover:scale-100" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/80" />
        </div>

        {/* CONTENT (Z-10) */}
        <div className="relative z-10 py-14 px-8  flex flex-col items-center">
          {/* HEADER: Minimalist Label */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center mb-8">
            <span className="text-[9px] tracking-[0.5em] text-white/40 font-inter uppercase font-bold block mb-4">Digital Celebration</span>
            <h2 className="font-cormorant-upright text-4xl text-white tracking-[0.1em] uppercase font-light">Live Stream</h2>
            <div className="h-[1px] w-8 bg-white/20 mx-auto mt-4" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="text-center mb-10 space-y-4">
            <p className="text-white/70 font-inter text-[12px] leading-relaxed font-light italic px-2">"Jarak bukanlah penghalang untuk berbagi kebahagiaan. Melalui layar ini, kami mengundang Anda menjadi saksi janji suci kami."</p>

            <div className="py-4 border-y border-white/5 space-y-1">
              <p className="font-inter text-white text-xs tracking-[0.2em] uppercase font-semibold">{data.eventDateFormatted}</p>
              <p className="font-inter text-white/50 text-[11px] tracking-wider">Dimulai Pukul {data.akadTimeStart} WIB</p>
            </div>
          </motion.div>

          {/* ACTION AREA */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="w-full flex flex-col items-center gap-6">
            {/* Button: Refined Monochrome */}
            <a href={data.groomInstagram} target="_blank" rel="noopener noreferrer" className="group relative w-full py-4 bg-transparent border border-white/20 rounded-sm overflow-hidden transition-all duration-500 hover:border-white">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19, 1, 0.22, 1]" />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="font-inter text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-500 font-bold">Join Live</span>
                <ExternalLink size={12} className="text-white group-hover:text-black transition-colors duration-500" />
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
