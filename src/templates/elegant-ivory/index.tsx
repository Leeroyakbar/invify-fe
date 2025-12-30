import { useRef } from "react"
import type { TemplateProps } from "../../types/TemplateProps"
import CountdownSection from "./sections/countDown"
import CoverSection from "./sections/coverSection"
import BrideGroomSection from "./sections/brideGroom"
import WeddingEventSection from "./sections/weddingEvent"
import QuoteSection from "./sections/quote"
import LoveStorySection from "./sections/loveStory"

export default function IvoryTemplate({ data, isOpened, onOpen }: TemplateProps) {
  const countdownRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    onOpen()

    setTimeout(() => {
      countdownRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <div className={`h-full ${isOpened ? "overflow-y-auto" : "overflow-hidden"}`}>
      <CoverSection data={data} onOpen={handleOpen} />

      <div ref={countdownRef}>
        <CountdownSection data={data} />
      </div>
      <BrideGroomSection data={data} />
      <WeddingEventSection data={data} />
      <QuoteSection />
      <LoveStorySection data={data} />
    </div>
  )
}
