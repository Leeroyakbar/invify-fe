import { useState } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface GallerySectionProps {
  data: Invitation
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [selectedImg, setSelectedImg] = useState<number | null>(null)

  const images = [
    { src: data.images[0], className: "col-span-2 aspect-[16/10]" },
    { src: data.images[1], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[2], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[3], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[4], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[5], className: "col-span-2 aspect-[16/10]" },
    { src: data.images[6], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[7], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[8], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[9], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[10], className: "col-span-2 aspect-[16/10]" },
    { src: data.images[11], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[12], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[13], className: "col-span-1 aspect-[3/4]" },
    { src: data.images[14], className: "col-span-1 aspect-[3/4]" },
  ]

  const nextImg = () => setSelectedImg((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
  const prevImg = () => setSelectedImg((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))

  return (
    <section className="relative w-full py-28 px-6 flex flex-col items-center overflow-hidden bg-black">
      {/* 1. ELEMEN BACKGROUND (LAYER PALING BAWAH) */}
      <div className="absolute inset-0 z-0">
        {/* Floating Typography - Sangat Transparan */}
        <div className="absolute top-[10%] -left-20 rotate-90 select-none pointer-events-none">
          <h2 className="font-cormorant-upright text-[10rem] text-white leading-none uppercase italic tracking-widest whitespace-nowrap">The Wedding of Lili & Lee</h2>
        </div>

        {/* Soft Radial Glows - Memberikan kesan kedalaman */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-white/30 rounded-full blur-[100px]" />

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("/lili/pattern.png")` }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase font-light">Our Moment</h2>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
        </motion.div>

        {/* GRID GALLERY */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "grayscale(0%)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: easeOut }}
              onClick={() => setSelectedImg(index)}
              className={`${img.className} overflow-hidden rounded-2xl border border-white/10 active:scale-95 transition-all shadow-2xl bg-white/[0.02] cursor-pointer`}
            >
              <img src={img.src} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* FOOTER CAPTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-28 flex flex-col items-center w-full space-y-10">
          <div className="flex items-center gap-6 w-full max-w-[250px]">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <div className="text-center px-4 space-y-12">
            <p className="font-cormorant-upright text-base lg:text-xl text-white/70 italic leading-relaxed max-w-lg mx-auto font-light">
              "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every single day."
            </p>

            <div className="space-y-3">
              <h3 className="font-cormorant-upright text-3xl text-white tracking-[0.4em] uppercase font-light">Lili & Lee</h3>
              <div className="h-[1px] w-8 bg-white/10 mx-auto" />
              <p className="font-inter text-white/20 text-[10px] tracking-[0.6em] uppercase font-bold italic">Our Eternal Moment</p>
            </div>
          </div>
        </motion.div>

        {/* LIGHTBOX / VIEW PANEL - Tetap sama namun dengan backdrop yang lebih gelap */}
        <AnimatePresence>
          {selectedImg !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4">
              <button onClick={() => setSelectedImg(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <X size={32} />
              </button>

              <button onClick={prevImg} className="absolute left-4 lg:left-10 p-2 text-white/20 hover:text-white transition-colors">
                <ChevronLeft size={48} />
              </button>

              <motion.div key={selectedImg} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-full max-h-[85vh] flex flex-col items-center gap-8">
                <img src={images[selectedImg].src} className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.05)]" alt="Full View" />
                <span className="text-white/30 font-inter text-[10px] tracking-[0.5em] uppercase font-bold">
                  {selectedImg + 1} / {images.length}
                </span>
              </motion.div>

              <button onClick={nextImg} className="absolute right-4 lg:right-10 p-2 text-white/20 hover:text-white transition-colors">
                <ChevronRight size={48} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
