import type { TemplateProps } from "../../../types/TemplateProps"
import CurtainCoverSection from "./sections/CurtainCoverSection"
// import HeroCoverSection from "./sections/HeroCoversection"
import AnnouncementVideoSection from "./sections/Announcement"
import QuoteImageSection from "./sections/Quote"
import MobileNavbar from "./components/MobileNavbar"

export default function ClassicNoir({ data, isOpened, onOpen }: TemplateProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">
      <MobileNavbar />
      <CurtainCoverSection data={data} isOpened={isOpened} onOpen={onOpen} />
      {/* <HeroCoverSection data={data} /> */}
      <AnnouncementVideoSection data={data} />
      <QuoteImageSection data={data} />
    </div>
  )
}
