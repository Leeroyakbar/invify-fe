/* eslint-disable @typescript-eslint/no-unused-vars */
import { Search } from "lucide-react"
import DataTable, { type Column } from "../components/DataTable"
import { useCallback, useEffect, useState } from "react"
import CustomDropdown from "../components/CustomDropdown"
import { toast } from "sonner"
import EditTransactionModal from "../components/EditTransactionModal"
import type { TransactionResponse } from "../../types/TransactionResponse"
import api from "../../api/axiosConfig"
import { formatRupiah } from "../../utils/utils"

const dummyTransactions: TransactionResponse[] = [
  {
    trxId: "1",
    trxNo: "TRX001",
    fullName: "Andi & Sari",
    email: "andi@email.com",
    subscriptionPlan: "Premium",
    trxAmount: 350000,
    paymentStatus: 1,
    paymentMethod: "Bank Transfer",
    createdDate: "2025-01-15 14:30",
  },
  {
    trxId: "2",
    trxNo: "TRX002",
    fullName: "Andi & Sari",
    email: "andi@gmail.com",
    subscriptionPlan: "Custom",
    trxAmount: 500000,
    paymentStatus: 0,
    paymentMethod: "E-Wallet",
    createdDate: "2025-01-15 12:15",
  },
]

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>(dummyTransactions)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Semua Status")
  const [revenue, setRevenue] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [totalPending, setTotalPending] = useState(0)

  // Definisi Kolom Tabel
  const columns: Column<TransactionResponse>[] = [
    { header: "ID Transaksi", key: "trxNo", className: "font-bold text-stone-800" },
    {
      header: "Pengguna",
      key: "user",
      render: (item) => (
        <div>
          <p className="font-bold text-stone-800">{item.fullName}</p>
          <p className="text-[10px] text-stone-400">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Paket",
      key: "subscriptionPlan",
      render: (item) => <span className="px-3 py-1 bg-stone-50 border border-stone-100 rounded-lg text-[10px] font-bold text-stone-600 capitalize">{item.subscriptionPlan.toLowerCase()}</span>,
    },
    {
      header: "Jumlah",
      key: "amount",
      render: (item) => <span className="font-bold">Rp {item.trxAmount?.toLocaleString("id-ID")}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (item) => {
        const colors = {
          "1": "bg-emerald-50 text-emerald-600 border-emerald-100",
          "0": "bg-amber-50 text-amber-600 border-amber-100",
          "-1": "bg-rose-50 text-rose-600 border-rose-100",
        }

        const statusKey = String(item.paymentStatus) as keyof typeof colors
        const statusClass = colors[statusKey] || "bg-gray-50 text-gray-600 border-gray-100"

        return <span className={`px-3 py-1 border rounded-full text-[10px] font-bold ${statusClass}`}>{item.paymentStatus === 1 ? "Lunas" : item.paymentStatus === 0 ? "Pending" : "Gagal"}</span>
      },
    },
    { header: "Metode", key: "paymentMethod" },
    {
      header: "Tanggal",
      key: "createdDate",
      className: "text-stone-400",
      render: (item) => {
        const date = new Date(item.createdDate)
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      },
    },
  ]

  const fetchTransaction = useCallback(async () => {
    try {
      const response = await api.post("api/admin/transaction/get-all-transactions", {
        // Pastikan nama field sesuai dengan TransactionRequestDTO di Backend
        trxNo: searchTerm,
        fullName: searchTerm,
        subscriptionPlan: searchTerm,
        paymentStatus: statusFilter === "Semua Status" ? 1 : statusFilter === "Pending" ? 0 : -1,
        page: 0, // Sebaiknya gunakan number, bukan string
        size: 10,
      })

      if (response.data.success) {
        setTransactions(response.data.data)
      }
    } catch (error) {
      toast.error("Gagal mengambil data transaksi")
      console.error(error)
    }
  }, [searchTerm, statusFilter])

  const fetchSummary = useCallback(async () => {
    try {
      const response = await api.get("api/admin/transaction/summary")
      if (response.data.success) {
        setRevenue(response.data.data.totalRevenue)
        setTotalTransaction(response.data.data.totalTransaction)
        setTotalPending(response.data.data.totalPendingTransaction)
      }
    } catch (error) {
      toast.error("Gagal mengambil summary transaksi")
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTransaction()
      fetchSummary()
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [fetchTransaction, fetchSummary])

  const handleDelete = (item: TransactionResponse) => {
    toast(`Hapus transaksi ${item.trxNo} ?`, {
      description: `Data untuk ${item.fullName} akan dihapus permanen.`,
      action: {
        label: "Hapus",
        onClick: () => {
          setTransactions((prev) => prev.filter((t) => t.trxId !== item.trxId))
          toast.success("Transaksi Berhasil Dihapus")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan Dibatalkan"),
      },
    })
  }

  const handleEdit = (item: TransactionResponse) => {
    setSelectedTransaction(item)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedData: Partial<TransactionResponse>) => {
    setTransactions((prev) => prev.map((t) => (t.trxId === selectedTransaction?.trxId ? { ...t, ...updatedData } : t)))
    setIsEditModalOpen(false)
    setSelectedTransaction(null)
  }

  const filteredTransactions = transactions.filter((t) => {
    // 1. Logika untuk Search Bar (Mencari di banyak kolom)
    const matchesSearch =
      t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.trxNo.toLowerCase().includes(searchTerm.toLowerCase())

    // 2. Logika untuk Dropdown Status
    const matchesStatus = statusFilter === "Semua Status" || statusFilter === "Lunas" ? t.paymentStatus === 1 : t.paymentStatus === 0

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
        {/* <button className="flex items-center gap-2 px-6 py-2.5 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all">
          <Download size={18} /> Export
        </button> */}
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Pendapatan" value={formatRupiah(revenue)} />
        <SummaryCard title="Transaksi Sukses" value={totalTransaction.toString()} color="text-emerald-600" />
        <SummaryCard title="Menunggu Pembayaran" value={totalPending.toString()} color="text-amber-600" />
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
      {isEditModalOpen && <EditTransactionModal key={selectedTransaction?.trxId || "new"} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} initialData={selectedTransaction} onSave={handleSaveEdit} />}
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
