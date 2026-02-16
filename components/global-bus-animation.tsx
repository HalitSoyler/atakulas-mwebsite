"use client"

import { usePathname } from "next/navigation"
import { BusPathAnimation } from "@/components/bus-path-animation"

/** Maps route to path index (0–4) so each page gets a different trail. */
function getPathIndexForRoute(pathname: string): number {
  if (!pathname || pathname === "/") return 0
  if (pathname.startsWith("/hakkimizda")) return 1
  if (pathname.startsWith("/urunlerimiz")) return 2
  if (pathname.startsWith("/hizmetler")) return 3
  if (pathname.startsWith("/projelerimiz")) return 4
  if (pathname.startsWith("/iletisim")) return 0
  if (pathname.startsWith("/faaliyet-alanlari")) return 2
  return 0
}

/** Accent color per section (optional; can keep one for consistency). */
function getAccentForRoute(pathname: string): string {
  if (pathname.startsWith("/hizmetler/elektrikli-otobus")) return "#00b4d8"
  return "#1e5a9e"
}

export function GlobalBusAnimation() {
  const pathname = usePathname()
  const pathIndex = getPathIndexForRoute(pathname ?? "")
  const accentColor = getAccentForRoute(pathname ?? "")

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none">
      <BusPathAnimation
        pathIndex={pathIndex}
        accentColor={accentColor}
        className="opacity-50 w-full h-full"
      />
    </div>
  )
}
