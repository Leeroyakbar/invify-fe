import { motion } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"
import { formatTime } from "../../../utils/dateUtil"

interface Props {
  data: Invitation
}

export default function WeddingEventSection({ data }: Props) {
  const akadDate = new Date(data.eventDate)
  const year = akadDate.getFullYear()
  const month = akadDate.toLocaleDateString("id-ID", { month: "long" })
  const dayName = akadDate.toLocaleDateString("id-ID", { weekday: "long" })
  const date = akadDate.toLocaleDateString("id-ID", { day: "numeric" })
  const eventDateFormatted = `${dayName}, ${date} ${month} ${year}`

  const akadTimeStart = formatTime(data.akadTimeStart)
  const akadTimeEnd = formatTime(data.akadTimeEnd)

  return (
    <section className="relative h-[170vh] overflow-hidden">
      {/* FIXED BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed lg:bg-scroll"
        style={{
          backgroundImage: "url('/modern/couple/love-story.jpg')",
        }}
      />

      {/* IVORY OVERLAY */}
      <div className="absolute inset-0 bg-[#F8F6F2]/80" />

      {/* SCROLLING CONTENT */}
      <div className="relative z-10 mx-auto max-w-xl px-6 pt-32">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center font-playfair text-3xl text-[#2F3E46]">
          Wedding Event
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-md text-center font-inter text-sm text-[#6B7280]">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </motion.p>

        <div className="mt-24 flex flex-col gap-16">
          <EventCard title="Akad Nikah" date={eventDateFormatted} time={`${akadTimeStart} - ${akadTimeEnd}`} venue={data.akadVanue} location={data.akadLocation} mapsUrl={data.akadMapsUrl} delay={0.1} />

          <EventCard
            title="Resepsi"
            date={data.receptionDate}
            time={`${formatTime(data.receptionTimeStart)} - ${formatTime(data.receptionTimeEnd)}`}
            venue={data.receptionVanue}
            location={data.receptionLocation}
            mapsUrl={data.receptionMapsUrl}
            delay={0.2}
          />

          {data.ngunduhMantuDate && (
            <EventCard
              title="Ngunduh Mantu"
              date={data.ngunduhMantuDate}
              time={`${formatTime(data.ngunduhMantuTimeStart)} - ${formatTime(data.ngunduhMantuTimeEnd)}`}
              venue={data.ngunduhMantuVanue}
              location={data.ngunduhMantuLocation}
              mapsUrl={data.ngunduhMantuMapsUrl}
              delay={0.3}
            />
          )}
        </div>
      </div>
    </section>
  )
}

interface EventCardProps {
  title: string
  date: string
  time: string
  venue: string
  location: string
  mapsUrl: string
  delay?: number
}

function EventCard({ title, date, time, venue, location, mapsUrl, delay = 0 }: EventCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay }} viewport={{ once: true }} className="rounded-2xl bg-white px-6 py-8 text-center shadow-lg">
      <h3 className="font-playfair text-2xl text-[#2F3E46]">{title}</h3>

      <div className="mx-auto my-4 h-px w-16 bg-[#C8A97E]/60" />

      <div className="space-y-4 font-inter text-sm text-[#6B7280]">
        <div className="flex justify-center items-center gap-2">
          <span>{date}</span>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span>{time}</span>
        </div>

        <div className="flex justify-center gap-2 text-center">
          <span>
            <strong className="block font-medium text-[#2F3E46]">{venue}</strong>
            {location}
          </span>
        </div>
      </div>

      <a href={mapsUrl} target="_blank" className="mt-6 inline-block rounded-full border border-[#C8A97E] px-6 py-2 font-inter text-sm text-[#2F3E46] transition hover:bg-[#C8A97E]/10">
        Lihat Lokasi
      </a>
    </motion.div>
  )
}
