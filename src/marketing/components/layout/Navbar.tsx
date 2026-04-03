/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import { Instagram, Facebook, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mengunci scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { name: "Home", href: "#beranda" },
    { name: "Package", href: "#pricing" },
    { name: "Catalog", href: "#template" },
    { name: "FAQ", href: "#faq" },
  ]

  // const secondaryLinks = [
  //   { name: "Guest Book", href: "#" },
  //   { name: "Broadcast Invitation", href: "#" },
  //   { name: "Instagram", href: "#" },
  //   { name: "Youtube", href: "#" },
  // ]

  return (
    <>
      {/* 1. MAIN NAVIGATION BAR (Sticky) */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 z-[110]">
            <img src="/logo-without-text-3.png" alt="Invify" className={`w-7 transition-all `} />
            <span className={`font-cormorant-upright text-2xl tracking-widest uppercase transition-colors text-white`}>Invify</span>
          </Link>

          {/* DESKTOP NAV (Hanya muncul saat tidak discroll, ala Groove) */}
          <nav className={`hidden lg:flex items-center gap-12 transition-opacity duration-300 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-opacity">
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE: TOGGLE BUTTON */}
          <div className="flex items-center gap-6 z-[110]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`group flex items-center gap-3 px-4 py-2 rounded-full transition-all ${scrolled || isOpen ? "bg-white/10 backdrop-blur-md border border-white/20 text-white" : "bg-black text-white"}`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:block">{isOpen ? "Close" : "Menu"}</span>
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-[1.5px] bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`w-full h-[1.5px] bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-[1.5px] bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[90] bg-[#0A0A0A] text-white flex flex-col justify-center overflow-hidden"
          >
            {/* Background Texture/Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="max-w-7xl mx-auto px-12 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
              {/* LEFT IMAGE (Desktop Only) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="hidden lg:block relative w-full max-w-lg mx-auto overflow-hidden rounded-sm"
              >
                {/* Perubahan Utama: Hapus h-full dan object-cover, gunakan aspect-ratio */}
                <img
                  src="/frame.webp" // Gunakan salah satu foto template noir kamu
                  className="w-full aspect-[3/4] object-contain brightness-50 shadow-2xl ring-1 ring-white/5"
                  alt="Navigation Preview"
                />
              </motion.div>

              {/* MENU LINKS */}
              <div className="flex flex-col gap-12">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-5xl lg:text-7xl font-cormorant-upright tracking-tighter hover:italic hover:pl-4 transition-all duration-500"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  {/* <div className="flex flex-col gap-3">
                    {secondaryLinks.map((link, i) => (
                      <a key={link.name} href={link.href} className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                        + {link.name}
                      </a>
                    ))}
                  </div> */}
                  <div className="flex flex-col justify-between items-end lg:items-start">
                    <div className="space-y-4">
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block text-[11px] uppercase tracking-[0.3em] font-bold border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all text-center"
                      >
                        Account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER INFO */}
            <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end">
              <div className="hidden lg:block">
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">Privacy Policy / Refund Policy</p>
              </div>
              <div className="flex gap-6">
                {/* INSTAGRAM */}
                <a href="https://instagram.com/invify.id" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300">
                  <Instagram size={18} />
                </a>

                {/* WHATSAPP / PHONE */}
                <a href="https://wa.me/6282273366718" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300">
                  <Phone size={18} />
                </a>

                <a href="https://facebook.com/invify" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
