import { useParams, Navigate } from "react-router-dom"
import InvitationPage from "./InvitationPage"
import { dummyInvitation } from "../../data/dummyInvitation"
import { TEMPLATE_MAP, type TemplateKey } from "../engine/TemplateRegistry"

export default function InvitationDemoPage() {
  const { templateKey } = useParams<{ templateKey: TemplateKey }>()

  if (!templateKey || !(templateKey in TEMPLATE_MAP)) {
    return <Navigate to="/" replace />
  }

  return (
    <InvitationPage
      data={{
        ...dummyInvitation,
        template: templateKey,
      }}
      mode="demo"
    />
  )
}
