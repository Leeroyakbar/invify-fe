import { AnimatePresence, motion } from "framer-motion"
import { X, Upload } from "lucide-react"
import CustomDropdown from "./CustomDropdown"
import { useRef, useState } from "react"
import { toast } from "sonner"
import type { TemplateResponse } from "../../types/TemplateResponse"

export default function AddTemplateModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { templateName: string; templateCategory: string; previewImage: string; price: number; file: File | null }) => void
  initialData: TemplateResponse | null
}) {
  const [templateName, setTemplateName] = useState(initialData?.templateName || "")
  const [templateCategory, setTemplateCategory] = useState(initialData?.templateCategory || "Elegant")
  const [price, setPrice] = useState<number | string>(initialData?.price || "")
  const [previewImage, setPreviewImage] = useState(initialData?.previewImage)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const BE_URL = import.meta.env.VITE_API_BASE_URL
  // Handler Upload Gambar
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file) // Simpan file untuk API
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string) // Hanya untuk tampilan preview di UI
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!templateName) {
      toast.error("Nama template tidak boleh kosong!")
      return
    }

    // Kirim objek yang konsisten dengan kebutuhan handleSave
    onSave({
      templateName,
      templateCategory,
      previewImage: "",
      price: price === "" ? 0 : Number(price),
      file: selectedFile,
    })
  }

  const formatRupiah = (value: number | string) => {
    if (value === "" || value === 0) return ""
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const parseRawNumber = (value: string) => {
    return value.replace(/\./g, "")
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseRawNumber(e.target.value)

    // Hanya update jika input adalah angka atau kosong
    if (rawValue === "" || /^\d+$/.test(rawValue)) {
      setPrice(rawValue === "" ? "" : Number(rawValue))
    }
  }

  const handleClose = () => {
    onClose()
    setTemplateName("")
    setTemplateCategory("Elegant")
    setPreviewImage("")
    setPrice(0)
    setSelectedFile(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-xl rounded-4xl shadow-2xl z-10">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif italic text-stone-800">{initialData ? "Edit Template" : "Tambah Template Baru"}</h3>
                <button onClick={handleClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Upload Preview</label>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-stone-100 rounded-2xl h-40 flex flex-col items-center justify-center text-stone-400 hover:border-[#D4A853]/50 transition-all cursor-pointer overflow-hidden"
                  >
                    {previewImage ? (
                      <img src={previewImage.startsWith("data:") ? previewImage : `${BE_URL}${previewImage}`} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs italic">Click to upload photo template</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nama Template</label>
                  <input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#D4A853]/20 transition-all"
                    placeholder="Example: Modern Gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Price</label>
                  <div className="relative">
                    <input
                      type="text" // Ubah ke text agar bisa menampilkan titik
                      value={formatRupiah(price)}
                      onChange={handlePriceChange}
                      className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#D4A853]/20 transition-all"
                      placeholder="Example: 100.000"
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-1">
                  <CustomDropdown label="Category" options={["Elegant", "Floral", "Modern"]} value={templateCategory} onChange={setTemplateCategory} />
                </div>
              </div>

              <button onClick={handleSubmit} className="w-full bg-[#D4A853] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#D4A853]/30 hover:bg-[#c29645] transition-all">
                Simpan Template
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
