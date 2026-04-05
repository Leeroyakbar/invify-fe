import { easeOut, motion } from "framer-motion"
import { type Invitation } from "../../../../types/Invitation"

export default function CoupleSection({ data }: { data: Invitation }) {
  // Variabel animasi untuk transisi warna & scale yang bekerja di Mobile & Desktop
  const photoVariants = {
    initial: { filter: "grayscale(100%)", scale: 1.1, opacity: 0 },
    animate: {
      filter: "grayscale(0%)",
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: easeOut },
    },
  }

  return (
    <section id="couple" className="relative border-t border-white/10 overflow-hidden">
      {/* 1. QUOTE SECTION */}
      <div className="px-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2 }}>
          <span className="font-montserrat text-[10px] uppercase tracking-[0.6em] text-white/40 block mb-6">Ar-Rum / 21</span>
          <p className="font-montserrat text-lg md:text-xl text-white/80 leading-relaxed max-w-sm mx-auto">
            "And among His Signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquillity with them, and He has put love and mercy between your (hearts): verily in that are Signs for those who
            reflect."
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-8" />
        </motion.div>
      </div>

      {/* 2. BRIDE & GROOM PROFILE */}
      <div className="flex flex-col gap-24 pb-32">
        {/* THE BRIDE */}
        <div className="px-8">
          <div className="space-y-8">
            {/* Frame Foto dengan Sudut Melingkar (Rounded) */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-tl-[120px] rounded-br-[20px] border border-white/10">
              <motion.img variants={photoVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }} src="/rahma/bride.webp" alt={data.brideFullName} className="w-full h-full object-cover" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-3">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-white/30 block">The Bride</span>
              <h2 className="font-cinzel text-3xl text-white tracking-wide uppercase">{data.brideFullName}</h2>
              <p className="font-montserrat text-[11px] text-white/50 leading-relaxed tracking-[0.1em]">
                Putri dari <br />
                <span className="text-white/80">
                  Bapak {data.brideFather} & Ibu {data.brideMother}
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* THE GROOM */}
        <div className="px-8">
          <div className="space-y-8 text-right flex flex-col items-end">
            {/* Sudut melingkar yang berlawanan untuk Groom agar asimetris */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-tr-[120px] rounded-bl-[20px] border border-white/10">
              <motion.img variants={photoVariants} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }} src="/rahma/groom.webp" alt={data.groomFullName} className="w-full h-full object-cover" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-3">
              <span className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-white/30 block">The Groom</span>
              <h2 className="font-cinzel text-3xl text-white tracking-wide uppercase">{data.groomFullName}</h2>
              <p className="font-montserrat text-[11px] text-white/50 leading-relaxed tracking-[0.1em]">
                Putra dari <br />
                <span className="text-white/80 text-right">
                  Bapak {data.groomFather} & Ibu {data.groomMother}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
