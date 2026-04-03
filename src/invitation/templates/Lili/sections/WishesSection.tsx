import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface Wish {
  id: number
  name: string
  status: string
  message: string
  date: string
}

export default function WishesSection() {
  const wishes: Wish[] = [
    {
      id: 1,
      name: "Lili Rahma Yani",
      status: "Hadir",
      message: "Selamat menempuh hidup baru Lili & Lee! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Lancar sampai hari H ya!",
      date: "2 menit yang lalu",
    },
    {
      id: 2,
      name: "Lee Roy Akbar",
      status: "Hadir",
      message: "Happy wedding! Sangat ikut bahagia melihat perjalanan kalian berdua sampai ke titik ini.",
      date: "1 jam yang lalu",
    },
    {
      id: 3,
      name: "LiliRoy",
      status: "Hadir",
      message: "Selamat menempuh hidup baru kawan. Semoga selalu diberikan kebahagiaan dan momongan yang saleh/salehah.",
      date: "1 jam yang lalu",
    },
    {
      id: 4,
      name: "RahmaRoy",
      status: "Tidak Hadir",
      message: "Mohon maaf belum bisa hadir karena ada tugas di luar kota, tapi doa terbaik untuk kalian berdua!",
      date: "3 jam yang lalu",
    },
  ]

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden flex flex-col items-center">
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="font-cormorant-upright text-[12rem] text-white italic whitespace-nowrap leading-none">Wishes</h2>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <div className="space-y-2">
            <h2 className="font-cormorant-upright text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase font-light">Wedding Wishes</h2>
          </div>

          {/* CAPTION BARU ANDA */}
          <p className="font-inter text-white/60 text-xs lg:text-sm leading-relaxed italic max-w-md mx-auto px-4">
            "Dari ucapan selamat hingga pesan-pesan kecil yang penuh tawa—setiap kata dari Anda adalah catatan istimewa yang akan selalu kami simpan di hati."
          </p>

          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-6" />
        </motion.div>

        {/* WISHES LIST CONTAINER */}
        <div
          className="space-y-6 max-h-[600px] overflow-y-auto pr-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
          }}
        >
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors group"
            >
              <Quote className="absolute top-4 right-6 text-white/[0.03] group-hover:text-white/[0.06] transition-colors" size={40} />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-white font-inter text-sm font-semibold tracking-wide uppercase">{wish.name}</h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full border ${
                          wish.status === "Hadir" ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-white/10 text-white/30 bg-white/5"
                        } font-inter uppercase tracking-tighter`}
                      >
                        {wish.status}
                      </span>
                      <span className="text-white/20 text-[9px] font-inter italic">{wish.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/60 font-inter text-xs leading-relaxed italic pr-4">"{wish.message}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER COUNTER */}
        <div className="mt-12 text-center">
          <p className="font-inter text-[9px] text-white/20 tracking-[0.5em] uppercase font-bold">Showing {wishes.length} Warm Messages</p>
        </div>
      </div>

      {/* CARA BARU MENAMBAHKAN GLOBAL CSS TANPA ERROR JSX */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `,
        }}
      />
    </section>
  )
}
