import { useRef, useState } from "react"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"
import CurtainSection from "./sections/CurtainSection"
import AudioPlayer from "../../../ui/audioPlayer"
import { Maximize } from "lucide-react"
import { motion } from "framer-motion"
import HeroSection from "./sections/HeroSection"
import BrideSection from "./sections/BrideSection"
import GroomSection from "./sections/GroomSection"
import StorySection from "./sections/StorySection"
import CountdownSection from "./sections/CountdownSection"
import EventSection from "./sections/EventSection"
import LiveStreamSection from "./sections/LiveStreamingSection"
import GallerySection from "./sections/GallerySection"
import RSVPSection from "./sections/RSVPSection"
import WishesSection from "./sections/WishesSection"
import GiftSection from "./sections/GiftSection"
import ClosingSection from "./sections/ClosingSection"
import MobileNavbar from "./sections/MobileNavbar"

export default function LiliTemplate() {
  const data = DEMO_INVITATIONS["lili"]
  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const coverLeft = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/cover-left.webp';
  const videoBackground = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/video-1.webm';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false)
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {/* NAVBAR HANYA MUNCUL JIKA SUDAH DIBUKA */}
      {isOpened && <MobileNavbar containerRef={scrollContainerRef} hide={isAnyModalOpen} />}
      {/* 1. FLOATING CONTROLS */}
      <div className="fixed bottom-6 right-6 z-100 flex flex-col items-center gap-4">
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

      <CurtainSection data={data} isOpened={isOpened} onOpen={handleOpenInvitation} />

      <div className="flex h-screen w-full">
        {/* LEFT SIDE (Desktop Static) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${coverLeft}')` }}>
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-20">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mb-8">
                <span className="text-white/50 tracking-[0.8em] uppercase text-[9px] font-inter block mb-2">The Wedding Of</span>
                <div className="h-px w-12 bg-white/30" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
                <h1 className="font-cormorant-upright text-[100px] xl:text-[120px] text-white leading-[0.85] tracking-tighter">
                  {data.brideName}
                  <span className="block font-alice text-4xl text-white/20 my-4 italic">and</span>
                  {data.groomName}
                </h1>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-12 flex items-baseline gap-4">
                <p className="font-inter text-[12px] tracking-[0.5em] uppercase text-white">{data.eventDateFormatted.replace(/ • /g, " / ")}</p>
                <span className="text-white/20 text-[10px]">—</span>
                <p className="font-lora italic text-[12px] text-white/40 tracking-widest">The Grand Celebration</p>
              </motion.div>
            </div>
          </div>
          <div className="absolute left-8 bottom-20 w-px h-32 bg-linear-to-t from-white/40 to-transparent" />
        </div>

        {/* RIGHT SIDE: Content Area */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-130 h-screen bg-[#0A0A0A] shadow-2xl relative overflow-hidden">
          {/* VIDEO BACKGROUND (Z-Index 0) */}
          {isOpened && (
            <div className="absolute inset-0 z-0">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" src={videoBackground} />
              <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/80" />
            </div>
          )}

          {/* SCROLLABLE LAYERS (Z-Index 10) */}
          <div
            ref={scrollContainerRef}
            className="relative z-10 h-full overflow-y-auto scroll-smooth overflow-x-hidden bg-transparent custom-scroll"
            style={{
              scrollbarGutter: "stable", // Mencegah layout bergeser saat scrollbar muncul
            }}
          >
            {isOpened && (
              <div className="flex flex-col w-full">
                {/* Gunakan bg-[#0A0A0A] pada section yang ingin menutup video sepenuhnya */}
                <div id="hero">
                  <HeroSection data={data} />
                </div>
                <div id="couple">
                  <BrideSection data={data} />
                  <GroomSection data={data} />
                </div>
                <div id="story">
                  <StorySection data={data} />
                </div>
                <CountdownSection data={data} />
                <div id="event">
                  <EventSection data={data} />
                </div>
                <LiveStreamSection data={data} />

                <div id="gallery">
                  <GallerySection data={data} onStateChange={(isOpen) => setIsAnyModalOpen(isOpen)} />
                </div>
                <RSVPSection />

                <div id="wishes">
                  <WishesSection />
                </div>
                <GiftSection data={data} />
                <ClosingSection data={data} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Style untuk mengatasi scrollbar transparan */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
          background-color: #0A0A0A; /* Latar belakang scrollbar dibuat gelap solid */
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        /* Menghilangkan panah scrollbar di beberapa browser */
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) #0A0A0A;
        }
      `,
        }}
      />
    </div>
  )
}
