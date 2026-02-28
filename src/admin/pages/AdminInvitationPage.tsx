import { Filter, Search, X } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import CustomDropdown from "../components/CustomDropdown"
import DataTable, { type Column } from "../components/DataTable"
import { toast } from "sonner"
import api from "../../api/axiosConfig"
import { AddInvitationModal } from "../components/AddInvitationModal"
import { type UserResponse } from "./UserPage"
import type { TemplateResponse } from "./TemplatePage"
import axios from "axios"

// 1. Definisikan Interface yang Akurat
interface InvitationResponse {
  invitationId: string
  coupleName: string // Sesuaikan dengan key di invitationsData
  templateName: string
  activeStatus: number
  templateCategory: string
  slug: string
  expiredDate: string // Gunakan string karena datanya berupa "YYYY-MM-DD"
}

export interface InvitationRequest {
  coupleName: string
  templateId: string
  subscriptionPlan: string
  bridePhoto: File
  groomPhoto: File
  gallery: File[]
  musicBackground: string
  eventJson: string
  videoBackground: File
}

// 3. Konfigurasi Kolom yang Benar
// Pastikan Column diimport dari file DataTable atau didefinisikan ulang
const columns: Column<InvitationResponse>[] = [
  {
    header: "Pasangan",
    key: "coupleName",
    className: "font-bold text-stone-800",
  },
  {
    header: "Template",
    key: "templateName",
    className: "text-stone-500 italic",
  },
  {
    header: "Slug",
    key: "slug", // Key ini digunakan di render di bawah
    render: (item) => <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-600 rounded-full text-[9px] font-bold uppercase italic tracking-wider">{item.slug}</span>,
  },
  {
    header: "Status",
    key: "activeStatus",
    render: (item) => (
      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${item.activeStatus === 1 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{item.activeStatus === 1 ? "Aktif" : "Non-Aktif"}</span>
    ),
  },
  {
    header: "Berlaku Hingga",
    key: "expiredDate",
    className: "text-stone-400 font-mono",
  },
]

export default function AdminInvitationPage() {
  const [invitations, setInvitations] = useState<InvitationResponse[]>([])
  const [users, setUsers] = useState<UserResponse[]>([])
  const [templates, setTemplates] = useState<TemplateResponse[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("Aktif")
  const [paketFilter, setPaketFilter] = useState("Semua Paket")

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(5) // Sesuai permintaan req: size 5

  // State untuk Pagination dari Response
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // FORM ADD INVITATION
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredInvitations = useMemo(() => {
    return invitations.filter((invitation) => {
      // Sinkronkan string filter dengan status di UI
      const matchesStatus = statusFilter === "Semua Undangan" || (statusFilter === "Aktif" && invitation.activeStatus === 1) || (statusFilter === "Ditangguhkan" && invitation.activeStatus === 0)

      const matchesPaket = paketFilter === "Semua Paket" || invitation.templateCategory.toUpperCase() === paketFilter.toUpperCase()

      return matchesStatus && matchesPaket
    })
  }, [invitations, statusFilter, paketFilter])

  function resetFilters() {
    setSearchTerm("")
    setStatusFilter("Semua Undangan")
    setPaketFilter("Semua Paket")
  }

  const fetchInvitation = useCallback(async () => {
    try {
      const response = await api.post("/api/admin/invitations/get-all-invitations", {
        coupleName: searchTerm,
        templateName: searchTerm,
        page: currentPage,
        size: pageSize,
      })
      if (response.data.success) {
        setInvitations(response.data.data)
        setTotalItems(response.data.totalItems)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mengambil data invitation")
    }
  }, [currentPage, pageSize, searchTerm])

  const handleDelete = (item: InvitationResponse) => {
    toast(`Hapus Invitation ${item.invitationId} ?`, {
      description: `Data untuk ${item.coupleName} akan dihapus permanen.`,
      action: {
        label: "Hapus",
        onClick: () => {
          setInvitations((prev) => prev.filter((t) => t.invitationId !== item.invitationId))
          toast.success("Invitation Berhasil Dihapus")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan Dibatalkan"),
      },
    })
  }

  const handleSave = async (newData: InvitationRequest) => {
    setIsLoading(true)

    try {
      const response = await api.post("/api/admin/invitations/create", newData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        toast.success("Undangan berhasil dibuat!")
        fetchInvitation()
        setIsAddModalOpen(false)
      } else {
        // Menangkap error jika status 200 tapi success: false
        // Sesuai request kamu: pakai error dari response jika ada
        toast.error(response.data.error || "Gagal membuat undangan")
      }
    } catch (err: unknown) {
      let errorMessage = "Terjadi kesalahan pada server"

      // Sekarang axios sudah ter-import, jadi isAxiosError bisa dipakai
      if (axios.isAxiosError(err)) {
        // Mengambil error dari response body { error: "..." }
        errorMessage = err.response?.data?.error || err.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      toast.error(errorMessage)
      console.error("Save Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const [resUsers, resTemplates] = await Promise.all([
          api.post("/api/admin/user/get-all-customers", {
            activeStatus: 1,
            page: 0,
            size: 1000,
          }),
          api.post("/api/admin/template/get-all-templates", {
            activeStatus: 1,
            page: 0,
            size: 1000,
          }),
        ])

        // Pastikan struktur response sesuai (biasanya response.data.data)
        setUsers(resUsers.data.data || [])
        setTemplates(resTemplates.data.data || [])
      } catch (error) {
        console.error("Gagal load data pendukung", error)
        toast.error("Gagal memuat daftar user atau template")
      }
    }

    fetchSupportData()
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInvitation()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchInvitation])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Manajemen Undangan</h1>
          <p className="text-stone-400 text-sm font-light italic">Kelola semua undangan</p>
        </div>
        {/* Letakkan di bawah judul "Manajemen Undangan" */}
        <button onClick={() => setIsAddModalOpen(true)} className="bg-[#D5A853] hover:bg-[#b88f46] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#D5A853]/20 flex items-center gap-2">
          + Buat Undangan Baru
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-50 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />

            <input
              type="text"
              placeholder="Cari Undangan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-100 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D5A853] transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all ${showFilters ? "border-[#D4A853] text-[#D4A853] bg-[#D4A853]/10" : "border-stone-100 text-stone-500 hover:bg-stone-50"}`}
            >
              <Filter size={18} />
              Filter
            </button>

            {(searchTerm || statusFilter !== "Semua" || paketFilter !== "Semua") && (
              <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2.5 text-stone-400 hover:text-rose-500 text-sm transition-colors">
                <X size={18} />
                Reset
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/20 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Menggunakan CustomDropdown untuk Status */}
            <CustomDropdown label="Status Undangan" options={["Semua Undangan", "Aktif", "Ditangguhkan"]} value={statusFilter} onChange={setStatusFilter} />

            {/* Menggunakan CustomDropdown untuk Paket */}
            <CustomDropdown label="Jenis Paket" options={["Semua Paket", "Basic", "Premium", "Custom"]} value={paketFilter} onChange={setPaketFilter} />
          </motion.div>
        )}
      </div>

      {/* Table Undangan */}

      {/* Table Undangan */}
      <DataTable<InvitationResponse>
        title="Daftar Undangan"
        count={totalItems}
        columns={columns}
        data={filteredInvitations}
        onEdit={(inv) => console.log("Edit:", inv.coupleName)}
        onDelete={handleDelete}
        // Tambahkan props di bawah ini untuk memperbaiki error:
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* MODAL UNTUK TAMBAH INVITATION */}
      <AddInvitationModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        isLoading={isLoading}
        onSave={handleSave}
        users={users} // Pastikan kamu fetch data user dari API dulu
        templates={templates} // Pastikan kamu fetch data template dari API dulu
      />
    </div>
  )
}
