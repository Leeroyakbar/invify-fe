import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface StorySectionProps {
  data: Invitation
}

export default function StorySection({ data }: StorySectionProps) {
  // Animasi transisi masuk sinematik (Gerakan menyamping/memudar lembut tanpa melompat keras)
  const editorialFade = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    },
  }

  const stories = [
    { chapter: "I", subtitle: "The Gathering", title: "Awal Bertemu", content: data.storyMeet || "Kisah awal kami dimulai dari sebuah pertemuan tidak sengaja..." },
    { chapter: "II", subtitle: "The Devotion", title: "Menjalin Hubungan", content: data.storyCommitment || "Seiring berjalannya waktu, kami memutuskan untuk berkomitmen..." },
    { chapter: "III", subtitle: "The Threshold", title: "Hari Pernikahan", content: data.storyMarriage || "Langkah baru kami menuju ikatan suci pernikahan..." },
  ]

  const storyImgHeader = [
    `${data.images[1] || ''}`,
    `${data.images[2] || ''}`
  ]

  return (
      <section className="relative min-h-screen w-full py-32 px-8 lg:px-16 flex flex-col items-center bg-[#090909] text-white subpixel-antialiased">
        <div className="relative z-10 w-full max-w-xl">

          {/* 1. PHOTO DISPLAY (Asymmetric Modern Editorial Grid) */}
          <div className="grid grid-cols-2 gap-4 mb-28 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: -10 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-white/5"
            >
              <img src={storyImgHeader[0]} alt="Our Moment 1" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 15 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="aspect-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-white/5"
            >
              <img src={storyImgHeader[1]} alt="Our Moment 2" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          {/* 2. TITLE SECTION */}
          <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={editorialFade}
              className="mb-24 text-center"
          >
            <span className="text-[9px] tracking-[0.6em] uppercase text-white/30 font-inter font-bold block mb-3 pl-[0.6em]">Our Memoir</span>
            <h2 className="text-4xl md:text-5xl font-cormorant-upright text-white/95 tracking-[0.08em] uppercase font-light">Journey of Love</h2>
            <div className="h-px w-8 bg-white/20 mx-auto mt-6" />
          </motion.div>

          {/* 3. NEW MAGAZINE EDITORIAL STORIES DISPLAY */}
          <div className="space-y-24 mb-28 w-full">
            {stories.map((story, index) => (
                <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={editorialFade}
                    className="relative w-full flex flex-col group"
                >
                  {/* Layer Belakang: Angka Romawi Raksasa yang Statis Elegan */}
                  <span className="absolute -top-12 left-0 font-cormorant text-[8rem] md:text-[10rem] font-extralight text-white/[0.03] select-none pointer-events-none leading-none z-0">
                    {story.chapter}
                  </span>

                  {/* Layer Depan: Konten Teks Terstruktur */}
                  <div className="relative z-10 pl-4 border-l-2 border-white/5 group-hover:border-white/20 transition-colors duration-500 space-y-4 pt-4">
                    {/* Seri Subtitle Kecil Atas */}
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-inter tracking-[0.4em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                        {story.subtitle}
                      </span>
                    </div>

                    {/* Judul Utama Bab */}
                    <h3 className="text-white/90 font-cormorant-upright text-xl md:text-2xl font-light tracking-[0.1em] uppercase">
                      {story.title}
                    </h3>

                    {/* Paragraf Isi Cerita */}
                    <p className="text-white/60 font-inter text-[13px] leading-[1.85] font-light text-justify tracking-wide">
                      {story.content}
                    </p>
                  </div>
                </motion.div>
            ))}
          </div>

          {/* 4. PREMIUM SIGNATURE BOTTOM */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8 }}
              className="flex flex-col gap-6"
          >
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex justify-end items-center gap-3 select-none pointer-events-none">
              <span className="font-alice text-2xl text-white/95 tracking-wide">{data.brideName || "Lili"}</span>
              <span className="font-cormorant text-lg text-white/30 italic font-light">&</span>
              <span className="font-alice text-2xl text-white/95 tracking-wide">{data.groomName || "LeeRoy"}</span>
            </div>
          </motion.div>

        </div>
      </section>
  )
}
