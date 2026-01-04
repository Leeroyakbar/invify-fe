import { motion } from "framer-motion"
import { MapPin, Calendar, Clock } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

export default function EventSection({ data }: { data: Invitation }) {
  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex items-center justify-center px-6 overflow-hidden">
      {/* Decorative Background Element (Fine Lines) */}
      <div className="absolute inset-12 border-[0.5px] border-stone-200 pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-stone-100">
        {/* AKAD / CEREMONY */}
        <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-stone-100 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F9F8F4] px-4 py-1 border border-stone-200 text-[8px] tracking-[0.4em] uppercase text-stone-400">Part I</div>

          <h3 className="font-serif text-2xl italic text-stone-800 mb-8 text-center">Akad</h3>

          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-4 h-4 text-stone-300 mb-2 stroke-[1px]" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">{data.eventDateFormatted}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-stone-300 mb-2 stroke-[1px]" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">{data.akadTimeStart} — Finish</p>
            </div>

            <div className="flex flex-col items-center text-center pt-4">
              <MapPin className="w-4 h-4 text-stone-300 mb-2 stroke-[1px]" />
              <p className="text-[11px] leading-relaxed text-stone-600 uppercase tracking-widest font-light">
                {data.akadVanue} <br />
                <span className="text-[9px] text-stone-400 normal-case italic">{data.akadLocation}</span>
              </p>
            </div>
          </div>
        </div>

        {/* RESEPSI / RECEPTION */}
        <div className="p-10 md:p-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F9F8F4] px-4 py-1 border border-stone-200 text-[8px] tracking-[0.4em] uppercase text-stone-400">Part II</div>

          <h3 className="font-serif text-2xl italic text-stone-800 mb-8 text-center">Wedding Celebration</h3>

          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-4 h-4 text-stone-300 mb-2 stroke-[1px]" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">{data.eventDateFormatted}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-stone-300 mb-2 stroke-[1px]" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">
                {data.receptionTimeStart} PM — {data.receptionTimeEnd} PM
              </p>
            </div>

            <motion.button
              onClick={() => window.open(data.receptionMapsUrl, "_blank")}
              whileHover={{ backgroundColor: "#1c1917", color: "#fff" }}
              className="w-full mt-6 py-3 border border-stone-800 text-[9px] tracking-[0.5em] uppercase text-stone-800 transition-colors duration-500"
            >
              View Location
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ornament Bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-12 h-[0.5px] bg-stone-200" />
        <span className="font-serif italic text-stone-300 text-xs">M M X X V I I</span>
        <div className="w-12 h-[0.5px] bg-stone-200" />
      </div>
    </section>
  )
}
