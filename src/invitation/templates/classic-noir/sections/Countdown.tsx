import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { useCountdown } from "../../../../hooks/useCountDown"
import { createGoogleCalendarLink } from "../../../../utils/utils"
import { memo } from "react"

function parseEventDate(dateString: string) {
  return new Date(dateString.replace(" ", "T"))
}

export default function CountdownSection({ data }: { data: Invitation }) {
  const targetDate = parseEventDate(data.eventDate)
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  // Formula transisi masuk premium yang stabil (Cubic Bezier Luxury)
  const noirFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <section id="countdown" className="h-screen snap-start flex items-center justify-center text-white relative overflow-hidden bg-transparent subpixel-antialiased">

        {/* 1. ELEMEN ORNAMEN LATAR BELAKANG GEOMETRIS NOIR */}
        <div className="absolute inset-x-8 top-1/2 h-px bg-white/2 transform -translate-y-1/2 z-0 pointer-events-none select-none" />

        {/* 2. CORE CONTAINER CONTROLLER */}
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={noirFadeUp}
            className="text-center relative z-10 px-6 max-w-md w-full flex flex-col items-center"
        >
          {/* Subtitle Label Atas */}
          <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-3 pl-[0.5em]">
          The Timepiece
        </span>

          {/* Judul Utama Seksi */}
          <h2 className="font-serif text-3xl mb-14 tracking-wide text-white/95">
            Almost Time for Celebration
          </h2>

          {/* DISPLAY TIMER GRID (Menggunakan pembatas garis vertikal menggantung minimalis) */}
          <div className="flex items-center justify-between w-full mb-16 px-2 select-none">
            <TimeBox label="Days" value={days} />
            <div className="h-6 w-px bg-white/6 -mt-4" />

            <TimeBox label="Hours" value={hours} />
            <div className="h-6 w-px bg-white/6 -mt-4" />

            <TimeBox label="Mins" value={minutes} />
            <div className="h-6 w-px bg-white/6 -mt-4" />

            <TimeBox label="Secs" value={seconds} />
          </div>

          {/* LUXURY TICKET-STYLE CALENDAR BUTTON */}
          <div className="pt-2">
            <button
                onClick={() => window.open(createGoogleCalendarLink(data), "_blank")}
                className="group relative border border-white/10 px-12 py-4 text-[9px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 hover:border-white rounded-none backdrop-blur-xs active:scale-95 shadow-2xl text-white"
            >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-semibold pl-[0.5em]">
              Save The Date
            </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[500ms] ease-[0.16,1,0.3,1]" />
            </button>
          </div>
        </motion.div>
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: TIME BOX TIMER (MEMOIZED)
// =========================================================
const TimeBox = memo(({ label, value }: { label: string; value: number }) => {
  return (
      <div className="flex flex-col items-center flex-1">
        {/* Bingkai Tinggi Statis untuk Wadah Animasi Angka Gulir */}
        <div className="relative h-14 overflow-hidden flex items-center justify-center w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
                key={value} // Memicu transisi memudar-bergeser yang halus setiap detik berganti
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.95 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-serif font-light leading-none text-white/95 tracking-tighter"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Label Indikator Waktu */}
        <span className="text-[8px] tracking-[0.25em] text-white/40 uppercase font-sans font-bold mt-3 pl-[0.25em]">
        {label}
      </span>
      </div>
  )
})

TimeBox.displayName = "TimeBox"

