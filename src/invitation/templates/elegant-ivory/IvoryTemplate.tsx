import { useState } from "react"
import type { Invitation } from "../../../types/Invitation"
import CurtainSection from "./sections/CurtainSection"
import CountdownSection from "./sections/countDown"
import BrideGroomSection from "./sections/brideGroom"
import WeddingEventSection from "./sections/weddingEvent"
import QuoteSection from "./sections/quote"
import LoveStorySection from "./sections/loveStory"
import GallerySection from "./sections/galery"
import WeddingWishesSection from "./sections/weddingWishes"
import WeddingGiftsSection from "./sections/weddingGifts"
import ThankYouFooterSection from "./sections/thankyou"
import AudioPlayer from "../../../ui/audioPlayer"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"
import { HeroBackground } from "./sections/HeroBackground"
import { HeroContent } from "./sections/HeroContent"

export default function IvoryTemplate() {
  const data: Invitation = DEMO_INVITATIONS["elegant-ivory"]
  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
    setIsAudioPlaying(true)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      {isOpened && (
        <AudioPlayer
          src={data.audioUrl}
          isPlaying={isAudioPlaying}
          onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
          theme={{
            variant: "modern",
            position: "bottom-right",
            bg: "bg-black/20",
            border: "border-white/10",
            iconColor: "text-white",
          }}
        />
      )}

      <CurtainSection data={data} isOpened={isOpened} onOpen={handleOpen} />

      <div className="flex h-screen w-full">
        {/* LEFT SIDE (Desktop Only) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] bg-cover bg-center" style={{ backgroundImage: `url('${data.coverImage}')` }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 m-auto text-center px-12">
            <h2 className="mb-6 inline-block px-6 py-2 border-y border-white/20 text-white tracking-[0.5em] uppercase text-[10px] font-lora">The Wedding Of</h2>
            <h1 className="font-bodoni italic text-8xl text-white mb-6">
              {data.brideName} <span className="font-playfair not-italic text-4xl text-[#D4A853]">&</span> {data.groomName}
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE CONTENT */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-130 h-screen bg-[#0A0A0A] shadow-2xl relative ">
          {/* 1. FIXED BACKGROUND LAYER */}
          {/* Menggunakan absolute di dalam parent yang relative h-screen membuatnya "terkunci" di sana */}
          {isOpened && (
            <div className="absolute inset-0 z-0">
              <HeroBackground data={data} />
            </div>
          )}

          {/* 2. SCROLLABLE CONTENT LAYER */}
          <div className="relative z-10 h-full overflow-y-auto scroll-smooth no-scrollbar overflow-x-hidden">
            {isOpened && (
              <div className="flex flex-col w-full">
                {/* HERO CONTENT: Nama pengantin yang ikut ter-scroll */}
                {/* Menggunakan min-h-screen agar tingginya pas selayar */}
                <section className="relative min-h-screen w-full flex flex-col items-center text-center pt-28 text-white">
                  <HeroContent data={data} />
                </section>

                {/* COUNTDOWN: Transisi mulai menutupi Background Hero */}
                <div className="relative z-20 bg-black/60 backdrop-blur-md">
                  <CountdownSection data={data} />
                </div>

                {/* BRIDE GROOM: Sedikit lebih jernih */}
                <div className="relative z-20 bg-black/40 backdrop-blur-sm">
                  <BrideGroomSection data={data} />
                </div>

                {/* WEDDING EVENT: Jernih Total untuk melihat Foto Hero di belakang */}
                <div className="relative z-20 bg-transparent">
                  <QuoteSection />
                </div>
                <div className="relative z-20 bg-transparent">
                  <WeddingEventSection data={data} />
                </div>

                {/* SECTIONS LAIN: Latar belakang pekat agar konten mudah dibaca */}
                <div className="relative z-20 bg-black/90 backdrop-blur-xl">
                  <LoveStorySection data={data} />
                  <GallerySection data={data} />
                  <WeddingWishesSection data={data} />
                  <WeddingGiftsSection data={data} />
                  <ThankYouFooterSection data={data} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
