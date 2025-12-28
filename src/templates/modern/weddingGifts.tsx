import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { stagger, fadeUp, floatY, floatScaleRotate, revealDown } from "../../motions/templateMotions"
import BankCard from "../../ui/bankCard"
import flower2 from "../../../public/modern/ornaments/flower-2.png"
import flower4 from "../../../public/modern/ornaments/flower-4.png"
import type { Invitation } from "../../types/Invitation"

export default function WeddingGifts({ data }: { data: Invitation }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative flex flex-col items-center min-h-svh text-center py-12 overflow-hidden"
      style={{ transformOrigin: "top center" }}
    >
      {/* HEADER */}
      <motion.div variants={fadeUp} className="mb-10">
        <p className="font-cormorant text-4xl font-semibold -translate-x-5 uppercase text-faded-merlot mb-1">Wedding</p>
        <p className="font-display text-6xl text-faded-merlot -mt-2 translate-x-8">Gift</p>
      </motion.div>

      {/* DESC */}
      <motion.div variants={fadeUp} className="relative mx-auto mt-2 mb-50 w-full max-w-88 px-6 py-22 text-center">
        {/* Background Arch */}
        <div
          className="absolute inset-0 rounded-t-full bg-white border border-merlot-300 pointer-events-none z-0 
             shadow-[inset_10px_10px_20px_rgba(0,0,0,0.15)]"
        />
        <motion.img src={flower4} alt="" className="absolute left-1/2 -translate-x-1/2 -bottom-18 w-56 md:w-60 opacity-90 pointer-events-none z-20" variants={floatScaleRotate} animate="animate" />
        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <motion.p variants={fadeUp} className="font-lora italic text-xs leading-relaxed text-faded-merlot pt-8 px-4 mb-6">
            Bagi kami, doa tulus dari Anda adalah hadiah yang tak ternilai. Namun jika memberi adalah cara Anda mengekspresikan kasih sayang, dengan kerendahan hati kami sampaikan terima kasih atas tanda cinta tersebut.
          </motion.p>

          {/* TOGGLE BUTTON */}
          <button onClick={() => setOpen(!open)} className="px-4 py-2 font-alice rounded-2xl border border-gold text-xs uppercase text-faded-merlot hover:bg-gold/10 transition cursor-pointer ">
            {open ? "Tutup" : "Lihat Rekening"}
          </button>

          {/* BANK LIST WRAPPER */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div variants={revealDown} initial="hidden" animate="visible" exit="exit" className="overflow-hidden w-full max-w-90 mt-6">
                {/* ISI SUDAH ADA — TIDAK DIANIMASI */}
                <div className="space-y-6">
                  <BankCard bank={data.bankName} account={data.accountNo} name={data.accountName} />
                  <BankCard bank={data.bankName2} account={data.accountNo2} name={data.accountName2} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.img src={flower2} alt="" className="absolute bottom-0 left-0 w-82 md:w-92 opacity-40 -translate-x-2 translate-y-3 scale-x-[-1] z-11 pointer-events-none" variants={floatY} animate="animate" />
      <motion.img src={flower2} alt="" className="absolute bottom-0 right-0 w-82 md:w-92 opacity-40 translate-x-2 translate-y-3 scale-x-[1] z-11 pointer-events-none " variants={floatY} animate="animate" />
    </motion.div>
  )
}
