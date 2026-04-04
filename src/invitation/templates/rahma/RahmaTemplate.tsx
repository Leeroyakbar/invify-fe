import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"
import CurtainSection from "./sections/CurtainSection" // Pastikan path sesuai
import NavbarSection from "./sections/NavbarSection"

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
  const data = DEMO_INVITATIONS["lili"] // Menggunakan data lili sebagai basis
  const [isOpened, setIsOpened] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Logic untuk mengganti background setiap 5 detik
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
    // Tambahkan logic fullscreen atau audio play di sini jika perlu
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {/* NAVBAR */}
      {isOpened && <NavbarSection containerRef={scrollContainerRef} />}

      {/* COVER / CURTAIN */}
      <CurtainSection data={data} isOpened={isOpened} onOpen={handleOpenInvitation} />

      <div className="flex h-screen w-full">
        {/* LEFT SIDE (Desktop Static) */}
        {/* Pointer-events-none agar scroll tembus ke container di bawahnya jika kursor di sini */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] overflow-hidden pointer-events-none z-20">
          <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/rahma/cover-left.webp')` }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex flex-col justify-end p-20">
              <h2 className="font-cormorant text-white text-7xl leading-tight">
                {data.brideName} <br /> & {data.groomName}
              </h2>
              <p className="text-white/60 tracking-[0.3em] uppercase text-sm mt-4">{data.eventDateFormatted}</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE (Content Area) */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-[520px] h-screen relative shadow-2xl">
          {/* SLIDESHOW BACKGROUND (Tetap di belakang content) */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }} // Opacity rendah agar teks konten tetap terbaca
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
              />
            </AnimatePresence>
            {/* Overlay Gradient agar konten lebih elegan & readable */}
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
          </div>

          {/* SCROLLABLE CONTENT AREA */}
          <div ref={scrollContainerRef} className="relative z-10 h-full overflow-y-auto scroll-smooth custom-scroll">
            {isOpened && (
              <div className="flex flex-col w-full min-h-screen pt-[100vh] lg:pt-0">
                {/* Section pertama (Hero) dibuat h-screen agar user 
                   melihat background foto penuh saat pertama kali buka.
                */}
                <section id="hero" className="h-screen flex items-end p-10 pb-20">
                  <div className="text-white">
                    <span className="uppercase tracking-[0.5em] text-[10px] text-white/50">Welcome to our wedding</span>
                    <h1 className="font-cormorant text-5xl mt-2 italic font-light">The Beginning</h1>
                  </div>
                </section>

                {/* Section-section selanjutnya tinggal dimasukkan di bawah */}
                <div id="couple" className="bg-black/60 backdrop-blur-md">
                  {/* Contoh isi: <BrideSection data={data} /> */}
                  <div className="h-[500px] p-10 text-white border-t border-white/10">
                    <h3 className="font-cormorant text-3xl italic">The Couple</h3>
                    <p className="mt-4 text-white/70 font-light leading-relaxed">Meninggalkan cara lama, beralih ke estetika modern. Kami menciptakan pengalaman digital yang intim untuk setiap tamu Anda.</p>
                  </div>
                </div>

                <div id="story" className="bg-black/60 backdrop-blur-md min-h-screen">
                  {/* <StorySection data={data} /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global CSS for scrollbar */}
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
