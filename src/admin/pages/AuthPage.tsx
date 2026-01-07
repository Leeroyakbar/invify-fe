import { useState } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, Heart, ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // PERBAIKAN 1: Inisialisasi state langsung tanpa useEffect
  // Ini mencegah error "cascading renders"
  const [isLogin, setIsLogin] = useState(() => {
    return location.state?.initialLogin ?? true
  })

  const [showPassword, setShowPassword] = useState(false)

  // Variabel bantuan untuk animasi agar tetap smooth saat pindah form
  const direction = isLogin ? -1 : 1

  const formVariants = {
    hidden: { opacity: 0, x: direction * 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
    exit: { opacity: 0, x: direction * -20, transition: { duration: 0.3 } },
  }

  // PERBAIKAN 2: Handler manual untuk tombol "Daftar sekarang"
  // Kita update state lokal DAN bersihkan location.state agar useEffect tidak memaksa balik
  const toggleAuthMode = () => {
    setIsLogin((prev: boolean) => !prev)
    // Opsional: bersihkan state navigasi agar jika di-refresh tetap di posisi terakhir
    window.history.replaceState({}, document.title)
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Decorative Blur */}
      <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-[#D4A853]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-100 h-100 bg-[#D4A853]/10 rounded-full blur-[100px]" />

      <button onClick={() => navigate("/")} className="absolute top-8 left-8 flex items-center gap-2 text-stone-400 hover:text-[#D4A853] transition-colors text-sm group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali</span>
      </button>

      <div className="w-full max-w-md z-10 px-6">
        {/* Logo Invify */}
        <div className="flex flex-row items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#D4A853] rounded-full flex items-center justify-center shadow-lg shadow-[#D4A853]/30">
            <Heart className="text-white fill-white" size={20} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">Invify</h1>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(212,168,83,0.05)] border border-stone-50">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={isLogin ? "login" : "register"} variants={formVariants} initial="hidden" animate="visible" exit="exit">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-stone-800 mb-2">{isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}</h2>
                <p className="text-xs text-stone-400">{isLogin ? "Masuk untuk mengelola undangan Anda" : "Daftar untuk mulai membuat undangan"}</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-500 ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 transition-all placeholder:text-stone-300"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                    <input
                      type="email"
                      placeholder="email@contoh.com"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 transition-all placeholder:text-stone-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 transition-all placeholder:text-stone-300"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-[#D4A853] transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-500 ml-1">Konfirmasi Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 transition-all placeholder:text-stone-300"
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full bg-[#D4A853] hover:bg-[#C59A45] text-white rounded-xl py-3.5 mt-4 text-sm font-bold shadow-lg shadow-[#D4A853]/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                  {isLogin ? "Masuk" : "Daftar"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-stone-400">
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                  <button
                    type="button" // Pastikan type button agar tidak trigger submit form
                    onClick={toggleAuthMode}
                    className="text-[#D4A853] font-bold hover:text-[#C59A45] transition-colors underline-offset-4 hover:underline"
                  >
                    {isLogin ? "Daftar sekarang" : "Masuk"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
