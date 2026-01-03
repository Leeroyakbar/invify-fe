import type { ComponentType } from "react"
import type { TemplateProps } from "../../types/TemplateProps"
import Modern from "../templates/modern/ModernTemplate"
import IvoryTemplate from "../templates/elegant-ivory/IvoryTemplate"
import ArchElegantTemplate from "../templates/modern-arch-elegant/ArchElegantTemplate"
import ClassicNoir from "../templates/classic-noir/ClassicNoirTemplate"

export const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  modern: Modern,
  "elegant-ivory": IvoryTemplate,
  "arch-elegant": ArchElegantTemplate,
  "classic-noir": ClassicNoir,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
