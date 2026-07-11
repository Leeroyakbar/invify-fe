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

  // Varian animasi masuk sinematik (Cubic Bezier Premium)
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
      <section className="h-screen snap-start relative overflow-hidden bg-[#0a0a0a]" id="home">
        {/* Video Background - Diposisikan aman lewat hardware acceleration */}
        <video
            autoPlay loop muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-50 transform-gpu mix-blend-lighten"
            src="https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/video-1.webm"
        />

        {/* Advanced Noir Multilayer Overlay (Vignette & Shadow perlindungan kontras) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.85)_100%)] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#0a0a0a] z-10 pointer-events-none" />

        {/* Bingkai Garis Tipis Teatrikal Poster Film */}
        <div className="absolute inset-6 border border-white/4 z-10 pointer-events-none" />

        {/* KONTEN UTAMA */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-8 text-white">

          <motion.div
              initial="hidden"
              animate={isOpened ? "visible" : "hidden"}
              className="flex flex-col items-center relative z-10 w-full"
          >
            {/* Subtitle Atas */}
            <motion.span
                custom={0.4}
                variants={fadeInUp}
                className="text-[9px] tracking-[0.7em] uppercase mb-8 text-white/40 font-sans font-bold pl-[0.7em]"
            >
              The Wedding Celebration
            </motion.span>

            {/* Judul Nama Utama (Gaya Poster Sinema Klasik) */}
            <motion.h1
                custom={0.6}
                variants={fadeInUp}
                className="font-serif text-4xl sm:text-5xl md:text-6xl mb-8 flex flex-col items-center gap-1 uppercase tracking-widest font-light leading-tight text-white/95"
            >
              <span>{data?.brideName.split(" ")[0]}</span>
              <span className="font-sans text-[11px] tracking-[0.4em] text-white/20 my-1 block lowercase italic">— and —</span>
              <span>{data?.groomName.split(" ")[0]}</span>
            </motion.h1>

            {/* Blok Penutup Tanggal Gantung */}
            <motion.div custom={0.8} variants={fadeInUp} className="flex flex-col items-center w-full">
              <div className="w-8 h-px bg-white/20 mb-4" />
              <p className="tracking-[0.4em] text-[10px] sm:text-[11px] uppercase text-white/60 font-sans font-medium pl-[0.4em]">
                {eventDateFormatted}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR INTERAKTIF CINEMATIC */}
        <motion.a
            onClick={scrollToSection}
            initial={{ opacity: 0 }}
            animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 cursor-pointer group select-none"
        >
          <div className="flex flex-col items-center gap-1">
          <span className="text-[8px] tracking-[0.5em] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-400 pl-[0.5em] mb-2 font-bold">
            Scroll
          </span>
            <div className="relative flex flex-col items-center h-8 w-4 overflow-hidden">
              {/* Animasi panah bergulir lurus ke bawah konstan */}
              <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute"
              >
                <ChevronDown className="w-4 h-4 text-white/50 stroke-[1.25px]" />
              </motion.div>
            </div>
          </div>
        </motion.a>
      </section>
  )
}
