import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface EventSectionProps {
  data: Invitation
}

export default function EventSection({ data }: EventSectionProps) {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
  }

  const events = [
    {
      label: "AKAD NIKAH",
      time: `${data.akadTimeStart} - ${data.akadTimeEnd} WIB`,
      venue: data.akadVanue,
      location: data.akadLocation,
      maps: data.akadMapsUrl,
    },
    {
      label: "RESEPSI",
      time: `${data.receptionTimeStart} - ${data.receptionTimeEnd} WIB`,
      venue: data.receptionVanue,
      location: data.receptionLocation,
      maps: data.receptionMapsUrl,
    },
  ]

  return (
    <section className="relative w-full py-24 px-8 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-lg space-y-24">
        {events.map((event, index) => (
          <motion.div key={index} {...fadeUp} transition={{ delay: index * 0.2 }} className="text-center space-y-6">
            {/* Label Event */}
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-cormorant-upright text-white tracking-wider uppercase font-light">{event.label}</h2>
            </div>

            {/* Waktu */}
            <p className="text-xl lg:text-2xl font-cormorant-upright text-white italic">{event.time}</p>

            {/* Lokasi */}
            <div className="space-y-3 px-4">
              <h3 className="text-white font-inter text-sm font-bold tracking-wide uppercase">{event.venue}</h3>
              <p className="text-white/60 font-inter text-[12px] leading-relaxed font-light mx-auto max-w-[300px]">{event.location}</p>
            </div>

            {/* Button Maps */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href={event.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all duration-500 group text-white"
              >
                <MapPin size={14} className="text-white group-hover:text-black transition-colors" />
                <span className="font-inter text-[10px] tracking-[0.3em] uppercase">Buka Maps</span>
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
