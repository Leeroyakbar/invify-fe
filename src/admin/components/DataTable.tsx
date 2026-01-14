import { MoreVertical, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// 1. Tambahkan <T> pada Column
export interface Column<T> {
  header: string
  key: keyof T | string
  className?: string
  render?: (item: T) => React.ReactNode
}

// 2. Gunakan Generic <T> pada Props
interface DataTableProps<T> {
  title: string
  count: number
  columns: Column<T>[]
  data: T[]
  emptyText?: string
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

// 3. Fungsi utama dengan constraint T harus objek
export default function DataTable<T extends object>({ title, count, columns, data, emptyText = "Data tidak ditemukan...", onEdit, onDelete }: DataTableProps<T>) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  return (
    <div className="bg-white rounded-3xl border border-stone-50 shadow-sm overflow-hidden font-sans">
      <div className="p-6 border-b border-stone-50 flex justify-between items-center">
        <h3 className="font-serif text-lg text-stone-800 italic tracking-tight">
          {title}
          <span className="ml-2 text-sm font-sans font-normal text-stone-400 not-italic">({count})</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-stone-50/50 text-stone-400 text-[10px] uppercase tracking-[0.15em]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 font-bold ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-50 text-xs">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx || idx} className="hover:bg-stone-50/40 transition-colors group">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-5 ${col.className || ""}`}>
                      {/* Solusi Tanpa Any: Gunakan pengecekan tipe data atau render function */}
                      {col.render ? col.render(item) : String(item[col.key as keyof T] || "")}
                    </td>
                  ))}

                  {/* ... Bagian Aksi (Tetap Sama) ... */}
                  <td className="px-6 py-5 text-center relative">
                    <button type="button" onClick={() => setActiveMenu(activeMenu === idx ? null : idx)} className="p-2 hover:bg-stone-100 rounded-xl text-stone-300 hover:text-[#D4A853] transition-all">
                      <MoreVertical size={16} />
                    </button>

                    <AnimatePresence>
                      {activeMenu === idx && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-12 top-1/2 -translate-y-1/2 z-20 bg-white border border-stone-100 shadow-xl rounded-2xl py-2 min-w-30"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                onEdit?.(item)
                                setActiveMenu(null)
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-600 hover:text-[#D4A853] transition-colors"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onDelete?.(item)
                                setActiveMenu(null)
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-rose-500 transition-colors"
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-20 text-center text-stone-400 italic font-light">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination ... */}
      {/* FOOTER / PAGINATION */}
      <div className="p-6 border-t border-stone-50 flex justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
        <span>Menampilkan {data.length} data</span>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 border border-stone-100 rounded-lg hover:bg-stone-50 transition-all">Prev</button>
          <button className="px-4 py-1.5 border border-stone-100 rounded-lg hover:bg-stone-50 transition-all">Next</button>
        </div>
      </div>
    </div>
  )
}
