import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, ShoppingCart, Star } from "lucide-react"
import { toast } from "sonner"
import api from "../../../api/axiosConfig"
import type { TemplateResponse } from "../../../types/TemplateResponse"

// Import assets tetap sama
import template1 from "../../../../public/templates/template-1.png"
// import template2 from "../../../../public/templates/template-2.png"
import template3 from "../../../../public/templates/template-3.png"
import template4 from "../../../../public/templates/template-4.png"
import template5 from "../../../../public/templates/template-5.png"
import rahmaTemplate from "../../../../public/templates/rahma-template.webp"

const categories = ["Semua", "Elegant", "Modern", "Floral", "Minimalist"]

interface StaticTemplate {
  templateId: string
  templateName: string
  templateCategory: string
  price: string
  popular: boolean
  src: string
  previewImage: string
  isStatic: boolean
  usedCount?: number
}

type CombinedTemplate = TemplateResponse | StaticTemplate

const staticTemplates = [
  { templateId: "st-4", templateName: "Classic Noir", templateCategory: "Elegant", price: "100.000 - 150.000", popular: true, src: "/demo/classic-noir", previewImage: template3, isStatic: true },
  { templateId: "st-2", templateName: "Lili", templateCategory: "Elegant", price: "100.000 - 150.000", popular: true, src: "/demo/lili", previewImage: template5, isStatic: true },
  { templateId: "st-6", templateName: "Rahma", templateCategory: "Elegant", price: "100.000 - 150.000", popular: true, src: "/demo/rahma", previewImage: rahmaTemplate, isStatic: true },
  { templateId: "st-3", templateName: "Royal Elegance", templateCategory: "Elegant", price: "100.000 - 150.000", popular: false, src: "/demo/elegant-ivory", previewImage: template1, isStatic: true },
  { templateId: "st-1", templateName: "Old Money", templateCategory: "Elegant", price: "100.000 - 150.000", popular: false, src: "/demo/old-money", previewImage: template4, isStatic: true },
  // { templateId: "st-5", templateName: "Modern Love", templateCategory: "Floral", price: "100.000 - 150.000", popular: false, src: "/demo/modern", previewImage: template2, isStatic: true },
]

export default function TemplatesSection() {
  const [active, setActive] = useState("Semua")
  const [templates, setTemplates] = useState<CombinedTemplate[]>(staticTemplates)
  const BE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await api.post("/api/admin/template/get-all-templates", {
        activeStatus: 1,
        page: 0,
        size: 999,
      })
      if (response.data.success) {
        setTemplates([...response.data.data])
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal memuat template terbaru")
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchTemplates(), 500)
    return () => clearTimeout(timer)
  }, [fetchTemplates])

  const filtered = active === "Semua" ? templates : templates.filter((t) => t.templateCategory.toLowerCase() === active.toLowerCase())

  return (
    <section id="template" className="bg-[#0A0A0A] py-32 px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-xl">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-4 block">
              Curated Selection
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-cormorant-upright text-5xl md:text-7xl text-white leading-none uppercase tracking-tighter">
              Timeless <span className="italic opacity-40 font-light text-white">Archives</span>
            </motion.h2>
          </div>

          {/* FILTER - Minimalist Tabs */}
          <div className="flex flex-wrap gap-6 border-b border-white/10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2
                  ${active === cat ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                {cat}
                {active === cat && <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* TEMPLATE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((tpl, i) => {
              const isStatic = tpl.isStatic
              const imgSrc = isStatic ? tpl.previewImage : `${BE_URL}${tpl.previewImage}`
              const demoLink = `/demo/${tpl.templateName.toLowerCase().replace(/\s+/g, "-")}`
              const waUrl = `https://api.whatsapp.com/send?phone=6282273366718&text=${encodeURIComponent(`Halo Admin, saya ingin memesan template ${tpl.templateName}`)}`

              return (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.6, delay: i * 0.1 }} key={tpl.templateId} className="group">
                  {/* IMAGE WRAPPER */}
                  <div className="relative aspect-3/4 overflow-hidden bg-[#161616] mb-8 ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-500">
                    {/* Link Utama yang menutupi seluruh area gambar */}
                    <Link to={demoLink} target="_blank" className="absolute inset-0 z-10 block" aria-label={`Preview ${tpl.templateName}`} />

                    <img src={imgSrc} alt={tpl.templateName} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />

                    {/* OVERLAY ACTION - Sekarang hanya untuk visual desktop */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 pointer-events-none">
                      {/* Pointer-events-none agar tidak menghalangi Link utama di atasnya */}
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Eye size={20} />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white font-bold">Live Preview</span>
                    </div>

                    {/* FEATURED BADGE - Z-index lebih tinggi agar tetap terlihat */}
                    {(tpl.popular || (tpl.usedCount || 0) > 10) && (
                      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 flex items-center gap-2 z-20">
                        <Star size={10} className="text-white fill-white" />
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white font-bold">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-cormorant-upright text-2xl text-white tracking-wider uppercase group-hover:italic transition-all">{tpl.templateName}</h3>
                      <p className="font-inter text-[10px] text-white/30 uppercase tracking-[0.3em]">Collection — {tpl.templateCategory}</p>
                      <p className="font-inter text-[10px] text-white/30 uppercase tracking-[0.3em]">Rp. {tpl.price}</p>
                    </div>

                    <button onClick={() => window.open(waUrl, "_blank")} className="p-3 border border-white/10 text-white/40 hover:text-black hover:bg-white hover:border-white transition-all rounded-sm">
                      <ShoppingCart size={18} strokeWidth={1} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
