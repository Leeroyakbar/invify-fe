import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { type Invitation } from "../../../../types/Invitation"

export default function CountdownSection({ data }: { data: Invitation }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const containerRef = useRef(null)

  // Efek Parallax untuk background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const xMove = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

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
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [data.eventDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ]

  return (
    <section ref={containerRef} className="relative py-40 overflow-hidden bg-transparent border-t border-white/5">
      {/* Background Running Text (Subtle) */}
      <motion.div style={{ x: xMove }} className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
        <span className="font-cinzel text-[180px] font-bold tracking-[0.2em] uppercase">Save The Date • {data.eventDateFormatted} • Save The Date •</span>
      </motion.div>

      <div className="relative z-10 px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block">The Final Countdown</span>
            <h2 className="font-cinzel text-2xl text-white tracking-[0.4em] uppercase">Till We Tie The Knot</h2>
          </div>

          {/* Countdown Grid */}
          <div className="flex justify-center items-start gap-6 md:gap-12">
            {timeUnits.map((unit, idx) => (
              <div key={unit.label} className="flex flex-col items-center group">
                <div className="relative">
                  {/* Decorative circle behind number */}
                  <div className="absolute inset-0 scale-150 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <span className="relative font-cinzel text-5xl md:text-6xl text-white font-light tracking-tighter">{unit.value < 10 ? `0${unit.value}` : unit.value}</span>
                </div>

                <span className="font-montserrat text-[8px] uppercase tracking-[0.4em] text-white/20 mt-4 group-hover:text-white/50 transition-colors">{unit.label}</span>

                {/* Divider small dots */}
                {idx !== timeUnits.length - 1 && <div className="hidden absolute top-1/2 right-0 w-[1px] h-8 bg-white/5" />}
              </div>
            ))}
          </div>

          {/* Date Footer */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-10 flex flex-col items-center gap-6">
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="font-cinzel text-sm text-white/60 tracking-[0.5em] uppercase">{data.eventDateFormatted}</p>

            {/* Add to Calendar Button (Optional) */}
            <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[9px] font-montserrat uppercase tracking-[0.3em] text-white/40 hover:bg-white/10 hover:text-white/80 transition-all active:scale-95 mt-4">
              Add to Calendar
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
