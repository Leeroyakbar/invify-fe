import { motion } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function LoveStorySection({ data }: Props) {
  const stories = [
    { title: "Awal Bertemu", content: data.storyMeet },
    { title: "Menjalin Hubungan", content: data.storyCommitment },
    { title: "Menikah", content: data.storyMarriage },
  ]

  return (
    <section className="relative bg-[#F8F6F2] px-6 py-32 overflow-hidden">
      {/* Ornament */}
      <img src="/elegant-ivory/ivory-1.png" alt="" className="pointer-events-none absolute left-0 top-0 w-52 opacity-40" />
      <img src="/elegant-ivory/ivory-1.png" alt="" className="pointer-events-none absolute right-0 bottom-0 w-52 rotate-180 opacity-40" />

      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20 text-center font-playfair text-4xl text-[#2F3E46]">
        Love Story
      </motion.h2>

      <div className="relative mx-auto max-w-4xl">
        {/* Garis Tengah - Hanya muncul di layar Desktop (md ke atas) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#C8A97E]/40 md:block" />

        <div className="flex flex-col gap-16 md:gap-24">
          {stories.map((item, index) => (
            <TimelineItem key={item.title} title={item.title} content={item.content} isLeft={index % 2 === 0} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ title, content, isLeft, delay = 0 }: { title: string; content: string; isLeft: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }} // Efek muncul dari samping
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative flex w-full flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"}`}
    >
      {/* Dot - Hanya di Desktop */}
      <div className="absolute left-1/2 top-2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#C8A97E] shadow-sm md:block z-10" />

      {/* Box Konten */}
      <div className={`w-full md:w-1/2 ${isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
        <div className="rounded-2xl bg-white/50 p-6 shadow-sm backdrop-blur-sm md:bg-transparent md:p-0 md:shadow-none">
          <h3 className="mb-3 font-playfair text-2xl text-[#2F3E46]">{title}</h3>
          <p className="font-inter text-sm leading-relaxed text-[#6B7280]">{content}</p>
        </div>
      </div>
    </motion.div>
  )
}
