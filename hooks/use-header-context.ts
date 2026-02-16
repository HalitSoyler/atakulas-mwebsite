"use client"

import { useEffect, useRef, useState } from "react"

export type SectionTheme = "light" | "dark" | "muted"

export type SectionContext = {
  id: string
  theme: SectionTheme
  top: number
  bottom: number
}

const defaultContext: SectionContext = {
  id: "hero",
  theme: "light",
  top: 0,
  bottom: 0,
}

export function useHeaderContext(sectionSelectors: string[] = []) {
  const [context, setContext] = useState<SectionContext>(defaultContext)
  const sectionsRef = useRef<Map<string, { theme: SectionTheme; top: number; bottom: number }>>(new Map())

  useEffect(() => {
    const selectors =
      sectionSelectors.length > 0
        ? sectionSelectors
        : [
            "[data-section='hero']",
            "[data-section='showcase']",
            "[data-section='about']",
            "[data-section='products']",
            "[data-section='references']",
            "[data-section='footer']",
          ]

    const updateSections = () => {
      const map = new Map<string, { theme: SectionTheme; top: number; bottom: number }>()
      selectors.forEach((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null
        if (!el) return
        const id = el.getAttribute("data-section") || sel
        const theme = (el.getAttribute("data-header-theme") as SectionTheme) || "light"
        const rect = el.getBoundingClientRect()
        map.set(id, { theme, top: rect.top, bottom: rect.bottom })
      })
      sectionsRef.current = map
    }

    const handleScroll = () => {
      const headerHeight = 80
      const centerY = headerHeight + 40

      let current: SectionContext | null = null
      sectionsRef.current.forEach((data, id) => {
        if (data.top <= centerY && data.bottom >= centerY) {
          current = { id, ...data }
        }
      })

      if (!current) {
        const first = Array.from(sectionsRef.current.entries())[0]
        if (first) current = { id: first[0], ...first[1] }
      }
      if (current) setContext(current)
    }

    updateSections()
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateSections)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateSections)
    }
  }, [sectionSelectors.join(",")])

  return context
}
