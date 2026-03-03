"use client"

import type React from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  staggerIndex?: number
  /** Delay in ms per stagger step (default 80) */
  staggerStep?: number
}

export function ScrollReveal({
  children,
  className,
  as: Component = "div" as React.ElementType,
  staggerIndex = 0,
  staggerStep = 80,
}: ScrollRevealProps) {
  const { ref, hasRevealed } = useScrollReveal<HTMLDivElement>()
  const Comp = Component

  return (
    <Comp
      ref={ref}
      data-reveal
      data-revealed={hasRevealed}
      className={cn("reveal-element", className)}
      style={
        {
          "--reveal-delay": `${staggerIndex * staggerStep}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </Comp>
  )
}
