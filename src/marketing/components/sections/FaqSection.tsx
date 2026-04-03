import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Bagaimana cara memesan undangan di Invify?",
    answer: "Anda cukup memilih paket yang sesuai, klik tombol 'Pesan', dan Anda akan diarahkan ke WhatsApp admin kami untuk pengisian data serta konfirmasi pembayaran.",
  },
  {
    question: "Berapa lama proses pengerjaan undangan?",
    answer: "Untuk paket Basic & Premium, proses pengerjaan adalah 1-2 hari kerja setelah data lengkap. Untuk paket Custom, waktu pengerjaan bergantung pada tingkat kerumitan desain.",
  },
  {
    question: "Apakah saya bisa mengubah data setelah undangan jadi?",
    answer: "Tentu. Kami memberikan layanan revisi data (seperti jam atau lokasi) secara gratis selama masa aktif undangan Anda masih berlaku.",
  },
  {
    question: "Apakah undangan bisa dibuka di semua perangkat?",
    answer: "Ya, semua undangan Invify dioptimalkan untuk tampil sempurna di smartphone (iOS/Android), tablet, maupun desktop.",
  },
  {
    question: "Bisakah saya menggunakan domain custom (namasaya.com)?",
    answer: "Fitur ini tersedia secara eksklusif untuk paket 'Custom'. Kami akan membantu proses pendaftaran hingga aktivasi domain pribadi Anda.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[#0A0A0A] py-32 px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT SIDE: Titles */}
        <div className="lg:col-span-4">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mb-4 block">
            Inquiry
          </motion.span>
          <h2 className="font-cormorant-upright text-5xl md:text-6xl text-white leading-none uppercase tracking-tighter mb-6">
            Frequently <br />
            <span className="italic opacity-40">Asked Questions</span>
          </h2>
          <p className="font-inter text-white/40 text-[11px] uppercase tracking-[0.2em] leading-relaxed max-w-xs">Temukan jawaban cepat untuk pertanyaan umum mengenai layanan kami.</p>
        </div>

        {/* RIGHT SIDE: Accordion List */}
        <div className="lg:col-span-8">
          <div className="border-t border-white/10">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full py-8 flex items-center justify-between text-left group transition-all">
                  <span className={`font-cormorant-upright text-xl md:text-2xl tracking-wide transition-all duration-300 ${openIndex === i ? "text-white italic" : "text-white/60 group-hover:text-white"}`}>{faq.question}</span>
                  <div className={`transition-transform duration-500 ${openIndex === i ? "rotate-180" : "rotate-0"}`}>
                    {openIndex === i ? <Minus size={20} strokeWidth={1} className="text-white" /> : <Plus size={20} strokeWidth={1} className="text-white/30 group-hover:text-white" />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}>
                      <div className="pb-8 pr-12">
                        <p className="font-inter text-white/40 text-xs md:text-sm leading-relaxed tracking-wide max-w-2xl">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
