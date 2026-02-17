import { useState, useMemo, useCallback, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { motion } from "framer-motion"
import CustomDropdown from "../components/CustomDropdown"
import axios from "axios"
import { toast } from "sonner"
import DataTable, { type Column } from "../components/DataTable"
import EditUserModal from "../components/EditUserModal"

export interface UserResponse {
  userId: string
  email: string
  fullName: string
  role: string
  activeStatus: number
  subscriptionPlan: string
  createdDate: string
  orderCount: number
}

const columns: Column<UserResponse>[] = [
  {
    header: "Nama",
    key: "fullName",
    className: "font-bold text-stone-800",
  },
  {
    header: "Email",
    key: "email",
    className: "text-stone-500 font-light italic",
  },
  {
    header: "Status",
    key: "activeStatus",
    render: (item) => (
      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${item.activeStatus === 1 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {item.activeStatus === 1 ? "Active" : "Non Active"}
      </span>
    ),
  },
  {
    header: "Paket",
    key: "subscriptionPlan",
    render: (item) => <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-600 rounded-full text-[9px] font-medium italic">{item.subscriptionPlan}</span>,
  },
  {
    header: "Order",
    key: "orderCount",
    className: "text-center font-mono text-stone-600",
  },
  {
    header: "Tanggal",
    key: "createdDate",
    className: "text-stone-400 font-medium italic",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeStatusFilter, setactiveStatusFilter] = useState("Semua Akun")
  const [paketFilter, setPaketFilter] = useState("Semua Paket")
  const [showFilters, setShowFilters] = useState(false)

  const [users, setUsers] = useState<UserResponse[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(5) // Sesuai permintaan req: size 5

  // State untuk Pagination dari Response
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // state edit
  const [isEditModalOpen, setisEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)

  // function open edit modal
  const handleEdit = (user: UserResponse) => {
    console.log(user)
    setSelectedUser(user)
    setisEditModalOpen(true)
  }

  // function handle submit update
  const handleUpdateUser = async (updatedData: Partial<UserResponse>) => {
    try {
      await axios.put(`http://localhost:8085/api/admin/user/update-user`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      toast.success("Data berhasil diupdate!")
      fetchUsers()
      setisEditModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Gagal memperbarui data!")
    }
  }

  // LOGIC FILTER & SEARCH
  const filteredUsers = useMemo(() => {
    const sourceData = users

    return sourceData.filter((user) => {
      // 1. Logic Pencarian (Handle nama vs fullName)
      const nameToSearch = (user.fullName || "").toLowerCase()
      const emailToSearch = (user.email || "").toLowerCase()

      const searchLower = searchTerm.toLowerCase()

      const matchesSearch = nameToSearch.includes(searchLower) || emailToSearch.includes(searchLower)
      const matchesactiveStatus = activeStatusFilter === "Semua Akun" || (activeStatusFilter === "Active" && user.activeStatus === 1) || (activeStatusFilter === "Non Active" && user.activeStatus === 0)
      const matchesPaket = paketFilter === "Semua Paket" || user.subscriptionPlan?.toUpperCase() === paketFilter.toUpperCase()

      return matchesSearch && matchesactiveStatus && matchesPaket
    })
  }, [searchTerm, activeStatusFilter, paketFilter, users])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8085/api/admin/user/get-all-customers",
        {
          email: searchTerm,
          fullName: searchTerm,
          page: currentPage,
          size: pageSize,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )

      if (response.data.success) {
        setUsers(response.data.data)
        setTotalItems(response.data.totalItems)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      toast.error("Gagal Mengambil Data Pengguna")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, currentPage, pageSize])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchUsers])

  const resetFilters = () => {
    setSearchTerm("")
    setactiveStatusFilter("Semua Akun")
    setPaketFilter("Semua Paket")
  }

  const handleDelete = (user: UserResponse) => {
    toast(`Hapus Pengguna ${user.fullName} ? `, {
      description: `Data untuk ${user.fullName} akan dihapus permanen`,
      action: {
        label: "Hapus",
        onClick: async () => {
          const response = await axios.delete(`http://localhost:8085/api/admin/user/${user.userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          if (!response.data.success) {
            toast.error("Gagal Menghapus Pengguna")
            return
          }
          fetchUsers()
          toast.success("Pengguna Berhasil Dihapus")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan Dibatalkan"),
      },
    })
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
                showFilters || activeStatusFilter !== "Semua Akun" || paketFilter !== "Semua Paket" ? "border-[#D4A853] text-[#D4A853] bg-[#D4A853]/5" : "border-stone-100 text-stone-500 hover:bg-stone-50"
              }`}
            >
              <Filter size={18} />
              Filter
            </button>

            {(searchTerm || activeStatusFilter !== "Semua" || paketFilter !== "Semua") && (
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
            <CustomDropdown label="Status Akun" options={["Semua Akun", "Active", "Non Active"]} value={activeStatusFilter} onChange={setactiveStatusFilter} />

            <CustomDropdown label="Semua Paket" options={["Semua Paket", "Basic", "Premium", "Custom"]} value={paketFilter} onChange={setPaketFilter} />
          </motion.div>
        )}
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl border border-stone-50 shadow-sm overflow-hidden font-sans">
        <DataTable<UserResponse>
          title="Daftar Pengguna"
          count={totalItems}
          columns={columns}
          data={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          // Masukkan props baru di sini:
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setCurrentPage(newPage)}
          loading={loading}
        />{" "}
      </div>

      {/* Render Modal */}
      <EditUserModal key={selectedUser?.userId || "new"} isOpen={isEditModalOpen} onClose={() => setisEditModalOpen(false)} user={selectedUser} onSave={handleUpdateUser} />
    </div>
  )
}
