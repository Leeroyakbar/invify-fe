import { motion } from "framer-motion"
import { Check, Minus, ArrowRight } from "lucide-react"

const allFeatures = [
  "Masa Aktif",
  "Unlimited Share",
  "Tema Desain",
  "Countdown Timer",
  "Google Maps Integration",
  "RSVP & Wishes",
  "Wedding Gifts / Digital Envelope",
  "Music Backsound",
  "Galeri Foto",
  "Love Story Section",
  "Request Fitur Khusus",
  "Custom Domain",
  "Support Prioritas",
]

const plans = [
  {
    name: "Basic",
    price: "Rp99.000",
    features: {
      "Masa Aktif": "6 Bulan",
      "Unlimited Share": true,
      "Tema Desain": "All Themes",
      "Countdown Timer": true,
      "Google Maps Integration": true,
      "RSVP & Wishes": true,
      "Wedding Gifts / Digital Envelope": true,
      "Music Backsound": true,
      "Galeri Foto": "Maks. 5 Foto",
      "Love Story Section": true,
      "Request Fitur Khusus": false,
      "Custom Domain": false,
      "Support Prioritas": false,
    },
    urlWa: "https://wa.me/6282273366718?text=Halo%20Admin%2C%20saya%20ingin%20paket%20Basic",
  },
  {
    name: "Premium",
    price: "Rp199.000",
    popular: true,
    features: {
      "Masa Aktif": "12 Bulan",
      "Unlimited Share": true,
      "Tema Desain": "All Themes",
      "Countdown Timer": true,
      "Google Maps Integration": true,
      "RSVP & Wishes": true,
      "Wedding Gifts / Digital Envelope": true,
      "Music Backsound": true,
      "Galeri Foto": "Maks. 15 Foto",
      "Love Story Section": true,
      "Request Fitur Khusus": false,
      "Custom Domain": false,
      "Support Prioritas": false,
    },
    urlWa: "https://wa.me/6282273366718?text=Halo%20Admin%2C%20saya%20ingin%20paket%20Premium",
  },
  {
    name: "Custom",
    price: "By Request",
    features: {
      "Masa Aktif": "Lifetime",
      "Unlimited Share": true,
      "Tema Desain": "Bespoke Design",
      "Countdown Timer": true,
      "Google Maps Integration": true,
      "RSVP & Wishes": true,
      "Wedding Gifts / Digital Envelope": true,
      "Music Backsound": "Custom List",
      "Galeri Foto": "Unlimited",
      "Love Story Section": true,
      "Request Fitur Khusus": true,
      "Custom Domain": true,
      "Support Prioritas": true,
    },
    urlWa: "https://wa.me/6282273366718?text=Halo%20Admin%2C%20saya%20ingin%20paket%20Custom",
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0A0A0A] py-32 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="mb-20">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-4 block">
            Investment
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-cormorant-upright text-5xl md:text-7xl text-white leading-none uppercase tracking-tighter">
            Plan Your <span className="italic opacity-40">Celebration</span>
          </motion.h2>
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-8 pr-6 min-w-50">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Fitur & Layanan</p>
                </th>
                {plans.map((plan) => (
                  <th key={plan.name} className="py-8 px-6 min-w-[200px] relative">
                    {plan.popular && <span className="absolute top-0 left-6 bg-white text-black text-[8px] uppercase tracking-widest px-2 py-1 font-bold">Most Popular</span>}
                    <h3 className="font-cormorant-upright text-3xl text-white uppercase">{plan.name}</h3>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {allFeatures.map((feature) => (
                <tr key={feature} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 pr-6 text-[11px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">{feature}</td>
                  {plans.map((plan) => {
                    const val = plan.features[feature as keyof typeof plan.features]
                    return (
                      <td key={plan.name + feature} className="py-5 px-6 text-sm text-white/70 font-light">
                        {typeof val === "boolean" ? val ? <Check size={16} className="text-white" /> : <Minus size={16} className="text-white/10" /> : <span className="text-[11px] font-medium tracking-wide uppercase">{val}</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* CTA ROW */}
              <tr>
                <td className="py-12 pr-6"></td>
                {plans.map((plan) => (
                  <td key={plan.name + "cta"} className="py-12 px-6">
                    <button
                      onClick={() => window.open(plan.urlWa, "_blank")}
                      className={`group flex items-center justify-between w-full px-6 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all
                        ${plan.name === "Premium" ? "bg-white text-black hover:bg-white/90" : "border border-white/20 text-white hover:bg-white/5"}`}
                    >
                      Select Plan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* CUSTOM REQUEST FOOTER */}
        <div className="mt-20 p-12 border border-white/5 bg-white/[0.01] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h4 className="font-cormorant-upright text-3xl text-white uppercase mb-2">Punya Permintaan Khusus?</h4>
            <p className="text-white/40 text-xs uppercase tracking-widest">Kami siap mewujudkan desain eksklusif dari nol sesuai visi Anda.</p>
          </div>
          <button onClick={() => window.open(plans[2].urlWa, "_blank")} className="text-white border-b border-white/40 pb-2 text-[10px] uppercase tracking-[0.4em] hover:text-white/60 hover:border-white/20 transition-all">
            Konsultasi Desain Custom
          </button>
        </div>
      </div>
    </section>
  )
}
