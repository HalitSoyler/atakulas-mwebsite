"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const PATH_WIDTH = 1400
const TOP_MARGIN = 180
const BOTTOM_MARGIN = 120

/** Seeded RNG (mulberry32) so path shape varies per load but is deterministic. */
function createRng(seed: number) {
  let s = seed
  return function rng() {
    let t = (s += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function clampNum(v: number, min: number, max: number): number {
  if (Number.isNaN(v) || !Number.isFinite(v)) return min
  return Math.max(min, Math.min(max, v))
}

/**
 * Path 1: Weaving left–right with smooth Bézier (C/S) chains.
 */
function generatePathWeave(docHeight: number, seed: number): string {
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
    const nextX = clampNum(x + drift, 140, w - 140)
    const dx = nextX - x
    const dy = nextY - y
    const dist = Math.hypot(dx, dy) || 1
    const safeX = dist < minDist ? x + (dx / dist) * minDist : nextX
    const safeY = dist < minDist ? y + (dy / dist) * minDist : nextY

    const c1x = clampNum(x + (x - prevCp2X) * 0.4 + (rnd() - 0.5) * 70, 100, w - 100)
    const c1y = clampNum(y - 40 + (rnd() - 0.5) * 24, endY - 50, startY + 50)
    const c2x = clampNum(safeX + (rnd() - 0.5) * 90, 100, w - 100)
    const c2y = clampNum(safeY + 40 + (rnd() - 0.5) * 24, endY - 50, startY + 50)

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

  parts.push(`L ${clampNum(x, 100, w - 100)},${endY}`)
  return parts.join(" ")
}

/**
 * Path 2: Gentle serpentine – wider, smoother S-curves.
 */
function generatePathSerpentine(docHeight: number, seed: number): string {
  const rnd = createRng(seed)
  const w = PATH_WIDTH
  const startX = w * 0.5
  const startY = docHeight + BOTTOM_MARGIN
  const endY = -TOP_MARGIN
  const totalY = startY - endY
  const segments = Math.max(10, Math.min(22, Math.floor(totalY / 280)))
  const stepY = totalY / segments
  const radius = Math.min(400, w * 0.35)

  let x = startX
  let y = startY
  let prevCp2X = startX
  let prevCp2Y = startY - 60

  const parts: string[] = [`M ${x},${y}`]

  for (let i = 0; i < segments; i++) {
    const nextY = startY - (i + 1) * stepY + (rnd() - 0.5) * 30
    const side = i % 2 === 0 ? 1 : -1
    const nextX = clampNum(startX + side * (radius + (rnd() - 0.5) * 120), 160, w - 160)
    const safeX = nextX
    const safeY = nextY

    const c1x = clampNum(x + (x - prevCp2X) * 0.3 + side * 80, 120, w - 120)
    const c1y = clampNum(y - 50, endY - 80, startY + 80)
    const c2x = clampNum(safeX - side * 60, 120, w - 120)
    const c2y = clampNum(safeY + 50, endY - 80, startY + 80)

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

  parts.push(`L ${clampNum(x, 100, w - 100)},${endY}`)
  return parts.join(" ")
}

/**
 * Path 3: Zigzag – more directional, alternating diagonal steps.
 */
function generatePathZigzag(docHeight: number, seed: number): string {
  const rnd = createRng(seed)
  const w = PATH_WIDTH
  const startX = w * 0.5
  const startY = docHeight + BOTTOM_MARGIN
  const endY = -TOP_MARGIN
  const totalY = startY - endY
  const segments = Math.max(16, Math.min(36, Math.floor(totalY / 180)))
  const stepY = totalY / segments
  const maxSide = 340

  let x = startX
  let y = startY
  let prevCp2X = startX
  let prevCp2Y = startY - 45

  const parts: string[] = [`M ${x},${y}`]

  for (let i = 0; i < segments; i++) {
    const nextY = startY - (i + 1) * stepY + (rnd() - 0.5) * 35
    const side = (rnd() > 0.5 ? 1 : -1) * (maxSide * (0.6 + rnd() * 0.4))
    const nextX = clampNum(x + side, 150, w - 150)
    const safeX = nextX
    const safeY = nextY

    const c1x = clampNum(x + (x - prevCp2X) * 0.5, 130, w - 130)
    const c1y = clampNum(y - 35 + (rnd() - 0.5) * 20, endY - 60, startY + 60)
    const c2x = clampNum(safeX + (rnd() - 0.5) * 60, 130, w - 130)
    const c2y = clampNum(safeY + 35, endY - 60, startY + 60)

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

  parts.push(`L ${clampNum(x, 100, w - 100)},${endY}`)
  return parts.join(" ")
}

const PATH_GENERATORS = [generatePathWeave, generatePathSerpentine, generatePathZigzag]

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
const BUS_SCALE = 1.2
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
    const pathIndex = Math.floor(Math.random() * PATH_GENERATORS.length)
    setPathD(PATH_GENERATORS[pathIndex](height, seedRef.current))
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
        seedRef.current = (seedRef.current ?? 0) + 1
        const nextIndex = Math.floor(Math.random() * PATH_GENERATORS.length)
        setPathD(PATH_GENERATORS[nextIndex](height, seedRef.current))
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
  }, [pathD, reducedMotion, height])

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
            {/* Body: side-view bus, front on the right (direction of travel) */}
            <path
              d="M -52,-10 L 38,-10 L 48,-6 L 50,0 L 48,6 L 38,10 L -52,10 L -52,-10 Z"
              fill="url(#busBody)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.6"
            />
            {/* Side windows (3 separate panels) */}
            <path d="M -44,-5 L -26,-5 L -26,5 L -44,5 Z" fill="rgba(30,58,95,0.72)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            <path d="M -22,-5 L -4,-5 L -4,5 L -22,5 Z" fill="rgba(30,58,95,0.72)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            <path d="M 2,-5 L 20,-5 L 20,5 L 2,5 Z" fill="rgba(30,58,95,0.72)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            {/* Front cab window */}
            <path d="M 26,-4 L 44,-2 L 44,2 L 26,4 Z" fill="rgba(30,58,95,0.82)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
            {/* Headlights */}
            <ellipse cx="48" cy="-3" rx="1.5" ry="1.2" fill={accentColor} opacity="0.85" />
            <ellipse cx="48" cy="3" rx="1.5" ry="1.2" fill={accentColor} opacity="0.85" />
          </g>
        </g>
      </svg>
    </div>
  )
}
