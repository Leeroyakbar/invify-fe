import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { name: "Home", id: "hero" },
  { name: "Couple", id: "couple" },
  { name: "Story", id: "story" },
  { name: "Event", id: "event" },
  { name: "Gallery", id: "gallery" },
  { name: "Wishes", id: "wishes" },
]

export default function MobileNavbar({
  containerRef,
  hide = false, // Tambahkan prop hide
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  hide?: boolean // Tipenya optional boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  const isButtonVisible = !hide || isOpen

  // MobileNavbar.tsx

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const container = containerRef.current

    if (element && container) {
      // Karena target ID berada langsung di dalam flex-col container,
      // kita cukup ambil offsetTop milik elemen tersebut.
      const targetPosition = element.offsetTop

      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Tutup menu
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* HAMBURGER BUTTON dengan animasi Fade In/Out */}
      <AnimatePresence>
        {isButtonVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-8 right-8 z-[110] w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
          >
            <motion.div animate={isOpen ? { rotate: 45, y: 4, width: "100%" } : { rotate: 0, y: 0, width: "1.5rem" }} className="h-[1px] bg-white transition-all duration-300" />
            <motion.div animate={isOpen ? { rotate: -45, y: -4, width: "100%" } : { rotate: 0, y: 0, width: "1rem" }} className="h-[1px] bg-white transition-all duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* OVERLAY MENU tetap sama */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", borderTopLeftRadius: "100%" }}
            animate={{ x: 0, borderTopLeftRadius: "0%" }}
            exit={{ x: "100%", borderTopLeftRadius: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {menuItems.map((item, i) => (
                <motion.button key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }} onClick={() => scrollToSection(item.id)} className="group relative">
                  <span className="font-cormorant-upright text-2xl md:text-3xl text-white uppercase tracking-widest group-hover:italic group-hover:opacity-50 transition-all duration-500">{item.name}</span>
                </motion.button>
              ))}
            </div>
            <div className="absolute bottom-12 text-white/30 text-[9px] uppercase tracking-[0.5em]">Invify — 2026</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
