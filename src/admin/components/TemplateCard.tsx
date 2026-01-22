import { motion } from "framer-motion"
import { ImageIcon, MoreVertical } from "lucide-react"
import { type Template } from "../pages/TemplatePage"

export default function TemplateCard({ item }: { item: Template }) {
  return (
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 overflow-hidden group">
      {/* Thumbnail Area */}
      <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center relative overflow-hidden">
        <ImageIcon className="text-stone-300 group-hover:scale-110 transition-transform duration-500" size={48} />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-xl text-stone-400 hover:text-[#D4A853] shadow-sm">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-serif text-lg text-stone-800 italic">{item.name}</h4>
            <span className="px-2 py-0.5 bg-violet-50 text-violet-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-stone-50 pt-4">
          <div>
            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Harga</p>
            <p className="text-[#D4A853] font-bold text-sm">Rp {item.price.toLocaleString("id-ID")}</p>
          </div>
          <p className="text-[10px] text-stone-400 italic">{item.number_used} digunakan</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-stone-500 font-medium">Status {item.status}</span>
          {/* Toggle Switch Simple */}
          <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${item.status === "active" ? "bg-[#D4A853]" : "bg-stone-200"}`}>
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.status === "active" ? "left-6" : "left-1"}`} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
