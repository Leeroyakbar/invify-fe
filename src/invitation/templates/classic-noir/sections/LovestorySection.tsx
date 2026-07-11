import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { memo } from "react"

export default function LoveStorySection({ data }: { data: Invitation }) {
  // Susunan bab cerita cinta puitis khas tema Noir Sinematik
  const stories = [
    { year: "2016", content: data.storyMeet, label: "The First Meet", subtitle: "Act I" },
    { year: "2019", content: data.storyCommitment, label: "Growing Together", subtitle: "Act II" },
    { year: "2027", content: data.storyMarriage, label: "The Promise", subtitle: "Act III" },
  ].filter(story => story.content) // Otomatis menyembunyikan bab jika datanya dikosongkan pengantin

  // Variabel animasi stagger untuk memunculkan bab cerita secara bergelombang
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  return (
      <section className="h-screen snap-start flex items-center px-8 text-white relative bg-transparent subpixel-antialiased" id="story">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // Berjalan mulus saat 20% area masuk layar
            className="max-w-md w-full relative py-10"
        >
          {/* HEADER SEKSI: Gaya Judul Bab Film Klasik */}
          <div className="mb-14 text-left">
          <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-2 pl-[0.5em]">
            Our Memoir
          </span>
            <h2 className="font-serif text-3xl tracking-wide text-white/95 leading-tight uppercase font-light">
              The Journey of Two Souls
            </h2>
            <div className="w-8 h-px bg-white/20 mt-4" />
          </div>

          {/* KONTEN NASKAH SKENARIO (SCREENPLAY GRID) */}
          <div className="space-y-14 w-full relative">
            {stories.map((item, index) => (
                <StoryCard
                    key={item.year}
                    year={item.year}
                    content={item.content}
                    label={item.label}
                    subtitle={item.subtitle}
                    index={index}
                />
            ))}
          </div>
        </motion.div>
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: STORY CARD (MEMOIZED)
// =========================================================
interface StoryCardProps {
  year: string
  content: string
  label: string
  subtitle: string
  index: number
}

const StoryCard = memo(({ year, content, label, subtitle }: StoryCardProps) => {
  // Animasi bergeser dari samping dengan kurva mewah (Premium Cubic Bezier)
  const storyRevealVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <motion.div
          variants={storyRevealVariants}
          className="relative flex flex-col justify-start group transform-gpu will-change-transform pl-4 border-l border-white/5 hover:border-white/20 transition-colors duration-500"
      >
        {/* Angka Tahun Raksasa Tipis di Belakang Konten (Gaya Poster Film) */}
        <span className="absolute right-0 -top-6 font-serif text-[4.5rem] font-extralight text-white/[0.02] group-hover:text-white/[0.04] select-none pointer-events-none leading-none z-0 transition-colors duration-500 tracking-tighter">
        {year}
      </span>

        {/* Baris Meta Info: Act & Judul Bab */}
        <div className="relative z-10 flex items-center gap-3 mb-2">
        <span className="font-serif text-xs italic text-white/30 font-light tracking-wide">
          {subtitle}
        </span>
          <div className="w-1.5 h-px bg-white/20" />
          <h3 className="text-white/40 group-hover:text-white/60 transition-colors font-sans text-[9px] font-bold tracking-[0.25em] uppercase">
            {label}
          </h3>
        </div>

        {/* Paragraf Narasi Cerita (Gaya Subtitle Dialog Film Noir) */}
        <p className="relative z-10 text-[13px] leading-[1.8] text-white/70 font-lora font-light italic text-justify pr-4 tracking-wide group-hover:text-white/90 transition-colors duration-400">
          “{content}”
        </p>
      </motion.div>
  )
})

StoryCard.displayName = "StoryCard"
