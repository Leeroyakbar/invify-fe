import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { useCountdown } from "../../../../hooks/useCountDown"
import { fadeUp } from "../../../../motions/templateMotions"
import { createGoogleCalendarLink } from "../../../../utils/utils"

function parseEventDate(dateString: string) {
  return new Date(dateString.replace(" ", "T"))
}

export default function CountdownSection({ data }: { data: Invitation }) {
  const targetDate = parseEventDate(data.eventDate)
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <section id="countdown" className="h-screen snap-start flex items-center justify-center text-white relative overflow-hidden">
      {/* Dekorasi Dial Jam Raksasa di Latar Belakang */}
      <div className="absolute w-[500px] h-[500px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] border border-white/[0.02] rounded-full pointer-events-none" />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={fadeUp} className="text-center relative z-10 px-6">
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 block mb-4">The Countdown</span>
        <h2 className="font-serif text-3xl md:text-4xl mb-16 italic">Almost Time for Our Celebration</h2>

        <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
          <TimeBox label="Days" value={days} />
          <Divider />
          <TimeBox label="Hours" value={hours} />
          <Divider />
          <TimeBox label="Mins" value={minutes} />
          <Divider />
          <TimeBox label="Secs" value={seconds} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(createGoogleCalendarLink(data), "_blank")}
          className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm tracking-[0.3em] text-[10px] uppercase hover:bg-white hover:text-black transition-all duration-500"
        >
          Save The Date
        </motion.button>
      </motion.div>
    </section>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-12 overflow-hidden flex items-center justify-center">
        {/* AnimatePresence membuat angka yang berganti terasa smooth (slide up) */}
        <AnimatePresence mode="popLayout">
          <motion.span key={value} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-4xl md:text-5xl font-serif leading-none">
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] tracking-[0.2em] opacity-40 mt-4 uppercase font-medium">{label}</span>
    </div>
  )
}

function Divider() {
  return <div className="h-8 w-[1px] bg-white/10 mt-[-20px]" />
}
