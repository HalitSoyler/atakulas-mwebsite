"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function InteractiveHoverButton({
  children,
  className,
  asChild = false,
  ...props
}: InteractiveHoverButtonProps) {
  const baseClass = cn(
    "group relative inline-flex h-11 items-center justify-center rounded-lg px-6 font-medium",
    "bg-primary text-primary-foreground",
    "transition-all duration-300 ease-out",
    "hover:shadow-[0_0_25px_rgba(30,90,158,0.35)]",
    "active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    className
  )

  if (asChild) {
    return (
      <Slot className={baseClass} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button className={baseClass} type="button" {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
