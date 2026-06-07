/* eslint-disable @typescript-eslint/no-unused-vars */
import { Users, Mail, Receipt, TrendingUp } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import api from "../../api/axiosConfig"
import type { DashboardSummaryResponse } from "../../types/DashboardSummaryResopnse"
import { toast } from "sonner"
import { formatNumber, formatRupiah, formatTanggal } from "../../utils/utils"
import { type DashboardRevenueSummary } from "../../types/DashboardRevenueSummary"
import type { DashboardInvitationSummary } from "../../types/DashboardInvitationSummary"
import type { TransactionResponse } from "../../types/TransactionResponse"

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummaryResponse>({
    totalCustomer: 0,
    percentageChangeCustomer: 0,
    totalRevenue: 0,
    percentageChangeRevenue: 0,
    totalTransaction: 0,
    percentageChangeTransaction: 0,
  })

  const [revenueSummary, setRevenueSummary] = useState<DashboardRevenueSummary[]>([])
  const [invitationSummary, setInvitationSummary] = useState<DashboardInvitationSummary[]>([])
  const [transactionSummary, setTransactionSummary] = useState<TransactionResponse[]>([])
  const fetchSummary = useCallback(async () => {
    try {
      const responseSummary = await api.get("/api/admin/dashboard/summary")
      if (responseSummary.data.success) {
        setSummary(responseSummary.data.data)
      }

      const responseRevenue = await api.get("/api/admin/dashboard/summary/revenue")
      if (responseRevenue.data.success) {
        setRevenueSummary(responseRevenue.data.data)
      }

      const responseInvitation = await api.get("/api/admin/dashboard/summary/invitation")
      if (responseInvitation.data.success) {
        setInvitationSummary(responseInvitation.data.data)
      }

      const responseTransaction = await api.get("/api/admin/dashboard/summary/transaction")
      if (responseTransaction.data.success) {
        setTransactionSummary(responseTransaction.data.data)
      }
    } catch (error) {
      toast.error("Gagal mendapatkan summary")
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSummary()
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [fetchSummary])

  const stats = [
    {
      name: "Total Pengguna",
      value: summary ? formatNumber(summary.totalCustomer) : "0",
      change: `${summary?.percentageChangeCustomer >= 0 ? "+" : ""}${summary?.percentageChangeCustomer}%`,
      trend: (summary?.percentageChangeCustomer ?? 0) >= 0 ? "up" : "down",
      icon: Users,
    },
    {
      name: "Total Transaksi",
      value: summary ? formatNumber(summary.totalTransaction) : "0",
      change: `${summary?.percentageChangeTransaction >= 0 ? "+" : ""}${summary?.percentageChangeTransaction}%`,
      trend: (summary?.percentageChangeTransaction ?? 0) >= 0 ? "up" : "down",
      icon: Receipt,
    },
    {
      name: "Pendapatan",
      value: summary ? formatRupiah(summary.totalRevenue) : "Rp 0",
      change: `${summary?.percentageChangeRevenue >= 0 ? "+" : ""}${summary?.percentageChangeRevenue}%`,
      trend: (summary?.percentageChangeRevenue ?? 0) >= 0 ? "up" : "down",
      icon: TrendingUp,
    },
    {
      name: "Total Undangan", // Contoh jika ada data tambahan nanti
      value: summary ? formatNumber(summary.totalTransaction) : "0",
      change: "+0%",
      trend: "up",
      icon: Mail,
    },
  ]

  const chartDataPendapatan = useMemo(() => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

    if (!revenueSummary || revenueSummary.length === 0) {
      // Return array kosong atau dummy data jika belum ada data
      return monthLabels.map((month) => ({ name: month, total: 0 }))
    }

    return revenueSummary.map((item) => ({
      // Mengonversi month (2) menjadi "Feb" (index 1 di array monthLabels)
      name: monthLabels[item.month - 1] || "Unknown",
      total: item.revenue,
      year: item.year, // Opsional, jika ingin ditampilkan di tooltip
    }))
  }, [revenueSummary])

  const chartDataUndangan = useMemo(() => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

    if (!invitationSummary || invitationSummary.length === 0) {
      return monthLabels.map((month) => ({ name: month, qty: 0 }))
    }

    return invitationSummary.map((item) => ({
      name: monthLabels[item.month - 1] || "Unknown",
      qty: item.qty,
      year: item.year,
    }))
  }, [invitationSummary])

  const chartDataTransaksi = useMemo(() => {
    if (!transactionSummary || transactionSummary.length === 0) {
      return []
    }

    return transactionSummary.map((item) => ({
      name: item.fullName,
      subsPlan: item.subscriptionPlan,
      createdDate: formatTanggal(item.createdDate),
      status: item.paymentStatus === 1 ? "Lunas" : "Belum Lunas",
      trxAmount: formatRupiah(item.trxAmount),
    }))
  }, [transactionSummary])

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-400 text-sm mt-1 font-light italic">Selamat datang di panel admin Wedding Invite</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-stone-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-[#D4A853]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">{stat.name}</p>
                <h3 className="text-2xl font-serif font-bold text-stone-800">{stat.value}</h3>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-[#D4A853]/10 group-hover:text-[#D4A853] transition-all">
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className={`text-xs font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>{stat.change}</span>
              <span className="text-[10px] text-stone-300">vs bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW (Placeholder Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Area Chart: Pendapatan Bulanan */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-stone-50 shadow-sm">
          <h4 className="font-serif text-lg text-stone-800 mb-8 italic">Pendapatan Bulanan (Rp)</h4>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* PAKAI chartDataPendapatan DI SINI */}
              <AreaChart data={chartDataPendapatan}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A853" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} tickFormatter={(value) => (value >= 1000000 ? `${value / 1000000}jt` : formatNumber(value))} />
                <Tooltip<number | string, string>
                  formatter={(value) => {
                    if (value === undefined || value === null) return ["Rp 0", "Pendapatan"]

                    const numericValue = typeof value === "string" ? parseFloat(value) : value

                    // Jalankan logika formatting kamu
                    return [`Rp ${numericValue}`, "Pendapatan"]
                  }}
                />
                <Area type="monotone" dataKey="total" stroke="#D4A853" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Jumlah Undangan */}
        <div className="bg-white p-8 rounded-3xl border border-stone-50 shadow-sm">
          <h4 className="font-serif text-lg text-stone-800 mb-8 italic">Undangan per Bulan</h4>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* PAKAI chartDataUndangan DI SINI */}
              <BarChart data={chartDataUndangan}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "#FDFBF7" }}
                  formatter={(value: number | string | undefined) => {
                    const numericValue = typeof value === "string" ? parseInt(value) : (value ?? 0)
                    return [numericValue, "Jumlah Undangan"]
                  }}
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="qty" fill="#D4A853" radius={[6, 6, 0, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white rounded-3xl border border-stone-50 overflow-hidden">
        <div className="p-8 border-b border-stone-50 flex justify-between items-center">
          <h4 className="font-serif text-lg text-stone-800 italic">Transaksi Terbaru</h4>
          <button className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] font-bold hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 text-stone-400 text-[9px] uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Client</th>
                <th className="px-8 py-4">Paket</th>
                <th className="px-8 py-4">Tanggal</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50 text-xs">
              {chartDataTransaksi.map((item, i) => (
                <tr key={i} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-stone-800">{item.name}</td>
                  <td className="px-8 py-5 text-stone-500 font-light italic">{item.subsPlan}</td>
                  <td className="px-8 py-5 text-stone-400 font-mono italic text-[10px]">{item.createdDate}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-tighter">{item.status}</span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-stone-800 italic">Rp {item.trxAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
