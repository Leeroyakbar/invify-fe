import { Download, Search } from "lucide-react"
import DataTable, { type Column } from "../components/DataTable"
import { useState } from "react"
import CustomDropdown from "../components/CustomDropdown"
import { toast } from "sonner"
import EditTransactionModal from "../components/EditTransactionModal"

export interface Transaction {
  id: string
  user: {
    name: string
    email: string
  }
  package: "Basic" | "Premium" | "Custom"
  amount: number
  status: "Lunas" | "Pending" | "Gagal"
  method: string
  date: string
}

const dummyTransactions: Transaction[] = [
  {
    id: "TRX001",
    user: { name: "Andi & Sari", email: "andi@email.com" },
    package: "Premium",
    amount: 350000,
    status: "Lunas",
    method: "Bank Transfer",
    date: "2025-01-15 14:30",
  },
  {
    id: "TRX002",
    user: { name: "Budi & Dewi", email: "budi@email.com" },
    package: "Custom",
    amount: 500000,
    status: "Pending",
    method: "E-Wallet",
    date: "2025-01-15 12:15",
  },
]

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Semua Status")

  // Definisi Kolom Tabel
  const columns: Column<Transaction>[] = [
    { header: "ID Transaksi", key: "id", className: "font-bold text-stone-800" },
    {
      header: "Pengguna",
      key: "user",
      render: (item) => (
        <div>
          <p className="font-bold text-stone-800">{item.user.name}</p>
          <p className="text-[10px] text-stone-400">{item.user.email}</p>
        </div>
      ),
    },
    {
      header: "Paket",
      key: "package",
      render: (item) => <span className="px-3 py-1 bg-stone-50 border border-stone-100 rounded-lg text-[10px] font-bold text-stone-600">{item.package}</span>,
    },
    {
      header: "Jumlah",
      key: "amount",
      render: (item) => <span className="font-bold">Rp {item.amount.toLocaleString("id-ID")}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (item) => {
        const colors = {
          Lunas: "bg-emerald-50 text-emerald-600 border-emerald-100",
          Pending: "bg-amber-50 text-amber-600 border-amber-100",
          Gagal: "bg-rose-50 text-rose-600 border-rose-100",
        }
        return <span className={`px-3 py-1 border rounded-full text-[10px] font-bold ${colors[item.status]}`}>{item.status}</span>
      },
    },
    { header: "Metode", key: "method" },
    { header: "Tanggal", key: "date", className: "text-stone-400" },
  ]

  const handleDelete = (item: Transaction) => {
    toast(`Hapus transaksi ${item.id} ?`, {
      description: `Data untuk ${item.user.name} akan dihapus permanen.`,
      action: {
        label: "Hapus",
        onClick: () => {
          setTransactions((prev) => prev.filter((t) => t.id !== item.id))
          toast.success("Transaksi Berhasil Dihapus")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan Dibatalkan"),
      },
    })
  }

  const handleEdit = (item: Transaction) => {
    setSelectedTransaction(item)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedData: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === selectedTransaction?.id ? { ...t, ...updatedData } : t)))
    setIsEditModalOpen(false)
    setSelectedTransaction(null)
  }

  const filteredTransactions = transactions.filter((t) => {
    // 1. Logika untuk Search Bar (Mencari di banyak kolom)
    const matchesSearch =
      t.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())

    // 2. Logika untuk Dropdown Status
    const matchesStatus = statusFilter === "Semua Status" || t.status === statusFilter

    // 3. Kedua kondisi HARUS terpenuhi
    return matchesSearch && matchesStatus
  })
  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Manajemen Transaksi</h1>
          <p className="text-stone-400 text-sm italic font-light">Pantau dan kelola semua transaksi pembayaran</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all">
          <Download size={18} /> Export
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Pendapatan" value="Rp 1.150.000" />
        <SummaryCard title="Transaksi Sukses" value="5" color="text-emerald-600" />
        <SummaryCard title="Menunggu Pembayaran" value="2" color="text-amber-600" />
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search Bar */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#D4A853] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={searchTerm}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-100 rounded-2xl shadow-sm focus:outline-none focus:border-[#D4A853]/50 focus:ring-4 focus:ring-[#D4A853]/5 transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdown Filter */}
        <div className="min-w-50">
          <CustomDropdown label="" value={statusFilter} onChange={setStatusFilter} options={["Semua Status", "Lunas", "Pending", "Gagal"]} />
        </div>
      </div>

      {/* TABLE SECTION */}
      <DataTable
        title="Riwayat Transaksi"
        count={filteredTransactions.length}
        columns={columns}
        data={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={0}
        totalPages={1}
        onPageChange={(page) => console.log("Halaman ke:", page)}
      />

      {/* Modal Edit (Kita bisa buat komponen baru atau reuse modal yang ada) */}
      {isEditModalOpen && <EditTransactionModal key={selectedTransaction?.id || "new"} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} initialData={selectedTransaction} onSave={handleSaveEdit} />}
    </div>
  )
}

// Sub-component untuk Summary Card agar rapi
function SummaryCard({ title, value, color = "text-stone-800" }: { title: string; value: string; color?: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-50 shadow-sm space-y-2">
      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{title}</p>
      <h2 className={`text-2xl font-serif font-bold ${color}`}>{value}</h2>
    </div>
  )
}
