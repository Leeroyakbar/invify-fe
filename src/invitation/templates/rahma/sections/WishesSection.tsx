import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

export default function WishesSection({ data }: { data: Invitation }) {
  const wishes = data.guests || []

  return (
    <section id="wishes" className="relative py-24 px-8 bg-[#0A0A0A]">
      <div className="max-w-md mx-auto">
        {/* Header Section - Full English */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-16 relative">
          <Quote size={40} className="text-white/5 absolute -top-6 -left-4" />
          <h2 className="font-cinzel text-3xl text-white tracking-[0.4em] uppercase">Love Letters</h2>
          <div className="h-[1px] w-16 bg-white/20 mt-4" />
          <p className="font-montserrat text-[9px] text-white/30 uppercase tracking-[0.5em] mt-6 leading-relaxed">
            Beautiful messages from <br /> our beloved ones
          </p>
        </motion.div>

        {/* Masonry-Style Layout Area */}
        <div className="columns-1 gap-4 space-y-4 pr-2">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-sm relative group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <h4 className="font-cinzel text-[10px] text-white/80 tracking-widest uppercase">{wish.name}</h4>
                  {wish.isAttending && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                </div>

                <p className="font-montserrat text-[11px] text-white/50 leading-relaxed font-light">{wish.message}</p>

                <div className="flex justify-end">
                  <span className="font-reenie-beanie text-lg text-white/20 group-hover:text-white/40 transition-colors">— Regards</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {wishes.length === 0 && (
          <div className="text-left py-20 border-t border-white/5 mt-10">
            <p className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/20 italic">The archive is currently empty...</p>
          </div>
        )}
      </div>
    </section>
  )
}
