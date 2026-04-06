import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Quote } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

export default function RSVPAndWishes({ data }: { data: Invitation }) {
  const [submitted, setSubmitted] = useState(false)
  const wishes = data.guests || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Logika pengiriman data bisa ditambahkan di sini
  }

  return (
    <section id="rsvp" className="relative py-32 px-8 overflow-hidden bg-transparent">
      {/* Background Decorative Text */}
      <div className="absolute inset-x-0 top-20 pointer-events-none opacity-[0.02] flex justify-center">
        <h2 className="font-cinzel text-[100px] md:text-[150px] font-bold tracking-tighter text-white select-none uppercase">Archive</h2>
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
        {/* --- HEADER SECTION --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-6 mb-16">
          <div className="flex flex-col items-center gap-3">
            <span className="font-montserrat text-[8px] uppercase tracking-[0.6em] text-white/40 block">The Confirmation & Wishes</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>

          <h2 className="font-cinzel text-4xl text-white tracking-widest uppercase leading-tight">
            Will You <br />
            <span className="italic opacity-80 text-3xl">Attend?</span>
          </h2>
        </motion.div>

        {/* --- FORM SECTION --- */}
        <div className="mb-24">
          {!submitted ? (
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-left space-y-8 bg-white/[0.02] border border-white/[0.05] p-8 backdrop-blur-md rounded-sm shadow-2xl">
              <div className="group space-y-1">
                <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-1 group-focus-within:text-white/60 transition-colors">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white font-montserrat text-xs focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                  placeholder="Enter your name"
                />
              </div>

              <div className="group space-y-1">
                <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-1 group-focus-within:text-white/60 transition-colors">Attendance Status</label>
                <div className="relative">
                  <select required className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white font-montserrat text-xs focus:outline-none focus:border-white transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-[#0A0A0A]">
                      Select Status
                    </option>
                    <option value="present" className="bg-[#0A0A0A]">
                      I will be there
                    </option>
                    <option value="absent" className="bg-[#0A0A0A]">
                      Regretfully decline
                    </option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 text-[8px]">▼</div>
                </div>
              </div>

              <div className="group space-y-2">
                <label className="font-montserrat text-[8px] uppercase tracking-[0.3em] text-white/20 ml-1 group-focus-within:text-white/60 transition-colors">Message</label>
                <textarea
                  rows={3}
                  placeholder="Send your prayers..."
                  className="w-full bg-transparent border-b border-white/10 px-1 py-3 text-white font-montserrat text-xs focus:outline-none focus:border-white transition-all resize-none placeholder:text-white/5"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-white text-black font-montserrat text-[9px] font-bold uppercase tracking-[0.4em] py-5 flex items-center justify-center gap-4 group hover:bg-neutral-200 transition-colors"
              >
                Send Response <Send size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center border border-white/10 bg-white/[0.03] backdrop-blur-lg">
              <span className="font-reenie-beanie text-4xl text-white/60 block mb-4">Thank You</span>
              <h3 className="font-cinzel text-white text-lg mb-4 tracking-[0.3em]">RESPONSE RECEIVED</h3>
              <p className="font-montserrat text-[9px] text-white/30 uppercase tracking-[0.2em] leading-loose">
                We have saved your confirmation. <br /> See you soon.
              </p>
            </motion.div>
          )}
        </div>

        {/* --- WISHES LIST SECTION (Love Letters) --- */}
        <div className="space-y-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative text-left">
            <Quote size={30} className="text-white/5 absolute -top-4 -left-2" />
            <h2 className="font-cinzel text-2xl text-white tracking-[0.3em] uppercase">Love Letters</h2>
            <p className="font-montserrat text-[8px] text-white/30 uppercase tracking-[0.4em] mt-2">Messages from our beloved ones</p>
          </motion.div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id || index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.03] border border-white/5 p-6 rounded-sm group hover:bg-white/[0.05] transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-[9px] text-white/70 tracking-widest uppercase">{wish.name}</h4>
                    {wish.isAttending && <span className="text-[7px] font-montserrat text-emerald-500/60 tracking-widest uppercase border border-emerald-500/20 px-2 py-0.5 rounded-full">Attending</span>}
                  </div>
                  <p className="font-montserrat text-[11px] text-white/40 leading-relaxed font-light italic">"{wish.message}"</p>
                </div>
              </motion.div>
            ))}

            {wishes.length === 0 && (
              <div className="py-10 border-t border-white/5">
                <p className="font-montserrat text-[8px] uppercase tracking-[0.4em] text-white/20 italic">Be the first to leave a message...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
  .custom-scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
  }
`,
        }}
      />
    </section>
  )
}
