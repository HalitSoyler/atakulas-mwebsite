"use client"

import React, { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/ui/border-beam"

/** Light: kurumsal mavi. Dark: çok hafif beyaz/mavi */
const LIGHT_FROM = "#1e5a9e"
const LIGHT_TO = "#00b4d8"
const DARK_FROM = "rgba(255,255,255,0.14)"
const DARK_TO = "rgba(147,197,253,0.22)"

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number
  gradientSize?: number
  useBorderBeam?: boolean
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
  children,
  className,
  borderWidth = 1,
  gradientSize = 180,
  useBorderBeam = true,
  gradientFrom,
  gradientTo,
  ...props
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPosition({ x, y })
      setIsHovered(true)
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const from = gradientFrom ?? LIGHT_FROM
  const to = gradientTo ?? LIGHT_TO

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl bg-card transition-shadow duration-300",
        "border border-border",
        isHovered && "shadow-md shadow-primary/5",
        className
      )}
      {...props}
    >
      {/* Sadece kenar: gradient halka (light mode) */}
      {isHovered && (
        <>
          <div
            className="pointer-events-none absolute rounded-2xl dark:hidden"
            style={{
              inset: -borderWidth,
              zIndex: 0,
              background: `radial-gradient(
                ${gradientSize}px circle at ${position.x}% ${position.y}%,
                ${from},
                ${to} 45%,
                transparent 100%
              )`,
            }}
          />
          <div
            className="pointer-events-none absolute rounded-2xl bg-card dark:hidden"
            style={{ inset: borderWidth, zIndex: 0 }}
          />
          {/* Dark mode: hafif beyaz/mavi */}
          <div
            className="pointer-events-none absolute rounded-2xl hidden dark:block"
            style={{
              inset: -borderWidth,
              zIndex: 0,
              background: `radial-gradient(
                ${gradientSize}px circle at ${position.x}% ${position.y}%,
                ${DARK_FROM},
                ${DARK_TO} 45%,
                transparent 100%
              )`,
            }}
          />
          <div
            className="pointer-events-none absolute rounded-2xl bg-card hidden dark:block"
            style={{ inset: borderWidth, zIndex: 0 }}
          />
        </>
      )}

      {useBorderBeam && isHovered && (
        <>
          <BorderBeam
            duration={8}
            borderWidth={borderWidth}
            colorFrom={from}
            colorTo={to}
            className="rounded-2xl dark:hidden"
          />
          <BorderBeam
            duration={8}
            borderWidth={borderWidth}
            colorFrom={DARK_FROM}
            colorTo={DARK_TO}
            className="rounded-2xl hidden dark:block"
          />
        </>
      )}

      <div className="relative z-10 h-full rounded-2xl bg-card">{children}</div>
    </div>
  )
}
