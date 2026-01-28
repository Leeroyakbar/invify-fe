import { AnimatePresence, motion } from "framer-motion"
import { X, Upload } from "lucide-react"
import CustomDropdown from "./CustomDropdown"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function AddTemplateModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: { name: string; category: string; image: string; price: number }) => void }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Elegant")
  const [price, setPrice] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handler Upload Gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // 1. Validasi: Jika nama kosong, tampilkan toast dan BERHENTI
    if (!name) {
      toast.error("Nama template tidak boleh kosong!")
      return // Sangat penting agar tidak lanjut ke onSave
    }

    // 2. Jika valid, jalankan onSave
    onSave({ name, category, image: imagePreview || "", price })

    // 3. Beri feedback sukses
    toast.success("Template berhasil ditambahkan!")

    // 4. Reset form
    setName("")
    setImagePreview(null)
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-xl rounded-4xl shadow-2xl z-10">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif italic text-stone-800">Tambah Template Baru</h3>
                <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400">
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
                    {" "}
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs italic">Klik untuk upload foto template</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nama Template</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#D4A853]/20 transition-all"
                    placeholder="Example: Modern Gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Price</label>
                  <input
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#D4A853]/20 transition-all"
                    placeholder="Example : 100000"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <CustomDropdown label="Category" options={["Elegant", "Floral", "Modern"]} value={category} onChange={setCategory} />
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
