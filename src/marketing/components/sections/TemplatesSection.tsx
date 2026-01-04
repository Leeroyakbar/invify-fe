import { useState } from "react"
import template1 from "../../../../public/templates/template-1.png"
import template2 from "../../../../public/templates/template-2.png"
import template3 from "../../../../public/templates/template-3.png"
import template4 from "../../../../public/templates/template-4.png"
import { Link } from "react-router-dom"

const categories = ["Semua", "Elegant", "Modern", "Floral", "Minimalist"]

const templates = [
  {
    id: 1,
    title: "Old Money",
    category: "Elegant",
    popular: true,
    src: "/demo/old-money",
    img: template4,
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Old%20Money%20untuk%20acara%20pernikahan%20saya.",
  },

  {
    id: 2,
    title: "Elegant Ivory",
    category: "Elegant",
    popular: true,
    src: "/demo/elegant-ivory",
    img: template1,
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Elegant%20Ivory%20untuk%20acara%20pernikahan%20saya.",
  },

  {
    id: 3,
    title: "Classic Noir",
    category: "Elegant",
    popular: true,
    src: "/demo/classic-noir",
    img: template3,
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Classic%20Noir%20untuk%20acara%20pernikahan%20saya.",
  },

  {
    id: 4,
    title: "Modern Love",
    category: "Floral",
    popular: false,
    src: "/demo/modern",
    img: template2,
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Modern%20Love%20untuk%20acara%20pernikahan%20saya.",
  },
]

export default function TemplatesSection() {
  const [active, setActive] = useState("Semua")

  const filtered = active === "Semua" ? templates : templates.filter((t) => t.category === active)

  return (
    <section id="template" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
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
        {/* Gunakan Flexbox supaya items bisa diletakkan di tengah (justify-center) */}
        <div className="mt-16 flex flex-wrap justify-center gap-10">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="group rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition overflow-hidden bg-white 
                 w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[400px]"
            >
              {/* PREVIEW CONTAINER */}
              <div className="relative aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img src={tpl.img} alt={tpl.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                {tpl.popular && <span className="absolute top-4 right-4 z-10 bg-[#D4A853] text-white text-xs px-3 py-1 rounded-full shadow-md">Popular</span>}
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
                  <button onClick={() => window.open(tpl.urlWa, "_blank")} className="py-2.5 px-4 text-sm font-medium text-white bg-[#3B2F2F] rounded-xl hover:bg-[#524343] shadow-md transition-all cursor-pointer">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* CTA */}
        {/* <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-full border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-white transition">Lihat Semua Template</button>
        </div> */}
      </div>
    </section>
  )
}
