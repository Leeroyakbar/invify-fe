import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // State direction untuk menentukan arah slide (-1 untuk kiri, 1 untuk kanan)
  const [direction, setDirection] = useState(0)

  // OPTIMASI CDN: Menambahkan instruksi lebar foto di server Supabase agar perpindahan slide 0.1 detik
  const images = useMemo(() => [
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-1.webp?width=600&quality=85",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-2.webp?width=600&quality=85",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-3.webp?width=600&quality=85",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-4.webp?width=600&quality=85",
    "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-5.webp?width=600&quality=85"
  ], [])

  const nextImage = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Variabel transisi geser rol film horizontal (Premium Hollywood Slider Motion)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } // Kurva super-smooth luxury
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }
    })
  }

  return (
      <section id="gallery" className="h-screen snap-start bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col justify-center items-center px-8 subpixel-antialiased">

        {/* Ornamen Nomor Seri Bab Raksasa Tipis di Pojok Atas */}
        <div className="absolute top-12 left-8 opacity-[0.02] font-serif text-[9rem] font-bold italic pointer-events-none select-none leading-none">
          0{currentIndex + 1}
        </div>

        <div className="relative w-full max-w-md h-[65vh] flex flex-col items-center justify-center">

          {/* EDITORIAL GALLERY HEADER & COUNTER */}
          <div className="absolute -top-14 left-0 w-full flex justify-between items-end pb-3 border-b border-white/5">
            <div className="text-left">
              <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-1">The Lookbook</span>
              <h2 className="font-serif text-lg tracking-[0.15em] uppercase font-light text-white/95">Our Memoir</h2>
            </div>
            <div className="font-sans text-[10px] tracking-widest text-white/30 font-semibold">
              {currentIndex + 1} <span className="text-white/10 mx-1">/</span> {images.length}
            </div>
          </div>

          {/* CONTAINER SLIDER UTAMA (Lanjutan kode ada di respon bawah) */}
          <div className="relative w-full h-full overflow-hidden border border-white/3 rounded-sm bg-neutral-950/40 shadow-2xl">
            {/* SAMBUNGAN DARI BAGIAN 1: CONTAINER SLIDER UTAMA */}
            {/* popLayout memungkinkan foto baru menimpa foto lama tanpa jeda layar kosong */}
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu"
              >
                {/* 1. BACKGROUND BLUR PRESERVATION */}
                <img
                    src={images[currentIndex]}
                    className="absolute inset-0 w-full h-full object-cover opacity-15 blur-2xl grayscale select-none pointer-events-none"
                    alt="Blur Background"
                />

                {/* 2. MAIN ASPECT-CONTAINED PHOTOGRAPHY */}
                <img
                    src={images[currentIndex]}
                    className="relative z-10 w-full max-h-full object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/2"
                    alt={`Cinematic Lookbook ${currentIndex + 1}`}
                />

                {/* 3. CINEMATIC GRADIENT MASK PROTECTION */}
                <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* INTERAKTIF KONTROL TOMBOL NAVIGASI */}
            {/* Menghapus bentuk lingkaran melengkung, diselaraskan dengan gaya kapsul transparan */}
            <div className="absolute inset-x-3 flex justify-between items-center z-30 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <button
                  onClick={prevImage}
                  className="w-9 h-9 flex items-center justify-center bg-[#0a0a0a]/40 border border-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-colors duration-300 pointer-events-auto active:scale-90"
              >
                <ChevronLeft size={16} className="stroke-[1.5px]" />
              </button>
              <button
                  onClick={nextImage}
                  className="w-9 h-9 flex items-center justify-center bg-[#0a0a0a]/40 border border-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-colors duration-300 pointer-events-auto active:scale-90"
              >
                <ChevronRight size={16} className="stroke-[1.5px]" />
              </button>
            </div>
          </div>

          {/* THUMBNAIL LINEAR PIPS NAVIGATION */}
          <div className="absolute -bottom-10 flex gap-2.5 items-center select-none">
            {images.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className={`h-px transition-all duration-500 ease-[0.16,1,0.3,1] cursor-pointer ${
                        idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                />
            ))}
          </div>
        </div>

        {/* Ornamen Teks Dekorasi Samping Khas Majalah */}
        <div className="absolute bottom-24 -right-11.25 rotate-90 opacity-[0.02] pointer-events-none select-none">
          <h2 className="text-5xl font-serif tracking-[0.8em] uppercase font-bold text-white">Memories</h2>
        </div>
      </section>
  )
}
