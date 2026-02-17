// src/api/axiosConfig.ts
import axios from "axios"

const api = axios.create({ baseURL: "YOUR_API_URL" })

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/auth" // Redirect paksa
      alert("Sesi berakhir. Silakan login kembali.")
    }
    return Promise.reject(error)
  },
)

export default api
