"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BusPathAnimation } from "@/components/bus-path-animation"

function getAccentForRoute(_pathname: string): string {
  return "#38bdf8" /* Industrial electric blue - consistent across site */
}

export function GlobalBusAnimation() {
  const pathname = usePathname()
  const accentColor = getAccentForRoute(pathname ?? "")
  const [docHeight, setDocHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef({ docHeight: 0, scrollY: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return

    function update() {
      const newDocHeight = document.documentElement.scrollHeight
      const newScrollY = window.scrollY
      if (
        newDocHeight !== lastRef.current.docHeight ||
        newScrollY !== lastRef.current.scrollY
      ) {
        lastRef.current = { docHeight: newDocHeight, scrollY: newScrollY }
        setDocHeight(newDocHeight)
        setScrollY(newScrollY)
      }
    }

    function scheduleUpdate() {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        update()
      })
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    const ro = new ResizeObserver(scheduleUpdate)
    ro.observe(document.documentElement)
    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      ro.disconnect()
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (docHeight <= 0) return null

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      <div
        className="absolute left-0 top-0 w-full"
        style={{ height: docHeight, transform: `translateY(-${scrollY}px)` }}
      >
        <BusPathAnimation
          accentColor={accentColor}
          docHeight={docHeight}
          className="opacity-[0.72] w-full h-full"
        />
      </div>
    </div>
  )
}
