import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { fadeSoft } from "../../../../motions/templateMotions"
export default function QuoteImageSection({ data }: { data: Invitation }) {
  return (
    <section className="h-screen snap-start relative" id="quote">
      <img src="/classic-noir/photo-5.jpeg" className="absolute inset-0 w-full h-full object-cover" />

      {/* Hitam pekat di atas (from), memudar di tengah (via), transparan di bawah (to) */}
      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/30 to-transparent" />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={fadeSoft} className="relative z-10 h-full flex flex-col justify-start px-8 pt-24 pb-20">
        <h3 className="font-serif text-xl mb-4 italic">Ar-Rum : 21</h3>

        <p className="font-lora max-w-xl text-sm text-white leading-relaxed">
          “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang
          demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
        </p>

        <p className="mt-6 font-serif tracking-widest uppercase text-xs opacity-80">
          {data.brideName} & {data.groomName}
        </p>
      </motion.div>
    </section>
  )
}
