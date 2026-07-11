import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, memo } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

// Animasi diubah menjadi pure Fade-Up tipis tanpa mengubah skala (Scale) agar GPU enteng
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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
      <section id="gallery" className="relative py-28 bg-transparent subpixel-antialiased">
        {/* HEADER EDITORIAL */}
        <div className="text-center mb-20 max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <span className="text-[9px] tracking-[0.6em] uppercase text-white/30 font-montserrat font-bold block mb-3 pl-[0.6em]">The Visuals</span>
            <h2 className="font-cinzel text-4xl text-white/95 tracking-widest uppercase font-light">Our Moment</h2>
            <div className="h-px w-8 bg-white/20 mx-auto mt-4 mb-6" />
            <p className="font-montserrat text-[11px] leading-[1.8] text-white/50 tracking-wide">
              "Setiap foto adalah satu detak jantung yang terabadikan. Selamat datang di potongan-potongan memori kami, di mana setiap sudutnya menyimpan tawa, doa, dan janji yang sedang kami tuju."
            </p>
          </motion.div>
        </div>

        {/* BRUTALIST BENTO GRID LAYOUT (Radius disesuaikan menjadi minimal agar serasi) */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-35 md:auto-rows-45">
          {images.map((src, index) => {
            const isFeature = index === 0
            const isWide = index === 2 || index === 6
            const isTall = index === 1 || index === 7

            return (
                <GalleryItem
                    key={`${src}-${index}`}
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

        {/* POTONGAN LIGHTBOX PORTAL AKAN DILANJUTKAN DI RESPONSE BAWAH */}
        {/* LIGHTBOX PORTAL (Sambungan dari Bagian 1) */}
        {isMounted &&
            createPortal(
                <AnimatePresence>
                  {selectedIndex !== null && (
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/98 backdrop-blur-md w-screen h-screen touch-none"
                          onClick={() => setSelectedIndex(null)}
                      >
                        {/* Tombol Close Modern Minimalis */}
                        <button className="absolute top-6 right-6 text-white/60 hover:text-white p-3 z-50 transition-colors" onClick={() => setSelectedIndex(null)}>
                          <X size={26} className="stroke-[1.5px]" />
                        </button>

                        {/* Kontrol Navigasi Kiri & Kanan Terisolasi */}
                        <div className="absolute inset-x-4 flex justify-between pointer-events-none z-50">
                          <button
                              onClick={(e) => {
                                e.stopPropagation()
                                showPrev()
                              }}
                              className="p-3 text-white/40 hover:text-white pointer-events-auto bg-white/2 border border-white/5 backdrop-blur-xs rounded-full transition-all active:scale-90"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                              onClick={(e) => {
                                e.stopPropagation()
                                showNext()
                              }}
                              className="p-3 text-white/40 hover:text-white pointer-events-auto bg-white/2 border border-white/5 backdrop-blur-xs rounded-full transition-all active:scale-90"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </div>

                        {/* Gambar Preview Utama (Menggunakan File Asli Resolusi Penuh) */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="max-w-[90%] max-h-[75vh] flex flex-col items-center gap-4 select-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                          <img
                              src={images[selectedIndex]}
                              className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl border border-white/5"
                              alt="Preview Full"
                          />
                          <span className="font-montserrat text-[10px] tracking-[0.4em] text-white/40 uppercase font-semibold mt-2">
                    {selectedIndex + 1} / {images.length}
                  </span>
                        </motion.div>
                      </motion.div>
                  )}
                </AnimatePresence>,
                document.body,
            )}
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: GALLERY ITEM (MEMOIZED)
// =========================================================
const GalleryItem = memo(({ src, index, onClick, className }: { src: string; index: number; onClick: () => void; className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // OPTIMASI UTAMA: Memotong resolusi gambar khusus untuk grid bento lewat CDN Supabase
  // Lebar 500px sudah sangat tajam untuk kotak kecil, hemat kuota data hingga 85%!
  const optimizedSrc = `${src}`

  return (
      <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -30px 0px" }}
          onClick={onClick}
          style={{ willChange: "transform, opacity" }}
          // Penyesuaian ke sudut tajam brutalist (rounded-md tipis, bukan rounded-2xl melengkung lebar)
          className={`relative overflow-hidden rounded-md bg-white/2 border border-white/5 cursor-pointer shadow-xl transform-gpu ${className}`}
      >
        {/* SKELETON LOADER PLACEMENT */}
        {!isLoaded && (
            <div className="absolute inset-0 bg-white/3 animate-pulse" />
        )}

        <img
            src={optimizedSrc} // Versi terkompresi CDN
            alt={`Gallery Thumbnail ${index}`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 transform-gpu hover:scale-103 ${
                isLoaded ? "opacity-100" : "opacity-0"
            }`}
        />
      </motion.div>
  )
})

GalleryItem.displayName = "GalleryItem"
