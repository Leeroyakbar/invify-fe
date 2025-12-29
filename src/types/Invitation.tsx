export interface Invitation {
  slug: string
  groomName: string
  brideName: string

  groomPhoto: string
  bridePhoto: string

  eventDate: string
  akadLocation: string

  groomFullName: string
  brideFullName: string

  groomFather: string
  brideMother: string

  groomMother: string
  brideFather: string

  akadTimeStart: string
  akadTimeEnd: string
  akadVanue: string
  akadMapsUrl: string
  
  receptionDate: string
  receptionTimeStart: string
  receptionTimeEnd: string
  receptionVanue: string
  receptionLocation: string
  receptionMapsUrl: string

  ngunduhMantuDate: string
  ngunduhMantuTimeStart: string
  ngunduhMantuTimeEnd: string
  ngunduhMantuVanue: string
  ngunduhMantuLocation: string
  ngunduhMantuMapsUrl: string

  storyMeet: string
  storyCommitment: string
  storyMarriage: string


  accountNo: string
  accountName: string
  bankName: string
  
  accountNo2: string
  accountName2: string
  bankName2: string

  audioUrl: string

  images: string[]

  guests: Guest[]
}

export interface Guest {
  id: number
  name: string
  isAttending: boolean
}