import { easeOut, motion } from "framer-motion"

export default function AnnouncementSection({ isOpened }: { isOpened: boolean }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i, duration: 1, ease: easeOut },
    }),
  }

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col md:flex-row items-center justify-center px-6 md:px-20 overflow-hidden">
      {/* 1. Kolom Teks (Kiri) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left z-10 order-2 md:order-1 mt-10 md:mt-0">
        <motion.span custom={1.5} variants={fadeInUp} initial="hidden" animate={isOpened ? "visible" : "hidden"} className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-6">
          You are invited to celebrate
        </motion.span>

        <motion.h2 custom={1.7} variants={fadeInUp} initial="hidden" animate={isOpened ? "visible" : "hidden"} className="font-serif text-4xl md:text-6xl text-stone-800 leading-[1.1] mb-8">
          The Union of <br />
          <span className="italic">Soul & Love.</span>
        </motion.h2>

        <motion.div custom={1.9} variants={fadeInUp} initial="hidden" animate={isOpened ? "visible" : "hidden"} className="w-16 h-px bg-stone-300 mb-8" />

        <motion.p custom={2.1} variants={fadeInUp} initial="hidden" animate={isOpened ? "visible" : "hidden"} className="max-w-xs text-xs leading-loose text-stone-500 tracking-wide font-light">
          Join us as we exchange vows and begin our new chapter in life. Your presence is the most cherished gift.
        </motion.p>
      </div>

      {/* 2. Kolom Foto (Kanan - Editorial Style) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative order-1 md:order-2">
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={isOpened ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 2, delay: 1.2 }} className="w-full h-full p-4 md:p-12">
          {/* Frame Foto dengan Shadow Halus & Border */}
          <div className="w-full h-full relative group shadow-2xl">
            <img src="/old-money/money-1.png" className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.95]" alt="Couple" />
            {/* Elegant Caption on Photo */}
            <div className="absolute bottom-6 right-6 text-white text-[9px] tracking-[0.4em] uppercase">Autumn Series — 2027</div>
          </div>
        </motion.div>

        {/* Dekoratif Garis Tipis di Belakang Foto */}
        <div className="absolute -z-10 top-0 right-0 w-2/3 h-full border-r border-t border-stone-200 translate-x-4 -translate-y-4" />
      </div>
    </section>
  )
}
