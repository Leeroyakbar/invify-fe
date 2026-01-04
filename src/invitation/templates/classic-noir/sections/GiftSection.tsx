import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Gift } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

export default function GiftSection({ data }: { data: Invitation }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const accounts = [
    {
      bank: data.bankName,
      number: data.accountNo,
      holder: data.accountName,
      id: "acc1",
    },
    {
      bank: data.bankName2,
      number: data.accountNo2,
      holder: data.accountName2,
      id: "acc2",
    },
  ]

  return (
    <section className="min-h-screen snap-start flex items-center justify-center px-6  text-white relative overflow-hidden">
      {/* Ornamen Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl w-full relative z-10 text-center">
        <div className="mb-12">
          <Gift className="w-8 h-8 mx-auto mb-4 opacity-30 stroke-[1px]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 block mb-2">Wedding Gift</span>
          <h2 className="font-serif text-3xl italic">Love & Blessing</h2>
          <p className="max-w-xs mx-auto text-[11px] leading-relaxed text-white/50 mt-4 font-light italic">Your well-wishes are a gift enough. But for those who have inquired, a wedding gift may be sent via:</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {accounts.map((acc) => (
            <motion.div key={acc.id} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 relative group overflow-hidden">
              {/* Tekstur kartu */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <h1 className="text-6xl font-serif font-bold italic">{acc.bank}</h1>
              </div>

              <div className="relative z-10 text-left">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-1">{acc.bank}</p>
                <h3 className="font-serif text-xl tracking-wider mb-4">{acc.number}</h3>
                <p className="text-[10px] tracking-widest uppercase opacity-70 mb-6">{acc.holder}</p>

                <button onClick={() => copyToClipboard(acc.number || "", acc.id)} className="flex items-center gap-2 group/btn">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                    {copiedId === acc.id ? <Check size={12} /> : <Copy size={12} />}
                  </div>
                  <span className="text-[9px] tracking-[0.2em] uppercase opacity-40 group-hover/btn:opacity-100 transition-opacity">{copiedId === acc.id ? "Copied" : "Copy Number"}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gift Alamat (Opsional jika ada data alamat kirim kado fisik) */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 p-6 border-t border-white/5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Thank you for your kindness</p>
        </motion.div>
      </motion.div>

      {/* Toast Feedback (Sama seperti yang kita buat untuk RSVP) */}
      <AnimatePresence>
        {copiedId && (
          <motion.div initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 10, x: "-50%" }} className="fixed bottom-10 left-1/2 z-[100]">
            <div className="bg-white text-black px-6 py-2 shadow-2xl flex items-center gap-3">
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold">Account Number Copied</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
