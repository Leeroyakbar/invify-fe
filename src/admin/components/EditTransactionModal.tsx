import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"
import type { Transaction } from "../pages/TransactionPage"
import CustomDropdown from "./CustomDropdown"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<Transaction>) => void
  initialData: Transaction | null
}

export default function EditTransactionModal({ isOpen, onClose, onSave, initialData }: EditModalProps) {
  // State lokal untuk form
  const [status, setStatus] = useState(initialData?.status || "Pending")
  const [packageName, setPackageName] = useState(initialData?.package || "Basic")

  const handleSubmit = () => {
    onSave({
      status: status as "Lunas" | "Pending" | "Gagal",
      package: packageName as "Basic" | "Premium" | "Custom",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-lg rounded-4xl shadow-2xl z-10 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif italic text-stone-800">Update Transaksi</h3>
                  <p className="text-xs text-stone-400 mt-1">ID: {initialData?.id}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
                  <X size={20} />
                </button>
              </div>

              {/* Info Pelanggan (Read Only) */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Pelanggan</p>
                <p className="text-sm font-bold text-stone-800">{initialData?.user.name}</p>
                <p className="text-xs text-stone-500">{initialData?.user.email}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Edit Paket */}
                <div className="space-y-1">
                  <CustomDropdown
                    label="Status Pembayaran"
                    options={["Lunas", "Pending", "Gagal"]}
                    value={status}
                    // Gunakan callback manual dan 'as' (Type Assertion)
                    onChange={(val) => setStatus(val as "Lunas" | "Pending" | "Gagal")}
                  />{" "}
                </div>

                {/* Edit Status */}
                <div className="space-y-1">
                  <CustomDropdown label="Pilih Paket" options={["Basic", "Premium", "Custom"]} value={packageName} onChange={(val) => setPackageName(val as "Basic" | "Premium" | "Custom")} />{" "}
                </div>
              </div>

              <button onClick={handleSubmit} className="w-full bg-[#D4A853] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#D4A853]/30 hover:bg-[#c29645] transition-all">
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
