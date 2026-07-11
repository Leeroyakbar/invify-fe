import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { ChevronRight, MapPin } from "lucide-react"
import { memo } from "react"

export default function EventSection({ data }: { data: Invitation }) {
  // Parsing tanggal hari pelaksanaan pernikahan
  const eventDate = new Date(data.eventDate)
  const eventDayName = eventDate.toLocaleString("id-ID", { weekday: "long" })
  const eventDay = eventDate.getDate()
  const eventMonth = eventDate.toLocaleString("id-ID", { month: "long" })
  const eventYear = eventDate.getFullYear()
  const eventDateFormatted = `${eventDayName}, ${eventDay} ${eventMonth} ${eventYear}`

  // Kumpulan data protokol acara pernikahan
  const events = [
    {
      id: "akad",
      type: "Akad Nikah",
      time: `${data.akadTimeStart} – ${data.akadTimeEnd}`,
      venue: data.akadVanue || "Masjid Agung",
      location: data.akadLocation,
      mapsUrl: data.akadMapsUrl,
    },
    {
      id: "reception",
      type: "Wedding Reception",
      time: `${data.receptionTimeStart} – ${data.receptionTimeEnd}`,
      venue: data.receptionVanue || "Grand Ballroom",
      location: data.receptionLocation,
      mapsUrl: data.receptionMapsUrl,
    },
    {
      id: "ngunduh",
      type: "Ngunduh Mantu",
      time: `${data.ngunduhMantuTimeStart} – ${data.ngunduhMantuTimeEnd}`,
      venue: data.ngunduhMantuVanue || "Kediaman Mempelai",
      location: data.ngunduhMantuLocation,
      mapsUrl: data.ngunduhMantuMapsUrl,
    },
  ].filter(event => event.location) // Otomatis menyembunyikan Ngunduh Mantu jika datanya dikosongkan pengantin

  // Variabel animasi induk kontainer agar anak muncul bergelombang (staggered)
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  return (
      <section id="event" className="h-screen snap-start flex items-center px-8 text-white relative bg-transparent subpixel-antialiased">
        <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-md w-full relative z-10 py-12"
        >
          {/* HEADER SEKSI: Judul Tanggal Minimalis */}
          <div className="mb-10 text-left">
            <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-2 pl-[0.5em]">The Rendezvous</span>
            <h2 className="font-serif text-3xl mb-3 tracking-wide text-white/95">{eventDateFormatted}</h2>
            <div className="w-8 h-px bg-white/20" />
          </div>

          {/* AREA DAFTAR KRONOLOGIS TIMELINE */}
          <div className="space-y-10 relative pl-2">
            {/* Garis Vertikal Lini Masa Halus Khas Noir */}
            <div className="absolute top-2 bottom-2 w-px bg-linear-to-b from-white/20 via-white/5 to-transparent -left-2.5 md:-left-3.5" />

            {events.map((event, index) => (
                <EventCard
                    key={event.id}
                    type={event.type}
                    time={event.time}
                    venue={event.venue}
                    location={event.location}
                    mapsUrl={event.mapsUrl}
                    index={index}
                />
            ))}
          </div>
        </motion.div>
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: EVENT CARD (MEMOIZED)
// =========================================================
interface EventCardProps {
  type: string
  time: string
  venue: string
  location: string
  mapsUrl: string
  index: number
}

const EventCard = memo(({ type, time, venue, location, mapsUrl}: EventCardProps) => {
  // Animasi masuk horizontal dari samping, diproses kartu grafis (GPU)
  const cardSlideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 3, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <motion.div
          variants={cardSlideIn}
          className="group relative space-y-2 transform-gpu will-change-transform"
      >
        {/* Pin Indikator Lini Masa Murni CSS */}
        <div className="absolute -left-3.5 md:-left-4.5 top-1.5 w-2 h-2 rounded-full bg-[#0a0a0a] border border-white/30 group-hover:border-white transition-colors duration-500 z-10" />

        {/* Judul Jenis Protokol Acara */}
        <div className="flex items-center gap-2">
          <p className="tracking-[0.4em] text-[9px] font-sans font-bold text-white/40 group-hover:text-white/60 transition-colors uppercase pl-[0.4em]">
            {type}
          </p>
        </div>

        {/* Jam Pelaksanaan & Deskripsi Alamat Lokasi */}
        <div className="pl-4 space-y-1">
          <p className="text-xl font-serif text-white/90 tracking-wide font-light">
            {time}
          </p>
          <p className="text-[12px] leading-[1.7] text-white/50 font-sans font-light tracking-wide max-w-sm">
            <span className="font-semibold text-white/80 block mb-0.5">{venue}</span>
            {location}
          </p>

          {/* INTERAKSI TOMBOL MAPS NOIR MINIMALIS */}
          <div className="pt-3">
            <button
                onClick={() => window.open(mapsUrl, "_blank")}
                className="inline-flex items-center gap-1.5 relative py-1 text-white/60 hover:text-white transition-colors duration-400 group/btn overflow-hidden cursor-pointer"
            >
              {/* Ikon Pin Peta Pendukung */}
              <MapPin size={11} className="text-white/40 [button:hover_&]:text-white transition-colors duration-400 stroke-[1.5px]" />

              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-semibold">
              View Map
            </span>

              {/* Garis rambut bawah statis yang memanjang anggun saat disentuh */}
              <div className="absolute bottom-0 left-0 w-4 h-px bg-white/20 group-hover/btn:w-full group-hover/btn:bg-white transition-all duration-500 ease-[0.16,1,0.3,1]" />

              {/* Ikon Panah Geser Mikro */}
              <ChevronRight
                  size={11}
                  className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]"
              />
            </button>
          </div>
        </div>
      </motion.div>
  )
})

EventCard.displayName = "EventCard"
