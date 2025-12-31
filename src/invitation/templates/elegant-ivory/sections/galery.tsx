import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, X, Maximize2 } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

type Props = {
  data: Invitation
}

export default function GallerySection({ data }: Props) {
  const images = data.images || []
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="relative bg-[#F8F6F2] px-6 py-12">
      <div className="mb-20 flex items-center justify-center gap-4">
        <span className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Heart SVG */}
        <svg width="18" height="16" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path
            d="M12 21s-7.5-4.7-10-8.9C-0.5 7.4 3.2 2 8 4.3
         9.6 5.1 11 7 12 8.5
         13 7 14.4 5.1 16 4.3
         20.8 2 24.5 7.4 22 12.1
         19.5 16.3 12 21 12 21z"
            stroke="#C8A97E"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
        <span className="h-px w-20 bg-[#C8A97E]/60" />
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <button className="absolute right-6 top-6 text-white/70 hover:text-white">
              <X size={32} />
            </button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={selectedImage} className="max-h-[90vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="mb-12 text-center">
        <Camera className="mx-auto mb-4 text-[#C8A97E]" size={28} />
        <h2 className="font-playfair text-3xl text-[#2F3E46]">Gallery</h2>
        <p className="mt-2 font-script text-3xl text-[#6B7280]">Our Moment</p>
      </motion.div>

      {/* Gallery Layout */}
      <div className="mx-auto max-w-4xl">
        {images.length > 0 && (
          <div className="flex flex-col gap-4">
            {/* 1. FOTO BESAR (Index 0) */}
            <GalleryItem src={images[0]} isLarge onImageClick={() => setSelectedImage(images[0])} />

            {/* 2. GRID FOTO KECIL (Index 1 ke atas) */}
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((src) => (
                <GalleryItem key={src} src={src} onImageClick={() => setSelectedImage(src)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function GalleryItem({ src, isLarge = false, onImageClick }: { src: string; isLarge?: boolean; onImageClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1.5 }}
      onClick={onImageClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm ${isLarge ? "h-64 md:h-96 w-full" : "aspect-square w-full"}`}
    >
      <img src={src} alt="Gallery moment" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />

      {/* Overlay Hitam saat Hover */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 flex items-center justify-center">
        <Maximize2 className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" size={24} />
      </div>
    </motion.div>
  )
}
