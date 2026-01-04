import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function BrideSection({ data }: { data: Invitation }) {
  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col overflow-hidden">
      {/* Background Initial (Large & Subtle) */}
      <div className="absolute top-20 right-[-10%] text-[20rem] font-serif italic text-stone-200/40 leading-none pointer-events-none select-none">B</div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row-reverse items-center justify-center p-8 md:p-20 z-10 gap-8">
        {/* Photo with Elegant Frame */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="w-full md:w-[45%] h-[50vh] md:h-[70vh] relative">
          <div className="absolute inset-0 border border-stone-300 translate-x-4 translate-y-4 -z-10" />
          <img src={data.bridePhoto} className="w-full h-full object-cover grayscale sepia-[0.1] shadow-2xl" alt="The Bride" />
        </motion.div>

        {/* Typography Area */}
        <div className="w-full md:w-[55%] text-center md:text-left">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] tracking-[0.6em] uppercase text-stone-400 block mb-6">
            The Bride
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-7xl text-stone-800 mb-6 italic tracking-tight">
            {data.brideFullName}
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase italic">The beloved daughter of</p>
            <p className="text-xs md:text-sm tracking-[0.3em] text-stone-600 uppercase font-light">
              Mr. {data.brideFather} <span className="mx-2 opacity-30">&</span> Mrs. {data.brideMother}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
