import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Copy, Check, Gift, Landmark, CreditCard, ChevronDown } from "lucide-react"
import { type Invitation } from "../../../../types/Invitation"

export default function GiftSection({ data }: { data: Invitation }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const accounts = [
    {
      bank: data.bankName || "BRI",
      number: data.accountNo || "0000000000",
      name: data.accountName || "Nama Penerima",
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      bank: data.bankName2 || "SeaBank",
      number: data.accountNo2 || "0000000000",
      name: data.accountName2 || "Nama Penerima",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="gift" className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      {/* 1. TOP LANDSCAPE IMAGE (Visual Breaker) */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <motion.div initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative h-75 md:h-100 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
          {/* Silahkan ganti src dengan foto landscape favoritmu */}
          <img src="https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/rahma/gallery-6.webp" className="w-full h-full object-cover grayscale-30 brightness-75" alt="Landscape Decoration" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent" />

          <div className="absolute bottom-10 left-10 space-y-2">
            <span className="font-montserrat text-[10px] uppercase tracking-[0.8em] text-white/40 block">Your kindness means</span>
            <h3 className="font-cinzel text-3xl text-white tracking-widest uppercase">Everything To Us</h3>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* 2. HEADER & TOGGLE BUTTON */}
        <div className="text-center mb-12 space-y-8">
          <div className="space-y-4">
            <h2 className="font-cinzel text-3xl text-white tracking-widest uppercase">Wedding Gift</h2>
            <p className="font-montserrat text-[12px] text-white/40 max-w-md mx-auto leading-relaxed">Doa restu Anda sudah lebih dari cukup. Namun bagi yang ingin memberikan tanda kasih, silakan klik tombol di bawah ini.</p>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 rounded-full text-white/80 transition-all hover:bg-white hover:text-black">
            <Gift size={18} className={isOpen ? "rotate-12 transition-transform" : ""} />
            <span className="font-montserrat text-[10px] uppercase tracking-[0.4em] font-medium">{isOpen ? "Tutup Informasi" : "Buka Wedding Gift"}</span>
            <ChevronDown size={16} className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* 3. INTERACTIVE CONTENT (Dormant at start) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0, y: 20 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: 20 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6 pt-10 pb-20">
                {accounts.map((acc, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="group p-8 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-xl relative">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/60">{acc.icon}</div>
                        <span className="font-cinzel text-sm text-white/20 tracking-widest">{acc.bank}</span>
                      </div>

                      <div className="space-y-1">
                        <p className="font-montserrat text-xl md:text-base text-white tracking-widest">{acc.number}</p>
                        <p className="font-montserrat text-[10px] text-white/40 uppercase tracking-widest italic">a.n {acc.name}</p>
                      </div>

                      <button
                        onClick={() => handleCopy(acc.number, idx)}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white/5 border border-white/10 text-white/40 font-montserrat text-[9px] uppercase tracking-[0.2em] hover:text-white hover:border-white/40 transition-all"
                      >
                        {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copiedIndex === idx ? "Copied" : "Copy Account"}
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Shipping Address - Horizontal Full Width */}
                <div className="md:col-span-2 p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                  <p className="font-montserrat text-[10px] text-white/20 uppercase tracking-[0.4em] mb-4">Mailing Address</p>
                  <p className="font-montserrat text-[12px] text-white/50 leading-loose max-w-lg mx-auto">{data.receptionLocation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
