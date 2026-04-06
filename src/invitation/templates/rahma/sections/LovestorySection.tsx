import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { type Invitation } from "../../../../types/Invitation"

export default function StorySection({ data }: { data: Invitation }) {
  const containerRef = useRef(null)

  // Setup Scroll Progress untuk animasi garis timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const stories = [
    {
      title: "The First Meet",
      date: "2023",
      content: data.storyMeet,
      image: "/rahma/gallery-6.webp",
      align: "left",
    },
    {
      title: "The Commitment",
      date: "2025",
      content: data.storyCommitment,
      image: "/rahma/gallery-4.webp",
      align: "right",
    },
    {
      title: "The Journey Begins",
      date: "2027",
      content: data.storyMarriage,
      image: "/rahma/gallery-15.webp",
      align: "left",
    },
  ]

  return (
    <section ref={containerRef} id="story" className="relative py-40 bg-black/60 backdrop-blur-md min-h-screen border-t border-white/10 overflow-hidden">
      {/* 1. SECTION HEADER */}
      <div className="px-10 mb-32 text-center relative">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.05 }} className="absolute inset-0 flex items-center justify-center font-cinzel text-[100px] font-bold tracking-widest select-none">
          STORY
        </motion.span>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
          <span className="font-montserrat text-[9px] uppercase tracking-[0.8em] text-white/30 block mb-6">Our Journey</span>
          <h2 className="font-cinzel text-3xl text-white tracking-[0.2em] uppercase">Moments of Us</h2>
        </motion.div>
      </div>

      {/* 2. TIMELINE CONTENT */}
      <div className="relative max-w-5xl mx-auto px-8">
        {/* Vertical Progress Line */}
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-transparent origin-top hidden md:block" />

        <div className="space-y-20 md:space-y-24">
          {stories.map((story, idx) => (
            <div key={idx} className={`relative flex flex-col ${story.align === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24`}>
              {/* Timeline Dot (Mobile Hidden) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-3 h-3 rounded-full bg-black border border-white/40 z-20" />
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
              </div>

              {/* IMAGE PART */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: story.align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 group shadow-2xl"
              >
                <img src={story.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={story.title} />
              </motion.div>

              {/* TEXT PART */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`w-full md:w-1/2 space-y-6 ${story.align === "left" ? "text-left" : "text-left md:text-right"}`}
              >
                <span className="font-montserrat text-[10px] text-white/30 tracking-[0.4em] uppercase">{story.date}</span>
                <h3 className="font-cinzel text-2xl text-white tracking-[0.1em] uppercase">{story.title}</h3>
                <div className={`w-12 h-[1px] bg-white/20 ${story.align === "left" ? "mr-auto" : "mr-auto md:ml-auto md:mr-0"}`} />
                <p className="font-montserrat text-[12px] text-white/50 leading-relaxed tracking-wider">{story.content}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Text Bottom */}
      <div className="mt-40 text-center">
        <p className="font-reenie-beanie text-4xl text-white/10 italic">To be continued...</p>
      </div>
    </section>
  )
}
