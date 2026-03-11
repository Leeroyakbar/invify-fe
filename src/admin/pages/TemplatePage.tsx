import { useCallback, useEffect, useState } from "react"
import TemplateCard from "../components/TemplateCard"
import AddTemplateModal from "../components/AddTemplateModal"
import { Plus, Search } from "lucide-react"
import { toast } from "sonner"
import api from "../../api/axiosConfig"
import { type TemplateResponse } from "../../types/TemplateResponse"

export interface Template {
  id: number
  name: string
  category: string
  price: number
  number_used: number
  status: "active" | "inactive"
  image: string
}

export default function TemplatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateResponse | null>(null)

  // state template api
  const [templates, setTemplates] = useState<TemplateResponse[]>([])

  const filteredData = templates.filter((t) => t.templateName.toLowerCase().includes(searchTerm.toLowerCase()) || t.templateCategory.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleStatus = async (id: string, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1

    setTemplates((prev) => prev.map((t) => (t.templateId === id ? { ...t, activeStatus: newStatus } : t)))

    try {
      const response = await api.patch(`/api/admin/template/${id}/status?status=${newStatus}`)

      if (!response.data.success) {
        throw new Error("Gagal update")
      }

      toast.success("Status diperbarui")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
        toast.error(`Gagal: ${error.message}`)
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui")
      }
      // rollback logic...
      setTemplates((prev) => prev.map((t) => (t.templateId === id ? { ...t, activeStatus: currentStatus } : t)))
    }
  }

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await api.post("/api/admin/template/get-all-templates", {
        templateName: searchTerm,
        templateCategory: searchTerm,
      })

      if (response.data.success) {
        setTemplates(response.data.data)
      }
    } catch (error) {
      toast.error("Gagal mengambil data template")
      console.log(error)
    }
  }, [searchTerm])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTemplates()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchTemplates])

  const handleDelete = (id: string) => {
    toast("Hapus template ini?", {
      action: {
        label: "Hapus",
        onClick: () => {
          setTemplates((prev) => prev.filter((t) => t.templateId !== id))
          toast.success("Template berhasil dihapus!")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan dibatalkan"),
      },
    })
  }

  const openEditModal = (template: TemplateResponse) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const handleSave = async (formData: { templateName: string; templateCategory: string; price: number; file: File | null }) => {
    if (selectedTemplate) {
      // Logic Edit (bisa dikembangkan nanti dengan PUT)
      const updatedTemplate = new FormData()
      updatedTemplate.append("templateId", selectedTemplate.templateId)
      updatedTemplate.append("templateName", formData.templateName)
      updatedTemplate.append("templateCategory", formData.templateCategory.toUpperCase())
      updatedTemplate.append("price", formData.price.toString())

      if (formData.file) {
        updatedTemplate.append("previewImage", formData.file)
      }

      try {
        const response = await api.put("/api/admin/template/update", updatedTemplate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.data.success) {
          toast.success("Template berhasil diupdate!")
          fetchTemplates()
          setIsModalOpen(false)
          setSelectedTemplate(null)
        } else {
          toast.error("Gagal update Template : ", response.data.error)
        }
      } catch (error) {
        toast.error("Gagal update Template!")
        console.log(error)
      }
    } else {
      // MODE TAMBAH
      const newData = new FormData()
      newData.append("templateName", formData.templateName)
      newData.append("templateCategory", formData.templateCategory.toUpperCase())
      newData.append("price", formData.price.toString())

      if (formData.file) {
        // "previewImage" adalah nama @RequestParam di Controller Spring Boot kamu
        newData.append("previewImage", formData.file)
      } else {
        toast.error("Foto preview wajib diunggah!")
        return
      }

      try {
        const response = await api.post("/api/admin/template/create", newData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Perhatikan typo: response.data.sucess -> response.data.success
        if (response.data.success) {
          toast.success("Template berhasil ditambahkan!")
          fetchTemplates() // Refresh list agar data baru muncul
          setIsModalOpen(false)
          setSelectedTemplate(null)
        } else {
          toast.error(response.data.error)
        }
      } catch (error) {
        // Tampilkan pesan error dari backend jika ada
        const errorMsg = "Gagal menambahkan template"
        toast.error(errorMsg)
        console.error(error)
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-800">Manajemen Template</h1>
          <p className="text-stone-400 text-sm font-light italic">Kelola tampilan visual undangan</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#D4A853] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#D4A853]/20 hover:scale-105 transition-all">
          <Plus size={18} /> Tambah Template
        </button>
      </div>
      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau kategori..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-stone-100 rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:outline-none focus:border-[#D4A853] transition-all"
        />
      </div>
      {/* Grid Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <TemplateCard key={item.templateId} item={item} onStatusChange={toggleStatus} onDelete={handleDelete} onEdit={openEditModal} />
        ))}
      </div>
      <AddTemplateModal
        key={selectedTemplate?.templateId || "new-template"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTemplate(null)
        }}
        onSave={handleSave}
        initialData={selectedTemplate}
      />
    </div>
  )
}
