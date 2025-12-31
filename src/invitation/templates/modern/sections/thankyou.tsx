import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, fadeSoft } from "../../../../motions/templateMotions"
import type { Invitation } from "../../../../types/Invitation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { useState, useEffect } from "react"

export default function ThankYouSection({ data }: { data: Invitation }) {
  // 1. Daftar gambar background
  const images = ["/modern/galery/galery-6.JPG", "/modern/galery/galery-1.png", "/modern/galery/galery-7.JPG", "/modern/galery/galery-9.png", "/modern/galery/galery-8.png"]

  const [currentIndex, setCurrentIndex] = useState(0)

  // 2. Logic untuk ganti gambar setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // 5000ms = 5 detik

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative min-h-svh overflow-hidden">
      {/* BACKGROUND IMAGE WITH SLIDESHOW EFFECT */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center -translate-y-60 scale-110 "
            style={{
              backgroundImage: `url('${images[currentIndex]}')`,
            }}
          />
        </AnimatePresence>

        {/* Overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-black/50 z-1" />
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-merlot-footer z-2" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-svh flex flex-col items-center justify-end text-center px-6 pb-10">
        {/* NAMES */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="mb-6">
          <p className="font-lora text-sm tracking-widest text-white/80 mb-2">Kami yang Berbahagia</p>
          <h2 className="font-dancing text-4xl md:text-5xl text-white">
            {data.brideName} & {data.groomName}
          </h2>
        </motion.div>

        {/* ... (Divider dan Text tetap sama) ... */}
        <motion.div variants={fadeSoft} initial="hidden" whileInView="visible" className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-white/40" />
          <span className="text-white/60 text-sm">✦</span>
          <span className="h-px w-10 bg-white/40" />
        </motion.div>

        <motion.p variants={fadeSoft} initial="hidden" whileInView="visible" className="max-w-105 text-sm leading-relaxed text-white/85 font-lora mb-10">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa dan restu kepada kami. Atas segala perhatian dan doa yang tulus, kami ucapkan terima kasih.
        </motion.p>

        {/* BRAND / FOOTER */}
        <motion.div variants={fadeSoft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          <img src="/logo-invify-full.png" alt="Brand Logo" className="w-32 mx-auto opacity-90" />
          <div className="flex justify-center gap-6 text-white/80 text-sm">
            <a href="https://www.instagram.com/id.invify/" target="_blank" className="flex items-center gap-2">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="https://wa.me/6282273366718" target="_blank">
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
            </a>
          </div>
          <div className="text-[11px] text-white/60 space-y-1">
            <p className="font-lora text-xs">Designed with love by : Invify.Id</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
