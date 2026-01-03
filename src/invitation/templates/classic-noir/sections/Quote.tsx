import type { Invitation } from "../../../../types/Invitation"

export default function QuoteImageSection({ data }: { data: Invitation }) {
  return (
    <section className="h-screen snap-start relative">
      <img src="/classic-noir/photo-3.jpeg" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-20">
        <h3 className="font-serif text-xl mb-4">Ar-Rum : 21</h3>

        <p className="font-lora max-w-xl text-sm  text-white">
          “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang
          demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
        </p>

        <p className="mt-6 font-serif tracking-wide">
          {data.brideName} & {data.groomName}
        </p>
      </div>
    </section>
  )
}
