import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { type Invitation } from "../../../../types/Invitation"
import { Instagram } from "lucide-react"

export default function CoupleSection({ data }: { data: Invitation }) {
  const [bridePhotoIndex, setBridePhotoIndex] = useState(0)
  const [groomPhotoIndex, setGroomPhotoIndex] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Efek Paralaks dan Rotasi Berlawanan untuk dinamika layout
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const rotateBride = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const rotateGroom = useTransform(scrollYProgress, [0, 1], [5, -5])

  const bridePhotos = ["/rahma/bride.webp", "/rahma/bride-2.webp"]
  const groomPhotos = ["/rahma/groom.webp", "/rahma/groom-2.webp"]

  useEffect(() => {
    const timer = setInterval(() => {
      setBridePhotoIndex((prev) => (prev + 1) % bridePhotos.length)
      setGroomPhotoIndex((prev) => (prev + 1) % groomPhotos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bridePhotos.length, groomPhotos.length])

  return (
    <section ref={containerRef} id="couple" className="relative border-t border-white/10 overflow-hidden bg-transparent pb-40">
      {/* 1. QUOTE SECTION */}
      <div className="px-10 py-32 text-center relative">
        {/* Watermark halus di background */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.03 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-cinzel text-[120px] font-bold tracking-widest">SOUL</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="relative z-10 space-y-8">
          <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block mb-8">The Sacred Sign</span>

          <p className="font-reenie-beanie text-3xl md:text-4xl text-white/80 leading-relaxed max-w-sm mx-auto">"And among His Signs is this, that He created for you mates from among yourselves so that you may find comfort in them."</p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[0.5px] w-8 bg-white/10" />
            <span className="font-montserrat text-[10px] text-white/40 tracking-[0.4em] uppercase">Ar-Rum / 21</span>
            <div className="h-[0.5px] w-8 bg-white/10" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-52">
        {/* THE BRIDE - Aligned Left-ish */}
        <div className="px-8 md:px-16 flex flex-col items-start w-full relative">
          <div className="relative w-full max-w-[320px]">
            {/* Inisial Nama sebagai Watermark */}
            <span className="absolute -top-16 -right-10 font-cinzel text-[140px] text-white/5 font-bold select-none leading-none">{data.brideName.charAt(0)}</span>

            <motion.div style={{ rotate: rotateBride }} className="relative z-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[130px] rounded-br-[30px] border border-white/10 shadow-2xl bg-black">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div key={bridePhotos[bridePhotoIndex]} style={{ y: yParallax }} className="absolute inset-0 w-full h-full">
                    <motion.img
                      src={bridePhotos[bridePhotoIndex]}
                      initial={{ x: "100%", filter: "blur(10px)" }}
                      animate={{ x: 0, filter: "blur(0px)" }}
                      exit={{ x: "-100%", filter: "blur(10px)" }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="absolute -bottom-6 -right-4 font-reenie-beanie text-5xl text-white/60 -rotate-12">The Bride</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="mt-14 space-y-5 pl-4 border-l border-white/10">
              <div>
                <h2 className="font-cinzel text-3xl text-white tracking-[0.1em] uppercase leading-tight">{data.brideFullName}</h2>
                <p className="font-montserrat text-[10px] text-white/40 tracking-[0.3em] uppercase mt-2">
                  Putri dari Bapak {data.brideFather} <br /> & Ibu {data.brideMother}
                </p>
              </div>

              <a href={`https://instagram.com/${data.brideInstagram}`} target="_blank" className="flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors duration-300 w-fit">
                <Instagram size={14} strokeWidth={1.5} />
                <span className="font-montserrat text-[9px] uppercase tracking-[0.3em]">@{data.brideInstagram}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* THE GROOM - Aligned Right-ish */}
        <div className="px-8 md:px-16 flex flex-col items-end w-full relative">
          <div className="relative w-full max-w-[320px]">
            {/* Inisial Nama sebagai Watermark */}
            <span className="absolute -top-16 -left-10 font-cinzel text-[140px] text-white/5 font-bold select-none leading-none">{data.groomName.charAt(0)}</span>

            <motion.div style={{ rotate: rotateGroom }} className="relative z-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-tr-[130px] rounded-bl-[30px] border border-white/10 shadow-2xl bg-black">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div key={groomPhotos[groomPhotoIndex]} style={{ y: yParallax }} className="absolute inset-0 w-full h-full">
                    <motion.img
                      src={groomPhotos[groomPhotoIndex]}
                      initial={{ x: "-100%", filter: "blur(10px)" }}
                      animate={{ x: 0, filter: "blur(0px)" }}
                      exit={{ x: "100%", filter: "blur(10px)" }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="absolute -bottom-6 -left-4 font-reenie-beanie text-5xl text-white/60 rotate-12">The Groom</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="mt-14 space-y-5 pr-4 border-r border-white/10 text-right flex flex-col items-end">
              <div>
                <h2 className="font-cinzel text-3xl text-white tracking-[0.1em] uppercase leading-tight">{data.groomFullName}</h2>
                <p className="font-montserrat text-[10px] text-white/40 tracking-[0.3em] uppercase mt-2">
                  Putra dari Bapak {data.groomFather} <br /> & Ibu {data.groomMother}
                </p>
              </div>

              <a href={`https://instagram.com/${data.groomInstagram}`} target="_blank" className="flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors duration-300 w-fit">
                <span className="font-montserrat text-[9px] uppercase tracking-[0.3em]">@{data.groomInstagram}</span>
                <Instagram size={14} strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
