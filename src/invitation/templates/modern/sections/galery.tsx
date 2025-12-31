import { motion } from "framer-motion"
import { stagger, fadeUp } from "../../../../motions/templateMotions"
import { galleryFade } from "../../../../motions/templateMotions"

interface GallerySectionProps {
  images: string[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-merlot-100">
      {/* HEADER */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} className="text-center mb-14">
        <p className="font-cormorant text-4xl font-semibold uppercase text-faded-merlot">Our</p>
        <p className="font-display text-3xl text-faded-merlot -mt-2">Gallery</p>
      </motion.div>

      {/* GRID */}
      <motion.div variants={stagger} initial="hidden" className="max-w-[920px] mx-auto grid grid-cols-2 gap-4">
        {/* FOTO 1 */}
        <motion.div variants={galleryFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="overflow-hidden rounded-xl">
          <img src={images[0]} className="w-full h-full object-cover" />
        </motion.div>

        {/* FOTO 2 */}
        <motion.div variants={galleryFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="overflow-hidden rounded-xl">
          <img src={images[1]} className="w-full h-full object-cover" />
        </motion.div>

        {/* FOTO 3 (WIDE) */}
        <motion.div variants={galleryFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="col-span-2 overflow-hidden rounded-xl">
          <img src={images[2]} className="w-full h-full object-cover" />
        </motion.div>

        {/* FOTO 4 */}
        <motion.div variants={galleryFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="overflow-hidden rounded-xl">
          <img src={images[3]} className="w-full h-full object-cover" />
        </motion.div>

        {/* FOTO 5 */}
        <motion.div variants={galleryFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="overflow-hidden rounded-xl">
          <img src={images[4]} className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </section>
  )
}
