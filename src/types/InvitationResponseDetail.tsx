import type { InvitationResponse } from "./InvitationResponse"
import type { EventResponse } from "./EventResponse"
import type { TemplateResponse } from "./TemplateResponse"
import type { GalleryResponse } from "./GalleryResponse"
import type { StoryResponse } from "./StoryResponse"

export interface InvitationResponseDetail extends InvitationResponse {
  events: EventResponse[]
  template: TemplateResponse
  gallery: GalleryResponse[]
  stories: StoryResponse[]
}
