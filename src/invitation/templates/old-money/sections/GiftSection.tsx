import { motion } from "framer-motion"
import { Copy } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"
import { useState } from "react"

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
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Decorative Brand Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif italic text-stone-100 pointer-events-none select-none">Registry</div>

      <div className="max-w-2xl w-full z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-[10px] tracking-[0.6em] uppercase text-stone-400 block mb-6">A Token of Love</span>
          <h2 className="font-serif text-4xl md:text-6xl text-stone-800 italic mb-8">Wedding Registry</h2>
          <p className="text-[11px] md:text-xs leading-[2] text-stone-500 tracking-widest font-light italic max-w-md mx-auto">
            Your presence at our wedding is the greatest gift of all. However, should you wish to honor us with a gift, a contribution to our new home would be warmly appreciated.
          </p>
        </motion.div>

        {/* Bank Card (Old Money Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((card) => (
            <motion.div key={card.id} whileHover={{ y: -5 }} className="bg-white border border-stone-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center group transition-all">
              <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-2">{card.bank}</p>
              <p className="text-sm tracking-[0.2em] text-stone-800 font-medium mb-6">{card.number}</p>
              <button onClick={() => copyToClipboard(card.number || "", card.id)} className="flex items-center gap-2 text-[8px] tracking-[0.5em] uppercase text-stone-300 group-hover:text-stone-800 transition-colors">
                <Copy size={10} strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-40 group-hover/btn:opacity-100 text-stone-300 transition-opacity">{copiedId === card.id ? "Copied" : "Copy Details"}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-12 text-[8px] tracking-[0.3em] text-stone-300 uppercase">With our deepest gratitude</div>
    </section>
  )
}
