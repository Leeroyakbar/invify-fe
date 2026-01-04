import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function CountdownSection({ data }: { data: Invitation }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(data.eventDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference < 0) {
        clearInterval(interval)
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [data.eventDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Decorative Arch (Bingkai Lengkung Klasik) */}
      <div className="absolute inset-x-10 inset-y-20 border border-stone-200 rounded-t-full pointer-events-none opacity-40" />

      <div className="z-10 text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] tracking-[0.6em] uppercase text-stone-400 block mb-12">
          Saving the Date
        </motion.span>

        {/* Display Angka - Tipografi yang Sangat Ringan */}
        <div className="flex gap-8 md:gap-16 justify-center items-end mb-16">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 1 }} className="font-serif text-5xl md:text-8xl text-stone-800 font-light">
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mt-4 italic font-serif">{unit.label}</span>
            </div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center space-y-6">
          <div className="w-[1px] h-12 bg-stone-200" />
          <p className="font-serif italic text-stone-600 text-lg md:text-xl">Until we say "I Do"</p>
          <div className="text-[10px] tracking-[0.4em] text-stone-400 uppercase">{data.eventDateFormatted}</div>
        </motion.div>
      </div>

      {/* Ornament Corner */}
      <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
        <div className="text-[6rem] font-serif italic text-stone-300 select-none">&</div>
      </div>
    </section>
  )
}
