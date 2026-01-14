import { Filter, Search, X } from "lucide-react"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import CustomDropdown from "../components/CustomDropdown"
import DataTable, { type Column } from "../components/DataTable"

// 1. Definisikan Interface yang Akurat
interface Invitation {
  id: number
  name: string // Sesuaikan dengan key di invitationsData
  template: string
  status: string
  paket: string
  tanggalKadaluwarsa: string // Gunakan string karena datanya berupa "YYYY-MM-DD"
}

// 2. Data Mock
const invitationsData: Invitation[] = [
  {
    id: 1,
    name: "Lili & Lee",
    template: "Elegant Ivory",
    status: "Aktif",
    paket: "Premium",
    tanggalKadaluwarsa: "2030-12-31",
  },
  {
    id: 2,
    name: "Budi & Ani",
    template: "Modern Minimalist",
    status: "Aktif",
    paket: "Basic",
    tanggalKadaluwarsa: "2025-06-20",
  },
]

// 3. Konfigurasi Kolom yang Benar
// Pastikan Column diimport dari file DataTable atau didefinisikan ulang
const columns: Column<Invitation>[] = [
  {
    header: "Pasangan",
    key: "name",
    className: "font-bold text-stone-800",
  },
  {
    header: "Template",
    key: "template",
    className: "text-stone-500 italic",
  },
  {
    header: "Paket",
    key: "paket",
    // Gunakan render untuk membungkus teks dengan badge
    render: (item) => <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-600 rounded-full text-[9px] font-bold uppercase italic tracking-wider">{item.paket}</span>,
  },
  {
    header: "Status",
    key: "status",
    render: (item) => <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${item.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{item.status}</span>,
  },
  {
    header: "Berlaku Hingga",
    key: "tanggalKadaluwarsa",
    className: "text-stone-400 font-mono",
  },
]

export default function AdminInvitationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("Aktif")
  const [paketFilter, setPaketFilter] = useState("Semua Paket")

  const filteredInvitations = useMemo(() => {
    return invitationsData.filter((invitation) => {
      const matchesSearch = invitation.name.toLowerCase().includes(searchTerm.toLowerCase()) || invitation.template.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "Semua Undangan" || invitation.status === statusFilter
      const matchesPaket = paketFilter === "Semua Paket" || invitation.paket === paketFilter

      return matchesSearch && matchesStatus && matchesPaket
    })
  }, [searchTerm, statusFilter, paketFilter])

  function resetFilters() {
    setSearchTerm("")
    setStatusFilter("Semua Undangan")
    setPaketFilter("Semua Paket")
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Manajemen Undangan</h1>
          <p className="text-stone-400 text-sm font-light italic">Kelola semua undangan</p>
        </div>
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
      <DataTable<Invitation>
        title="Daftar Undangan"
        count={filteredInvitations.length} // Pakai data yang sudah difilter
        columns={columns}
        data={filteredInvitations} // Pakai data yang sudah difilter
        onEdit={(inv) => console.log("Edit:", inv.name)}
        onDelete={(inv) => confirm(`Hapus undangan ${inv.name}?`)}
      />
    </div>
  )
}
