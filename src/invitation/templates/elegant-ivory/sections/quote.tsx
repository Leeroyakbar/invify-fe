import { easeOut, motion } from "framer-motion"

interface QuoteSectionProps {
  verse?: string
  translation?: string
  source?: string
}

export default function QuoteSection({
  verse = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  translation = "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  source = "QS. Ar-Rum : 21",
}: QuoteSectionProps) {
  return (
    <section className="bg-white px-6 py-14 text-center">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Heart SVG */}
        <svg width="18" height="16" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path
            d="M12 21s-7.5-4.7-10-8.9C-0.5 7.4 3.2 2 8 4.3
         9.6 5.1 11 7 12 8.5
         13 7 14.4 5.1 16 4.3
         20.8 2 24.5 7.4 22 12.1
         19.5 16.3 12 21 12 21z"
            stroke="#C8A97E"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
        <span className="h-px w-20 bg-[#C8A97E]/60" />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }} className="mx-auto max-w-2xl">
        {/* Arabic Verse */}
        <p className="font-playfair text-xl leading-relaxed text-[#2F3E46] md:text-2xl">{verse}</p>

        {/* Divider */}
        <div className="mx-auto my-8 h-px w-24 bg-[#C8A97E]/60" />

        {/* Translation */}
        <p className="font-lora text-sm leading-relaxed text-[#6B7280] md:text-base">{translation}</p>

        {/* Source */}
        <p className="mt-6 font-lora text-xs tracking-widest text-[#8FA8A1] uppercase">{source}</p>
      </motion.div>


      <div className="mt-10 flex items-center justify-center gap-4">
        <span className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Heart SVG */}
        <svg width="18" height="16" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path
            d="M12 21s-7.5-4.7-10-8.9C-0.5 7.4 3.2 2 8 4.3
         9.6 5.1 11 7 12 8.5
         13 7 14.4 5.1 16 4.3
         20.8 2 24.5 7.4 22 12.1
         19.5 16.3 12 21 12 21z"
            stroke="#C8A97E"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
        <span className="h-px w-20 bg-[#C8A97E]/60" />
      </div>
    </section>
  )
}
