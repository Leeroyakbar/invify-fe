import { easeOut, motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function LoveStorySection({ data }: { data: Invitation }) {
  // Variabel animasi untuk efek muncul berurutan (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Jeda antar konten story
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
  }

  const stories = [
    { year: "2016", content: data.storyMeet, label: "The First Meet" },
    { year: "2019", content: data.storyCommitment, label: "Growing Together" },
    { year: "2027", content: data.storyMarriage, label: "The Promise" },
  ]

  return (
    <section className="h-screen snap-start flex items-center px-8 text-white relative" id="story">
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} className="max-w-lg relative">
        {/* Judul dengan tipografi Noir yang khas */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 block mb-2">Our Story</span>
          <h2 className="font-serif text-4xl italic leading-tight">The Journey of Two Souls in Love</h2>
        </motion.div>

        <div className="relative space-y-12 pl-8">
          {/* Garis Vertikal Timeline dengan animasi gradasi */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent" />

          {stories.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {/* Titik Penanda di Garis */}
              <div className="absolute -left-[36px] top-1.5 w-2 h-2 rounded-full border border-white/50 bg-black shadow-[0_0_8px_rgba(255,255,255,0.3)]" />

              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl italic text-white/90">{item.year}</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">{item.label}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70 font-light max-w-sm italic">"{item.content}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
