import React from "react"

type ButtonVariant = "primary" | "outline"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
}

export default function Button({ children, onClick, variant = "primary", className = "" }: ButtonProps) {
  const baseStyle = "inline-flex items-center font-montserrat justify-center rounded-full px-6 py-2 text-xs max-[380px]:text-[10px] md:text-sm transition-all duration-300"

  const variants = {
    primary: "bg-merlot-500 text-white hover:bg-merlot-700 shadow-md hover:shadow-lg",
    outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className} cursor-pointer`}>
      {children}
    </button>
  )
}
