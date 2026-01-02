import { motion } from "framer-motion"
import couplePhoto from "../../../../../public/modern/couple/couple-bg.jpeg"
import type { Invitation } from "../../../../types/Invitation"

interface CoverProps {
  data: Invitation
  guestName?: string
  onOpen: () => void
}

export default function CoverSection({ data, guestName = "Bapak/Ibu/Saudara/i", onOpen }: CoverProps) {
  return (
    <motion.section className="fixed inset-0 z-50 overflow-hidden" initial={{ y: 0 }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 1.2, ease: "easeInOut" }}>
      {/* BACKGROUND IMAGE - Ditambah overlay gelap yang sedikit lebih kuat agar teks putih 'pop out' */}
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${couplePhoto})` }} />
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-svh items-center justify-center text-center">
        <div className="max-w-md px-8 flex flex-col items-center">
          {/* HEADER AREA */}
          <div className="space-y-3 mb-8">
            <p className="tracking-[0.3em] text-xs md:text-sm text-[#EAEAEA] uppercase">The Wedding of</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight">
              {data.brideName} <span className="block my-1">&</span> {data.groomName}
            </h1>
            <p className="text-base md:text-lg text-[#EAEAEA] font-light tracking-wide italic">Sabtu, 27 Februari 2027</p>
          </div>

          {/* GUEST AREA - Dipisah dengan garis halus atau jarak yang jelas */}
          <div className="mt-12 w-full">
            <div className="h-[1px] w-12 bg-white/30 mx-auto mb-6"></div>
            <p className="mb-2 text-xs uppercase tracking-widest opacity-80 text-[#EAEAEA]">Kepada Yth:</p>
            <h2 className="mb-8 font-serif text-2xl md:text-3xl text-white italic capitalize">{guestName}</h2>

            <button
              onClick={onOpen}
              className="
                bg-[#9B8AA0]
                text-white
                rounded-full
                px-12
                py-4
                text-sm
                uppercase
                tracking-widest
                shadow-2xl
                hover:bg-[#8A788F]
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
