import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvitationPage from "./invitation/pages/InvitationPage"
import InvitationDemoPage from "./invitation/pages/InvitationDemoPage"
import { dummyInvitation } from "./data/dummyInvitation"
import LandingPage from "./marketing/pages/LandingPage"

// Import AuthPage baru
import AuthPage from "./admin/pages/AuthPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/invitation/:slug" element={<InvitationPage data={dummyInvitation} />} />

        {/* ADMIN & AUTH ROUTES */}
        {/* Kamu bisa mengakses ini via /admin/auth atau /login */}
        <Route path="/auth" element={<AuthPage />} />

        {/* DEMO ROUTES */}
        <Route path="/demo/:templateKey" element={<InvitationDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
