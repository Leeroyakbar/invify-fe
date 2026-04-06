import { motion, useScroll, useSpring } from "framer-motion"
import { useRef } from "react"
import { type Invitation } from "../../../../types/Invitation"

export default function StorySection({ data }: { data: Invitation }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Membuat pergerakan garis lebih halus
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const stories = [
    {
      title: "The First Meet",
      content: data.storyMeet,
      image: "/rahma/gallery-6.webp",
      align: "left",
    },
    {
      title: "The Commitment",
      content: data.storyCommitment,
      image: "/rahma/gallery-4.webp",
      align: "right",
    },
    {
      title: "The Journey Begins",
      content: data.storyMarriage,
      image: "/rahma/gallery-15.webp",
      align: "left",
    },
  ]

  return (
    <section ref={containerRef} id="story" className="relative py-30  bg-[#0f0f0f] overflow-hidden">
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-white/2 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-white/1 rounded-full blur-[100px]" />
      </div>

      {/* 2. SECTION HEADER */}
      <div className="px-10 mb-30 text-center relative">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 space-y-4">
          <span className="font-montserrat text-[10px] uppercase tracking-[1em] text-white/20 block">Timeline</span>
          <span className="font-cinzel text-3xl text-white tracking-[0.2em] uppercase block">Our Love Story</span>
          <span className="w-12 h-px bg-white/10 mx-auto block mt-10" />
        </motion.h2>
      </div>

      {/* 3. TIMELINE CONTENT */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Progress Line */}
        <motion.div style={{ scaleY }} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top hidden md:block" />

        <div className="space-y-20 md:space-y-25">
          {stories.map((story, idx) => (
            <StoryItem key={idx} story={story} />
          ))}
        </div>
      </div>

      {/* Decorative Text Bottom */}
      <div className="mt-30 text-center relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}>
          <p className="font-reenie-beanie text-5xl text-white/20 italic tracking-widest">And so the adventure continues...</p>
        </motion.div>
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StoryItem({ story }: { story: any }) {
  const isLeft = story.align === "left"

  return (
    <div className={`relative flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-16 md:gap-20`}>
      {/* BACKGROUND YEAR TEXT (Floating Effect) */}
      <motion.span
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        whileInView={{ opacity: 0.03, x: isLeft ? -50 : 50 }}
        transition={{ duration: 1.5 }}
        className={`absolute hidden md:block font-cinzel text-[180px] font-bold text-white select-none -z-10 ${isLeft ? "left-0" : "right-0"}`}
      ></motion.span>

      {/* TIMELINE DOT */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block z-20">
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>

      {/* IMAGE COMPONENT */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }} className="w-full md:w-[45%] group">
        <div className="relative aspect-4/5 overflow-hidden rounded-sm shadow-2xl border border-white/5">
          <img src={story.image} className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out" alt={story.title} />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>
      </motion.div>

      {/* CONTENT COMPONENT */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className={`w-full md:w-[45%] space-y-6 ${isLeft ? "text-left" : "text-left md:text-right"}`}
      >
        <div className="space-y-2">
          <h3 className="font-cinzel text-3xl text-white tracking-widest uppercase">{story.title}</h3>
        </div>

        <p className="font-montserrat text-[13px] text-white/50 leading-relaxed tracking-wider max-w-md ml-0 md:ml-auto md:mr-0">{story.content}</p>

        <div className={`w-16 h-px bg-linear-to-r from-white/20 to-transparent ${isLeft ? "" : "md:ml-auto"}`} />
      </motion.div>
    </div>
  )
}
