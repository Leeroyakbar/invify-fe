import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import ReactPlayer from "react-player"

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <>
      {/* AUDIO PLAYER (HARUS TER-RENDER) */}
      <div
        className="
          fixed
          bottom-0 right-0
          w-1 h-1
          opacity-0
          pointer-events-none
          overflow-hidden
        "
      >
        <ReactPlayer src={src} playing={isPlaying} loop volume={0.5} width={0} height={0} />
      </div>

      {/* STICKY CONTROL BUTTON */}
      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className="
          fixed
          bottom-6 right-6
          z-[999]
          w-12 h-12
          rounded-full
          bg-white/90
          backdrop-blur
          shadow-lg
          flex items-center justify-center
          text-faded-merlot
        "
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </motion.button>
    </>
  )
}
