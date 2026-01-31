import { useState } from "react"
import TemplateCard from "../components/TemplateCard"
import AddTemplateModal from "../components/AddTemplateModal"
import { Plus, Search } from "lucide-react"
import { toast } from "sonner"

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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "ELegant-Ivory",
      category: "Elegant",
      price: 100000,
      number_used: 1000,
      status: "active",
      image: "",
    },
    {
      id: 2,
      name: "Classic-Noir",
      category: "Elegant",
      price: 150000,
      number_used: 1000,
      status: "active",
      image: "",
    },
    {
      id: 3,
      name: "Old-Money",
      category: "Elegant",
      price: 150000,
      number_used: 1000,
      status: "active",
      image: "",
    },
    {
      id: 4,
      name: "Modern-Love",
      category: "Floral",
      price: 100000,
      number_used: 1000,
      status: "active",
      image: "",
    },
  ])

  const filteredData = templates.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleStatus = (id: number, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"

    // update state
    setTemplates((prevTemplates) => prevTemplates.map((template) => (template.id === id ? { ...template, status: newStatus } : template)))
  }

  const handleDelete = (id: number) => {
    toast("Hapus template ini?", {
      action: {
        label: "Hapus",
        onClick: () => {
          setTemplates((prev) => prev.filter((t) => t.id !== id))
          toast.success("Template berhasil dihapus!")
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => console.log("Penghapusan dibatalkan"),
      },
    })
  }

  const openEditModal = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  // Tambahkan tipe untuk data dari form agar sinkron dengan Modal
  const handleSave = (formData: { name: string; category: string; image: string; price: number }) => {
    if (selectedTemplate) {
      // MODE EDIT: Gunakan data lama (id, number_used, dll) dan timpa dengan data baru dari form
      setTemplates((prev) => prev.map((t) => (t.id === selectedTemplate.id ? { ...t, ...formData } : t)))
    } else {
      // MODE TAMBAH: Buat objek Template lengkap untuk data baru
      const newEntity: Template = {
        id: Date.now(),
        ...formData,
        number_used: 0,
        status: "active",
      }
      setTemplates((prev) => [...prev, newEntity])
    }

    setIsModalOpen(false)
    setSelectedTemplate(null)
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
          <TemplateCard key={item.id} item={item} onStatusChange={toggleStatus} onDelete={handleDelete} onEdit={openEditModal} />
        ))}
      </div>
      <AddTemplateModal
        key={selectedTemplate?.id || "new-template"}
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
