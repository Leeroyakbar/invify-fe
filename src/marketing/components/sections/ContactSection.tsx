import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const kirimKeWhatsApp = () => {
    const nomorWA = "6282273366718"
    const teks = `Halo Invify, saya ingin bertanya:\n\n*Nama:* ${formData.nama}\n*Email:* ${formData.email}\n*Pesan:* ${formData.pesan}`
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`
    window.open(url, "_blank")
  }

  return (
    <section id="contact" className="bg-[#0A0A0A] py-32 px-8 lg:px-16 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* LEFT: Branding & Info */}
          <div className="space-y-12">
            <div>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-4 block">
                Get In Touch
              </motion.span>
              <h2 className="font-cormorant-upright text-5xl md:text-7xl text-white leading-none uppercase tracking-tighter">
                Let's Craft <br />
                <span className="italic opacity-40">Your Story</span>
              </h2>
            </div>

            <p className="font-inter text-white/40 text-xs md:text-sm leading-relaxed tracking-widest uppercase max-w-md">Tim Invify siap mewujudkan visi pernikahan digital Anda. Konsultasikan konsep Anda secara gratis bersama kami.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Contact</p>
                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                  <Phone size={14} strokeWidth={1} />
                  <span className="text-xs tracking-wider">+62 822-7336-6718</span>
                </div>
                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                  <Mail size={14} strokeWidth={1} />
                  <span className="text-xs tracking-wider">id.invify@gmail.com</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Location</p>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={14} strokeWidth={1} />
                  <span className="text-xs tracking-wider uppercase">Mandailing Natal, ID</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimalist Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-sm">
            <form className="space-y-8">
              <div className="group relative">
                <input
                  type="text"
                  name="nama"
                  placeholder="FULL NAME"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 uppercase"
                />
              </div>

              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 uppercase"
                />
              </div>

              <div className="group relative">
                <textarea
                  rows={3}
                  name="pesan"
                  placeholder="YOUR MESSAGE"
                  value={formData.pesan}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/20 uppercase resize-none"
                />
              </div>

              <button type="button" onClick={kirimKeWhatsApp} className="w-full group flex items-center justify-between py-6 border-b border-white/20 hover:border-white transition-all text-white">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Send via WhatsApp</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* FINAL CALL TO ACTION (FOOTER AREA) */}
        <div className="mt-48 pt-24 border-t border-white/5 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="inline-flex items-center gap-4 text-white/20">
              <div className="h-[1px] w-8 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.8em]">A New Chapter Awaits</span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>

            <h3 className="font-cormorant-upright text-4xl md:text-6xl text-white uppercase tracking-tighter">
              Ready to Begin <br />
              <span className="italic opacity-30">Your Journey?</span>
            </h3>

            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/90 transition-all rounded-sm">
              Start Creating Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
