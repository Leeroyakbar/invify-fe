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
    <section className="bg-white px-6 py-28 text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }} className="mx-auto max-w-2xl">
        {/* Arabic Verse */}
        <p className="font-playfair text-xl leading-relaxed text-[#2F3E46] md:text-2xl">{verse}</p>

        {/* Divider */}
        <div className="mx-auto my-8 h-px w-24 bg-[#C8A97E]/60" />

        {/* Translation */}
        <p className="font-inter text-sm leading-relaxed text-[#6B7280] md:text-base">{translation}</p>

        {/* Source */}
        <p className="mt-6 font-inter text-xs tracking-widest text-[#8FA8A1] uppercase">{source}</p>
      </motion.div>
    </section>
  )
}
