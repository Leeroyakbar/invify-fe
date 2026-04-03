import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Announcement from "./sections/announcement"
import Cover from "./sections/cover"
import Countdown from "./sections/countdown"
import Couple from "./sections/couple"
import WeddingEvent from "./sections/event"
import LoveStory from "./sections/loveStory"
import WeddingGifts from "./sections/weddingGifts"
import GallerySection from "./sections/galery"
import RSVPSection from "./sections/rsvp"
import ThankYouSection from "./sections/thankyou"
import { DEMO_INVITATIONS } from "../../engine/demoInvitationMap"

const ModernTemplate = () => {
  const data = DEMO_INVITATIONS["lili"]
  const [isOpened, setIsOpened] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setIsOpened(true)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A] font-inter">
      {/* 1. CURTAIN LAYER (Lapisan Teratas) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="curtain"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // Tirai mengangkat ke atas
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[100] h-screen w-screen"
          >
            <Cover data={data} isOpened={isOpened} onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT (Di balik tirai) */}
      {/* Konten hanya aktif/terlihat setelah isOpened true untuk menghemat resource */}
      <div className={`flex h-screen w-full transition-opacity duration-1000 ${isOpened ? "opacity-100" : "opacity-0"}`}>
        {/* LEFT SIDE: FIXED BRANDING (Desktop Only) */}
        <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-500px)] overflow-hidden bg-black">
          <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${data.images[0]})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          <div className="relative z-10 m-auto text-center">
            <h2 className="text-white/30 text-[10px] uppercase tracking-[0.8em] mb-6">Wedding Celebration</h2>
            <h1 className="font-cormorant-upright text-8xl text-white uppercase tracking-tighter leading-[0.8]">
              {data.brideName} <br />
              <span className="italic opacity-30 text-5xl">&</span> <br />
              {data.groomName}
            </h1>
            <p className="mt-10 font-cormorant-upright text-xl tracking-[0.5em] text-white/60 italic">{data.eventDateFormatted}</p>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE CONTENT (Mobile & Desktop Right) */}
        <div ref={contentRef} className="ml-0 lg:ml-[calc(100%-500px)] w-full lg:w-[500px] h-screen overflow-y-auto overflow-x-hidden bg-[#0A0A0A] relative scroll-smooth scrollbar-hide border-l border-white/5">
          {isOpened && (
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
              <Announcement data={data} />
              <Countdown data={data} />
              <Couple data={data} />
              <WeddingEvent data={data} />
              <LoveStory data={data} />
              <WeddingGifts data={data} />
              <GallerySection images={data.images} />
              <RSVPSection data={data} />
              <ThankYouSection data={data} />

              <div className="py-20 text-center">
                <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 italic">Created by Invify</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[110] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

export default ModernTemplate
