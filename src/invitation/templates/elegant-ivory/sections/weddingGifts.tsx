import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"
import { Copy, CreditCard, Check } from "lucide-react"
import { useState } from "react"

interface Props {
  data: Invitation
}

export default function WeddingGiftsSection({ data }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="relative bg-[#0A0A0A] px-6 py-28 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4A853]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-bodoni italic text-4xl text-white">Wedding Gift</h2>
          <div className="h-[1px] w-12 bg-[#D4A853]/30 mx-auto mt-6" />

          <p className="mt-8 font-lora text-[13px] leading-relaxed text-white/50 max-w-sm mx-auto italic">
            "Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila berkenan, kami menyediakan tanda kasih melalui saluran berikut."
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <GiftCard label={data.bankName} accountName={data.accountName} accountNo={data.accountNo} onCopy={() => copyToClipboard(data.accountNo, "bank1")} copied={copied === "bank1"} />

          <GiftCard label={data.bankName2} accountName={data.accountName2} accountNo={data.accountNo2} onCopy={() => copyToClipboard(data.accountNo2, "bank2")} copied={copied === "bank2"} />
        </div>
      </div>
    </section>
  )
}

interface GiftCardProps {
  label: string
  accountName: string
  accountNo: string
  onCopy: () => void
  copied: boolean
}

function GiftCard({ label, accountName, accountNo, onCopy, copied }: GiftCardProps) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 p-8 shadow-2xl">
      {/* Decorative SVG Pattern (Subtle) */}
      <div className="absolute top-[-20%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
        <CreditCard size={200} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="h-10 w-14 rounded-md bg-gradient-to-br from-[#D4A853]/20 to-transparent border border-[#D4A853]/30 flex items-center justify-center">
            <div className="h-6 w-8 rounded bg-[#D4A853]/10 border border-[#D4A853]/20" /> {/* Chip Sim */}
          </div>
          <span className="font-bodoni italic text-xl text-[#D4A853] opacity-80">{label}</span>
        </div>

        <div className="space-y-1 mb-8">
          <p className="font-mono text-xl tracking-[0.2em] text-white/90">
            {accountNo.replace(/\d{4}(?=.)/g, "$& ")} {/* Auto spacing per 4 digit */}
          </p>
          <p className="font-lora text-[11px] uppercase tracking-[0.3em] text-[#D4A853]/60">Account Holder</p>
          <p className="font-bodoni text-lg text-white group-hover:text-[#D4A853] transition-colors duration-500">{accountName}</p>
        </div>

        <button
          onClick={onCopy}
          className={`
            w-full flex p-4 items-center justify-center gap-2  rounded-xl border transition-all duration-500 text-xs tracking-widest uppercase font-bold
            ${copied ? "bg-green-500/10 border-green-500/50 text-green-500" : "bg-white/5 border-white/10 text-white/70 hover:bg-[#D4A853] hover:text-black hover:border-[#D4A853]"}
          `}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Berhasil Disalin" : "Salin No. Rekening"}
        </button>
      </div>
    </motion.div>
  )
}
