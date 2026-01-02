import { useState } from "react"
import template1 from "../../../../public/elegant-ivory/template-1.png"
import { Link } from "react-router-dom"

const categories = ["Semua", "Elegant", "Modern", "Floral", "Minimalist"]

const templates = [
  { id: 1, title: "Modern Love", category: "Modern", popular: false, src: "/demo/modern" },
  { id: 2, title: "Vintage Romance", category: "Elegant", popular: true, src: "/demo/elegant-ivory" },
  { id: 3, title: "Botanical Dreams", category: "Floral", popular: false, src: "/demo/elegant-ivory" },
]

export default function TemplatesSection() {
  const [active, setActive] = useState("Semua")

  const filtered = active === "Semua" ? templates : templates.filter((t) => t.category === active)

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm tracking-widest text-[#D4A853]">KOLEKSI TEMPLATE</span>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Pilih Template <span className="italic text-[#D4A853]">Favorit</span> Anda
          </h2>

          <p className="mt-6 text-[#7A6F68]">Berbagai pilihan desain premium siap digunakan untuk hari spesial Anda</p>
        </div>

        {/* FILTER */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm transition border
                ${active === cat ? "bg-[#D4A853] text-white border-[#D4A853]" : "bg-white text-[#7A6F68] border-black/10 hover:border-[#D4A853]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TEMPLATE GRID */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((tpl) => (
            <div key={tpl.id} className="group rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition overflow-hidden bg-white">
              {/* PREVIEW CONTAINER */}
              <div className="relative aspect-[3/4] flex items-center justify-center overflow-hidden">
                {/* IMAGE SEBAGAI BACKGROUND */}
                <img src={template1} alt={tpl.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                {/* OVERLAY (Agar teks lebih mudah dibaca) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* BADGE POPULAR */}
                {tpl.popular && <span className="absolute top-4 right-4 z-10 bg-[#D4A853] text-white text-xs px-3 py-1 rounded-full shadow-md">Popular</span>}

                {/* TEKS DI ATAS GAMBAR */}
                <div className="relative z-10 text-center text-white px-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-90">The Wedding Of</p>
                  <h4 className="mt-2 font-serif text-2xl">Romeo & Juliet</h4>
                  <p className="mt-1 text-sm opacity-80">25 Desember 2025</p>
                </div>
              </div>

              {/* INFO & BUTTONS */}
              <div className="p-6">
                <div className="mb-5">
                  <h3 className="font-serif text-lg text-[#3B2F2F]">{tpl.title}</h3>
                  <p className="mt-1 text-sm text-[#7A6F68]">{tpl.category}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to={tpl.src} target="_blank" className="py-2.5 px-4 text-center text-sm font-medium text-[#3B2F2F] border border-[#3B2F2F]/20 rounded-xl hover:bg-[#3B2F2F] hover:text-white transition-all">
                    View Demo
                  </Link>

                  <button className="py-2.5 px-4 text-sm font-medium text-white bg-[#3B2F2F] rounded-xl hover:bg-[#524343] shadow-md transition-all">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-full border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-white transition">Lihat Semua Template</button>
        </div>
      </div>
    </section>
  )
}
