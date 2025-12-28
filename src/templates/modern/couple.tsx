import { motion } from "framer-motion"
import type { Invitation } from "../../types/Invitation"
import nameCard from "@/assets/name-card.png"
import { stagger, fadeUp, scaleFade } from "../../motions/templateMotions"

export default function Couple({ data }: { data: Invitation }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />
      {/* OVERLAY = CONTAINER */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="
          relative z-10
          w-full max-w-[520px]
          min-h-[90svh]
          bg-white/75 backdrop-blur-none
          rounded-[180px]
          px-14 py-12 my-12
          flex flex-col items-center text-center
        "
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="mb-10 flex flex-col items-center text-center">
          <img src={nameCard} alt="" className="w-52 mb-4" />
          <p className="font-script text-3xl md:text-5xl text-faded-merlot mb-2">Bride & Groom</p>
          <p className="font-lora italic text-xs md:text-sm tracking-widest text-faded-merlot">Assalamualaikum Warahmatullahi Wabarakatuh</p>
        </motion.div>

        {/* GROOM */}
        <motion.div variants={scaleFade} className="mb-12">
          <img src={data.groomPhoto} alt="Groom" className="w-full rounded-[140px] border-4 border-merlot-300 mb-4" />
          <p className="font-script text-5xl text-gold mb-2 text-faded-merlot">{data.groomFullName}</p>
          <p className="text-sm font-serif italic text-faded-merlot leading-relaxed">
            Putra dari <br /> Bapak {data.groomFather}
            <br />&
            <br />
            Ibu {data.groomMother}
          </p>
        </motion.div>

        {/* AMPERSAND */}
        <motion.div variants={fadeUp} className="text-4xl text-merlot-500 mb-12 font-lora text-faded-merlot">
          &
        </motion.div>

        {/* BRIDE */}
        <motion.div variants={scaleFade}>
          <img src={data.bridePhoto} alt="Bride" className="w-full rounded-[140px] border-4 border-merlot-300 mb-4" />
          <p className="font-script text-5xl text-gold mb-2 text-faded-merlot">{data.brideFullName}</p>
          <p className="text-sm font-serif italic text-faded-merlot leading-relaxed">
            Putri dari
            <br /> Bapak {data.brideFather}
            <br />&
            <br />
            Ibu {data.brideMother}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
