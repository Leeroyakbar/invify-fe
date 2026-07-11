import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import type { Invitation } from "../../../../types/Invitation"
import {createGoogleCalendarLink} from "../../../../utils/utils.ts";

interface CountdownSectionProps {
  data: Invitation
}

export default function CountdownSection({ data }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ HARI: "00", JAM: "00", MENIT: "00", DETIK: "00" })

  useEffect(() => {
    const targetDate = new Date(data.eventDate).getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        HARI: Math.floor(distance / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, "0"),
        JAM: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            .toString()
            .padStart(2, "0"),
        MENIT: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            .toString()
            .padStart(2, "0"),
        DETIK: Math.floor((distance % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0"),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [data.eventDate])

  // Premium Custom Cubic Bezier Curve for Luxury Animations
  const luxuryFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    },
  }

  return (
      <section className="relative w-full py-28 px-8 flex flex-col items-center bg-transparent text-white subpixel-antialiased">
        <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">

          {/* 1. HEADER SECTION */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={luxuryFadeUp}
              className="space-y-3 mb-16"
          >
            <span className="text-[9px] tracking-[0.6em] uppercase text-white/30 font-inter font-bold block pl-[0.6em]">The Celebration</span>
            <h2 className="font-cormorant-upright text-4xl md:text-5xl text-white/95 tracking-wider uppercase font-light">Save the Date</h2>
            <div className="h-px w-6 bg-white/20 mx-auto my-3" />
            <p className="font-inter text-[10px] text-white/50 tracking-[0.3em] uppercase pl-[0.3em] font-medium">{data.eventDateFormatted}</p>
          </motion.div>

          {/* 2. HIGH-END EDITORIAL COUNTDOWN DISPLAY */}
          {/* Menghapus garis kotak kaku, diganti dengan pembatas vertikal tipis transparan */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={luxuryFadeUp}
              className="flex w-full justify-between items-center px-2 mb-20 gap-2 md:gap-4 select-none"
          >
            {Object.entries(timeLeft).map(([label, value], index, array) => (
                <div key={label} className="flex flex-1 flex-col items-center relative">

                  {/* Angka Timer Raksasa dengan Wadah Animasi Pengganti Angka */}
                  <div className="h-14 md:h-16 flex items-center justify-center overflow-hidden relative w-full">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                          key={value} // Memicu re-render transisi halus setiap detik berubah
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.45, ease: "easeInOut" }}
                          className="font-cormorant-upright text-4xl md:text-5xl text-white/95 font-light tracking-normal block"
                      >
                        {value}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Label Kategori */}
                  <span className="font-inter text-[8px] tracking-[0.25em] text-white/40 uppercase font-bold mt-2 pl-[0.25em]">
                {label}
              </span>

                  {/* Pembatas Elemen Vertikal Eksklusif (Tidak muncul di kolom terakhir) */}
                  {index < array.length - 1 && (
                      <div className="absolute right-0 top-4 h-6 w-px bg-white/6" />
                  )}
                </div>
            ))}
          </motion.div>

          {/* 3. LUXURY CALENDAR BUTTON */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={luxuryFadeUp}
          >
            <button
                onClick={() => window.open(createGoogleCalendarLink(data), "_blank")}
                className="group relative border border-white/10 px-12 py-4 text-[9px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 hover:border-white rounded-none backdrop-blur-xs active:scale-95 shadow-xl"
            >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-semibold pl-[0.5em]">
              Simpan Tanggal
            </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-450 ease-[0.19,1,0.22,1]" />
            </button>
          </motion.div>

        </div>
      </section>
  )
}
