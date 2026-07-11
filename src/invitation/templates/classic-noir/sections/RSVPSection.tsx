import { AnimatePresence, motion } from "framer-motion"
import { useState, memo } from "react"

export default function RSVPSection() {
  const [guestName, setGuestName] = useState("")
  const [message, setMessage] = useState("")
  const [isAttend, setIsAttend] = useState("true")

  // Simulasi repositori ucapan bawaan database awal
  const [wishes, setWishes] = useState([
    { name: "Lili Rahma", message: "Selamat menempuh hidup baru! Semoga samawa selalu sampai kakek nenek.", isAttend: true },
    { name: "Lee Roy", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
    { name: "Lili & Lee", message: "Barakallahu lakum wa baraka alaikum. Selamat ya!", isAttend: true },
    { name: "Rahma & Roy", message: "Selamat atas pernikahan kalian. Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
    { name: "Akbar", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: false },
    { name: "Yani", message: "Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: false },
    { name: "Lili Roy ", message: "Selamat Menikah ya! Semoga menjadi keluarga yang selalu penuh cinta dan kasih sayang.", isAttend: true },
  ])

  const [error, setError] = useState<string | null>(null)

  const triggerError = (msg: string) => {
    setError(msg)
    setTimeout(() => setError(null), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!guestName || !message) {
      triggerError("Please kindly fill in your name and wishes")
      return
    }

    const newWish = {
      name: guestName,
      message: message,
      isAttend: isAttend === "true",
    }

    setWishes([newWish, ...wishes])
    setGuestName("")
    setMessage("")
  }

  // Formula transisi masuk sinematik (Cubic Bezier)
  const noirFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
      <section id="rsvp" className="h-screen snap-start relative text-white px-6 bg-transparent subpixel-antialiased">
        {/* Penggunaan grid tinggi asimetris seimbang agar muat rapi di satu layar HP */}
        <div className="h-full max-w-md mx-auto grid grid-rows-[auto_1fr] gap-8 py-20 relative z-10">

          {/* SISI ATAS: FORM RSVP MINIMALIS TANPA BOX TEBAL */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={noirFadeUp}
              className="bg-transparent p-0 border-none w-full"
          >
            <div className="mb-6 text-left">
            <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/30 font-bold block mb-2 pl-[0.5em]">
              The Reservation
            </span>
              <h2 className="font-serif text-3xl tracking-wide text-white/95">RSVP</h2>
              <div className="w-8 h-px bg-white/20 mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="text"
                  placeholder="Your Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-2.5 text-xs focus:outline-none transition-colors rounded-none placeholder:text-white/20"
              />

              <div className="relative w-full border-b border-white/10 focus-within:border-white/40 transition-colors">
                <select
                    value={isAttend}
                    onChange={(e) => setIsAttend(e.target.value)}
                    className="w-full bg-transparent py-2.5 text-xs focus:outline-none appearance-none text-white/60 font-sans cursor-pointer rounded-none"
                >
                  <option value="true" className="bg-[#0a0a0a] text-white">I will attend the wedding</option>
                  <option value="false" className="bg-[#0a0a0a] text-white">I am unable to attend</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-white/20 text-[9px]">▼</div>
              </div>

              <textarea
                  placeholder="Send your warm wishes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 py-2.5 text-xs focus:outline-none transition-colors resize-none rounded-none placeholder:text-white/20 leading-relaxed"
              />

              <div className="pt-2">
                <button
                    type="submit"
                    className="group relative w-full border border-white/20 py-3.5 text-[9px] tracking-[0.4em] uppercase overflow-hidden transition-all duration-500 hover:border-white rounded-none bg-white/5 active:scale-98"
                >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-semibold pl-[0.4em]">
                  Submit Reservation
                </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-450 ease-[0.16,1,0.3,1]" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* SISI BAWAH: TIMELINE WISHES WALL DETACHED */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={noirFadeUp}
              className="flex flex-col min-h-0 w-full"
          >
            <div className="mb-4 text-left">
              <h3 className="font-serif text-lg tracking-wide text-white/90">Wishes for the Couple</h3>
            </div>

            {/* AREA SCROLL INTERNAL OPTIMIZED */}
            {/* Menggunakan touch-pan-y agar jemari tamu tetap bisa melakukan scroll keluar seksi di HP */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-5 touch-pan-y [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-thumb]:bg-white/10">
              {wishes.map((wish, index) => (
                  <WishCard
                      key={`${wish.name}-${index}`}
                      name={wish.name}
                      message={wish.message}
                      isAttend={wish.isAttend}
                  />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ERROR MESSAGE TOAST PORTAL */}
        <AnimatePresence>
          {error && (
              <motion.div initial={{ opacity: 0, y: 15, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 10, x: "-50%" }} className="fixed bottom-10 left-1/2 z-150 min-w-70">
                <div className="bg-[#121212] border border-white/10 px-6 py-3 shadow-2xl flex items-center justify-center gap-3 rounded-none">
                  <div className="w-1 h-1 bg-white/40 rotate-45" />
                  <span className="text-[9px] tracking-[0.2em] text-white/80 uppercase font-sans font-semibold">{error}</span>
                  <div className="w-1 h-1 bg-white/40 rotate-45" />
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  )
}

// =========================================================
// SUB-KOMPONEN INDIVIDU: WISH CARD ITEM (MEMOIZED FOR FPS)
// =========================================================
const WishCard = memo(({ name, message, isAttend }: { name: string; message: string; isAttend: boolean }) => {
  return (
      <div className="border-l border-white/10 hover:border-white/30 transition-colors duration-400 pl-4 py-1.5 text-left transform-gpu">
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-sans font-bold">{name}</p>
          <span className={`text-[7px] px-1.5 py-0.5 tracking-wider border font-sans font-bold ${
              isAttend ? "border-emerald-500/30 text-emerald-400/60" : "border-rose-500/30 text-rose-400/60"
          }`}>
          {isAttend ? "ATTENDING" : "ABSENT"}
        </span>
        </div>
        <p className="text-[12px] leading-[1.65] font-lora font-light text-white/60 italic">
          “{message}”
        </p>
      </div>
  )
})

WishCard.displayName = "WishCard"
