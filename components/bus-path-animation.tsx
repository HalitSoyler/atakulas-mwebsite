"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const PATH_WIDTH = 1400
const TOP_MARGIN = 180
const BOTTOM_MARGIN = 120

/** Seeded RNG (mulberry32) so path shape varies per load but is deterministic. */
function createRng(seed: number) {
  return function rng() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Procedural path over full document height (header to footer).
 * Path runs upward, weaves left–right; uses C and S for smooth chains.
 * Seed makes each load/navigation get a different path.
 */
function generateIntertwinedPath(docHeight: number, seed: number): string {
  const rnd = createRng(seed)
  const w = PATH_WIDTH
  const startX = w * 0.5
  const startY = docHeight + BOTTOM_MARGIN
  const endY = -TOP_MARGIN
  const totalY = startY - endY
  const segments = Math.max(14, Math.min(32, Math.floor(totalY / 220)))
  const stepY = totalY / segments
  const maxDrift = 320 + rnd() * 140
  const minDist = 80

  let x = startX
  let y = startY
  let prevCp2X = startX
  let prevCp2Y = startY - 50

  const parts: string[] = [`M ${x},${y}`]

  for (let i = 0; i < segments; i++) {
    const nextY = startY - (i + 1) * stepY + (rnd() - 0.5) * 50
    const drift = (rnd() - 0.5) * 2 * maxDrift
    const nextX = Math.max(140, Math.min(w - 140, x + drift))
    const dist = Math.hypot(nextX - x, nextY - y)
    const safeX = dist < minDist ? x + (nextX - x) * (minDist / dist) : nextX
    const safeY = dist < minDist ? y + (nextY - y) * (minDist / dist) : nextY

    const c1x = x + (x - prevCp2X) * 0.4 + (rnd() - 0.5) * 70
    const c1y = y - 40 + (rnd() - 0.5) * 24
    const c2x = safeX + (rnd() - 0.5) * 90
    const c2y = safeY + 40 + (rnd() - 0.5) * 24

    if (i === 0) {
      parts.push(`C ${c1x},${c1y} ${c2x},${c2y} ${safeX},${safeY}`)
    } else {
      parts.push(`S ${c2x},${c2y} ${safeX},${safeY}`)
    }
    prevCp2X = c2x
    prevCp2Y = c2y
    x = safeX
    y = safeY
  }

  parts.push(`L ${x},${endY}`)
  return parts.join(" ")
}

/** Fallback path for SSR / first paint (fixed height to avoid hydration mismatch). */
function getFallbackPath(docHeight: number): string {
  const h = Math.max(1200, docHeight)
  const startY = h + BOTTOM_MARGIN
  const endY = -TOP_MARGIN
  const step = (startY - endY) / 5
  return [
    `M ${PATH_WIDTH / 2},${startY}`,
    `C ${PATH_WIDTH / 2 + 20},${startY - step} ${PATH_WIDTH / 2 - 20},${startY - step * 2} ${PATH_WIDTH / 2 + 50},${startY - step * 3}`,
    `S ${PATH_WIDTH / 2 - 80},${startY - step * 4} ${PATH_WIDTH / 2},${endY}`,
    `L ${PATH_WIDTH / 2},${endY}`,
  ].join(" ")
}

const TRAIL_POINTS = 72
const TRAIL_LENGTH_FRAC = 0.065
const BUS_SCALE = 1.5
const SPEED = 0.0012

interface BusPathAnimationProps {
  className?: string
  pathIndex?: number
  accentColor?: string
  reducedMotion?: boolean
  /** Full document height so the path runs from header to footer. */
  docHeight?: number
}

const DEFAULT_DOC_HEIGHT = 3000

export function BusPathAnimation({
  className,
  pathIndex: _pathIndex,
  accentColor = "#38bdf8",
  reducedMotion = false,
  docHeight = DEFAULT_DOC_HEIGHT,
}: BusPathAnimationProps) {
  const busRef = useRef<SVGGElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const trailBlurRef = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const trailGradRef = useRef<SVGLinearGradientElement>(null)
  const trailCoreGradRef = useRef<SVGLinearGradientElement>(null)
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)

  const height = docHeight > 0 ? docHeight : DEFAULT_DOC_HEIGHT
  const seedRef = useRef<number | null>(null)
  const [pathD, setPathD] = useState(() => getFallbackPath(height))

  useEffect(() => {
    if (typeof window === "undefined" || height <= 0) return
    if (seedRef.current == null) seedRef.current = (Date.now() >>> 0) + Math.floor(Math.random() * 0xffff)
    setPathD(generateIntertwinedPath(height, seedRef.current))
  }, [height])

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return

    const pathEl = pathRef.current
    const busEl = busRef.current
    const trailEl = trailRef.current
    const trailBlurEl = trailBlurRef.current
    const gradEl = trailGradRef.current
    const coreGradEl = trailCoreGradRef.current
    if (!pathEl || !busEl || !trailEl || !trailBlurEl) return

    const pathLength = pathEl.getTotalLength()

    function animate() {
      if (!pathEl || !busEl || !trailEl || !trailBlurEl) return
      progressRef.current += SPEED
      if (progressRef.current >= 1) {
        progressRef.current = 0
        trailEl.setAttribute("d", "")
        trailBlurEl.setAttribute("d", "")
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const currentDist = progressRef.current * pathLength
      const point = pathEl.getPointAtLength(currentDist)
      const nextDist = Math.min(currentDist + 8, pathLength)
      const nextPoint = pathEl.getPointAtLength(nextDist)
      const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI

      busEl.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle}) scale(${BUS_SCALE})`)

      const trailLen = pathLength * TRAIL_LENGTH_FRAC
      const trailStart = Math.max(0, currentDist - trailLen)
      const trailEnd = currentDist
      const steps = trailEnd > trailStart ? TRAIL_POINTS : 0
      let d = ""
      let firstX = 0,
        firstY = 0,
        lastX = 0,
        lastY = 0
      if (steps > 0) {
        for (let i = 0; i <= steps; i++) {
          const t = trailStart + (i / steps) * (trailEnd - trailStart)
          const p = pathEl.getPointAtLength(t)
          if (i === 0) {
            firstX = p.x
            firstY = p.y
          }
          lastX = p.x
          lastY = p.y
          d += (i === 0 ? "M" : "L") + `${p.x},${p.y} `
        }
        trailEl.setAttribute("d", d.trim())
        trailBlurEl.setAttribute("d", d.trim())
        if (gradEl) {
          gradEl.setAttribute("x1", String(firstX))
          gradEl.setAttribute("y1", String(firstY))
          gradEl.setAttribute("x2", String(lastX))
          gradEl.setAttribute("y2", String(lastY))
        }
        if (coreGradEl) {
          coreGradEl.setAttribute("x1", String(firstX))
          coreGradEl.setAttribute("y1", String(firstY))
          coreGradEl.setAttribute("x2", String(lastX))
          coreGradEl.setAttribute("y2", String(lastY))
        }
      } else {
        trailEl.setAttribute("d", "")
        trailBlurEl.setAttribute("d", "")
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [pathD, reducedMotion])

  if (reducedMotion) return null

  const viewHeight = height + BOTTOM_MARGIN + TOP_MARGIN + 100
  const viewBox = `-100 ${-TOP_MARGIN - 50} ${PATH_WIDTH + 200} ${viewHeight}`

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={accentColor} floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="trailGrad" ref={trailGradRef} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="15%" stopColor={accentColor} stopOpacity="0.45" />
            <stop offset="32%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="68%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="85%" stopColor={accentColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trailCoreGrad" ref={trailCoreGradRef} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="18%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="38%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="82%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="busBody" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="busShadow" x="-60%" y="-40%" width="220%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>
        <path ref={pathRef} d={pathD} fill="none" stroke="rgba(30,90,158,0.04)" strokeWidth="2" />
        <path
          ref={trailBlurRef}
          fill="none"
          stroke="url(#trailGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
          filter="url(#trailGlow)"
        />
        <path
          ref={trailRef}
          fill="none"
          stroke="url(#trailCoreGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.98"
        />
        <g ref={busRef} style={{ willChange: "transform" }}>
          <g filter="url(#busShadow)">
            <path
              d="M -44,-14 L 32,-14 L 42,-10 L 44,0 L 42,10 L 32,14 L -44,14 L -44,-14 Z"
              fill="url(#busBody)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.8"
            />
            <path
              d="M -36,-6 L 28,-6 L 28,6 L -36,6 Z"
              fill="rgba(15,23,42,0.85)"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
            <line x1="42" y1="-4" x2="44" y2="0" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            <line x1="44" y1="0" x2="42" y2="4" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            <circle cx="43" cy="0" r="1.2" fill="#fff" opacity="0.9" />
          </g>
        </g>
      </svg>
    </div>
  )
}
