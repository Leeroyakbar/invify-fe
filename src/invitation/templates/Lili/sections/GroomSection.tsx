import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface GroomSectionProps {
  data: Invitation
}

export default function GroomSection({ data }: GroomSectionProps) {
  const fadeInParams = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 3.5, ease: [0.19, 1, 0.22, 1] as const },
  }

  // Mengambil data dari Invitation Interface
  const igUsername = data.groomInstagram || "username"
  const groomParentName = `${data.groomFather} & ${data.groomMother}`
  const groomImageUrl = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/groom.webp"

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white border-t border-white/5">
      {/* 1. BACKGROUND PHOTO */}
      <div className="absolute inset-0 z-0">
        <img src={groomImageUrl} alt={data.groomName} className="w-full h-full object-cover object-[center_20%]" />
        {/* Overlay Noir: Sedikit lebih gelap di bagian bawah untuk transisi antar section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 lg:bg-black/40" />
      </div>

      {/* 2. CONTENT CONTENT */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-end lg:justify-center items-start px-10 pb-20 pt-24 lg:p-24 lg:max-w-2xl">
        <motion.div {...fadeInParams} className="space-y-6 lg:space-y-8">
          {/* Label Minimalis */}
          <div className="space-y-2">
            <span className="text-[10px] lg:text-[11px] tracking-[0.5em] uppercase text-white/70 font-inter">The Groom</span>
          </div>

          {/* Nama Lengkap */}
          <h1 className="font-cormorant-upright text-5xl md:text-6xl lg:text-7xl leading-tight font-extralight text-white mr-20">{data.groomFullName}</h1>

          {/* Garis Dekoratif */}
          <div className="h-px w-24 bg-white/20 lg:w-32" />

          {/* Silsilah Orang Tua */}
          <div className="space-y-3 font-inter font-light text-white/70">
            <p className="text-[10px] lg:text-[11px] tracking-[0.3em] uppercase">Putra Ketiga Dari</p>
            <p className="text-sm lg:text-[15px] leading-relaxed tracking-wide mr-20">{groomParentName}</p>
          </div>

          {/* Tombol Instagram */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="pt-6 lg:pt-8">
            <a
              href={`https://instagram.com/${igUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/10 rounded-full bg-white/5 active:scale-95 transition-all hover:bg-white/10 hover:border-white/40"
            >
              <Instagram size={14} className="text-white/80" />
              <span className="font-inter text-[11px] tracking-widest text-white/90">@{igUsername}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
