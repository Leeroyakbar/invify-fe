import type { TemplateKey } from "./TemplateRegistry"

export const TEMPLATE_THEME: Record<
  TemplateKey,
  {
    desktopBg: string
    audioColor: string
  }
> = {
  modern: {
    desktopBg: "bg-[url('/modern/wedding-of-desk.png')] bg-cover bg-center",
    audioColor: "text-faded-merlot",
  },
  "elegant-ivory": {
    desktopBg: "bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center",
    audioColor: "text-button-ivory",
  },
  "arch-elegant": {
    desktopBg: "bg-[url('/modern/couple/couple-bg.jpeg')] bg-cover bg-center",
    audioColor: "text-button-ivory",
  },
}
