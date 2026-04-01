import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function BrideGroomSection({ data }: Props) {
  return (
    // Menggunakan bg-transparent agar tetap seirama dengan scroll background hero
    <section className="relative z-10 bg-transparent px-8 py-24 text-center">
      {/* Label Kecil di Atas */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-16 flex flex-col items-center gap-4">
        <span className="font-lora text-[10px] uppercase tracking-[0.5em] text-[#D4A853]">The Couple</span>
        <h2 className="font-bodoni italic text-4xl text-white">Mempelai</h2>
      </motion.div>

      {/* Grid Mempelai */}
      <div className="flex flex-col gap-24">
        {/* Bride */}
        <PersonBlock image={data.bridePhoto} name={data.brideName} fullName={data.brideFullName} isBride={true} father={data.brideFather} mother={data.brideMother} delay={0.2} />

        {/* Ornament Divider yang Simple */}
        <div className="flex items-center justify-center gap-6 opacity-30">
          <div className="h-px w-12 bg-white" />
          <span className="font-playfair italic text-white text-xl">&</span>
          <div className="h-px w-12 bg-white" />
        </div>

        {/* Groom */}
        <PersonBlock image={data.groomPhoto} name={data.groomName} fullName={data.groomFullName} isBride={false} father={data.groomFather} mother={data.groomMother} delay={0.2} />
      </div>
    </section>
  )
}

/* =========================
   Sub Component: PersonBlock
   ========================= */

interface PersonProps {
  image: string
  name: string
  fullName: string
  isBride: boolean
  father: string
  mother: string
  delay: number
}

function PersonBlock({ image, name, fullName, isBride, father, mother, delay }: PersonProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay }} viewport={{ once: false }} className="flex flex-col items-center">
      {/* Frame Foto Bentuk Arch (Kubah) yang Elegant */}
      <div className="relative mb-8 h-90 w-65 overflow-hidden rounded-t-full border border-white/10 shadow-2xl">
        <img src={image} alt={fullName} className="h-full w-full object-cover transition-all duration-700" />
        {/* Overlay halus di bawah foto agar teks transisi lebih enak dilihat */}
      </div>

      {/* Nama Panggilan (Aksen) */}
      <h3 className="font-bodoni italic text-4xl text-[#D4A853] mb-2">{name}</h3>

      {/* Nama Lengkap */}
      <h4 className="font-lora text-sm tracking-widest text-white mb-4 uppercase">{fullName}</h4>

      {/* Informasi Orang Tua */}
      <div className="space-y-1 font-lora text-[11px] leading-relaxed text-white/60 tracking-wider">
        <p>{isBride ? "Putri Tercinta dari" : "Putra Tercinta dari"}</p>
        <div className="flex flex-col items-center text-white/90">
          <span className="font-medium">Bapak {father}</span>
          <span className="my-0.5 text-[9px] opacity-40">&</span>
          <span className="font-medium">Ibu {mother}</span>
        </div>
      </div>
    </motion.div>
  )
}
