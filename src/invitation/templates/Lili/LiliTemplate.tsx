import { useState } from "react"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"
import CurtainSection from "./sections/CurtainSection"
import AudioPlayer from "../../../ui/audioPlayer"
import { Maximize } from "lucide-react"
import { motion } from "framer-motion"
export default function LiliTemplate() {
  // Menggunakan data demo classic-noir
  const data = DEMO_INVITATIONS["classic-noir"]
  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleOpenInvitation = () => {
    setIsOpened(true)
    setIsAudioPlaying(true)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {/* 1. FLOATING CONTROLS (Hanya muncul setelah dibuka) */}
      {isOpened && (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
          <button onClick={toggleFullScreen} className="flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 w-12 h-12 rounded-full shadow-2xl active:scale-90 transition-all hover:bg-white/10">
            <Maximize size={18} className="text-white" />
          </button>

          <AudioPlayer
            src={data.audioUrl}
            isPlaying={isAudioPlaying}
            onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
            theme={{
              variant: "modern",
              position: "relative",
              bg: "bg-black/20",
              border: "border-white/10",
              iconColor: "text-white",
            }}
          />
        </div>
      )}

      {/* 2. CURTAIN SECTION (Full Screen, Animasi naik ke atas) */}
      <CurtainSection data={data} isOpened={isOpened} onOpen={handleOpenInvitation} />

      {/* 3. MAIN LAYOUT (Split Screen) */}
      <div className="flex h-screen w-full">
        {/* LEFT SIDE: Desktop Static Panel */}
        {/* LEFT SIDE: Desktop Static Panel (Classic Noir Edition) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/lili/cover-left.jpg')` }}>
          {/* Overlay Gradient Noir: Sangat halus untuk menjaga kejernihan foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

          {/* Noise Texture Overlay: Memberikan kesan grain foto analog klasik */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Content Panel Kiri - Bottom Left Aligned */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-20">
            <div className="max-w-2xl">
              {/* Label Minimalis */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mb-8">
                <span className="text-white/50 tracking-[0.8em] uppercase text-[9px] font-inter block mb-2">The Wedding Of</span>
                <div className="h-[1px] w-12 bg-white/30" />
              </motion.div>

              {/* Typography: Super Clean & Bold */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
                <h1 className="font-cormorant-upright text-[100px] xl:text-[120px] text-white leading-[0.85] tracking-tighter">
                  {data.brideName}
                  <span className="block font-alice text-4xl text-white/20 my-4 italic">and</span>
                  {data.groomName}
                </h1>
              </motion.div>

              {/* Footer Info: Tanggal & Lokasi (Opsional) */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-12 flex items-baseline gap-4">
                <p className="font-inter text-[12px] tracking-[0.5em] uppercase text-white">{data.eventDateFormatted.replace(/ • /g, " / ")}</p>
                <span className="text-white/20 text-[10px]">—</span>
                <p className="font-lora italic text-[12px] text-white/40 tracking-widest">The Grand Celebration</p>
              </motion.div>
            </div>
          </div>

          {/* Decorative Vertical Line */}
          <div className="absolute left-8 bottom-20 w-[1px] h-32 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* RIGHT SIDE: Content Area with Video Background */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-130 h-screen bg-black shadow-2xl relative">
          {/* VIDEO BACKGROUND (Statis di belakang konten kanan) */}
          {isOpened && (
            <div className="absolute inset-0 z-0">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" src="/classic-noir/video-1.mp4" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>
          )}

          {/* SCROLLABLE LAYERS */}
          <div className="relative z-10 h-full overflow-y-auto scroll-smooth no-scrollbar overflow-x-hidden">
            {isOpened && (
              <div className="flex flex-col w-full">
                {/* HERO CONTENT: Transparan agar video terlihat */}
                <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center text-white bg-transparent px-10">
                  <span className="font-lora italic text-sm text-white/60 tracking-[0.3em] uppercase mb-6">Hello, We Are Getting Married</span>
                  <h1 className="font-cormorant-upright text-7xl md:text-8xl leading-none mb-10">
                    {data.brideName} <br /> & {data.groomName}
                  </h1>
                  <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
                  <p className="font-lora text-[10px] tracking-[0.5em] uppercase text-white/40 mt-8">Scroll Down</p>
                </section>

                {/* NEXT SECTIONS: Mulai menutupi video dengan overlay pekat */}
                <div className="relative z-20 bg-black/80 backdrop-blur-xl border-t border-white/10">
                  <div className="py-20 px-8 text-center text-white">
                    <p className="font-alice text-2xl italic mb-6">"{data.storyMeet}"</p>
                    <div className="h-px w-20 bg-white/20 mx-auto" />
                  </div>

                  {/* Di sini Anda tinggal memanggil section lainnya */}
                  <div className="min-h-screen p-10 flex flex-col items-center justify-center border-t border-white/5 bg-black/40">
                    <p className="text-white/20 font-lora uppercase tracking-[0.8em] text-[10px]">Upcoming Content</p>
                  </div>
                </div>

                {/* Footer / Thank You Section (Solid Black) */}
                <div className="relative z-20 bg-black py-20 border-t border-white/10 text-center text-white/30 text-[10px] tracking-widest uppercase">Created with love &bull; Invify</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
