import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"

export function HeroContent({ data }: { data: Invitation }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <p className="font-lora text-[10px] tracking-[0.6em] uppercase text-[#D4A853] mb-4">The Wedding of</p>
        <h1 className="font-bodoni italic text-4xl leading-tight">
          {data.brideName} <span className="text-[#D4A853]">&</span> {data.groomName}
        </h1>
        <p className="mt-8 font-lora text-sm tracking-[0.3em] uppercase opacity-80">{data.eventDateFormatted}</p>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50">
        <div className="h-12 w-[1px] bg-white/50" />
        <span className="text-[9px] uppercase tracking-widest">Scroll</span>
      </div>
    </div>
  )
}
