import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  allowedRoles: string[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("role") // Simpan role saat login nanti

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  if (!allowedRoles.includes(userRole || "")) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
