"use client"

import { useEffect, useRef } from "react"

export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0
      const x = 50 + Math.sin(progress * Math.PI * 2) * 15
      const y = 30 + progress * 25
      const scale = 1 + progress * 0.15
      el.style.setProperty("--scroll-bg-x", `${x}%`)
      el.style.setProperty("--scroll-bg-y", `${y}%`)
      el.style.setProperty("--scroll-bg-scale", String(scale))
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className="scroll-bg" aria-hidden>
      <div className="scroll-bg-blob" />
    </div>
  )
}
