import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvitationPage from "./invitation/pages/InvitationPage"
import InvitationDemoPage from "./invitation/pages/InvitationDemoPage"
import { dummyInvitation } from "./data/dummyInvitation"
import LandingPage from "./marketing/pages/LandingPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invitation/:slug" element={<InvitationPage data={dummyInvitation} />} />

        {/* DEMO */}
        <Route path="/demo/:templateKey" element={<InvitationDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
