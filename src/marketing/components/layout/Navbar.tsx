"use client" // Pastikan tambahkan ini jika menggunakan Next.js App Router
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Beranda", href: "#beranda" },
    { name: "Fitur", href: "#feature" },
    { name: "Template", href: "#template" },
    { name: "Harga", href: "#pricing" },
    { name: "Kontak", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2 font-serif text-xl text-[#3B2F2F]">
          <img src="/logo-without-text-3.png" alt="" className="w-6" />
          <span className="font-bold ">Invify</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-[#7A6F68]">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#D4A853] transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT BUTTONS (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Tombol Masuk - mengarahkan ke Auth dengan state isLogin: true */}
          <Link to="/auth" state={{ initialLogin: true }} className="text-sm text-[#7A6F68] hover:text-[#3B2F2F] cursor-pointer">
            Masuk
          </Link>

          {/* Tombol Daftar - mengarahkan ke Auth dengan state isLogin: false */}
          <Link to="/auth" state={{ initialLogin: false }} className="px-5 py-2.5 rounded-full bg-[#D4A853] text-white text-sm font-medium shadow-sm hover:bg-[#C59A45] transition-all cursor-pointer">
            Daftar Gratis
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#3B2F2F] p-1">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`md:hidden bg-white border-b border-black/5 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-[#7A6F68] hover:text-[#D4A853]">
              {link.name}
            </a>
          ))}
          <hr className="border-black/5 my-2" />
          <div className="flex flex-col gap-3 w-full px-4">
            <Link to="/auth" state={{ initialLogin: true }} className="w-full py-3.5 text-[#3B2F2F] font-semibold border border-stone-200 rounded-xl text-center active:bg-stone-50 transition-colors shadow-sm">
              Masuk
            </Link>

            <Link to="/auth" state={{ initialLogin: false }} className="w-full py-3.5 bg-[#D4A853] text-white font-bold rounded-xl shadow-lg shadow-[#D4A853]/20 text-center active:scale-[0.98] transition-all">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
