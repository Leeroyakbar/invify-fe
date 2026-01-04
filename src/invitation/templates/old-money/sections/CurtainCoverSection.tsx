import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface CurtainProps {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}

export default function CurtainCoverSection({ data, isOpened, onOpen }: CurtainProps) {
  return (
    <motion.section
      initial={false}
      animate={isOpened ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[100] bg-[#F9F8F4] flex flex-col items-center justify-center overflow-hidden border-b border-stone-200"
    >
      {/* Ornamen Bingkai Klasik (Thin Borders) */}
      <div className="absolute inset-6 border border-stone-200 pointer-events-none" />
      <div className="absolute inset-8 border border-stone-100 pointer-events-none" />

      <div className="relative z-10 text-center px-10">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-[10px] tracking-[0.8em] uppercase text-stone-400 block mb-12">
          Private Invitation
        </motion.span>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.5 }} className="font-serif text-5xl md:text-7xl text-stone-800 tracking-tighter italic mb-4">
          {data.brideName.split(" ")[0]} <span className="text-2xl not-italic font-light mx-2">&</span> {data.groomName.split(" ")[0]}
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-[11px] tracking-[0.4em] uppercase text-stone-500 font-light mb-20">
          {data.eventDateFormatted}
        </motion.p>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpen} className="group relative px-12 py-4 overflow-hidden">
          <div className="absolute inset-0 bg-stone-800 transition-transform duration-500 group-hover:scale-105" />
          <span className="relative text-[10px] tracking-[0.6em] uppercase text-white">Open Invitation</span>
        </motion.button>
      </div>

      {/* Decorative Brand Tag at bottom */}
      <div className="absolute bottom-12 text-[9px] tracking-[0.3em] text-stone-300 uppercase">Est. MMXXVII</div>
    </motion.section>
  )
}
