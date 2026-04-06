import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"
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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Tetap mempertahankan paralaks dan rotasi halus karena ini yang membuat desain terasa "mahal"
  const yParallax = useTransform(smoothProgress, [0, 1], ["-10%", "10%"])
  const rotateBride = useTransform(smoothProgress, [0, 1], [-3, 3])
  const rotateGroom = useTransform(smoothProgress, [0, 1], [3, -3])

  const bridePhotos = useMemo(() => ["/rahma/bride.webp", "/rahma/bride-2.webp"], [])
  const groomPhotos = useMemo(() => ["/rahma/groom.webp", "/rahma/groom-2.webp"], [])

  useEffect(() => {
    const timer = setInterval(() => {
      setBridePhotoIndex((prev) => (prev + 1) % bridePhotos.length)
      setGroomPhotoIndex((prev) => (prev + 1) % groomPhotos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bridePhotos.length, groomPhotos.length])

  return (
    <section ref={containerRef} id="couple" className="relative border-t border-white/10 overflow-hidden bg-transparent pb-40">
      {/* QUOTE SECTION */}
      <div className="px-10 py-32 text-center relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.03 }} viewport={{ once: true }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-cinzel text-[100px] md:text-[120px] font-bold tracking-widest">SOUL</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative z-10 space-y-8">
          <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block mb-8">The Sacred Sign</span>
          <p className="font-reenie-beanie text-3xl md:text-4xl text-white/80 leading-relaxed max-w-sm mx-auto">"And among His Signs is this, that He created for you mates from among yourselves so that you may find comfort in them."</p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[0.5px] w-8 bg-white/10" />
            <span className="font-montserrat text-[10px] text-white/40 tracking-[0.4em] uppercase">Ar-Rum / 21</span>
            <div className="h-[0.5px] w-8 bg-white/10" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-40 md:gap-52">
        {/* BRIDE */}
        <div className="px-6 md:px-16 flex flex-col items-start w-full relative">
          <div className="relative w-full max-w-[280px] md:max-w-[320px]">
            <span className="absolute -top-12 -right-8 font-cinzel text-[100px] md:text-[140px] text-white/5 font-bold leading-none">{data.brideName.charAt(0)}</span>

            <motion.div style={{ rotate: rotateBride, willChange: "transform" }} className="relative z-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[100px] md:rounded-tl-[130px] rounded-br-[30px] border border-white/10 shadow-2xl bg-neutral-900">
                {/* popLayout memungkinkan foto baru menimpa foto lama tanpa jeda */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={bridePhotos[bridePhotoIndex]}
                    style={{ y: yParallax, willChange: "transform" }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img src={bridePhotos[bridePhotoIndex]} className="w-full h-full object-cover" alt="Bride" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="absolute -bottom-6 -right-4 font-reenie-beanie text-4xl md:text-5xl text-white/60 -rotate-12 italic">The Bride</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-12 space-y-4 pl-4 border-l border-white/10">
              <h2 className="font-cinzel text-2xl md:text-3xl text-white tracking-widest uppercase leading-tight">{data.brideFullName}</h2>
              <p className="font-montserrat text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase">
                Putri dari Bapak {data.brideFather} & Ibu {data.brideMother}
              </p>
              <a href={`https://instagram.com/${data.brideInstagram}`} target="_blank" className="flex items-center gap-2 text-white/30 hover:text-white/80 transition-colors w-fit">
                <Instagram size={12} />
                <span className="font-montserrat text-[9px] tracking-widest uppercase">@{data.brideInstagram}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* GROOM */}
        <div className="px-6 md:px-16 flex flex-col items-end w-full relative">
          <div className="relative w-full max-w-[280px] md:max-w-[320px]">
            <span className="absolute -top-12 -left-8 font-cinzel text-[100px] md:text-[140px] text-white/5 font-bold leading-none">{data.groomName.charAt(0)}</span>

            <motion.div style={{ rotate: rotateGroom, willChange: "transform" }} className="relative z-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-tr-[100px] md:rounded-tr-[130px] rounded-bl-[30px] border border-white/10 shadow-2xl bg-neutral-900">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={groomPhotos[groomPhotoIndex]}
                    style={{ y: yParallax, willChange: "transform" }}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img src={groomPhotos[groomPhotoIndex]} className="w-full h-full object-cover" alt="Groom" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="absolute -bottom-6 -left-4 font-reenie-beanie text-4xl md:text-5xl text-white/60 rotate-12 italic">The Groom</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-12 space-y-4 pr-4 border-r border-white/10 text-right flex flex-col items-end">
              <h2 className="font-cinzel text-2xl md:text-3xl text-white tracking-widest uppercase leading-tight">{data.groomFullName}</h2>
              <p className="font-montserrat text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase">
                Putra dari Bapak {data.groomFather} & Ibu {data.groomMother}
              </p>
              <a href={`https://instagram.com/${data.groomInstagram}`} target="_blank" className="flex items-center gap-2 text-white/30 hover:text-white/80 transition-colors w-fit">
                <span className="font-montserrat text-[9px] tracking-widest uppercase">@{data.groomInstagram}</span>
                <Instagram size={12} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
