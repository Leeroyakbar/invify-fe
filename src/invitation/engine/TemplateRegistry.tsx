import type { ComponentType } from "react"
import type { TemplateProps } from "../../types/TemplateProps"
import Modern from "../templates/modern/ModernTemplate"
import IvoryTemplate from "../templates/elegant-ivory/IvoryTemplate"
import ArchElegantTemplate from "../templates/modern-arch-elegant/ArchElegantTemplate"
import ClassicNoir from "../templates/classic-noir/ClassicNoirTemplate"
import OldMoneyTemplate from "../templates/old-money/OldMoneyTemplate"

export const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  modern: Modern,
  "elegant-ivory": IvoryTemplate,
  "arch-elegant": ArchElegantTemplate,
  "classic-noir": ClassicNoir,
  "old-money": OldMoneyTemplate,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
