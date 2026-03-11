export interface InvitationRequest {
  coupleName: string
  templateId: string
  slug: string
  subscriptionPlan: string
  bridePhoto: File
  groomPhoto: File
  gallery: File[]
  musicBackground: string
  eventJson: string
  videoBackground: File
}
