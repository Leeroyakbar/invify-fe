import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvitationPage from "./invitation/pages/InvitationPage"
import InvitationDemoPage from "./invitation/pages/InvitationDemoPage"
import { dummyInvitation } from "./data/dummyInvitation"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage data={dummyInvitation} />} />

        {/* DEMO */}
        <Route path="/demo/:templateKey" element={<InvitationDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
