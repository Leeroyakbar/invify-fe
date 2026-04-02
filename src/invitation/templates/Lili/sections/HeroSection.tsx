import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface HeroSectionProps {
  data: Invitation
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Parsing tanggal
  const dateParts = data.eventDateFormatted.split(" • ")
  const dayMonth = `${dateParts[0]}/${dateParts[1]}`
  const year = dateParts[2]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between py-24 px-10 text-center text-white bg-transparent selection:bg-white/10">
      {/* 1. TOP SECTION: Date & "The Wedding Of" in one container */}
      <div className="flex flex-col items-center gap-12">
        {/* Date Row */}
        <motion.div custom={0.2} initial="hidden" whileInView="visible" variants={fadeIn} className="flex justify-center items-center gap-12 md:gap-20 text-[12px] md:text-[14px] tracking-[0.5em] text-white/80 font-inter uppercase">
          <span>{dayMonth}</span>
          <span>{year}</span>
        </motion.div>

        {/* The Wedding Of & Names */}
        <div className="flex flex-col items-center">
          <motion.p custom={0.4} initial="hidden" whileInView="visible" variants={fadeIn} className="text-[10px] tracking-[0.8em] uppercase text-white/40 font-inter mb-10 ml-[0.8em]">
            The Wedding Of
          </motion.p>

          <motion.h1 custom={0.6} initial="hidden" whileInView="visible" variants={fadeIn} className="relative font-cormorant-upright text-6xl  leading-[1.1] tracking-tighter">
            {/* Row 1: Bride & Ampersand */}
            <div className="flex items-center justify-center gap-6">
              <span>Lili Rahma</span>
              <span className="font-cormorant text-6xl md:text-4xl text-white/20 italic lowercase">&</span>
            </div>

            {/* Row 2: Groom (Below) */}
            <div className="block mt-2">Lee Roy</div>
          </motion.h1>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Quranic Verse & Scroll Indicator */}
      <div className="w-full max-w-xl space-y-12">
        <motion.div custom={0.8} initial="hidden" whileInView="visible" variants={fadeIn} className="space-y-6 px-4">
          <p className="font-lora italic text-[14px] md:text-[16px] leading-[1.8] text-white/60 font-light italic">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </p>
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-white/30">QS. Ar-Rum : 21</p>
        </motion.div>

        {/* Minimalist Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="flex flex-col items-center gap-2">
          <ChevronDown size={20} className="text-white/20 stroke-[1px]" />
        </motion.div>
      </div>
    </section>
  )
}
