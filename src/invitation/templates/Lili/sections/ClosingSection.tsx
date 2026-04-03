import { motion } from "framer-motion"
import { Instagram, MessageCircle } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface ClosingSectionProps {
  data: Invitation
}

export default function ClosingSection({ data }: ClosingSectionProps) {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] as const },
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* BACKGROUND IMAGE WITH VIGNETTE */}
      <div className="absolute inset-0 z-0">
        <img src="/lili/gallery-3.webp" alt="Closing" className="w-full h-full object-cover" />
        {/* Overlay Noir Gradient - Lebih gelap di atas dan bawah untuk teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      {/* TOP CONTENT: THANK YOU MESSAGE */}
      <div className="relative z-10 w-full pt-24 px-8 text-center space-y-8">
        <motion.div {...fadeUp}>
          <h2 className="font-cormorant-upright text-4xl lg:text-5xl text-white tracking-[0.2em] uppercase font-extralight">Thank You</h2>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 1.2 }} className="max-w-xs mx-auto space-y-2">
          <p className="font-inter text-white/70 text-xs lg:text-sm leading-relaxed tracking-wide">"Satu hari, ribuan kenangan. Kehadiran Anda akan melengkapi cerita indah kami. Mari rayakan cinta dan babak baru ini bersama-sama." </p>

          <div className="pt-4">
            <h3 className="font-cormorant-upright text-2xl text-white tracking-widest italic">
              {data.brideName} & {data.groomName}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM CONTENT: FOOTER & BRANDING */}
      <div className="relative z-10 w-full pb-16 px-8 flex flex-col items-center space-y-8">
        {/* LOGO BRANDING */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center space-y-2">
          <h4 className="font-cormorant-upright text-4xl text-white tracking-[0.3em] lowercase leading-none">invify</h4>
          <p className="font-inter text-[9px] text-white/30 tracking-[0.4em] uppercase">Digital Wedding Invitation © 2026</p>
        </motion.div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-8">
          <a href="https://www.instagram.com/id.invify/" target="_blank" className="text-white/40 hover:text-white transition-colors">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6282273366718" target="_blank" className="text-white/40 hover:text-white transition-colors">
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* NOISE OVERLAY FOR ANALOG FEEL */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[1]" />
    </section>
  )
}
