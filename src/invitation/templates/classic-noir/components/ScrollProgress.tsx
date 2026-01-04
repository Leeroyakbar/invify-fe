import { useEffect, useState } from "react"

interface ScrollProgressProps {
  containerId: string
}

export default function ScrollProgress({ containerId }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const maxScroll = container.scrollHeight - container.clientHeight

      if (maxScroll <= 0) {
        setProgress(0)
        return
      }

      setProgress(scrollTop / maxScroll)
    }

    // delay kecil supaya DOM & konten siap
    requestAnimationFrame(handleScroll)

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [containerId])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
      {/* TRACK */}
      <div className="w-px h-40 bg-white/20 relative">
        {/* PROGRESS */}
        <div className="absolute bottom-0 w-px bg-white transition-all duration-200" style={{ height: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
