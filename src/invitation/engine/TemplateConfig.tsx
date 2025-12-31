import type { TemplateKey } from "./TemplateRegistry"
import type { TemplateConfig } from "./TemplateConfigKey"

export const TEMPLATE_CONFIG: Record<TemplateKey, TemplateConfig> = {
  "elegant-ivory": {
    sections: {
      cover: true,
      countdown: true,
      couple: true,
      event: true,
      quote: true,
      loveStory: true,
      gallery: true,
      wishes: true,
      gifts: true,
    },
  },
  modern: {
    sections: {
      cover: true,
      countdown: true,
      couple: true,
      event: true,
      quote: false,
      loveStory: false,
      gallery: true,
      wishes: true,
      gifts: true,
    },
  },
}
