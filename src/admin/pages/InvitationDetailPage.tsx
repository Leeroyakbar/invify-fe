import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { ChevronLeft, Save, Edit3, Eye, Loader2 } from "lucide-react"
import { toast } from "sonner"
import api from "../../api/axiosConfig"
import { InvitationRequest } from "./AdminInvitationPage"

export default function InvitationDetailPage() {
  const { id } = useParams() // Ambil ID dari URL
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // State Mode: 'view' atau 'edit'
  const isEditMode = searchParams.get("mode") === "edit"
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // State Data (Gunakan struktur yang sama dengan Modal)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/api/admin/invitations/${id}`)
        if (response.data.success) {
          setFormData(response.data.data)
        }
      } catch (error) {
        toast.error("Gagal memuat detail undangan")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  const handleUpdate = async () => {
    setIsSaving(true)
    try {
      // Logic pengiriman Multipart Form Data (Sama seperti handleSave di modal)
      // const response = await api.put(`/api/admin/invitations/update/${id}`, data);
      toast.success("Undangan berhasil diperbarui!")
      setSearchParams({ mode: "view" }) // Balik ke mode view setelah save
    } catch (error) {
      toast.error("Gagal memperbarui data")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* HEADER NAVIGATION */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-stone-100 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-stone-800">{isEditMode ? "Edit Undangan" : "Detail Undangan"}</h1>
            <p className="text-xs text-stone-400 font-mono">{id}</p>
          </div>
        </div>

        <div className="flex gap-3">
          {isEditMode ? (
            <>
              <button onClick={() => setSearchParams({ mode: "view" })} className="px-6 py-2 text-sm font-bold text-stone-500 hover:bg-stone-50 rounded-xl transition-all">
                Batal
              </button>
              <button onClick={handleUpdate} disabled={isSaving} className="bg-[#D5A853] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#D5A853]/20 flex items-center gap-2">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Simpan Perubahan
              </button>
            </>
          ) : (
            <button onClick={() => setSearchParams({ mode: "edit" })} className="bg-stone-800 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-all">
              <Edit3 size={16} />
              Edit Data
            </button>
          )}
        </div>
      </div>

      {/* BODY CONTENT (Gunakan Layout yang Mirip Modal) */}
      <div className={`space-y-8 ${!isEditMode ? "pointer-events-none opacity-90" : ""}`}>
        {/* Section 1: Couple Info */}
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[#D5A853] uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-px bg-[#D5A853]"></span> Informasi Pasangan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gunakan Input yang sama seperti di Modal, tapi tambahkan atribut disabled={!isEditMode} */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400">NAMA WANITA</label>
              <input
                type="text"
                value={formData?.brideName}
                disabled={!isEditMode}
                className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:border-[#D5A853] disabled:bg-transparent disabled:border-transparent disabled:px-0 disabled:text-xl disabled:font-serif disabled:font-bold"
              />
            </div>
            {/* ... Field lainnya ... */}
          </div>
        </div>

        {/* Section 2: Preview Template (Hanya tampil di View Mode) */}
        {!isEditMode && (
          <div className="bg-stone-900 p-8 rounded-3xl text-white flex justify-between items-center">
            <div>
              <p className="text-stone-400 text-xs uppercase font-bold tracking-widest">Live Preview</p>
              <h4 className="text-2xl font-serif">Lihat hasil undangan online</h4>
            </div>
            <a href={`https://invify.com/${formData?.slug}`} target="_blank" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
              <Eye size={18} />
              Buka Link
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
