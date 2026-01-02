import couplePhoto from "../../../../../public/modern/couple/couple-bg.jpeg"

export default function AnnouncementSection() {
  return (
    <section className="relative min-h-svh flex items-center justify-center bg-[#F7F3EE] px-6">
      <div className="w-full max-w-sm text-center">
        {/* TEXT */}
        <p className="tracking-widest text-xs text-[#8FA99B]">THE WEDDING OF</p>

        <h1 className="mt-3 font-serif text-3xl text-[#3B2F2F] leading-tight">
          Lili Rahma <br /> & Lee Roy
        </h1>

        <p className="mt-2 text-sm text-[#6B5E55]">Sabtu, 27 Februari 2027</p>

        {/* PHOTO FRAME */}
        <div className="relative mt-10 flex justify-center">
          {/* OUTER BORDER */}
          <div className="rounded-[140px] p-[3px] border border-[#C8A96A]/50">
            {/* INNER IMAGE */}
            <div className="overflow-hidden rounded-[130px]">
              <img src={couplePhoto} alt="Couple" className="h-[420px] w-[280px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
