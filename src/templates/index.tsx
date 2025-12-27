import type { ComponentType } from "react"
import type { TemplateProps } from "../types/TemplateProps"
import Modern from "./modern"

export const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  modern: Modern,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
