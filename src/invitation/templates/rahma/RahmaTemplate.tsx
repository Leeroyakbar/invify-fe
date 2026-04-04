import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"
import CurtainSection from "./sections/CurtainSection" // Pastikan path sesuai
import NavbarSection from "./sections/NavbarSection"
import HeroSection from "./sections/HeroSection"

// List gambar background untuk sisi kanan yang akan berganti
const backgroundImages = [
  "/rahma/gallery-1.webp",
  "/rahma/gallery-2.webp",
  "/rahma/gallery-3.webp",
  "/rahma/gallery-4.webp",
  "/rahma/gallery-5.webp",
  "/rahma/gallery-6.webp",
  "/rahma/gallery-7.webp",
  "/rahma/gallery-8.webp",
  "/rahma/gallery-9.webp",
  "/rahma/gallery-10.webp",
]

export default function RahmaTemplate() {
  const data = DEMO_INVITATIONS["lili"]
  const [isOpened, setIsOpened] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpened) {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % backgroundImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isOpened])

  const handleOpenInvitation = () => {
    setIsOpened(true)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {/* NAVBAR & CURTAIN */}
      {isOpened && <NavbarSection containerRef={scrollContainerRef} />}
      <CurtainSection data={data} isOpened={isOpened} onOpen={handleOpenInvitation} />

      <div className="flex h-screen w-full">
        {/* LEFT SIDE (Desktop Fixed) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] overflow-hidden pointer-events-none z-20">
          <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: `url('/rahma/cover-left.webp')` }}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />

            <div className="relative h-full flex flex-col justify-end p-20 z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
                <span className="font-montserrat text-white/40 tracking-[0.6em] uppercase text-[10px] block mb-4">The Wedding of</span>
                <h2 className="font-cinzel text-white text-7xl leading-[0.9] tracking-tighter">
                  {data.brideName} <br />
                  <span className="text-3xl opacity-30 my-2 block">&</span>
                  {data.groomName}
                </h2>
                <div className="h-[1px] w-12 bg-white/20 my-8" />
              </motion.div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        </div>

        {/* RIGHT SIDE (Scrollable Content) */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-[520px] h-screen relative shadow-2xl overflow-hidden">
          {/* SLIDESHOW BACKGROUND */}
          <div className="absolute inset-0 z-0 bg-black">
            {" "}
            {/* Background dasar tetap hitam agar tidak bocor */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentBg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }} // Gunakan nilai maksimal 1 (atau 0.5 jika ingin tetap agak moody)
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2, // Durasi lebih lama agar fade terasa sangat halus dan elegan
                  ease: "linear",
                }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
              />
            </AnimatePresence>
            {/* Overlay tetap ada untuk menjaga keterbacaan teks, tapi kita buat lebih subtle */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* SCROLL CONTAINER */}
          <div ref={scrollContainerRef} className="relative z-10 h-full overflow-y-auto scroll-smooth custom-scroll">
            {isOpened && (
              <div className="flex flex-col w-full">
                {/* Hero Section langsung dipanggil tanpa wrapper tambahan yang merusak layout */}
                <HeroSection data={data} />

                {/* Section Couple */}
                <div id="couple" className="relative bg-black/60 backdrop-blur-md border-t border-white/10 p-10 min-h-screen">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-white">
                    <h3 className="font-cormorant text-4xl italic mb-6">The Couple</h3>
                    <p className="text-white/70 font-light leading-relaxed mb-8">On Maintance</p>
                    {/* Di sini nanti tempat <BrideGroomSection /> */}
                  </motion.div>
                </div>

                <div id="story" className="bg-black/60 backdrop-blur-md min-h-screen border-t border-white/10">
                  {/* <StorySection data={data} /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
      `,
        }}
      />
    </div>
  )
}
