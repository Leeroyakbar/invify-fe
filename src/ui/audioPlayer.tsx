/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import ReactPlayer from "react-player"
import { useRef, useEffect } from "react"

interface AudioTheme {
  variant: "modern" | "noir"
  position: "bottom-right" | "bottom-center" | "relative"
  bg: string
  border: string
  iconColor: string
}

interface AudioPlayerProps {
  src: string
  isPlaying: boolean
  onToggle: () => void
  theme: AudioTheme
  startTime?: number
}

export default function AudioPlayer({ src, isPlaying, onToggle, theme, startTime }: AudioPlayerProps) {
  // Gunakan tipe ReactPlayer agar TypeScript mengenali method .seekTo()
  const playerRef = useRef<any>(null)
  const internalPlayerRef = useRef<any>(null)
  const positionClass = theme.position === "bottom-center" ? "bottom-6 left-1/2 -translate-x-1/2" : theme.position === "bottom-right" ? "bottom-6 right-6" : theme.position
  useEffect(() => {
    if (isPlaying && internalPlayerRef.current) {
      internalPlayerRef.current.seekTo(startTime || 0)
    }
  }, [isPlaying, startTime])
  return (
    <>
      {/* AUDIO ENGINE */}
      <div className="fixed w-1 h-1 opacity-0 pointer-events-none">
        <ReactPlayer
          ref={playerRef}
          src={src}
          playing={isPlaying}
          muted={!isPlaying}
          loop
          volume={1}
          onReady={() => {
            if (playerRef.current) {
              internalPlayerRef.current = playerRef.current.getInternalPlayer()
            }
          }}
        />
      </div>

      {/* CONTROL */}
      <motion.button
        onClick={onToggle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isPlaying ? 1 : 0.6, scale: 1 }}
        whileTap={{ scale: 0.92 }}
        className={`
          fixed z-[999]
          ${positionClass}
          w-12 h-12 rounded-full
          ${theme.bg}
          ${theme.border}
          border
          backdrop-blur-md
          flex items-center justify-center
        `}
      >
        {isPlaying ? <Pause size={16} className={theme.iconColor} /> : <Play size={16} className={theme.iconColor} />}
      </motion.button>
    </>
  )
}
