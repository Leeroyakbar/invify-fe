import { useEffect, useState } from "react"
import type { Invitation } from "../../types/Invitation"
import CountdownItem from "../../ui/countdownItem"
import { stagger, fadeUp, scaleFade } from "../../motions/cek"
import { motion } from "framer-motion"

function getTimeRemaining(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now()

  const seconds = Math.max(Math.floor((total / 1000) % 60), 0)
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0)
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0)
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0)

  return { total, days, hours, minutes, seconds }
}

export default function Countdown({ data }: { data: Invitation }) {
  const [time, setTime] = useState(() => getTimeRemaining(data.eventDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(data.eventDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [data.eventDate])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-6 text-center bg-merlot-500 text-white overflow-hidden">
      <motion.div className="flex flex-col items-center" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }}>
        {/* ORNAMEN */}
        <motion.img src="/modern/rose.png" alt="" className="w-68 mb-4" variants={scaleFade} />

        {/* TITLE */}
        <motion.p className="font-script text-lg mb-4 opacity-90" variants={fadeUp}>
          A journey of Love begins
        </motion.p>

        {/* AYAT */}
        <motion.p className="font-serif text-sm leading-relaxed max-w-md mb-4 opacity-90" variants={fadeUp}>
          “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang
          demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
        </motion.p>

        {/* SURAH */}
        <motion.p className="text-xs tracking-widest mb-8 opacity-80" variants={fadeUp}>
          Q.S Ar-Rum : 21
        </motion.p>

        {/* DIVIDER */}
        <motion.div className="w-px h-16 bg-white/60 mb-8" variants={fadeUp} />

        {/* COUNTDOWN */}
        <motion.div className="grid grid-cols-4 gap-10" variants={fadeUp}>
          <CountdownItem label="Days" value={time.days} />
          <CountdownItem label="Hours" value={time.hours} />
          <CountdownItem label="Minutes" value={time.minutes} />
          <CountdownItem label="Seconds" value={time.seconds} />
        </motion.div>
      </motion.div>
    </section>
  )
}
