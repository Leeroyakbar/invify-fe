import { X, Save, User, Mail } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { UserResponse } from "../pages/UserPage"
import CustomDropdown from "./CustomDropdown"

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserResponse | null
  onSave: (data: Partial<UserResponse>) => void
}

export default function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<Partial<UserResponse>>(user || {})

  console.log("form data:", formData)

  if (!isOpen || !user) return null
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-50 flex justify-between items-center bg-stone-50/50">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-800 italic">Edit Profil Pengguna</h2>
              <p className="text-xs text-stone-400 font-light">ID Pengguna: #{user.userId}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-stone-300 hover:text-rose-500 transition-all shadow-sm">
              <X size={20} />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-5">
            {/* Input Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 flex items-center gap-2">
                <User size={12} /> Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.fullName || ""}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4A853] transition-all font-medium text-stone-700"
              />
            </div>

            {/* Input Status & Paket (Grid 2 Kolom) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <CustomDropdown
                  label="Pilih Status"
                  options={["Active", "Non Active"]}
                  value={formData?.activeStatus === 1 ? "Active" : "Non Active"}
                  onChange={(val) => setFormData({ ...formData, activeStatus: val === "Active" ? 1 : 0 })}
                />{" "}
              </div>

              <div className="space-y-1.5">
                <CustomDropdown label="Pilih Paket" options={["Basic", "Premium", "Custom"]} value={formData?.subscriptionPlan || ""} onChange={(val) => setFormData({ ...formData, subscriptionPlan: val })} />{" "}
              </div>
            </div>

            {/* Email (Read Only) */}
            <div className="space-y-1.5 opacity-60">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 flex items-center gap-2">
                <Mail size={12} /> Email (Permanen)
              </label>
              <input type="text" value={user.email} disabled className="w-full bg-stone-100 border border-stone-100 rounded-xl px-4 py-3 text-sm cursor-not-allowed font-mono text-stone-500" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-stone-50/50 border-t border-stone-50 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-stone-500 text-sm font-bold hover:bg-white transition-all uppercase tracking-widest">
              Batal
            </button>
            <button
              onClick={() => onSave(formData)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#D4A853] text-white text-sm font-bold hover:bg-[#b88d3e] transition-all shadow-lg shadow-[#D4A853]/20 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Save size={16} /> Simpan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
