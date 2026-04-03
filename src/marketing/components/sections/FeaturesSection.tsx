import { motion } from "framer-motion"
import { Users, Image, Music, MapPin, MessageSquare, Calendar, Smartphone, Share2 } from "lucide-react"

const features = [
  { icon: Users, title: "Custom Personalization", desc: "Nama pengantin & detail acara yang sepenuhnya dapat disesuaikan." },
  { icon: Image, title: "Visual Gallery", desc: "Integrasi foto dan video dalam layout sinematik berkualitas tinggi." },
  { icon: Music, title: "Ambient Sound", desc: "Kurasi musik latar untuk membangun suasana yang intim." },
  { icon: MapPin, title: "Location Mapping", desc: "Navigasi presisi dengan integrasi langsung ke Google Maps." },
  { icon: MessageSquare, title: "RSVP & Guest Book", desc: "Kelola kehadiran dan pesan hangat dari tamu secara real-time." },
  { icon: Calendar, title: "Time Countdown", desc: "Penghitung waktu mundur yang elegan menuju hari bahagia." },
  { icon: Smartphone, title: "Mobile Optimized", desc: "Pengalaman visual sempurna di setiap perangkat smartphone." },
  { icon: Share2, title: "Seamless Sharing", desc: "Distribusi undangan instan melalui WhatsApp dan media sosial." },
]

export default function FeaturesSection() {
  return (
    <section id="feature" className="relative bg-[#0A0A0A] py-32 px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER: Minimalist & Bold */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mb-4 block">
              Essential Capabilities
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-cormorant-upright text-5xl md:text-7xl text-white leading-none tracking-tighter">
              The Science of <br />
              <span className="italic opacity-50">Sophistication</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-inter text-white/40 text-xs lg:text-sm max-w-xs leading-relaxed uppercase tracking-widest">
            Fungsionalitas modern yang dibalut dalam estetika klasik untuk pengalaman tamu yang tak terlupakan.
          </motion.p>
        </div>

        {/* FEATURES LIST: Bordered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 border-r border-b border-white/10 hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle Numbering */}
              <span className="absolute top-6 right-8 text-[10px] font-mono text-white/10 group-hover:text-white/30 transition-colors">0{i + 1}</span>

              <div className="mb-8 text-white/20 group-hover:text-white transition-transform duration-500 group-hover:-translate-y-1">
                <item.icon size={28} strokeWidth={1} />
              </div>

              <h3 className="font-cormorant-upright text-2xl text-white mb-4 tracking-wide group-hover:italic transition-all">{item.title}</h3>

              <p className="font-inter text-white/40 text-[11px] leading-relaxed tracking-wider uppercase group-hover:text-white/60 transition-colors">{item.desc}</p>

              {/* Hover Line Effect */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-20 flex justify-center">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
