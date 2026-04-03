import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Send, User, CheckCircle2, MessageSquare } from "lucide-react"

export default function RSVPSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    message: "",
  })
  const [isError, setIsError] = useState(false)

  const handleNext = () => {
    if (step === 1 && formData.name.trim() === "") {
      setIsError(true)
      return
    }
    setIsError(false)
    setStep(step + 1)
  }

  const handleSubmit = () => {
    // Logika pengiriman data ke database/API Anda
    console.log("Data Sent:", formData)
    setStep(4) // Step 4 sebagai Success State
  }

  const steps = [
    { id: 1, title: "Siapa Nama Anda?", icon: <User size={18} /> },
    { id: 2, title: "Apakah Anda Akan Hadir?", icon: <CheckCircle2 size={18} /> },
    { id: 3, title: "Berikan Ucapan Doa", icon: <MessageSquare size={18} /> },
  ]

  return (
    <section className="relative w-full py-24 px-8 flex flex-col items-center overflow-hidden">
      {/* BACKGROUND DECORATIVE TYPOGRAPHY */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none translate-x-1/4">
        <h2 className="font-cormorant-upright text-[15rem] text-white italic">RSVP</h2>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12 space-y-4">
          <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase font-light">Reservation</h2>
          <p className="font-inter text-white/50 text-[11px] tracking-[0.3em] uppercase">Konfirmasi Kehadiran</p>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-6" />
        </motion.div>

        {/* STEPPER PROGRESS */}
        {step < 4 && (
          <div className="flex justify-between mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
            {steps.map((s) => (
              <div
                key={s.id}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${step >= s.id ? "bg-white border-white text-black" : "bg-black border-white/10 text-white/30"}`}
              >
                <span className="text-[10px] font-bold">{s.id}</span>
              </div>
            ))}
          </div>
        )}

        {/* MULTI-STEP FORM CARD */}
        <div className="relative min-h-[300px] bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {/* STEP 1: NAMA */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">Full Name</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-transparent border-b ${isError ? "border-red-500/50" : "border-white/10"} py-3 text-white focus:outline-none focus:border-white transition-colors font-inter text-sm placeholder:text-white/10`}
                  />
                  {isError && <p className="text-red-400 text-[10px] font-inter italic tracking-wide">Silakan isi nama Anda terlebih dahulu.</p>}
                </div>
                <button onClick={handleNext} className="w-full py-4 bg-white text-black rounded-sm font-inter text-[10px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-2 mt-8">
                  Next Step <ChevronRight size={14} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: KEHADIRAN */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center">
                <p className="text-white text-sm font-inter mb-8 tracking-wide">Halo {formData.name}, apakah Anda akan hadir?</p>
                <div className="grid grid-cols-1 gap-3">
                  {["Hadir", "Tidak Hadir"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, status: opt })}
                      className={`py-3 rounded-sm border font-inter text-[10px] tracking-[0.3em] uppercase transition-all ${
                        formData.status === opt ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!formData.status}
                  onClick={handleNext}
                  className={`w-full py-4 bg-white text-black rounded-sm font-inter text-[10px] tracking-[0.4em] uppercase font-bold mt-8 flex items-center justify-center gap-2 ${!formData.status && "opacity-30"}`}
                >
                  Lanjut <ChevronRight size={14} />
                </button>
              </motion.div>
            )}

            {/* STEP 3: UCAPAN */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">Your Wishes</label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan ucapan dan doa Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/30 transition-colors font-inter text-sm placeholder:text-white/10 resize-none"
                  />
                </div>
                <button onClick={handleSubmit} className="w-full py-4 bg-white text-black rounded-sm font-inter text-[10px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-2">
                  Kirim Pesan <Send size={14} />
                </button>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[250px] text-center space-y-4">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h4 className="text-white font-cormorant-upright text-2xl tracking-widest uppercase">Terima Kasih</h4>
                <p className="text-white/50 font-inter text-[11px] leading-relaxed italic max-w-[200px]">Konfirmasi Anda telah tersimpan. Sampai jumpa di hari bahagia kami.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
