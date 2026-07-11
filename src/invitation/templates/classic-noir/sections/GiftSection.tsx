import { useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Gift } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"

export default function GiftSection({ data }: { data: Invitation }) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Kumpulan data rekening yang difilter otomatis jika datanya tidak diisi
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
  ].filter(acc => acc.number && acc.bank)

  // Formula transisi masuk sinematik (Cubic Bezier)
  const noirFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  return (
      <section className="min-h-screen snap-start flex items-center justify-center px-6 text-white relative bg-transparent subpixel-antialiased">
        <div className="max-w-md w-full relative z-10 text-center py-16 flex flex-col items-center">

          {/* HEADER SEKSI */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={noirFadeUp}
              className="mb-12 flex flex-col items-center"
          >
            <Gift className="w-5 h-5 mx-auto mb-4 opacity-20 stroke-[1.25px]" />
            <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-2 pl-[0.5em]">
            The Registry
          </span>
            <h2 className="font-serif text-3xl tracking-wide text-white/95">Love & Blessing</h2>
            <div className="h-px w-6 bg-white/20 my-4" />
            <p className="max-w-xs mx-auto text-[12px] leading-[1.75] text-white/50 font-lora font-light italic">
              Your well-wishes are a gift enough. But for those who have inquired, a wedding gift may be sent via:
            </p>
          </motion.div>

          {/* DISPLAY GRID REKENING EDITORIAL (Lanjutan kode ada di respon bawah) */}
          <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-6 w-full"
          >
            {accounts.map((acc) => (
                <AccountCard
                    key={acc.id}
                    bank={acc.bank}
                    number={acc.number}
                    holder={acc.holder}
                    id={acc.id}
                    isCopied={copiedId === acc.id}
                    onCopy={copyToClipboard}
                />
            ))}
          </motion.div>

          {/* FOOTER NOTE MINIMALIS */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={noirFadeUp}
              className="mt-12 pt-6 border-t border-white/5 w-full"
          >
            <p className="text-[8px] tracking-[0.4em] uppercase text-white/20 font-sans font-bold pl-[0.4em]">
              Thank you for your kindness
            </p>
          </motion.div>
        </div>

        {/* TOAST FEEDBACK CINEMATIC MONOCHROME */}
        <AnimatePresence>
          {copiedId && (
              <motion.div
                  initial={{ opacity: 0, y: 15, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 10, x: "-50%" }}
                  className="fixed bottom-10 left-1/2 z-[150] min-w-[240px]"
              >
                <div className="bg-white text-black px-6 py-3 shadow-2xl flex items-center justify-center gap-2.5 rounded-none">
                  <div className="w-1 h-1 bg-black rotate-45" />
                  <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-bold">
                Number Copied
              </span>
                  <div className="w-1 h-1 bg-black rotate-45" />
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: ACCOUNT CARD (MEMOIZED FOR FPS)
// =========================================================
interface AccountCardProps {
  bank: string
  number: string
  holder: string
  id: string
  isCopied: boolean
  onCopy: (number: string, id: string) => void
}

const AccountCard = memo(({ bank, number, holder, id, isCopied, onCopy }: AccountCardProps) => {
  const cardReveal = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <motion.div
          variants={cardReveal}
          className="border-l border-white/5 hover:border-white/20 p-5 relative group transition-colors duration-500 text-left bg-transparent w-full transform-gpu"
      >
        {/* Teks Sandi Singkat Nama Bank di Latar Belakang */}
        <span className="absolute right-2 top-2 font-serif text-[3.5rem] font-bold italic text-white/[0.01] group-hover:text-white/[0.03] select-none pointer-events-none leading-none z-0 transition-colors duration-500 tracking-tighter">
        {bank}
      </span>

        <div className="relative z-10 space-y-1">
          {/* Label Identitas Rekening */}
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/30 font-sans font-bold pl-[0.3em]">
            {bank} Account
          </p>

          {/* Nomor Rekening */}
          <h3 className="font-serif text-xl tracking-[0.05em] text-white/90 font-light pt-0.5">
            {number}
          </h3>

          {/* Nama Pemilik Rekening */}
          <p className="text-[10px] tracking-widest uppercase text-white/50 font-sans font-medium pt-0.5 pl-[0.1em]">
            An. {holder}
          </p>

          {/* INTERAKSI KAPSUL COPY NUMBER */}
          <div className="pt-3">
            <button
                onClick={() => onCopy(number, id)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/[0.01] backdrop-blur-xs transition-all duration-500 hover:bg-white hover:border-white group/btn cursor-pointer text-white"
            >
              {/* Animasi Ikon Status Salin */}
              <div className="text-white/40 [button:hover_&]:text-black transition-colors duration-500">
                {isCopied ? <Check size={11} /> : <Copy size={11} className="stroke-[1.5px]" />}
              </div>

              <span className="font-sans text-[9px] tracking-[0.15em] text-white/60 [button:hover_&]:text-black font-semibold uppercase transition-colors duration-500">
              {isCopied ? "Copied" : "Copy Account"}
            </span>
            </button>
          </div>
        </div>
      </motion.div>
  )
})

AccountCard.displayName = "AccountCard"
