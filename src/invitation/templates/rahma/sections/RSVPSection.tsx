import { motion } from "framer-motion"
import { useState } from "react"
import { Send } from "lucide-react"

export default function RSVPSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="relative py-32 px-8 overflow-hidden bg-[#0A0A0A]">
      {/* Bold Background Header */}
      <div className="absolute -right-10 top-20 pointer-events-none opacity-[0.03] rotate-90 origin-bottom-right">
        <h2 className="font-cinzel text-[100px] font-bold tracking-tighter">ATTENDANCE</h2>
      </div>

      <div className="relative z-10 max-w-sm ml-0">
        {" "}
        {/* Rata Kiri */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 mb-16 border-l border-white/10 pl-6">
          <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block">The Confirmation</span>
          <h2 className="font-cinzel text-4xl text-white tracking-widest uppercase leading-tight">
            Will You <br /> Attend?
          </h2>
          <p className="font-montserrat text-[10px] text-white/40 leading-relaxed tracking-widest uppercase">Please let us know if you can make it to our celebration.</p>
        </motion.div>
        {!submitted ? (
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="space-y-1">
              <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-white/10 px-2 py-3 text-white font-montserrat text-xs focus:outline-none focus:border-white/40 transition-all placeholder:text-white/5"
                placeholder="Your prestigious name"
              />
            </div>

            <div className="space-y-1">
              <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-2">Attendance Status</label>
              <select required className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white font-montserrat text-xs focus:outline-none focus:border-white/40 transition-all appearance-none cursor-pointer">
                <option value="" className="bg-[#0A0A0A]">
                  Choose your status
                </option>
                <option value="present" className="bg-[#0A0A0A]">
                  I will be there
                </option>
                <option value="absent" className="bg-[#0A0A0A]">
                  Regretfully decline
                </option>
              </select>
            </div>

            <div className="space-y-1 pt-4">
              <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-2">Wishes</label>
              <textarea
                rows={3}
                placeholder="Write your prayers here..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-4 text-white font-montserrat text-xs focus:outline-none focus:border-white/20 transition-all resize-none"
              />
            </div>

            <motion.button whileHover={{ x: 5 }} className="w-full mt-6 bg-white text-black font-montserrat text-[9px] font-bold uppercase tracking-[0.3em] py-5 rounded-sm flex items-center justify-center gap-4 group">
              Confirm Presence <Send size={12} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 border-t border-white/10">
            <h3 className="font-cinzel text-white text-xl mb-4 tracking-widest">THANK YOU</h3>
            <p className="font-montserrat text-[10px] text-white/40 uppercase tracking-[0.2em] leading-loose">
              Your response has been recorded. <br /> We hope to see you there.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
