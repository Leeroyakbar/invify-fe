import { Users, Mail, Receipt, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function DashboardPage() {
  const stats = [
    { name: "Total Pengguna", value: "1,234", change: "+12%", trend: "up", icon: Users },
    { name: "Total Undangan", value: "856", change: "+8%", trend: "up", icon: Mail },
    { name: "Total Transaksi", value: "543", change: "+15%", trend: "up", icon: Receipt },
    { name: "Pendapatan", value: "Rp 125jt", change: "+23%", trend: "up", icon: TrendingUp },
  ]

  const dataPendapatan = [
    { name: "Jan", total: 4000000 },
    { name: "Feb", total: 5200000 },
    { name: "Mar", total: 4800000 },
    { name: "Apr", total: 7000000 },
    { name: "Mei", total: 6500000 },
    { name: "Jun", total: 8200000 },
    { name: "Jul", total: 9000000 },
    { name: "Agu", total: 10500000 },
    { name: "Sep", total: 9500000 },
    { name: "Okt", total: 11000000 },
    { name: "Nov", total: 12500000 },
    { name: "Des", total: 14000000 },
  ]

  const dataUndangan = [
    { name: "Jan", qty: 45 },
    { name: "Feb", qty: 52 },
    { name: "Mar", qty: 48 },
    { name: "Mei", qty: 61 },
    { name: "Jun", qty: 59 },
    { name: "Jul", qty: 68 },
    { name: "Agu", qty: 82 },
    { name: "Sep", qty: 78 },
    { name: "Okt", qty: 92 },
    { name: "Nov", qty: 88 },
    { name: "Des", qty: 105 },
  ]

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
          <h4 className="font-serif text-lg text-stone-800 mb-8 italic">Pendapatan Bulanan</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataPendapatan}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A853" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} tickFormatter={(value) => `${value / 1000000}jt`} />
                <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
                <Area type="monotone" dataKey="total" stroke="#D4A853" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Jumlah Undangan */}
        <div className="bg-white p-8 rounded-3xl border border-stone-50 shadow-sm">
          <h4 className="font-serif text-lg text-stone-800 mb-8 italic">Undangan per Bulan</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataUndangan}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 10 }} dy={10} />
                <Tooltip cursor={{ fill: "#FDFBF7" }} contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} />
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
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-stone-800">Andi & Sari</td>
                  <td className="px-8 py-5 text-stone-500 font-light italic">Premium Package</td>
                  <td className="px-8 py-5 text-stone-400 font-mono italic text-[10px]">2027-01-15</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-tighter">Lunas</span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-stone-800 italic">Rp 350.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
