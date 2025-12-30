import { motion } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"

interface Props {
  data: Invitation
}

export default function BrideGroomSection({ data }: Props) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-24 text-center">
      {/* Title */}
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-playfair text-3xl text-[#2F3E46]">
        Bride & Groom
      </motion.h2>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-md font-inter text-sm text-[#6B7280]">
        Dengan penuh rasa syukur dan kebahagiaan, kami mempersembahkan kedua mempelai yang akan memulai perjalanan suci pernikahan.
      </motion.p>

      {/* Content */}
      <div className="mt-20 flex flex-col items-center gap-10">
        {/* Bride */}
        <PersonBlock image={data.bridePhoto} fullName={data.brideFullName} father={data.brideFather} mother={data.brideMother} delay={0.1} />

        {/* Divider */}
        <div className="h-px w-20 bg-[#C8A97E]/60" />

        {/* Groom */}
        <PersonBlock image={data.groomPhoto} fullName={data.groomFullName} father={data.groomFather} mother={data.groomMother} delay={0.2} />
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
  father: string
  mother: string
  delay?: number
}

function PersonBlock({ image, fullName, father, mother, delay = 0 }: PersonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay }} viewport={{ once: true }} className="flex flex-col items-center">
      {/* Photo */}
      <div className="h-64 w-40 md:h-80 md:w-52 lg:h-100 lg:w-65 overflow-hidden rounded-[120px] shadow-sm border-2 border-[#4F7C8A] mb-6 mx-auto">
        <img src={image} alt={fullName} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>

      {/* Name */}
      <h3 className="font-playfair text-2xl text-[#2F3E46]">{fullName}</h3>

      {/* Parents */}
      <p className="mt-2 max-w-xs font-inter text-sm text-[#6B7280]">
        Putra / Putri dari
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
