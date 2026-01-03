import { useState } from "react"
import { TEMPLATE_MAP } from "../engine/TemplateRegistry"
import { TEMPLATE_THEME } from "../engine/TemplateTheme"
import AudioPlayer from "../../ui/audioPlayer"
import type { Invitation } from "../../types/Invitation"

interface InvitationPageProps {
  data: Invitation
  mode?: "demo" | "live"
}

export default function InvitationPage({ data }: InvitationPageProps) {
  const templateKey = data.template
  const Template = TEMPLATE_MAP[templateKey]
  const theme = TEMPLATE_THEME[templateKey]

  const [isOpened, setIsOpened] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleOpenInvitation = () => {
    setIsOpened(true)
    setIsAudioPlaying(true)
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-200">
      <AudioPlayer src={data.audioUrl} color={theme.audioColor} isPlaying={isAudioPlaying} onToggle={() => setIsAudioPlaying((prev) => !prev)} />

      {/* DESKTOP LEFT */}
      <div className={`hidden lg:flex fixed left-0 top-0 h-screen w-[calc(100%-520px)] ${theme.desktopBg}`}>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-12">
          <h2 className="text-white text-3xl font-cormorant mb-4">The Wedding Of</h2>

          <h1 className="font-script text-6xl text-white mb-4">
            {data.brideName}
            <span className="text-gold mx-2">&</span>
            {data.groomName}
          </h1>

          <p className="font-serif text-xl tracking-widest text-white">{data.eventDateFormatted}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="ml-0 lg:ml-[calc(100%-520px)] h-screen flex justify-center">
        <div className="w-full max-w-[1200px] h-screen overflow-y-auto bg-white shadow-xl">
          <Template data={data} isOpened={isOpened} onOpen={handleOpenInvitation} />
        </div>
      </div>
    </div>
  )
}
