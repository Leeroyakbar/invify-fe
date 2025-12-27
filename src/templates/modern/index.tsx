import type { Invitation } from "../../types/Invitation"
import Cover from "./cover"

interface Props {
  data: Invitation
}

const ModernTemplate = ({ data }: Props) => {
  return (
    <>
      <Cover data={data} />
    </>
  )
}

export default ModernTemplate
