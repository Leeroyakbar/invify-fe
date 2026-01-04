import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function AnnouncementVideoSection({ data, isOpened }: { data: Invitation; isOpened: boolean }) {
  const eventDate = new Date(data.eventDate)
  const eventDayName = eventDate.toLocaleString("id-ID", { weekday: "long" })
  const eventDay = eventDate.getDate()
  const eventMonth = eventDate.toLocaleString("id-ID", { month: "long" })
  const eventYear = eventDate.getFullYear()
  const eventDateFormatted = `${eventDayName}, ${eventDay} ${eventMonth} ${eventYear}`

  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector("#quote")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Varian animasi untuk teks
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: custom,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  }

  return (
    <section className="h-screen snap-start relative overflow-hidden bg-black" id="home">
      {/* Video Background dengan Penyesuaian Opacity */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" src="/classic-noir/video-1.mp4" />

      {/* Overlay Cinematic (Vignette Effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Konten Utama */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <motion.div
          initial="hidden"
          animate={isOpened ? "visible" : "hidden"} // KUNCINYA DI SINI
          viewport={{ once: false, amount: 0.4 }}
          className="flex flex-col items-center"

        >
          <motion.span custom={0.5} variants={fadeInUp} className="text-[10px] tracking-[0.6em] uppercase mb-6 opacity-60">
            The Wedding of
          </motion.span>

          <motion.h1 custom={0.8} variants={fadeInUp} className="font-serif text-4xl md:text-6xl mb-6 flex flex-col md:flex-row gap-2 md:gap-6 items-center italic">
            <span className="not-italic">{data?.brideName.split(" ")[0]}</span>
            <span className="text-xl md:text-3xl opacity-40">&</span>
            <span className="not-italic">{data?.groomName.split(" ")[0]}</span>
          </motion.h1>

          <motion.div custom={1.1} variants={fadeInUp} className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-white/30 mb-4" />
            <p className="tracking-[0.3em] text-[11px] uppercase font-light">{eventDateFormatted}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR (Gaya Minimalis) */}
      <motion.a onClick={scrollToSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer group">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[0.4em] uppercase opacity-30 group-hover:opacity-100 transition-opacity duration-500 mb-2">Scroll</span>
          <div className="relative flex flex-col items-center">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5 text-white/40" strokeWidth={1} />
            </motion.div>
            <ChevronDown className="w-5 h-5 text-white/10 -mt-3" strokeWidth={1} />
          </div>
        </div>
      </motion.a>
    </section>
  )
}
