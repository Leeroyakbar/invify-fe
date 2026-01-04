import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function ClosingSection({ data }: { data: Invitation }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col items-center justify-center px-8 overflow-hidden text-center">
      {/* Background Subtle Photo (Low Opacity) */}
      <div className="absolute inset-0 opacity-[0.15] grayscale sepia-[0.2]">
        <img src={data.images[1] || data.bridePhoto} className="w-full h-full object-cover" alt="Closing Background" />
      </div>

      {/* Frame Tipis Penghias */}
      <div className="absolute inset-10 border border-stone-200 pointer-events-none" />

      <div className="max-w-2xl w-full z-10 space-y-12">
        {/* 1. Religious Quote / Ayat */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
          <motion.p custom={0.2} variants={fadeInUp} className="font-serif text-sm md:text-base leading-relaxed italic text-stone-600 px-4 md:px-0">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </motion.p>
          <motion.div custom={0.5} variants={fadeInUp} className="text-[9px] tracking-[0.6em] uppercase text-stone-400">
            — Ar-Rum 21
          </motion.div>
        </motion.div>

        {/* 2. Gratitude Message */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-12 space-y-8">
          <motion.div custom={0.8} variants={fadeInUp} className="w-8 h-[1px] bg-stone-300 mx-auto" />

          <motion.p custom={1} variants={fadeInUp} className="text-[10px] tracking-[0.4em] uppercase text-stone-500 leading-loose">
            Our hearts are full. <br />
            Thank you for witnessing <br />
            our new beginning.
          </motion.p>

          {/* 3. Digital Signature */}
          <motion.div custom={1.3} variants={fadeInUp} className="pt-4">
            <span className="text-[10px] tracking-[0.3em] text-stone-300 block mb-6 uppercase italic">Sincerely,</span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 italic tracking-tighter">
              {data.brideName.split(" ")[0]} <span className="text-xl not-italic opacity-20 mx-2">&</span> {data.groomName.split(" ")[0]}
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright Footer */}
      <div className="absolute bottom-14 w-full text-[8px] tracking-[0.4em] text-stone-300 uppercase">Developed with heart by Invify • 2027</div>

      {/* Decorative Brand Scroll Tag */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-t from-stone-200 to-transparent" />
    </section>
  )
}
