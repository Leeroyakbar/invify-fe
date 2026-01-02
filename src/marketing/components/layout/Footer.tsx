import { Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#3B2F2F] text-[#FFF9F4]">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div>
          <h3 className="font-serif text-2xl text-white">Invify</h3>
          <p className="mt-4 text-sm text-[#E7DCD2] leading-relaxed">Platform undangan pernikahan digital premium untuk momen paling berharga dalam hidup Anda.</p>
        </div>

        {/* MENU */}
        <div>
          <h4 className="font-medium text-white">Menu</h4>
          <ul className="mt-4 space-y-2 text-sm text-[#E7DCD2]">
            <li>
              <a href="#beranda" className="hover:text-[#D4A853]">
                Beranda
              </a>
            </li>
            <li>
              <a href="#template" className="hover:text-[#D4A853]">
                Template
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-[#D4A853]">
                Harga
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#D4A853]">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-medium text-white">Bantuan</h4>
          <ul className="mt-4 space-y-2 text-sm text-[#E7DCD2]">
            <li>
              <a className="hover:text-[#D4A853]">FAQ</a>
            </li>
            <li>
              <a className="hover:text-[#D4A853]">Syarat & Ketentuan</a>
            </li>
            <li>
              <a className="hover:text-[#D4A853]">Kebijakan Privasi</a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-medium text-white">Kontak</h4>
          <div className="mt-4 space-y-3 text-sm text-[#E7DCD2]">
            <div className="flex items-center gap-3">
              <Mail size={16} /> id.invify@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} /> +62 822-7336-63718
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/id.invify/" target="_blank" className="flex items-center gap-2">
                <Instagram size={16} /> @id.invify
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-[#E7DCD2]">© {new Date().getFullYear()} Invify. All rights reserved.</div>
      </div>
    </footer>
  )
}
