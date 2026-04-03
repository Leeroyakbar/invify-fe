import { motion } from "framer-motion"
import { useRef } from "react"

interface QuoteSectionProps {
  translation?: string
  source?: string
}

export default function QuoteSection({
  translation = "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  source = "Q.S. Ar-Rum: 21",
}: QuoteSectionProps) {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="relative h-[80vh] w-full overflow-visible">
      {/* 2. CONTENT LAYER */}
      <div className="relative z-20 h-full w-full flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-full max-w-lg">
          {/* Frame Dekoratif */}
          <div className="relative overflow-hidden rounded-[100px_20px_100px_20px] border border-white/10 bg-black/60 backdrop-blur-xl p-10 md:p-16 shadow-2xl">
            <div className="mb-8 flex justify-center text-[#D4A853]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22C12 22 12 18 10 16C8 14 4 14 4 14M12 22C12 22 12 18 14 16C16 14 20 14 20 14M12 22V12M12 12C12 12 12 8 14 6C16 4 20 4 20 4M12 12C12 12 12 8 10 6C8 4 4 4 4 4M12 12V2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="text-center">
              <p className="font-lora text-sm md:text-base leading-loose italic text-white/90">"{translation}"</p>
              <div className="mt-8">
                <div className="h-[1px] w-12 bg-[#D4A853] mx-auto mb-4 opacity-50" />
                <p className="font-lora text-xs font-bold tracking-[0.3em] text-[#D4A853] uppercase">{source}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
