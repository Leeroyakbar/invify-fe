import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"

export default function BrideSection({ data }: { data: Invitation }) {
    // OPTIMASI CDN: Kompresi otomatis dimensi gambar di server Supabase agar fps scroll tidak drop
    const brideImage = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/bride-2.webp?width=600&quality=85";

    // ANIMASI INVERTED SHUTTER REVEAL (Foto meluncur dari arah kiri, kebalikan dari Groom)
    const filmFrameRevealLeft = {
        hidden: { opacity: 0, x: -35 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const },
        },
    }

    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    }

    // Teks meluncur masuk dari sisi kanan menuju kiri
    const textItemSlideRight = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
        },
    }

    return (
        <section id="bride-profile" className="h-screen snap-start relative overflow-hidden bg-[#0a0a0a] subpixel-antialiased">

            {/* 1. LAYER FOTO DENGAN GERAKAN CAMERA SHUTTER REVEAL KIRI */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.img
                    src={brideImage}
                    alt={data.brideName}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={filmFrameRevealLeft}
                    className="w-full h-full object-cover object-[center_25%] transform-gpu will-change-transform"
                />

                {/* FILTRATION WARNA: Pembalikan gradasi gelap dari sisi kanan untuk mendukung teks rata kanan */}
                <div className="absolute inset-0 bg-linear-to-l from-[#101010]/75 via-[#101010]/50 to-transparent mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/30 z-10" />
            </div>

            {/* Aksen Garis Rambut Geometris Vertikal Pojok Kanan Bawah */}
            <div className="absolute bottom-16 right-6 h-20 w-px bg-white/10 z-10" />
            {/* 2. TEXT CONTENT - INVERTED CINEMA CREDIT LAYOUT (Sambungan dari Bagian 1) */}
            {/* Menggunakan items-end dan text-right untuk efek simetri terbalik yang mewah */}
            <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="relative z-20 h-full flex flex-col justify-end items-end px-8 pb-20 text-white text-right ml-auto"
            >
                {/* Label Kategori Atas */}
                <motion.p
                    shadow-xl
                    variants={textItemSlideRight}
                    className="text-[9px] tracking-[0.5em] uppercase text-white/40 font-sans font-bold pr-[0.5em] mb-2"
                >
                    The Lady
                </motion.p>

                {/* Nama Lengkap Mempelai Wanita */}
                <motion.h1
                    variants={textItemSlideRight}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white/95 leading-tight"
                >
                    {data.brideFullName}
                </motion.h1>

                {/* Pembatas Garis Tipis Horisontal */}
                <motion.div
                    variants={textItemSlideRight}
                    className="w-16 h-px bg-white/20 my-5"
                />

                {/* Silsilah Orang Tua (Editorial Style) */}
                <motion.div
                    variants={textItemSlideRight}
                    className="space-y-1.5 font-sans font-light"
                >
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-bold pr-[0.3em]">
                        The Daughter of
                    </p>
                    <div className="text-[13px] sm:text-sm text-white/70 tracking-wide leading-relaxed">
                        <span>{data.brideFather}</span>
                        <span className="font-serif text-xs text-white/20 mx-2 italic">and</span>
                        <span>{data.brideMother}</span>
                    </div>
                </motion.div>

                {/* Tombol Kapsul Instagram Minimalis */}
                <motion.div
                    variants={textItemSlideRight}
                    className="pt-6"
                >
                    <a
                        href={`https://instagram.com{data.brideInstagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-full bg-white/1 backdrop-blur-xs transition-all duration-500 hover:bg-white hover:border-white group text-white"
                    >
            <span className="font-sans text-[10px] tracking-[0.2em] text-white/70 [a:hover_&]:text-black font-semibold uppercase transition-colors duration-500">
              @{data.brideInstagram}
            </span>
                        <Instagram
                            size={12}
                            className="text-white/40 [a:hover_&]:text-black transition-colors duration-500 stroke-[1.5px]"
                        />
                    </a>
                </motion.div>

            </motion.div>
        </section>
    )
}
