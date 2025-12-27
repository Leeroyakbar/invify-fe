import { motion } from "framer-motion"
import type { Invitation } from "../../types/Invitation"

export default function Announcement({ data }: { data: Invitation }) {
  return (
    <section className="relative min-h-[100svh] flex justify-center px-6 text-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 bg-[url('/modern/announcement-bg.png')] bg-cover bg-center" />

      {/* CONTENT */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10">
        <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mt-24 mb-3 text-faded-merlot">The Wedding Of</p>

        <h2 className="font-script text-4xl md:text-5xl text-faded-merlot mb-3">
          {data.groomName}
          <span className="text-gold">&</span>
          {data.brideName}
        </h2>

        <p className="font-serif text-sm tracking-widest text-faded-merlot">{data.eventDate}</p>
      </motion.div>
    </section>
  )
}
