import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { type Invitation } from "../../../../types/Invitation"

export default function CoupleSection({ data }: { data: Invitation }) {
  const [bridePhotoIndex, setBridePhotoIndex] = useState(0)
  const [groomPhotoIndex, setGroomPhotoIndex] = useState(0)
  const containerRef = useRef(null)

  // 1. Parallax Effect Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  const bridePhotos = ["/rahma/bride.webp", "/rahma/bride-2.webp"]
  const groomPhotos = ["/rahma/groom.webp", "/rahma/groom-2.webp"]

  useEffect(() => {
    const timer = setInterval(() => {
      setBridePhotoIndex((prev) => (prev + 1) % bridePhotos.length)
      setGroomPhotoIndex((prev) => (prev + 1) % groomPhotos.length)
    }, 5000) // Sedikit lebih lambat agar tidak distraksi
    return () => clearInterval(timer)
  }, [bridePhotos.length, groomPhotos.length])

  return (
    <section ref={containerRef} id="couple" className="relative border-t border-white/10 overflow-hidden bg-transparent">
      {/* 1. QUOTE SECTION */}
      <div className="px-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2 }}>
          <span className="font-montserrat text-[10px] uppercase tracking-[0.6em] text-white/40 block mb-6">Ar-Rum / 21</span>
          <p className="font-reenie-beanie text-2xl md:text-3xl text-white/90 leading-relaxed max-w-sm mx-auto tracking-wide">
            "And among His Signs is this, that He created for you mates from among yourselves so that you may find comfort in them."
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-8" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-32 pb-32">
        {/* THE BRIDE */}
        <div className="px-12 relative">
          {/* Decorative Vertical Text */}
          <div className="absolute left-4 top-20 -rotate-90 origin-left hidden md:block">
            <span className="font-montserrat text-[8px] uppercase tracking-[1em] text-white/10 whitespace-nowrap">THE BRIDE PROFILE</span>
          </div>

          <div className="space-y-10 relative">
            <span className="absolute -top-6 right-0 font-reenie-beanie text-4xl text-white/40 -rotate-12 z-20">The Bride</span>

            {/* Photo Container with Floating Frame Effect */}
            <div className="relative group max-w-[320px] mx-auto">
              {/* Bingkai Dekoratif di belakang foto */}
              <div className="absolute -inset-4 border border-white/5 rounded-tl-[130px] rounded-br-[30px] -z-10 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-700" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-tl-[120px] rounded-br-[20px] border border-white/10 shadow-2xl"
              >
                <AnimatePresence initial={false}>
                  <motion.div key={bridePhotos[bridePhotoIndex]} style={{ y: yParallax }} className="absolute inset-0 w-full h-full">
                    <motion.img
                      src={bridePhotos[bridePhotoIndex]}
                      initial={{ x: "100%", scale: 1.2 }}
                      animate={{ x: 0, scale: 1 }}
                      exit={{ x: "-100%", scale: 1.2 }}
                      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 text-center">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-white/30 block">Beautiful Soul</span>
              <h2 className="font-cinzel text-3xl text-white tracking-[0.2em] uppercase leading-snug">{data.brideFullName}</h2>
              <p className="font-montserrat text-[11px] text-white/50 leading-relaxed tracking-[0.1em]">
                Putri dari <br />
                <span className="text-white/80 italic">
                  Bapak {data.brideFather} & Ibu {data.brideMother}
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* THE GROOM */}
        <div className="px-12 relative">
          <div className="space-y-10 relative flex flex-col items-center">
            <span className="absolute -top-6 left-0 font-reenie-beanie text-4xl text-white/40 rotate-12 z-20">The Groom</span>

            {/* Photo Container with Floating Frame Effect */}
            <div className="relative group max-w-[320px] w-full">
              {/* Bingkai Dekoratif di belakang foto */}
              <div className="absolute -inset-4 border border-white/5 rounded-tr-[130px] rounded-bl-[30px] -z-10 -translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 duration-700" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-tr-[120px] rounded-bl-[20px] border border-white/10 shadow-2xl"
              >
                <AnimatePresence initial={false}>
                  <motion.div key={groomPhotos[groomPhotoIndex]} style={{ y: yParallax }} className="absolute inset-0 w-full h-full">
                    <motion.img
                      src={groomPhotos[groomPhotoIndex]}
                      initial={{ x: "-100%", scale: 1.2 }}
                      animate={{ x: 0, scale: 1 }}
                      exit={{ x: "100%", scale: 1.2 }}
                      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 text-center">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-white/30 block">Gentle Heart</span>
              <h2 className="font-cinzel text-3xl text-white tracking-[0.2em] uppercase leading-snug">{data.groomFullName}</h2>
              <p className="font-montserrat text-[11px] text-white/50 leading-relaxed tracking-[0.1em]">
                Putra dari <br />
                <span className="text-white/80 italic">
                  Bapak {data.groomFather} & Ibu {data.groomMother}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
