import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"
import { GalleryItem } from "./GalleryItem.tsx";

interface GallerySectionProps {
  data: Invitation
  onStateChange: (state: boolean) => void
}

export default function GallerySection({ data, onStateChange }: GallerySectionProps) {
  const [selectedImg, setSelectedImg] = useState<number | null>(null)

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const images = useMemo(() => {
    if (!data?.images || data.images.length === 0) return []

    const layouts = [
      "col-span-2 aspect-[16/10]",
      "col-span-1 aspect-[3/4]",
      "col-span-1 aspect-[3/4]",
      "col-span-1 aspect-[3/4]",
      "col-span-1 aspect-[3/4]"
    ]

    return data.images.map((src, index) => ({
      src,
      className: layouts[index % layouts.length]
    }))
  }, [data?.images])

  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedImg((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
  }

  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedImg((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
  }

  // Efek untuk mengunci scroll layar latar belakang saat lightbox terbuka
  useEffect(() => {
    onStateChange(selectedImg !== null)

    if (selectedImg !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [onStateChange, selectedImg])

  if (images.length === 0) return null

  return (
      /* PERBAIKAN 1: Menghapus contain-paint agar fixed modal mendeteksi layar asli, bukan tinggi section */
      <section className="relative w-full py-28 px-6 flex flex-col items-center overflow-hidden bg-black">
        {/* 1. ELEMEN BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-[10%] -left-20 rotate-90 opacity-10">
            <h2 className="font-cormorant-upright text-[10rem] text-white leading-none uppercase italic tracking-widest whitespace-nowrap">
              The Wedding of Lili & Lee
            </h2>
          </div>

          <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] transform-gpu will-change-transform" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] transform-gpu will-change-transform" />

          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-repeat" style={{ backgroundImage: `url("/lili/pattern.png")` }} />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          {/* HEADER */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16 space-y-4"
          >
            <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase font-light">Our Moment</h2>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
          </motion.div>

          {/* GRID GALLERY */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 subpixel-antialiased">
            {images.map((img, index) => (
                <GalleryItem
                    key={`${img.src}-${index}`}
                    src={img.src}
                    className={img.className}
                    index={index}
                    onClick={() => setSelectedImg(index)}
                />
            ))}
          </div>

          {/* FOOTER CAPTION */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-28 flex flex-col items-center w-full space-y-10"
          >
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

          {/* LIGHTBOX PERBAIKAN TOTAL */}
          <AnimatePresence>
            {selectedImg !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    /* PERBAIKAN 2: z-[100] dipastikan berada di atas segala elemen, ditambahkan h-screen & w-screen murni */
                    className="fixed inset-0 w-screen h-screen z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 touch-none"
                    onClick={() => setSelectedImg(null)}
                >
                  <button
                      onClick={() => setSelectedImg(null)}
                      className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-[110] p-2"
                  >
                    <X size={28} />
                  </button>

                  <button
                      onClick={prevImg}
                      className="absolute left-2 lg:left-10 p-4 text-white/40 hover:text-white transition-colors z-[110]"
                  >
                    <ChevronLeft size={36} />
                  </button>

                  <motion.div
                      key={selectedImg}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="max-w-full max-h-[80vh] flex flex-col items-center gap-4 select-none z-[105]"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <img
                        src={images[selectedImg].src}
                        /* PERBAIKAN 3: Memastikan gambar dibatasi dengan h-[70vh] agar ruang teks info tidak terdorong keluar layar */
                        className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                        alt="Full View"
                    />
                    <span className="text-white/40 font-inter text-[10px] tracking-[0.5em] uppercase font-bold">
                      {selectedImg + 1} / {images.length}
                    </span>
                  </motion.div>

                  <button
                      onClick={nextImg}
                      className="absolute right-2 lg:right-10 p-4 text-white/40 hover:text-white transition-colors z-[110]"
                  >
                    <ChevronRight size={36} />
                  </button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
  )
}
