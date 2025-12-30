import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"
import { Heart } from "lucide-react"

interface Props {
  data: Invitation
}

const backgroundImages = [
  "/modern/couple/love-story.jpg", // Ganti dengan path gambar Anda
  "/modern/couple/couple-bg-2.jpeg",
  "/modern/galery/galery-6.JPG",
  // Tambahkan lebih banyak gambar jika Anda punya
]

const transitionDuration = 8000 // Ganti gambar setiap 8 detik (8000 ms)

export default function ThankYouFooterSection({ data }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, transitionDuration)

    return () => clearInterval(interval) // Cleanup interval saat komponen di-unmount
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#2F3E46]">
      {/* Dynamic Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex} // Kunci unik untuk setiap gambar agar AnimatePresence mendeteksi perubahan
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Durasi fade in/out (1.5 detik)
          className="absolute inset-0 h-[80%] bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
          }}
        />
      </AnimatePresence>

      {/* GRADIENT OVERLAY (tetap agar konten terbaca) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#2F3E46]/80 to-[#2F3E46]" />

      {/* THANK YOU CONTENT */}
      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center text-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Heart size={32} className="mx-auto mb-6 text-white/50" />
          <h2 className="font-playfair text-4xl md:text-5xl">Terima Kasih</h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} viewport={{ once: true }} className="mt-6 max-w-md font-inter text-sm leading-relaxed text-white/80">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu pada hari bahagia kami.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} viewport={{ once: true }} className="mt-12">
          <p className="font-playfair text-2xl italic">
            {data.brideName} <span className="text-xl not-italic">&</span> {data.groomName}
          </p>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 pb-12 pt-20 text-center text-white">
        <div className="mx-auto max-w-md space-y-4">
          <div className="h-px w-12 bg-white/20 mx-auto" />
          <div className="text-[11px] uppercase tracking-[0.2em] font-inter text-white/50">© {new Date().getFullYear()} — Undangan Pernikahan Digital</div>

          <p className="flex items-center justify-center gap-1.5 font-inter text-xs text-white/60">
            Dibuat dengan <Heart size={12} className="fill-red-400 text-red-400" /> oleh
            <span className="font-semibold text-white tracking-wider">INVIFY</span>
          </p>
        </div>
      </footer>
    </section>
  )
}
