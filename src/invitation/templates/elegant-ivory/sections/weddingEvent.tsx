import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { formatTime } from "../../../../utils/dateUtil"

interface Props {
  data: Invitation
}

export default function WeddingEventSection({ data }: Props) {
  const akadDate = new Date(data.eventDate)
  const eventDateFormatted = akadDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="relative z-10 bg-transparent px-4 py-20">
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-16">
        <h2 className="font-bodoni italic text-4xl text-white">The Wedding Event</h2>
        <div className="mt-4 flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C8A97E]" />
          <div className="w-2 h-2 rounded-full border border-[#C8A97E]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C8A97E]" />
        </div>
      </motion.div>

      {/* Event Card List */}
      <div className="mx-auto max-w-sm space-y-10">
        <EventCard title="Akad Nikah" date={eventDateFormatted} time={`${formatTime(data.akadTimeStart)} WIB`} venue={data.akadVanue} location={data.akadLocation} mapsUrl={data.akadMapsUrl} />

        <EventCard
          title="Resepsi"
          date={data.receptionDate || eventDateFormatted}
          time={`${formatTime(data.receptionTimeStart)} - ${formatTime(data.receptionTimeEnd)} WIB`}
          venue={data.receptionVanue}
          location={data.receptionLocation}
          mapsUrl={data.receptionMapsUrl}
        />
      </div>
    </section>
  )
}

interface EventCardProps {
  title: string
  date: string
  time: string
  venue: string
  location: string
  mapsUrl: string
}

function EventCard({ title, date, time, venue, location, mapsUrl }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-2xl"
    >
      {/* Decorative Ornament - Ganti huruf kaku dengan elemen garis estetik */}
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-[#C8A97E]" />
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="opacity-80">
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="#C8A97E" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" stroke="#C8A97E" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M35 35 L65 65 M65 35 L35 65" stroke="#C8A97E" strokeWidth="0.5" />
        </svg>
      </div>

      <h3 className="font-bodoni italic text-3xl text-white mb-6">{title}</h3>

      <div className="space-y-1 mb-6">
        <p className="font-lora text-sm font-medium text-white/90">{date}</p>
        <p className="font-lora text-xs text-[#C8A97E] tracking-widest uppercase">{time}</p>
      </div>

      <div className="mb-8">
        <p className="font-lora text-sm font-bold text-white mb-2 uppercase tracking-wide px-4">{venue}</p>
        <p className="font-lora text-[11px] leading-relaxed text-white/60 px-6 italic">{location}</p>
      </div>

      <motion.a
        href={mapsUrl}
        target="_blank"
        whileHover={{ scale: 1.05, backgroundColor: "#C8A97E", color: "#1a1a1a" }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#C8A97E] px-8 py-3 font-lora text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] transition-all"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Google Maps
      </motion.a>

      {/* Decorative Corner subtle shadow */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-[#C8A97E]/5 blur-3xl rounded-full" />
    </motion.div>
  )
}
