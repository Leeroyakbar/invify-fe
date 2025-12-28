import { useRef } from "react"
import type { TemplateProps } from "../../types/TemplateProps"
import Announcement from "./announcement"
import Cover from "./cover"
import Countdown from "./countdown"
import Couple from "./couple"
import WeddingEvent from "./event"
import LoveStory from "./loveStory"

const ModernTemplate = ({ data, isOpened, onOpen }: TemplateProps) => {
  const announcementRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    onOpen()

    // scroll ke announcement
    setTimeout(() => {
      announcementRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }
  return (
    <>
      <Cover data={data} isOpened={isOpened} onOpen={handleOpen} />
      <div ref={announcementRef}>
        <Announcement data={data} />
      </div>
      <Countdown data={data} />
      <Couple data={data} />
      <WeddingEvent data={data} />
      <LoveStory data={data} />
    </>
  )
}

export default ModernTemplate
