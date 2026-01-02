import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const waLink = "https://wa.me/6282273366718"

  const kirimKeWhatsApp = () => {
    const nomorWA = "6282273366718" // Gunakan kode negara tanpa tanda +

    // Membentuk pesan utuh dengan encodeURIComponent agar karakter seperti spasi dan enter terbaca
    const teks = `Halo Invify, saya ingin bertanya:
    
*Nama:* ${formData.nama}
*Email:* ${formData.email}
*Pesan:* ${formData.pesan}`

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`

    window.open(url, "_blank")
  }

  return (
    <section className="bg-gradient-to-b from-[#FFF7EF] to-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-6 py-24" id="contact">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Konsultasi Undangan <br />
            <span className="italic text-[#D4A853]">Gratis</span>
          </h2>

          <p className="mt-6 text-[#7A6F68]">Hubungi kami untuk mendapatkan rekomendasi template terbaik</p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* INFO */}
          <div className="space-y-6">
            <p className="text-[#7A6F68] leading-relaxed">Tim Invify siap membantu Anda mewujudkan undangan pernikahan digital yang elegan dan berkesan. Konsultasi gratis tanpa komitmen.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F6E6E3] text-[#D4A853] flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#7A6F68]">WhatsApp</p>
                  <p className="font-medium text-[#3B2F2F]">+62 822-7336-6718</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F6E6E3] text-[#D4A853] flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#7A6F68]">Email</p>
                  <p className="font-medium text-[#3B2F2F]">id.invify@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F6E6E3] text-[#D4A853] flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#7A6F68]">Lokasi</p>
                  <p className="font-medium text-[#3B2F2F]">Panyabungan, Mandaling Natal</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <form className="space-y-5">
              <input
                type="text"
                name="nama" // Pastikan name sama dengan key di state
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
              />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#D4A853]" />
              <textarea rows={4} name="pesan" placeholder="Pesan" value={formData.pesan} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#D4A853]" />

              <button type="button" onClick={kirimKeWhatsApp} className="w-full py-4 rounded-full bg-[#D4A853] text-white hover:bg-[#C59A45] transition font-medium">
                Kirim Pesan
              </button>

              <p className="text-center text-sm text-[#7A6F68]">atau</p>

              <button type="button" onClick={() => window.open(waLink, "_blank")} className="block text-center w-full py-4 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition font-medium">
                Hubungi via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="my-24 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-[#9C8F86]">
          <span>❤️</span>
          Mulai perjalanan cinta Anda
          <span>❤️</span>
        </p>

        <h3 className="mt-6 font-serif text-3xl md:text-4xl text-[#3B2F2F]">Buat Undangan Digital Anda Sekarang</h3>

        <button className="mt-10 px-10 py-4 rounded-full bg-[#D4A853] text-white font-medium hover:bg-[#C59A45] transition shadow-md">Mulai Buat Undangan</button>
      </div>
    </section>
  )
}
