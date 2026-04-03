import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { useCountdown } from "../../../../hooks/useCountDown"
import { parseEventDate } from "../../../../utils/dateUtil"

interface CountdownProps {
  data: Invitation
}

export default function CountdownSection({ data }: CountdownProps) {
  const eventDate = parseEventDate(data.eventDate)
  const { days, hours, minutes, seconds } = useCountdown(eventDate)

  const items = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ]

  return (
    // bg-transparent penting agar background slideshow di belakang tetap terlihat
    // py-32 memberikan ruang (negative space) yang lega agar terlihat mewah
    <section className="relative z-10 flex min-h-screen flex-col justify-center bg-transparent px-6 py-20 text-center">
      {/* 1. TEXT CONTENT */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1 }} className="space-y-6">
        <h2 className="font-bodoni italic text-4xl md:text-5xl text-white">We Are Getting Married</h2>

        <div className="mx-auto h-[1px] w-12 bg-[#D4A853]/40" />

        <p className="mx-auto max-w-sm font-lora text-xs leading-relaxed tracking-wide text-white/70">Dengan memohon ridho dan rahmat Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.</p>
      </motion.div>

      {/* 2. COUNTDOWN BOXES */}
      <div className="mt-20 flex justify-center gap-4 md:gap-8">
        {items.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex flex-col items-center">
            {/* Angka dengan Bodoni Italic */}
            <div className="relative flex h-20 w-16 flex-col items-center justify-center rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm shadow-xl">
              <span className="font-bodoni italic text-3xl text-[#D4A853]">{String(item.value).padStart(2, "0")}</span>
              <span className="mt-1 font-lora text-[8px] uppercase tracking-[0.2em] text-white/50">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. CTA BUTTON */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-20 group relative px-10 py-3 overflow-hidden rounded-full border border-[#D4A853]/30 text-white transition-all hover:border-[#D4A853]"
      >
        <span className="relative z-10 font-lora text-[10px] uppercase tracking-[0.3em]">Save the Date</span>
        {/* Hover Effect Fill */}
        <div className="absolute inset-0 translate-y-full bg-[#D4A853] transition-transform duration-500 group-hover:translate-y-0" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#D4A853] transition-all" />
      </motion.button>
    </section>
  )
}
