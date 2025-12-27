import { dummyInvitation } from "../data/dummyInvitation"
import { TEMPLATE_MAP } from "../templates"

const TEMPLATE_THEME = {
  modern: {
    desktopBg: "bg-[url('/modern/wedding-of-desk.png')] bg-cover bg-center",
    canvasBg: "bg-[url('/modern/greeting-bg.png')] bg-cover bg-center",
  },
}

export default function InvitationPage() {
  const templateName = "modern" // akan dari API
  const Template = TEMPLATE_MAP[templateName]
  const theme = TEMPLATE_THEME[templateName]

  return (
    <div className="min-h-screen flex bg-neutral-200">
      {/* LEFT: Theme / Visual (desktop only) */}
      <div className={`hidden lg:flex flex-1 items-center justify-center `}>
        <div className={`bg-black/40 w-full h-full flex items-center justify-center ${theme.desktopBg}`}>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-white text-4xl tracking-wide font-cormorant font-semibold">The Wedding Of</h2>

            <h1 className="font-script text-4xl md:text-7xl text-white mb-3 leading-tight">
              {dummyInvitation.brideName} <span className="text-gold">&</span> {dummyInvitation.groomName}
            </h1>
            {/* Date */}
            <p className="font-serif text-2xl tracking-widest mb-10 text-white">{dummyInvitation.eventDate.split("-").reverse().join(" • ")}</p>
          </div>
        </div>
      </div>

      {/* RIGHT: Mobile Invitation */}
      <div className="w-full lg:w-[620px] flex justify-center bg-neutral-100">
        <div className={`w-full max-w-[1200px] bg-white shadow-xl ${theme.canvasBg}`}>
          <Template data={dummyInvitation} />
        </div>
      </div>
    </div>
  )
}
