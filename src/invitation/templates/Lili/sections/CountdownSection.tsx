import { easeOut, motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { Invitation } from "../../../../types/Invitation"

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

  const fadeUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: easeOut },
  }

  return (
    <section className="relative w-full py-16 px-8 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-sm text-center">
        {/* HEADER: Lebih Kecil & Rapat */}
        <motion.div {...fadeUp} className="mb-6">
          <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white uppercase">Save the Date</h2>
          <p className="font-inter text-[10px] text-white/50 tracking-[0.4em] uppercase mt-2">Sabtu, {data.eventDateFormatted}</p>
        </motion.div>

        {/* COUNTDOWN: Compact Box Style */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-4 border-y border-white/10 py-6 mb-8">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-cormorant-upright text-3xl text-white tracking-tighter">{value}</span>
              <span className="font-inter text-[8px] tracking-[0.2em] text-white/40 mt-1">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* BUTTON: Lebih Kecil & Minimalis */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
          <button
            onClick={() => {
              /* logic calendar sama */
            }}
            className="px-8 py-3 border border-white/20 rounded-sm text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            <span className="font-inter text-[10px] tracking-[0.3em]  uppercase">Simpan Tanggal</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
