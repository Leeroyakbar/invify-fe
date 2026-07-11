import { easeIn, motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface StorySectionProps {
  data: Invitation
}

export default function StorySection({ data }: StorySectionProps) {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 2.5, ease: easeIn },
  }

  const stories = [
    { title: "Chapter One: Awal Bertemu", content: data.storyMeet },
    { title: "Chapter Two: Menjalin Hubungan", content: data.storyCommitment },
    { title: "Chapter Three: Hari Pernikahan", content: data.storyMarriage },
  ]

  const storyImgHeader = [data.images[1], data.images[2]]

  return (
    <section className="relative min-h-screen w-full py-24 px-8 lg:px-16 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-xl">
        {/* 1. PHOTO DISPLAY (Elegant Rounded) */}
        <div className="grid grid-cols-2 gap-3 mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img src={storyImgHeader[0]} alt="Moment 1" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.2 }} className="aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img src={storyImgHeader[1]} alt="Moment 2" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* 2. TITLE SECTION */}
        <motion.div {...fadeUp} transition={{ duration: 1.2, ease: easeIn }} className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-cormorant-upright text-white tracking-[0.1em] uppercase">Journey of Love</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/40 via-white/10 to-transparent mt-6" />
        </motion.div>

        {/* 3. STORY CONTENT */}
        <div className="space-y-12 mb-20">
          {stories.map((story, index) => (
            <motion.div key={index} {...fadeUp} transition={{ delay: index * 0.3 }} className="space-y-3">
              <h3 className="text-white/90 font-inter text-[13px] font-bold tracking-widest uppercase">{story.title}</h3>
              <p className="text-white/60 font-inter text-[13px] leading-relaxed font-light text-justify">{story.content}</p>
            </motion.div>
          ))}
        </div>

        {/* 4. SIGNATURE SECTION (Gaya Minimalis Referensi) */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="flex flex-col gap-4">
          {/* Garis Horizontal Tipis */}
          <div className="h-[1px] w-full bg-white/20" />

          {/* Nama di sebelah kanan (Mengikuti SS) */}
          <div className="flex justify-end items-baseline gap-2">
            <span className="font-alice text-2xl text-white tracking-wide">{data.brideName}</span>
            <span className="font-cormorant-upright text-lg text-white/30 italic">&</span>
            <span className="font-alice text-2xl text-white tracking-wide">{data.groomName}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
