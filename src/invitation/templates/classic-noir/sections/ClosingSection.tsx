import { useState, useEffect } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function ClosingSection({ data }: { data: Invitation }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const bgImages = data.images || [] // Ambil dari data.images

  // Ganti background setiap 5 detik
  useEffect(() => {
    if (bgImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentBgIndex((prev) => (prev + 1) % bgImages.length)
      }, 5000) // Ganti setiap 5 detik
      return () => clearInterval(interval)
    }
  }, [bgImages.length])

  // Varian animasi untuk teks (seperti yang sudah kita pakai)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: custom, ease: easeOut },
    }),
  }

  return (
    <section className="h-screen snap-start bg-black text-white relative overflow-hidden flex flex-col items-center justify-center px-8">
      {/* BACKGROUND IMAGE CAROUSEL */}
      <AnimatePresence>
        {bgImages.length > 0 && (
          <motion.img
            key={bgImages[currentBgIndex]} // Key unik untuk transisi AnimatePresence
            src={bgImages[currentBgIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }} // Opacity rendah dan sedikit zoom out
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeInOut" }} // Durasi fade
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
          />
        )}
      </AnimatePresence>
      {/* Overlay untuk mempergelap background */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Religious Quote / Wisdom */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-16">
          <motion.p
            custom={0} // custom=0 untuk delay 0
            variants={fadeInUp}
            className="font-serif text-sm md:text-base leading-relaxed italic text-white/70"
          >
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
          </motion.p>
          <motion.div custom={0.4} variants={fadeInUp} className="mt-4 text-[10px] tracking-[0.4em] uppercase text-white/30">
            — Ar-Rum 21
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} className="space-y-6">
          <motion.p custom={0.8} variants={fadeInUp} className="text-[10px] tracking-[0.3em] uppercase text-white/50 leading-loose">
            It is a profound honor for us <br />
            to have you witness the beginning of <br />
            our lifelong journey together. <br />
            Thank you for being part of our story.
          </motion.p>

          <motion.div custom={1.2} variants={fadeInUp} className="py-12">
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/20 block mb-6">Sincerely,</span>
            <h2 className="font-serif text-4xl md:text-5xl italic tracking-tighter">
              {data.brideName.split(" ")[0]} <span className="text-xl md:text-2xl not-italic mx-2 opacity-30">&</span> {data.groomName.split(" ")[0]}
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Branding / Copyright */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} className="absolute bottom-10 left-0 w-full flex flex-col items-center space-y-4">
        <motion.div custom={1.6} variants={fadeInUp} className="w-8 h-[1px] bg-white/10" />
        <motion.p custom={1.8} variants={fadeInUp} className="text-[8px] tracking-[0.5em] uppercase text-white/20">
          Created with love by Invify • 2027
        </motion.p>
      </motion.div>

      {/* Side Decorative Text (tetap, tanpa animasi agar tidak terlalu ramai) */}
      <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 opacity-[0.03] pointer-events-none">
        <h2 className="text-8xl font-serif uppercase tracking-[0.5em] whitespace-nowrap">The End of Beginning</h2>
      </div>
    </section>
  )
}
