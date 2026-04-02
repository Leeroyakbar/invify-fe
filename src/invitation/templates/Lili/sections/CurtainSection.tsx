import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface CurtainProps {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}

export default function CurtainSection({ data, isOpened, onOpen }: CurtainProps) {
  const dateParts = data.eventDateFormatted.split(" • ")
  const day = dateParts[0]
  const month = dateParts[1]
  const year = dateParts[2]

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.section
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
          }}
          className="fixed inset-0 z-150 flex h-screen w-full flex-col justify-between overflow-hidden text-white bg-black"
        >
          {/* Background - Menggunakan gambar lili/cover.JPG */}
          <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: `url('/lili/cover.webp')` }} />

          {/* Overlay: Dibuat gradient agar teks bawah lebih pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80 z-10" />

          {/* Frame Bingkai Halus: Menggunakan inset-8 agar lebih spacious */}
          <div className="absolute inset-8 border border-white/10 z-20 pointer-events-none" />

          {/* CONTENT */}
          <div className="relative z-30 flex h-full flex-col justify-between px-8 py-20 text-center">
            {/* TOP SECTION */}
            <div className="space-y-12">
              {/* DATE: Menggunakan pemisah garis miring (/) sesuai tema baru */}
              <div className="flex justify-center items-center gap-6 text-[10px] tracking-[0.6em] text-white/60 font-inter uppercase">
                <span>{day}</span>
                <div className="h-px w-4 bg-white/20" />
                <span>{month}</span>
                <div className="h-px w-4 bg-white/20" />
                <span>{year}</span>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="space-y-2">
              {/* TITLE + NAME */}
              <div>
                <h1 className="font-cormorant-upright text-6xl md:text-8xl leading-[0.85] tracking-tighter">
                  {data.brideName}
                  <span className="block font-alice text-2xl md:text-3xl text-white/20 my-4 italic lowercase">and</span>
                  {data.groomName}
                </h1>
              </div>
              <div className="space-y-4">
                <p className="text-[8px] tracking-[0.4em] uppercase text-white/40 font-inter">Special Invite To</p>
                <h3 className="font-playfair text-xl md:text-2xl font-light italic text-white">{data.guestName}</h3>
                <div className="h-[1px] w-12 bg-white/20 mx-auto mt-6" />
              </div>

              <button onClick={onOpen} className="group relative border border-white/30 px-12 py-4 text-[10px] tracking-[0.5em] uppercase overflow-hidden transition-all hover:border-white">
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-bold">Buka Undangan</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
