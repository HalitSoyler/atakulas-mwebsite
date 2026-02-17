"use client"

import { useEffect, useRef } from "react"

export function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0
      const x = 50 + Math.sin(progress * Math.PI * 2) * 15
      const y = 30 + progress * 25
      const scale = 1 + progress * 0.15
      el.style.setProperty("--scroll-bg-x", `${x}%`)
      el.style.setProperty("--scroll-bg-y", `${y}%`)
      el.style.setProperty("--scroll-bg-scale", String(scale))
      tickingRef.current = false
    }

    const handleScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={ref} className="scroll-bg" aria-hidden>
      <div className="scroll-bg-blob" />
    </div>
  )
}
