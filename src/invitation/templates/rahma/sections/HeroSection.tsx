// sections/HeroSection.tsx
import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function HeroSection({ data }: { data: Invitation }) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-8 md:p-12">
      <div className="absolute inset-0 z-0">
        <img
          src="/rahma/gallery-10.webp" // Ganti dengan path foto utama pengantin
          alt="Hero Background"
          className="w-full h-full object-cover object-[0%_center] md:object-[90%_center]"
        />
        {/* 2. Dark Overlay - Menjaga kontras teks */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient tambahan untuk memperkuat nuansa deep di bawah */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80" />
      </div>
      {/* Top Info: Montserrat */}
      <div className="relative z-10 flex justify-between items-start pt-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/70 leading-relaxed">
            Sincerely Invited <br />
            The Wedding Celebration
          </p>
        </motion.div>
      </div>

      {/* Bottom Info: Names (Cinzel) & Date (Montserrat) */}
      <div className="relative z-10 pb-10">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="mb-10">
          {/* Judul Utama dengan Cinzel */}
          <h1 className="font-cinzel text-white text-[42px] md:text-[54px] leading-tight font-semibold uppercase tracking-wide">
            {data.brideName} <br />
            <span className="flex items-center gap-4">& {data.groomName}</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex items-center gap-4 w-full">
          <div className="h-[0.5px] bg-white/20 flex-1" />
          {/* Caption/Details dengan Montserrat */}
          <p className="font-montserrat text-white/80 text-[10px] uppercase tracking-[0.5em] whitespace-nowrap">{data.eventDateFormatted.split(" • ").slice(0, 2).join(" / ")}</p>
          <div className="h-[0.5px] bg-white/20 flex-1" />
          <p className="font-montserrat text-white/80 text-[10px] tracking-[0.5em]">2027</p>
        </motion.div>
      </div>

      {/* Subtle Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
