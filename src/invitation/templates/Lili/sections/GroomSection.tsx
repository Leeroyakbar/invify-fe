import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface GroomSectionProps {
  data: Invitation
}

export default function GroomSection({ data }: GroomSectionProps) {
  const igUsername = data.groomInstagram || "username"

  // OPTIMASI: Kompresi ukuran gambar otomatis lewat CDN Supabase agar scrolling bodi super mulus
  const groomImageUrl = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/groom.webp?width=600"
  const fatherName = data.groomFather
  const motherName = data.groomMother

  // Parent container animation trigger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda kemunculan berurutan antar teks
        delayChildren: 0.1,
      }
    }
  }

  // Elemen text reveal animation dengan Cubic Bezier Premium
  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  return (
      <section className="relative min-h-screen w-full overflow-hidden bg-[#090909] text-white subpixel-antialiased border-t border-white/5">

        {/* 1. BACKGROUND PHOTO WITH CONTINUOUS SCALE PARALLAX */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <motion.img
              src={groomImageUrl}
              alt={data.groomName}
              initial={{ scale: 1.1, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 2.5, ease: "easeOut" }} // Auto-zoom lambat saat terscroll masuk
              className="w-full h-full object-cover object-[center_20%] transform-gpu will-change-transform"
          />
          {/* Advanced Noir Overlay: Gradasi gelap dari kanan untuk membedakannya dengan BrideSection */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent lg:bg-linear-to-l lg:from-black/90 lg:via-black/40 lg:to-transparent z-10" />
        </div>

        {/* 2. PREMIUM ASYMMETRIC CONTENT LAYOUT */}
        {/* Menggunakan lg:items-end & lg:text-right untuk efek simetri terbalik yang estetik di layar besar */}
        <div className="relative z-20 w-full min-h-screen flex flex-col justify-end lg:justify-center items-start lg:items-end px-10 pb-24 pt-28 lg:p-24 lg:ml-auto max-w-7xl">

          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger ketika 20% section masuk layar
              className="space-y-6 lg:space-y-8 w-full max-w-2xl flex flex-col items-start lg:items-end text-left lg:text-right"
          >
            {/* Section Subtitle Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 flex-row lg:flex-row-reverse">
            <span className="text-[10px] lg:text-[11px] tracking-[0.6em] uppercase text-white/50 font-inter font-bold pl-[0.6em] lg:pl-0 lg:pr-[0.6em]">
              The Groom
            </span>
              <div className="h-px w-8 bg-white/20" />
            </motion.div>

            {/* Full Name Typo */}
            <motion.h1
                variants={itemVariants}
                className="font-cormorant-upright text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] font-light tracking-[0.03em] text-white/95"
            >
              {data.groomFullName || "LeeRoy Ananta"}
            </motion.h1>

            {/* Silsilah Orang Tua - Modern Editorial Style */}
            <motion.div variants={itemVariants} className="space-y-2 font-inter font-light">
              <p className="text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold pl-[0.4em] lg:pl-0 lg:pr-[0.4em]">
                Putra Ketiga Dari
              </p>
              <div className="text-sm sm:text-base text-white/80 tracking-wide leading-relaxed font-light">
                <span>{fatherName}</span>
                <span className="font-alice text-xs text-white/30 mx-2 italic">and</span>
                <span>{motherName}</span>
              </div>
            </motion.div>

            {/* Elegant Thin Divider */}
            <motion.div variants={itemVariants} className="h-px w-20 bg-white/10" />

            {/* Minimalist Capsule Instagram Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <a
                  href={`https://instagram.com/${igUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/10 rounded-full bg-white/2 backdrop-blur-xs transition-all duration-500 hover:bg-white hover:border-white active:scale-95 shadow-xl"
              >
                <Instagram
                    size={14}
                    className="text-white/60 group-hover:text-black transition-colors duration-500 stroke-[1.5px]"
                />
                <span className="font-inter text-[11px] tracking-[0.15em] text-white/80 group-hover:text-black font-semibold transition-colors duration-500">
                @{igUsername}
              </span>
              </a>
            </motion.div>

          </motion.div>
        </div>

      </section>
  )
}
