import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2 } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

type Props = {
  data: Invitation
}

export default function GallerySection({ data }: Props) {
  const images = data.images || []
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="relative bg-[#0A0A0A] px-6 py-24 overflow-hidden border-t border-white/5">
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4A853]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 mb-16 text-center">
        {/* <ImageIcon className="mx-auto mb-4 text-[#D4A853]/60" size={24} strokeWidth={1.5} />
        <span className="block font-lora text-[10px] tracking-[0.5em] text-[#D4A853] uppercase mb-3">Capturing Moments</span> */}
        <h2 className="font-bodoni italic text-4xl text-white">Our Moment</h2>
        <div className="h-[1px] w-12 bg-[#D4A853]/30 mx-auto mt-6" />
      </motion.div>

      {/* Bento Gallery Layout */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, index) => (
            <GalleryItem key={src} src={src} index={index} onImageClick={() => setSelectedImage(src)} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md"
          >
            <motion.button initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} className="absolute right-6 top-6 text-white/50 hover:text-[#D4A853] transition-colors">
              <X size={32} strokeWidth={1} />
            </motion.button>

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-h-full max-w-5xl group" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} className="max-h-[85vh] w-auto rounded-sm shadow-2xl border border-white/10" alt="Selected" />
              <div className="absolute -bottom-10 left-0 w-full text-center">
                <p className="font-lora text-xs tracking-widest text-[#D4A853]/60 uppercase italic">The Wedding Gallery</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryItem({ src, index, onImageClick }: { src: string; index: number; onImageClick: () => void }) {
  // Membuat variasi ukuran ala Bento Grid
  const isWide = index === 0 || index === 5
  const isTall = index === 1 || index === 4

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onImageClick}
      className={`
        group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#1A1A1A]
        ${isWide ? "col-span-2 aspect-[16/9] md:aspect-auto md:h-64" : "aspect-square md:h-64"}
        ${isTall ? "md:row-span-2 md:h-full" : ""}
      `}
    >
      <img src={src} alt="Moment" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" />

      {/* Elegant Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
          <Maximize2 className="text-white" size={20} strokeWidth={1.5} />
        </div>
        <span className="font-lora text-[10px] tracking-[0.3em] text-white/80 uppercase">View Detail</span>
      </div>

      {/* Decorative Border on Hover */}
      <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  )
}
