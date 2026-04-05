import { motion, AnimatePresence } from "framer-motion"
import { type Invitation } from "../../../../types/Invitation"

type CurtainProps = {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}

export default function CurtainSection({ data, isOpened, onOpen }: CurtainProps) {
  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)", // Efek tirai menyusut ke atas
            transition: { duration: 1.5, ease: [0.82, 0, 0.18, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col bg-[#050505] overflow-hidden"
        >
          {/* 1. Background Image - Full Height, Desaturated */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center grayscale-[30%] brightness-[0.4]"
            style={{ backgroundImage: `url('/rahma/gallery-8.webp')` }}
          />

          {/* 2. MAIN CONTENT - Editorial Style */}
          <div className="relative z-10 flex flex-col h-full justify-between p-10 pt-20">
            {/* TOP CONTENT: Nama + Quote dalam satu kesatuan */}
            <div className="relative">
              {/* Large Initial Background */}
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.07, x: 0 }} transition={{ duration: 2 }} className="absolute -top-12 -left-6 font-cinzel text-[180px] leading-none text-white font-bold select-none">
                {data.brideName.charAt(0)}
              </motion.span>

              {/* Group: Info, Nama, & Quote */}
              <div className="pl-6 border-l border-white/20 space-y-6">
                <div className="space-y-2">
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-montserrat text-[10px] uppercase tracking-[0.8em] text-white/50">
                    Est. 2027
                  </motion.p>
                  <h1 className="font-cinzel text-white text-4xl tracking-[0.1em] uppercase leading-none">
                    {data.brideName} <br />
                    <span className="text-white/30">&</span> {data.groomName}
                  </h1>
                </div>

                {/* Quote langsung di bawah nama dengan margin yang pas */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.6, x: 0 }} transition={{ delay: 1.2, duration: 2 }} className="max-w-[220px]">
                  <p className="font-reenie-beanie text-2xl text-white/90 leading-snug tracking-wide italic">"Two souls with but a single thought, two hearts that beat as one."</p>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM CONTENT: Tetap di bawah untuk fungsionalitas */}
            <div className="flex flex-col gap-8">
              <div className="space-y-1">
                <span className="font-montserrat text-[9px] uppercase tracking-[0.4em] text-white/30 block mb-1">Privately Invited:</span>
                <h2 className="font-cinzel text-xl text-white/90 tracking-widest leading-none">{data.guestName}</h2>
              </div>

              <motion.button
                onClick={onOpen}
                whileHover={{ gap: "24px" }}
                // Efek denyut tipis agar mata user langsung tertuju ke sini
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="group relative flex items-center gap-4 text-white text-[11px] uppercase tracking-[0.4em] w-fit cursor-pointer"
              >
                <span className="group-hover:text-white transition-colors duration-300">Open Invitation</span>

                {/* Garis yang memanjang saat di-hover */}
                <div className="flex items-center">
                  <div className="h-[1px] w-12 bg-white/40 group-hover:w-20 group-hover:bg-white transition-all duration-500" />
                  {/* Menambahkan Arrow kecil sebagai tanda fungsionalitas */}
                  <motion.span className="text-[14px] ml-[-5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</motion.span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Grain Effect Overlay for Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
