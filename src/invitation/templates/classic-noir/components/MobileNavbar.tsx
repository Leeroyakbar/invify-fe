import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MENU = [
  { label: "Home", target: "#home" },
  { label: "Couple", target: "#couple" },
  { label: "Story", target: "#story" },
  { label: "Event", target: "#event" },
  { label: "Gallery", target: "#gallery" },
  { label: "RSVP", target: "#rsvp" },
]

export default function MobileNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-5 right-5 z-40
          flex flex-col gap-1.5 mr-4
        "
      >
        <span className="w-6 h-[1px] bg-white/80" />
        <span className="w-6 h-[1px] bg-white/80" />
        <span className="w-6 h-[1px] bg-white/80" />
      </button>

      {/* OVERLAY MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
              fixed inset-0 z-50
              bg-black/40
              backdrop-blur-md
            "
          >
            {/* CLOSE AREA */}
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-white/70 text-sm tracking-widest">
              CLOSE
            </button>

            {/* MENU CONTENT */}
            <motion.nav
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="
                h-full flex flex-col
                items-center justify-center
                text-center
              "
            >
              <ul className="space-y-6">
                {MENU.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.target}
                      onClick={() => setOpen(false)}
                      className="
                        font-serif text-xl
                        tracking-widest
                        text-white/90
                        hover:text-white
                        transition
                      "
                    >
                      {item.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
