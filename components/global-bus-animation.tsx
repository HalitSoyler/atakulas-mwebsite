"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BusPathAnimation } from "@/components/bus-path-animation"

function getAccentForRoute(pathname: string): string {
  if (pathname.startsWith("/hizmetler/elektrikli-otobus")) return "#00b4d8"
  return "#1e5a9e"
}

export function GlobalBusAnimation() {
  const pathname = usePathname()
  const accentColor = getAccentForRoute(pathname ?? "")
  const [docHeight, setDocHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    function update() {
      setDocHeight(document.documentElement.scrollHeight)
      setScrollY(window.scrollY)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    const ro = new ResizeObserver(update)
    ro.observe(document.documentElement)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      ro.disconnect()
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
