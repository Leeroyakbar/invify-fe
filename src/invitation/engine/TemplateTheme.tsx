import type { TemplateKey } from "./TemplateRegistry"

export const TEMPLATE_THEME: Record<
  TemplateKey,
  {
    desktopBg: string
    audio: {
      variant: "modern" | "noir"
      position: "bottom-right" | "bottom-center"
      bg: string
      border: string
      iconColor: string
    }
  }
> = {
  modern: {
    desktopBg: "bg-[url('/modern/wedding-of-desk.png')] bg-cover bg-center",
    audio: {
      variant: "modern",
      position: "bottom-right",
      bg: "bg-white/90",
      border: "border-black/10",
      iconColor: "text-black",
    },
  },

  "elegant-ivory": {
    desktopBg: "bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center",
    audio: {
      variant: "modern",
      position: "bottom-right",
      bg: "bg-white/90",
      border: "border-black/10",
      iconColor: "text-button-ivory",
    },
  },

  "arch-elegant": {
    desktopBg: "bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center",
    audio: {
      variant: "modern",
      position: "bottom-right",
      bg: "bg-white/90",
      border: "border-black/10",
      iconColor: "text-button-ivory",
    },
  },

  "classic-noir": {
    desktopBg: "bg-[url('/classic-noir/photo-1.jpeg')] bg-cover bg-center",
    audio: {
      variant: "noir",
      position: "bottom-right",
      bg: "bg-black/10",
      border: "border-white/40",
      iconColor: "text-white",
    },
  },
}
