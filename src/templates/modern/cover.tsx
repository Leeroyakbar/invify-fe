import type { Invitation } from "../../types/Invitation"
import nameCard from "@/assets/name-card.png"
import loveLetter from "@/assets/love-letter.png"
import Button from "../../ui/button"

interface CoverSectionProps {
  data: Invitation
  guestName?: string
  isOpened: boolean
  onOpen: () => void
}

export default function Cover({ data, guestName = "Bapak/Ibu/Saudara/i", isOpened, onOpen }: CoverSectionProps) {
  const rawDate = "2027-02-27" // Contoh dari API
  const [year, month, day] = rawDate.split("-")

  // Hasilnya tetap angka dalam bentuk string
  const eventDateFormatted = `${day} • ${month} • ${year}`

  const handleOpen = () => {
    if (!isOpened) {
      onOpen()
    }
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center">
      {/* BACKGROUND KHUSUS COVER */}
      <div className="absolute inset-0 bg-[url('/modern/greeting-bg.png')] bg-cover bg-center" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <img src={nameCard} alt="" className="w-52 mb-2" />

        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-faded-merlot">Wedding Invitation</p>

        <h1 className="font-script text-3xl md:text-[44px] text-faded-merlot mb-2 leading-tight">
          {data.brideName}
          <span className="text-gold"> & </span>
          {data.groomName}
        </h1>

        <p className="font-serif text-sm tracking-widest mb-10 text-faded-merlot">{eventDateFormatted}</p>

        <p className="italic text-lg mb-1 text-faded-merlot font-cormorant">Kepada Yth.</p>
        <p className="text-xl font-bold mb-10 text-faded-merlot font-cormorant">{guestName}</p>

        <Button variant="primary" className="flex items-center gap-2" onClick={handleOpen}>
          <img src={loveLetter} alt="" className="w-5 h-5" />
          <span className="font-montserrat">{isOpened ? "Lihat Undangan" : "Buka Undangan"}</span>
        </Button>
      </div>
    </section>
  )
}
