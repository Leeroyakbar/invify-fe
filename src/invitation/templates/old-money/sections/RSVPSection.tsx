import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function RSVPSection() {
  const [guestName, setGuestName] = useState("")
  const [message, setMessage] = useState("")
  const [isAttend, setIsAttend] = useState("true")
  // Simulasi data ucapan (nanti bisa diambil dari database/props)
  const [wishes, setWishes] = useState([
    { name: "Lili Rahma", message: "Selamat menempuh hidup baru! Semoga samawa selalu sampai kakek nenek.", isAttend: true },
    { name: "Lee Roy", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
    { name: "Lili & Lee", message: "Barakallahu lakum wa baraka alaikum. Selamat ya!", isAttend: true },
    { name: "Rahma & Roy", message: "Selamat atas pernikahan kalian. Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
    { name: "Akbar", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: false },
    { name: "Yani", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: false },
    { name: "Lili Roy ", message: "Selamat Menikah ya! Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
  ])

  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validasi sederhana
    if (!guestName || !message || !isAttend) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000) // Hilang setelah 3 detik
      return
    }
    // Buat objek ucapan baru
    const newWish = {
      name: guestName,
      message: message,
      isAttend: isAttend === "true", // Konversi string ke boolean
    }

    // Tambahkan ke state (Spread operator agar data baru muncul di paling atas)
    setWishes([newWish, ...wishes])

    // Reset form setelah kirim
    setGuestName("")
    setMessage("")
  }
  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col md:flex-row overflow-hidden border-b border-stone-200">
      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-8 py-3 bg-stone-800 shadow-xl flex items-center gap-4 border border-stone-700"
          >
            <div className="w-1 h-1 bg-stone-400 rounded-full animate-pulse" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-200 font-light whitespace-nowrap">Please complete the invitation form</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KIRI: FORM RSVP */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-stone-200">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-md mx-auto w-full">
          <span className="text-[9px] tracking-[0.6em] uppercase text-stone-400 block mb-4 text-center md:text-left">Attendance</span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-800 italic mb-10 text-center md:text-left">R.S.V.P</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-transparent border-b border-stone-300 py-3 text-xs tracking-widest focus:outline-none focus:border-stone-800 transition-colors placeholder:text-stone-300 placeholder:italic"
            />
            <select
              value={isAttend}
              onChange={(e) => setIsAttend(e.target.value)}
              className="w-full bg-transparent border-b border-stone-300 py-3 text-xs tracking-widest focus:outline-none focus:border-stone-800 transition-colors text-stone-500 appearance-none rounded-none"
            >
              <option value="">Select Confirmation</option>
              <option value="yes">Confirm Attendance</option>
              <option value="no">Respectfully Decline</option>
            </select>
            <textarea
              placeholder="Send your warm wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-transparent border-b border-stone-300 py-3 text-xs tracking-widest focus:outline-none focus:border-stone-800 transition-colors placeholder:text-stone-300 placeholder:italic resize-none"
            />
            <button type="submit" className="w-full py-4 bg-stone-800 text-white text-[9px] tracking-[0.5em] uppercase hover:bg-stone-900 transition-all active:scale-[0.98]">
              Send Confirmation
            </button>
          </form>
        </motion.div>
      </div>

      {/* KANAN: INTERNAL SCROLL WISHES */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-20 bg-stone-50/50 flex flex-col">
        <span className="text-[9px] tracking-[0.6em] uppercase text-stone-400 block mb-8 text-center md:text-left italic">The Guestbook</span>

        {/* Container Scroll Internal */}
        <div className="flex-1 overflow-y-auto pr-4 space-y-8 no-scrollbar">
          {wishes.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="border-l border-stone-200 pl-6 py-2">
              <h4 className="font-serif text-stone-800 italic text-sm mb-2">{item.name}</h4>
              <p className="text-[11px] leading-relaxed text-stone-500 font-light italic">{item.message}</p>
              <span className="text-[8px] text-stone-300 tracking-tighter mt-4 block uppercase font-mono italic">Nov 20, 2027</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
