export interface Invitation {
  slug: string
  groomName: string
  brideName: string

  groomPhoto: string
  bridePhoto: string

  eventDate: string
  akadLocation: string
  receptionLocation: string

  groomFullName: string
  brideFullName: string

  groomFather: string
  brideMother: string

  groomMother: string
  brideFather: string

  media: Media[]
}

export interface Media {
  type: "IMAGE" | "VIDEO"
  url: string
}
