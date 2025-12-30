import { motion } from "framer-motion"
import type { Invitation } from "../../../types/Invitation"
import { useState } from "react"

interface Props {
  data: Invitation
}

export default function WeddingWishesSection({ data }: Props) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "">("")

  return (
    <section className="bg-[#F8F6F2] px-6 py-32">
      {/* Title */}
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center font-playfair text-3xl text-[#2F3E46]">
        Wedding Wishes
      </motion.h2>

      {/* Card */}
      <div className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-8 shadow-md">
        {/* Form */}
        <div className="space-y-4">
          <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#C8A97E] focus:outline-none" />

          <textarea placeholder="Ucapan & doa" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#C8A97E] focus:outline-none" />

          <select value={attendance} onChange={(e) => setAttendance(e.target.value as "hadir" | "tidak_hadir" | "")} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#C8A97E] focus:outline-none">
            <option value="">Konfirmasi Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
          </select>

          <button className="w-full rounded-full bg-[#4F7C8A] py-2 text-sm text-white transition hover:bg-[#3d616d]">Kirim Ucapan</button>
        </div>
      </div>

      {/* Wishes List */}
      <div className="mx-auto mt-16 max-w-xl">
        {/* Pembungkus Utama dengan Tinggi Terbatas (setara ~2.5 kartu) */}
        <div className="relative rounded-xl border border-gray-100 bg-white/30 p-2">
          <div
            className="max-h-[320px] overflow-y-auto pr-2 space-y-4 scroll-smooth
      /* Styling Scrollbar minimalis agar tidak merusak view */
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {data.guests.map((guest) => (
              <div key={guest.id} className="rounded-xl bg-white p-4 shadow-sm border border-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#2F3E46] text-sm">{guest.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${guest.isAttending ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{guest.isAttending ? "Hadir" : "Tidak Hadir"}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">{guest.message || "Barakallah semoga menjadi keluarga sakinah mawaddah warohmah 🤍"}</p>
                <p className="mt-2 text-[9px] text-gray-400">1 hari lalu</p>
              </div>
            ))}
          </div>

          {/* Efek Fade di bawah agar user tahu itu bisa di-scroll */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full rounded-b-xl bg-gradient-to-t from-white/80 to-transparent" />
        </div>
      </div>
    </section>
  )
}
