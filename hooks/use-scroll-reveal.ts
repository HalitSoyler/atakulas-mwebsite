"use client"

import { useEffect, useRef, useState } from "react"

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0,
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: Partial<IntersectionObserverInit> = {}
) {
  const ref = useRef<T>(null)
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasRevealed(true)
          }
        })
      },
      { ...defaultOptions, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.root, options.rootMargin, options.threshold])

  return { ref, hasRevealed }
}
