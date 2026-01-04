import { motion } from "framer-motion"
import { fadeUp } from "../../../../motions/templateMotions"
import type { Invitation } from "../../../../types/Invitation"
import { ChevronRight } from "lucide-react"
export default function EventSection({ data }: { data: Invitation }) {
  return (
    <section id="event" className="h-screen snap-start flex items-center px-8 text-white relative">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.8, delay: 0.2 }} variants={fadeUp} className="max-w-md w-full relative z-10">
        {/* Judul Tanggal dengan Garis Aksen */}
        <div className="mb-12">
          <h2 className="font-serif text-4xl mb-2 italic">{data.eventDateFormatted}</h2>
          <div className="w-12 h-[1px] bg-white/50" />
        </div>

        <div className="space-y-12 relative">
          {/* Garis Vertikal Halus di Samping (Timeline Look) */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-transparent -left-4" />

          {/* AKAD */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full border border-white/50 group-hover:bg-white transition-colors duration-500" />
              <p className="tracking-[0.4em] text-[10px] font-medium text-white/60 uppercase">Akad</p>
            </div>

            <div className="pl-5">
              <p className="text-xl font-serif mb-2 tracking-tight">
                {data.akadTimeStart} – {data.akadTimeEnd}
              </p>
              <p className="text-sm opacity-70 leading-relaxed font-light">
                <span className="font-semibold text-white/90">{data.akadVanue}</span>
                <br />
                {data.akadLocation}
              </p>

              <motion.button
                onClick={() => window.open(data.akadMapsUrl, "_blank")}
                whileHover="hover" // Memicu varian "hover" pada button dan anak-anaknya
                initial="initial"
                className="mt-6 flex items-center group relative w-fit"
              >
                {/* Teks Utama */}
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 transition-colors duration-300 group-hover:text-white">View Map</span>

                {/* Garis Bawah Animasi */}
                <motion.div
                  variants={{
                    initial: { width: "40%", opacity: 0.3 },
                    hover: { width: "100%", opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute -bottom-1 left-0 h-[1px] bg-white"
                />

                {/* Icon Panah Kecil yang muncul saat hover (Opsional) */}
                <motion.span
                  variants={{
                    initial: { x: -5, opacity: 0 },
                    hover: { x: 5, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ChevronRight size={10} />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* RECEPTION */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full border border-white/50 group-hover:bg-white transition-colors duration-500" />
              <p className="tracking-[0.4em] text-[10px] font-medium text-white/60 uppercase">Wedding Reception</p>
            </div>

            <div className="pl-5">
              <p className="text-xl font-serif mb-2 tracking-tight">
                {data.receptionTimeStart} – {data.receptionTimeEnd}
              </p>
              <p className="text-sm opacity-70 leading-relaxed font-light">
                <span className="font-semibold text-white/90">{data.receptionVanue}</span>
                <br />
                {data.receptionLocation}
              </p>

              <motion.button
                onClick={() => window.open(data.receptionMapsUrl, "_blank")}
                whileHover="hover" // Memicu varian "hover" pada button dan anak-anaknya
                initial="initial"
                className="mt-6 flex items-center group relative w-fit"
              >
                {/* Teks Utama */}
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 transition-colors duration-300 group-hover:text-white">View Map</span>

                {/* Garis Bawah Animasi */}
                <motion.div
                  variants={{
                    initial: { width: "40%", opacity: 0.3 },
                    hover: { width: "100%", opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute -bottom-1 left-0 h-[1px] bg-white"
                />

                {/* Icon Panah Kecil yang muncul saat hover (Opsional) */}
                <motion.span
                  variants={{
                    initial: { x: -5, opacity: 0 },
                    hover: { x: 5, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ChevronRight size={10} />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* NGUNDUH MANTU */}
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full border border-white/50 group-hover:bg-white transition-colors duration-500" />
              <p className="tracking-[0.4em] text-[10px] font-medium text-white/60 uppercase">Ngunduh Mantu</p>
            </div>

            <div className="pl-5">
              <p className="text-xl font-serif mb-2 tracking-tight">
                {data.ngunduhMantuTimeStart} – {data.ngunduhMantuTimeEnd}
              </p>
              <p className="text-sm opacity-70 leading-relaxed font-light">
                <span className="font-semibold text-white/90">{data.ngunduhMantuVanue}</span>
                <br />
                {data.ngunduhMantuLocation}
              </p>

              <motion.button
                onClick={() => window.open(data.ngunduhMantuMapsUrl, "_blank")}
                whileHover="hover" // Memicu varian "hover" pada button dan anak-anaknya
                initial="initial"
                className="mt-6 flex items-center group relative w-fit"
              >
                {/* Teks Utama */}
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 transition-colors duration-300 group-hover:text-white">View Map</span>

                {/* Garis Bawah Animasi */}
                <motion.div
                  variants={{
                    initial: { width: "40%", opacity: 0.3 },
                    hover: { width: "100%", opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute -bottom-1 left-0 h-[1px] bg-white"
                />

                {/* Icon Panah Kecil yang muncul saat hover (Opsional) */}
                <motion.span
                  variants={{
                    initial: { x: -5, opacity: 0 },
                    hover: { x: 5, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ChevronRight size={10} />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
