import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import type { Invitation } from "../../../../types/Invitation"

export default function HeroSection({ data }: { data: Invitation }) {
  const containerRef = useRef(null)

  // Parallax effect untuk background layer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // OPTIMASI CDN: Menyesuaikan resolusi gambar dengan lebar layar HP tamu
  const backgroundImage = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/gallery-10.webp';

  // Ambil data tanggal saja (tanpa tahun) untuk info bar kiri
  const dateParts = data.eventDateFormatted.split(" • ")
  const dayMonth = dateParts.slice(0, 2).join(" / ")

  // Efek transisi masuk khas majalah brutalist (Tajam, tegas, tanpa memantul)
  const brutalFadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <section
          ref={containerRef}
          id="hero"
          className="relative h-dvh w-full overflow-hidden flex flex-col justify-between p-8 md:p-16 bg-[#0a0a0a] subpixel-antialiased"
      >
        {/* 1. BACKGROUND LAYER WITH GPU ACCELERATED PARALLAX */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 will-change-transform transform-gpu">
          <img
              src={backgroundImage}
              alt="Hero Background"
              className="w-full h-full object-cover object-[70%_center] md:object-[90%_center] opacity-60 grayscale-[15%]"
          />
          {/* Multilayer Overlay Perlindungan Kontras Teks */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0A0A0A] z-10" />
          <div className="absolute inset-0 bg-black/10 backdrop-grayscale-[10%] z-10" />
        </motion.div>

        {/* 2. TOP CONTENT: Editorial Label */}
        <div className="relative z-20 flex flex-col gap-4">
          <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-white/30" />
            <p className="font-montserrat text-[9px] uppercase tracking-[0.6em] text-white/50 leading-none pl-[0.6em]">
              The Wedding Celebration
            </p>
          </motion.div>
        </div>

        {/* 3. CENTER/BOTTOM CONTENT: Names & Date */}
        <div className="relative z-20">
          <div className="mb-10 space-y-2">
            {/* Teks Aksen Atas */}
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="font-reenie-beanie text-3xl text-white/80 block -mb-3 ml-1 select-none pointer-events-none"
            >
              The Union of
            </motion.span>

            {/* Judul Nama Utama */}
            <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={brutalFadeUp}
                className="font-cinzel text-white text-[44px] sm:text-5xl md:text-[80px] leading-[1.05] font-light uppercase tracking-tighter"
            >
              {data.brideName} <br />
              <span className="flex items-center gap-5 mt-1">
              <span className="text-xl md:text-3xl text-white/20 font-montserrat italic font-normal my-0 leading-none">&</span>
              <span className="text-white/90">{data.groomName}</span>
            </span>
            </motion.h1>
          </div>

          {/* Info Bar Horisontal Geometris */}
          <div className="flex items-center gap-6 w-full">
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-montserrat text-white/90 text-[10px] sm:text-[11px] uppercase tracking-[0.5em] whitespace-nowrap pl-[0.5em]"
            >
              {dayMonth}
            </motion.p>

            {/* Garis horizontal memanjang dari kiri ke kanan saat ter-scroll */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                className="h-[0.5px] bg-white/20 flex-1 origin-left"
            />

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-montserrat text-white/60 text-[10px] sm:text-[11px] tracking-[0.5em] font-light"
            >
              2027
            </motion.p>
          </div>
        </div>

        {/* 4. BRUTALIST SCROLL INDICATOR */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-4 select-none pointer-events-none"
        >
        <span
            className="font-montserrat text-[8px] uppercase tracking-[0.4em] text-white/30 vertical-text"
            style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>

          {/* Garis indikator beranimasi menyusut-memanjang konstan */}
          <div className="h-14 w-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
                animate={{
                  y: ["-100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent"
            />
          </div>
        </motion.div>
      </section>
  )
}
