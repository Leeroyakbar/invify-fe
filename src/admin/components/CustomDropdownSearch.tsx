import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Search } from "lucide-react" // Tambah icon Search
import { useState } from "react"

interface CustomDropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void
}

export default function CustomDropdownSearch({ label, options, value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter options berdasarkan apa yang diketik admin
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-2 relative w-full">
      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-widest">{label}</label>

      <div className="relative">
        {/* Tombol Utama */}
        <button
          type="button" // Biasakan tambah type="button" agar tidak trigger submit form
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-stone-100 rounded-xl py-2.5 px-4 text-sm text-stone-600 flex justify-between items-center hover:border-[#D4A853] transition-all shadow-sm"
        >
          <span className={value ? "text-stone-800 font-medium" : "text-stone-400 italic"}>{value || `Pilih ${label}...`}</span>
          <ChevronDown size={14} className={`text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay untuk menutup klik luar */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setIsOpen(false)
                  setSearchTerm("") // Reset search saat tutup
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-stone-50 rounded-2xl shadow-xl shadow-stone-200/40 py-2 z-20 overflow-hidden"
              >
                {/* --- INPUT SEARCH --- */}
                <div className="px-3 pb-2 pt-1 border-b border-stone-50 mb-1">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 text-stone-300" size={14} />
                    <input
                      autoFocus // Langsung bisa ngetik saat dropdown buka
                      type="text"
                      placeholder="Cari..."
                      className="w-full bg-stone-50 border-none rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-[#D4A853]/30 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* --- LIST OPTIONS --- */}
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt: string) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          onChange(opt)
                          setIsOpen(false)
                          setSearchTerm("")
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${value === opt ? "text-[#D4A853] bg-[#D4A853]/5 font-medium" : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"}`}
                      >
                        <div className="w-4 flex items-center justify-center">{value === opt && <Check size={14} strokeWidth={3} />}</div>
                        {opt}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-xs text-stone-400 italic">Data tidak ditemukan</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
