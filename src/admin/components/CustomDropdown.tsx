import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

interface CustomDropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void // Fungsi yang menerima string
}
export default function CustomDropdown({ label, options, value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2 relative w-full">
      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-widest">{label}</label>

      <div className="relative">
        {/* Tombol Utama */}
        <button onClick={() => setIsOpen(!isOpen)} className="w-full bg-white border border-stone-100 rounded-xl py-2.5 px-4 text-sm text-stone-600 flex justify-between items-center hover:border-[#D4A853] transition-all shadow-sm">
          <span className={value !== "Semua Status" && value !== "Semua Paket" ? "text-stone-600" : ""}>{value}</span>
          <ChevronDown size={14} className={`text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Menu Pilihan (Floating) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay untuk menutup saat klik luar */}
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-stone-50 rounded-2xl shadow-xl shadow-stone-200/40 py-2 z-20 min-w-[200px]"
              >
                {options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${value === opt ? "text-[#D4A853] bg-[#D4A853]/5 font-medium" : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"}`}
                  >
                    <div className="w-4 flex items-center justify-center">{value === opt && <Check size={14} strokeWidth={3} />}</div>
                    {opt}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
