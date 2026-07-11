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

  // OPTIMASI: Tambahkan width dan quality untuk performa load pertama kali (LCP)
  const urlBackground = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/cover.webp?width=600';

  // Variabel Animasi untuk Staggered Effect (Elemen muncul berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Jeda waktu kemunculan antar komponen anak
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] as const }
    }
  }

  return (
      <AnimatePresence>
        {!isOpened && (
            <motion.section
                initial={{ y: 0 }}
                exit={{
                  y: "-100%",
                  transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }, // Transisi serasa ditarik ke atas dengan mulus
                }}
                // Pastikan z-index (z-50 atau kelas kustom) aman berada di atas tumpukan
                className="fixed inset-0 z-150 flex h-screen w-full flex-col justify-between overflow-hidden text-white bg-[#0a0a0a]"
            >
              {/* Background dengan Efek Sinematik Ken Burns (Auto-zoom lambat) */}
              <motion.div
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 2.5, ease: "easeOut" }
                  }}
                  className="absolute inset-0 bg-cover bg-center origin-center select-none pointer-events-none"
                  style={{ backgroundImage: `url(${urlBackground})` }}
              />

              {/* Overlay: Dipertebal dari bawah untuk meningkatkan kontras teks putih */}
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/90 z-10" />

              {/* Frame Bingkai Halus Klasik Eropa */}
              <div className="absolute inset-6 md:inset-8 border border-white/10 z-20 pointer-events-none" />

              {/* CONTENT CONTAINER */}
              <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="relative z-30 flex h-full flex-col justify-between px-8 py-16 md:py-20 text-center"
              >
                {/* TOP SECTION: Tanggal Pernikahan */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex justify-center items-center gap-4 md:gap-6 text-[10px] tracking-[0.6em] text-white/70 font-inter uppercase">
                    <span>{day}</span>
                    <div className="h-px w-4 bg-white/20" />
                    <span>{month}</span>
                    <div className="h-px w-4 bg-white/20" />
                    <span>{year}</span>
                  </div>
                </motion.div>

                {/* MIDDLE/BOTTOM SECTION: Informasi Utama */}
                <div className="flex flex-col flex-1 justify-end space-y-10 md:space-y-12">

                  {/* Nama Mempelai */}
                  <motion.div variants={itemVariants}>
                    <h1 className="font-cormorant-upright text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-wider uppercase font-light text-white/95">
                      {data.brideName}
                      <span className="block font-alice text-xl md:text-2xl text-white/30 my-3 normal-case italic font-light">and</span>
                      {data.groomName}
                    </h1>
                  </motion.div>

                  {/* Box Undangan Penerima Tamu */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <p className="text-[9px] tracking-[0.5em] uppercase text-white/40 font-inter font-medium">Dear Special Guest,</p>
                    <div className="inline-block px-4 py-1">
                      <h3 className="font-playfair text-xl md:text-2xl font-light italic text-white/90 tracking-wide">{data.guestName}</h3>
                    </div>
                    <div className="h-px w-8 bg-white/20 mx-auto mt-4" />
                  </motion.div>

                  {/* Tombol Buka Undangan Premium */}
                  <motion.div variants={itemVariants} className="pt-2">
                    <button
                        onClick={onOpen}
                        className="group relative border border-white/20 px-14 py-4 text-[9px] tracking-[0.6em] uppercase overflow-hidden transition-all duration-500 hover:border-white rounded-none backdrop-blur-xs active:scale-95"
                    >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-semibold">
                    Buka Undangan
                  </span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-450 ease-[0.19,1,0.22,1]" />
                    </button>
                  </motion.div>

                </div>
              </motion.div>
            </motion.section>
        )}
      </AnimatePresence>
  )
}
