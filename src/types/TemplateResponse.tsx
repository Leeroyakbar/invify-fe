export interface TemplateResponse {
  templateId: string
  templateName: string
  templateCategory: string
  previewImage: string
  price: number
  popular?: boolean
  isStatic?: boolean
  activeStatus: number
  usedCount: number
  createdDate: string
}
