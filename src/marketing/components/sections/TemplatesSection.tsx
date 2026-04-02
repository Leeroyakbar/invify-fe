import { useCallback, useEffect, useState } from "react"
import template1 from "../../../../public/templates/template-1.png"
import template2 from "../../../../public/templates/template-2.png"
import template3 from "../../../../public/templates/template-3.png"
import template4 from "../../../../public/templates/template-4.png"
import template5 from "../../../../public/templates/template-5.png"
import { Link } from "react-router-dom"
import api from "../../../api/axiosConfig"
import type { TemplateResponse } from "../../../types/TemplateResponse"
import { toast } from "sonner"

const categories = ["Semua", "Elegant", "Modern", "Floral", "Minimalist"]

interface StaticTemplate {
  templateId: string
  templateName: string
  templateCategory: string
  popular: boolean
  src: string
  previewImage: string
  isStatic: boolean
  // Properti opsional dari TemplateResponse agar tidak error saat mapping
  usedCount?: number
}

// Buat Union Type
type CombinedTemplate = TemplateResponse | StaticTemplate

// Data Statis yang sudah disesuaikan agar strukturnya mirip/bisa dihandle bersama
const staticTemplates = [
  {
    templateId: "st-4",
    templateName: "Classic Noir",
    templateCategory: "Elegant",
    popular: true,
    src: "/demo/classic-noir",
    previewImage: template3,
    isStatic: true,
  },

  {
    templateId: "st-3",
    templateName: "Royal Elegance",
    templateCategory: "Elegant",
    popular: true,
    src: "/demo/elegant-ivory",
    previewImage: template1,
    isStatic: true,
  },

  {
    templateId: "st-2",
    templateName: "Lili",
    templateCategory: "Elegant",
    popular: false,
    src: "/demo/lili",
    previewImage: template5,
    isStatic: true,
  },

  {
    templateId: "st-1",
    templateName: "Old Money",
    templateCategory: "Elegant",
    popular: true, // tambahan untuk UI
    src: "/demo/old-money",
    previewImage: template4,
    isStatic: true,
  },
  {
    templateId: "st-5",
    templateName: "Modern Love",
    templateCategory: "Floral",
    popular: false,
    src: "/demo/modern",
    previewImage: template2,
    isStatic: true,
  },
]

export default function TemplatesSection() {
  const [active, setActive] = useState("Semua")
  // Inisialisasi state dengan data statis terlebih dahulu
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
        const dbData = response.data.data
        setTemplates([...dbData])
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        toast.error(`Gagal: ${error.message}`)
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui")
      }
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTemplates()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchTemplates])

  // Filter berdasarkan category (menggunakan field yang sesuai di DB/Static)
  const filtered = active === "Semua" ? templates : templates.filter((t) => t.templateCategory.toLowerCase() === active.toLowerCase())
  return (
    <section id="template" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Pilih Template <span className="italic text-[#D4A853]">Favorit</span> Anda
          </h2>
          <p className="mt-6 text-[#7A6F68]">Berbagai pilihan desain premium siap digunakan untuk hari spesial Anda</p>
        </div>

        {/* FILTER */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm transition border
                ${active === cat ? "bg-[#D4A853] text-white border-[#D4A853]" : "bg-white text-[#7A6F68] border-black/10 hover:border-[#D4A853]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TEMPLATE GRID */}
        <div className="mt-16 flex flex-wrap justify-center gap-10">
          {filtered.map((tpl) => {
            // Logika penentuan URL Gambar & Link Demo
            const isStatic = tpl.isStatic
            const imgSrc = isStatic ? tpl.previewImage : `${BE_URL}${tpl.previewImage}`
            const demoLink = `/demo/${tpl.templateName.toLowerCase().replace(/\s+/g, "-")}`
            const waText = encodeURIComponent(`Halo Admin, saya ingin menggunakan template ${tpl.templateName} untuk acara pernikahan saya.`)
            const waUrl = `https://api.whatsapp.com/send?phone=6282273366718&text=${waText}`

            return (
              <div
                key={tpl.templateId || tpl.templateId}
                className="group rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition overflow-hidden bg-white 
                   w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-100"
              >
                {/* PREVIEW CONTAINER */}
                <div className="relative aspect-3/4 flex items-center justify-center overflow-hidden">
                  <img src={imgSrc} alt={tpl.templateName} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                  {/* Label Popular (Hanya jika data statis popular true atau usedCount tinggi di DB) */}
                  {(tpl.popular || tpl.usedCount ? tpl.usedCount : 0 > 10) && <span className="absolute top-4 right-4 z-10 bg-[#D4A853] text-white text-xs px-3 py-1 rounded-full shadow-md">Popular</span>}
                </div>

                {/* INFO & BUTTONS */}
                <div className="p-6">
                  <div className="mb-5">
                    <h3 className="font-serif text-lg text-[#3B2F2F]">{tpl.templateName}</h3>
                    <p className="mt-1 text-sm text-[#7A6F68] capitalize">{tpl.templateCategory.toLowerCase()}</p>{" "}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={demoLink} target="_blank" className="py-2.5 px-4 text-center text-sm font-medium text-[#3B2F2F] border border-[#3B2F2F]/20 rounded-xl hover:bg-[#3B2F2F] hover:text-white transition-all">
                      View Demo
                    </Link>
                    <button onClick={() => window.open(waUrl, "_blank")} className="py-2.5 px-4 text-sm font-medium text-white bg-[#3B2F2F] rounded-xl hover:bg-[#524343] shadow-md transition-all cursor-pointer">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
