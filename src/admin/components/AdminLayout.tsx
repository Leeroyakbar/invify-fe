import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Users, Mail, Palette, Receipt, BarChart3, Settings, LogOut, ChevronLeft } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router-dom"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Pengguna", icon: Users, path: "/admin/users" },
  { name: "Undangan", icon: Mail, path: "/admin/invitations" },
  { name: "Template", icon: Palette, path: "/admin/template" },
  { name: "Transaksi", icon: Receipt, path: "/admin/transaksi" },
  { name: "Laporan", icon: BarChart3, path: "/admin/laporan" },
  { name: "Pengaturan", icon: Settings, path: "/admin/pengaturan" },
]

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-[#FDFBF7] font-sans">
      {/* SIDEBAR */}
      <motion.aside initial={false} animate={{ width: isCollapsed ? 80 : 260 }} className="bg-white border-r border-stone-100 flex flex-col sticky top-0 h-screen z-50 transition-all shadow-sm">
        {/* Header Logo */}
        <div className="h-20 flex items-center px-6 justify-between border-b border-stone-50">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <div className="w-8 rounded-lg flex items-center justify-center">
                  <img src="/logo-without-text-3.png" alt="" />
                </div>
                <span className="font-serif font-bold text-stone-800 text-lg tracking-tight">Admin Panel</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg bg-stone-50 text-stone-400 hover:text-[#D4A853] transition-colors">
            <ChevronLeft size={18} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <motion.div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${isActive ? "bg-[#D4A853]/10 text-[#D4A853]" : "text-stone-400 hover:bg-stone-50"}`} whileHover={{ x: 4 }}>
                  <item.icon size={20} className={isActive ? "text-[#D4A853]" : "group-hover:text-stone-600"} />
                  {!isCollapsed && <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "font-bold" : ""}`}>{item.name}</span>}
                  {isActive && <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-[#D4A853] rounded-r-full" />}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-stone-50">
          <div className={`flex items-center gap-3 mb-4 ${isCollapsed ? "justify-center" : "px-2"}`}>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-[10px] font-bold">ADM</div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-bold text-stone-800">Administrator</span>
                <span className="text-[10px] text-stone-400">admin@invify.com</span>
              </div>
            )}
          </div>
          <Link to="/" className={`w-full flex items-center gap-3 px-3 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all ${isCollapsed ? "justify-center" : ""}`}>
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-semibold">Keluar</span>}
          </Link>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#FDFBF7]">
        <div className="p-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
