import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { Heart } from "lucide-react"

interface Props {
  data: Invitation
}

const transitionDuration = 6000 // Ganti gambar setiap 6 detik

export default function ThankYouFooterSection({ data }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mengambil gambar dari data galeri atau fallback ke array default
  const backgroundImages = data.images?.slice(0, 3) || ["/modern/couple/love-story.jpg", "/modern/couple/couple-bg-2.jpeg", "/modern/galery/galery-6.JPG"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, transitionDuration)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] flex flex-col justify-between">
      {/* 1. DYNAMIC BACKGROUND WITH KEN BURNS EFFECT */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }} // Mulai sedikit lebih besar
            animate={{ opacity: 0.4, scale: 1 }} // Zoom out perlahan
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[currentImageIndex]}')` }}
          />
        </AnimatePresence>

        {/* Overlay Gradasi agar menyatu dengan tema Ivory Dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* 2. THANK YOU CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="space-y-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-8 bg-[#D4A853]/40" />
            <Heart size={20} className="text-[#D4A853]/60 fill-[#D4A853]/20" />
            <div className="h-[1px] w-8 bg-[#D4A853]/40" />
          </div>

          <h2 className="font-bodoni italic text-5xl md:text-7xl text-white tracking-wide">Terima Kasih</h2>

          <p className="max-w-md mx-auto font-lora text-[13px] md:text-sm leading-relaxed text-white/70 italic px-4">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu pada hari bahagia kami."
          </p>

          <div className="pt-8">
            <p className="font-bodoni text-3xl text-[#D4A853]">
              {data.brideName} <span className="font-lora text-xl text-white/40">&</span> {data.groomName}
            </p>
          </div>
        </motion.div>
      </div>
      {/* 3. BUSINESS FOOTER (INVIFY) */}
      <footer className="relative z-10 pb-12 pt-20">
        <div className="flex flex-col items-center gap-6">
          {/* Divider Emas Tipis */}
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />

          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] font-lora text-white/30">Official Digital Invitation</p>

            <div className="flex flex-col items-center group cursor-pointer">
              <p className="font-lora text-[11px] text-white/50 flex items-center gap-1.5 transition-colors group-hover:text-white">Created with love by</p>
              <span className="font-bodoni text-xl tracking-[0.3em] text-white mt-1 group-hover:text-[#D4A853] transition-all duration-500">
                INVIFY<span className="text-[#D4A853]">.</span>
              </span>
            </div>

            <p className="text-[9px] text-white/20 tracking-widest font-lora">© {new Date().getFullYear()} — ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
