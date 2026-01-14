import { useState, useMemo } from "react"
import { Search, MoreVertical, Filter, X } from "lucide-react"
import { motion } from "framer-motion"
import CustomDropdown from "../components/CustomDropdown"
const usersData = [
  { id: 1, nama: "Andi Pratama", email: "andi@email.com", status: "Aktif", paket: "Premium", undangan: 2, bergabung: "2025-01-10" },
  { id: 2, nama: "Budi Santoso", email: "budi@email.com", status: "Aktif", paket: "Basic", undangan: 1, bergabung: "2025-01-09" },
  { id: 3, nama: "Citra Dewi", email: "citra@email.com", status: "Ditangguhkan", paket: "Custom", undangan: 3, bergabung: "2025-01-08" },
  { id: 4, nama: "Doni Kurniawan", email: "doni@email.com", status: "Aktif", paket: "Premium", undangan: 1, bergabung: "2025-01-07" },
  { id: 5, nama: "Eka Putri", email: "eka@email.com", status: "Aktif", paket: "Basic", undangan: 1, bergabung: "2025-01-06" },
  { id: 6, nama: "Fani Rahmawati", email: "fani@email.com", status: "Aktif", paket: "Premium", undangan: 2, bergabung: "2025-01-05" },
  { id: 7, nama: "Galih Prasetyo", email: "galih@email.com", status: "Ditangguhkan", paket: "Basic", undangan: 0, bergabung: "2025-01-04" },
  { id: 8, nama: "Hani Susanti", email: "hani@email.com", status: "Aktif", paket: "Custom", undangan: 4, bergabung: "2025-01-03" },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Semua Akun")
  const [paketFilter, setPaketFilter] = useState("Semua Paket")
  const [showFilters, setShowFilters] = useState(false)

  // LOGIC FILTER & SEARCH
  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch = user.nama.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "Semua Akun" || user.status === statusFilter
      const matchesPaket = paketFilter === "Semua Paket" || user.paket === paketFilter

      return matchesSearch && matchesStatus && matchesPaket
    })
  }, [searchTerm, statusFilter, paketFilter])

  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("Semua Akun")
    setPaketFilter("Semua Paket")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Manajemen Pengguna</h1>
          <p className="text-stone-400 text-sm mt-1 font-light italic">Kelola semua pengguna platform</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-50 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-100 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853] transition-all"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all ${
                showFilters || statusFilter !== "Semua Akun" || paketFilter !== "Semua Paket" ? "border-[#D4A853] text-[#D4A853] bg-[#D4A853]/5" : "border-stone-100 text-stone-500 hover:bg-stone-50"
              }`}
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

        {/* Dropdown Filter Panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-stone-50 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomDropdown label="Status Akun" options={["Semua Akun", "Aktif", "Ditangguhkan"]} value={statusFilter} onChange={setStatusFilter} />

            <CustomDropdown label="Semua Paket" options={["Semua Paket", "Basic", "Premium", "Custom"]} value={paketFilter} onChange={setPaketFilter} />
          </motion.div>
        )}
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl border border-stone-50 shadow-sm overflow-hidden font-sans">
        <div className="p-6 border-b border-stone-50 flex justify-between items-center">
          <h3 className="font-serif text-lg text-stone-800 italic tracking-tight">
            Daftar Pengguna
            <span className="ml-2 text-sm font-sans font-normal text-stone-400 not-italic">({filteredUsers.length} ditemukan)</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 text-stone-400 text-[10px] uppercase tracking-[0.15em]">
              <tr>
                <th className="px-6 py-4 font-bold">Nama</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Paket</th>
                <th className="px-6 py-4 font-bold text-center">Undangan</th>
                <th className="px-6 py-4 font-bold">Bergabung</th>
                <th className="px-6 py-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50 text-xs">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50/40 transition-colors group">
                    <td className="px-6 py-5 font-bold text-stone-800">{user.nama}</td>
                    <td className="px-6 py-5 text-stone-500 font-light italic">{user.email}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${user.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{user.status}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-600 rounded-full text-[9px] font-medium italic">{user.paket}</span>
                    </td>
                    <td className="px-6 py-5 text-center font-mono text-stone-600">{user.undangan}</td>
                    <td className="px-6 py-5 text-stone-400 font-medium italic">{user.bergabung}</td>
                    <td className="px-6 py-5 text-center">
                      <button className="p-2 hover:bg-stone-100 rounded-xl text-stone-300 hover:text-[#D4A853] transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-stone-400 italic font-light">
                    Tidak ada pengguna yang sesuai dengan kriteria pencarian...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="p-6 border-t border-stone-50 flex justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
          <span>Menampilkan {filteredUsers.length} pengguna</span>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-stone-100 rounded-lg hover:bg-stone-50 disabled:opacity-30 transition-all cursor-pointer">Prev</button>
            <button className="px-4 py-1.5 border border-stone-100 rounded-lg hover:bg-stone-50 disabled:opacity-30 transition-all cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
