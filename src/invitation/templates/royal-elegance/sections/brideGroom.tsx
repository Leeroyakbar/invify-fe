import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function BrideGroomSection({ data }: Props) {
  return (
    <section className="relative z-10 bg-transparent px-8 py-24 text-center">
      {/* Header Section - Dibuat lebih puitis */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-20 flex flex-col items-center gap-2">
        <h2 className="font-bodoni italic text-4xl text-white">The Happy Couple</h2>
        <div className="h-[1px] w-8 bg-[#D4A853]/50 mt-4" />
      </motion.div>

      {/* Grid Mempelai */}
      <div className="flex flex-col gap-32">
        {/* Bride */}
        <PersonBlock image={data.bridePhoto} fullName={data.brideFullName} isBride={true} father={data.brideFather} mother={data.brideMother} delay={0.2} />

        {/* Groom */}
        <PersonBlock image={data.groomPhoto} fullName={data.groomFullName} isBride={false} father={data.groomFather} mother={data.groomMother} delay={0.4} />
      </div>
    </section>
  )
}

/* =========================
   Sub Component: PersonBlock
   ========================= */

interface PersonProps {
  image: string
  fullName: string
  isBride: boolean
  father: string
  mother: string
  delay: number
}

function PersonBlock({ image, fullName, isBride, father, mother, delay }: PersonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay }} viewport={{ once: false }} className="flex flex-col items-center px-4">
      {/* Premium Arch Frame with Double Border */}
      <div className="relative mb-10 group">
        <div className="absolute -inset-2 rounded-t-full border border-[#D4A853]/20 scale-105 transition-transform duration-700 group-hover:scale-110" />
        <div className="relative h-120 w-80 overflow-hidden rounded-t-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <img src={image} alt={fullName} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      {/* Typography Hierarchy */}
      <div className="space-y-4">
        {/* Full Name - Fokus Utama */}
        <h3 className="font-bodoni italic text-3xl text-white tracking-wide">{fullName}</h3>

        {/* Line Decoration */}
        <div className="flex justify-center items-center gap-3 opacity-60">
          <div className="h-[0.5px] w-4 bg-[#D4A853]" />
          <span className="font-lora text-[10px] uppercase tracking-[0.3em] text-[#D4A853]">{isBride ? "The Bride" : "The Groom"}</span>
          <div className="h-[0.5px] w-4 bg-[#D4A853]" />
        </div>

        {/* Family Information */}
        <div className="mt-6 font-lora">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-3">{isBride ? "Putri tercinta dari" : "Putra tercinta dari"}</p>
          <div className="inline-flex flex-col items-center">
            <span className="text-sm text-white/90 font-medium tracking-wide">
              Bapak {father} & Ibu {mother}
            </span>
            {/* Subtle underline for elegance */}
            <div className="mt-1 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
