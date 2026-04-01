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
          className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-between bg-[#0A0A0A] px-6 py-12 text-center shadow-2xl overflow-hidden"
        >
          {/* 1. BACKGROUND LAYER: Gambar dengan Overlay Hitam Low Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s]"
            style={{
              backgroundImage: `url('${data.coverImage || data.groomPhoto}')`,
            }}
          />
          {/* Overlay Hitam dengan Opacity Rendah (0.5 atau sesuai keinginan) */}
          <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />

          {/* Efek Noise/Tekstur untuk kesan premium */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('/textures/subtle-noise.png')] mix-blend-overlay" />

          {/* 2. TOP BRANDING */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-2">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-[#D4A853]/60" />
              <p className="font-lora text-[10px] tracking-[0.4em] uppercase text-white/80">The Wedding Celebration</p>
              <div className="h-px w-8 bg-[#D4A853]/60" />
            </div>
            <p className="font-lora text-[11px] tracking-[0.2em] text-[#D4A853] italic font-light">Est. {year}</p>
          </motion.div>

          {/* 3. CENTERPIECE: COMPOSITION */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
            <div className="relative mb-10 h-50 w-34">
              {/* Main Photo (Arch Frame) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.2 }}
                className="absolute inset-0 z-20 overflow-hidden border-4 border-[#D4A853]/30 shadow-2xl"
                style={{ borderRadius: "160px 160px 20px 20px" }}
              >
                <img src={data.coverImage || data.groomPhoto} className="h-full w-full object-cover" alt="Couple" />
              </motion.div>

              {/* Decorative Frame Line */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="absolute -inset-2.5 z-10 border border-[#D4A853]/20"
                style={{ borderRadius: "170px 170px 30px 30px" }}
              />
            </div>

            {/* TYPOGRAPHY: White & Gold */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-3">
              <h1 className="font-bodoni text-4xl italic font-light tracking-tight text-white">
                {data.brideName} <span className="text-[#D4A853]">&</span> {data.groomName}
              </h1>
              <div className="mx-auto h-[1px] w-16 bg-[#D4A853]/60" />
            </motion.div>
          </div>

          {/* 4. BOTTOM AREA: GUEST & BUTTON */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">
            <div className="space-y-1">
              <p className="font-lora text-[10px] uppercase tracking-[0.3em] text-white/60">Specially Invited To</p>
              <h3 className="font-playfair text-2xl italic text-white/90 border-b border-[#D4A853]/30 pb-2">Our Beloved Guest</h3>
            </div>

            <button
              onClick={onOpen}
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-transparent border border-[#D4A853]/50 text-white transition-all hover:bg-[#D4A853] hover:text-black active:scale-95 shadow-lg shadow-black/40"
            >
              <MailOpen size={18} className="transition-transform group-hover:scale-100" />
              <span className="font-bodoni text-sm font-medium tracking-widest uppercase">Buka Undangan</span>

              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
