import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import InvitationPage from "./invitation/pages/InvitationPage"
import InvitationDemoPage from "./invitation/pages/InvitationDemoPage"
import { dummyInvitation } from "./data/dummyInvitation"
import LandingPage from "./marketing/pages/LandingPage"

// Import Admin
import AuthPage from "./admin/pages/AuthPage"
import AdminLayout from "./admin/components/AdminLayout"
import DashboardPage from "./admin/pages/DashboardPage"
import UsersPage from "./admin/pages/UserPage"
import AdminInvitationPage from "./admin/pages/AdminInvitationPage"
import TemplatePage from "./admin/pages/TemplatePage"
import { Toaster } from "sonner"
import TransactionPage from "./admin/pages/TransactionPage"
import ReportPage from "./admin/pages/ReportPage"
import SettingsPage from "./admin/pages/SettingPage"

export default function App() {
  return (
    <BrowserRouter>
      {/* Toaster */}
      <Toaster
        richColors
        toastOptions={{
          className: "font-sans", // Font utama toast
          descriptionClassName: "font-serif italic", // Jika ada deskripsi
        }}
      />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/invitation/:slug" element={<InvitationPage data={dummyInvitation} />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* --- ADMIN ROUTES (Nested) --- */}
        {/* Semua route di bawah ini akan otomatis menggunakan AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin ke /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Placeholder untuk menu lainnya agar tidak error saat diklik */}
          <Route path="users" element={<UsersPage />} />
          <Route path="invitations" element={<AdminInvitationPage />} />
          <Route path="templates" element={<TemplatePage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* --- DEMO ROUTES --- */}
        <Route path="/demo/:templateKey" element={<InvitationDemoPage />} />

        {/* 404 Redirect (Optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
