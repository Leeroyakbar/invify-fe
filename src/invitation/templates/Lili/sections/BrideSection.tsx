import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface BrideSectionProps {
  data: Invitation
}

export default function BrideSection({ data }: BrideSectionProps) {
  const igUsername = data.brideInstagram || "username"
  const fatherName = data.brideFather
  const motherName = data.brideMother

  // OPTIMASI: Tambahkan resolusi pas untuk mobile/tablet agar rendering GPU super ringan
  const brideImageUrl = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/bride.webp"

  // Parent container animation trigger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Memberikan jeda kemunculan antar teks
        delayChildren: 0.1,
      }
    }
  }

  // Elemen text reveal animation
  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } // Premium Luxury Smooth curve
    }
  }

  return (
      <section className="relative min-h-screen w-full overflow-hidden bg-[#090909] text-white subpixel-antialiased">

        {/* 1. BACKGROUND PHOTO WITH EXPERT PARALLAX EFFECT */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <motion.img
              src={brideImageUrl}
              alt={data.brideName}
              initial={{ scale: 1.1, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 2.5, ease: "easeOut" }} // Efek auto-zoom lambat saat terscroll masuk
              className="w-full h-full object-cover object-center transform-gpu will-change-transform"
          />
          {/* Advanced Noir Overlay: Gradasi gelap dari bawah & kiri untuk perlindungan kontras teks */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent z-10" />
        </div>

        {/* 2. PREMIUM CONTENT LAYOUT */}
        <div className="relative z-20 w-full min-h-screen flex flex-col justify-end lg:justify-center items-start px-10 pb-24 pt-28 lg:p-24 max-w-3xl">

          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger ketika 20% section masuk layar
              className="space-y-6 lg:space-y-8 w-full"
          >
            {/* Section Subtitle Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-[10px] lg:text-[11px] tracking-[0.6em] uppercase text-white/50 font-inter font-bold pl-[0.6em]">
              The Bride
            </span>
              <div className="h-px w-8 bg-white/20" />
            </motion.div>

            {/* Full Name Typo */}
            <motion.h1
                variants={itemVariants}
                className="font-cormorant-upright text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] font-light tracking-[0.03em] text-white/95"
            >
              {data.brideFullName}
            </motion.h1>

            {/* Silsilah Orang Tua - Modern Editorial Style */}
            <motion.div variants={itemVariants} className="space-y-2 font-inter font-light">
              <p className="text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold pl-[0.4em]">
                Putri Kedua Dari
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
