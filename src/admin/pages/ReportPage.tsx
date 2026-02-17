import { useState, useMemo } from "react"
import { Download, TrendingUp, CreditCard, Users, Layout } from "lucide-react"
import CustomDropdown from "../components/CustomDropdown"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts"

// --- DUMMY DATA GENERATOR ---
// Simulasi data berdasarkan filter waktu
const getReportData = (range: string) => {
  if (range === "7 Hari Terakhir") {
    return {
      stats: { total: "Rp 8.200.000", avg: "Rp 1.171.428", users: "42", templates: "28" },
      revenueTrend: [
        { name: "Sen", value: 1200000 },
        { name: "Sel", value: 900000 },
        { name: "Rab", value: 1500000 },
        { name: "Kam", value: 2100000 },
        { name: "Jum", value: 800000 },
        { name: "Sab", value: 1100000 },
        { name: "Min", value: 600000 },
      ],
    }
  }
  // Default 12 Bulan Terakhir (seperti di foto)
  return {
    stats: { total: "Rp 90.300.000", avg: "Rp 7.525.000", users: "1.234", templates: "856" },
    revenueTrend: [
      { name: "Jan", value: 4500000 },
      { name: "Feb", value: 5200000 },
      { name: "Mar", value: 4800000 },
      { name: "Apr", value: 6100000 },
      { name: "Mei", value: 5800000 },
      { name: "Jun", value: 7200000 },
      { name: "Jul", value: 8100000 },
      { name: "Agu", value: 7800000 },
      { name: "Sep", value: 9300000 },
      { name: "Okt", value: 8800000 },
      { name: "Nov", value: 10500000 },
      { name: "Des", value: 12400000 },
    ],
  }
}

const packageData = [
  { name: "Basic", value: 400 },
  { name: "Premium", value: 300 },
  { name: "Custom", value: 200 },
]
const COLORS = ["#78716C", "#D4A853", "#E7D4B5"]

const templateData = [
  { name: "Elegant Rose", value: 235 },
  { name: "Minimalist White", value: 300 },
  { name: "Modern Gold", value: 180 },
  { name: "Floral Dream", value: 160 },
  { name: "Rustic Garden", value: 110 },
]

export default function ReportPage() {
  const [timeRange, setTimeRange] = useState("12 Bulan Terakhir")

  // Ambil data berdasarkan filter
  const currentData = useMemo(() => getReportData(timeRange), [timeRange])

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Laporan & Analytics</h1>
          <p className="text-stone-400 text-sm italic font-light">Analisis performa bisnis Anda</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="min-w-[180px]">
            <CustomDropdown label="" value={timeRange} onChange={setTimeRange} options={["7 Hari Terakhir", "30 Hari Terakhir", "3 Bulan Terakhir", "12 Bulan Terakhir"]} />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* 4 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pendapatan" value={currentData.stats.total} icon={<TrendingUp size={20} />} />
        <StatCard title="Rata-rata/Bulan" value={currentData.stats.avg} icon={<CreditCard size={20} />} color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Pengguna Baru" value={currentData.stats.users} icon={<Users size={20} />} color="bg-blue-50 text-blue-600" />
        <StatCard title="Undangan Dibuat" value={currentData.stats.templates} icon={<Layout size={20} />} color="bg-rose-50 text-rose-600" />
      </div>

      {/* TREND PENDAPATAN (LINE CHART) */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm">
        <h3 className="font-serif text-lg text-stone-800 mb-8 italic">Trend Pendapatan</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8A29E", fontSize: 12 }} tickFormatter={(val) => `${val / 1000000}jt`} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
              <Line type="monotone" dataKey="value" stroke="#D4A853" strokeWidth={3} dot={{ r: 4, fill: "#D4A853" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DISTRIBUSI PAKET (PIE CHART) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm">
          <h3 className="font-serif text-lg text-stone-800 mb-8 italic">Distribusi Paket</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={packageData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                  {packageData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TEMPLATE TERLARIS (BAR CHART) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm">
          <h3 className="font-serif text-lg text-stone-800 mb-8 italic">Template Terlaris</h3>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={templateData}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F5F5F4" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 11, fill: "#57534E" }} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" fill="#D4A853" radius={[0, 10, 10, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sub-component untuk Card agar kode bersih
function StatCard({ title, value, icon, color = "bg-stone-50 text-stone-400" }: { title: string; value: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-stone-50 shadow-sm flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{title}</p>
        <h2 className="text-xl font-serif font-bold text-stone-800">{value}</h2>
      </div>
    </div>
  )
}
