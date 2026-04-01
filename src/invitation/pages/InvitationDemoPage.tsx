import { useParams, Navigate } from "react-router-dom"
import InvitationPage from "./InvitationPage"
import { dummyInvitation } from "../../data/dummyInvitation"
import { TEMPLATE_MAP, type TemplateKey } from "../engine/TemplateRegistry"
import { DEMO_INVITATIONS } from "../engine/demoInvitationMap"

export default function InvitationDemoPage() {
  const { templateKey } = useParams<{ templateKey: TemplateKey }>()
  if (!templateKey || !(templateKey in TEMPLATE_MAP)) {
    return <Navigate to="/" replace />
  }
  const demoData = DEMO_INVITATIONS[templateKey] ?? dummyInvitation

  return (
    <InvitationPage
      data={{
        ...demoData,
        template: templateKey,
      }}
      mode="demo"
    />
  )
}