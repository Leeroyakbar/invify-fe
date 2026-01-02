import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react" // Import icon panah
const testimonials = [
  {
    name: "Rahma & Lee",
    city: "Mandailing",
    text: "Kami sangat puas dengan hasil undangannya. Fitur RSVP sangat membantu untuk menghitung jumlah tamu. Recommended banget!",
  },
  {
    name: "Yani & Akbar",
    city: "Jakarta",
    text: "Desainnya elegan dan proses pembuatannya cepat. Semua tamu kami memuji undangannya.",
  },
  {
    name: "Lili & Roy",
    city: "Surabaya",
    text: "Praktis, modern, dan mudah dibagikan. Sangat cocok untuk pasangan zaman sekarang.",
  },
]

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)

  // Fungsi navigasi
  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative bg-gradient-to-b from-[#F6E6E3] to-[#FFF9F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24" id="testimoni">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Cerita Bahagia dari <br />
            <span className="italic text-[#D4A853]">Pasangan</span> Kami
          </h2>
          <p className="mt-6 text-[#7A6F68]">Ribuan pasangan telah mempercayakan momen spesial mereka kepada kami</p>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative mt-16 max-w-4xl mx-auto flex items-center">
          {/* TOMBOL PREV (Desktop) */}
          <button onClick={prev} className="absolute -left-4 md:-left-16 z-10 p-3 rounded-full bg-white shadow-md text-[#3B2F2F] hover:bg-[#D4A853] hover:text-white transition-all group">
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="bg-white rounded-3xl shadow-lg p-10 text-center w-full">
              {/* AVATAR */}
              <div className="mx-auto w-16 h-16 rounded-full bg-[#D4A853] text-white flex items-center justify-center font-serif text-xl">
                {testimonials[index].name
                  .split(" ")
                  .filter((word) => !["&", "dan", "and", "+"].includes(word.toLowerCase()))
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("&")}
              </div>

              {/* STARS */}
              <div className="mt-4 flex justify-center gap-1 text-[#D4A853]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* TEXT */}
              <p className="mt-6 text-[#3B2F2F] leading-relaxed italic text-lg">“{testimonials[index].text}”</p>

              {/* NAME */}
              <div className="mt-6">
                <p className="font-serif text-lg text-[#3B2F2F]">{testimonials[index].name}</p>
                <p className="text-sm text-[#7A6F68]">{testimonials[index].city}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* TOMBOL NEXT (Desktop) */}
          <button onClick={next} className="absolute -right-4 md:-right-16 z-10 p-3 rounded-full bg-white shadow-md text-[#3B2F2F] hover:bg-[#D4A853] hover:text-white transition-all group">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* INDICATOR DOTS */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === i ? "bg-[#D4A853] w-8" : "bg-[#D4A853]/30"}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
