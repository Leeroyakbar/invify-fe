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
    <section className="bg-[#F8F6F2]  px-6 py-14 text-center">
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.1 }} className="font-playfair text-3xl text-[#2F3E46]">
        We Are Getting Married
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 }} className="mx-auto mt-4 max-w-md font-lora text-sm text-[#6B7280]">
        Dengan memohon ridho dan rahmat Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.
      </motion.p>

      {/* Countdown */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: false }} className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-6">
            <div>
              <div className="font-playfair text-4xl font-medium text-[#2F3E46]">{String(item.value).padStart(2, "0")}</div>
              <div className="mt-1 font-lora text-[10px] uppercase tracking-widest text-[#8FA8A1]">{item.label}</div>
            </div>

            {i !== items.length - 1 && <div className="hidden sm:block h-10 w-px bg-[#C8A97E]/40" />}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mx-auto mt-14 rounded-full border border-[#C8A97E] px-8 py-3 font-lora text-sm text-[#2F3E46] transition hover:bg-[#C8A97E]/10"
      >
        Save the Date
      </motion.button>
    </section>
  )
}
