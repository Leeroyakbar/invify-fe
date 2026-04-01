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
      {/* Header Section - Menggunakan Shadow Text agar terbaca di atas foto apapun */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-16">
        <p className="font-lora text-[10px] tracking-[0.4em] uppercase text-white drop-shadow-md mb-2">Save the Date</p>
        <h2 className="font-bodoni italic text-5xl text-white drop-shadow-lg">Waktu & Tempat</h2>
      </motion.div>

      {/* Event Card List */}
      <div className="mx-auto max-w-sm space-y-8">
        <EventCard title="Akad Nikah" date={eventDateFormatted} time={`${formatTime(data.akadTimeStart)} WIB`} venue={data.akadVanue} location={data.akadLocation} mapsUrl={data.akadMapsUrl} type="akad" />

        <EventCard
          title="Resepsi"
          date={data.receptionDate || eventDateFormatted}
          time={`${formatTime(data.receptionTimeStart)} - ${formatTime(data.receptionTimeEnd)} WIB`}
          venue={data.receptionVanue}
          location={data.receptionLocation}
          mapsUrl={data.receptionMapsUrl}
          type="resepsi"
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
  type: "akad" | "resepsi"
}

function EventCard({ title, date, time, venue, location, mapsUrl, type }: EventCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }} className="overflow-hidden rounded-[40px] bg-white shadow-2xl">
      {/* Mini Hero Inside Card (Opsional, memberikan nuansa seperti SS) */}
      <div className="h-32 w-full bg-[#F8F6F2] flex items-center justify-center border-b border-gray-100">
        {/* Icon Wedding Berdasarkan Tipe */}
        {type === "akad" ? (
          <div className="flex flex-col items-center opacity-40">
            <span className="font-bodoni text-4xl text-[#2F3E46]">A</span>
            <div className="h-px w-6 bg-[#C8A97E]" />
          </div>
        ) : (
          <div className="flex flex-col items-center opacity-40">
            <span className="font-bodoni text-4xl text-[#2F3E46]">R</span>
            <div className="h-px w-6 bg-[#C8A97E]" />
          </div>
        )}
      </div>

      <div className="p-8 text-center">
        <h3 className="font-bodoni italic text-3xl text-[#2F3E46] mb-4">{title}</h3>

        <div className="space-y-1 mb-6">
          <p className="font-lora text-sm font-medium text-[#2F3E46]">{date}</p>
          <p className="font-lora text-xs text-[#6B7280]">{time}</p>
        </div>

        <div className="mb-8">
          <p className="font-lora text-sm font-bold text-[#2F3E46] mb-1 uppercase tracking-tight">{venue}</p>
          <p className="font-lora text-[11px] leading-relaxed text-[#6B7280]">{location}</p>
        </div>

        <motion.a
          href={mapsUrl}
          target="_blank"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2F3E46] px-8 py-3 font-lora text-[11px] uppercase tracking-widest text-white transition-all shadow-md hover:bg-[#3d515c]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Buka Lokasi
        </motion.a>
      </div>
    </motion.div>
  )
}
