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
  const data: Invitation = DEMO_INVITATIONS["classic-noir"]

  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleOpen = () => {
    setIsOpened(true)
    setIsAudioPlaying(true)
  }

  // OPTIMASI CDN: Mengompresi paksa aset cover kiri desktop langsung dari server Supabase
  const desktopLeftBg = `https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-1.webp?width=1200&quality=85`

  return (
      <div className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a] selection:bg-white selection:text-black subpixel-antialiased">

        {/* PREMIUM THEMED AUDIO PLAYER */}
        <AudioPlayer
            src={data.audioUrl}
            isPlaying={isAudioPlaying}
            onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
            theme={{
              variant: "noir",
              position: "bottom-right",
              bg: "bg-white/5 backdrop-blur-md",
              border: "border-white/10",
              iconColor: "text-white/80",
            }}
        />

        {/* DETACHED SATELLITE CURTAIN/COVER LAYER */}
        <CurtainCoverSection data={data} isOpened={isOpened} onOpen={handleOpen} />

        {/* MAIN LAYOUT GATEWAY CONTAINER */}
        {/* Berubah menjadi flex layout yang diisolasi dengan ketat */}
        <div className="flex h-full w-full relative z-0">

          {/* LEFT SIDE: FIXED BRANDING (Desktop Cinema Frame) */}
          <div
              className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] bg-cover bg-center transition-transform duration-1000"
              style={{ backgroundImage: `url(${desktopLeftBg})` }}
          >
            {/* Aksen Vignette Gelap Sinematik Sisi Kiri Layar */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-[#0a0a0a]" />

            <div className="relative z-10 m-auto text-center px-12 max-w-xl space-y-4">
              <span className="text-[10px] tracking-[0.6em] text-white/40 uppercase font-bold block pl-[0.6em]">The Wedding Of</span>
              <h1 className="font-serif text-5xl text-white/95 uppercase tracking-[0.15em] font-light leading-snug">
                {data.brideName} <span className="font-sans text-xl text-white/20 italic block my-2 lowercase">&</span> {data.groomName}
              </h1>
              <div className="h-[1px] w-12 bg-white/20 mx-auto" />
              <p className="font-sans text-[11px] tracking-[0.4em] text-white/60 uppercase font-medium pt-2 pl-[0.4em]">{data.eventDateFormatted}</p>
            </div>
          </div>

          {/* RIGHT SIDE: INTERACTIVE CORE VIEWPORT (Mobile & Desktop Right Frame) */}
          {/* Menggunakan manipulasi overflow dinamis: scroll terkunci total sebelum tombol ditekan */}
          <div className="ml-0 lg:ml-[calc(100%-520px)] w-full lg:w-130 h-full overflow-hidden bg-[#0a0a0a] shadow-[0_0_80px_rgba(0,0,0,0.9)] relative z-10 border-l border-white/[0.02]">

            <MobileNavbar />
            <ScrollProgress containerId="noir-scroll" />

            {/* MAIN SCROLL CONTAINER - THEATRICAL SMOOTH SCROLL GRID */}
            <div
                id="noir-scroll"
                className={`h-full w-full snap-y snap-mandatory scroll-smooth transform-gpu ${
                    isOpened ? "overflow-y-auto" : "overflow-hidden pointer-events-none"
                }`}
            >
              <AnnouncementVideoSection data={data} isOpened={isOpened} />
              <QuoteImageSection data={data} />
              <GroomSection data={data} />
              <BrideSection data={data} />

              {/* FIXED LAYER STICKY VIDEO ZONE (PERBAIKAN TOTAL STRUKTUR LAYOUT-SHIFT) */}
              <div className="relative w-full h-auto z-10 min-h-[500vh]">

                {/* Lapisan background video yang menempel diam mengunci viewport */}
                <div className="sticky top-0 left-0 right-0 h-screen w-full z-0 overflow-hidden select-none pointer-events-none">
                  <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      /* PERBAIKAN 1: Mengubah grayscale-20 menjadi kelas standar Tailwind 'grayscale' atau hapus jika ingin berwarna */
                      className="w-full h-full object-cover transform-gpu opacity-40"
                      src="https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/video-1.webm"
                  />
                  {/* PERBAIKAN 2: Mengembalikan Lapisan Gradasi Pengunci Kontras Teks agar video tidak menenggelamkan tulisan */}
                </div>

                {/* Lapisan tumpukan konten teks di atas video murni tanpa margin negatif */}
                <div className="absolute inset-x-0 top-0 z-20 flex flex-col w-full h-full">
                  <div className="snap-start h-screen w-full flex items-center justify-center bg-transparent">
                    <EventSection data={data} />
                  </div>
                  <div className="snap-start h-screen w-full flex items-center justify-center bg-transparent">
                    <LoveStorySection data={data} />
                  </div>
                  <div className="snap-start h-screen w-full flex items-center justify-center bg-transparent">
                    <CountdownSection data={data} />
                  </div>
                  <div className="snap-start h-screen w-full flex items-center justify-center bg-transparent">
                    <RSVPSection />
                  </div>
                  <div className="snap-start h-screen w-full flex items-center justify-center bg-transparent">
                    <GiftSection data={data} />
                  </div>
                </div>

              </div>


              <GallerySection />
              <ClosingSection data={data} />
            </div>

          </div>
        </div>
      </div>
  )
}
