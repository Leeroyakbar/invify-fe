import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import CoverSection from "./sections/CoverSection"
import AnnouncementSection from "./sections/AnnouncementSection"
import type { TemplateProps } from "../../../types/TemplateProps"

export default function ArchElegantTemplate({ data, isOpened, onOpen }: TemplateProps) {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    onOpen()

    setOpened(true)
  }
  return (
    <>
      <div className={`h-full ${isOpened ? "overflow-y-auto" : "overflow-hidden"}`}>
        <AnimatePresence>{!opened && <CoverSection onOpen={handleOpen} data={data} />}</AnimatePresence>

        {opened && (
          <main>
            <AnnouncementSection />
          </main>
        )}
      </div>
    </>
  )
}
