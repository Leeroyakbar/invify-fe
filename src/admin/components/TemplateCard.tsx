import { AnimatePresence, motion } from "framer-motion"
import { Edit3, ImageIcon, MoreVertical, Trash2 } from "lucide-react"
import { type TemplateResponse } from "../../types/TemplateResponse"
import { useState } from "react"

export default function TemplateCard({
  item,
  onStatusChange,
  onDelete,
  onEdit,
}: {
  item: TemplateResponse
  onStatusChange: (id: string, currentStatus: number) => void
  onDelete: (id: string) => void
  onEdit: (item: TemplateResponse) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const BE_URL = import.meta.env.VITE_API_BASE_URL

  return (
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 overflow-hidden group">
      {/* Thumbnail Area */}
      <div className="aspect-4/3 bg-stone-100 flex items-center justify-center relative overflow-hidden">
        {item.previewImage ? (
          <img src={`${BE_URL}${item.previewImage}`} alt="Thumbnail" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <ImageIcon className="text-stone-300 group-hover:scale-110 transition-transform duration-500" size={48} />
        )}
        <div className="absolute top-4 right-4">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-white/80 backdrop-blur-sm rounded-xl text-stone-400 hover:text-[#D4A853] shadow-sm">
            <MoreVertical size={16} />
          </button>

          {/* Floating Menu */}
          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0" onClick={() => setShowMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-stone-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      onEdit(item)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-stone-50 text-stone-600"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    disabled
                    onClick={() => {
                      onDelete(item.templateId)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-rose-50 text-rose-500"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-serif text-lg text-stone-800 italic">{item.templateName}</h4>
            <span className="px-2 py-0.5 bg-violet-50 text-violet-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">{item.templateCategory}</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-stone-50 pt-4">
          <div>
            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Harga</p>
            <p className="text-[#D4A853] font-bold text-sm">Rp {item.price.toLocaleString("id-ID")}</p>
          </div>
          <p className="text-[10px] text-stone-400 italic">{item.usedCount} digunakan</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-stone-500 font-medium">Status {item.activeStatus === 1 ? "Active" : "Non Active"}</span>
          {/* Toggle Switch Simple */}
          <div onClick={() => onStatusChange(item.templateId, item.activeStatus)} className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${item.activeStatus === 1 ? "bg-[#D4A853]" : "bg-stone-200"}`}>
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.activeStatus === 1 ? "left-6" : "left-1"}`} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
