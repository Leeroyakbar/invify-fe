import Modern from "./modern"

export const TEMPLATE_MAP = {
  modern: Modern,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
