import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function CurtainCoverSection({ data, isOpened, onOpen }: { data: Invitation; isOpened: boolean; onOpen: () => void }) {

  // OPTIMASI CDN: Resolusi disesuaikan di server Supabase agar load pertama kali super instan
  const backgroundImage = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/couple-bg.webp';

  // Variabel stagger untuk teks agar muncul bergantian dengan anggun
  const noirContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const noirTextItem = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  return (
      <AnimatePresence>
        {!isOpened && (
            <motion.section
                className="fixed inset-0 z-150 flex items-center justify-center overflow-hidden bg-[#0a0a0a] subpixel-antialiased"
            >
              {/* 1. BACKGROUND LAYER WITH WARM CINEMATIC COLOR PRESERVED */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 0.55, // Mengembalikan warna asli foto prewed dengan opasitas seimbang
                      transition: { duration: 3, ease: "easeOut" }
                    }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#0a0a0a] z-10" />
              </div>

              {/* 2. PREMIUM DUAL HOLLYWOOD SPLIT CURTAIN EXIT */}
              {/* Tirai kiri meluncur ke kiri saat dibuka */}
              <motion.div
                  initial={{ x: 0 }}
                  exit={{
                    x: "-100%",
                    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                  }}
                  className="absolute top-0 bottom-0 left-0 w-1/2 bg-black/30 border-r border-white/[0.0001] z-10"
              />
              {/* Tirai kanan meluncur ke kanan saat dibuka */}
              <motion.div
                  initial={{ x: 0 }}
                  exit={{
                    x: "100%",
                    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                  }}
                  className="absolute top-0 bottom-0 right-0 w-1/2 bg-black/30 border-l border-white/[0.0001] z-10"
              />

              {/* 3. CENTER CONTENT - ELEGANT ROMANTIC EDITORIAL LAYOUT */}
              <motion.div
                  variants={noirContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4 } }}
                  className="relative z-20 flex flex-col items-center px-8 text-center text-white max-w-sm w-full"
              >
                {/* Subtitle Tag Minimalis */}
                <motion.p
                    variants={noirTextItem}
                    className="text-[10px] font-sans tracking-[0.4em] text-white/50 uppercase font-medium pl-[0.4em] mb-4"
                >
                  We Invite You to Celebrate
                </motion.p>

                {/* Nama Mempelai Utama (Kombinasi Serif Klasik & Garis Border Halus) */}
                <motion.h1
                    variants={noirTextItem}
                    className="font-serif text-xl sm:text-2xl tracking-[0.25em] uppercase leading-relaxed text-white/95 my-2 border-y border-white/10 py-6 w-full pl-[0.25em]"
                >
                  {data.groomName} <span className="text-white/30 font-sans italic text-lg lowercase my-1 block lg:inline lg:mx-1">&</span> {data.brideName}
                </motion.h1>

                {/* Blok Informasi Nama Tamu */}
                <motion.div variants={noirTextItem} className="mt-8 space-y-1">
                  <p className="font-serif italic text-xs text-white/40 tracking-wide">Dear Special Guest,</p>
                  <h2 className="font-serif text-base text-white/90 tracking-[0.15em] uppercase font-normal pt-1">
                    {data.guestName}
                  </h2>
                </motion.div>

                {/* Tombol Interaktif Premium Bersudut Kotak Klasik */}
                <motion.div variants={noirTextItem} className="pt-10">
                  <button
                      onClick={onOpen}
                      className="group relative border border-white/20 px-12 py-3.5 text-[10px] tracking-[0.4em] uppercase overflow-hidden transition-all duration-500 hover:border-white rounded-none backdrop-blur-xs active:scale-95 shadow-2xl"
                  >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-semibold pl-[0.4em]">
                  Let’s Open
                </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[500ms] ease-[0.76,0,0.24,1]" />
                  </button>
                </motion.div>

              </motion.div>
            </motion.section>
        )}
      </AnimatePresence>
  )
}
