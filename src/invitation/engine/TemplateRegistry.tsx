import type { ComponentType } from "react"
import type { TemplateProps } from "../../types/TemplateProps"
import Modern from "../templates/modern/ModernTemplate"
import ClassicNoir from "../templates/classic-noir/ClassicNoirTemplate"
import OldMoneyTemplate from "../templates/old-money/OldMoneyTemplate"
import LiliTemplate from "../templates/Lili/LiliTemplate"

export const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  modern: Modern,
  lili: LiliTemplate,
  "classic-noir": ClassicNoir,
  "old-money": OldMoneyTemplate,
}

export type TemplateKey = keyof typeof TEMPLATE_MAP
