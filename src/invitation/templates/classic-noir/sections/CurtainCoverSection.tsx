import { motion, AnimatePresence } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function CurtainCoverSection({ data, isOpened, onOpen }: { data: Invitation; isOpened: boolean; onOpen: () => void }) {
  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.section
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
          className="
          fixed inset-0 z-50
          flex items-center justify-center
          text-center text-white
        "
        >
          {/* BACKGROUND IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/modern/couple/couple-bg.jpeg')",
            }}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center px-6">
            <p className="tracking-widest text-xs mb-4">WE INVITE YOU TO CELEBRATE</p>

            <h1 className="font-serif text-xl md:text-2xl tracking-widest mb-8">
              {data.groomName.toUpperCase()} & {data.brideName.toUpperCase()}
            </h1>

            <p className="italic text-sm mb-1 opacity-90">dear,</p>

            <p className="font-serif text-base mb-2">{data.guestName}</p>

            {/* OPEN BUTTON */}
            <button onClick={onOpen} className=" mt-10 px-10 py-3 border border-white/60 tracking-widest text-sm hover:bg-white hover:text-black transition ">
              {" "}
              LET’S OPEN{" "}
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
