import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function ClosingSection({ data }: { data: Invitation }) {
  // OPTIMASI CDN: Mengambil satu foto canvas penutup (indeks ke-0) dengan kompresi server Supabase
  // Menggunakan width=800 agar render awal LCP bodi layar super mulus
  const finalCanvasImage = 'https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/galery-1.webp?width=800&quality=85'

  // Formula transisi masuk premium yang mantap khas Noir (Cubic Bezier)
  const noirFadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, delay: custom, ease: [0.16, 1, 0.3, 1] as const },
    }),
  }

  return (
      <section className="h-screen snap-start bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col items-center justify-center px-8 subpixel-antialiased">

        {/* 1. BACKGROUND LAYER - SINGLE STATIC FINE-ART PORTRAIT (Bebas Karusel Berkedip) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <motion.img
              src={finalCanvasImage}
              initial={{ opacity: 0, scale: 1.08 }}
              whileInView={{ opacity: 0.35, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform"
          />
          {/* Advanced Noir Vignette Overlay (Sisi pinggir meredup halus mengunci fokus pada teks tengah) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,10,10,0.9)_100%)] z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
        </div>

        {/* 2. CORE LAYOUT GATEWAY CONTENT */}
        <div className="max-w-md w-full text-center relative z-20 h-full flex flex-col justify-between py-24">

          {/*/!* DOA PERNIKAHAN SAKRAL (Menggantikan pengulangan ayat Ar-Rum) *!/*/}
          {/*<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-4">*/}
          {/*  <motion.p*/}
          {/*      custom={0.1}*/}
          {/*      variants={noirFadeUp}*/}
          {/*      className="font-serif text-[14px] sm:text-[15px] leading-[1.8] italic text-white/70 tracking-wide px-2"*/}
          {/*  >*/}
          {/*    "May Allah bless for you, and may He bless upon you, and may He unite both of you in all that is good."*/}
          {/*  </motion.p>*/}
          {/*  <motion.div custom={0.3} variants={noirFadeUp} className="text-[8px] tracking-[0.4em] uppercase text-white/30 font-sans font-bold block pl-[0.4em]">*/}
          {/*    — Sunan Abi Dawud*/}
          {/*  </motion.div>*/}
          {/*</motion.div>*/}

          {/* POTONGAN SALAM HORMAT DAN SIGNATURE AKAN DILANJUTKAN DI RESPONSE BAWAH */}
          {/* 3. SALAM HORMAT & SIGNATURE (Sambungan dari Bagian 1) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
            <motion.p
                custom={0.5}
                variants={noirFadeUp}
                className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/40 leading-loose font-sans font-semibold pl-[0.3em]"
            >
              It is a profound honor for us <br />
              to have you witness the beginning of <br />
              our lifelong journey together. <br />
              Thank you for being part of our story.
            </motion.p>

            {/* Blok Nama Panggilan Pengantin Bertabur Ampersand Ramping */}
            <motion.div custom={0.7} variants={noirFadeUp} className="pt-8">
            <span className="text-[8px] tracking-[0.5em] uppercase text-white/20 block mb-4 font-sans font-bold pl-[0.5em]">
              Sincerely,
            </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-[0.05em] uppercase text-white/95">
                {data.brideName.split(" ")[0]}
                <span className="font-sans text-lg text-white/20 italic font-normal mx-3 lowercase block my-1 sm:inline sm:my-0">
                &
              </span>
                {data.groomName.split(" ")[0]}
              </h2>
            </motion.div>
          </motion.div>

          {/* 4. FOOTER BRANDING / COPYRIGHT */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center space-y-4">
            <motion.div custom={0.9} variants={noirFadeUp} className="w-6 h-[1px] bg-white/10" />
            <motion.p custom={1.1} variants={noirFadeUp} className="text-[8px] tracking-[0.5em] uppercase text-white/20 font-sans font-bold pl-[0.5em]">
              Created with love by Invify • 2026
            </motion.p>
          </motion.div>

        </div>

        {/* Ornamen Teks Vertikal Gantung Kiri (Sifat Statis Tanpa Beban GPU) */}
        <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 -rotate-90 opacity-[0.015] pointer-events-none select-none">
          <h2 className="text-7xl font-serif uppercase tracking-[0.6em] whitespace-nowrap text-white font-bold">
            The End of Beginning
          </h2>
        </div>
      </section>
  )
}
