import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function ProfileSection({ data }: { data: Invitation }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i, duration: 1, ease: [0.215, 0.61, 0.355, 1] as const },
    }),
  }

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col md:flex-row overflow-hidden border-b border-stone-200">
      {/* 1. BRIDE SIDE (Kiri) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col border-b md:border-b-0 md:border-r border-stone-200">
        <div className="flex-1 overflow-hidden relative group">
          <img src={data.bridePhoto} className="w-full h-full object-cover grayscale sepia-[0.1] hover:scale-105 transition-transform duration-[2s]" alt="The Bride" />
          <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          <div className="absolute bottom-6 left-8">
            <span className="text-[4rem] md:text-[6rem] font-serif italic text-white/20 leading-none">B</span>
          </div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 md:p-12 bg-[#F9F8F4] flex flex-col items-center md:items-start">
          <motion.span custom={0.2} variants={fadeInUp} className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-2">
            The Bride
          </motion.span>
          <motion.h2 custom={0.4} variants={fadeInUp} className="font-serif text-2xl md:text-3xl text-stone-800 mb-4 italic tracking-wide">
            {data.brideFullName}
          </motion.h2>
          <motion.div custom={0.6} variants={fadeInUp} className="text-center md:text-left">
            <p className="text-[10px] tracking-[0.1em] text-stone-400 uppercase mb-1 italic">The beloved daughter of</p>
            <p className="text-[11px] tracking-widest text-stone-600 uppercase font-medium">
              Mr. {data.brideFather} <br /> & Mrs. {data.brideMother}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. GROOM SIDE (Kanan) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col">
        <div className="flex-1 overflow-hidden relative group">
          <img src={data.groomPhoto} className="w-full h-full object-cover grayscale sepia-[0.1] hover:scale-105 transition-transform duration-[2s]" alt="The Groom" />
          <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          <div className="absolute bottom-6 left-8">
            <span className="text-[4rem] md:text-[6rem] font-serif italic text-white/20 leading-none">G</span>
          </div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 md:p-12 bg-[#F9F8F4] flex flex-col items-center md:items-start">
          <motion.span custom={0.2} variants={fadeInUp} className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-2">
            The Groom
          </motion.span>
          <motion.h2 custom={0.4} variants={fadeInUp} className="font-serif text-2xl md:text-3xl text-stone-800 mb-4 italic tracking-wide">
            {data.groomFullName}
          </motion.h2>
          <motion.div custom={0.6} variants={fadeInUp} className="text-center md:text-left">
            <p className="text-[10px] tracking-[0.1em] text-stone-400 uppercase mb-1 italic">The beloved son of</p>
            <p className="text-[11px] tracking-widest text-stone-600 uppercase font-medium">
              Mr. {data.groomFather} <br /> & Mrs. {data.groomMother}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Center Divider Logo (Pemanis di tengah desktop) */}
      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#F9F8F4] border border-stone-200 rounded-full z-20 items-center justify-center">
        <span className="text-stone-400 font-serif italic text-xs">&</span>
      </div>
    </section>
  )
}
