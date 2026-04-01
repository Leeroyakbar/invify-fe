/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import type { UserResponse } from "../pages/UserPage"
import type { TemplateResponse } from "../../types/TemplateResponse"
import CustomDropdownSearch from "./CustomDropdownSearch"
import type { InvitationRequest } from "../../types/InvitationRequest"
import type { InvitationResponseDetail } from "../../types/InvitationResponseDetail"

interface AddInvitationModalProps {
  isAddModalOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSave: (data: InvitationRequest) => void
  // Tambahkan props untuk data dinamis dari parent
  users: UserResponse[]
  templates: TemplateResponse[]
  initialData: InvitationResponseDetail | null
}
export function AddInvitationModal({ isAddModalOpen, isLoading, onClose, onSave, users, templates, initialData }: AddInvitationModalProps) {
  const [selectedUser, setSelectedUser] = useState<UserResponse | undefined>(() => users.find((u) => u.userId === initialData?.userId))
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateResponse | undefined>(() => templates.find((t) => t.templateId === initialData?.template?.templateId))
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const plan = initialData?.subscriptionPlan

    if (!plan) return "Basic"

    return plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()
  })
  const [expiredDate, setExpiredDate] = useState(initialData?.expiredDate || "")
  const [price, setPrice] = useState<string>(initialData?.price?.toString() || "")
  const [brideName, setBrideName] = useState<string>(initialData?.brideName || "")
  const [groomName, setGroomName] = useState<string>(initialData?.groomName || "")
  const [slug, setSlug] = useState<string>(initialData?.slug || "")

  const handleSave = () => {
    if (!selectedUser || !selectedTemplate || !brideName || !groomName) {
      toast.error("Data utama wajib diisi")
      return
    }

    // Kirim data administratif saja
    const requestData = {
      userId: selectedUser.userId,
      templateId: selectedTemplate.templateId,
      subscriptionPlan: selectedPlan.toUpperCase(),
      slug: slug,
      expiredDate: expiredDate,
      trxAmount: parseFloat(price),
      brideName: brideName,
      groomName: groomName,
      // Status default atau dari initialData
      activeStatus: initialData ? initialData.activeStatus : 1,
    }

    onSave(requestData as any)
  }

  return (
    <AnimatePresence>
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <motion.div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 space-y-8">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-serif font-bold text-stone-800">{initialData ? "Edit Undangan" : "Tambah Undangan"}</h2>
              <button onClick={onClose} className="cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <CustomDropdownSearch label="Customer" options={users.map((u) => u.fullName)} value={selectedUser?.fullName || ""} onChange={(name) => setSelectedUser(users.find((u) => u.fullName === name))} disabled={!!initialData} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500">Nama Pengantin Wanita (cth : Lili Rahma Yani)</label>
                <input value={brideName} onChange={(e) => setBrideName(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none focus:border-[#D5A853]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500">Nama Pengantin Pria (cth : Lee Roy Akbar)</label>
                <input value={groomName} onChange={(e) => setGroomName(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none focus:border-[#D5A853]" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-500">Slug (cth : Lili-Lee)</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none focus:border-[#D5A853]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CustomDropdownSearch label="Template" options={templates.map((t) => t.templateName)} value={selectedTemplate?.templateName || ""} onChange={(name) => setSelectedTemplate(templates.find((t) => t.templateName === name))} />
                <CustomDropdownSearch label="Paket" options={["Basic", "Premium", "Custom"]} value={selectedPlan} onChange={setSelectedPlan} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-500">Harga (Rp)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-500">Berlaku Hingga</label>
                  <input type="date" value={expiredDate} onChange={(e) => setExpiredDate(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none" />
                </div>
              </div>
            </div>

            <button onClick={handleSave} className="w-full bg-[#D5A853] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#D5A853]/20 hover:bg-[#b88f46] transition-all">
              {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Simpan"}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
