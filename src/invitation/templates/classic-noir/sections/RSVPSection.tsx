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
  ])

  const [error, setError] = useState<string | null>(null)

  // Fungsi untuk menampilkan error selama beberapa detik
  const triggerError = (msg: string) => {
    setError(msg)
    setTimeout(() => setError(null), 3000) // Hilang otomatis setelah 3 detik
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Mencegah reload halaman

    // Validasi sederhana agar tidak mengirim pesan kosong
    if (!guestName || !message) {
      triggerError("Please kindly fill in your name and wishes")
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
    <section className="h-screen flex items-center justify-center px-6 text-white relative" id="rsvp">
      <div className="w-full max-w-4xl grid md:grid-cols-1 gap-8 items-start">
        {/* SISI KIRI: FORM RSVP */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md p-6 border border-white/10">
          <div className="mb-6">
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 block mb-1">Reservation</span>
            <h2 className="font-serif text-2xl italic">RSVP</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none focus:border-white transition-colors"
            />

            <select value={isAttend} onChange={(e) => setIsAttend(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none appearance-none text-white/70">
              <option value="true" className="bg-zinc-900">
                I will attend
              </option>
              <option value="false" className="bg-zinc-900">
                I can't attend
              </option>
            </select>

            <textarea
              placeholder="Send your warm wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:outline-none focus:border-white transition-colors resize-none"
            />

            <button type="submit" className="w-full py-3 bg-white text-black text-[9px] tracking-[0.3em] uppercase font-bold mt-2 hover:bg-white/90 transition-all">
              Submit
            </button>
          </form>
        </motion.div>

        {/* SISI KANAN: WISHES WALL (Scroll Internal) */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="flex flex-col h-full max-h-[450px]">
          <div className="mb-4">
            <h3 className="font-serif text-xl italic italic">Wishes for the Couple</h3>
            <div className="w-8 h-[1px] bg-white/30 mt-2" />
          </div>

          {/* AREA SCROLL INTERNAL */}
          <div
            className="overflow-y-auto pr-4 space-y-6 [&::-webkit-scrollbar]:width-[2px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#444 transparent" }}
          >
            {wishes.map((wish, index) => (
              <div key={index} className="border-l border-white/10 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] tracking-widest uppercase text-white/40">{wish.name}</p>
                  {/* Badge status kehadiran (Opsional) */}
                  <span className={`text-[8px] px-1 border ${wish.isAttend ? "border-green-500/50 text-green-500/50" : "border-red-500/50 text-red-500/50"}`}>{wish.isAttend ? "ATTENDING" : "ABSENT"}</span>
                </div>
                <p className="text-xs font-light leading-relaxed text-white/80 italic">"{wish.message}"</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 10, x: "-50%" }} className="fixed bottom-10 left-1/2 z-[100] min-w-[280px]">
            <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 px-6 py-3 shadow-2xl flex items-center justify-center gap-3">
              {/* Ikon kecil sebagai pemanis */}
              <div className="w-1 h-1 bg-white rotate-45" />

              <span className="text-[10px] tracking-[0.2em] text-white uppercase font-light">{error}</span>

              <div className="w-1 h-1 bg-white rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
