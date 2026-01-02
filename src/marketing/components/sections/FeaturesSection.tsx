import { Users, Image, Music, MapPin, MessageSquare, Calendar, Smartphone, Share2 } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Custom Nama & Acara",
    desc: "Personalisasi nama pengantin, tanggal, dan detail acara sesuai keinginan",
  },
  {
    icon: Image,
    title: "Galeri Foto & Video",
    desc: "Tampilkan momen indah Anda dengan galeri foto dan video berkualitas tinggi",
  },
  {
    icon: Music,
    title: "Musik Latar",
    desc: "Tambahkan lagu favorit sebagai pengiring saat tamu membuka undangan",
  },
  {
    icon: MapPin,
    title: "Lokasi Google Maps",
    desc: "Integrasi peta lokasi untuk memudahkan tamu menemukan venue acara",
  },
  {
    icon: MessageSquare,
    title: "RSVP & Buku Tamu",
    desc: "Konfirmasi kehadiran dan kumpulkan ucapan dari tamu undangan",
  },
  {
    icon: Calendar,
    title: "Hitung Mundur",
    desc: "Countdown timer yang membuat momen menunggu semakin spesial",
  },
  {
    icon: Smartphone,
    title: "Akses dari HP",
    desc: "Responsif di semua perangkat, sempurna untuk dibuka di smartphone",
  },
  {
    icon: Share2,
    title: "Berbagi Mudah",
    desc: "Bagikan undangan via WhatsApp, Instagram, dan media sosial lainnya",
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#FFF9F4] to-[#F6E6E3]">
      <div className="max-w-7xl mx-auto px-6 py-24" id="feature">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Semua yang Anda Butuhkan dalam <br />
            <span className="italic text-[#D4A853]">Satu Platform</span>
          </h2>

          <p className="mt-6 text-[#7A6F68]">Fitur lengkap untuk membuat undangan pernikahan digital yang sempurna</p>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div key={i} className="group bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-[#F6E6E3] flex items-center justify-center text-[#D4A853] group-hover:scale-110 transition">
                <item.icon size={26} />
              </div>

              <h3 className="mt-6 font-serif text-lg text-[#3B2F2F]">{item.title}</h3>

              <p className="mt-3 text-sm text-[#7A6F68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
