import { useState } from "react"
import { dummyInvitation } from "../data/dummyInvitation"
import { TEMPLATE_MAP } from "../templates"
// import AudioPlayer from "../ui/audioPlayer"

const TEMPLATE_THEME = {
  modern: {
    desktopBg: "bg-[url('/modern/wedding-of-desk.png')] bg-cover bg-center",
  },
  "elegant-ivory": {
    desktopBg: "bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center",
  },
}

export default function InvitationPage() {
  const templateName = "elegant-ivory"
  const Template = TEMPLATE_MAP[templateName]
  const theme = TEMPLATE_THEME[templateName]
  const [isOpened, setIsOpened] = useState(false)

  const rawDate = "2027-02-27" // Contoh dari API
  const [year, month, day] = rawDate.split("-")

  // Hasilnya tetap angka dalam bentuk string
  const eventDateFormatted = `${day} • ${month} • ${year}`

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-200">
      {/* <AudioPlayer src={dummyInvitation.audioUrl} /> */}

      {/* LEFT — STATIC BACKGROUND + TEXT */}
      <div className={`hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-620px)] ${theme.desktopBg}`}>
        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* text content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-12">
          <h2 className="text-white text-3xl tracking-wide font-cormorant font-semibold mb-4">The Wedding Of</h2>

          <h1 className="font-script text-5xl md:text-7xl text-white mb-4 leading-tight">
            {dummyInvitation.brideName}
            <span className="text-gold">&</span>
            {dummyInvitation.groomName}
          </h1>

          <p className="font-serif text-xl tracking-widest text-white">{eventDateFormatted}</p>
        </div>
      </div>

      {/* RIGHT — MOBILE SCROLL AREA */}
      <div className="ml-0 lg:ml-[calc(100%-620px)] h-screen flex justify-center">
        <div className="w-full max-w-[1200px] h-screen overflow-y-auto bg-white shadow-xl">
          <Template data={dummyInvitation} isOpened={isOpened} onOpen={() => setIsOpened(true)} />
        </div>
      </div>
    </div>
  )
}
