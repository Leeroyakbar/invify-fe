import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ArrowLeft, ArrowRight, User } from "lucide-react"

const testimonials = [
  {
    name: "Rahma & Lee",
    city: "Mandailing",
    text: "Kami sangat puas dengan hasil undangannya. Fitur RSVP sangat membantu untuk menghitung jumlah tamu. Desainnya benar-benar di luar ekspektasi kami.",
  },
  {
    name: "Yani & Akbar",
    city: "Jakarta",
    text: "Desainnya elegan dan proses pembuatannya cepat. Semua tamu kami memuji undangannya karena terlihat sangat eksklusif dan mahal.",
  },
  {
    name: "Lili & Roy",
    city: "Surabaya",
    text: "Praktis, modern, dan mudah dibagikan. Sangat cocok untuk pasangan zaman sekarang yang menginginkan efisiensi tanpa mengorbankan estetika.",
  },
]

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-[#0A0A0A] py-32 px-8 lg:px-16 border-t border-white/5" id="testimoni">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT SIDE: Heading */}
        <div className="lg:col-span-5 space-y-6">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold block">
            Wall of Love
          </motion.span>
          <h2 className="font-cormorant-upright text-5xl md:text-6xl text-white leading-[1.1] uppercase tracking-tighter">
            What They <br />
            <span className="italic opacity-40">Say About Us</span>
          </h2>
          <p className="font-inter text-white/40 text-xs uppercase tracking-widest leading-relaxed max-w-xs">Kepercayaan Anda adalah prioritas kami dalam merancang setiap detail kebahagiaan.</p>

          {/* NAV BUTTONS: Compact & Simple */}
          <div className="flex items-center gap-6 pt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all active:scale-90">
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all active:scale-90">
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: The Card */}
        <div className="lg:col-span-7">
          <div className="relative h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-white/[0.02] border border-white/5 p-12 lg:p-16 rounded-sm relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-white/10" />

                <div className="space-y-8">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill="#D4A853" // Warna emas brand Invify
                        className="text-[#D4A853]"
                      />
                    ))}
                  </div>

                  <p className="font-inter text-lg md:text-xl text-white/80 leading-relaxed tracking-wide font-light">"{testimonials[index].text}"</p>

                  <div className="pt-8 flex items-center gap-4 border-t border-white/5">
                    {/* AVATAR DENGAN IKON PERSON */}
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                      <User size={16} strokeWidth={1.5} />
                    </div>

                    <div>
                      <h4 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold">{testimonials[index].name}</h4>
                      <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] mt-1">Client from {testimonials[index].city}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Layer Effect (Stacking Cards Look) */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-white/[0.01] border border-white/[0.02] rounded-sm hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
