import type { Invitation } from "../../types/Invitation"

// 1. Definisikan Data Dasar (Default) yang akan dipakai semua template
// Agar tidak perlu menulis ulang field yang sama berulang kali
const baseInvitation: Partial<Invitation> = {
  template: "elegant-ivory",
  slug: "/lili-lee",
  guestName: "Bapak/Ibu/Saudara/i",
  groomName: "Lee Roy",
  brideName: "Lili Rahma",
  eventDate: "2027-02-27 09:00:00",
  eventDateFormatted: "27 • 02 • 2027",
  akadVanue: "Rumah Kediaman Mempelai Wanita",
  akadLocation: "Desa Pir Trans Sosa IB, Kec. Lubuk Barumun, Kab. Padang Lawas, Prov. Sumatra Utara",
  groomFullName: "Lee Roy Akbar",
  brideFullName: "Lili Rahma Yani",
  groomInstagram: "leerykbr",
  brideInstagram: "lilirhmyn",
  groomFather: "Nurwildan Edi",
  groomMother: "Almh. Meylyawati Anggia Murni Hutagalung",
  brideFather: "Abdul Hasan Pulungan",
  brideMother: "Solatiah",
  akadTimeStart: "08:00",
  akadTimeEnd: "10:00",
  akadMapsUrl: "https://maps.app.goo.gl/Wucmo3s9Y6UEKJMi8",
  receptionDate: "2027-02-28",
  receptionTimeStart: "10:00",
  receptionTimeEnd: "15:00",
  receptionVanue: "Rumah Kediaman Mempelai Wanita",
  receptionLocation: "Desa Pir Trans Sosa IB, Kec. Lubuk Barumun, Kab. Padang Lawas, Prov. Sumatra Utara",
  receptionMapsUrl: "https://maps.app.goo.gl/Wucmo3s9Y6UEKJMi8",
  ngunduhMantuDate: "2027-03-01",
  ngunduhMantuTimeStart: "08:00",
  ngunduhMantuTimeEnd: "15:00",
  ngunduhMantuVanue: "Rumah Kediaman Mempelai Pria",
  ngunduhMantuLocation: "Desa Pir Trans Sosa IB, Kec. Lubuk Barumun, Kab. Padang Lawas, Prov. Sumatra Utara",
  ngunduhMantuMapsUrl: "https://maps.app.goo.gl/Wucmo3s9Y6UEKJMi8",
  storyMeet: "Tidak ada yang kebetulan di dunia ini. Pertemuan kami menjadi awal dari sebuah kisah yang tak pernah kami sangka.",
  storyCommitment: "Dengan niat yang semakin kuat, kami melangkah lebih jauh untuk menyatukan harapan.",
  storyMarriage: "Kini kami memulai perjalanan baru dalam ikatan suci pernikahan.",
  accountNo: "063701011564535",
  accountName: "Lili Rahma Yani",
  bankName: "BRI",
  accountNo2: "901578649650",
  accountName2: "Lee Roy Akbar",
  bankName2: "SeaBank",
  audioUrl: "https://www.youtube.com/watch?v=COFgTynydQE",
  images: [],
  guests: [
    { id: 1, name: "Lee Roy Akbar", isAttending: true, message: "Selamat ya! Sakinah Mawaddah Warohmah." },
    { id: 2, name: "Lili Rahma Yani", isAttending: true, message: "Barakallah! Semoga cinta kalian abadi." },
  ],
}

// 2. Mapping Data Per Template
export const DEMO_INVITATIONS: Record<string, Invitation> = {
  "elegant-ivory": {
    ...baseInvitation,
    template: "elegant-ivory",
    coverImage: "/old-money/cover.png",
    groomPhoto: "/old-money/groom.png",
    bridePhoto: "/old-money/bride.png",
    images: [
      "/old-money/gallery/1.jpeg",
      "/old-money/gallery/2.jpeg",
      "/old-money/gallery/3.jpeg",
      "/old-money/gallery/4.jpeg",
      "/old-money/gallery/5.jpeg",
      "/old-money/gallery/6.jpeg",
      "/old-money/gallery/7.jpeg",
      "/old-money/gallery/8.jpeg",
    ],
  } as Invitation,

  "classic-noir": {
    ...baseInvitation,
    template: "classic-noir",
    groomName: "Lee",
    brideName: "Lili",
    groomPhoto: "/modern/couple/groom-photo.png",
    bridePhoto: "/modern/couple/bride-photo.png",
    storyMeet: "Tidak ada yang kebetulan di dunia ini. Semua telah tersusun rapi oleh Sang Maha Kuasa. Pertemuan kami di awal perjalanan ini menjadi awal dari sebuah kisah yang tak pernah kami sangka sebelumnya.",
    storyCommitment: "Dengan niat yang semakin kuat, kami melangkah lebih jauh. Mengikat janji, mempertemukan dua keluarga, dan menyatukan harapan untuk masa depan yang sama.",
    storyMarriage: "Kini, dengan izin Allah SWT serta restu orang tua, kami memulai perjalanan baru dalam ikatan suci pernikahan. Sebuah kisah yang akan kami jaga, selamanya.",

    images: ["/modern/galery/galery-1.png", "/modern/galery/galery-2.png"],
  } as Invitation,

  lili: {
    ...baseInvitation,
    audioUrl: "https://www.youtube.com/watch?v=wbPM93Oz67A",
    template: "classic-noir",
    groomName: "Lee",
    brideName: "Lili",
    groomPhoto: "/modern/couple/groom-photo.png",
    bridePhoto: "/modern/couple/bride-photo.png",
    storyMeet: "Tidak ada yang kebetulan di dunia ini. Semua telah tersusun rapi oleh Sang Maha Kuasa. Pertemuan kami di awal perjalanan ini menjadi awal dari sebuah kisah yang tak pernah kami sangka sebelumnya.",
    storyCommitment: "Dengan niat yang semakin kuat, kami melangkah lebih jauh. Mengikat janji, mempertemukan dua keluarga, dan menyatukan harapan untuk masa depan yang sama.",
    storyMarriage: "Kini, dengan izin Allah SWT serta restu orang tua, kami memulai perjalanan baru dalam ikatan suci pernikahan. Sebuah kisah yang akan kami jaga, selamanya.",

    images: [
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-1.webp?width=600", // Foto Utama (Horizontal)
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-2.webp?width=600", // Foto Potret
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-3.webp?width=600", // Foto Potret
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-4.webp?width=600", // Foto Potret
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-5.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-6.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-7.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-8.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-9.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-10.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-11.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-12.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-13.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-14.webp?width=600",
      "https://wjvcqywqsqphkcygwxui.supabase.co/storage/v1/object/public/invify-bucket/lili/gallery-15.webp?width=600",
    ],
  } as Invitation,

  "old-money": {
    ...baseInvitation,
    template: "old-money",
    coverImage: "/old-money/cover.png",
    groomFullName: "Lee Roy Akbar, S.Kom", // Menambahkan gelar
    brideFullName: "Lili Rahma Yani, S.E",
    eventDateFormatted: "SATURDAY | 27 | 02 | 2027", // Format tanggal berbeda
    groomPhoto: "/old-money/groom.png",
    bridePhoto: "/old-money/bride.png",
    images: [
      "/old-money/gallery/1.jpeg",
      "/old-money/gallery/2.jpeg",
      "/old-money/gallery/3.jpeg",
      "/old-money/gallery/4.jpeg",
      "/old-money/gallery/5.jpeg",
      "/old-money/gallery/6.jpeg",
      "/old-money/gallery/7.jpeg",
      "/old-money/gallery/8.jpeg",
    ],
    // Override bank untuk template mewah
    bankName: "Private Banking - BCA",
    bankName2: "J.P. Morgan",
    storyMeet: "Tidak ada yang kebetulan di dunia ini. Semua telah tersusun rapi oleh Sang Maha Kuasa. Pertemuan kami di awal perjalanan ini menjadi awal dari sebuah kisah yang tak pernah kami sangka sebelumnya.",
    storyCommitment: "Dengan niat yang semakin kuat, kami melangkah lebih jauh. Mengikat janji, mempertemukan dua keluarga, dan menyatukan harapan untuk masa depan yang sama.",
    storyMarriage: "Kini, dengan izin Allah SWT serta restu orang tua, kami memulai perjalanan baru dalam ikatan suci pernikahan. Sebuah kisah yang akan kami jaga, selamanya.",
  } as Invitation,
}

// 3. Helper untuk mendapatkan data (Opsional)
// Fungsi ini memastikan jika template tidak ditemukan, dia akan mengembalikan default (base)
export const getDemoData = (templateId: string): Invitation => {
  return DEMO_INVITATIONS[templateId] || baseInvitation
}
