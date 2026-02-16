"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
}

/**
 * Kenar boyunca dönen ince ışık bandı (sadece border). CSS-only.
 */
export function BorderBeam({
  className,
  duration = 6,
  delay = 0,
  borderWidth = 1,
  colorFrom = "#1e5a9e",
  colorTo = "#00b4d8",
  reverse = false,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden rounded-2xl",
        className
      )}
      style={{
        inset: -borderWidth,
        zIndex: 1,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-2xl border-beam-rotate",
          reverse && "border-beam-rotate-reverse"
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 180deg, ${colorFrom} 300deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
      {/* İçi kapat: sadece kenar halkası görünsün */}
      <div
        className="absolute rounded-2xl bg-card"
        style={{ inset: borderWidth }}
      />
    </div>
  )
}
