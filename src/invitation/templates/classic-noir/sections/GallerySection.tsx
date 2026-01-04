import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = ["/classic-noir/photo-1.jpeg", "/classic-noir/photo-2.jpeg", "/classic-noir/photo-3.jpeg", "/classic-noir/photo-4.jpeg", "/classic-noir/photo-5.jpeg"]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <section id="gallery" className="h-screen snap-start bg-black text-white relative overflow-hidden flex flex-col justify-center items-center px-8">
      {/* Background Subtle Numbering */}
      <div className="absolute top-10 left-10 opacity-10 font-serif text-8xl italic pointer-events-none">0{currentIndex + 1}</div>

      <div className="relative w-full max-w-lg h-[70vh] flex flex-col items-center justify-center">
        {/* Gallery Title & Counter */}
        <div className="absolute -top-12 left-0 w-full flex justify-between items-end pb-2 border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 block">Gallery</span>
            <h2 className="font-serif text-xl italic uppercase tracking-widest">The Lookbook</h2>
          </div>
          <div className="text-[10px] tracking-widest opacity-40 uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Image Container with Slide Animation */}
        <div className="relative w-full h-full group overflow-hidden border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="relative w-full h-full flex items-center justify-center">
              {/* 1. BACKGROUND BLUR (Efek agar layar tetap penuh) */}
              <motion.img src={images[currentIndex]} initial={{ scale: 1.2 }} animate={{ scale: 1.1 }} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl grayscale" />

              {/* 2. MAIN IMAGE (Lanscape/Potrait aman dengan object-contain) */}
              <motion.img
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  filter: { duration: 2, delay: 0.5 },
                }}
                /* object-contain memastikan foto landscape tidak terpotong */
                className="relative z-10 w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                style={{ filter: "grayscale(0%)" }}
              />

              {/* 3. CINEMATIC OVERLAY (Garis halus di atas & bawah foto) */}
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent z-20" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Overlay (Invisible on Mobile, visible on group hover) */}
          <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
            <button onClick={prevImage} className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500">
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button onClick={nextImage} className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500">
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation (Optional Pips) */}
        <div className="absolute -bottom-10 flex gap-3">
          {images.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-[2px] transition-all duration-500 ${idx === currentIndex ? "w-8 bg-white" : "w-3 bg-white/20"}`} />
          ))}
        </div>
      </div>

      {/* Side Text Decoration */}
      <div className="absolute bottom-20 right-[-50px] rotate-90 opacity-[0.05] pointer-events-none">
        <h2 className="text-6xl font-serif tracking-[1em] uppercase">Memories</h2>
      </div>
    </section>
  )
}
