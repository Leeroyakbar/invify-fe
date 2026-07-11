import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"
import { type Invitation } from "../../../../types/Invitation"
import { Instagram } from "lucide-react"

export default function CoupleSection({ data }: { data: Invitation }) {
  const [bridePhotoIndex, setBridePhotoIndex] = useState(0)
  const [groomPhotoIndex, setGroomPhotoIndex] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Efek paralaks dan rotasi dipertahankan karena memberikan kesan premium
  const yParallax = useTransform(smoothProgress, [0, 1], ["-8%", "8%"])
  const rotateBride = useTransform(smoothProgress, [0, 1], [-2, 2])
  const rotateGroom = useTransform(smoothProgress, [0, 1], [2, -2])

  // OPTIMASI CDN: Memotong resolusi gambar di server Supabase agar HP tamu tidak lag saat memproses matriks 3D
  const bridePhotos = useMemo(() => [
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/bride.webp",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/bride-2.webp"
  ], [])

  const groomPhotos = useMemo(() => [
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/groom.webp",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/groom-2.webp"
  ], [])

  useEffect(() => {
    const timer = setInterval(() => {
      setBridePhotoIndex((prev) => (prev + 1) % bridePhotos.length)
      setGroomPhotoIndex((prev) => (prev + 1) % groomPhotos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bridePhotos.length, groomPhotos.length])

  return (
      <section ref={containerRef} id="couple" className="relative border-t border-white/5 overflow-hidden bg-transparent pb-40 subpixel-antialiased">

        {/* 1. QUOTE SECTION */}
        <div className="px-10 py-32 text-center relative flex flex-col items-center justify-center min-h-[50vh]">
          {/* Teks Latar Belakang Brutalist */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.02 }} viewport={{ once: true }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <span className="font-cinzel text-[100px] sm:text-[140px] md:text-[180px] font-black tracking-[0.2em] text-white">SOUL</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-6 max-w-md">
            <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block mb-6 pl-[0.8em] font-bold">The Sacred Sign</span>
            <p className="font-reenie-beanie text-3xl md:text-4xl text-white/70 leading-relaxed px-4">
              "And among His Signs is this, that He created for you mates from among yourselves so that you may find comfort in them."
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="h-[0.5px] w-6 bg-white/10" />
              <span className="font-montserrat text-[9px] text-white/40 tracking-[0.4em] uppercase font-semibold">Ar-Rum / 21</span>
              <div className="h-[0.5px] w-6 bg-white/10" />
            </div>
          </motion.div>
        </div>

        {/* 2. PROFILE SECTION */}
        <div className="flex flex-col gap-44 md:gap-52 max-w-4xl mx-auto w-full">

          {/* BRIDE AREA */}
          <div className="px-8 md:px-16 flex flex-col items-start w-full relative">
            <div className="relative w-full max-w-70 md:max-w-[320px]">
              {/* Huruf Inisial Raksasa */}
              <span className="absolute -top-14 -right-10 font-cinzel text-[120px] md:text-[160px] text-white/3 font-bold leading-none select-none pointer-events-none z-0">{data.brideName ? data.brideName.charAt(0) : "R"}</span>

              {/* Kontainer Utama yang Melakukan Rotasi Paralaks */}
              <motion.div style={{ rotate: rotateBride }} className="relative z-10 will-change-transform transform-gpu">

                {/* Bingkai Asimetris Gambar */}
                <div className="relative aspect-4/5 overflow-hidden rounded-tl-[100px] md:rounded-tl-[130px] rounded-br-[30px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-neutral-950">

                  {/* SOLUSI BUG PERFORMA: Elemen pembawa gerak paralaks Y diisolasi di luar AnimatePresence */}
                  <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-full will-change-transform transform-gpu">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.img
                          key={bridePhotos[bridePhotoIndex]}
                          src={bridePhotos[bridePhotoIndex]}
                          /* Lapisan gambar murni menangani transisi opacity & geser horizontal */
                          initial={{ opacity: 0, x: 25 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -25 }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 w-full h-full object-cover"
                          alt="Bride Portfolio"
                      />
                    </AnimatePresence>
                  </motion.div>

                </div>
                {/* Tag Label Reenie Beanie */}
                <span className="absolute -bottom-6 -right-4 font-reenie-beanie text-4xl text-white/50 -rotate-12 italic select-none pointer-events-none">The Bride</span>
              </motion.div>

              {/* Detail Deskripsi Teks */}
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mt-12 space-y-4 pl-5 border-l border-white/10">
                <h2 className="font-cinzel text-2xl md:text-3xl text-white/95 tracking-wider uppercase leading-tight font-light">{data.brideFullName}</h2>
                <p className="font-montserrat text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase">
                  Putri dari Bapak {data.brideFather} & Ibu {data.brideMother}
                </p>
                <a href={`https://instagram.com/${data.brideInstagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors w-fit pt-1">
                  <Instagram size={13} className="stroke-[1.5px]" />
                  <span className="font-montserrat text-[9px] tracking-[0.2em] font-bold uppercase">@{data.brideInstagram}</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* GROOM AREA */}
          <div className="px-8 md:px-16 flex flex-col items-end w-full relative">
            <div className="relative w-full max-w-70 md:max-w-[320px]">
              {/* Huruf Inisial Raksasa */}
              <span className="absolute -top-14 -left-10 font-cinzel text-[120px] md:text-[160px] text-white/[0.03] font-bold leading-none select-none pointer-events-none z-0">
                {data.groomName ? data.groomName.charAt(0) : "G"}
              </span>

              {/* Kontainer Utama yang Melakukan Rotasi Paralaks */}
              <motion.div style={{ rotate: rotateGroom }} className="relative z-10 will-change-transform transform-gpu">

                {/* Bingkai Asimetris Gambar */}
                <div className="relative aspect-4/5 overflow-hidden rounded-tr-[100px] md:rounded-tr-[130px] rounded-bl-[30px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-neutral-950">

                  {/* SOLUSI BUG PERFORMA: Elemen pembawa gerak paralaks Y diisolasi di luar AnimatePresence */}
                  <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-full will-change-transform transform-gpu">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.img
                          key={groomPhotos[groomPhotoIndex]}
                          src={groomPhotos[groomPhotoIndex]}
                          initial={{ opacity: 0, x: -25 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 25 }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full object-cover absolute inset-0"
                          alt="Groom Portfolio"
                      />
                    </AnimatePresence>
                  </motion.div>

                </div>
                {/* Tag Label Reenie Beanie */}
                <span className="absolute -bottom-6 -left-4 font-reenie-beanie text-4xl text-white/50 rotate-12 italic select-none pointer-events-none">The Groom</span>
              </motion.div>

              {/* Detail Deskripsi Teks */}
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mt-12 space-y-4 pr-5 border-r border-white/10 text-right flex flex-col items-end">
                <h2 className="font-cinzel text-2xl md:text-3xl text-white/95 tracking-[0.05em] uppercase leading-tight font-light">{data.groomFullName}</h2>
                <p className="font-montserrat text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase">
                  Putra dari Bapak {data.groomFather} & Ibu {data.groomMother}
                </p>
                <a href={`https://instagram.com{data.groomInstagram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors w-fit pt-1">
                  <span className="font-montserrat text-[9px] tracking-[0.2em] font-bold uppercase">@{data.groomInstagram}</span>
                  <Instagram size={13} className="stroke-[1.5px]" />
                </a>
              </motion.div>
            </div>
          </div>

        </div>
      </section>
  )
}