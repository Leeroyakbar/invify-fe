import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface HeroSectionProps {
  data: Invitation
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Parsing tanggal
  const dateParts = data.eventDateFormatted.split(" • ")
  const dayMonth = `${dateParts[0]}/${dateParts[1]}`
  const year = dateParts[2]

  // Formula transisi masuk yang super smooth (Cubic Bezier Premium)
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as const
      },
    }),
  }

  return (
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-12 px-8 text-center text-white bg-transparent selection:bg-white/10 subpixel-antialiased">

        {/* 1. TOP SECTION: Tanggal & "The Wedding Of" */}
        <div className="w-full flex flex-col items-center space-y-10">

          {/* Date Container dengan Garis Bingkai Halus */}
          <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="flex items-center gap-6 text-[11px] md:text-[13px] tracking-[0.5em] text-white/80 font-inter uppercase font-medium"
          >
            <span className="opacity-40 h-[1px] w-8 bg-white" />
            <span>{dayMonth}</span>
            <span className="opacity-40">•</span>
            <span>{year}</span>
            <span className="opacity-40 h-px w-8 bg-white" />
          </motion.div>

          {/* Branding Text */}
          <motion.p
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="text-[9px] tracking-[0.9em] uppercase text-white/30 font-inter font-bold pl-[0.9em]"
          >
            The Wedding Of
          </motion.p>
        </div>

        {/* 2. MIDDLE SECTION: Arsitektur Nama Pengantin */}
        <div className="relative w-full my-auto py-10 flex flex-col items-center justify-center">

          {/* Ampersand Raksasa Elegan sebagai Latar Belakang Teks Nama */}
          <motion.span
              custom={0.5}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.05, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute font-cormorant text-[12rem] md:text-[16rem] italic text-white pointer-events-none select-none z-0"
          >
            &
          </motion.span>

          {/* Susunan Typo Nama Utama */}
          <motion.h1
              custom={0.7}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="relative z-10 font-cormorant-upright text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-[0.08em] uppercase font-light text-white/95 flex flex-col items-center gap-1 md:gap-3"
          >
            <span className="block">{data.brideName || "Lili"}</span>
            <span className="block font-alice text-lg md:text-xl text-white/30 my-1 lowercase italic tracking-normal">and</span>
            <span className="block text-white/90">{data.groomName || "LeeRoy"}</span>
          </motion.h1>
        </div>

        {/* 3. BOTTOM SECTION: Kutipan Ayat & Petunjuk Scroll */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-12">

          {/* Kutipan Ayat */}
          <motion.div
              custom={0.9}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="space-y-4 px-4 relative z-10"
          >
            <p className="font-lora text-[12px] md:text-[14px] leading-[1.9] text-white/60 font-light italic tracking-wide">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <div className="h-px w-6 bg-white/10 mx-auto my-2" />
            <p className="font-inter text-[8px] tracking-[0.5em] uppercase text-white/30 font-bold">QS. Ar-Rum : 21</p>
          </motion.div>

          {/* Minimalist Interaktif Scroll Indicator (Bergerak Loop Naik Turun) */}
          <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 5 }}
              transition={{
                delay: 1.6,
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <ChevronDown size={18} className="text-white/30 stroke-[1.25px]" />
          </motion.div>
        </div>

      </section>
  )
}
