import { motion } from "framer-motion"
import { stagger, fadeUp, floatY, floatScaleRotate } from "../../motions/templateMotions"
import type { Invitation } from "../../types/Invitation"
import flowerTop2 from "../../../public/modern/ornaments/flower-2.png"
import flower3 from "../../../public/modern/ornaments/flower-3.png"
// import diamondIcon from "../../../public/modern/icons/diamond.png"

export default function LoveStory({ data }: { data: Invitation }) {
  return (
    <section className="relative min-h-svh flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/modern/couple/love-story.jpg')] bg-cover bg-center bg-scroll" />
      <div className="absolute inset-0 bg-black/25" />

      <motion.img
        src={flowerTop2}
        alt=""
        className="absolute bottom-0 right-0 w-56 max-[390px]:w-42 max-[390px]:translate-x-1 max-[390px]:translate-y-1 md:w-82 translate-x-2 translate-y-3 z-11 pointer-events-none"
        variants={floatY}
        animate="animate"
      />

      {/* OVERLAY CARD */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="
          relative z-10
          w-full max-w-[520px]
          min-h-[90svh]
          bg-white/85
          rounded-[180px]
          px-10 py-16
          text-center
        "
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="mb-12">
          <p className="font-display text-3xl text-faded-merlot mb-2">The Beginning of Us</p>
          <p className="font-serif text-xs tracking-widest uppercase text-faded-merlot/80">Our Love Story</p>
        </motion.div>

        {/* STORY LIST */}
        <motion.div variants={stagger} className="space-y-12">
          {/* STORY 1 */}
          <motion.div variants={fadeUp} className={`space-y-3 ${data.storyMeet ? "" : "hidden"}`}>
            <h3 className="font-alice text-2xl text-faded-merlot">The First Encounter</h3>
            <p className="text-xs font-serif leading-relaxed text-faded-merlot/90">{data.storyMeet}</p>
          </motion.div>

          {/* STORY 2 */}
          <motion.div variants={fadeUp} className={`space-y-3 ${data.storyCommitment ? "" : "hidden"}`}>
            <h3 className="font-alice text-2xl text-faded-merlot">A Promise Made</h3>
            <p className="text-xs font-serif leading-relaxed text-faded-merlot/90">{data.storyCommitment}</p>
          </motion.div>

          {/* STORY 3 */}
          <motion.div variants={fadeUp} className={`space-y-3 ${data.storyMarriage ? "" : "hidden"}`}>
            <h3 className="font-alice text-2xl text-faded-merlot">Forever Begins</h3>
            <p className="text-xs font-serif leading-relaxed text-faded-merlot/90">{data.storyMarriage}</p>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-16 flex justify-center">
          <motion.img src={flower3} alt="" className="w-44 max-[390px]:w-32 pointer-events-none z-10" variants={floatScaleRotate} animate="animate" />
        </motion.div>
      </motion.div>
    </section>
  )
}
