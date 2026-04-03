import { motion, AnimatePresence } from "framer-motion"
import { MailOpen } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}

export default function CurtainSection({ data, isOpened, onOpen }: Props) {
  const year = new Date(data.eventDate).getFullYear()

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.section
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-between bg-[#0A0A0A] px-6 py-16 text-center shadow-2xl overflow-hidden"
        >
          {/* 1. BACKGROUND LAYER */}
          <div
            className="absolute inset-0 bg-cover transition-transform duration-[20s]"
            style={{
              backgroundImage: `url('/elegant-ivory/cover.jpeg')`,
              /* Horizontal: 50% (Tetap di tengah secara lebar)
       Vertical: 45% s/d 55% (Menarik gambar ke atas agar wajah melewati teks nama)
    */
              backgroundPosition: "55% 65%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />

          {/* 2. TOP BRANDING (Revisi: Wedding Of ditaruh di sini) */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full">
            <div className="flex flex-col items-center gap-2">
              <p className="font-lora text-[9px] tracking-[0.6em] uppercase text-white/90">The Wedding Of</p>
              <div className="flex items-center gap-3">
                <div className="h-[0.5px] w-8 bg-[#D4A853]/40" />
                <p className="font-lora text-[10px] tracking-[0.2em] text-[#D4A853] italic">Est. {year}</p>
                <div className="h-[0.5px] w-8 bg-[#D4A853]/40" />
              </div>
            </div>
          </motion.div>

          {/* 3. CENTER SPACE (Kosong agar wajah terlihat) */}
          <div className="flex-1" />

          {/* 4. BOTTOM COMPOSITION (Nama & Button) */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-md">
            {/* Nama Mempelai */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-10">
              <h1 className="font-bodoni text-4xl text-white italic font-light leading-10 capitalize">
                {data.brideName}{" "}
                <span className="text-[#D4A853] text-3xl mx-1">
                  <br />& <br />
                </span>{" "}
                {data.groomName}
              </h1>
              <p className="font-lora text-[10px] tracking-[0.4em] uppercase text-white/60 mt-4">
                {new Date(data.eventDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </motion.div>

            {/* Guest & Button */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-col items-center gap-6 w-full max-w-[280px]">
              <div className="space-y-1">
                <p className="font-lora text-[9px] uppercase tracking-[0.3em] text-white/50 italic">Specially Invited To</p>
                <h3 className="font-playfair text-xl italic text-white/90">Our Beloved Guest</h3>
              </div>

              <button
                onClick={onOpen}
                className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-[#D4A853]/40 text-white transition-all active:scale-95"
              >
                <MailOpen size={16} className="text-[#D4A853]" />
                <span className="font-lora text-[10px] font-medium tracking-[0.2em] uppercase">Buka Undangan</span>

                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
