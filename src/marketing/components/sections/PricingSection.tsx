import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "Rp99.000",
    desc: "Cocok untuk undangan sederhana",
    highlight: false,
    features: ["Tema Basic", "Masa Aktif 6 Bulan", "Countdown Timer", "Google Maps", "RSVP & Wishes", "Wedding Gifts", "Quote", "Backsound", "Galeri Maksimal 5 Foto"],
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Basic%20untuk%20acara%20pernikahan%20saya.",
  },
  {
    name: "Premium",
    price: "Rp199.000",
    desc: "Pilihan paling populer",
    highlight: true,
    features: ["Tema Premium", "Masa Aktif Lifetime", "Countdown Timer", "Google Maps", "RSVP & Wishes", "Quote", "Backsound", "Love Story", "Galery Maksimal 15 Foto"],
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Premium%20untuk%20acara%20pernikahan%20saya.",
  },
  {
    name: "Custom",
    price: "By Request",
    desc: "Untuk kebutuhan khusus",
    highlight: false,
    features: ["Semua Fitur Premium", "Desain Eksklusif", "Request Fitur Khusus", "Custom Domain", "Support Prioritas"],
    urlWa: "https://api.whatsapp.com/send?phone=6282273366718&text=Halo%20Admin%2C%20saya%20ingin%20menggunakan%20template%20Custom%20untuk%20acara%20pernikahan%20saya.",
  },
]

export default function PricingSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#FFF9F4]">
      <div className="max-w-7xl mx-auto px-6 py-24" id="pricing">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#3B2F2F]">
            Pilih Paket yang <span className="italic text-[#D4A853]">Sesuai</span>
          </h2>

          <p className="mt-6 text-[#7A6F68]">Harga transparan tanpa biaya tersembunyi</p>
        </div>

        {/* PRICING CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 items-stretch">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-3xl p-8 border transition shadow-sm flex flex-col ${plan.highlight ? "border-[#D4A853] shadow-xl scale-105 bg-white" : "border-black/5 bg-white"}`}>
              {plan.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4A853] text-white text-xs px-4 py-1 rounded-full">Paling Populer</span>}

              <h3 className="font-serif text-2xl text-[#3B2F2F]">{plan.name}</h3>
              <p className="mt-2 text-sm text-[#7A6F68]">{plan.desc}</p>

              <div className="mt-6">
                <span className="text-4xl font-serif text-[#3B2F2F]">{plan.price}</span>
              </div>

              {/* FEATURES */}
              <ul className="mt-8 space-y-4 flex-1 ">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#7A6F68]">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#F6E6E3] text-[#D4A853] flex items-center justify-center">
                      <Check size={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => window.open(plan.urlWa, "_blank")}
                className={`mt-8 w-full py-4 rounded-full transition ${plan.highlight ? "bg-[#D4A853] text-white hover:bg-[#C59A45]" : "border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-white"}`}
              >
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
