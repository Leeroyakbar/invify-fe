export type TemplateSectionKey = "cover" | "countdown" | "couple" | "event" | "quote" | "loveStory" | "gallery" | "wishes" | "gifts"

export interface TemplateConfig {
  sections: Record<TemplateSectionKey, boolean>
}
