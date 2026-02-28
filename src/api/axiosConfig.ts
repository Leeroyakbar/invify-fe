// src/api/axiosConfig.ts
import axios from "axios"

const api = axios.create({ 
  // Mengambil URL dari .env
  baseURL: import.meta.env.VITE_API_BASE_URL 
})

// 1. REQUEST INTERCEPTOR: Menambahkan token otomatis ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

// 2. RESPONSE INTERCEPTOR: Menangani error 401 (Token Expired/Invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("role") // Hapus juga role-nya
      window.location.href = "/auth" 
      // alert("Sesi berakhir. Silakan login kembali.") // Opsional, bisa pakai toast
    }
    return Promise.reject(error)
  },
)

export default api