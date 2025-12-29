import { motion } from "framer-motion"
import type { Invitation } from "../../types/Invitation"
import { stagger, fadeUp, fadeLeft, fadeRight, floatY, floatScaleRotate } from "../../motions/templateMotions"
import flower2 from "../../../public/modern/ornaments/flower-2.png"
import scheduleIcon from "../../../public/modern/icons/schedule.png"
import mapIcon from "../../../public/modern/icons/map.png"
import roseImg from "../../../public/modern/rose.png"
import Button from "../../ui/button"

export default function WeddingEvent({ data }: { data: Invitation }) {
  const hasReception = !!data.receptionDate
  const hasNgunduhMantu = !!data.ngunduhMantuDate

  // 1. setting tanggal akad
  const eventDate = new Date(data.eventDate)
  const eventDay = eventDate.getDate()
  const eventMonth = eventDate.toLocaleString("id-ID", { month: "long" })
  const eventYear = eventDate.getFullYear()
  const eventDateFormatted = `${eventDay} ${eventMonth} ${eventYear}`

  const formatTime = (timeString: string) => {
    if (!timeString) return ""

    // Jika formatnya ISO atau ada spasi (2027-02-28 08:00 atau 2027-02-28T08:00)
    if (timeString.includes("T") || timeString.includes(" ")) {
      return timeString.split(/[T ]/)[1].substring(0, 5)
    }
    return timeString.substring(0, 5)
  }
  const akadTimeStart = formatTime(data.akadTimeStart)
  const akadTimeEnd = formatTime(data.akadTimeEnd)

  // 2. setting tanggal resepsi
  const receptionDate = new Date(data.receptionDate)
  const receptionDay = receptionDate.getDate()
  const receptionMonth = receptionDate.toLocaleString("id-ID", { month: "long" })
  const receptionYear = receptionDate.getFullYear()
  const receptionDateFormatted = `${receptionDay} ${receptionMonth} ${receptionYear}`

  const receptionTimeStart = formatTime(data.receptionTimeStart)
  const receptionTimeEnd = formatTime(data.receptionTimeEnd)

  // 3. setting tanggal ngunduh mantu
  const ngunduhMantuDate = new Date(data.ngunduhMantuDate)
  const ngunduhMantuDay = ngunduhMantuDate.getDate()
  const ngunduhMantuMonth = ngunduhMantuDate.toLocaleString("id-ID", { month: "long" })
  const ngunduhMantuYear = ngunduhMantuDate.getFullYear()
  const ngunduhMantuDateFormatted = `${ngunduhMantuDay} ${ngunduhMantuMonth} ${ngunduhMantuYear}`

  const ngunduhMantuTimeStart = formatTime(data.ngunduhMantuTimeStart)
  const ngunduhMantuTimeEnd = formatTime(data.ngunduhMantuTimeEnd)

  const handleClickAkadMaps = () => {
    window.open(data.akadMapsUrl, "_blank")
  }

  const handleClickReceptionMaps = () => {
    window.open(data.receptionMapsUrl, "_blank")
  }

  const handleClickNgunduhMantuMaps = () => {
    window.open(data.ngunduhMantuMapsUrl, "_blank")
  }

  return (
    <section className="relative min-h-svh flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-merlot-300 bg-[url('/modern/announcement-bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/modern/event/event-bg.png')] bg-cover bg-center bg-fixed" />

      {/* ORNAMEN BUNGA KANAN ATAS */}
      <motion.img src={flower2} alt="" className="absolute top-0 right-0 w-62 md:w-82 translate-x-3 -translate-y-3 scale-y-[-1] z-12 pointer-events-none " variants={floatY} animate="animate" />
      <motion.img src={flower2} alt="" className="absolute top-0 left-0 w-62 md:w-82 -translate-x-3 -translate-y-3 scale-x-[-1] scale-y-[-1] z-12 pointer-events-none " variants={floatY} animate="animate" />

      {/* ORNAMEN BUNGA BAWAH */}
      <motion.img src={flower2} alt="" className="absolute bottom-0 left-0 w-62 md:w-82 -translate-x-2 translate-y-3 scale-x-[-1] z-11 pointer-events-none" variants={floatY} animate="animate" />
      <motion.img src={flower2} alt="" className="absolute bottom-0 right-0 w-62 md:w-82 translate-x-2 translate-y-3 scale-x-[1] z-11 pointer-events-none " variants={floatY} animate="animate" />

      {/* OVERLAY CARD */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="
          relative z-10
          w-full max-w-[520px]
          min-h-[90svh]
          bg-white/80
          rounded-[180px]
          px-10 py-14 my-12
          flex flex-col items-center text-center
        "
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} className="items-center">
          <div className="flex flex-col items-center text-center leading-none mb-4">
            <p className="font-cormorant text-4xl font-semibold -translate-x-5 uppercase text-faded-merlot mb-1">Save</p>
            <p className="font-display text-3xl text-faded-merlot -mt-2 translate-x-8">The Date</p>
          </div>
        </motion.div>

        {/* EVENT LIST */}
        <div className="w-full">
          {/* SEKSI AKAD */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative mx-auto mt-2 mb-10 w-full max-w-[320px] px-6 py-12 text-center">
            {/* Background Arch */}
            <div
              className="absolute inset-0 rounded-t-full bg-white border border-merlot-300 pointer-events-none z-0 
             shadow-[inset_10px_10px_20px_rgba(0,0,0,0.15)]"
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <h2 className="font-alice text-4xl text-faded-merlot">Akad</h2>

              <div className="py-2">
                <img src={scheduleIcon} alt="" className="w-10" />
              </div>

              <div className="space-y-1 tracking-widest font-serif text-faded-merlot">
                <p className="font-bold font-lora uppercase text-lg">{eventDateFormatted}</p>
                <p className="text-xs font-lora italic">
                  Pukul {akadTimeStart} WIB s.d {akadTimeEnd != null ? akadTimeEnd : "Selesai"}
                </p>
              </div>

              <div className="pt-4">
                <img src={mapIcon} alt="" className="w-8" />
              </div>

              <div className="space-y-2">
                <p className="font-lora font-bold uppercase text-xs tracking-widest text-faded-merlot">{data.akadVanue}</p>
                <p className="font-lora text-[10px] leading-relaxed text-faded-merlot px-4">{data.akadLocation}</p>
              </div>

              <Button variant="primary" className="flex font-montserrat items-center " onClick={handleClickAkadMaps}>
                Buka Maps
              </Button>
            </div>
          </motion.div>

          {/* RESEPSI */}
          {hasReception && (
            <>
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative mb-10 mx-auto w-full max-w-[320px] px-6 py-12 text-center">
                {/* DIVIDER */}
                <motion.img src={roseImg} alt="" className=" absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-16 w-32 z-20 pointer-events-none -rotate-6" variants={floatScaleRotate} animate="animate" />
                {/* Background Arch */}
                <div
                  className="absolute inset-0 bg-white border border-merlot-300 pointer-events-none z-0 
             shadow-[inset_10px_10px_20px_rgba(0,0,0,0.15)]"
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <h2 className="font-alice text-4xl text-faded-merlot">Resepsi</h2>

                  <div className="py-2">
                    <img src={scheduleIcon} alt="" className="w-10" />
                  </div>

                  <div className="space-y-1 tracking-widest font-serif text-faded-merlot">
                    <p className="font-bold font-lora uppercase text-lg">{receptionDateFormatted}</p>
                    <p className="text-xs font-lora italic">
                      Pukul {receptionTimeStart} WIB s.d {receptionTimeEnd != null ? receptionTimeEnd : "Selesai"}
                    </p>
                  </div>

                  <div className="pt-4">
                    <img src={mapIcon} alt="" className="w-8" />
                  </div>

                  <div className="space-y-2">
                    <p className="font-lora font-bold uppercase text-xs tracking-widest text-faded-merlot">{data.receptionVanue}</p>
                    <p className="font-lora text-[10px] leading-relaxed text-faded-merlot px-4">{data.receptionLocation}</p>
                  </div>

                  <Button variant="primary" className="flex font-montserrat items-center " onClick={handleClickReceptionMaps}>
                    Buka Maps
                  </Button>
                </div>
              </motion.div>
            </>
          )}

          {/* OPTIONAL: NGUNDUH MANTU */}
          {hasNgunduhMantu && (
            <>
              {/* Ngunduh Mantu */}
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative mx-auto w-full max-w-[320px] px-6 py-12 text-center">
                {/* DIVIDER */}
                <motion.img src={roseImg} alt="" className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-16 w-32 z-20 pointer-events-none -rotate-6" variants={floatScaleRotate} animate="animate" />
                {/* Background Arch */}
                <div className="absolute rounded-b-full inset-0 bg-white border border-merlot-300 pointer-events-none z-0 shadow-[inset_10px_10px_20px_rgba(0,0,0,0.15)]" />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <h2 className="font-alice text-4xl text-faded-merlot">Ngunduh Mantu</h2>

                  <div className="py-2">
                    <img src={scheduleIcon} alt="" className="w-10" />
                  </div>

                  <div className="space-y-1 tracking-widest font-serif text-faded-merlot">
                    <p className="font-bold font-lora uppercase text-lg">{ngunduhMantuDateFormatted}</p>
                    <p className="text-xs font-lora italic">
                      Pukul {ngunduhMantuTimeStart} WIB s.d {ngunduhMantuTimeEnd != null ? ngunduhMantuTimeEnd : "Selesai"}
                    </p>
                  </div>

                  <div className="pt-4">
                    <img src={mapIcon} alt="" className="w-8" />
                  </div>

                  <div className="space-y-2">
                    <p className="font-lora font-bold uppercase text-xs tracking-widest text-faded-merlot">{data.ngunduhMantuVanue}</p>
                    <p className="font-lora text-[10px] leading-relaxed text-faded-merlot px-4">{data.ngunduhMantuLocation}</p>
                  </div>

                  <Button variant="primary" className="flex font-montserrat items-center " onClick={handleClickNgunduhMantuMaps}>
                    Buka Maps
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  )
}
