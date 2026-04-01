import { useState } from "react"
import type { Invitation } from "../../../types/Invitation"
import CurtainCoverSection from "./sections/CurtainCoverSection"
import AnnouncementVideoSection from "./sections/Announcement"
import QuoteImageSection from "./sections/Quote"
import MobileNavbar from "./components/MobileNavbar"
import GroomSection from "./sections/GroomSection"
import BrideSection from "./sections/BrideSection"
import EventSection from "./sections/EventSection"
import LoveStorySection from "./sections/LovestorySection"
import CountdownSection from "./sections/Countdown"
import RSVPSection from "./sections/RSVPSection"
import GiftSection from "./sections/GiftSection"
import GallerySection from "./sections/GallerySection"
import ClosingSection from "./sections/ClosingSection"
import ScrollProgress from "./components/ScrollProgress"
import AudioPlayer from "../../../ui/audioPlayer"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"

export default function ClassicNoir() {
  // Ambil data spesifik untuk demo template ini
  const data: Invitation = DEMO_INVITATIONS["classic-noir"]

  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
    setIsAudioPlaying(true)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black selection:bg-white selection:text-black">
      {/* AUDIO PLAYER - Custom position & theme for Classic Noir */}
      <AudioPlayer
        src={data.audioUrl}
        isPlaying={isAudioPlaying}
        onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
        theme={{
          variant: "noir",
          position: "bottom-right",
          bg: "bg-white/10",
          border: "border-white/20",
          iconColor: "text-white",
        }}
      />

      {/* CURTAIN / COVER LAYER */}
      <CurtainCoverSection data={data} isOpened={isOpened} onOpen={handleOpen} />

      {/* DESKTOP LAYOUT DIVIDER */}
      <div className="flex h-screen w-full">
        {/* LEFT SIDE: FIXED BRANDING (Desktop Only) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] bg-[url('/classic-noir/photo-1.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 m-auto text-center px-10">
            <h2 className="text-white text-2xl font-serif mb-6 tracking-[0.3em] uppercase opacity-70">The Wedding Of</h2>
            <h1 className="font-script text-8xl text-white mb-6">
              {data.brideName} <span className="text-4xl">&</span> {data.groomName}
            </h1>
            <div className="h-[1px] w-40 bg-white/30 mx-auto mb-6" />
            <p className="font-serif text-xl tracking-[0.5em] text-white/80 uppercase">{data.eventDateFormatted}</p>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE CONTENT (Mobile & Desktop Right) */}
        <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-[520px] h-screen overflow-hidden bg-black shadow-2xl relative">
          <MobileNavbar />
          <ScrollProgress containerId="noir-scroll" />

          {/* MAIN SCROLL CONTAINER */}
          <div id="noir-scroll" className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
            <AnnouncementVideoSection data={data} isOpened={isOpened} />
            <QuoteImageSection data={data} />
            <GroomSection data={data} />
            <BrideSection data={data} />

            {/* STICKY VIDEO ZONE */}
            <section className="relative h-auto snap-none">
              <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/classic-noir/video-1.mp4" />
                <div className="absolute inset-0 bg-black/70" />
              </div>

              <div className="relative z-10 -mt-[100vh]">
                <div className="snap-start h-screen flex items-center">
                  <EventSection data={data} />
                </div>
                <div className="snap-start h-screen flex items-center">
                  <LoveStorySection data={data} />
                </div>
                <div className="snap-start h-screen flex items-center">
                  <CountdownSection data={data} />
                </div>
                <div className="snap-start h-screen flex items-center">
                  <RSVPSection />
                </div>
                <div className="snap-start h-screen flex items-center">
                  <GiftSection data={data} />
                </div>
              </div>
            </section>

            <GallerySection />
            <ClosingSection data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
