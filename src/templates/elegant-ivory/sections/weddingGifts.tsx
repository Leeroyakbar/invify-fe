import { motion } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"
import { Copy, Gift } from "lucide-react"
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
    <section className="relative px-6 py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F2] via-[#F8F6F2] to-white" />

      <div className="relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <Gift className="mx-auto mb-4 text-[#C8A97E]" size={32} />
          <h2 className="font-playfair text-3xl text-[#2F3E46]">Wedding Gifts</h2>
          <p className="mt-3 font-inter text-sm text-[#6B7280] max-w-md mx-auto">Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila berkenan, kami menyediakan tanda kasih berikut.</p>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
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
    <motion.div whileHover={{ y: -4 }} className="relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-lg">
      {/* Accent Line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#C8A97E]" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8FA8A1]">{label}</p>

      <p className="mt-4 font-playfair text-lg text-[#2F3E46]">{accountName}</p>

      <p className="mt-1 font-inter text-sm tracking-wider text-[#6B7280]">{accountNo}</p>

      <button onClick={onCopy} className="mt-6 flex items-center gap-2 rounded-full border border-[#C8A97E] px-4 py-2 text-sm text-[#2F3E46] transition hover:bg-[#C8A97E]/10">
        <Copy size={16} />
        {copied ? "Tersalin" : "Salin Nomor"}
      </button>
    </motion.div>
  )
}
