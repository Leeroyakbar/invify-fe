import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function AnnouncementVideoSection({ data }: { data: Invitation }) {
  const eventDate = new Date(data.eventDate)

  // Menambahkan nama hari
  const eventDayName = eventDate.toLocaleString("id-ID", { weekday: "long" })
  const eventDay = eventDate.getDate()
  const eventMonth = eventDate.toLocaleString("id-ID", { month: "long" })
  const eventYear = eventDate.getFullYear()

  // Gunakan koma setelah nama hari
  const eventDateFormatted = `${eventDayName}, ${eventDay} ${eventMonth} ${eventYear}`

  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector("#quote")
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start", // atau "center" agar posisi pas di tengah
      })
    }
  }

  return (
    <section className="h-screen snap-start relative overflow-hidden" id="home">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/classic-noir/video-1.mp4" />

      {/* Overlay Atas (Gradient dari hitam ke transparan) */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* Overlay Bawah (Gradient dari transparan ke hitam) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center text-center px-6 text-white justify-between">
        {/* 1. Spacer Atas (mengatur seberapa jauh teks dari atas) */}
        <div className="h-[-100vh]" />

        {/* 2. Konten Utama */}
        <div>
          <h2 className="font-display text-xl mb-2">The Wedding of</h2>
          <h1 className="font-serif uppercase text-2xl mb-2">
            {data?.brideName} & {data?.groomName}
          </h1>
          <p className="tracking-widest text-sm font-serif">{eventDateFormatted}</p>
        </div>

        {/* 3. Spacer Bawah (lebih besar agar teks naik sedikit dari tengah) */}
        <div className="h-[60vh]" />
      </div>
      {/* SCROLL INDICATOR */}
      <motion.a onClick={scrollToSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Panah Pertama (Atas) */}
        <motion.div
          animate={{
            y: [0, 5, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" strokeWidth={1} />
        </motion.div>

        {/* Panah Kedua (Bawah) - Delay sedikit agar gerakannya berurutan */}
        <motion.div
          animate={{
            y: [0, 5, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2, // Memberikan efek gelombang
          }}
          className="-mt-4" // Menumpuk sedikit agar terlihat rapat dan elegan
        >
          <ChevronDown className="w-6 h-6 text-white" strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  )
}
