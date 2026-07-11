import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface EventSectionProps {
  data: Invitation
}

export default function EventSection({ data }: EventSectionProps) {
  // Premium Custom Cubic Bezier Curve (Sangat halus, meluncur dengan mantap saat di-scroll)
  const luxuryFadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    },
  }

  const events = [
    {
      label: "AKAD NIKAH",
      time: `${data.akadTimeStart} - ${data.akadTimeEnd} WIB`,
      venue: data.akadVanue,
      location: data.akadLocation,
      maps: data.akadMapsUrl,
      number: "01"
    },
    {
      label: "RESEPSI",
      time: `${data.receptionTimeStart} - ${data.receptionTimeEnd} WIB`,
      venue: data.receptionVanue,
      location: data.receptionLocation,
      maps: data.receptionMapsUrl,
      number: "02"
    },
  ]

  return (
      <section className="relative w-full py-32 px-8 flex flex-col items-center bg-transparent text-white subpixel-antialiased">

        {/* 1. ELEMEN ORNAMEN BACKGROUND MEWAH */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Garis Vertikal Arsitektural Tipis Tengah Latar Belakang */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/3 transform -translate-x-1/2" />
        </div>

        <div className="relative z-10 w-full max-w-xl space-y-32">
          {events.map((event, index) => (
              <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={luxuryFadeUp}
                  className="relative flex flex-col items-center text-center group"
              >
                {/* Latar Belakang Nomor Bab Raksasa Tipis Eropa */}
                <span className="absolute -top-12 font-cormorant text-[7rem] md:text-[8rem] font-extralight text-white/2 select-none pointer-events-none leading-none z-0">
              {event.number}
            </span>

                {/* KONTEN UTAMA ELEGAN BERSILANGAN */}
                <div className="relative z-10 w-full px-4 space-y-6 flex flex-col items-center">

                  {/* Jenis Acara */}
                  <div className="space-y-3 flex flex-col items-center w-full">
                <span className="text-[8px] font-inter tracking-[0.5em] uppercase text-white/30 group-hover:text-white/50 transition-colors font-bold block pl-[0.5em]">
                  The Protocol
                </span>
                    <h2 className="text-3xl md:text-4xl font-cormorant-upright text-white/95 tracking-[0.08em] uppercase font-light">
                      {event.label}
                    </h2>
                    <div className="h-px w-6 bg-white/20 my-1" />
                  </div>

                  {/* Waktu Pelaksanaan */}
                  <p className="text-xl md:text-2xl font-cormorant-upright text-white/90 italic tracking-wide font-light">
                    {event.time}
                  </p>

                  {/* Detail Tempat & Alamat Lengkap */}
                  <div className="space-y-2 max-w-85">
                    <h3 className="text-white font-inter text-[12px] font-bold tracking-[0.2em] uppercase">
                      {event.venue}
                    </h3>
                    <p className="text-white/50 font-inter text-[12px] leading-[1.8] font-light tracking-wide text-center">
                      {event.location}
                    </p>
                  </div>

                  {/* Tombol Maps Mengikuti Gaya Kapsul Modern Minimalis */}
                  <div className="pt-4">
                    <a
                        href={event.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        /* PERBAIKAN 1: Menghapus kelas 'group' di bawah ini agar hover terisolasi di tombol saja */
                        className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/10 rounded-full bg-white/1 backdrop-blur-xs transition-all duration-500 hover:bg-white hover:border-white active:scale-95 shadow-xl text-white hover:text-black"
                    >
                      <MapPin
                          size={13}
                          /* PERBAIKAN 2: Menggunakan selector transisi CSS murni, atau gunakan transition-colors bawaan */
                          className="text-white/60 [a:hover_&]:text-black transition-colors duration-500 stroke-[1.5px]"
                      />
                      <span
                          /* PERBAIKAN 3: Menggunakan selector transisi CSS murni untuk teks */
                          className="font-inter text-[10px] tracking-[0.3em] text-white/80 [a:hover_&]:text-black font-semibold uppercase pl-[0.3em] transition-colors duration-500"
                      >
                        Buka Peta
                      </span>
                    </a>
                  </div>


                </div>

                {/* Batas Antar Acara: Garis horizontal tipis elegan (hanya muncul di sela-sela akad dan resepsi) */}
                {index === 0 && (
                    <div className="absolute -bottom-16 h-px w-16 bg-white/10" />
                )}

              </motion.div>
          ))}
        </div>
      </section>
  )
}
