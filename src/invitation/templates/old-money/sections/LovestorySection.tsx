import { motion } from "framer-motion"
import type { Invitation } from "../../../../types/Invitation"

export default function LoveStorySection({ data }: { data: Invitation }) {
  const loveStory = [
    { title: "THE FIRST MEET", year: "2016", content: data.storyMeet },
    { title: "GROWING TOGETHER", year: "2019", content: data.storyCommitment },
    { title: "THE PROMISE", year: "2027", content: data.storyMarriage },
  ]

  return (
    <section className="h-screen snap-start bg-[#F9F8F4] relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <h2 className="text-[15rem] md:text-[25rem] font-serif italic uppercase leading-none">
          {data.brideName[0]}
          {data.groomName[0]}
        </h2>
      </div>

      <div className="max-w-3xl w-full z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[9px] tracking-[0.6em] uppercase text-stone-400 block mb-2">
            The Heritage of
          </motion.span>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-serif text-3xl md:text-5xl text-stone-800 italic">
            Our Love Story
          </motion.h2>
        </div>

        <div className="relative">
          {/* Garis Vertikal - Di Mobile kita geser ke kiri agar tidak menabrak teks tengah */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[0.5px] bg-stone-200" />

          <div className="space-y-10 md:space-y-12">
            {loveStory?.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-start md:items-center relative ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Bulatan Angka - Di Mobile tetap di kiri mengikuti garis */}
                <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#F9F8F4] border border-stone-200 rounded-full z-20 flex items-center justify-center">
                  <span className="text-[8px] font-serif text-stone-400 italic">0{index + 1}</span>
                </div>

                {/* Konten Cerita - Di Mobile teks rata kiri (pl-12) agar tidak kena garis */}
                <div className={`w-full md:w-1/2 pl-12 md:px-10 text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <h4 className="font-serif text-lg text-stone-700 italic leading-none">{story.year}</h4>
                  <h5 className="text-[9px] tracking-[0.3em] uppercase text-stone-800 my-2 font-medium">{story.title}</h5>
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-stone-500 font-light italic">"{story.content}"</p>
                </div>

                {/* Spacer Desktop */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Monogram */}
        <div className="mt-12 md:mt-20 flex flex-col items-center">
          <div className="w-10 h-[1px] bg-stone-200 mb-4" />
          <div className="text-lg font-serif text-stone-300 italic tracking-widest uppercase">
            {data.brideName[0]} <span className="text-xs not-italic">&</span> {data.groomName[0]}
          </div>
        </div>
      </div>
    </section>
  )
}
