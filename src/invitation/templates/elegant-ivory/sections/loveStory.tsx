/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion"
import { useRef } from "react"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function LoveStorySection({ data }: Props) {
  const sectionRef = useRef(null)

  const stories = [
    { title: "Awal Bertemu", content: data.storyMeet, year: "2016" },
    { title: "Menjalin Hubungan", content: data.storyCommitment, year: "2019" },
    { title: "Menuju Pelaminan", content: data.storyMarriage, year: "2026" },
  ]

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] px-6 py-28 overflow-hidden">
      {/* 1. LAYER CAHAYA (Ambient Light) agar tidak terlalu gelap pekat */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#D4A853]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#D4A853]/5 rounded-full blur-[120px]" />
      </div>

      {/* Title Section */}
      <div className="relative z-10 mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="block font-lora text-[10px] tracking-[0.5em] text-[#D4A853] uppercase mb-4">Our Journey</span>
          <h2 className="font-bodoni italic text-5xl text-white mb-2">Love Story</h2>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent mx-auto mt-6" />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-4xl z-10">
        {/* 2. REVISI GARIS TIMELINE: Lebih bercahaya */}
        <div className="absolute left-4 md:left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4A853]/40 to-transparent shadow-[0_0_8px_rgba(212,168,83,0.2)]" />

        <div className="flex flex-col gap-16 md:gap-24">
          {stories.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>

      {/* Ornamen tetap dipertahankan dengan animasi yang sudah kita buat sebelumnya */}
      <motion.img
        src="/elegant-ivory/ivory-1.png"
        alt=""
        className="pointer-events-none absolute right-[-5%] top-8 w-72 opacity-10 grayscale invert"
        animate={{ y: [0, -20, 0], rotate: [90, 95, 90] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/elegant-ivory/ivory-1.png"
        alt=""
        className="pointer-events-none absolute left-[-5%] bottom-8 w-72 opacity-10 grayscale invert"
        animate={{ y: [0, 20, 0], rotate: [-90, -85, -90] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  )
}

function TimelineItem({ item, index, isLeft }: { item: any; index: number; isLeft: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`relative flex w-full flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Dot Indicator dengan Ring Glow */}
      <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-20">
        <div className="h-3 w-3 rounded-full bg-[#D4A853] shadow-[0_0_15px_rgba(212,168,83,0.8)]" />
        <div className="absolute -inset-1 h-5 w-5 rounded-full border border-[#D4A853]/30 animate-pulse" />
      </div>

      {/* 3. REVISI KONTEN: Menggunakan Card Transparan */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
        <div className="bg-white/[0.03] border border-white/5 backdrop-blur-sm p-8 rounded-2xl hover:border-[#D4A853]/30 transition-all duration-500 group">
          <span className="inline-block font-lora text-[11px] tracking-widest text-[#D4A853] mb-3 bg-[#D4A853]/10 px-3 py-1 rounded-full">{item.year}</span>

          <h3 className="font-bodoni italic text-2xl text-white mb-4 group-hover:translate-x-1 md:group-hover:translate-x-0 md:group-hover:-translate-x-1 transition-transform duration-500">{item.title}</h3>

          <p className="font-lora text-[14px] leading-relaxed text-white/70 italic">"{item.content}"</p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  )
}
