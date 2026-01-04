import type { TemplateProps } from "../../../types/TemplateProps"
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

export default function ClassicNoir({ data, isOpened, onOpen }: TemplateProps) {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      <MobileNavbar />

      {/* CURTAIN - Biasanya diletakkan di luar div scroll utama agar tidak ikut ter-scroll */}
      <CurtainCoverSection data={data} isOpened={isOpened} onOpen={onOpen} />

      {/* MAIN SCROLL CONTAINER */}
      <div className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* SEKSI NORMAL (Background ikut bergerak/masing-masing) */}
        <AnnouncementVideoSection data={data} isOpened={isOpened} />
        <QuoteImageSection data={data} />
        <GroomSection data={data} />
        <BrideSection data={data} />

        {/* STICKY VIDEO ZONE (Video diam, konten meluncur) */}
        <section className="relative h-auto snap-none">
          {/* Latar Belakang Video - Sticky */}
          <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/classic-noir/video-1.mp4" />
            {/* Overlay agar teks di atasnya terbaca */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Konten yang meluncur di atas video */}
          <div className="relative z-10 -mt-[100vh]">
            {/* Paksa setiap section di sini memiliki h-screen dan snap-start */}
            <div className="snap-start h-screen">
              <EventSection data={data} />
            </div>
            <div className="snap-start h-screen">
              <LoveStorySection data={data} />
            </div>
            <div className="snap-start h-screen">
              <CountdownSection data={data} />
            </div>
            <div className="snap-start h-screen">
              <RSVPSection />
            </div>
          </div>
        </section>

        {/* Footer atau section penutup jika ada */}
      </div>
    </div>
  )
}
