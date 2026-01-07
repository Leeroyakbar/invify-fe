import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import InvitationPage from "./invitation/pages/InvitationPage"
import InvitationDemoPage from "./invitation/pages/InvitationDemoPage"
import { dummyInvitation } from "./data/dummyInvitation"
import LandingPage from "./marketing/pages/LandingPage"

// Import Admin
import AuthPage from "./admin/pages/AuthPage"
import AdminLayout from "./admin/components/AdminLayout"
import DashboardPage from "./admin/pages/DashboardPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/invitation/:slug" element={<InvitationPage data={dummyInvitation} />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* --- ADMIN ROUTES (Nested) --- */}
        {/* Semua route di bawah ini akan otomatis menggunakan AdminLayout */}
        <Route path="/admin" element={<AdminLayout children={<DashboardPage />} />}>
          {/* Redirect /admin ke /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Placeholder untuk menu lainnya agar tidak error saat diklik */}
          <Route path="pengguna" element={<div className="p-8">Halaman Pengguna (Coming Soon)</div>} />
          <Route path="undangan" element={<div className="p-8">Halaman Undangan (Coming Soon)</div>} />
          <Route path="template" element={<div className="p-8">Halaman Template (Coming Soon)</div>} />
          <Route path="transaksi" element={<div className="p-8">Halaman Transaksi (Coming Soon)</div>} />
          <Route path="laporan" element={<div className="p-8">Halaman Laporan (Coming Soon)</div>} />
          <Route path="pengaturan" element={<div className="p-8">Halaman Pengaturan (Coming Soon)</div>} />
        </Route>

        {/* --- DEMO ROUTES --- */}
        <Route path="/demo/:templateKey" element={<InvitationDemoPage />} />

        {/* 404 Redirect (Optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
