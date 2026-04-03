import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, MapPin, CheckCircle2 } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

interface GiftSectionProps {
  data: Invitation
}

// Data Dummy Rekening (Hanya untuk keperluan demo UI)

export default function GiftSection({ data }: GiftSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedAccount(number)
      setTimeout(() => setCopiedAccount(null), 2500)
    })
  }

  const ACCOUNT_DETAILS = [
    {
      type: data.bankName,
      holder: data.accountName,
      number: data.accountNo,
      icon: "/bank/bri.webp", // Tambahkan / di depan jika file ada di public/bank/
    },
    {
      type: data.bankName2,
      holder: data.accountName2,
      number: data.accountNo2,
      icon: "/bank/seabank.webp", // Tambahkan / di depan
    },
  ]

  const cardFadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] as const },
  }

  return (
    <section className="relative w-full py-28 px-6 flex flex-col items-center justify-center">
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute top-1/4 -right-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="font-cormorant-upright text-[12rem] text-white italic whitespace-nowrap leading-none">Wedding Gift</h2>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* HEADER SECTION */}
        <motion.div {...cardFadeUp} className="text-center mb-16 space-y-6 px-4">
          <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase font-light">Love Gift</h2>

          <p className="font-inter text-white/50 text-[11px] lg:text-xs leading-relaxed italic max-w-xs mx-auto">
            "Cinta, tawa, dan kebersamaan Anda adalah hadiah terindah. Namun, jika Anda ingin memberikan hadiah, segala bentuk tanda kasih untuk kehidupan baru kami akan sangat berarti."
          </p>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-6" />
        </motion.div>

        {/* REKENING / DIGITAL WALLET CARDS */}
        <div className="space-y-4 mb-6">
          {ACCOUNT_DETAILS.map((acc, index) => (
            <motion.div key={index} {...cardFadeUp} transition={{ delay: 0.1 * index }} className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.05] transition-colors">
              {/* Ikon Bank/Layanan */}
              <div className="w-14 h-14 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden p-2">
                <img
                  src={acc.icon}
                  alt={acc.type}
                  className="w-full h-full object-contain filter brightness-110"
                  onError={(e) => {
                    // Fallback jika gambar tidak ditemukan
                    ;(e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Bank"
                  }}
                />
              </div>

              {/* Info Rekening */}
              <div className="flex-1 space-y-0.5">
                <p className="font-inter text-white text-[13px] font-semibold tracking-wide uppercase leading-tight">{acc.holder}</p>
                <p className="font-inter text-white/50 text-xs font-medium tracking-wider">
                  {acc.type} • {acc.number}
                </p>
              </div>

              {/* Tombol Copy (Floating di Kanan) */}
              <button onClick={() => handleCopy(acc.number)} className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 active:scale-95 transition-transform">
                <AnimatePresence mode="wait">
                  {copiedAccount === acc.number ? (
                    <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle2 size={16} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Copy size={16} className="text-white/50" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* INFO KIRIM KADO (ALAMAT) */}
        <motion.div {...cardFadeUp} transition={{ delay: 0.3 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-white/[0.04] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center">
            <MapPin size={22} className="text-white/50" />
          </div>
          <div className="space-y-1 px-2">
            <h4 className="font-inter text-white text-[13px] font-bold tracking-[0.2em] uppercase mb-2">Kirim Kado</h4>
            <p className="font-inter text-white/50 text-[11px] leading-relaxed italic">{`${data.akadLocation}`}</p>
          </div>
        </motion.div>

        {/* DECORATIVE FOOTER */}
        <motion.div {...cardFadeUp} transition={{ delay: 0.5 }} className="mt-16 text-center">
          <p className="font-inter text-[9px] tracking-[0.6em] text-white/20 uppercase font-bold">with gratitude</p>
        </motion.div>
      </div>
    </section>
  )
}
