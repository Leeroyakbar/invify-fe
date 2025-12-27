import type { Invitation } from "./Invitation"

export interface TemplateProps {
  data: Invitation
  isOpened: boolean
  onOpen: () => void
}
