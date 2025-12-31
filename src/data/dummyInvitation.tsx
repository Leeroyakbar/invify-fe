import type { Invitation } from "../types/Invitation"

export const dummyInvitation: Invitation = {
  template: "elegant-ivory",
  slug: "/lili-lee",
  groomName: "Lee Roy",
  brideName: "Lili Rahma",
  eventDate: "2027-02-27 09:00:00",
  eventDateFormatted: "27 • 02 • 2027",
  akadVanue: "Rumah Kediaman Mempelai Wanita",
  akadLocation: "Desa Pir Trans Sosa IB, Kec. Lubuk Barumun, Kab. Padang Lawas, Prov. Sumatra Utara",
  groomFullName: "Lee Roy Akbar",
  brideFullName: "Lili Rahma Yani",

  groomFather: "Nurwildan Edi",
  groomMother: "Almh. Meylyawati Anggia Murni Hutagalung",

  brideFather: "Abdul Hasan Pulungan",
  brideMother: "Solatiah",

  groomPhoto: "/modern/couple/groom-photo.png",
  bridePhoto: "/modern/couple/bride-photo.png",

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

  storyMeet: "Tidak ada yang kebetulan di dunia ini. Semua telah tersusun rapi oleh Sang Maha Kuasa. Pertemuan kami di awal perjalanan ini menjadi awal dari sebuah kisah yang tak pernah kami sangka sebelumnya.",
  storyCommitment: "Dengan niat yang semakin kuat, kami melangkah lebih jauh. Mengikat janji, mempertemukan dua keluarga, dan menyatukan harapan untuk masa depan yang sama.",
  storyMarriage: "Kini, dengan izin Allah SWT serta restu orang tua, kami memulai perjalanan baru dalam ikatan suci pernikahan. Sebuah kisah yang akan kami jaga, selamanya.",

  accountNo: "063701011564535",
  accountName: "Lili Rahma Yani",
  bankName: "BRI",

  accountNo2: "901578649650",
  accountName2: "Lee Roy Akbar",
  bankName2: "SeaBank",

  audioUrl: "https://www.youtube.com/watch?v=lnuFWMnyKk0&list=RDlnuFWMnyKk0",

  images: ["/modern/galery/galery-4.png", "/modern/galery/galery-2.png", "/modern/galery/galery-1.png", "/modern/galery/galery-5.png", "/modern/galery/galery-3.png"],

  guests: [
    {
      id: 1,
      name: "Lee Roy Akbar",
      isAttending: true,
      message: "Selamat ya! Semoga menjadi keluarga yang sakinah, mawaddah, warohmah. Lancar sampai hari H!",
    },
    {
      id: 2,
      name: "Lili Rahma Yani",
      isAttending: true,
      message: "Barakallah! Ikut senang dengar kabarnya. Semoga cinta kalian abadi sampai ke surga-Nya.",
    },
    {
      id: 3,
      name: "Budi Santoso",
      isAttending: true,
      message: "Selamat menempuh hidup baru kawan. Semoga selalu diberikan kebahagiaan dan momongan yang saleh/salehah.",
    },
    {
      id: 4,
      name: "Siti Aminah",
      isAttending: false,
      message: "Mohon maaf belum bisa hadir karena ada tugas di luar kota. Selamat ya, semoga acaranya lancar tanpa kendala!",
    },
    {
      id: 5,
      name: "Andi Wijaya",
      isAttending: true,
      message: "Akhirnya berlabuh juga! Selamat bro, semoga jadi imam yang baik dan keluarga kalian selalu diberkahi.",
    },
    {
      id: 6,
      name: "Dewi Sartika",
      isAttending: true,
      message: "MasyaAllah tabarakallah. Cantik dan ganteng banget pasangannya. Selamat berbahagia ya kalian!",
    },
    {
      id: 7,
      name: "Fajar Pratama",
      isAttending: false,
      message: "Selamat ya! Titip doa terbaik saja dari sini. Semoga menjadi pasangan yang saling melengkapi selamanya.",
    },
    {
      id: 8,
      name: "Rina Nose",
      isAttending: true,
      message: "Happy Wedding! Semoga cinta kalian terus tumbuh setiap harinya. Cheers for a happy life together!",
    },
    {
      id: 9,
      name: "Hendra Kurniawan",
      isAttending: true,
      message: "Selamat menempuh ibadah terlama. Semoga setiap harinya penuh dengan keberkahan dan rasa syukur.",
    },
    {
      id: 10,
      name: "Maya Indriati",
      isAttending: true,
      message: "Happy for you both! Semoga menjadi keluarga yang harmonis dan selalu rukun sampai kakek nenek.",
    },
  ],
} satisfies Invitation
