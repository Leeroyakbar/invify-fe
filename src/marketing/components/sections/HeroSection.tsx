export default function HeroSection() {
  const kirimKeWhatsApp = () => {
    const nomorWA = "6282273366718"
    const teks = `Halo Invify, saya ingin memesan undangan digital untuk acara pernikahan saya.`

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`

    window.open(url, "_blank")
  }

  return (
    <section className="relative bg-linear-to-b from-[#FFF9F4] via-[#F6E6E3] to-white">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center" id="beranda">
        <span className="inline-block px-4 py-2 rounded-full bg-[#F6E6E3] text-sm text-[#7A6F68]">✨ Platform Undangan Digital #1 Mandailing</span>

        <h1 className="mt-6 font-serif text-5xl md:text-6xl text-[#3B2F2F] leading-tight">
          Undangan Digital <span className="text-[#D4A853] italic">Elegan</span>
          <br />
          untuk Momen Tak Terlupakan
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-[#7A6F68]">Wujudkan undangan pernikahan impian Anda dengan desain premium, fitur lengkap, dan mudah dibagikan.</p>

        <div className="mt-10 flex justify-center gap-4">
          <a href="#template" className="text-sm md:text-md px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#D4A853] text-white shadow-lg cursor-pointer">
            Lihat Katalog
          </a>
          <button onClick={kirimKeWhatsApp} className={`text-sm md:text-md px-6 py-3 md:px-8 md:py-4 rounded-full border border-[#D4A853] text-[#D4A853] cursor-pointer hover:bg-[#D4A853] hover:text-white`}>
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  )
}
