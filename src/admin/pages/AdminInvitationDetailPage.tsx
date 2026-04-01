/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Download, Plus, Save, Trash2, Edit2, Upload, FileSpreadsheet } from "lucide-react"
import { useState, useRef, useCallback, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import api from "../../api/axiosConfig"
import type { GuestData } from "../../types/GuestData"

export default function AdminInvitationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [guests, setGuests] = useState<GuestData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const fetchGuests = useCallback(async () => {
    setIsProcessing(true)
    try {
      const response = await api.get(`/api/admin/guests/${id}`)
      if (response.data.success) {
        if (!response.data.data) {
          setGuests([])
        } else {
          const mappedGuests = response.data.data.map((g: any) => ({
            guestId: g.guestId,
            tempId: g.guestId,
            guestName: g.guestName,
            isSaved: true,
          }))
          setGuests(mappedGuests)
        }
      }
    } catch (error) {
      toast.error("Gagal mengambil daftar tamu")
    } finally {
      setIsProcessing(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchGuests()
    }
  }, [id, fetchGuests])

  // 1. HANDLER UPLOAD EXCEL
  const handleExportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setIsProcessing(true)
    try {
      // Backend memproses excel dan mengembalikan JSON list tamu
      const res = await api.post(`/api/admin/guests/process-excel`, formData)

      if (res.data.success) {
        // Gabungkan data lama dengan data baru dari excel
        const newGuests = res.data.data.map((g: any) => ({
          guestId: crypto.randomUUID(),
          tempId: Math.random().toString(36).substr(2, 9),
          guestName: g.guestName,
          isSaved: false, // Biarkan editable agar admin bisa review
        }))
        setGuests((prev) => [...prev, ...newGuests])
        toast.success("Excel berhasil diproses. Silahkan review data tamu.")
      }
    } catch (error) {
      toast.error("Gagal memproses file excel")
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  // 2. HANDLER ADD MANUAL (Case Sedikit)
  const addGuestManual = () => {
    const newGuest: GuestData = {
      guestId: crypto.randomUUID(),
      tempId: Math.random().toString(36).substr(2, 9),
      guestName: "",
      isSaved: false,
    }
    setGuests((prev) => [newGuest, ...prev])
  }

  // 3. HANDLER UPDATE LOCAL STATE
  const updateGuestName = (tempId: string, newName: string) => {
    setGuests((prev) => prev.map((g) => (g.tempId === tempId ? { ...g, guestName: newName } : g)))
  }

  const toggleEdit = (tempId: string) => {
    setGuests((prev) => prev.map((g) => (g.tempId === tempId ? { ...g, isSaved: !g.isSaved } : g)))
  }

  // 4. SUBMIT AKHIR (SAVE ALL)
  const handleSaveAll = async () => {
    setIsProcessing(true)
    try {
      const payload = {
        invitationId: id,
        // Kirim guestId jika ada (untuk update), jika tidak ada berarti tamu baru
        guests: guests.map((g) => ({
          guestId: g.guestId || null,
          name: g.guestName,
        })),
      }

      const res = await api.post(`/api/admin/guests/save-batch`, payload)

      if (res.data.success) {
        toast.success("Semua perubahan berhasil disimpan!")
        fetchGuests() // Refresh data agar semua dapet guestId dari backend
      }
    } catch (error) {
      toast.error("Gagal menyimpan perubahan")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Kembali</span>
        </button>
        <div className="flex gap-3">
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 border border-emerald-100 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-all">
            <FileSpreadsheet size={18} />
            Import Excel
          </button>
          <input type="file" ref={fileInputRef} onChange={handleExportExcel} className="hidden" accept=".xlsx, .xls" />

          <button onClick={addGuestManual} className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-xl text-sm font-bold hover:bg-stone-700">
            <Plus size={18} />
            Tambah Tamu
          </button>
        </div>
      </div>

      {/* TABLE DATA TAMU */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 tracking-widest">No</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 tracking-widest">Nama Tamu</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {guests.map((guest, index) => (
              <tr key={guest.tempId} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4 text-xs text-stone-400 font-mono">{index + 1}</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    disabled={guest.isSaved}
                    value={guest.guestName}
                    onChange={(e) => updateGuestName(guest.tempId, e.target.value)}
                    placeholder="Masukkan nama tamu..."
                    className={`w-full max-w-md bg-transparent border-b py-1 text-sm outline-none transition-all
                      ${guest.isSaved ? "border-transparent text-stone-800 font-medium" : "border-stone-200 text-[#D4A853] focus:border-[#D4A853]"}`}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => toggleEdit(guest.tempId)} className="p-2 text-stone-400 hover:text-stone-800">
                      {guest.isSaved ? <Edit2 size={16} /> : <Save size={16} className="text-blue-500" />}
                    </button>
                    <button onClick={() => setGuests((prev) => prev.filter((g) => g.tempId !== guest.tempId))} className="p-2 text-stone-400 hover:text-rose-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {guests.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-stone-400 italic text-sm">
                  Belum ada data tamu. Import excel atau tambah manual.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FLOATING SAVE BAR */}
      {guests.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-stone-100 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-8 z-30 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Tamu</span>
            <span className="text-lg font-bold text-stone-800">{guests.length} Orang</span>
          </div>
          <button onClick={handleSaveAll} disabled={isProcessing} className="bg-[#D5A853] hover:bg-[#b88f46] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#D5A853]/30 flex items-center gap-2 disabled:opacity-50">
            {isProcessing ? "Menyimpan..." : "Simpan Semua Perubahan"}
          </button>
        </div>
      )}
    </div>
  )
}
