import { easeIn, easeInOut, easeOut } from "framer-motion"
import type { Variants } from "framer-motion"

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: easeOut,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
}

export const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const floatY = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
}
export const floatScaleRotate = {
  animate: {
    scale: [1, 1.03, 1],
    rotate: [0, 2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
}

export const expandFade: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    height: "auto",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export const revealDown = {
  hidden: {
    height: 0,
  },
  visible: {
    height: "auto",
    transition: {
      height: { duration: 1, ease: easeIn },
    },
  },
  exit: {
    height: 1,
    transition: {
      height: { duration: 1, ease: easeInOut },
    },
  },
}
