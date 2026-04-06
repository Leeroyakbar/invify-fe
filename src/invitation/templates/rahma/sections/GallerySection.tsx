import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

// 1. Varians untuk Animasi Muncul (Scroll)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda antar foto saat muncul
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export default function GallerySection({ data }: { data: Invitation }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = data.images || []

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [images.length])

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }, [images.length])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") showNext()
      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedIndex, showNext, showPrev])

  // Membagi gambar menjadi baris selang-seling (useMemo agar tidak kalkulasi ulang setiap render)
  const imageChunks = useMemo(() => {
    const chunks = []
    let i = 0
    let size = 2
    while (i < images.length) {
      chunks.push(images.slice(i, i + size))
      i += size
      size = size === 2 ? 3 : 2
    }
    return chunks
  }, [images])

  return (
    <section id="gallery" className="relative py-24 bg-transparent overflow-hidden">
      {/* HEADER ANIMATION */}
      <div className="px-10 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-2xl mx-auto space-y-4">
          <span className="font-montserrat text-[10px] uppercase tracking-[1em] text-white/20 block">Gallery</span>
          <h2 className="font-cinzel text-3xl text-white tracking-widest uppercase ">Visual Narrative</h2>
          <div className="w-12 h-px bg-white/10 mx-auto mt-8" />
        </motion.div>
      </div>

      {/* DYNAMIC GRID WITH STAGGER ANIMATION */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-5xl mx-auto px-4 space-y-4 md:space-y-4">
        {imageChunks.map((chunk, chunkIdx) => (
          <div key={chunkIdx} className={`grid gap-4 md:gap-8 ${chunk.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {chunk.map((src) => {
              const absoluteIndex = images.indexOf(src)
              return <GalleryItem key={absoluteIndex} src={src} index={absoluteIndex} onClick={() => setSelectedIndex(absoluteIndex)} />
            })}
          </div>
        ))}
      </motion.div>

      {/* LIGHTBOX PORTAL */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedIndex(null)}>
                <button className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-4 z-[100001]" onClick={() => setSelectedIndex(null)}>
                  <X size={32} />
                </button>

                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[100001]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      showPrev()
                    }}
                    className="p-4 text-white/30 hover:text-white transition-all pointer-events-auto bg-white/5 rounded-full backdrop-blur-md"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      showNext()
                    }}
                    className="p-4 text-white/30 hover:text-white transition-all pointer-events-auto bg-white/5 rounded-full backdrop-blur-md"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>

                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full h-full flex items-center justify-center p-6 md:p-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={images[selectedIndex]} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" alt="Preview" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <div className="mt-32 flex flex-col items-center opacity-10">
        <div className="w-px h-16 bg-white mb-6" />
        <span className="font-reenie-beanie text-2xl text-white tracking-widest italic">Fin.</span>
      </div>
    </section>
  )
}

function GalleryItem({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  return (
    <motion.div
      variants={itemVariants} // Menggunakan varians agar stagger bekerja
      onClick={onClick}
      className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] cursor-pointer group"
    >
      <img src={src} alt={`Gallery ${index}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <span className="text-white/50 font-montserrat text-[10px] tracking-[0.3em] uppercase border border-white/20 px-4 py-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">View</span>
      </div>
    </motion.div>
  )
}
