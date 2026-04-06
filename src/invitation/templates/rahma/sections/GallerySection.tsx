import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, memo } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export default function GallerySection({ data }: { data: Invitation }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const images = data.images || []

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const showNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  const showPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : ""
  }, [selectedIndex])

  return (
    <section id="gallery" className="relative py-20 bg-transparent px-4">
      {/* HEADER */}
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-cinzel text-3xl text-white tracking-[0.2em] uppercase">Our Moment</h2>
          <p className="font-montserrat text-[10px] text-white/40 mt-4 italic">
            "Setiap foto adalah satu detak jantung yang terabadikan. Selamat datang di potongan-potongan memori kami, di mana setiap sudutnya menyimpan tawa, doa, dan janji yang sedang kami tuju."
          </p>
        </motion.div>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[150px] md:auto-rows-[200px]">
        {images.map((src, index) => {
          // Menentukan span berdasarkan pola agar terlihat variatif (seperti di gambar contoh)
          // Pola: Foto pertama besar, sisanya kecil, ada yang memanjang ke bawah
          const isFeature = index === 0 // Foto pertama lebar penuh (landscape)
          const isWide = index === 2 || index === 6 // Foto tertentu melebar ke samping
          const isTall = index === 1 || index === 7 // Foto tertentu memanjang ke bawah

          return (
            <GalleryItem
              key={index}
              src={src}
              index={index}
              className={`
                ${isFeature ? "col-span-2 md:col-span-3 row-span-2" : ""} 
                ${isWide && !isFeature ? "col-span-2" : ""}
                ${isTall && !isFeature ? "row-span-2" : ""}
              `}
              onClick={() => setSelectedIndex(index)}
            />
          )
        })}
      </div>

      {/* LIGHTBOX PORTAL */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95" onClick={() => setSelectedIndex(null)}>
                <button className="absolute top-6 right-6 text-white/50 p-2 z-[10]" onClick={() => setSelectedIndex(null)}>
                  <X size={30} />
                </button>

                <div className="absolute inset-x-4 flex justify-between pointer-events-none z-[10]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      showPrev()
                    }}
                    className="p-2 text-white/40 pointer-events-auto bg-black/20 rounded-full"
                  >
                    <ChevronLeft size={30} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      showNext()
                    }}
                    className="p-2 text-white/40 pointer-events-auto bg-black/20 rounded-full"
                  >
                    <ChevronRight size={30} />
                  </button>
                </div>

                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-[95%] max-h-[85vh] object-contain"
                  alt="Preview"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}

const GalleryItem = memo(({ src, index, onClick, className }: { src: string; index: number; onClick: () => void; className: string }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
      onClick={onClick}
      style={{ willChange: "transform, opacity" }}
      className={`relative overflow-hidden rounded-2xl bg-white/5 cursor-pointer shadow-lg ${className}`}
    >
      <img src={src} alt={`Gallery ${index}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
    </motion.div>
  )
})

GalleryItem.displayName = "GalleryItem"
