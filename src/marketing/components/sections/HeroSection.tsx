import { motion } from "framer-motion"
import { ArrowRight, Globe } from "lucide-react"

export default function HeroSection() {
  const kirimKeWhatsApp = () => {
    const nomorWA = "6282273366718"
    const teks = `Halo Invify, saya ingin memesan undangan digital untuk acara pernikahan saya.`
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`
    window.open(url, "_blank")
  }

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center pt-20 px-6 lg:px-12" id="beranda">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
        {/* LEFT CONTENT (6 Columns) */}
        <div className="lg:col-span-7 space-y-10 lg:pr-20 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-4">
            <div className="flex items-center gap-4 text-white/30">
              <Globe size={14} className="animate-spin-slow" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold">A New Era of Invitation</span>
            </div>

            <h1 className="font-cormorant-upright text-[15vw] lg:text-[10vw] text-white leading-[0.8] tracking-tighter uppercase relative">
              Pure <br />
              <span className="italic opacity-40 ml-[10%]">Emotion</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <p className="font-inter text-white/40 text-xs lg:text-sm leading-relaxed tracking-wide">Meninggalkan cara lama, beralih ke estetika modern. Kami menciptakan pengalaman digital yang intim dan mendalam untuk setiap tamu Anda.</p>

            <div className="flex flex-col gap-4 mb-8 md:mb-0">
              <button onClick={kirimKeWhatsApp} className="group flex items-center justify-between bg-white text-black px-8 py-5 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-white/90">
                Start Journey <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <a href="#template" className="text-white/20 text-[10px] uppercase tracking-[0.4em] text-center lg:text-left hover:text-white transition-colors">
                Explore All Series — 2026
              </a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT: FLOATING MOCKUP (5 Columns) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} className="relative w-full max-w-[340px] aspect-[9/18]">
            {/* FRAMELESS MOCKUP */}
            {/* FRAMELESS MOCKUP */}
            <div className="absolute inset-0 bg-[#161616] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10">
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-all duration-700"
                  src="https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/sign/invify-bucket/video-1.webm?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iN2QyMDIwYi0wYmI3LTQzODgtYWU3Yy05MWQ4MGRkMGEyYTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbnZpZnktYnVja2V0L3ZpZGVvLTEud2VibSIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODM3MzIyNTMsImV4cCI6MTgxNTI2ODI1M30.O7i4RC1AbUYRyxi8cHIzbKOXQabOE2GYy1Ppa3SkIUI"
              />

              {/* Floating Element over Video */}
              <div className="absolute top-12 left-0 w-full px-8">
                <div className="h-[1px] w-full bg-white/20 mb-4" />
                <p className="font-cormorant-upright text-white text-2xl tracking-[0.2em] uppercase">Private Event</p>
              </div>
            </div>


            {/* FLOATING CARD DECORATION */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-12 hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl max-w-[180px]"
            >
              <p className="font-inter text-[8px] uppercase tracking-[0.3em] text-white/40 mb-2">Selected Theme</p>
              <p className="font-alice text-white text-lg tracking-wider">Noir Classic</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER INFO LINE */}
      <div className="absolute bottom-0 mb-4 md:mb-0 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end pointer-events-none">
        <div className="space-y-2 hidden lg:block">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.5em]">Crafted in Mandailing</p>
          <div className="h-px w-24 bg-white/20" />
        </div>
        <p className="text-white/20 text-[9px] uppercase tracking-[0.5em]">Available for Global Booking</p>
      </div>
    </section>
  )
}
