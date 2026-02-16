"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** 5 different paths: all traverse from BOTTOM (high Y) to TOP (low Y) in viewBox 0 0 1400 800 */
const MOTION_PATHS = [
  "M 100,760 C 250,600 150,350 200,120 C 220,60 180,40 100,40",
  "M 700,780 Q 400,400 700,60",
  "M 1300,750 C 1000,550 1100,250 1250,80 L 1300,50",
  "M 350,765 C 550,500 850,450 1050,200 C 1150,100 1000,50 900,45",
  "M 200,740 L 450,520 L 700,620 L 950,320 L 1200,80",
]

const TRAIL_LENGTH = 140
const SPEED = 0.001
const TRAIL_STEPS = 14

interface BusPathAnimationProps {
  className?: string
  /** Which path index (0-4). If undefined, picks one at random after mount (avoids hydration mismatch). */
  pathIndex?: number
  /** Accent color for bus and trail (default brand cyan) */
  accentColor?: string
  /** Reduce motion for accessibility */
  reducedMotion?: boolean
}

export function BusPathAnimation({
  className,
  pathIndex: pathIndexProp,
  accentColor = "#38bdf8",
  reducedMotion = false,
}: BusPathAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const busRef = useRef<SVGGElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)

  // Fixed initial index so server and client render the same path (avoids hydration error).
  // When pathIndexProp is undefined, we pick random only after mount in useEffect.
  const [randomIndex, setRandomIndex] = useState<number | null>(null)
  const resolvedIndex =
    pathIndexProp !== undefined ? pathIndexProp : (randomIndex ?? 0)
  const pathD = MOTION_PATHS[resolvedIndex]

  useEffect(() => {
    if (pathIndexProp === undefined && randomIndex === null) {
      setRandomIndex(Math.floor(Math.random() * MOTION_PATHS.length))
    }
  }, [pathIndexProp, randomIndex])

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return

    const pathEl = pathRef.current
    const busEl = busRef.current
    const trailEl = trailRef.current
    if (!pathEl || !busEl || !trailEl) return

    const pathLength = pathEl.getTotalLength()

    function animate() {
      progressRef.current += SPEED
      if (progressRef.current > 1) progressRef.current = 0

      const currentDist = progressRef.current * pathLength
      const point = pathEl.getPointAtLength(currentDist)

      const nextDist = Math.min(currentDist + 2, pathLength)
      const nextPoint = pathEl.getPointAtLength(nextDist)
      const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI

      busEl.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)

      const startTrail = Math.max(0, currentDist - TRAIL_LENGTH)
      let d = ""
      for (let i = 0; i <= TRAIL_STEPS; i++) {
        const t = startTrail + (i / TRAIL_STEPS) * (currentDist - startTrail)
        const p = pathEl.getPointAtLength(t)
        d += (i === 0 ? "M" : "L") + `${p.x},${p.y} `
      }
      trailEl.setAttribute("d", d)

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [pathD, reducedMotion])

  if (reducedMotion) return null

  const trailGlow = accentColor === "#38bdf8" ? "rgba(56,189,248,0.5)" : `${accentColor}50`

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="rgba(30,90,158,0.12)"
          strokeWidth="3"
        />
        <path
          ref={trailRef}
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          style={{ filter: `drop-shadow(0 0 14px ${trailGlow})` }}
        />
        <g ref={busRef} style={{ filter: `drop-shadow(0 0 16px ${trailGlow})`, willChange: "transform" }}>
          {/* Slightly larger bus for visibility */}
          <rect x="-52" y="-18" width="104" height="36" rx="8" fill="#0f172a" stroke={accentColor} strokeWidth="2" />
          <rect x="22" y="-14" width="18" height="28" rx="2" fill={accentColor} opacity="0.9" />
          <rect x="-2" y="-14" width="18" height="28" rx="2" fill={accentColor} opacity="0.5" />
          <rect x="-32" y="-14" width="18" height="28" rx="2" fill={accentColor} opacity="0.5" />
          <circle cx="50" cy="-10" r="3" fill="#fff" opacity="0.95" />
          <circle cx="50" cy="10" r="3" fill="#fff" opacity="0.95" />
        </g>
      </svg>
    </div>
  )
}
