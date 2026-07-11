import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function QuoteImageSection({ data }: { data: Invitation }) {
    // LINK OPTIMASI: Memastikan gambar dimuat ringan tanpa lag
    const quoteBgImage = "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/classic-noir/photo-5.webp?width=600&quality=85";

    // ANIMASI BARU: Teks muncul bergeser halus dari samping (bukan fade up biasa)
    const slideFromLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const},
        },
    }

    const slideFromRight = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
        },
    }

    return (
        <section className="h-screen snap-start relative bg-[#121212] overflow-hidden flex flex-col justify-center" id="quote">

            {/* 1. ANIMASI BARU: CINEMATIC PAN REVEAL (Kamera bergeser horizontal perlahan saat scroll) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.img
                    src={quoteBgImage}
                    alt="Cinematic Moment"
                    initial={{ x: "-3%", scale: 1.05 }} // Sedikit digeser ke kiri di awal
                    whileInView={{ x: "3%" }} // Bergerak perlahan ke kanan saat discroll (Efek Panning Kamera)
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 8, ease: "linear" }} // Berjalan konstan mengikuti scroll
                    className="w-[106%] h-full object-cover max-w-none transform-gpu will-change-transform"
                />

                {/* WARNA BARU: Menggunakan gradasi transparan Warm Charcoal/Sepia tipis */}
                {/* Tidak hitam pekat, foto hitam-putih Anda akan terlihat lebih mewah & bertekstur */}
                <div className="absolute inset-0 bg-linear-to-r from-[#1c1a17]/90 via-[#1c1a17]/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-b from-[#121212]/50 via-transparent to-[#121212]" />
            </div>

            {/* 2. TEXT CONTENT - ASYMMETRIC CINEMA SUBTITLE LAYOUT */}
            <div className="relative z-10 h-full flex flex-col justify-between px-8 py-20 text-white">

                {/* Bagian Atas: Identitas Ayat (Slide Masuk dari Kiri) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={slideFromLeft}
                    className="space-y-1"
                >
          <span className="text-[8px] font-sans tracking-[0.5em] uppercase text-white/40 font-bold block pl-[0.5em]">
            The Holy Qur'an
          </span>
                    <h3 className="font-serif text-lg font-light italic tracking-widest text-white/90">
                        Ar-Rum : 21
                    </h3>
                </motion.div>

                {/* Bagian Tengah: Teks Ayat Menjorok ke Kiri (Gaya Script Film Modern) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={slideFromLeft}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mr-auto text-left border-l border-white/20 pl-4 py-2"
                >
                    <p className="font-lora text-[13px] md:text-[14px] leading-relaxed text-white/80 font-light italic tracking-wide">
                        “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang...”
                    </p>
                </motion.div>

                {/* Bagian Bawah: Aksen Signature Rata Kanan (Slide Masuk dari Kanan) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={slideFromRight}
                    className="w-full flex flex-col items-end text-right pr-2"
                >
                    <div className="h-px w-8 bg-white/20 mb-3" />
                    <p className="font-sans text-[9px] tracking-[0.6em] uppercase text-white/50 font-bold">
                        {data.brideName} <span className="font-serif italic font-normal text-white/20 lowercase text-xs tracking-normal mx-1">&</span> {data.groomName}
                    </p>
                </motion.div>

            </div>
        </section>
    )
}
