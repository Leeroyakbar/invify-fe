import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface BrideSectionProps {
  data: Invitation
}

export default function BrideSection({ data }: BrideSectionProps) {
  const fadeInParams = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 2.5, ease: [0.19, 1, 0.22, 1] as const },
  }

  // Gunakan data dummy jika audioUrl dari Invitify kosong
  const igUsername = data.brideInstagram || "username"
  const brideParentName = `${data.brideFather} & ${data.brideMother}`
  const brideImageUrl = "/lili/bride.webp" // URL foto referensi kamu

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* 1. BACKGROUND PHOTO (MENGISI FULL SCREEN) */}
      <div className="absolute inset-0 z-0">
        <img src={brideImageUrl} alt={data.brideName} className="w-full h-full object-cover object-center" />
        {/* Overlay Noir: Memberikan kontras agar teks mudah terbaca (Gaya SS) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10 lg:bg-black/50" />
      </div>

      {/* 2. CONTENT CONTENT (Teks di Atas Overlay) */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-end lg:justify-center items-start px-10 pb-20 pt-24 lg:p-24 lg:max-w-2xl">
        {/* Kontainer Teks dengan Animasi Muncul */}
        <motion.div {...fadeInParams} className="space-y-6 lg:space-y-8">
          {/* Label Minimalis (Mengkuti SS: Putih, Uppercase, Inter) */}
          <div className="space-y-2">
            <span className="text-[10px] lg:text-[11px] tracking-[0.5em] uppercase text-white/70 font-inter">The Bride</span>
          </div>

          {/* Nama Lengkap (Mengkuti SS: Serif Besar, Tebal, Cormorant) */}
          <h1 className="font-cormorant-upright text-5xl md:text-6xl lg:text-7xl leading-tight font-extralight text-white mr-10">{data.brideFullName}</h1>

          {/* Garis Dekoratif Tipis (Mengikuti SS) */}
          <div className="h-[1px] w-24 bg-white/20 lg:w-32" />

          {/* Silsilah Orang Tua (Mengkuti SS: Kecil, Font Inter, Putih Transparan) */}
          <div className="space-y-3 font-inter font-light text-white/70">
            <p className="text-[10px] lg:text-[11px] tracking-[0.3em] uppercase">Putri Kedua Dari</p>
            <p className="text-sm lg:text-[15px] leading-relaxed tracking-wide">{brideParentName}</p>
          </div>

          {/* Tombol Instagram Minimalis (Mengikuti SS: Oval, Kapsul, Outline Putih) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="pt-6 lg:pt-8">
            <a
              href={`https://instagram.com/${igUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 rounded-full bg-white/5 active:scale-95 transition-all hover:bg-white/10 hover:border-white/40"
            >
              <Instagram size={15} className="text-white/80" />
              <span className="font-inter text-xs tracking-wider text-white">@{igUsername}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
