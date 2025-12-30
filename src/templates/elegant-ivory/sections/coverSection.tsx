import { motion } from "framer-motion"
import { MailOpen } from "lucide-react" // Contoh ikon Lucide
import type { Invitation } from "../../../types/Invitation"

interface CoverProps {
  data: Invitation
  guestName?: string
  onOpen: () => void
}

// 1. Pindahkan variants ke luar agar lebih bersih
const textVariants = {
  initial: { y: 0, opacity: 1 },
  hover: { y: "-150%", opacity: 0 },
}

const hoverVariants = {
  initial: { y: "150%", opacity: 0 },
  hover: { y: 0, opacity: 1 },
}

export default function CoverSection({ data, guestName = "Bapak/Ibu/Saudara/i", onOpen }: CoverProps) {
  const akadDate = new Date(data.eventDate)
  const year = akadDate.getFullYear()
  const month = akadDate.toLocaleDateString("id-ID", { month: "long" })
  const dayName = akadDate.toLocaleDateString("id-ID", { weekday: "long" })
  const date = akadDate.toLocaleDateString("id-ID", { day: "numeric" })
  const eventDateFormatted = `${dayName}, ${date} ${month} ${year}`

  return (
    <section className="relative h-svh w-full overflow-hidden touch-none">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/modern/couple/love-story.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 text-center text-white">
        {/* Content */}
        <div className="mt-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-2 font-inter text-sm tracking-wide">
            The Wedding of
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-playfair text-4xl font-semibold leading-tight md:text-5xl">
            {data.brideName} <span className="mx-1">&</span> {data.groomName}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3 font-inter text-sm tracking-wide">
            {eventDateFormatted}
          </motion.p>
        </div>

        {/* Guest */}
        <div className="mb-20">
          <p className="mb-2 text-sm font-inter opacity-90">Kepada Yth</p>
          <p className="mb-6 font-playfair text-lg">{guestName}</p>

          {/* Tombol dengan Animasi Swipe Up */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            initial="initial"
            whileHover="hover"
            className="relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-full bg-[#4F7C8A] font-inter text-sm font-medium text-white shadow-md transition-all hover:bg-[#3d616d]"
          >
            {/* Teks Utama */}
            <motion.span variants={textVariants} transition={{ duration: 0.4, ease: "easeInOut" }} className="absolute">
              Buka Undangan
            </motion.span>

            {/* Teks/Ikon Saat Hover */}
            <motion.span variants={hoverVariants} transition={{ duration: 0.4, ease: "easeInOut" }} className="absolute flex items-center gap-2">
              <MailOpen size={18} />
              Buka Sekarang
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
