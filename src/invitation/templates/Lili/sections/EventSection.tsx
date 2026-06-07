import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface EventSectionProps {
  data: Invitation
}

export default function EventSection({ data }: EventSectionProps) {
  // OPTIMASI ANIMASI: Fokus memoles transisi agar sangat smooth saat di-scroll
  const fadeUp = {
    initial: { opacity: 0, y: 35 }, // Naik sedikit lebih tinggi agar transisinya terasa dinamis
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.15, // Animasi langsung jalan saat 15% bagian card masuk layar (anti-delay/hilang)
    },
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
          <motion.div
            key={index}
            {...fadeUp}
            // Menggunakan cubic-bezier [0.215, 0.610, 0.355, 1] (efek easeOutCubic yang super mulus di mobile)
            transition={{
              duration: 0.9,
              ease: [0.215, 0.61, 0.355, 1],
              delay: index * 0.15, // Delay dipercepat sedikit agar jedanya pas saat scroll
            }}
            className="text-center space-y-6"
          >
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
