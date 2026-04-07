import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { type Invitation } from "../../../../types/Invitation"
import { MapPin, Calendar } from "lucide-react"

export default function EventSection({ data }: { data: Invitation }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const target = new Date(data.eventDate).getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const dist = target - now
      if (dist < 0) return clearInterval(interval)
      setTimeLeft({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((dist % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [data.eventDate])

  const events = [
    {
      title: "Akad Nikah",
      date: data.eventDateFormatted,
      time: `${data.akadTimeStart} - ${data.akadTimeEnd}`,
      venue: data.akadVanue,
      location: data.akadLocation,
      maps: data.akadMapsUrl,
    },
    {
      title: "Resepsi",
      date: data.receptionDate, // Pastikan format tanggal sudah rapi di data
      time: `${data.receptionTimeStart} - ${data.receptionTimeEnd}`,
      venue: data.receptionVanue,
      location: data.receptionLocation,
      maps: data.receptionMapsUrl,
    },
  ]

  return (
    <section id="event" className="relative py-32 px-8 overflow-hidden bg-transparent border-t border-white/5">
      {/* 1. INTEGRATED COUNTDOWN (Minimalist Header) */}
      <div className="mb-20 text-center space-y-6">
        <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block text-center">Counting Down To The Day</span>
        <div className="flex justify-center gap-6 items-center">
          {[
            { v: timeLeft.days, l: "D" },
            { v: timeLeft.hours, l: "H" },
            { v: timeLeft.mins, l: "M" },
            { v: timeLeft.secs, l: "S" },
          ].map((unit, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-cinzel text-3xl text-white font-light">{unit.v < 10 ? `0${unit.v}` : unit.v}</span>
              <span className="font-montserrat text-[7px] text-white/20 tracking-widest mt-1 uppercase">{unit.l}</span>
            </div>
          ))}
        </div>
        <div className="h-[1px] w-8 bg-white/10 mx-auto mt-8" />
      </div>

      {/* 2. EVENT CARDS */}
      <div className="space-y-12 max-w-md mx-auto">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 1 }}
            className="group relative p-10 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-all duration-500"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20 rounded-tr-2xl opacity-50 transition-all group-hover:w-20 group-hover:h-20" />

            <div className="relative z-10 space-y-8">
              <h3 className="font-cinzel text-xl text-white tracking-[0.3em] uppercase border-b border-white/5 pb-4">{event.title}</h3>

              <div className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start gap-4 group">
                  {/* Tambahkan shrink-0 di sini */}
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors border border-white/10">
                    <Calendar size={14} />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-cinzel text-xs text-white/80 tracking-widest">{event.date}</p>
                    <p className="font-montserrat text-[10px] text-white/50 mt-1">{event.time} WIB</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-4 group">
                  {/* Tambahkan shrink-0 di sini juga */}
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors border border-white/10">
                    <MapPin size={14} />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-cinzel text-xs text-white/80 tracking-widest leading-relaxed uppercase">{event.venue}</p>
                    <p className="font-montserrat text-[10px] text-white/40 mt-2 leading-relaxed italic max-w-50">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Maps Button */}
              <a
                href={event.maps}
                target="_blank"
                className="block w-full py-4 border border-white/10 bg-white/5 rounded-xl text-center font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                View on Google Maps
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Text Bottom */}
      <div className="mt-24 text-center">
        <span className="font-reenie-beanie text-4xl text-white/10 select-none">Save the Date</span>
      </div>

      {/* 3. DRESSCODE SECTION */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 max-w-md mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block text-center italic">Guest Attire</span>
          <h2 className="font-cinzel text-xl text-white tracking-[0.3em] uppercase">Dresscode</h2>
          <div className="w-8 h-[1px] bg-white/20 mx-auto mt-4" />
        </div>

        <p className="font-montserrat text-[11px] text-white/50 leading-relaxed tracking-widest uppercase px-4">
          Your presence is a gift enough, but if you wish to follow our theme, we suggest wearing
          <span className="text-white/90 font-medium"> Neutral & Earthy Tones</span>.
        </p>

        {/* Color Palette Visualizer */}
        <div className="flex justify-center gap-3 py-4">
          {[
            { color: "bg-[#F5F5DC]", name: "Ivory" },
            { color: "bg-[#D2B48C]", name: "Tan" },
            { color: "bg-[#4B5320]", name: "Olive" },
            { color: "bg-[#2C2C2C]", name: "Charcoal" },
            { color: "bg-[#E5E4E2]", name: "Platinum" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.5, type: "spring", stiffness: 100 }} className="group relative flex flex-col items-center gap-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${item.color} border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`} />
              <span className="font-montserrat text-[7px] text-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
            </motion.div>
          ))}
        </div>

        <p className="font-reenie-beanie text-2xl text-white/40 italic">"Elegant, Comfortable, and Timeless"</p>
      </motion.div>

      {/* 4. LIVE STREAMING SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mt-32 max-w-md mx-auto relative group overflow-hidden rounded-[40px] border border-white/10 bg-[#0F0F0F] shadow-2xl"
      >
        {/* Header Image with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 10 }}
            src="/rahma/gallery-3.webp" // Ganti dengan foto couple yang paling cinematic
            className="w-full h-full object-cover object-[40%_center] opacity-60 grayscale-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F0F0F] via-transparent to-transparent" />

          {/* Floating "Live" Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="font-montserrat text-[8px] uppercase tracking-[0.2em] text-red-200 font-bold">Virtual Wedding</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 -mt-12 relative z-10 text-center space-y-8">
          <div className="space-y-3">
            <h3 className="font-cinzel text-2xl text-white tracking-[0.2em] uppercase">Join Us Virtually</h3>
            <p className="font-montserrat text-[10px] text-white/40 leading-relaxed tracking-widest uppercase px-6">
              Bagi keluarga dan kerabat yang berhalangan hadir secara fisik, kami mengundang Anda untuk menyaksikan momen bahagia kami melalui siaran langsung.
            </p>
          </div>

          {/* Platform Detail */}
          <div className="flex justify-center items-center gap-8 py-4 border-y border-white/5">
            <div className="text-center">
              <span className="font-montserrat text-[8px] text-white/20 uppercase tracking-widest block mb-1">Platform</span>
              <p className="font-cinzel text-xs text-white/80 tracking-widest">Instagram Live</p>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="text-center">
              <span className="font-montserrat text-[8px] text-white/20 uppercase tracking-widest block mb-1">Status</span>
              <p className="font-cinzel text-xs text-white/80 tracking-widest lowercase">starts at {data.akadTimeStart} WIB</p>
            </div>
          </div>

          {/* Action Button */}
          <motion.a
            whileTap={{ scale: 0.98 }}
            href="#"
            target="_blank"
            className="group relative flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
          >
            <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] relative z-10 transition-colors group-hover:text-black">Watch Stream</span>
            {/* Subtle Shine Effect */}
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent skew-x-12" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
