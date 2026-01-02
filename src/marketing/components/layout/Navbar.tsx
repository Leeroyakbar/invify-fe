export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif text-xl text-[#3B2F2F]">
          <div className="w-8 h-8 rounded-full bg-[#D4A853] flex items-center justify-center text-white">♥</div>
          Invify
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-[#7A6F68]">
          <a className="hover:text-[#D4A853]">Beranda</a>
          <a className="hover:text-[#D4A853]">Fitur</a>
          <a className="hover:text-[#D4A853]">Template</a>
          <a className="hover:text-[#D4A853]">Harga</a>
          <a className="hover:text-[#D4A853]">Kontak</a>
        </nav>

        <div className="flex gap-3">
          <button className="text-sm">Masuk</button>
          <button className="px-4 py-2 rounded-full bg-[#D4A853] text-white text-sm shadow hover:bg-[#C59A45]">Daftar Gratis</button>
        </div>
      </div>
    </header>
  )
}
