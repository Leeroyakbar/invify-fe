// sections/MobileNavbar.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { name: "Home", id: "hero" },
  { name: "Bride and Groom", id: "couple" },
  { name: "Wedding Event", id: "event" },
  { name: "Gallery", id: "gallery" },
  { name: "RSVP", id: "rsvp" },
  { name: "Gift", id: "gift" },
]

export default function MobileNavbar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Burger Button - Diletakkan Fixed agar tetap terlihat saat scroll */}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-6 right-6 lg:right-8 z-[250] w-10 h-10 flex flex-col items-end justify-center gap-1.5 group">
        <motion.div animate={isOpen ? { rotate: 45, y: 4, width: "100%" } : { rotate: 0, y: 0, width: "1.5rem" }} className="h-[1px] bg-white transition-all duration-500" />
        <motion.div animate={isOpen ? { rotate: -45, y: -4, width: "100%" } : { rotate: 0, y: 0, width: "1rem" }} className="h-[1px] bg-white transition-all duration-500" />
      </button>

      {/* Overlay Menu - Dibatasi hanya di area container kanan */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Animasi muncul dari pojok kanan atas (lokasi burger icon)
            initial={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 1, originY: 0 }} // Titik pusat animasi di pojok kanan atas
            className="absolute top-4 right-4 left-4 lg:left-auto lg:w-[488px] z-[240] rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col p-10 pt-16">
              {/* Header Menu */}
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">
                  Close
                </button>
              </div>

              {/* Menu List */}
              <div className="flex flex-col gap-6">
                {menuItems.map((item, i) => (
                  <motion.button key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.8 }} onClick={() => scrollToSection(item.id)} className="text-left group">
                    <span className="font-montserrat text-2xl text-white/90 group-hover:text-white group-hover:pl-2 transition-all duration-500 block">{item.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Footer Menu */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">Invify — Digital Invitation</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
