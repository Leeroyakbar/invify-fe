import { Instagram } from "lucide-react"
import type { Invitation } from "../../../../types/Invitation"
import { motion } from "framer-motion"

export default function GroomSection({ data }: { data: Invitation }) {
    // OPTIMASI CDN: Kompresi ukuran bodi gambar langsung di server Supabase agar fps scroll tidak drop
    const groomImage = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/groom-2.webp?width=600&quality=85";

    // ANIMASI FILM SHUTTER REVEAL (Efek meluncur lurus menyamping khas rol film)
    const filmFrameReveal = {
        hidden: { opacity: 0, x: 35 },
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

    const textItemSlide = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
        },
    }

    return (
        <section id="groom-profile" className="h-screen snap-start relative overflow-hidden bg-[#0a0a0a] subpixel-antialiased">

            {/* 1. LAYER FOTO DENGAN GERAKAN CAMERA SHUTTER REVEAL */}
            {/* Memanfaatkan pergeseran sumbu-X berlawanan untuk menciptakan dimensi visual yang kaya */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.img
                    src={groomImage}
                    alt={data.groomName}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={filmFrameReveal}
                    className="w-full h-full object-cover object-[center_25%] transform-gpu will-change-transform"
                />

                {/* FILTRATION WARNA: Menggunakan rona sinema arang hangat tipis anti-kusam */}
                <div className="absolute inset-0 bg-linear-to-r from-[#101010]/75 via-[#101010]/50 to-transparent mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/30 z-10" />
            </div>

            {/* Aksen Garis Rambut Geometris Vertikal Pojok Kiri Bawah */}
            <div className="absolute bottom-16 left-6 h-20 w-px bg-white/10 z-10" />
            {/* 2. TEXT CONTENT - CINEMA CREDIT LAYOUT (Sambungan dari Bagian 1) */}
            <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="relative z-20 h-full flex flex-col justify-end px-8 pb-20 text-white"
            >
                {/* Label Kategori Atas */}
                <motion.p
                    variants={textItemSlide}
                    className="text-[9px] tracking-[0.5em] uppercase text-white/40 font-sans font-bold pl-[0.5em] mb-2"
                >
                    The Gentleman
                </motion.p>

                {/* Nama Lengkap Mempelai Pria */}
                <motion.h1
                    variants={textItemSlide}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white/95 leading-tight"
                >
                    {data.groomFullName}
                </motion.h1>

                {/* Pembatas Garis Tipis Horisontal */}
                <motion.div
                    variants={textItemSlide}
                    className="w-16 h-px bg-white/20 my-5"
                />

                {/* Silsilah Orang Tua (Editorial Style) */}
                <motion.div
                    variants={textItemSlide}
                    className="space-y-1.5 font-sans font-light"
                >
                    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-bold pl-[0.3em]">
                        The Son of
                    </p>
                    <div className="text-[13px] sm:text-sm text-white/70 tracking-wide leading-relaxed">
                        <span>{data.groomFather}</span>
                        <span className="font-serif text-xs text-white/20 mx-2 italic">and</span>
                        <span>{data.groomMother}</span>
                    </div>
                </motion.div>

                {/* Tombol Kapsul Instagram Minimalis */}
                <motion.div
                    variants={textItemSlide}
                    className="pt-6"
                >
                    <a
                        href={`https://instagram.com{data.groomInstagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-full bg-white/1 backdrop-blur-xs transition-all duration-500 hover:bg-white hover:border-white group text-white"
                    >
                        <Instagram
                            size={12}
                            className="text-white/40 [a:hover_&]:text-black transition-colors duration-500 stroke-[1.5px]"
                        />
                        <span className="font-sans text-[10px] tracking-[0.2em] text-white/70 [a:hover_&]:text-black font-semibold uppercase transition-colors duration-500">
              @{data.groomInstagram}
            </span>
                    </a>
                </motion.div>

            </motion.div>
        </section>
    )
}
