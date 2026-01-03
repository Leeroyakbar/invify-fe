import type { Invitation } from "../../../../types/Invitation"

export default function AnnouncementVideoSection({ data }: { data: Invitation }) {
  const eventDate = new Date(data.eventDate)

  // Menambahkan nama hari
  const eventDayName = eventDate.toLocaleString("id-ID", { weekday: "long" })
  const eventDay = eventDate.getDate()
  const eventMonth = eventDate.toLocaleString("id-ID", { month: "long" })
  const eventYear = eventDate.getFullYear()

  // Gunakan koma setelah nama hari
  const eventDateFormatted = `${eventDayName}, ${eventDay} ${eventMonth} ${eventYear}`
  return (
    <section className="h-screen snap-start relative overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/classic-noir/video-1.mp4" />

      {/* Overlay Atas (Gradient dari hitam ke transparan) */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* Overlay Bawah (Gradient dari transparan ke hitam) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center text-center px-6 text-white justify-between">
        {/* 1. Spacer Atas (mengatur seberapa jauh teks dari atas) */}
        <div className="h-[-100vh]" />

        {/* 2. Konten Utama */}
        <div>
          <h2 className="font-display text-xl mb-2">The Wedding of</h2>
          <h1 className="font-serif uppercase text-2xl mb-2">
            {data?.brideName} & {data?.groomName}
          </h1>
          <p className="tracking-widest text-sm font-serif">{eventDateFormatted}</p>
        </div>

        {/* 3. Spacer Bawah (lebih besar agar teks naik sedikit dari tengah) */}
        <div className="h-[60vh]" />
      </div>
    </section>
  )
}
