import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function GallerySection({ data }: { data: Invitation }) {
  const photos = ["/classic-noir/photo-1.jpeg", "/classic-noir/photo-2.jpeg", "/classic-noir/photo-3.jpeg", "/classic-noir/photo-4.jpeg", "/classic-noir/photo-5.jpeg"]

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Label Pameran di Atas */}
      <div className="absolute top-12 text-center z-10">
        <span className="text-[9px] tracking-[0.6em] uppercase text-stone-400 block mb-2">Portfolio</span>
        <h2 className="font-serif text-3xl italic text-stone-800">The Gallery</h2>
      </div>

      {/* Main Gallery Display */}
      <div className="w-full flex gap-6 px-10 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {photos.map((src, index) => (
          <div key={index} className="min-w-[80vw] md:min-w-[40vw] h-[60vh] snap-center flex items-center justify-center">
            {/* The Passe-Partout Frame */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="bg-white p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <img src={src} className="w-full h-full object-cover grayscale sepia-[0.1]" alt={`Gallery ${index}`} />
              </div>

              {/* Caption di bawah foto seperti di museum */}
              <div className="mt-6 flex justify-between items-baseline">
                <span className="text-[8px] tracking-[0.3em] uppercase text-stone-400 font-light">Archival No. 0{index + 1}</span>
                <span className="font-serif italic text-xs text-stone-300">
                  {data.brideName[0]} & {data.groomName[0]}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Scroll Instruction */}
      <div className="absolute bottom-12 flex flex-col items-center">
        <p className="text-[8px] tracking-[0.4em] uppercase text-stone-400 mb-4 italic">Swipe to Explore</p>
        <div className="w-20 h-[0.5px] bg-stone-200 relative overflow-hidden">
          <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 w-1/2 bg-stone-500" />
        </div>
      </div>
    </section>
  )
}
