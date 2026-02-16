"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /** Yön: soldan sağa (default) veya sağdan sola */
  reverse?: boolean
  /** Animasyon süresi (saniye) */
  duration?: number
  /** Duraklatma (pause on hover) */
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  reverse = false,
  duration = 30,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        className={cn(
          "flex w-max animate-marquee gap-8",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
