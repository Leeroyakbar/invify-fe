// sections/CurtainSection.tsx
import { motion, AnimatePresence } from "framer-motion"
import { type Invitation } from "../../../../types/Invitation"

interface CurtainProps {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}

export default function CurtainSection({ data, isOpened, onOpen }: CurtainProps) {
  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-cover bg-center opacity-60 scale-105" style={{ backgroundImage: `url('/rahma/gallery-8.webp')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/60 tracking-[0.4em] uppercase text-[10px] mb-6">
              Wedding Invitation
            </motion.p>

            <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 1 }} className="font-cinzel text-white text-5xl md:text-7xl font-light">
              {data.brideName} & {data.groomName}
            </motion.h1>

            <div className="mt-20 flex flex-col items-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Kepada Yth.</p>
              <h2 className="font-montserrat text-white text-xl mb-10">{data.guestName || "Guest Name"}</h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="px-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
              >
                Buka Undangan
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
