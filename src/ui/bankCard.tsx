import { useState } from "react"
import { Clipboard, Check } from "lucide-react"

export default function BankCard({ bank, account, name }: { bank: string; account: string; name: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(account)
    setCopied(true)
    // Kembalikan ke icon semula setelah 2 detik
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative w-full rounded-2xl bg-neutral-100 overflow-hidden px-6 py-5 text-left shadow-lg border border-neutral-200">
      {/* ORNAMEN OMBAK (WAVE) */}
      <div className="absolute top-0 right-0 z-0 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100C40 80 60 120 100 100C140 80 160 120 200 100V200H0V100Z" fill="currentColor" className="text-neutral-500" />
          <path d="M0 130C30 115 50 145 80 130C110 115 130 145 160 130C190 115 210 145 240 130V200H0V130Z" fill="currentColor" className="text-neutral-400" />
        </svg>
      </div>

      {/* CHIP KARTU (Aksen ATM) */}
      <div className="w-10 h-8 bg-linear-to-br from-yellow-400 to-yellow-600 rounded-md mb-4 opacity-80 shadow-inner" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <p className="text-[16px] font-monserrat font-bold tracking-widest uppercase text-neutral-500">{bank}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <p className="text-lg font-mono tracking-[0.15em] text-neutral-800">{account}</p>

            {/* TOMBOL SALIN INTERAKTIF */}
            <button onClick={handleCopy} className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-neutral-200 transition-all duration-300 group">
              {copied ? (
                <div className="flex items-center gap-1">
                  <Check size={14} className="text-green-600" />
                  <span className="text-[10px] font-medium text-green-600">Disalin</span>
                </div>
              ) : (
                <Clipboard size={14} className="text-neutral-400 group-hover:text-gold transition-colors" />
              )}
            </button>
          </div>
          <p className="text-[10px] uppercase tracking-widest mt-2 text-neutral-500 font-medium">a.n {name}</p>
        </div>
      </div>

      {/* GLOSS EFFECT (Kilauan Kartu) */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  )
}
