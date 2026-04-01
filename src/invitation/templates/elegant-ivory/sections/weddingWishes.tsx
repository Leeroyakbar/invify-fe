import { motion } from "framer-motion"
import { useState } from "react"
import { MessageSquare, Send, User, CheckCircle2, XCircle } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function WeddingWishesSection({ data }: Props) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "">("")

  return (
    <section className="relative bg-[#0A0A0A] px-6 py-24 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 mb-16 text-center">
        {/* <MessageSquare className="mx-auto mb-4 text-[#D4A853]/60" size={24} strokeWidth={1.5} /> */}
        <h2 className="font-bodoni italic text-4xl text-white">Wishes & RSVPs</h2>
        <div className="h-[1px] w-12 bg-[#D4A853]/30 mx-auto mt-6" />
      </motion.div>

      <div className="mx-auto max-w-xl relative z-10">
        {/* Form Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white/[0.03] border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
          <div className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:border-[#D4A853]/50 focus:outline-none transition-all font-lora"
              />
            </div>

            <textarea
              placeholder="Berikan ucapan & doa terbaik..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:border-[#D4A853]/50 focus:outline-none transition-all font-lora resize-none"
            />

            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value as "hadir" | "tidak_hadir" | "")}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/60 focus:border-[#D4A853]/50 focus:outline-none transition-all font-lora appearance-none"
            >
              <option value="" className="bg-[#1A1A1A]">
                Konfirmasi Kehadiran
              </option>
              <option value="hadir" className="bg-[#1A1A1A]">
                Saya Akan Hadir
              </option>
              <option value="tidak_hadir" className="bg-[#1A1A1A]">
                Mohon Maaf, Berhalangan
              </option>
            </select>

            <button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8860B] py-3.5 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] flex items-center justify-center gap-2">
              <span className="relative z-10">Kirim Ucapan</span>
              <Send size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Wishes List Display */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-lora text-[11px] text-white/40 tracking-widest uppercase">Messages from Loved Ones</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="relative">
            <div className="max-h-[450px] overflow-y-auto pr-4 space-y-4 no-scrollbar">
              {data.guests.map((guest, index) => (
                <motion.div key={guest.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white/90 text-sm flex items-center gap-2">
                        {guest.name}
                        {guest.isAttending ? <CheckCircle2 size={12} className="text-green-500/60" /> : <XCircle size={12} className="text-red-500/60" />}
                      </h4>
                      <span className="text-[9px] text-white/30 font-lora uppercase tracking-tighter">1 hari lalu</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-md border font-medium ${guest.isAttending ? "border-green-500/20 bg-green-500/5 text-green-500/70" : "border-red-500/20 bg-red-500/5 text-red-500/70"}`}>
                      {guest.isAttending ? "Hadir" : "Absen"}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/60 font-lora italic">"{guest.message || "Semoga sakinah mawaddah warohmah."}"</p>
                </motion.div>
              ))}
            </div>

            {/* Fade Effect at bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
