import { Heart } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"
import { scaleFade, fadeSoft } from "../../../../motions/templateMotions"

export default function GroomSection({ data }: { data: Invitation }) {
  return (
    <section id="couple" className="h-screen snap-start relative overflow-hidden text-white">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/classic-noir/groom-2.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-16 left-6 h-24 w-px bg-white/30" />

      <motion.p initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={scaleFade} className="absolute top-6 left-6 text-[10px] tracking-[0.3em] text-white/50 uppercase flex items-center gap-2">
        {data.brideName.split(" ")[0]}
        <Heart size={10} className="fill-white/50" />
        {data.groomName.split(" ")[0]}
      </motion.p>
      {/* CONTENT */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={fadeSoft} className="relative z-10 h-full flex flex-col justify-end px-8 pb-16">
        <p className="text-[11px] tracking-[0.3em] mb-3 opacity-80">THE GROOM</p>

        <h1 className="font-serif text-4xl md:text-5xl mb-2">{data.groomFullName}</h1>
        <div className="w-22 h-px bg-white/40 my-4" />

        <p className="italic text-sm opacity-80 mb-4">The Son of</p>

        <p className="text-sm leading-relaxed max-w-md opacity-90">
          {data.groomFather} <br />& {data.groomMother}
        </p>

        {/* OPTIONAL TAG */}
        <div className="mt-6">
          <a href={`https://instagram.com/${data.groomInstagram}`} target="_blank">
            <span className="inline-block px-4 py-1 text-xs border border-white/40 rounded-full">@ {data.groomInstagram}</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
