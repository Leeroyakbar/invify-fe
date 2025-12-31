import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function BrideGroomSection({ data }: Props) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-14 text-center">
      <div className="mb-20 flex items-center justify-center gap-4">
        <span className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Heart SVG */}
        <svg width="18" height="16" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path
            d="M12 21s-7.5-4.7-10-8.9C-0.5 7.4 3.2 2 8 4.3
         9.6 5.1 11 7 12 8.5
         13 7 14.4 5.1 16 4.3
         20.8 2 24.5 7.4 22 12.1
         19.5 16.3 12 21 12 21z"
            stroke="#C8A97E"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
        <span className="h-px w-20 bg-[#C8A97E]/60" />
      </div>

      {/* Title */}
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.1 }} className="font-playfair text-3xl text-[#2F3E46]">
        Bride & Groom
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 }} className="mx-auto mt-4 max-w-md font-lora text-sm text-[#6B7280]">
        Dengan penuh rasa syukur dan kebahagiaan, kami mempersembahkan kedua mempelai yang akan memulai perjalanan suci pernikahan.
      </motion.p>

      {/* Content */}
      <div className="mt-20 flex flex-col items-center gap-10">
        {/* Bride */}
        <PersonBlock image={data.bridePhoto} fullName={data.brideFullName} bride={true} father={data.brideFather} mother={data.brideMother} delay={0.1} />

        {/* Divider */}
        <div className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Groom */}
        <PersonBlock image={data.groomPhoto} fullName={data.groomFullName} bride={false} father={data.groomFather} mother={data.groomMother} delay={0.3} />
      </div>
    </section>
  )
}

/* =========================
   Sub Component
   ========================= */

interface PersonProps {
  image: string
  fullName: string
  bride?: boolean
  father: string
  mother: string
  delay?: number
}

function PersonBlock({ image, fullName, bride, father, mother, delay = 0 }: PersonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay }} viewport={{ once: false }} className="flex flex-col items-center">
      {/* Photo */}
      <div className="h-64 w-40 md:h-80 md:w-52 lg:h-100 lg:w-65 overflow-hidden rounded-[120px] shadow-sm border-2 border-[#4F7C8A] mb-6 mx-auto">
        <img src={image} alt={fullName} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>

      {/* Name */}
      <h3 className="font-playfair text-2xl text-[#2F3E46]">{fullName}</h3>

      {/* Parents */}
      <p className="mt-2 max-w-xs font-lora text-sm text-[#6B7280]">
        {bride ? "Putri" : "Putra"}
        <br />
        <span className="font-medium text-[#2F3E46]">Bapak {father}</span>
        <br />
        &amp;
        <br />
        <span className="font-medium text-ms text-[#2F3E46]">Ibu {mother}</span>
      </p>
    </motion.div>
  )
}
