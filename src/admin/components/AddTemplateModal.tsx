import { AnimatePresence, motion } from "framer-motion"
import { X, Upload } from "lucide-react"

export default function AddTemplateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[32px] shadow-2xl z-10 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif italic text-stone-800">Tambah Template Baru</h3>
                <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Upload Preview</label>
                  <div className="border-2 border-dashed border-stone-100 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400 hover:border-[#D4A853]/50 transition-colors cursor-pointer">
                    <Upload size={24} className="mb-2" />
                    <span className="text-xs italic">Klik untuk upload foto template</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nama Template</label>
                  <input className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#D4A853]/20 transition-all" placeholder="Contoh: Modern Gold" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Kategori</label>
                  <select className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm outline-none">
                    <option>Elegant</option>
                    <option>Modern</option>
                    <option>Floral</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-[#D4A853] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#D4A853]/30 hover:bg-[#c29645] transition-all">Simpan Template</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
