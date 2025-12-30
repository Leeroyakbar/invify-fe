import type { ComponentType } from "react"
import type { TemplateProps } from "../types/TemplateProps"
import Modern from "./modern"
import IvoryTemplate from "./elegant-ivory"

export const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  modern: Modern,
  "elegant-ivory": IvoryTemplate,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
