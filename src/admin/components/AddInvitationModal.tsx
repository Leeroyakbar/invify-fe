import { AnimatePresence, motion } from "framer-motion"
import { X, Plus, Trash2, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import type { UserResponse } from "../pages/UserPage"
import type { TemplateResponse } from "../pages/TemplatePage"
import CustomDropdownSearch from "./CustomDropdownSearch"
import type { InvitationRequest } from "../pages/AdminInvitationPage"

interface EventData {
  name: string
  date: string
  endDate: string
  location: string
  address: string
  mapUrl: string
}

interface AddInvitationModalProps {
  isAddModalOpen: boolean
  isLoading: boolean
  onClose: () => void
  onSave: (data: InvitationRequest) => void
  // Tambahkan props untuk data dinamis dari parent
  users: UserResponse[]
  templates: TemplateResponse[]
}

export function AddInvitationModal({ isAddModalOpen, isLoading, onClose, onSave, users, templates }: AddInvitationModalProps) {
  // all state untuk menyimpan data undangan baru
  const [selectedUser, setSelectedUser] = useState<UserResponse>()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateResponse>()
  const [expiredDate, setExpiredDate] = useState<string>("")
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [brideName, setBrideName] = useState<string>("")
  const [groomName, setGroomName] = useState<string>("")
  const [musicBackground, setMusicBackground] = useState<string>("")

  // State Internal Form
  const [events, setEvents] = useState<EventData[]>([{ name: "", date: "", endDate: "", location: "", address: "", mapUrl: "" }])
  // Di dalam komponen AddInvitationModal
  const [groomImage, setGroomImage] = useState<string | null>(null)
  const [brideImage, setBrideImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  const [brideFile, setBrideFile] = useState<File | null>(null)
  const [groomFile, setGroomFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [videoBackground, setVideoBackground] = useState<File | null>(null)

  const PLAN_CONFIG = {
    Basic: { maxPhotos: 8, allowVideo: false },
    Premium: { maxPhotos: 15, allowVideo: true },
    Custom: { maxPhotos: 30, allowVideo: true },
  }

  const plans = ["Basic", "Premium", "Custom"]

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validasi ukuran (contoh: 20MB)
      if (file.size > 120 * 1024 * 1024) {
        toast.error("File terlalu besar! Maksimal 20MB")
        return
      }

      // Membuat URL sementara untuk preview
      setVideoBackground(file)
      const videoUrl = URL.createObjectURL(file)
      setVideoPreview(videoUrl)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const maxPhotos = selectedPlan ? PLAN_CONFIG[selectedPlan as keyof typeof PLAN_CONFIG].maxPhotos : 0

    if (galleryFiles.length + files.length > maxPhotos) {
      toast.error(`Maksimal ${maxPhotos} foto untuk paket ini`)
      return
    }

    setGalleryFiles((prev) => [...prev, ...files])

    console.log(galleryFiles)
    // Untuk preview
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGalleryImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "groom" | "bride") => {
    const file = e.target.files?.[0]
    console.log("file :", file)
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const fileName = file.name.toLowerCase()
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"]

    // Cek MIME type ATAU cek ekstensi file
    const isTypeAllowed = allowedTypes.includes(file.type)
    const isExtensionAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext))

    if (!isTypeAllowed && !isExtensionAllowed) {
      toast.error("Format foto tidak didukung!", {
        description: "Format file tidak didukung! gunakan JPG, PNG, atau WebP. ",
        duration: 5000,
      })

      e.target.value = "" // Reset input
      return
    }

    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("Ukuran foto terlalu besar!", {
        description: "Maksimal ukuran foto adalah 2MB. Silakan kompres foto Anda.",
      })
      e.target.value = ""
      return
    }

    // Jika lolos validasi
    const previewUrl = URL.createObjectURL(file)
    if (type === "groom") {
      setGroomFile(file)
      setGroomImage(previewUrl)
    } else {
      setBrideFile(file)
      setBrideImage(previewUrl)
    }
  }

  const validateYouTubeUrl = (url: string) => {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})(?:[^\s]*)$/
    return pattern.test(url)
  }

  const handleMusicBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value
    if (url && !validateYouTubeUrl(url)) {
      toast.error("Link YouTube tidak valid!", {
        description: "Pastikan link benar, contoh: https://www.youtube.com/watch?v=xxxx",
      })
      // Opsional: setMusicBackground(""); // Reset jika ingin memaksa link benar
    }
  }

  const addEvent = () => {
    if (events.length < 3) {
      setEvents([...events, { name: "", date: "", endDate: "", location: "", address: "", mapUrl: "" }])
    } else {
      toast.error("Maksimal 3 rangkaian acara")
    }
  }

  const removeEvent = (index: number) => {
    if (events.length > 1) {
      setEvents(events.filter((_, i) => i !== index))
    }
  }

  const updateEvent = (index: number, key: keyof EventData, value: string) => {
    const updatedEvents = events.map((event, i) => {
      if (i === index) {
        return { ...event, [key]: value } // Update field yang spesifik
      }
      return event // Biarkan yang lain tetap
    })
    setEvents(updatedEvents)
  }

  const handleSave = () => {
    if (!selectedUser || !selectedTemplate || !selectedPlan || !musicBackground || !brideName || !groomName) {
      toast.error("Semua field harus diisi")
      return
    }

    const formData = new FormData()

    formData.append("coupleName", `${brideName} & ${groomName}`)
    formData.append("templateId", selectedTemplate.templateId)
    formData.append("subscriptionPlan", selectedPlan)
    formData.append("musicBackground", musicBackground)
    formData.append("expiredDate", expiredDate)
    formData.append("eventJson", JSON.stringify(events))

    // Append Files
    if (brideFile) formData.append("bridePhoto", brideFile)
    if (groomFile) formData.append("groomPhoto", groomFile)
    if (videoBackground) formData.append("videoBackground", videoBackground)
    ;(galleryFiles || []).forEach((file) => {
      formData.append("gallery", file)
    })

    onSave(formData as unknown as InvitationRequest)
  }

  return (
    <AnimatePresence>
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-100"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-50 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-800">New Invitation</h2>
                <p className="text-stone-400 text-xs italic">Konfigurasi engine undangan baru</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full text-stone-400 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-10">
              {/* SECTION 1: COUPLE INFO */}
              <section className="space-y-6">
                <h3 className="text-sm font-bold text-[#D5A853] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-px bg-[#D5A853]"></span> Couple Information
                </h3>

                {/* Row Atas: Dropdowns & Date */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CustomDropdownSearch
                    label="Customer"
                    options={users.map((u) => u.fullName)}
                    value={selectedUser?.fullName || ""}
                    onChange={(selectedName) => {
                      const userObj = users.find((u) => u.fullName === selectedName)
                      if (userObj) {
                        setSelectedUser(userObj)
                      }
                    }}
                  />{" "}
                  <CustomDropdownSearch
                    label="Subscription Plan"
                    options={plans}
                    value={selectedPlan}
                    onChange={(val) => {
                      setSelectedPlan(val)
                      // Jika ganti plan, kita filter gambar yang kelebihan (opsional)
                      const max = PLAN_CONFIG[val as keyof typeof PLAN_CONFIG].maxPhotos
                      if (galleryImages.length > max) {
                        setGalleryImages(galleryImages.slice(0, max))
                        toast.info("Jumlah foto disesuaikan dengan paket baru")
                      }
                    }}
                  />
                  <CustomDropdownSearch
                    label="Template"
                    options={templates.map((t) => t.templateName)}
                    value={selectedTemplate?.templateName || ""}
                    onChange={(selectedTemplate) => {
                      const templateObj = templates.find((t) => t.templateName === selectedTemplate)

                      if (templateObj) {
                        setSelectedTemplate(templateObj)
                      }
                    }}
                  />{" "}
                </div>

                <div className="flex flex-col gap-1.5 max-w-xs">
                  <label className="text-xs font-bold text-stone-500 ml-1">Berlaku Hingga</label>
                  <input type="date" value={expiredDate || ""} onChange={(e) => setExpiredDate(e.target.value)} className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#D5A853] outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* BRIDE CARD */}
                  <div className="p-6 bg-stone-50/50 rounded-3xl border border-stone-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative group w-20 h-20 shrink-0">
                        <div
                          className={`w-full h-full rounded-2xl border-2 overflow-hidden transition-all duration-300 flex items-center justify-center bg-white ${brideImage ? "border-[#D5A853] shadow-sm" : "border-stone-200 border-dashed hover:border-[#D5A853]"}`}
                        >
                          {brideImage ? (
                            <img src={brideImage} alt="Bride" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-stone-300 group-hover:text-[#D5A853]">
                              <Plus size={18} />
                              <span className="text-[8px] font-bold">FOTO</span>
                            </div>
                          )}
                        </div>
                        <input type="file" onChange={(e) => handleImageChange(e, "bride")} className="absolute inset-0 opacity-0 cursor-pointer z-0" accept=".jpg, .jpeg, .png, .webp" />
                        {brideImage && (
                          <button onClick={() => setBrideImage(null)} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-md">
                            <X size={10} />
                          </button>
                        )}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">Bride Name (Wanita)</label>
                        <input
                          type="text"
                          placeholder="Nama Lengkap Wanita"
                          value={brideName}
                          onChange={(e) => setBrideName(e.target.value)}
                          className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#D5A853] outline-none transition-all"
                        />
                      </div>
                    </div>
                    {brideImage && <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">✓ Foto wanita siap diunggah</p>}
                  </div>

                  {/* GROOM CARD */}
                  <div className="p-6 bg-stone-50/50 rounded-3xl border border-stone-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative group w-20 h-20 shrink-0">
                        <div
                          className={`w-full h-full rounded-2xl border-2 overflow-hidden transition-all duration-300 flex items-center justify-center bg-white ${groomImage ? "border-[#D5A853] shadow-sm" : "border-stone-200 border-dashed hover:border-[#D5A853]"}`}
                        >
                          {groomImage ? (
                            <img src={groomImage} alt="Groom" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-stone-300 group-hover:text-[#D5A853]">
                              <Plus size={18} />
                              <span className="text-[8px] font-bold">FOTO</span>
                            </div>
                          )}
                        </div>
                        <input type="file" onChange={(e) => handleImageChange(e, "groom")} className="absolute inset-0 opacity-0 cursor-pointer z-0" accept=".jpg, .jpeg, .png, .webp" />
                        {groomImage && (
                          <button onClick={() => setGroomImage(null)} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-md">
                            <X size={10} />
                          </button>
                        )}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">Groom Name (Pria)</label>
                        <input
                          type="text"
                          placeholder="Nama Lengkap Pria"
                          value={groomName}
                          onChange={(e) => setGroomName(e.target.value)}
                          className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#D5A853] outline-none transition-all"
                        />
                      </div>
                    </div>
                    {groomImage && <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">✓ Foto pria siap diunggah</p>}
                  </div>
                </div>
              </section>

              {/* SECTION 2: MEDIA */}
              <section className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-bold text-[#D5A853] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-px bg-[#D5A853]"></span> Media Assets
                  </h3>
                  <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                    PLAN: {selectedPlan || "None"}({galleryImages.length}/{selectedPlan ? PLAN_CONFIG[selectedPlan as keyof typeof PLAN_CONFIG].maxPhotos : 0} Photos)
                  </span>
                </div>

                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-6">
                  {/* Music Link tetap di atas karena umum untuk semua plan */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-500 ml-1">Youtube Music Link</label>
                    <input
                      type="text"
                      placeholder="https://youtube.com/..."
                      value={musicBackground || ""}
                      onChange={(e) => setMusicBackground(e.target.value)}
                      onBlur={handleMusicBlur}
                      className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2.5 text-sm focus:border-[#D5A853] outline-none shadow-sm shadow-stone-200/50"
                    />
                  </div>

                  {/* Gallery Grid */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-500 ml-1 flex justify-between">
                      Gallery Photos
                      {selectedPlan === "Basic" && <span className="text-[10px] text-amber-600 font-medium italic">*Upgrade ke Premium untuk upload Video dan Foto</span>}
                    </label>

                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {/* Render Existing Images */}
                      {galleryImages.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#D5A853] group">
                          <img src={img} className="w-full h-full object-cover" />
                          <button onClick={() => removeGalleryImage(index)} className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {/* Add Button Slot - Hanya muncul jika belum limit */}
                      {selectedPlan && galleryImages.length < PLAN_CONFIG[selectedPlan as keyof typeof PLAN_CONFIG].maxPhotos && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-stone-200 hover:border-[#D5A853] hover:bg-[#D5A853]/5 transition-all cursor-pointer flex flex-col items-center justify-center text-stone-400 hover:text-[#D5A853]">
                          <Plus size={20} />
                          <span className="text-[9px] font-bold mt-1">ADD</span>
                          <input type="file" multiple className="hidden" accept="image/*" onChange={handleGalleryUpload} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Video Asset - Conditionally Rendered */}
                  {selectedPlan && PLAN_CONFIG[selectedPlan as keyof typeof PLAN_CONFIG].allowVideo && (
                    <div className="pt-4 border-t border-stone-200/50">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <label className="text-xs font-bold text-stone-500 ml-1">Background Video</label>
                          <p className="text-[10px] text-stone-400 mb-2 italic">Format MP4 disarankan (Max 20MB)</p>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange} // Tambahkan ini
                            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-stone-800 file:text-white hover:file:bg-black transition-all cursor-pointer"
                          />
                          {videoPreview && (
                            <button
                              onClick={() => {
                                setVideoPreview(null)
                                setVideoBackground(null)
                              }}
                              className="mt-2 text-[10px] text-rose-500 font-bold hover:underline"
                            >
                              Hapus Video
                            </button>
                          )}
                        </div>

                        {/* Preview Area yang sudah aktif */}
                        <div className="w-full md:w-1/3 aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border border-stone-200">
                          {videoPreview ? <video src={videoPreview} className="w-full h-full object-cover" controls autoPlay muted loop /> : <span className="text-stone-500 text-[10px] italic">Video Preview Area</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION 3: EVENTS (Dynamic) */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-[#D5A853] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-px bg-[#D5A853]"></span> Rangkaian Acara
                  </h3>
                  {events.length < 3 && (
                    <button onClick={addEvent} className="text-xs font-bold text-[#D5A853] hover:text-[#b88f46] flex items-center gap-1 transition-colors">
                      <Plus size={14} /> Tambah Acara
                    </button>
                  )}
                </div>

                <div className="space-y-8">
                  {events.map((event, index) => (
                    <div key={index} className="p-6 border border-stone-100 rounded-2xl space-y-4 relative bg-white shadow-sm shadow-stone-200/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-stone-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase italic tracking-tighter">Event #{index + 1}</span>
                        {events.length > 1 && (
                          <button onClick={() => removeEvent(index)} className="text-stone-300 hover:text-rose-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 md:col-span-1 flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-400 ml-1">Nama Acara</label>
                          <input
                            value={event.name}
                            onChange={(e) => updateEvent(index, "name", e.target.value)}
                            placeholder="Contoh: Akad Nikah"
                            className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D5A853]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-400 ml-1">Waktu Mulai</label>
                          <input
                            type="datetime-local"
                            value={event.date}
                            onChange={(e) => updateEvent(index, "date", e.target.value)}
                            className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D5A853]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-400 ml-1">Waktu Selesai</label>
                          <input
                            type="datetime-local"
                            value={event.endDate}
                            onChange={(e) => updateEvent(index, "endDate", e.target.value)}
                            className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D5A853]"
                          />
                        </div>
                      </div>

                      <input
                        placeholder="Nama Lokasi (e.g. Grand Ballroom)"
                        value={event.location}
                        onChange={(e) => updateEvent(index, "location", e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D5A853]"
                      />
                      <textarea
                        placeholder="Alamat Lengkap Lokasi"
                        value={event.address}
                        onChange={(e) => updateEvent(index, "address", e.target.value)}
                        rows={2}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#D5A853] resize-none"
                      />
                      <input
                        placeholder="Google Maps URL"
                        value={event.mapUrl}
                        onChange={(e) => updateEvent(index, "mapUrl", e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-[10px] font-mono outline-none focus:border-[#D5A853]"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* FOOTER ACTIONS */}
              <div className="pt-6 flex flex-col md:flex-row gap-4 border-t border-stone-50">
                {(isLoading && (
                  <button disabled className="flex-1 bg-stone-200 text-stone-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                    <Loader2 className="animate-spin" size={20} />
                    Sedang Menyimpan...
                  </button>
                )) || (
                  <button onClick={handleSave} className="flex-1 bg-[#D5A853] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#D5A853]/20 hover:bg-[#b88f46] hover:scale-[1.01] active:scale-[0.99] transition-all">
                    Simpan Undangan
                  </button>
                )}

                <button onClick={onClose} className="px-12 py-4 border border-stone-100 text-stone-400 font-bold rounded-2xl hover:bg-stone-50 transition-colors">
                  Batal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
