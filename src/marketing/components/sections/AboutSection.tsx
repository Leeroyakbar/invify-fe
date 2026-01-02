import { Smartphone, Palette, Heart, Share2 } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Praktis",
    desc: "Akses undangan dari mana saja, kapan saja melalui smartphone",
  },
  {
    icon: Palette,
    title: "Modern & Elegan",
    desc: "Desain premium yang mengikuti tren pernikahan terkini",
  },
  {
    icon: Heart,
    title: "Custom Sepenuhnya",
    desc: "Sesuaikan setiap detail sesuai keinginan Anda",
  },
  {
    icon: Share2,
    title: "Mudah Dibagikan",
    desc: "Kirim undangan via WhatsApp, Instagram, dan media sosial",
  },
]

export default function AboutSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#FFF9F4]">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm tracking-widest text-[#D4A853]">TENTANG KAMI</span>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F] leading-tight">
            Wujudkan Undangan <br />
            <span className="italic text-[#D4A853]">Impian</span> Anda
          </h2>

          <p className="mt-6 text-[#7A6F68] leading-relaxed">
            Di Invify, kami percaya setiap kisah cinta itu unik. Kami membantu Anda merangkai undangan digital yang tidak hanya sekadar informasi, tapi menjadi kenangan indah pertama bagi tamu undangan Anda.
          </p>

          <p className="mt-4 text-[#7A6F68] leading-relaxed">Dari desain premium hingga fitur interaktif seperti RSVP, galeri foto, dan peta lokasi — semua tersedia dalam satu platform.</p>
        </div>

        {/* RIGHT FEATURES */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((item, i) => (
            <div key={i} className="group rounded-2xl bg-white p-6 border border-black/5 shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#F6E6E3] flex items-center justify-center text-[#D4A853] group-hover:scale-110 transition">
                <item.icon size={22} />
              </div>

              <h3 className="mt-4 font-serif text-lg text-[#3B2F2F]">{item.title}</h3>

              <p className="mt-2 text-sm text-[#7A6F68]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
