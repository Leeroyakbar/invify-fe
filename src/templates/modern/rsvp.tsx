import { motion } from "framer-motion"
import { fadeUp, scaleFade, fadeSoft } from "../../motions/templateMotions"
import Button from "../../ui/button"
import { BadgeCheck } from "lucide-react"
import type { Invitation } from "../../types/Invitation"

export default function RSVPSection({ data }: { data: Invitation }) {
  return (
    <section className="relative py-24 px-4 bg-merlot-rsvp">
      {/* HEADER */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} className="text-center mb-12 max-w-[520px] mx-auto">
        <p className="font-cormorant text-4xl font-semibold uppercase text-faded-merlot">RSVP & WISHES</p>
        <p className="font-display text-3xl text-faded-merlot -mt-2 mb-4">Ucapan & Doa</p>

        <p className="text-sm leading-relaxed text-merlot-700/90 font-lora px-4">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa dan restu kepada kedua mempelai. Atas kehadiran dan doa yang tulus, kami ucapkan terima kasih.
        </p>
      </motion.div>

      {/* CARD */}
      <motion.div variants={scaleFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative mx-auto max-w-105 bg-white/70 border border-merlot-300/30 rounded-4xl p-6 shadow-lg">
        {/* FORM */}
        <div className="space-y-3 mb-6">
          <input placeholder="Nama" className="w-full font-lora rounded-xl border px-4 py-2 text-sm outline-none" />

          <textarea placeholder="Ucapan" rows={3} className="w-full font-lora rounded-xl border px-4 py-2 text-sm outline-none resize-none" />

          <select className="w-full rounded-xl border px-4 py-2 font-lora text-sm outline-none">
            <option>Konfirmasi Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak Hadir</option>
          </select>

          <Button className="mt-2 font-lora">Kirim</Button>
        </div>

        {/* UCAPAN LIST */}
        <div
          className="
            max-h-65
            overflow-y-auto
            space-y-4
            pr-1
          "
        >
          {data.guests.map((item) => (
            <motion.div key={item.id} variants={fadeSoft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold font-lora text-sm relative inline-block">
                {item.name}
                <BadgeCheck className="absolute -top-1 -right-4 w-4 h-4 " color={item.isAttending ? "#65b187" : "#fb2c36"} />
              </p>
              <p className="text-xs text-gray-600 font-lora mt-1">Barakallah semoga menjadi keluarga sakinah mawaddah warohmah</p>
              <p className="text-[10px] text-gray-400 mt-2 font-lora">1 hari lalu</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
