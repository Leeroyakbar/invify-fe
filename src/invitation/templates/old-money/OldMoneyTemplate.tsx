import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import type { TemplateProps } from "../../../types/TemplateProps"

// Import Section (Kita akan buat satu per satu nanti)
import CurtainCoverSection from "./sections/CurtainCoverSection"
import AnnouncementSection from "./sections/AnnouncementSection"
// Placeholder sementara untuk section berikutnya
// import ProfileSection from "./sections/ProfileSection";

export default function OldMoneyTemplate({ data, isOpened, onOpen }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll Progress Logic untuk Progress Bar Minimalis
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative h-screen w-full bg-[#F9F8F4] text-stone-800 overflow-hidden font-serif selection:bg-stone-200">
      {/* 1. GLOBAL DECORATIVE FRAME (Garis bingkai statis di seluruh layar) */}
      <div className="fixed inset-4 md:inset-8 border border-stone-200 pointer-events-none z-50 opacity-50" />

      {/* 2. MINIMAL VERTICAL PROGRESS (Lebih tipis dan halus dari Noir) */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 h-32 w-px bg-stone-200 z-60 hidden sm:block">
        <motion.div className="absolute top-0 left-0 w-full bg-stone-500 origin-top" style={{ scaleY, height: "100%" }} />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.4em] text-stone-400 uppercase vertical-text">Progress</div>
      </div>

      {/* 3. CURTAIN / COVER */}
      <CurtainCoverSection data={data} isOpened={isOpened} onOpen={onOpen} />

      {/* 4. MAIN CONTENT CONTAINER */}
      <div ref={containerRef} className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* SECTION 1: ANNOUNCEMENT */}
        <AnnouncementSection isOpened={isOpened} />

        {/* SECTION 2: QUOTE (Coming Soon) */}
        {/* <QuoteSection data={data} /> */}

        {/* SECTION 3: BRIDE & GROOM PROFILES (Coming Soon) */}
        {/* <ProfileSection data={data} /> */}

        {/* Tambahkan section lainnya di sini nanti... */}

        {/* Footer Palsu agar snap scroll terasa pas di akhir */}
        <div className="h-[1px] snap-end" />
      </div>

      {/* 5. FLOATING NAVIGATION INDICATOR (Optional) */}
      {/* 5. FLOATING NAVIGATION INDICATOR */}
      <div className="fixed bottom-10 right-10 z-[60] hidden md:block">
        <p className="text-[9px] tracking-[0.5em] uppercase text-stone-400">The Heritage Collection — Vol. I</p>
      </div>

      {/* Perbaikan Error JSX Style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        /* Menyembunyikan scrollbar untuk Chrome, Safari dan Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Menyembunyikan scrollbar untuk IE, Edge dan Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `,
        }}
      />
    </div>
  )
}
