import type { Invitation } from "../../types/Invitation"
import nameCard from "@/assets/name-card.png"
import loveLetter from "@/assets/love-letter.png"
import Button from "../../ui/button"

interface CoverSectionProps {
  data: Invitation
  guestName?: string
}

export default function Cover({ data, guestName = "Bapak/Ibu/Saudara/i" }: CoverSectionProps) {
  const eventDate = data.eventDate.split("-").reverse().join(" • ")

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Greeting Card */}
      <img src={nameCard} alt="" className="mx-auto w-52 md:w-52 mb-2" />

      {/* Subtitle */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-faded-merlot">Wedding Invitation</p>

      {/* Names */}
      <h1 className="font-script text-3xl md:text-[44px] text-faded-merlot mb-2 leading-tight">
        {data.brideName} <span className="text-gold">&</span> {data.groomName}
      </h1>

      {/* Date */}
      <p className="font-serif text-sm md:text-base tracking-widest mb-10 text-faded-merlot">{eventDate}</p>

      {/* Guest */}
      <p className="italic text-lg mb-1 text-faded-merlot font-cormorant">Kepada Yth.</p>
      <p className="text-xl font-bold mb-10 text-faded-merlot font-cormorant">{guestName}</p>

      {/* Button */}
      <Button variant="primary" className="flex items-center gap-2">
        <img src={loveLetter} alt="" className="w-5 h-5" />
        <span className="font-montserrat">Buka Undangan</span>
      </Button>
    </section>
  )
}
