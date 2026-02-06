import { Building2, Tag, Mail, Phone, MapPin, Upload, Save, BadgeDollarSign, Bell, ShieldCheck } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-800">Pengaturan</h1>
        <p className="text-stone-400 text-sm italic font-light">Kelola pengaturan bisnis dan platform Anda</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* 1. INFORMASI BISNIS */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-stone-400">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-800 italic">Informasi Bisnis</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Detail profil bisnis Anda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nama Bisnis" placeholder="WeddingInvite" icon={<Building2 size={16} />} />
            <InputField label="Tagline" placeholder="Undangan Digital Elegan..." icon={<Tag size={16} />} />
            <InputField label="Email" placeholder="hello@weddinginvite.com" icon={<Mail size={16} />} />
            <InputField label="Telepon" placeholder="+62 812-3456-7890" icon={<Phone size={16} />} />
          </div>

          <InputField label="Alamat" placeholder="Jl. Cinta Abadi No. 123, Jakarta" icon={<MapPin size={16} />} />

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 ml-1">Deskripsi Bisnis</label>
            <textarea className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#D4A853]/50 min-h-[120px]" placeholder="Ceritakan tentang platform Anda..." />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-stone-500 ml-1">Logo Bisnis</label>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 flex items-center justify-center text-stone-300">
                <Upload size={24} />
              </div>
              <button className="px-6 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-50 transition-all flex items-center gap-2">
                <Upload size={14} /> Upload Logo
              </button>
            </div>
          </div>

          <button className="bg-[#D4A853] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#D4A853]/20 flex items-center gap-2 hover:bg-[#c29645] transition-all">
            <Save size={18} /> Simpan Perubahan
          </button>
        </section>

        {/* 2. PENGATURAN HARGA */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <BadgeDollarSign size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-800 italic">Pengaturan Harga</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Atur harga paket undangan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PriceField label="Paket Basic" value="150000" />
            <PriceField label="Paket Premium" value="350000" />
            <PriceField label="Paket Custom" value="500000" />
          </div>

          <button className="bg-[#D4A853] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#D4A853]/20 flex items-center gap-2 hover:bg-[#c29645] transition-all">
            <Save size={18} /> Simpan Harga
          </button>
        </section>

        {/* 3. NOTIFIKASI */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-800 italic">Notifikasi</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Atur preferensi notifikasi</p>
            </div>
          </div>

          <div className="space-y-6">
            <ToggleField title="Notifikasi Email" description="Terima notifikasi melalui email" defaultChecked />
            <ToggleField title="Notifikasi Pesanan Baru" description="Notifikasi saat ada pesanan baru" defaultChecked />
            <ToggleField title="Email Marketing" description="Terima tips dan update produk" />
          </div>
        </section>

        {/* 4. KEAMANAN */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-800 italic">Keamanan</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Pengaturan keamanan akun</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-stone-700">Ubah Password</p>
                <p className="text-xs text-stone-400">Perbarui password akun Anda</p>
              </div>
              <button className="px-6 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-50 transition-all">Ubah Password</button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-stone-50">
              <div>
                <p className="text-sm font-bold text-stone-700">Two-Factor Authentication</p>
                <p className="text-xs text-stone-400">Aktifkan keamanan tambahan</p>
              </div>
              <button className="px-6 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-50 transition-all">Aktifkan 2FA</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// --- REUSABLE COMPONENTS FOR CLEANER CODE ---

function InputField({ label, placeholder, icon }: { label: string; placeholder: string; icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-stone-500 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#D4A853] transition-colors">{icon}</div>
        <input type="text" placeholder={placeholder} className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all" />
      </div>
    </div>
  )
}

function PriceField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-stone-500 ml-1">{label} (Rp)</label>
      <input type="number" defaultValue={value} className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all" />
      <p className="text-[10px] text-stone-400 font-bold ml-1 italic">Rp {parseInt(value).toLocaleString("id-ID")}</p>
    </div>
  )
}

function ToggleField({ title, description, defaultChecked = false }: { title: string; description: string; defaultChecked?: boolean }) {
  const [enabled, setEnabled] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-bold text-stone-700">{title}</p>
        <p className="text-xs text-stone-400">{description}</p>
      </div>
      <button onClick={() => setEnabled(!enabled)} className={`w-12 h-6 rounded-full transition-all relative ${enabled ? "bg-[#D4A853]" : "bg-stone-200"}`}>
        <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${enabled ? "left-7" : "left-1"}`} />
      </button>
    </div>
  )
}
