import type { Invitation } from "../../../../types/Invitation"

export default function HeroCoverSection({ data }: { data: Invitation }) {
  return (
    <section className="h-screen snap-start relative">
      <img src="/modern/couple/couple-bg.jpeg" className="absolute inset-0 w-full h-full object-cover grayscale" />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="tracking-widest text-xs mb-4">WE INVITE YOU TO CELEBRATE</p>

        <h1 className="font-serif text-4xl md:text-5xl tracking-wide mb-4">
          {data.groomName} & {data.brideName}
        </h1>

        <p className="tracking-widest text-sm">{data.eventDateFormatted}</p>
      </div>
    </section>
  )
}
