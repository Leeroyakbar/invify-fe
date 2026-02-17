import { useState } from "react"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"

export default function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  })

  const [isLogin, setIsLogin] = useState(() => {
    return location.state?.initialLogin ?? true
  })

  const [showPassword, setShowPassword] = useState(false)

  const direction = isLogin ? -1 : 1

  const formVariants = {
    hidden: { opacity: 0, x: direction * 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
    exit: { opacity: 0, x: direction * -20, transition: { duration: 0.3 } },
  }

  const toggleAuthMode = () => {
    setIsLogin((prev: boolean) => !prev)
    window.history.replaceState({}, document.title)
  }

  // Definisikan class input yang sama agar reusable dan rapi
  const inputClass = "w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 transition-all placeholder:text-stone-300"

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(isLogin, formData)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return toast.error("Password dan Konfirmasi Password tidak cocok!")
    }

    const endpoint = isLogin ? "/auth/login" : "/auth/register"

    setIsLoading(true)
    console.log("isloading:", isLoading)

    try {
      const response = await axios.post(`http://localhost:8085/api${endpoint}`, formData)

      console.log(response)

      if (response.data.success) {
        if (isLogin) {
          const { token, role } = response.data.data
          console.log(token, role)
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          toast.success("Login Berhasil!")
          setIsLoading(false)
          if (role === "ADMIN") {
            navigate("/admin/dashboard")
          } else {
            navigate("/")
          }
        } else {
          toast.success("Registrasi Berhasil! Silakan Login.")
          setIsLogin(true)
          setIsLoading(false)
        }
      }
    } catch (error: unknown) {
      // Gunakan pengecekan tipe atau casting yang aman
      const axiosError = error as AxiosError<{ error: string }>
      const errorMessage = axiosError.response?.data?.error || "Terjadi kesalahan koneksi"
      setIsLoading(false)
      toast.error("Gagal: " + errorMessage)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-5%] w-100 h-100 bg-[#D4A853]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-100 h-100 bg-[#D4A853]/10 rounded-full blur-[100px]" />

      <button onClick={() => navigate("/")} className="absolute top-8 left-8 flex items-center gap-2 text-stone-400 hover:text-[#D4A853] transition-colors text-sm group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali</span>
      </button>

      <div className="w-full max-w-md z-10 px-6">
        <div className="flex flex-row items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#D4A853]/30">
            <img src="/logo-without-text-3.png" alt="Invify" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">Invify</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(212,168,83,0.05)] border border-stone-50">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={isLogin ? "login" : "register"} variants={formVariants} initial="hidden" animate="visible" exit="exit">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-stone-800 mb-2">{isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}</h2>
                <p className="text-xs text-stone-400">{isLogin ? "Masuk untuk mengelola undangan Anda" : "Daftar untuk mulai membuat undangan"}</p>
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-500 ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                      <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Masukkan nama lengkap" className={inputClass} required />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@contoh.com" className={inputClass} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className={inputClass} required />
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
                      <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••" className={inputClass} required />
                    </div>
                  </div>
                )}

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full flex justify-center items-center bg-[#D4A853] text-white rounded-xl py-3.5 mt-4 text-sm font-bold shadow-lg shadow-[#D4A853]/20 transition-all 
                    ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#C59A45] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      <span>Mohon Tunggu...</span>
                    </div>
                  ) : (
                    <span>{isLogin ? "Masuk" : "Daftar"}</span>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-stone-400">
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                  <button type="button" onClick={toggleAuthMode} className="text-[#D4A853] font-bold hover:text-[#C59A45] transition-colors underline-offset-4 hover:underline">
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
