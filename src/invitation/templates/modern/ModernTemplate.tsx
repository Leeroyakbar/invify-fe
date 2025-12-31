import { useRef } from "react"
import type { TemplateProps } from "../../../types/TemplateProps"
import Announcement from "./sections/announcement"
import Cover from "./sections/cover"
import Countdown from "./sections/countdown"
import Couple from "./sections/couple"
import WeddingEvent from "./sections/event"
import LoveStory from "./sections/loveStory"
import WeddingGifts from "./sections/weddingGifts"
import GallerySection from "./sections/galery"
import RSVPSection from "./sections/rsvp"
import ThankYouSection from "./sections/thankyou"

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
      <WeddingGifts data={data} />
      <GallerySection images={data.images} />
      <RSVPSection data={data} />
      <ThankYouSection data={data} />
    </>
  )
}

export default ModernTemplate
